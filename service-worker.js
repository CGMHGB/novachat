// Service Worker for NovaChat Chrome Extension
// Allows the side panel to open upon clicking the action icon on any webpage

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onInstalled.addListener(() => {
  console.log('NovaChat Chrome Extension Installed successfully.');
});
