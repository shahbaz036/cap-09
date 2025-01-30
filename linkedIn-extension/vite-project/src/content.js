let iconElement = null;
let currentInputElement = null;
let activeElement = null;
let loadingAnimation = null;
let requestCount = 0;
const MAX_FREE_REQUESTS = 20;

// Function to send messages to the background script
function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, response => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
}

function extractContext() {
  const url = window.location.href;
  let platform = '';
  let context = '';

  if (url.includes('linkedin.com')) {
    platform = 'LinkedIn';
    context = extractLinkedInContext();
  } else {
    platform = 'Unknown';
    context = 'Unable to extract context from this platform.';
  }

  return { platform, context };
}

function extractLinkedInContext() {
  const postContent = document.querySelector('.feed-shared-update-v2__description')?.textContent || '';
  const comments = Array.from(document.querySelectorAll('.comments-comment-item-content')).map(comment => comment.textContent).join('\n');
  return `Post: ${postContent}\n\nComments: ${comments}`;
}

function showErrorMessage(message) {
  const errorElement = document.createElement('div');
  errorElement.textContent = message;
  errorElement.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #f44336;
    color: white;
    padding: 15px;
    border-radius: 5px;
    z-index: 10001;
    max-width: 300px;
  `;
  document.body.appendChild(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}

async function handleCommand(command) {
  console.log("Handling command:", command);
  try {
    const requiresAuth = await checkRequestCount();
    if (requiresAuth) {
      showAuthRequiredMessage();
      return;
    }

    showLoadingAnimation();
    const { platform, context } = extractContext();
    const selectedText = window.getSelection().toString();
    const finalContext = selectedText || context;
    
    const response = await sendMessage({ 
      action: "generateText", 
      command: command,
      platform: platform,
      context: finalContext
    });
    
    if (response.error) {
      console.error("Error generating text:", response.error);
      insertText(`Error: ${response.error}`);
    } else {
      insertText(response.text);
      incrementRequestCount();
    }
  } catch (error) {
    console.error("Error handling command:", error);
    insertText(`Error: ${error.message}`);
  } finally {
    hideLoadingAnimation();
  }
}

function insertText(text) {
  if (activeElement) {
    if (activeElement.isContentEditable) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      const start = activeElement.selectionStart;
      const end = activeElement.selectionEnd;
      activeElement.value = activeElement.value.substring(0, start) + text + activeElement.value.substring(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
    }
  }
}

function showLoadingAnimation() {
  if (activeElement) {
    loadingAnimation = document.createElement('div');
    loadingAnimation.textContent = 'Generating...';
    loadingAnimation.style.position = 'absolute';
    loadingAnimation.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    loadingAnimation.style.color = 'white';
    loadingAnimation.style.padding = '5px 10px';
    loadingAnimation.style.borderRadius = '5px';
    loadingAnimation.style.zIndex = '10000';

    const rect = activeElement.getBoundingClientRect();
    loadingAnimation.style.top = `${rect.bottom + window.scrollY + 5}px`;
    loadingAnimation.style.left = `${rect.left + window.scrollX}px`;

    document.body.appendChild(loadingAnimation);
  }
}

function hideLoadingAnimation() {
  if (loadingAnimation && loadingAnimation.parentNode) {
    loadingAnimation.parentNode.removeChild(loadingAnimation);
    loadingAnimation = null;
  }
}

async function handleKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    const element = event.target;
    if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT' || element.isContentEditable) {
      const text = element.isContentEditable ? element.textContent : element.value;
      if (text.startsWith('/')) {
        event.preventDefault();
        const command = text.slice(1).trim();
        if (command) {
          console.log("Command detected:", command);
          if (element.isContentEditable) {
            element.textContent = '';
          } else {
            element.value = '';
          }
          await handleAIAssistant(element, command);
        }
      }
    }
  }
}

async function handleAIAssistant(inputElement, command = '') {
  if (!inputElement) return;

  let context = '';
  let text = command || '';
  let previousMessages = [];
  let additionalContext = '';

  if (inputElement.closest('.msg-form__contenteditable')) {
    context = 'message';
    text = getLatestSenderMessage(inputElement);
  } else if (
    inputElement.closest('.artdeco-button__text') || 
    inputElement.closest('.comments-comment-box-comment__text-editor')
  ) {
    context = 'comment';
    if (!text) {
      text = inputElement.textContent || '';
    }
  } else if (
    inputElement.closest('.share-creation-state__text-editor') || 
    inputElement.closest('.ql-editor')
  ) {
    context = 'post';
    if (!text) {
      text = inputElement.textContent || '';
    }
  }

  console.log(`Current context: ${context}`);

  if (!context) {
    showErrorMessage('Please use the AI assistant in a valid input field.');
    return;
  }

  previousMessages = getPreviousMessages(inputElement, context);
  additionalContext = getAdditionalContext(context, inputElement);

  try {
    showLoadingAnimation();
    console.log("AI text:", text);
    const reply = await getAIReply(text, context, previousMessages, additionalContext);
    if (reply) {
      insertReplyIntoInput(inputElement, reply);
    } else {
      throw new Error('No reply generated');
    }
  } catch (error) {
    console.error('Error generating reply:', error);
    showErrorMessage(`Error: ${error.message}. Please try again.`);
  } finally {
    hideLoadingAnimation();
  }
}

function handleInput(event) {
  console.log("Input event detected:", event);
  const element = event.target;
  if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT' || element.isContentEditable) {
    activeElement = element;
    const text = element.isContentEditable ? element.textContent : element.value;
    console.log("Current text:", text);
  }
}

function initialize() {
  console.log("Content script initialized");
  document.addEventListener('input', handleInput);
  document.addEventListener('keydown', handleKeyPress);
  extractAndStoreUserProfile();
}

function createIcon() {
  if (iconElement) return;

  iconElement = document.createElement('div');
  iconElement.className = 'linkedin-assistant-icon';

  const img = document.createElement('img');
  img.src = chrome.runtime.getURL('image.png');
  img.alt = 'LinkedIn Assistant Icon';
  
  img.style.cssText = `
    width: 32px;
    height: 32px;
    border-radius: 25%;
    object-fit: cover;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  `;

  iconElement.appendChild(img);

  iconElement.style.cssText = `
    position: absolute;
    z-index: 10000;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(iconElement);

  iconElement.addEventListener('click', handleIconClick);
  iconElement.addEventListener('mouseover', () => {
    iconElement.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
  });
  iconElement.addEventListener('mouseout', () => {
    iconElement.style.backgroundColor = 'transparent';
  });
}

