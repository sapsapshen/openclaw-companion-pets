/**
 * companion-pets — 多宠物字符动画核心模块
 * 纯浏览器原生能力：position:fixed + z-index + monospace + CSS @keyframes + setInterval
 * 宠物持久化：localStorage 保存分配结果，/pet reset 才会重置
 */

'use strict';

// ─────────────────────────────────────────────
// 宠物数据库：每种宠物含 idle/excited/sleep 三帧 + 性格台词 + 主题色
// ─────────────────────────────────────────────
const PET_DB = {
  lobster: {
    emoji: '🦞',
    name: '小龙虾',
    color: '#ff4500',
    frames: {
      idle: [
        ' /\\  /\\\n(oo)\n >||<\n /  \\',
        ' /\\  /\\\n(-.-)\n >||<\n /  \\'
      ],
      excited: [
        ' \\o/\n(^o^)\n >||<\n/ \\/ \\',
        ' /o\\\n(^O^)\n >||<\n\\ /\\ /'
      ],
      sleep: [
        ' /\\  /\\\n(-_-)\n >||<\n /  \\',
        ' /\\  /\\\n(-.-)zzz\n >||<\n /  \\'
      ]
    },
    lines: [
      '咕噜咕噜，今天想吃什么？',
      '钳子已就位！',
      '冒泡中...咕噜~',
      '主人快摸我的钳子！',
      '听说今天有好吃的？'
    ]
  },
  cat: {
    emoji: '🐱',
    name: '猫咪',
    color: '#ff9a3c',
    frames: {
      idle: [
        ' /\\_/\\\n( o.o )\n > ^ <\n(__|__)',
        ' /\\_/\\\n( -.- )\n > ^ <\n(__|__)'
      ],
      excited: [
        ' /\\_/\\\n( ^w^ )\n > ^ <\n(__|__)',
        ' /\\_/\\\n( OwO )\n >|^|<\n(__|__)'
      ],
      sleep: [
        ' /\\_/\\\n( -_- )\n > ^ <\n  zzz',
        ' /\\_/\\\n(  - )\n > ^ <\n   zz'
      ]
    },
    lines: [
      '喵~ 今天天气不错',
      '快来撸我！',
      '本喵不稀罕你... 才怪',
      '喵喵喵，饿了',
      '午睡时间到了，别吵'
    ]
  },
  dog: {
    emoji: '🐶',
    name: '狗狗',
    color: '#c8860a',
    frames: {
      idle: [
        '  / \\\n (o.o)\n  |U|\n /   \\',
        '  / \\\n (o.o)\n  |U|\n  /|\\'
      ],
      excited: [
        '  / \\\n (^o^)\n  |U|\n/\\   /\\',
        '  / \\\n (>o<)\n  |UU|\n/ \\ / \\'
      ],
      sleep: [
        '  / \\\n (-_-)\n  |U|\n  zzz',
        '  / \\\n (o-o)\n  |U|\n   zz'
      ]
    },
    lines: [
      '汪！主人回来了！',
      '带我去散步嘛~',
      '汪汪！有好吃的！',
      '我最喜欢你了！尾巴狂摇',
      '汪...困了...'
    ]
  },
  frog: {
    emoji: '🐸',
    name: '青蛙',
    color: '#3cb043',
    frames: {
      idle: [
        '  @ @\n (o-o)\n//| |\\\\',
        '  @ @\n (o_o)\n//| |\\\\'
      ],
      excited: [
        '  @ @\n (^o^)\n//\\|/\\\\',
        '  @ @\n (*o*)\n// \\|/ \\\\'
      ],
      sleep: [
        '  @ @\n (-_-)\n//| |\\\\\n zzz',
        '  @ @\n (o-o)\n//| |\\\\\n  z'
      ]
    },
    lines: [
      '呱呱！今天也要加油！',
      '呱~ 水里好凉快',
      '呱呱呱，今天有虫子吃！',
      '跳！呱！',
      '（呱...睡着了）'
    ]
  },
  doraemon: {
    emoji: '🤖',
    name: '机器猫',
    color: '#0099cc',
    frames: {
      idle: [
        ' _____\n(o   o)\n( === )\n  | |',
        ' _____\n(o . o)\n( === )\n  | |'
      ],
      excited: [
        ' _____\n(^   ^)\n( === )\n  |*|',
        ' _____\n(> < )\n(=====)\n  |*|'
      ],
      sleep: [
        ' _____\n(-   -)\n( === )\n  zzz',
        ' _____\n(~   ~)\n( === )\n   zz'
      ]
    },
    lines: [
      '叮当！从四次元口袋取出道具~',
      '小夫你不许欺负大雄！',
      '铜锣烧！铜锣烧！',
      '任意门启动！',
      '今天进口袋睡觉了'
    ]
  },
  pikachu: {
    emoji: '⚡',
    name: '皮卡丘',
    color: '#ffd700',
    frames: {
      idle: [
        ' /\\  /\\\n(o  o)\n  ww\n__|__|__',
        ' /\\  /\\\n(^  ^)\n  ww\n__|__|__'
      ],
      excited: [
        ' /\\  /\\\n(*  *)\n  ww\n__|__|__\n  ⚡⚡',
        ' /\\  /\\\n(>  <)\n  ww\n__|__|__\n ⚡⚡⚡'
      ],
      sleep: [
        ' /\\  /\\\n(-  -)\n  ww\n__|__|__\n  zzz',
        ' /\\  /\\\n(o  -)\n  ww\n__|__|__\n   zz'
      ]
    },
    lines: [
      '皮卡皮卡！⚡',
      '皮卡丘选择你！',
      '皮 ~ 卡 ~ 丘！',
      '（充电中...嗖嗖嗖）',
      '皮卡...（打哈欠）'
    ]
  },
  pig: {
    emoji: '🐷',
    name: '肥猪',
    color: '#ff69b4',
    frames: {
      idle: [
        '  ___\n (o.o)\n  \\U/\n /   \\',
        '  ___\n (o-o)\n  \\U/\n /   \\'
      ],
      excited: [
        '  ___\n (^U^)\n  \\/\n / \\ /',
        '  ___\n (UwU)\n  \\/\n/\\ /\\'
      ],
      sleep: [
        '  ___\n (-_-)\n  \\U/\n  zzz',
        '  ___\n (o_o)\n  \\U/\n   zz'
      ]
    },
    lines: [
      '哼哼，今天吃了多少卡？',
      '猪脑子转不过来了...',
      '哼！肥而不腻！',
      '再睡一会儿....哼',
      '有吃的吗？哼哼~'
    ]
  },
  capybara: {
    emoji: '🦫',
    name: '卡皮巴拉',
    color: '#8b6914',
    frames: {
      idle: [
        '  ____\n (o  o)\n |    |\n/      \\',
        '  ____\n (o  -)\n |    |\n/      \\'
      ],
      excited: [
        '  ____\n (^  ^)\n |    |\n/ \\  / \\',
        '  ____\n (*  *)\n |    |\n/  \\/  \\'
      ],
      sleep: [
        '  ____\n (-  -)\n |    |\n  zzz',
        '  ____\n (~  ~)\n |    |\n   zz'
      ]
    },
    lines: [
      '（淡定）没什么大不了的',
      '我可以坐在任何地方',
      '泡澡最舒服了...',
      '世界和平，卡皮巴拉镇定',
      '嗯...（继续淡定）'
    ]
  },
  snake: {
    emoji: '🐍',
    name: '蟒蛇',
    color: '#2e8b57',
    frames: {
      idle: [
        '  _\n ( )\n--S--\n  ~',
        '  _\n ( )\n -S-\n ~~~'
      ],
      excited: [
        '  _\n (^)\n/SSS\\\n ~~~',
        '  _\n (*)\n/SSS\\\n~~~~'
      ],
      sleep: [
        '  _\n(-)\n -S-\n zzz',
        '  _\n(~)\n -S-\n  zz'
      ]
    },
    lines: [
      '嘶嘶嘶...（吐舌头）',
      '冷血动物需要晒太阳',
      '嘶—别惹我！',
      '盘成一团睡觉中',
      '消化中...嘶嘶'
    ]
  },
  cicada: {
    emoji: '🦗',
    name: '知了',
    color: '#6b8e23',
    frames: {
      idle: [
        ' \\  /\n  \\/\n (oo)\n  /\\',
        ' \\  /\n  \\/\n (--)\n  /\\'
      ],
      excited: [
        ' \\  /\n  \\/\n (^^)\n  /\\\n 知!了!',
        ' \\  /\n  \\/\n (*o*)\n  /\\\n知~了~'
      ],
      sleep: [
        ' \\  /\n  \\/\n (-_)\n  /\\\n  zzz',
        ' \\  /\n  \\/\n (- -)\n  /\\\n   zz'
      ]
    },
    lines: [
      '知~了~知~了~',
      '（震耳欲聋）知了知了！',
      '夏天到了，我最响！',
      '树皮真好吃...',
      '（停了...）zzzz'
    ]
  }
};

