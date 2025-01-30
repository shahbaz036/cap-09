const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
app.use(cors(
  {
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  linkedInAccessToken: { type: String, required: false },
  linkedInId: { type: String, required: false },
  tokenExpiresAt: { type: Date, required: false },
  dailyRequestCount: { type: Number, default: 0 },
  lastRequestDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// FreeRequest model
const freeRequestSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
});

const FreeRequest = mongoose.model('FreeRequest', freeRequestSchema);

// Middleware to verify JWT token or allow free requests
const verifyTokenOrAllowFree = async (req, res, next) => {
  console.log('Entering verifyTokenOrAllowFree middleware');
  console.log('Request headers:', req.headers);
  
  const token = req.headers['authorization'];
  console.log('Token:', token);
  
  if (!token || token === 'undefined') {
    console.log('No token provided, treating as free request');
    // It's a free request
    const ip = req.ip;
    console.log('IP address:', ip);
    const requestCount = await getFreeRequestCount(ip);
    console.log('Free request count:', requestCount);
    
    if (requestCount < 20) {
      // Allow the request and increment the count
      req.isFreeRequest = true;
      req.freeRequestIp = ip;
      console.log('Free request allowed');
      return next();
    } else {
      console.log('Free request limit reached');
      return res.status(401).json({ success: false, error: 'Free request limit reached. Please log in.' });
    }
  }

  // Token is present, verify it
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.isFreeRequest = false;
    console.log('Token verified successfully');
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ success: false, error: 'Failed to authenticate token' });
  }
};

// Helper function to get free request count
async function getFreeRequestCount(ip) {
  const freeRequest = await FreeRequest.findOne({ ip });
  return freeRequest ? freeRequest.count : 0;
}

// Helper function to increment free request count
async function incrementFreeRequestCount(ip) {
  await FreeRequest.findOneAndUpdate(
    { ip },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );
}

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: { success: false, error: 'Rate limit exceeded. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip; // Use IP address as the key for rate limiting
  },
  skip: (req) => {
    // Skip rate limiting for authenticated users
    return req.userId !== undefined;
  }
});