function updateIconPosition(inputElement) {
  if (iconElement && inputElement) {
    const rect = inputElement.getBoundingClientRect();
    const inputParent = inputElement.parentElement;
    
    if (inputParent) {
      inputParent.style.position = 'relative';
      
      const emojiButton = inputParent.querySelector('.comments-comment-box__emoji-picker-trigger, .share-creation-state__emoji-picker-trigger, .msg-form__emoji-button');
      
      if (emojiButton) {
        const emojiRect = emojiButton.getBoundingClientRect();
        iconElement.style.top = '50%';
        iconElement.style.right = `${inputParent.offsetWidth - (emojiRect.left - rect.left) + 5}px`;
        iconElement.style.transform = 'translateY(-50%)';
      } else {
        iconElement.style.top = '50%';
        iconElement.style.right = '10px';
        iconElement.style.transform = 'translateY(-50%)';
      }
      
      inputParent.appendChild(iconElement);
      iconElement.style.display = 'flex';
    }
  }
}

function showIcon() {
  if (!iconElement) {
    createIcon();
  }
  iconElement.style.display = 'block';
}

function hideIcon() {
  if (iconElement) {
    iconElement.style.display = 'none';
  }
}

async function handleIconClick() {
  if (!currentInputElement) return;
  await handleAIAssistant(currentInputElement);
}

function getLatestSenderMessage(inputElement) {
  const conversationContainer = inputElement.closest('.msg-convo-wrapper');

  if (!conversationContainer) {
    console.warn('Conversation container not found.');
    return 'No recent message found';
  }

  const allMessages = Array.from(conversationContainer.querySelectorAll('.msg-s-event-listitem__body'));
  const allSenders = Array.from(conversationContainer.querySelectorAll('.msg-s-message-group__profile-link'));

  if (allMessages.length === 0) {
    console.warn('No messages found.');
    return 'No recent message found';
  }

  const lastMessage = allMessages[allMessages.length - 1];
  const senderName = allSenders[allSenders.length - 1]?.textContent.trim() || 'Unknown Sender';
  const messageText = lastMessage.textContent.trim();

  console.log(`Sender: ${senderName}, Message: ${messageText}`);
  return messageText ? `${senderName}: ${messageText}` : 'No recent message found';
}

function insertReplyIntoInput(inputElement, reply) {
  if (inputElement.getAttribute('contenteditable') === 'true') {
    inputElement.focus();
    inputElement.innerHTML = '';
    const paragraph = document.createElement('p');
    paragraph.textContent = reply;
    inputElement.appendChild(paragraph);
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
  } else if (inputElement.tagName === 'TEXTAREA' || inputElement.tagName === 'INPUT') {
    inputElement.value = reply;
    inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length;
  }
  inputElement.focus();
}

