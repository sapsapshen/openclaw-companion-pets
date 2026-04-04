// ==UserScript==
// @name         Companion Pets
// @namespace    https://github.com/companion-pets
// @version      1.0.0
// @description  在任意网页右下角显示陪伴宠物小部件，10 种宠物 ASCII 动画 + 点击互动
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

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  // 宠物数据库
  // ─────────────────────────────────────────────
  const PET_DB = {
    lobster: {
      emoji: '🦞', name: '小龙虾', color: '#ff4500',
      frames: {
        idle:    [' /\\  /\\\n(oo)\n >||<\n /  \\', ' /\\  /\\\n(-.-)\n >||<\n /  \\'],
        excited: [' \\o/\n(^o^)\n >||<\n/ \\/ \\', ' /o\\\n(^O^)\n >||<\n\\ /\\ /'],
        sleep:   [' /\\  /\\\n(-_-)\n >||<\n /  \\', ' /\\  /\\\n(-.-)zzz\n >||<\n /  \\']
      },
      lines: ['咕噜咕噜，今天想吃什么？', '钳子已就位！', '冒泡中...咕噜~', '主人快摸我的钳子！', '听说今天有好吃的？']
    },
    cat: {
      emoji: '🐱', name: '猫咪', color: '#ff9a3c',
      frames: {
        idle:    [' /\\_/\\\n( o.o )\n > ^ <\n(__|__)', ' /\\_/\\\n( -.- )\n > ^ <\n(__|__)'],
        excited: [' /\\_/\\\n( ^w^ )\n > ^ <\n(__|__)', ' /\\_/\\\n( OwO )\n >|^|<\n(__|__)'],
        sleep:   [' /\\_/\\\n( -_- )\n > ^ <\n  zzz', ' /\\_/\\\n(  - )\n > ^ <\n   zz']
      },
      lines: ['喵~ 今天天气不错', '快来撸我！', '本喵不稀罕你... 才怪', '喵喵喵，饿了', '午睡时间到了，别吵']
    },
    dog: {
      emoji: '🐶', name: '狗狗', color: '#c8860a',
      frames: {
        idle:    ['  / \\\n (o.o)\n  |U|\n /   \\', '  / \\\n (o.o)\n  |U|\n  /|\\'],
        excited: ['  / \\\n (^o^)\n  |U|\n/\\   /\\', '  / \\\n (>o<)\n  |UU|\n/ \\ / \\'],
        sleep:   ['  / \\\n (-_-)\n  |U|\n  zzz', '  / \\\n (o-o)\n  |U|\n   zz']
      },
      lines: ['汪！主人回来了！', '带我去散步嘛~', '汪汪！有好吃的！', '我最喜欢你了！尾巴狂摇', '汪...困了...']
    },
    frog: {
      emoji: '🐸', name: '青蛙', color: '#3cb043',
      frames: {
        idle:    ['  @ @\n (o-o)\n//| |\\\\', '  @ @\n (o_o)\n//| |\\\\'],
        excited: ['  @ @\n (^o^)\n//\\|/\\\\', '  @ @\n (*o*)\n// \\|/ \\\\'],
        sleep:   ['  @ @\n (-_-)\n//| |\\\\\n zzz', '  @ @\n (o-o)\n//| |\\\\\n  z']
      },
      lines: ['呱呱！今天也要加油！', '呱~ 水里好凉快', '呱呱呱，今天有虫子吃！', '跳！呱！', '（呱...睡着了）']
    },
    doraemon: {
      emoji: '🤖', name: '机器猫', color: '#0099cc',
      frames: {
        idle:    [' _____\n(o   o)\n( === )\n  | |', ' _____\n(o . o)\n( === )\n  | |'],
        excited: [' _____\n(^   ^)\n( === )\n  |*|', ' _____\n(> < )\n(=====)\n  |*|'],
        sleep:   [' _____\n(-   -)\n( === )\n  zzz', ' _____\n(~   ~)\n( === )\n   zz']
      },
      lines: ['叮当！从四次元口袋取出道具~', '小夫你不许欺负大雄！', '铜锣烧！铜锣烧！', '任意门启动！', '今天进口袋睡觉了']
    },
    pikachu: {
      emoji: '⚡', name: '皮卡丘', color: '#ffd700',
      frames: {
        idle:    [' /\\  /\\\n(o  o)\n  ww\n__|__|__', ' /\\  /\\\n(^  ^)\n  ww\n__|__|__'],
        excited: [' /\\  /\\\n(*  *)\n  ww\n__|__|__\n  ⚡⚡', ' /\\  /\\\n(>  <)\n  ww\n__|__|__\n ⚡⚡⚡'],
        sleep:   [' /\\  /\\\n(-  -)\n  ww\n__|__|__\n  zzz', ' /\\  /\\\n(o  -)\n  ww\n__|__|__\n   zz']
      },
      lines: ['皮卡皮卡！⚡', '皮卡丘选择你！', '皮 ~ 卡 ~ 丘！', '（充电中...嗖嗖嗖）', '皮卡...（打哈欠）']
    },
    pig: {
      emoji: '🐷', name: '肥猪', color: '#ff69b4',
      frames: {
        idle:    ['  ___\n (o.o)\n  \\U/\n /   \\', '  ___\n (o-o)\n  \\U/\n /   \\'],
        excited: ['  ___\n (^U^)\n  \\/\n / \\ /', '  ___\n (UwU)\n  \\/\n/\\ /\\'],
        sleep:   ['  ___\n (-_-)\n  \\U/\n  zzz', '  ___\n (o_o)\n  \\U/\n   zz']
      },
      lines: ['哼哼，今天吃了多少卡？', '猪脑子转不过来了...', '哼！肥而不腻！', '再睡一会儿....哼', '有吃的吗？哼哼~']
    },
    capybara: {
      emoji: '🦫', name: '卡皮巴拉', color: '#8b6914',
      frames: {
        idle:    ['  ____\n (o  o)\n |    |\n/      \\', '  ____\n (o  -)\n |    |\n/      \\'],
        excited: ['  ____\n (^  ^)\n |    |\n/ \\  / \\', '  ____\n (*  *)\n |    |\n/  \\/  \\'],
        sleep:   ['  ____\n (-  -)\n |    |\n  zzz', '  ____\n (~  ~)\n |    |\n   zz']
      },
      lines: ['（淡定）没什么大不了的', '我可以坐在任何地方', '泡澡最舒服了...', '世界和平，卡皮巴拉镇定', '嗯...（继续淡定）']
    },
    snake: {
      emoji: '🐍', name: '蟒蛇', color: '#2e8b57',
      frames: {
        idle:    ['  _\n ( )\n--S--\n  ~', '  _\n ( )\n -S-\n ~~~'],
        excited: ['  _\n (^)\n/SSS\\\n ~~~', '  _\n (*)\n/SSS\\\n~~~~'],
        sleep:   ['  _\n(-)\n -S-\n zzz', '  _\n(~)\n -S-\n  zz']
      },
      lines: ['嘶嘶嘶...（吐舌头）', '冷血动物需要晒太阳', '嘶—别惹我！', '盘成一团睡觉中', '消化中...嘶嘶']
    },
    cicada: {
      emoji: '🦗', name: '知了', color: '#6b8e23',
      frames: {
        idle:    [' \\  /\n  \\/\n (oo)\n  /\\', ' \\  /\n  \\/\n (--)\n  /\\'],
        excited: [' \\  /\n  \\/\n (^^)\n  /\\\n 知!了!', ' \\  /\n  \\/\n (*o*)\n  /\\\n知~了~'],
        sleep:   [' \\  /\n  \\/\n (-_)\n  /\\\n  zzz', ' \\  /\n  \\/\n (- -)\n  /\\\n   zz']
      },
      lines: ['知~了~知~了~', '（震耳欲聋）知了知了！', '夏天到了，我最响！', '树皮真好吃...', '（停了...）zzzz']
    }
  };

  const PET_KEYS = Object.keys(PET_DB);
  const STORAGE_KEY = 'companion_pets_v1';

  // ─────────────────────────────────────────────
  // 持久化：localStorage（取代服务端文件存储）
  // ─────────────────────────────────────────────
  function loadPetKey() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { key } = JSON.parse(raw);
        if (PET_DB[key]) return key;
      }
    } catch (_) {}
    return null;
  }

  function savePetKey(key) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ key, assignedAt: Date.now() }));
    } catch (_) {}
  }

  function getOrAssignPet() {
    let key = loadPetKey();
    if (!key) {
      key = PET_KEYS[Math.floor(Math.random() * PET_KEYS.length)];
      savePetKey(key);
    }
    return key;
  }

  // ─────────────────────────────────────────────
  // 挂载入口：等待 document.body 就绪
  // ─────────────────────────────────────────────
  function init() {
    if (document.getElementById('cp-pet-widget')) return;
    if (document.body) {
      mount();
    } else {
      document.addEventListener('DOMContentLoaded', mount, { once: true });
    }
  }

  // ─────────────────────────────────────────────
  // 主逻辑：构建 Widget
  // ─────────────────────────────────────────────
  function mount() {
    if (document.getElementById('cp-pet-widget')) return;

    const petKey = getOrAssignPet();
    const PET = PET_DB[petKey];

    // ── CSS（GM_addStyle 绕过页面 CSP）─────────
    GM_addStyle(`
      #cp-pet-widget {
        position: fixed; bottom: 24px; right: 24px; z-index: 2147483647;
        font-family: monospace; white-space: pre; font-size: 13px; line-height: 1.3;
        color: ${PET.color}; cursor: pointer;
        background: rgba(255,255,255,0.93); padding: 12px 14px;
        border-radius: 14px; box-shadow: 0 4px 18px rgba(0,0,0,0.18);
        user-select: none; transition: box-shadow 0.2s;
        min-width: 80px; text-align: center;
      }
      #cp-pet-widget:hover { box-shadow: 0 6px 24px rgba(0,0,0,0.26); }
      #cp-bubble {
        position: absolute; bottom: calc(100% + 10px); left: 50%;
        transform: translateX(-50%) scale(0.8);
        background: ${PET.color}; color: #fff;
        padding: 7px 13px; border-radius: 10px;
        font-family: sans-serif; font-size: 13px; white-space: nowrap;
        pointer-events: none; opacity: 0;
        transition: opacity 0.2s, transform 0.2s;
        box-shadow: 0 2px 10px rgba(0,0,0,0.18);
      }
      #cp-bubble.show { opacity: 1; transform: translateX(-50%) scale(1); }
      #cp-bubble::after {
        content: ''; position: absolute; top: 100%; left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent; border-top-color: ${PET.color};
      }
      #cp-name-tag { font-family: sans-serif; font-size: 11px; color: #888; margin-top: 4px; }
      #cp-controls { display: flex; justify-content: center; gap: 6px; margin-top: 6px; }
      #cp-controls button {
        font-family: sans-serif; font-size: 10px; padding: 2px 7px;
        border: 1px solid #ddd; border-radius: 8px; background: #f7f7f7;
        color: #666; cursor: pointer; white-space: nowrap; transition: background 0.15s;
      }
      #cp-controls button:hover { background: ${PET.color}; color: #fff; border-color: ${PET.color}; }
      @keyframes cp-bounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-8px)} 70%{transform:translateY(-4px)} }
      @keyframes cp-shake  { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(-12deg)} 75%{transform:rotate(12deg)} }
      .cp-anim-bounce { animation: cp-bounce 0.5s ease; }
      .cp-anim-shake  { animation: cp-shake  0.4s ease; }
    `);

    // ── DOM ────────────────────────────────────
    const widget  = document.createElement('div'); widget.id = 'cp-pet-widget';
    const bubble  = document.createElement('div'); bubble.id = 'cp-bubble';
    const asciiEl = document.createElement('div'); asciiEl.id = 'cp-ascii';
    const nameTag = document.createElement('div'); nameTag.id = 'cp-name-tag';
    nameTag.textContent = PET.emoji + ' ' + PET.name;

    // 按钮行
    const controls = document.createElement('div'); controls.id = 'cp-controls';
    const btnReset = document.createElement('button'); btnReset.textContent = '换一只';
    const btnHide  = document.createElement('button'); btnHide.textContent = '隐藏';
    controls.appendChild(btnReset);
    controls.appendChild(btnHide);

    widget.appendChild(bubble);
    widget.appendChild(asciiEl);
    widget.appendChild(nameTag);
    widget.appendChild(controls);
    document.body.appendChild(widget);

    // ── 动画帧 ─────────────────────────────────
    let animState = 'idle';
    let frameIdx  = 0;

    setInterval(function () {
      const frames = PET.frames[animState] || PET.frames.idle;
      asciiEl.textContent = frames[frameIdx % frames.length];
      frameIdx++;
    }, 800);

    // ── 气泡 ───────────────────────────────────
    let bubbleTimer = null;
    function showBubble(text) {
      bubble.textContent = text;
      bubble.classList.add('show');
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => bubble.classList.remove('show'), 3000);
    }

    // ── 状态机 ─────────────────────────────────
    let stateTimer = null;
    function setExcited() {
      animState = 'excited'; frameIdx = 0;
      widget.classList.remove('cp-anim-bounce', 'cp-anim-shake');
      void widget.offsetWidth; // reflow 触发重播
      widget.classList.add(Math.random() > 0.5 ? 'cp-anim-bounce' : 'cp-anim-shake');
      clearTimeout(stateTimer);
      stateTimer = setTimeout(() => { animState = 'idle'; schedSleep(); }, 4000);
    }
    function schedSleep() {
      clearTimeout(stateTimer);
      stateTimer = setTimeout(() => { animState = 'sleep'; frameIdx = 0; }, 30000);
    }
    schedSleep();

    // ── 输入框注入（React/Vue 兼容） ────────────
    function injectToInput(text) {
      const selectors = [
        'textarea[placeholder*="消息"]', 'textarea[placeholder*="输入"]',
        'textarea[placeholder*="message"]', 'textarea[placeholder*="Message"]',
        'div[contenteditable="true"]', 'textarea', 'input[type="text"]'
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (!el || el.offsetParent === null) continue;
        if (el.tagName === 'DIV') {
          // contenteditable
          el.focus();
          document.execCommand('selectAll', false, null);
          document.execCommand('insertText', false, text);
        } else {
          // input / textarea：走 React nativeInputValueSetter
          const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value');
          if (desc && desc.set) desc.set.call(el, text); else el.value = text;
          el.dispatchEvent(new Event('input',  { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
        el.focus();
        return;
      }
    }

    // ── 点击互动 ────────────────────────────────
    asciiEl.addEventListener('click', function () {
      const line = PET.lines[Math.floor(Math.random() * PET.lines.length)];
      showBubble(line);
      setExcited();
      injectToInput(line);
    });
    nameTag.addEventListener('click', function () {
      const line = PET.lines[Math.floor(Math.random() * PET.lines.length)];
      showBubble(line);
      setExcited();
      injectToInput(line);
    });

    // ── 换一只按钮 ─────────────────────────────
    btnReset.addEventListener('click', function (e) {
      e.stopPropagation();
      localStorage.removeItem(STORAGE_KEY);
      // 移除旧 widget，重新挂载
      widget.remove();
      mount();
    });

    // ── 隐藏按钮 ───────────────────────────────
    btnHide.addEventListener('click', function (e) {
      e.stopPropagation();
      widget.style.display = 'none';
      // 10 分钟后自动恢复
      setTimeout(() => { widget.style.display = ''; }, 10 * 60 * 1000);
    });

    // ── /pet 指令监听（MutationObserver） ───────
    const observer = new MutationObserver(function (mutations) {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          const t = (node.textContent || '').trim();
          if (/\/pet\s*reset/i.test(t)) {
            localStorage.removeItem(STORAGE_KEY);
            widget.remove();
            observer.disconnect();
            setTimeout(mount, 100);
            return;
          }
          if (/\/pet/i.test(t)) {
            showBubble('就是我！' + PET.name + ' ' + PET.emoji + ' 在此！');
            setExcited();
          }
        }
      }
    });
    const root = document.querySelector('[class*="chat"],[class*="message"],[class*="msg"],main') || document.body;
    observer.observe(root, { childList: true, subtree: true });
  }

  // ─────────────────────────────────────────────
  // 启动（兼容 SPA 延迟渲染）
  // ─────────────────────────────────────────────
  init();
  window.addEventListener('load', init);
  setTimeout(init, 1500);

})();