app.post('/api/users/signup', async (req, res) => {
  console.log('Received signup request:', req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    console.log('User registered successfully:', email);
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// User login endpoint
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { id: user._id, email: user.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Helper function to generate AI reply for posts
async function generateLongAIReply(prompt) {
  return retryWithExponentialBackoff(async () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    let reply = result.response.text().trim();
    
    // Ensure we have 5-6 sentences
    const sentences = reply.match(/[^\.!\?]+[\.!\?]+/g) || [];
    if (sentences.length < 5) {
      // If we have fewer than 5 sentences, generate additional content
      const additionalPrompt = `Add ${5 - sentences.length} more sentences to complete this LinkedIn post:\n\n${reply}`;
      const additionalResult = await model.generateContent(additionalPrompt);
      const additionalReply = additionalResult.response.text().trim();
      reply += ' ' + additionalReply;
    }
    
    // Re-split into sentences and limit to 6
    const finalSentences = reply.match(/[^\.!\?]+[\.!\?]+/g) || [];
    return finalSentences.slice(0, 6).join(' ');
  });
}

// Function to handle comment replies
async function handleCommentReply(text, parentPost) {
  let prompt = `Generate a 1-2 sentence automated positive response to this LinkedIn post:. Consider the context of the parent post:\n\n`;
  prompt += `Parent post: ${parentPost}\n`;
  prompt += `Comment: ${text}\n`;
  return await generateShortAIReply(prompt);
}

// Function to handle post creation
async function handlePostCreation(text, userProfile) {
  let prompt = '';

  if (text && text.trim() !== '') {
    prompt = `You are a professional LinkedIn content creator. Create a 5-6 sentence post based on the following draft or topic. The post should be engaging, informative, and suitable for a professional audience on LinkedIn:\n\n${text}\n\n`;
  } else {
    prompt = `You are a professional LinkedIn content creator. Create a 5-6 sentence post tailored to the following user profile. The post should be engaging, informative, and suitable for a professional audience on LinkedIn:\n\n`;
    
    if (userProfile && Object.keys(userProfile).length > 0) {
      prompt += `User Profile:\n`;
      prompt += `Name: ${userProfile.name}\n`;
      prompt += `About: As I continue to grow in my career, I often reflect on the incredible journey I've had in the world of software engineering. From learning to code in my first programming class to tackling complex challenges in my current role, every step has shaped my skills and mindset.
      Key Lessons Learned:
Continuous Learning: The tech industry is always evolving, and staying curious has allowed me to embrace new technologies and methodologies.
Collaboration: Working with diverse teams has not only enriched my projects but also broadened my perspective on problem-solving.
Resilience: Overcoming challenges, whether they be bugs, deadlines, or learning curves, has taught me the importance of persistence and adaptability.
What's Next? I'm excited to explore more and continue contributing to innovative projects that make a difference.
Let's Connect! I'd love to hear your experiences and insights as well. What lessons have you learned on your journey as a software engineer? 
#SoftwareEngineering #ContinuousLearning #CareerGrowth #TechJourney #Collaboration\n`;
      prompt += `Create a post that showcases the user's expertise, highlights their professional achievements, or discusses a topic relevant to their industry. The post should reflect the user's professional background and interests.\n\n`;
    } else {
      prompt += `User profile: Not provided. Create a general professional post.\n\n`;
    }
  }

  prompt += `Ensure the post is engaging, professional in tone, and does not include any special characters. The post should be relevant to the user's professional background or the provided topic. Include a call-to-action or encourage engagement from the audience.`;

  return await generateLongAIReply(prompt);
}

// Function to handle message replies
async function handleMessageReply(text, previousMessages) {
  let prompt = `You are a professional LinkedIn user. Provide a brief, friendly, and engaging response to the following LinkedIn message. The response should be contextually appropriate and encourage further conversation:\n\n`;
  
  if (previousMessages && previousMessages.length > 0) {
    prompt += `Conversation history:\n`;
    previousMessages.forEach(msg => {
      prompt += `${msg.sender}: ${msg.content}\n`;
    });
    prompt += `\nLatest message: ${text}\n`;
  } else {
    prompt += `Message: ${text}\n`;
  }
  
  prompt += `\nYour response should be professional, relevant to the conversation, and no longer than 20 words.`;
  
  return await generateShortAIReply(prompt);
}


app.post('/api/get-ai-reply', verifyTokenOrAllowFree, apiLimiter, async (req, res) => {
  console.log('Entering /api/get-ai-reply endpoint');
  console.log('Request body:', req.body);
  console.log('Is free request:', req.isFreeRequest);
  
  try {
    let user = null;
    if (!req.isFreeRequest) {
      user = await User.findById(req.userId);
      console.log('User found:', user ? 'Yes' : 'No');
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Check daily limit for authenticated users
      const today = new Date().setHours(0, 0, 0, 0);
      if (user.lastRequestDate.setHours(0, 0, 0, 0) < today) {
        user.dailyRequestCount = 0;
        user.lastRequestDate = new Date();
      }

      console.log('Daily request count:', user.dailyRequestCount);
      if (user.dailyRequestCount >= 100) {
        console.log('Daily limit exceeded');
        return res.status(429).json({ success: false, error: 'Daily request limit exceeded. Please try again tomorrow.' });
      }
    }

    const { text, context, previousMessages, additionalContext, userProfile } = req.body;

    let reply;
    console.log('Generating reply for context:', context);
    switch (context) {
      case 'message':
        reply = await handleMessageReply(text, previousMessages);
        break;
      case 'comment':
        reply = await handleCommentReply(text, additionalContext);
        break;
      case 'post':
        reply = await handlePostCreation(text, userProfile);
        break;
      default:
        throw new Error('Invalid context');
    }

    // Increment request count only if the request was successful
    if (req.isFreeRequest) {
      await incrementFreeRequestCount(req.freeRequestIp);
      console.log('Incremented free request count for IP:', req.freeRequestIp);
    } else if (user) {
      user.dailyRequestCount += 1;
      await user.save();
      console.log('Updated daily request count:', user.dailyRequestCount);
    }

    console.log('Reply generated successfully');
    res.json({ success: true, reply, shouldIncrementCount: true });
  } catch (error) {
    console.error('Error in /api/get-ai-reply:', error);
    res.status(500).json({ success: false, error: error.message || 'An error occurred while generating the reply' });
  }
});

// Function to handle retries
async function retryWithExponentialBackoff(fn, maxRetries = 3, initialDelay = 1000) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      if (error.status !== 500 || retries === maxRetries - 1) {
        throw error;
      }
      retries++;
      const delay = initialDelay * Math.pow(2, retries);
      console.log(`Retrying after ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Update the generateShortAIReply function to use retries
async function generateShortAIReply(prompt) {
  return retryWithExponentialBackoff(async () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    let reply = result.response.text().trim();
    reply = reply.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
    const words = reply.split(/\s+/);
    return words.slice(0, 20).join(' ');
  });
}

// LinkedIn OAuth endpoints
app.get('/api/linkedin/auth', verifyTokenOrAllowFree, (req, res) => {
  const state = req.userId || 'free-user'; // Use the user's ID as the state parameter or 'free-user' for unauthenticated users
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI)}&scope=openid%20profile%20w_member_social%20email&state=${state}`;
  res.json({ authUrl });
});

app.get('/api/linkedin/callback', async (req, res) => {
  const { code, error, error_description, state } = req.query;

  if (error) {
    console.error('LinkedIn OAuth Error:', error, error_description);
    return res.redirect(`https://www.linkedin.com?error=${encodeURIComponent(error_description)}`);
  }

  if (!code) {
    return res.redirect('https://www.linkedin.com?error=Authorization code is missing');
  }

  try {
    const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      },
    });

    const { access_token, expires_in, id_token } = tokenResponse.data;

    // Decode the id_token to get user information
    const decodedToken = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());

    if (state !== 'free-user') {
      // Update user in database with LinkedIn token and info
      await User.findByIdAndUpdate(state, {
        linkedInAccessToken: access_token,
        linkedInId: decodedToken.sub,
        tokenExpiresAt: new Date(Date.now() + expires_in * 1000)
      });
    }

    

    res.redirect('https://www.linkedin.com?linkedin=connected');
  } catch (error) {
    console.error('LinkedIn OAuth Error:', error.response ? error.response.data : error.message);
    res.redirect(`https://www.linkedin.com?error=${encodeURIComponent('Failed to connect LinkedIn account')}`);
  }
});

