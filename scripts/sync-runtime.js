'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const runtimePath = path.join(root, 'pet-runtime.js');
const extensionContentPath = path.join(root, 'extension', 'content.js');
const userScriptPath = path.join(root, 'companion-pets.user.js');

const runtimeSource = fs.readFileSync(runtimePath, 'utf8').trim();

const extensionContent = `(function () {
  'use strict';

  if (window.__cpEnhancedMounted) return;
  window.__cpEnhancedMounted = true;

${runtimeSource}

  createCompanionPetsRuntime({
    storageKey: 'companion_pets_v3',
    posKey: 'cp_widget_pos_v3',
    mountDelayMs: 1500,
    injectStyle: function (css) {
      return new Promise(function (resolve) {
        chrome.runtime.sendMessage({ type: 'inject-css', css: css }, function () {
          resolve();
        });
      });
    }
  });
})();
`;

const userScriptHeader = `// ==UserScript==
// @name         Companion Pets
// @namespace    https://github.com/companion-pets
// @version      2.1.0
// @description  增强版陪伴宠物：状态养成 + 动作交互 + 命令反馈
// @author       companion-pets
// @match        http://127.0.0.1:18789/*
// @match        https://chatgpt.com/*
// @match        https://claude.ai/*
// @match        https://gemini.google.com/*
// @match        https://kimi.moonshot.cn/*
// @match        https://doubao.com/*
// @match        https://hunyuan.tencent.com/*
// @match        https://tongyi.aliyun.com/*
// @match        https://yuanbao.tencent.com/*
// @match        https://qwen.aliyun.com/*
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==
`;

const userScript = `${userScriptHeader}
(function () {
  'use strict';

  if (window.__cpEnhancedMounted) return;
  window.__cpEnhancedMounted = true;

${runtimeSource}

  createCompanionPetsRuntime({
    storageKey: 'companion_pets_v3',
    posKey: 'cp_widget_pos_v3',
    mountDelayMs: 1500,
    injectStyle: function (css) {
      GM_addStyle(css);
    }
  });
})();
`;

fs.writeFileSync(extensionContentPath, extensionContent, 'utf8');
fs.writeFileSync(userScriptPath, userScript, 'utf8');

console.log('[sync-runtime] generated: extension/content.js and companion-pets.user.js');