function getAdditionalContext(context, inputElement) {
  let additionalContext = '';
  if (context === 'post') {
    const postContent = document.querySelector('.share-box-modal .ql-editor')?.textContent.trim();
    additionalContext = `Current post draft: ${postContent || 'No content'}`;
  } else if (context === 'comment') {
    const parentPost = inputElement.closest('.feed-shared-update-v2')?.querySelector('.feed-shared-update-v2__description')?.textContent.trim();
    additionalContext = `Parent post: ${parentPost || 'No parent post found'}`;
  } else if (context === 'message') {
    const conversationTitle = document.querySelector('.msg-conversation-card__conversation-title')?.textContent.trim();
    additionalContext = `Conversation with: ${conversationTitle || 'Unknown'}`;
  }
  return additionalContext;
}

function handleTextBoxClick(event) {
  const clickedElement = event.target.closest('.share-creation-state__text-editor, #strong, .artdeco-button__text, .editor-content, .ql-editor, .msg-form__contenteditable');
  if (clickedElement) {
    currentInputElement = clickedElement;
    updateIconPosition(clickedElement);
  }
}

function getPreviousMessages(element, context) {
  let messages = [];
  let container;

  if (context === 'message') {
    container = element.closest('.msg-s-message-list-container');
  } else if (context === 'comment') {
    container = element.closest('.comments-comments-list');
  } else if (context === 'post') {
    container = element.closest('.share-box-modal');
  }

  if (container) {
    let messageElements;
    if (context === 'message') {
      messageElements = container.querySelectorAll('.msg-s-event-listitem__message-bubble');
    } else if (context === 'comment') {
      messageElements = container.querySelectorAll('.comments-comment-item');
    } else if (context === 'post') {
      messageElements = [container.querySelector('.ql-editor')];
    }

    messageElements.forEach((msgElement) => {
      let sender = msgElement.querySelector('.msg-s-message-group__name')?.textContent.trim();
      let content = msgElement.querySelector('.msg-s-event-listitem__body')?.textContent.trim();
      if (sender && content) {
        messages.push({ sender, content });
      }
    });
  }

  return messages.slice(-5);
}

function debugLog(...args) {
  console.log('[LinkedIn Assistant Debug]', ...args);
}

function getAIReply(text, context, previousMessages, additionalContext) {
  console.log('getAIReply called with:', { text, context, previousMessages, additionalContext });
  return new Promise((resolve, reject) => 
    chrome.storage.local.get(['userProfile', 'requestCount'], function(result) {
      console.log('Storage data:', result);
      const userProfile = result.userProfile || {};
      const currentRequestCount = result.requestCount || 0;
      chrome.runtime.sendMessage({
        action: "getAIReply",
        data: { text, context, previousMessages, additionalContext, userProfile, currentRequestCount }
      }, response => {
        console.log('Response from background script:', response);
        if (chrome.runtime.lastError) {
          console.error('Chrome runtime error:', chrome.runtime.lastError);
          reject(new Error(chrome.runtime.lastError.message));
        } else if (response && response.success) {
          console.log('AI reply received successfully');
          if (response.newRequestCount !== undefined) {
            chrome.storage.local.set({ requestCount: response.newRequestCount }, () => {
              console.log('Request count updated:', response.newRequestCount);
            });
          }
          resolve(response.reply);
        } else {
          const errorMessage = (response && response.error) || 'Failed to generate reply';
          console.error('Error generating reply:', errorMessage);
          if (errorMessage.includes('Rate limit exceeded') || errorMessage.includes('Daily request limit exceeded')) {
            showErrorMessage(errorMessage);
          }
          reject(new Error(errorMessage));
        }
      });
    })
  );
}



function extractAndStoreUserProfile() {
  if (window.location.href === "https://www.linkedin.com/feed/") {
    chrome.storage.local.get(['userProfile'], function(result) {
      if (!result.userProfile) {
        console.log("Extracting user profile from homepage");
        const nameElement = document.querySelector('.feed-identity-module__actor-meta a');
        const titleElement = document.querySelector('.feed-identity-module__headline');
        
        const userProfile = {
          name: nameElement ? nameElement.textContent.trim() : '',
          title: titleElement ? titleElement.textContent.trim() : '',
          about: '',
          experience: [],
          education: []
        };

        chrome.storage.local.set({ userProfile: userProfile }, function() {
          console.log('Initial user profile stored:', userProfile);
        });

        fetchDetailedProfileData();
      } else {
        console.log('User profile already stored:', result.userProfile);
      }
    });
  }
}