app.get('/api/linkedin/user-info', verifyTokenOrAllowFree, async (req, res) => {
  try {
    const user = req.userId ? await User.findById(req.userId) : null;
    if (!user || !user.linkedInAccessToken) {
      return res.status(400).json({ success: false, error: 'LinkedIn access token not found' });
    }

    const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${user.linkedInAccessToken}` },
    });

    const profileData = response.data;

    res.json({ success: true, profile: profileData });
  } catch (error) {
    console.error('LinkedIn API Error:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ success: false, error: 'LinkedIn token expired', requiresReauth: true });
    }
    res.status(500).json({ success: false, error: 'Failed to fetch LinkedIn profile', details: error.message });
  }
});

// LinkedIn share post endpoint
app.post('/api/linkedin/share', verifyTokenOrAllowFree, async (req, res) => {
  try {
    const user = req.userId ? await User.findById(req.userId) : null;
    if (!user || !user.linkedInAccessToken) {
      return res.status(400).json({ success: false, error: 'LinkedIn access token not found' });
    }

    const { text, url } = req.body;
    const shareResponse = await axios.post(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        author: `urn:li:person:${user.linkedInId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: text
            },
            shareMediaCategory: 'ARTICLE',
            media: [
              {
                status: 'READY',
                originalUrl: url
              }
            ]
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      },
      {
        headers: { 
          'Authorization': `Bearer ${user.linkedInAccessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ success: true, message: 'Content shared on LinkedIn successfully', data: shareResponse.data });
  } catch (error) {
    console.error('LinkedIn Share Error:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ success: false, error: 'LinkedIn token expired', requiresReauth: true });
    }
    res.status(500).json({ success: false, error: 'Failed to share content on LinkedIn', details: error.message });
  }
});

app.post('/api/generate', verifyTokenOrAllowFree, apiLimiter, async (req, res) => {
  try {
    let user = null;
    if (!req.isFreeRequest) {
      user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Check daily limit for authenticated users
      const today = new Date().setHours(0, 0, 0, 0);
      if (user.lastRequestDate.setHours(0, 0, 0, 0) < today) {
        user.dailyRequestCount = 0;
        user.lastRequestDate = new Date();
      }

      if (user.dailyRequestCount >= 100) {
        return res.status(429).json({ success: false, error: 'Daily request limit exceeded. Please try again tomorrow.' });
      }
    }

    const { prompt } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }]
    });

    if (!result.response) {
      throw new Error('No response from Gemini API');
    }

    const generatedText = result.response.text();

    // Increment daily request count for authenticated users
    if (user) {
      user.dailyRequestCount += 1;
      await user.save();
    }

    res.json({ generatedText });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});