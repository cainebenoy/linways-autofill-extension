function sendMessage(action, type = "AUTO_FILL_ALL") {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (action, type) => window.postMessage({ type: type, action }, "*"),
      args: [action, type]
    });
  });
}

// Auto-fill all teachers buttons
document.getElementById("autoExcellent").addEventListener("click", () => {
  if (confirm("This will automatically fill forms for all teachers with EXCELLENT ratings. Continue?")) {
    sendMessage("excellent");
  }
});

document.getElementById("autoVeryGood").addEventListener("click", () => {
  if (confirm("This will automatically fill forms for all teachers with VERY GOOD ratings. Continue?")) {
    sendMessage("verygood");
  }
});

document.getElementById("autoRandom").addEventListener("click", () => {
  if (confirm("This will automatically fill forms for all teachers with RANDOM ratings (4-5). Continue?")) {
    sendMessage("random");
  }
});
