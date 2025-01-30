# LinkedIn Automation Tool

A Chrome extension that enhances LinkedIn interactions with AI-powered responses using Google's Gemini AI.

## Features

- **AI-Powered Responses**: Generate contextual responses for:
  - LinkedIn posts
  - Comments
  - Messages
- **Smart Context Understanding**: Analyzes conversation history and post context
- **User Authentication**: Secure login/signup system
- **LinkedIn Integration**: Direct connection with LinkedIn API

## Tech Stack

### Frontend (Chrome Extension)
- React
- Vite
- Chrome Extension APIs

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication
- Google Gemini AI API
- LinkedIn API


3. Create a `.env` file with required credentials:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_REDIRECT_URI=your_redirect_uri
GEMINI_API_KEY=your_gemini_api_key
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Click "Load unpacked"
   - Select the `dist` folder from the project

## Usage

1. Sign up/Login through the extension popup
2. Navigate to LinkedIn
3. The AI assistant icon will appear in text input fields
4. Click the icon or use the "/" command to generate AI responses
5. For posts/comments:
   - Type "/" followed by your prompt
   - Press Enter to generate a response

## Development

### Project Structure

```
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Main server file
│
└── vite-project/
    ├── src/
    │   ├── components/ # React components
    │   ├── App.jsx     # Main React component
    │   ├── content.js  # Chrome extension content script
    │   └── background.js # Chrome extension background script
    └── dist/           # Built extension files
```

### API Endpoints

- `POST /api/users/signup`: User registration
- `POST /api/users/login`: User authentication
- `POST /api/get-ai-reply`: Generate AI responses
- `GET /api/linkedin/auth`: LinkedIn OAuth initialization
- `GET /api/linkedin/callback`: LinkedIn OAuth callback

## Security

- JWT-based authentication
- Secure password hashing
- Rate limiting
- Environment variable protection
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request







