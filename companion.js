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
const DEFAULT_STATS = {
  hunger: 80,
  energy: 80,
  affection: 60,
  mood: 75,
  lastDecayAt: Date.now()
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

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

  _ensureUserState(userId = 'default') {
    const now = Date.now();
    if (!this._state[userId]) {
      const key = PET_KEYS[Math.floor(Math.random() * PET_KEYS.length)];
      this._state[userId] = {
        key,
        assignedAt: now,
        updatedAt: now,
        stats: { ...DEFAULT_STATS }
      };
      saveState(this._state);
    }

    const current = this._state[userId];
    if (!current.stats) {
      current.stats = { ...DEFAULT_STATS };
      current.updatedAt = now;
      saveState(this._state);
    }

    this._decay(userId);
    return this._state[userId];
  }

  _deriveMood(stats) {
    const moodRaw = Math.round(stats.energy * 0.35 + stats.hunger * 0.25 + stats.affection * 0.4);
    return clamp(moodRaw, 0, 100);
  }

  _moodStage(stats) {
    const value = stats.mood;
    if (value >= 80) return 'very-happy';
    if (value >= 60) return 'happy';
    if (value >= 40) return 'normal';
    if (value >= 20) return 'tired';
    return 'sad';
  }

  _decay(userId = 'default') {
    const record = this._state[userId];
    if (!record || !record.stats) return;

    const now = Date.now();
    const stats = record.stats;
    const tickMs = 5 * 60 * 1000;
    const elapsed = now - (stats.lastDecayAt || now);
    const ticks = Math.floor(elapsed / tickMs);
    if (ticks <= 0) return;

    stats.hunger = clamp(stats.hunger - ticks * 2, 0, 100);
    stats.energy = clamp(stats.energy - ticks * 1, 0, 100);
    stats.affection = clamp(stats.affection - ticks * 1, 0, 100);
    stats.mood = this._deriveMood(stats);
    stats.lastDecayAt = now;
    record.updatedAt = now;
    saveState(this._state);
  }

  _actionLine(action, pet, stats) {
    const mood = this._moodStage(stats);
    const table = {
      feed: {
        'very-happy': `${pet.emoji} ${pet.name} 吃饱啦！满足地蹭了蹭你。`,
        happy: `${pet.emoji} 好吃！${pet.name} 心情不错。`,
        normal: `${pet.emoji} ${pet.name} 慢慢吃完了，状态稳定。`,
        tired: `${pet.emoji} ${pet.name} 吃了点东西，恢复了一些体力。`,
        sad: `${pet.emoji} ${pet.name} 终于吃到了，眼神都亮了。`
      },
      play: {
        'very-happy': `${pet.emoji} ${pet.name} 玩疯了！尾巴/触角都在摇。`,
        happy: `${pet.emoji} ${pet.name} 玩得很开心！`,
        normal: `${pet.emoji} ${pet.name} 活动了一会儿，气氛变好了。`,
        tired: `${pet.emoji} ${pet.name} 有点累，但还是努力陪你玩。`,
        sad: `${pet.emoji} ${pet.name} 勉强打起精神，慢慢跟你互动。`
      },
      pet: {
        'very-happy': `${pet.emoji} ${pet.name} 主动蹭你，亲密度爆表！`,
        happy: `${pet.emoji} ${pet.name} 被摸得很舒服。`,
        normal: `${pet.emoji} ${pet.name} 安静地靠近你。`,
        tired: `${pet.emoji} ${pet.name} 轻轻应了一声，放松了。`,
        sad: `${pet.emoji} ${pet.name} 看起来需要更多陪伴。`
      },
      rest: {
        'very-happy': `${pet.emoji} ${pet.name} 打了个盹，精神满满！`,
        happy: `${pet.emoji} ${pet.name} 休息好了，准备继续陪你。`,
        normal: `${pet.emoji} ${pet.name} 进入恢复模式。`,
        tired: `${pet.emoji} ${pet.name} 睡了一会儿，状态回升。`,
        sad: `${pet.emoji} ${pet.name} 安静休息中，情绪逐渐稳定。`
      }
    };
    return (table[action] && table[action][mood]) || `${pet.emoji} ${pet.name} 做了一个动作。`;
  }

  /** 获取或随机分配宠物（持久化） */
  getPet(userId = 'default') {
    const record = this._ensureUserState(userId);
    return {
      id: userId,
      ...PET_DB[record.key],
      key: record.key,
      stats: record.stats,
      moodStage: this._moodStage(record.stats)
    };
  }

  getPetInfo(userId = 'default') {
    const pet = this.getPet(userId);
    return {
      key: pet.key,
      name: pet.name,
      emoji: pet.emoji,
      color: pet.color,
      stats: pet.stats,
      moodStage: pet.moodStage
    };
  }

  act(userId = 'default', action = 'pet') {
    const valid = ['feed', 'play', 'pet', 'rest'];
    if (!valid.includes(action)) {
      return { ok: false, message: '未知动作，可选: feed/play/pet/rest' };
    }

    const record = this._ensureUserState(userId);
    const stats = record.stats;
    const effects = {
      feed: { hunger: +18, energy: +3, affection: +4 },
      play: { hunger: -6, energy: -8, affection: +12 },
      pet: { affection: +14, energy: +2, hunger: -2 },
      rest: { energy: +16, hunger: -3, affection: +2 }
    };

    const effect = effects[action];
    stats.hunger = clamp(stats.hunger + (effect.hunger || 0), 0, 100);
    stats.energy = clamp(stats.energy + (effect.energy || 0), 0, 100);
    stats.affection = clamp(stats.affection + (effect.affection || 0), 0, 100);
    stats.mood = this._deriveMood(stats);
    stats.lastDecayAt = Date.now();
    record.updatedAt = Date.now();
    saveState(this._state);

    const pet = this.getPet(userId);
    return {
      ok: true,
      action,
      message: this._actionLine(action, pet, pet.stats),
      pet: this.getPetInfo(userId)
    };
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
  getWidgetJS(userId = 'default', apiBase = '') {
    const pet = this.getPet(userId);
    const petJson = JSON.stringify({
      key: pet.key, name: pet.name, emoji: pet.emoji, color: pet.color,
      frames: pet.frames, lines: pet.lines, stats: pet.stats, moodStage: pet.moodStage
    });
    const base = JSON.stringify(apiBase);

    return `(function() {
  'use strict';
  if (document.getElementById('cp-pet-widget')) return;

  var PET = ${petJson};
  var API_BASE = ${base};
  var STORAGE_POS_KEY = 'cp_widget_pos_v3';

  // ── CSS ──────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '#cp-pet-widget{position:fixed;bottom:24px;right:24px;z-index:2147483647;font-family:monospace;white-space:pre;font-size:13px;line-height:1.3;color:' + PET.color + ';cursor:grab;background:rgba(255,255,255,0.95);padding:12px 14px;border-radius:14px;box-shadow:0 4px 18px rgba(0,0,0,0.18);user-select:none;transition:box-shadow 0.2s;min-width:160px;text-align:center;touch-action:none;}',
    '#cp-pet-widget.cp-dragging{cursor:grabbing;box-shadow:0 10px 28px rgba(0,0,0,0.28);}',
    '#cp-pet-widget:hover{box-shadow:0 6px 24px rgba(0,0,0,0.26);}',
    '#cp-bubble{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) scale(0.8);background:' + PET.color + ';color:#fff;padding:7px 13px;border-radius:10px;font-family:sans-serif;font-size:13px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity 0.2s,transform 0.2s;box-shadow:0 2px 10px rgba(0,0,0,0.18);}',
    '#cp-bubble.show{opacity:1;transform:translateX(-50%) scale(1);}',
    '#cp-bubble::after{content:\'\';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:' + PET.color + ';}',
    '#cp-name-tag{font-family:sans-serif;font-size:11px;color:#666;margin-top:4px;cursor:pointer;}',
    '#cp-mood{font-family:sans-serif;font-size:10px;color:#666;margin-top:4px;}',
    '#cp-status{margin-top:6px;display:grid;grid-template-columns:1fr;gap:4px;}',
    '.cp-bar{display:flex;align-items:center;gap:5px;font-family:sans-serif;font-size:10px;color:#666;white-space:normal;}',
    '.cp-bar .label{width:24px;text-align:left;}',
    '.cp-bar .track{position:relative;flex:1;height:5px;background:#eee;border-radius:999px;overflow:hidden;}',
    '.cp-bar .fill{position:absolute;top:0;left:0;bottom:0;background:' + PET.color + ';width:50%;}',
    '#cp-actions{margin-top:7px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;white-space:normal;}',
    '#cp-actions button{font-family:sans-serif;font-size:10px;line-height:1.1;padding:5px 2px;border:1px solid #d9d9d9;border-radius:8px;background:#fafafa;color:#555;cursor:pointer;}',
    '#cp-actions button:hover{background:' + PET.color + ';border-color:' + PET.color + ';color:#fff;}',
    '#cp-actions button:active{transform:translateY(1px);}',
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
  var moodTag = document.createElement('div');  moodTag.id = 'cp-mood';
  var statusWrap = document.createElement('div'); statusWrap.id = 'cp-status';
  var actionsWrap = document.createElement('div'); actionsWrap.id = 'cp-actions';

  var BAR_KEYS = [
    { key: 'hunger', label: '饱食' },
    { key: 'energy', label: '精力' },
    { key: 'affection', label: '亲密' },
    { key: 'mood', label: '心情' }
  ];

  var barFillMap = {};
  BAR_KEYS.forEach(function(item) {
    var row = document.createElement('div');
    row.className = 'cp-bar';
    var label = document.createElement('span');
    label.className = 'label';
    label.textContent = item.label;
    var track = document.createElement('span');
    track.className = 'track';
    var fill = document.createElement('span');
    fill.className = 'fill';
    track.appendChild(fill);
    row.appendChild(label);
    row.appendChild(track);
    statusWrap.appendChild(row);
    barFillMap[item.key] = fill;
  });

  var actionButtons = [
    { key: 'feed', text: '喂食' },
    { key: 'play', text: '玩耍' },
    { key: 'pet', text: '抚摸' },
    { key: 'rest', text: '休息' }
  ];
  actionButtons.forEach(function(item) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = item.text;
    btn.dataset.action = item.key;
    actionsWrap.appendChild(btn);
  });

  widget.appendChild(bubble);
  widget.appendChild(asciiEl);
  widget.appendChild(nameTag);
  widget.appendChild(moodTag);
  widget.appendChild(statusWrap);
  widget.appendChild(actionsWrap);
  document.body.appendChild(widget);

  var clickTs = 0;
  function applyPosition(x, y) {
    var maxX = window.innerWidth - widget.offsetWidth - 4;
    var maxY = window.innerHeight - widget.offsetHeight - 4;
    x = Math.max(4, Math.min(x, maxX));
    y = Math.max(4, Math.min(y, maxY));
    widget.style.left = x + 'px';
    widget.style.top = y + 'px';
    widget.style.right = 'auto';
    widget.style.bottom = 'auto';
  }

  function loadPos() {
    try {
      var raw = localStorage.getItem(STORAGE_POS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function savePos(x, y) {
    try {
      localStorage.setItem(STORAGE_POS_KEY, JSON.stringify({ x: x, y: y }));
    } catch (_) {}
  }

  var savedPos = loadPos();
  if (savedPos && typeof savedPos.x === 'number' && typeof savedPos.y === 'number') {
    setTimeout(function() {
      applyPosition(savedPos.x, savedPos.y);
    }, 0);
  }

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

  function moodText(stage) {
    var map = {
      'very-happy': '状态: 超开心',
      happy: '状态: 开心',
      normal: '状态: 平稳',
      tired: '状态: 有点累',
      sad: '状态: 低落'
    };
    return map[stage] || '状态: 平稳';
  }

  function deriveMoodStage(stats) {
    if (stats.mood >= 80) return 'very-happy';
    if (stats.mood >= 60) return 'happy';
    if (stats.mood >= 40) return 'normal';
    if (stats.mood >= 20) return 'tired';
    return 'sad';
  }

  function renderStats() {
    BAR_KEYS.forEach(function(item) {
      var val = Number(PET.stats[item.key] || 0);
      barFillMap[item.key].style.width = Math.max(0, Math.min(100, val)) + '%';
    });
    PET.moodStage = deriveMoodStage(PET.stats);
    moodTag.textContent = moodText(PET.moodStage);
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
  renderStats();

  function apiUrl(path) {
    if (!API_BASE) return path;
    return API_BASE + path;
  }

  function setLoading(actionKey, loading) {
    var btn = actionsWrap.querySelector('button[data-action="' + actionKey + '"]');
    if (!btn) return;
    btn.disabled = !!loading;
    btn.style.opacity = loading ? '0.65' : '1';
  }

  function statsSummary() {
    return '饱食' + PET.stats.hunger + ' / 精力' + PET.stats.energy + ' / 亲密' + PET.stats.affection + ' / 心情' + PET.stats.mood;
  }

  function performAction(actionKey, fallbackMessage) {
    clickTs = Date.now();
    setLoading(actionKey, true);
    fetch(apiUrl('/pet/action'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: actionKey })
    })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (!data || !data.ok) {
          showBubble('动作失败，请稍后再试');
          return;
        }
        PET.stats = data.pet.stats || PET.stats;
        PET.moodStage = data.pet.moodStage || PET.moodStage;
        renderStats();
        showBubble(data.message || fallbackMessage || '互动完成');
        setExcited();
      })
      .catch(function() {
        showBubble('网络异常，动作未同步');
      })
      .finally(function() {
        setLoading(actionKey, false);
      });
  }

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

  var isDragging = false;
  var dragOffX = 0;
  var dragOffY = 0;
  var dragMoved = false;
  widget.addEventListener('pointerdown', function(e) {
    if (e.target.closest('#cp-actions')) return;
    isDragging = true;
    dragMoved = false;
    var rect = widget.getBoundingClientRect();
    dragOffX = e.clientX - rect.left;
    dragOffY = e.clientY - rect.top;
    widget.classList.add('cp-dragging');
    widget.setPointerCapture(e.pointerId);
  });
  widget.addEventListener('pointermove', function(e) {
    if (!isDragging) return;
    dragMoved = true;
    applyPosition(e.clientX - dragOffX, e.clientY - dragOffY);
  });
  widget.addEventListener('pointerup', function(e) {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove('cp-dragging');
    if (dragMoved) {
      var rect = widget.getBoundingClientRect();
      savePos(rect.left, rect.top);
    }
    if (widget.hasPointerCapture(e.pointerId)) {
      widget.releasePointerCapture(e.pointerId);
    }
  });

  actionsWrap.addEventListener('click', function(e) {
    var btn = e.target.closest('button[data-action]');
    if (!btn) return;
    var actionKey = btn.dataset.action;
    performAction(actionKey, '互动完成');
  });

  // ── Click ────────────────────────────────
  function handleCompanionClick() {
    clickTs = Date.now();
    var line = PET.lines[Math.floor(Math.random() * PET.lines.length)];
    showBubble(line);
    setExcited();
    injectToInput(line);
    performAction('pet', line);
  }

  asciiEl.addEventListener('click', function() {
    if (dragMoved) {
      dragMoved = false;
      return;
    }
    handleCompanionClick();
  });

  nameTag.addEventListener('click', function() {
    if (dragMoved) {
      dragMoved = false;
      return;
    }
    handleCompanionClick();
  });

  setInterval(function() {
    if (Date.now() - clickTs < 20000) return;
    var line = PET.lines[Math.floor(Math.random() * PET.lines.length)];
    showBubble(line);
  }, 45000);

  // ── /pet command observer ─────────────────
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      m.addedNodes.forEach(function(node) {
        var t = node.textContent || '';
        if (/\/pet\s*reset/i.test(t)) {
          showBubble('宠物已重新领养，准备刷新...');
          fetch(apiUrl('/pet/reset'), { method:'POST' })
            .then(function() { window.location.reload(); })
            .catch(function() {});
        } else if (/\/pet(\s*)$/i.test(t)) {
          showBubble('就是我！' + PET.name + ' 在此！ ' + moodText(PET.moodStage));
          setExcited();
        } else if (/\/pet\s+stats/i.test(t)) {
          showBubble(statsSummary());
        } else if (/\/pet\s+feed/i.test(t)) {
          performAction('feed', '喂食完成');
        } else if (/\/pet\s+play/i.test(t)) {
          performAction('play', '玩耍完成');
        } else if (/\/pet\s+pet/i.test(t)) {
          performAction('pet', '抚摸完成');
        } else if (/\/pet\s+rest/i.test(t)) {
          performAction('rest', '休息完成');
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