function fetchDetailedProfileData() {
  const profileLink = document.querySelector('.feed-identity-module__actor-meta a');
  if (profileLink) {
    const profileUrl = profileLink.href;
    chrome.runtime.sendMessage({ action: "fetchDetailedProfile", url: profileUrl });
  }
}

function extractProfileDataFromFeed() {
  const profileCard = document.querySelector('.feed-identity-module');
  if (!profileCard) return null;

  const name = profileCard.querySelector('.feed-identity-module__actor-meta a')?.textContent.trim() || '';
  const title = profileCard.querySelector('.feed-identity-module__headline')?.textContent.trim() || '';
  const photoUrl = profileCard.querySelector('.feed-identity-module__member-photo')?.src || '';
  const connectionCount = profileCard.querySelector('.feed-identity-module__stat strong')?.textContent.trim() || '0';

  return {
    name,
    title,
    photoUrl,
    connectionCount,
    about: '',
    experience: [],
    education: []
  };
}

function sendProfileDataToBackground(profileData) {
  chrome.runtime.sendMessage({
    action: "updateUserProfile",
    data: profileData
  }, response => {
    if (chrome.runtime.lastError) {
      console.error('Error sending profile data:', chrome.runtime.lastError);
    } else {
      console.log('Profile data sent to background script:', response);
    }
  });
}

function initializeProfileDataExtraction() {
  const profileData = extractProfileDataFromFeed();
  if (profileData) {
    sendProfileDataToBackground(profileData);
  }
}

function extractDetailedProfileData() {
  const aboutElement = document.querySelector('.pv-about-section .pv-shared-text-with-see-more');
  const experienceElements = document.querySelectorAll('.pv-experience-section .pv-position-entity');
  const educationElements = document.querySelectorAll('.pv-education-section .pv-education-entity');

  const about = aboutElement ? aboutElement.textContent.trim() : '';
  const experience = Array.from(experienceElements).map(el => {
    const title = el.querySelector('.t-16.t-black.t-bold')?.textContent.trim();
    const company = el.querySelector('.pv-entity__secondary-title')?.textContent.trim();
    return `${title} at ${company}`;
  });
  const education = Array.from(educationElements).map(el => {
    const school = el.querySelector('.pv-entity__school-name')?.textContent.trim();
    const degree = el.querySelector('.pv-entity__degree-name .pv-entity__comma-item')?.textContent.trim();
    return `${degree} from ${school}`;
  });

  chrome.storage.local.get(['userProfile'], function(result) {
    const updatedProfile = {
      ...result.userProfile,
      about,
      experience,
      education
    };

    chrome.storage.local.set({ userProfile: updatedProfile }, function() {
      console.log('Detailed user profile stored:', updatedProfile);
    });
  });
}

async function checkRequestCount() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "checkRequestCount" }, (response) => {
      resolve(response.requiresAuth);
    });
  });
}

function incrementRequestCount() {
  chrome.runtime.sendMessage({ action: "incrementRequestCount" });
}

function showAuthRequiredMessage() {
  showErrorMessage('You have reached the limit of free requests. Please sign up or log in to continue using the extension.');
}

function init() {
  createIcon();
  document.addEventListener('focus', handleTextBoxClick, true);
  document.addEventListener('keydown', handleKeyPress);

  initializeProfileDataExtraction();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.matches('.share-box-modal') || node.querySelector('.share-box-modal')) {
              const checkForPostInput = setInterval(() => {
                const postInput = document.querySelector('.share-creation-state__text-editor');
                if (postInput) {
                  clearInterval(checkForPostInput);
                  currentInputElement = postInput;
                  updateIconPosition(postInput);
                }
              }, 100);

              setTimeout(() => clearInterval(checkForPostInput), 5000);
            }
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  document.addEventListener('click', (event) => {
    const clickedElement = event.target.closest('.share-creation-state__text-editor, #strong, .artdeco-button__text, .editor-content, .ql-editor, .msg-form__contenteditable, .linkedin-assistant-icon');
    if (clickedElement) {
      currentInputElement = clickedElement;
      updateIconPosition(clickedElement);
    } else {
      currentInputElement = null;
      hideIcon();
    }
  });

  extractAndStoreUserProfile();

  // Load the request count from storage
  chrome.storage.local.get(['requestCount'], (result) => {
    requestCount = result.requestCount || 0;
  });
}

init();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "init") {
    init();
    sendResponse({status: "OK"});
  } else if (request.action === "showIcon") {
    showIcon();
  } else if (request.action === "hideIcon") {
    hideIcon();
  } else if (request.action === "insertText") {
    insertText(request.text);
    sendResponse({ success: true });
  } else if (request.action === "extractDetailedProfile") {
    // extractDetailedProfileData();
    sendResponse({ success: true });
  }
  return true;
});