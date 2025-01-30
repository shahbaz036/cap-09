let ports = {};

chrome.runtime.onConnect.addListener((port) => {
  const portId = port.name === "linkedin-automation" ? port.sender.tab.id : "popup";
  ports[portId] = port;

  port.onDisconnect.addListener(() => {
    delete ports[portId];
  });

  port.onMessage.addListener((msg) => {
    handleMessage(msg, port);
  });
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message in background script:", request);

  if (request.action === "updateUserProfile") {
    chrome.storage.local.set({ userProfile: request.data }, () => {
      console.log('User profile updated:', request.data);
      sendResponse({ success: true });
    });
    return true;
  }

  // if (request.action === 'paymentComplete') {
  //   // Forward the message to the extension popup
  //   chrome.runtime.sendMessage(request);
  // }

  if (request.action === "fetchDetailedProfile") {
    chrome.tabs.create({ url: request.url, active: false }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
        if (tabId === tab.id && info.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(listener);
          chrome.tabs.sendMessage(tabId, { action: "extractDetailedProfile" }, (response) => {
            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
            } else {
              console.log("Detailed profile extracted");
            }
            chrome.tabs.remove(tabId);
          });
        }
      });
    });
  }

  handleMessage(request, { postMessage: sendResponse });
  return true;
});

function handleMessage(msg, port) {
  switch (msg.action) {
    case "getAIReply":
      handleGetAIReply(msg.data, port);
      break;
    case "checkRequestCount":
      handleCheckRequestCount(port);
      break;
    case "incrementRequestCount":
      handleIncrementRequestCount(port);
      break;
    default:
      console.log("Unknown action:", msg.action);
  }
}

function handleGetAIReply(data, port) {
  console.log('handleGetAIReply called with data:', data);
  chrome.storage.local.get(['token', 'requestCount'], function(result) {
    const currentRequestCount = result.requestCount || 0;
    const token = result.token;
    
    console.log('Current request count:', currentRequestCount);
    console.log('Token present:', !!token);

    const headers = {
      'Content-Type': 'application/json'
    };
    if (token && token !== 'undefined') {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    fetch('http://localhost:5000/api/get-ai-reply', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        text: data.text,
        context: data.context,
        previousMessages: data.previousMessages,
        additionalContext: data.additionalContext,
        userProfile: data.userProfile
      })
    })
    .then(response => {
      console.log('Response status:', response.status);
      return response.json();
    })
    .then(responseData => {
      console.log('Response data:', responseData);
      if (responseData.success && responseData.reply) {
        if (!token || token === 'undefined') {
          const newRequestCount = currentRequestCount + 1;
          chrome.storage.local.set({ requestCount: newRequestCount });
          console.log('Incremented request count:', newRequestCount);
        }
        port.postMessage({
          action: "aiReply",
          success: true,
          reply: responseData.reply,
          newRequestCount: !token || token === 'undefined' ? currentRequestCount + 1 : undefined
        });
      } else {
        port.postMessage({
          action: "aiReply",
          success: false,
          error: responseData.error || 'Failed to generate reply'
        });
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      port.postMessage({action: "aiReply", success: false, error: error.message});
    });
  });
}

function handleCheckRequestCount(port) {
  chrome.storage.local.get(['token', 'requestCount'], function(result) {
    const requestCount = result.requestCount || 0;
    const token = result.token;
    const requiresAuth = !token && requestCount >= 20;
    port.postMessage({ action: "requestCountCheck", requiresAuth, count: requestCount });
  });
}

function handleIncrementRequestCount(port) {
  chrome.storage.local.get(['requestCount'], function(result) {
    const newCount = (result.requestCount || 0) + 1;
    chrome.storage.local.set({ requestCount: newCount }, function() {
      port.postMessage({ action: "requestCountIncremented", count: newCount });
    });
  });
}

console.log("Background script loaded and running");

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('linkedin.com')) {
    chrome.tabs.sendMessage(tabId, { action: "init" }, (response) => {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      } else if (response && response.status === "OK") {
        console.log("Content script initialized");
      }
    });
  }
});