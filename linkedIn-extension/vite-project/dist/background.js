let ports = {};
let lastRequestTime = 0;
const MAX_REQUESTS_PER_MINUTE = 5;
const REQUEST_INTERVAL = 60000 / MAX_REQUESTS_PER_MINUTE;

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

  handleMessage(request, { postMessage: sendResponse });

  if (request.action === "generateText") {
    console.log("Generate Text");
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < REQUEST_INTERVAL) {
      console.log("Rate limit exceeded");
      sendResponse({ error: "Rate limit exceeded. Please wait before making another request." });
    } else {
      console.log("Generate Text Else block");
      lastRequestTime = currentTime;
      generateTextWithGemini(request.command)
        .then(generatedText => {
          console.log("Generated text:", generatedText);
          sendResponse({ text: generatedText });
        })
        .catch(error => {
          console.error("Error generating text:", error);
          sendResponse({ error: error.message });
        });
    }
    return true; // Indicates that the response is sent asynchronously
  }
  return true;
});

async function generateTextWithGemini(prompt) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['token'], async (result) => {
      const token = result.token;

      if (!token) {
        console.error("Token not found");
        return reject(new Error("User not authenticated"));
      }

      console.log("Generating text with prompt:", prompt);

      try {
        const response = await fetch('http://localhost:5000/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ prompt: prompt }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API response not OK:", response.status, errorText);
          return reject(new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`));
        }

        const data = await response.json();
        console.log("API response data:", JSON.stringify(data, null, 2));
        
        if (data.generatedText) {
          resolve(data.generatedText.trim());
        } else {
          reject(new Error("No generated text found in the response"));
        }
      } catch (error) {
        console.error("Error in generateTextWithGemini:", error);
        reject(error);
      }
    });
  });
}

function handleMessage(msg, port) {
  console.log("Handle message");
  switch (msg.action) {
    case "getAIReply":
      handleGetAIReply(msg.data, port);
      break;
    case "showIcon":
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "showIcon"});
        }
      });
      break;
    case "hideIcon":
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {action: "hideIcon"});
        }
      });
      break;
  }
}

function handleGetAIReply(data, port) {
  chrome.storage.local.get(['token'], function(result) {
    if (result.token) {
      fetch('http://localhost:5000/api/get-ai-reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${result.token}`
        },
        body: JSON.stringify({
          text: data.text,
          context: data.context,
          previousMessages: data.previousMessages,
          additionalContext: data.additionalContext
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success && data.reply) {
          port.postMessage({action: "aiReply", success: true, reply: data.reply});
        } else {
          port.postMessage({action: "aiReply", success: false, error: data.error || 'Failed to generate reply'});
        }
      })
      .catch(error => {
        console.error('Error:', error);
        port.postMessage({action: "aiReply", success: false, error: error.message});
      });
    } else {
      port.postMessage({action: "aiReply", success: false, error: 'User not logged in'});
    }
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