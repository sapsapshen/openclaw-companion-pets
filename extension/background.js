// Service Worker：接收 content.js 发来的 CSS 注入请求
// chrome.scripting.insertCSS() 由扩展层执行，完全绕过页面 CSP
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'inject-css' && sender.tab?.id) {
    chrome.scripting.insertCSS({
      target: { tabId: sender.tab.id },
      css: msg.css
    })
      .then(() => sendResponse({ ok: true }))
      .catch(err => sendResponse({ ok: false, err: err.message }));
    return true; // 保持消息通道开启（异步响应必须）
  }
});