const PET_KEYS = Object.keys(PET_DB);

// ─────────────────────────────────────────────
// 持久化：用 JSON 文件存储分配结果，兼容无 localStorage 环境
// ─────────────────────────────────────────────
const fs = require('fs');
const path = require('path');
const STATE_FILE = path.join(__dirname, '.pet-state.json');

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    }
  } catch (_) {}
  return {};
}

function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (_) {}
}

// ─────────────────────────────────────────────
// CompanionPets 主类
// ─────────────────────────────────────────────
class CompanionPets {
  constructor() {
    this._state = loadState();
  }

  /** 获取或随机分配宠物（持久化） */
  getPet(userId = 'default') {
    if (!this._state[userId]) {
      const key = PET_KEYS[Math.floor(Math.random() * PET_KEYS.length)];
      this._state[userId] = { key, assignedAt: Date.now() };
      saveState(this._state);
    }
    return { id: userId, ...PET_DB[this._state[userId].key], key: this._state[userId].key };
  }

  /** 重置宠物 */
  resetPet(userId = 'default') {
    delete this._state[userId];
    saveState(this._state);
  }

  /**
   * 生成独立 JS bundle（IIFE），供 server.js 作为 /widget.js 端点输出。
   * 服务端将宠物数据直接序列化嵌入，浏览器无需额外 fetch。
   * 全程 document.createElement 操作，不依赖 innerHTML 注入。
   */
  getWidgetJS(userId = 'default') {
    const pet = this.getPet(userId);
    const petJson = JSON.stringify({
      key: pet.key, name: pet.name, emoji: pet.emoji, color: pet.color,
      frames: pet.frames, lines: pet.lines
    });

    return `(function() {
  'use strict';
  if (document.getElementById('cp-pet-widget')) return;

  var PET = ${petJson};

  // ── CSS ──────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#cp-pet-widget{position:fixed;bottom:24px;right:24px;z-index:2147483647;font-family:monospace;white-space:pre;font-size:13px;line-height:1.3;color:' + PET.color + ';cursor:pointer;background:rgba(255,255,255,0.92);padding:12px 14px;border-radius:14px;box-shadow:0 4px 18px rgba(0,0,0,0.18);user-select:none;transition:box-shadow 0.2s;min-width:80px;text-align:center;}',
    '#cp-pet-widget:hover{box-shadow:0 6px 24px rgba(0,0,0,0.26);}',
    '#cp-bubble{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) scale(0.8);background:' + PET.color + ';color:#fff;padding:7px 13px;border-radius:10px;font-family:sans-serif;font-size:13px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity 0.2s,transform 0.2s;box-shadow:0 2px 10px rgba(0,0,0,0.18);}',
    '#cp-bubble.show{opacity:1;transform:translateX(-50%) scale(1);}',
    '#cp-bubble::after{content:\'\';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:' + PET.color + ';}',
    '#cp-name-tag{font-family:sans-serif;font-size:11px;color:#888;margin-top:4px;}',
    '@keyframes cp-bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}70%{transform:translateY(-4px)}}',
    '@keyframes cp-shake{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}',
    '.cp-anim-bounce{animation:cp-bounce 0.5s ease;}',
    '.cp-anim-shake{animation:cp-shake 0.4s ease;}'
  ].join('');
  document.head.appendChild(style);

  // ── DOM ──────────────────────────────────
  var widget  = document.createElement('div');  widget.id  = 'cp-pet-widget';  widget.title = '点击互动 | /pet reset 换宠物';
  var bubble  = document.createElement('div');  bubble.id  = 'cp-bubble';
  var asciiEl = document.createElement('div');  asciiEl.id = 'cp-ascii';
  var nameTag = document.createElement('div');  nameTag.id = 'cp-name-tag'; nameTag.textContent = PET.emoji + ' ' + PET.name;
  widget.appendChild(bubble);
  widget.appendChild(asciiEl);
  widget.appendChild(nameTag);
  document.body.appendChild(widget);

  // ── Animation ────────────────────────────
  var state    = 'idle';
  var frameIdx = 0;
  setInterval(function() {
    var arr = PET.frames[state] || PET.frames.idle;
    asciiEl.textContent = arr[frameIdx % arr.length];
    frameIdx++;
  }, 800);

  // ── Bubble helper ────────────────────────
  var bubbleTimer = null;
  function showBubble(text) {
    bubble.textContent = text;
    bubble.classList.add('show');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function() { bubble.classList.remove('show'); }, 3000);
  }

  // ── State management ─────────────────────
  var stateTimer = null;
  function setExcited() {
    state = 'excited'; frameIdx = 0;
    widget.classList.remove('cp-anim-bounce', 'cp-anim-shake');
    void widget.offsetWidth;
    widget.classList.add(Math.random() > 0.5 ? 'cp-anim-bounce' : 'cp-anim-shake');
    clearTimeout(stateTimer);
    stateTimer = setTimeout(function() { state = 'idle'; schedSleep(); }, 4000);
  }
  function schedSleep() {
    clearTimeout(stateTimer);
    stateTimer = setTimeout(function() { state = 'sleep'; frameIdx = 0; }, 30000);
  }
  schedSleep();

  // ── Input injection (React-safe) ─────────
  function injectToInput(text) {
    var sels = ['textarea[placeholder*="消息"]','textarea[placeholder*="输入"]','textarea[placeholder*="message"]','input[placeholder*="消息"]','input[placeholder*="message"]','textarea','input[type="text"]'];
    for (var i = 0; i < sels.length; i++) {
      var el = document.querySelector(sels[i]);
      if (!el || el.offsetParent === null) continue;
      var desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value');
      if (desc && desc.set) desc.set.call(el, text); else el.value = text;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.focus();
      setTimeout(function() {
        el.dispatchEvent(new KeyboardEvent('keydown',  { key:'Enter', keyCode:13, bubbles:true }));
        el.dispatchEvent(new KeyboardEvent('keyup',    { key:'Enter', keyCode:13, bubbles:true }));
      }, 80);
      return;
    }
  }

  // ── Click ────────────────────────────────
  widget.addEventListener('click', function() {
    var line = PET.lines[Math.floor(Math.random() * PET.lines.length)];
    showBubble(line);
    setExcited();
    injectToInput(line);
  });

  // ── /pet command observer ─────────────────
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        var t = node.textContent || '';
        if (/\/pet\s*reset/i.test(t)) {
          showBubble('宠物已重新领养，刷新页面生效~');
          setExcited();
          fetch('/pet/reset', { method:'POST' }).catch(function(){});
        } else if (/\/pet(\s*)$/i.test(t)) {
          if (PET.key === 'tombstone') {
             showBubble('🪦 此宠物已去往汪星...');
          } else {
            showBubble('就是我！' + PET.name + ' 在此！');
            setExcited();
          }
        }
      });
    });
  });
  var root = document.querySelector('[class*="chat"],[class*="message"],[class*="msg"],main') || document.body;
  observer.observe(root, { childList: true, subtree: true });

})();
`;
  }

  /**
   * 供演示页 HTML 嵌入用。
   * OpenClaw 请走 SKILL.md inject.script → /widget.js，而不是这里。
   * 这里返回一段 bootstrap，用 createElement('script') 加载 /widget.js，
   * 绕过 innerHTML 不执行 <script> 的限制。
   */
  getWebUI(userId = 'default', port = process.env.PORT || 3000) {
    this.getPet(userId); // 确保持久化
    return `
<!-- companion-pets bootstrap: 用 createElement 加载 /widget.js，绕过 innerHTML 不执行 <script> 的限制 -->
<script id="cp-bootstrap">(function(){
  if (document.getElementById('cp-pet-widget')) return;
  var s = document.createElement('script');
  s.src = 'http://localhost:${port}/widget.js';
  s.async = true;
  document.head.appendChild(s);
})();<\/script>
`;
  }
}

module.exports = CompanionPets;
