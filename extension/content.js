(function () {
  'use strict';

  if (window.__cpEnhancedMounted) return;
  window.__cpEnhancedMounted = true;

'use strict';

function createCompanionPetsRuntime(config) {
  const cfg = config || {};
  const PET_DB = {
    lobster: {
      emoji: '🦞', name: '小龙虾', color: '#ff4500',
      frames: {
        idle: [' /\\  /\\\n(oo)\n >||<\n /  \\', ' /\\  /\\\n(-.-)\n >||<\n /  \\'],
        excited: [' \\o/\n(^o^)\n >||<\n/ \\/ \\', ' /o\\\n(^O^)\n >||<\n\\ /\\ /'],
        sleep: [' /\\  /\\\n(-_-)\n >||<\n /  \\', ' /\\  /\\\n(-.-)zzz\n >||<\n /  \\']
      },
      lines: ['咕噜咕噜，今天想吃什么？', '钳子已就位！', '冒泡中...咕噜~', '主人快摸我的钳子！', '听说今天有好吃的？']
    },
    cat: {
      emoji: '🐱', name: '猫咪', color: '#ff9a3c',
      frames: {
        idle: [' /\\_/\\\n( o.o )\n > ^ <\n(__|__)', ' /\\_/\\\n( -.- )\n > ^ <\n(__|__)'],
        excited: [' /\\_/\\\n( ^w^ )\n > ^ <\n(__|__)', ' /\\_/\\\n( OwO )\n >|^|<\n(__|__)'],
        sleep: [' /\\_/\\\n( -_- )\n > ^ <\n  zzz', ' /\\_/\\\n(  - )\n > ^ <\n   zz']
      },
      lines: ['喵~ 今天天气不错', '快来撸我！', '本喵不稀罕你... 才怪', '喵喵喵，饿了', '午睡时间到了，别吵']
    },
    dog: {
      emoji: '🐶', name: '狗狗', color: '#c8860a',
      frames: {
        idle: ['  / \\\n (o.o)\n  |U|\n /   \\', '  / \\\n (o.o)\n  |U|\n  /|\\'],
        excited: ['  / \\\n (^o^)\n  |U|\n/\\   /\\', '  / \\\n (>o<)\n  |UU|\n/ \\ / \\'],
        sleep: ['  / \\\n (-_-)\n  |U|\n  zzz', '  / \\\n (o-o)\n  |U|\n   zz']
      },
      lines: ['汪！主人回来了！', '带我去散步嘛~', '汪汪！有好吃的！', '我最喜欢你了！尾巴狂摇', '汪...困了...']
    },
    frog: {
      emoji: '🐸', name: '青蛙', color: '#3cb043',
      frames: {
        idle: ['  @ @\n (o-o)\n//| |\\\\', '  @ @\n (o_o)\n//| |\\\\'],
        excited: ['  @ @\n (^o^)\n//\\|/\\\\', '  @ @\n (*o*)\n// \\|/ \\\\'],
        sleep: ['  @ @\n (-_-)\n//| |\\\\\n zzz', '  @ @\n (o-o)\n//| |\\\\\n  z']
      },
      lines: ['呱呱！今天也要加油！', '呱~ 水里好凉快', '呱呱呱，今天有虫子吃！', '跳！呱！', '（呱...睡着了）']
    },
    doraemon: {
      emoji: '🤖', name: '机器猫', color: '#0099cc',
      frames: {
        idle: [' _____\n(o   o)\n( === )\n  | |', ' _____\n(o . o)\n( === )\n  | |'],
        excited: [' _____\n(^   ^)\n( === )\n  |*|', ' _____\n(> < )\n(=====)\n  |*|'],
        sleep: [' _____\n(-   -)\n( === )\n  zzz', ' _____\n(~   ~)\n( === )\n   zz']
      },
      lines: ['叮当！从四次元口袋取出道具~', '小夫你不许欺负大雄！', '铜锣烧！铜锣烧！', '任意门启动！', '今天进口袋睡觉了']
    },
    pikachu: {
      emoji: '🐭', name: '电光鼠', color: '#ffd700',
      frames: {
        idle: [' /\\  /\\\n(o  o)\n  ww\n__|__|__', ' /\\  /\\\n(^  ^)\n  ww\n__|__|__'],
        excited: [' /\\  /\\\n(*  *)\n  ww\n__|__|__\n  ⚡⚡', ' /\\  /\\\n(>  <)\n  ww\n__|__|__\n ⚡⚡⚡'],
        sleep: [' /\\  /\\\n(-  -)\n  ww\n__|__|__\n  zzz', ' /\\  /\\\n(o  -)\n  ww\n__|__|__\n   zz']
      },
      lines: ['吱吱！电流就绪！⚡', '电光鼠选择你！', '滋滋滋~满电出击！', '（充电中...嗖嗖嗖）', '吱...（打哈欠）']
    },
    pig: {
      emoji: '🐷', name: '肥猪', color: '#ff69b4',
      frames: {
        idle: ['  ___\n (o.o)\n  \\U/\n /   \\', '  ___\n (o-o)\n  \\U/\n /   \\'],
        excited: ['  ___\n (^U^)\n  \\/\n / \\ /', '  ___\n (UwU)\n  \\/\n/\\ /\\'],
        sleep: ['  ___\n (-_-)\n  \\U/\n  zzz', '  ___\n (o_o)\n  \\U/\n   zz']
      },
      lines: ['哼哼，今天吃了多少卡？', '猪脑子转不过来了...', '哼！肥而不腻！', '再睡一会儿....哼', '有吃的吗？哼哼~']
    },
    capybara: {
      emoji: '🦫', name: '卡皮巴拉', color: '#8b6914',
      frames: {
        idle: ['  ____\n (o  o)\n |    |\n/      \\', '  ____\n (o  -)\n |    |\n/      \\'],
        excited: ['  ____\n (^  ^)\n |    |\n/ \\  / \\', '  ____\n (*  *)\n |    |\n/  \\/  \\'],
        sleep: ['  ____\n (-  -)\n |    |\n  zzz', '  ____\n (~  ~)\n |    |\n   zz']
      },
      lines: ['（淡定）没什么大不了的', '我可以坐在任何地方', '泡澡最舒服了...', '世界和平，卡皮巴拉镇定', '嗯...（继续淡定）']
    },
    snake: {
      emoji: '🐍', name: '蟒蛇', color: '#2e8b57',
      frames: {
        idle: ['  _\n ( )\n--S--\n  ~', '  _\n ( )\n -S-\n ~~~'],
        excited: ['  _\n (^)\n/SSS\\\n ~~~', '  _\n (*)\n/SSS\\\n~~~~'],
        sleep: ['  _\n(-)\n -S-\n zzz', '  _\n(~)\n -S-\n  zz']
      },
      lines: ['嘶嘶嘶...（吐舌头）', '冷血动物需要晒太阳', '嘶—别惹我！', '盘成一团睡觉中', '消化中...嘶嘶']
    },
    cicada: {
      emoji: '🦗', name: '知了', color: '#6b8e23',
      frames: {
        idle: [' \\  /\n  \\/\n (oo)\n  /\\', ' \\  /\n  \\/\n (--)\n  /\\'],
        excited: [' \\  /\n  \\/\n (^^)\n  /\\\n 知!了!', ' \\  /\n  \\/\n (*o*)\n  /\\\n知~了~'],
        sleep: [' \\  /\n  \\/\n (-_)\n  /\\\n  zzz', ' \\  /\n  \\/\n (- -)\n  /\\\n   zz']
      },
      lines: ['知~了~知~了~', '（震耳欲聋）知了知了！', '夏天到了，我最响！', '树皮真好吃...', '（停了...）zzzz']
    }
  };

  const PET_KEYS = Object.keys(PET_DB);
  const RARITY_META = {
    common: { label: '普通', weight: 44, cardBg: 'rgba(128,128,128,0.22)', badgeBg: '#8a8a8a' },
    uncommon: { label: '常见', weight: 28, cardBg: 'rgba(255,255,255,0.96)', badgeBg: '#d9d9d9' },
    rare: { label: '稀有', weight: 16, cardBg: 'rgba(76,175,80,0.22)', badgeBg: '#4caf50' },
    epic: { label: '史诗', weight: 8, cardBg: 'rgba(255,152,0,0.22)', badgeBg: '#ff9800' },
    legendary: { label: '传说', weight: 4, cardBg: 'rgba(135,206,235,0.26)', badgeBg: '#6ec6ff' }
  };
  // 具体掉落表（总和 100）
  const PET_DROP_TABLE = {
    lobster: { rate: 18, rarity: 'common' },
    pig: { rate: 17, rarity: 'common' },
    cat: { rate: 14, rarity: 'uncommon' },
    dog: { rate: 13, rarity: 'uncommon' },
    snake: { rate: 10, rarity: 'uncommon' },
    frog: { rate: 9, rarity: 'rare' },
    capybara: { rate: 8, rarity: 'rare' },
    cicada: { rate: 6, rarity: 'rare' },
    pikachu: { rate: 4, rarity: 'epic' },
    doraemon: { rate: 1, rarity: 'legendary' }
  };
  const OPENMOJI_CDN = 'https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@14.0.0/color/618x618';
  const PET_AVATAR_URLS = {
    lobster: `${OPENMOJI_CDN}/1F99E.png`,
    cat: `${OPENMOJI_CDN}/1F431.png`,
    dog: `${OPENMOJI_CDN}/1F436.png`,
    frog: `${OPENMOJI_CDN}/1F438.png`,
    doraemon: `${OPENMOJI_CDN}/1F916.png`,
    pikachu: `${OPENMOJI_CDN}/1F42D.png`,
    pig: `${OPENMOJI_CDN}/1F437.png`,
    capybara: `${OPENMOJI_CDN}/1F9AB.png`,
    snake: `${OPENMOJI_CDN}/1F40D.png`,
    cicada: `${OPENMOJI_CDN}/1F997.png`
  };
  const STATE_BADGE_FRAMES = {
    idle: ['', `${OPENMOJI_CDN}/1F4AC.png`],
    excited: [`${OPENMOJI_CDN}/2728.png`, `${OPENMOJI_CDN}/1F525.png`],
    sleep: [`${OPENMOJI_CDN}/1F4A4.png`, `${OPENMOJI_CDN}/1F634.png`]
  };
  const STORAGE_KEY = cfg.storageKey || 'companion_pets_v3';
  const POS_KEY = cfg.posKey || 'cp_widget_pos_v3';
  const HIDDEN_KEY = cfg.hiddenKey || 'cp_widget_hidden_v1';
  const MOUNT_LOCK_ATTR = 'data-cp-widget-lock';
  const DEFAULT_STATS = { hunger: 80, energy: 80, affection: 60, mood: 75, lastDecayAt: Date.now() };
  let petCommandHandler = null;
  let lastCmdSig = '';
  let lastCmdAt = 0;

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
  function getPetRarity(key) {
    const rarityKey = PET_DROP_TABLE[key]?.rarity || 'uncommon';
    const rarity = RARITY_META[rarityKey] || RARITY_META.uncommon;
    return { key: rarityKey, ...rarity };
  }
  function randomPetKeyByDropTable() {
    const rows = PET_KEYS.map((key) => ({ key, rate: Number(PET_DROP_TABLE[key]?.rate || 0) })).filter((r) => r.rate > 0);
    if (!rows.length) return PET_KEYS[Math.floor(Math.random() * PET_KEYS.length)];
    const total = rows.reduce((sum, row) => sum + row.rate, 0);
    if (total <= 0) return rows[Math.floor(Math.random() * rows.length)].key;
    let cursor = Math.random() * total;
    for (const row of rows) {
      cursor -= row.rate;
      if (cursor <= 0) return row.key;
    }
    return rows[rows.length - 1].key;
  }
  function deriveMood(stats) { return clamp(Math.round(stats.energy * 0.35 + stats.hunger * 0.25 + stats.affection * 0.4), 0, 100); }
  function moodStage(stats) {
    if (stats.mood >= 80) return 'very-happy';
    if (stats.mood >= 60) return 'happy';
    if (stats.mood >= 40) return 'normal';
    if (stats.mood >= 20) return 'tired';
    return 'sad';
  }
  function moodText(stage) {
    const map = { 'very-happy': '状态: 超开心', happy: '状态: 开心', normal: '状态: 平稳', tired: '状态: 有点累', sad: '状态: 低落' };
    return map[stage] || map.normal;
  }

  function framePackForPet(key) {
    const base = PET_AVATAR_URLS[key] || `${OPENMOJI_CDN}/1F43E.png`;
    return {
      idle: STATE_BADGE_FRAMES.idle.map((badge) => ({ pet: base, badge })),
      excited: STATE_BADGE_FRAMES.excited.map((badge) => ({ pet: base, badge })),
      sleep: STATE_BADGE_FRAMES.sleep.map((badge) => ({ pet: base, badge }))
    };
  }

  function loadState() {
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : null; } catch (_) { return null; }
  }
  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function ensureState() {
    let state = loadState();
    const now = Date.now();
    if (!state || !state.key || !PET_DB[state.key]) {
      state = { key: randomPetKeyByDropTable(), assignedAt: now, updatedAt: now, stats: { ...DEFAULT_STATS } };
      saveState(state);
      return state;
    }
    if (!state.stats) state.stats = { ...DEFAULT_STATS };
    const elapsed = now - (state.stats.lastDecayAt || now);
    const ticks = Math.floor(elapsed / (5 * 60 * 1000));
    if (ticks > 0) {
      state.stats.hunger = clamp(state.stats.hunger - ticks * 2, 0, 100);
      state.stats.energy = clamp(state.stats.energy - ticks * 1, 0, 100);
      state.stats.affection = clamp(state.stats.affection - ticks * 1, 0, 100);
      state.stats.mood = deriveMood(state.stats);
      state.stats.lastDecayAt = now;
      state.updatedAt = now;
      saveState(state);
    }
    return state;
  }

  function actionLine(action, pet, stats) {
    const stage = moodStage(stats);
    const map = {
      feed: {
        'very-happy': `${pet.emoji} ${pet.name} 吃饱啦！满足地蹭了蹭你。`,
        happy: `${pet.emoji} 好吃！${pet.name} 心情不错。`,
        normal: `${pet.emoji} ${pet.name} 慢慢吃完了，状态稳定。`,
        tired: `${pet.emoji} ${pet.name} 吃了点东西，恢复了一些体力。`,
        sad: `${pet.emoji} ${pet.name} 终于吃到了，眼神都亮了。`
      },
      play: {
        'very-happy': `${pet.emoji} ${pet.name} 玩疯了！`,
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
    return (map[action] && map[action][stage]) || `${pet.emoji} ${pet.name} 做了一个动作。`;
  }

  function applyAction(state, action) {
    const effects = {
      feed: { hunger: +18, energy: +3, affection: +4 },
      play: { hunger: -6, energy: -8, affection: +12 },
      pet: { affection: +14, energy: +2, hunger: -2 },
      rest: { energy: +16, hunger: -3, affection: +2 }
    };
    const effect = effects[action] || effects.pet;
    const s = state.stats;
    s.hunger = clamp(s.hunger + (effect.hunger || 0), 0, 100);
    s.energy = clamp(s.energy + (effect.energy || 0), 0, 100);
    s.affection = clamp(s.affection + (effect.affection || 0), 0, 100);
    s.mood = deriveMood(s);
    s.lastDecayAt = Date.now();
    state.updatedAt = Date.now();
    saveState(state);
    return s;
  }

  function buildCSS(pet, rarity) {
    return `
      #cp-pet-widget{position:fixed;bottom:24px;right:24px;z-index:2147483647;font-size:13px;line-height:1.3;color:${pet.color};cursor:grab;background:${rarity.cardBg};padding:12px 14px;border-radius:14px;box-shadow:0 4px 18px rgba(0,0,0,0.18);border:1px solid rgba(0,0,0,0.08);user-select:none;min-width:160px;text-align:center;touch-action:none;backdrop-filter: blur(2px);}
      #cp-pet-widget.cp-dragging{cursor:grabbing;box-shadow:0 10px 28px rgba(0,0,0,0.28);}
      #cp-pet-widget:hover{box-shadow:0 6px 24px rgba(0,0,0,0.26);}
      #cp-close{position:absolute;top:6px;right:6px;width:20px;height:20px;border:none;border-radius:999px;background:rgba(0,0,0,.08);color:#555;font-size:12px;line-height:20px;text-align:center;cursor:pointer;padding:0;}
      #cp-close:hover{background:#ff4d4f;color:#fff;}
      #cp-bubble{position:absolute;bottom:calc(100% + 10px);left:50%;transform:translateX(-50%) scale(0.8);background:${pet.color};color:#fff;padding:7px 13px;border-radius:10px;font-family:sans-serif;font-size:13px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s,transform .2s;box-shadow:0 2px 10px rgba(0,0,0,0.18);}
      #cp-bubble.show{opacity:1;transform:translateX(-50%) scale(1);}
      #cp-bubble::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:${pet.color};}
      #cp-avatar{position:relative;width:92px;height:92px;margin:6px auto 2px;display:flex;align-items:center;justify-content:center;}
      #cp-avatar img{display:block;pointer-events:none;}
      #cp-pet-img{width:84px;height:84px;object-fit:contain;filter:drop-shadow(0 3px 5px rgba(0,0,0,.15));}
      #cp-state-badge{position:absolute;right:-2px;top:-2px;width:26px;height:26px;object-fit:contain;opacity:0;transition:opacity .2s ease;}
      #cp-name-tag{font-family:sans-serif;font-size:11px;color:#666;margin-top:4px;cursor:pointer;}
      #cp-rarity{display:inline-block;margin-top:4px;padding:2px 8px;border-radius:999px;font-family:sans-serif;font-size:10px;line-height:1;background:${rarity.badgeBg};color:#fff;}
      #cp-mood{font-family:sans-serif;font-size:10px;color:#666;margin-top:4px;}
      #cp-status{margin-top:6px;display:grid;grid-template-columns:1fr;gap:4px;}
      .cp-bar{display:flex;align-items:center;gap:5px;font-family:sans-serif;font-size:10px;color:#666;white-space:normal;}
      .cp-bar .label{width:24px;text-align:left;}
      .cp-bar .track{position:relative;flex:1;height:5px;background:#eee;border-radius:999px;overflow:hidden;}
      .cp-bar .fill{position:absolute;top:0;left:0;bottom:0;background:${pet.color};width:50%;}
      #cp-actions{margin-top:7px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;white-space:normal;}
      #cp-actions button{font-family:sans-serif;font-size:10px;line-height:1.1;padding:5px 2px;border:1px solid #d9d9d9;border-radius:8px;background:#fafafa;color:#555;cursor:pointer;}
      #cp-actions button:hover{background:${pet.color};border-color:${pet.color};color:#fff;}
      #cp-actions button[data-action="dismiss"]{border-color:#ffc9c9;color:#b42318;}
      #cp-actions button[data-action="dismiss"]:hover{background:#ff4d4f;border-color:#ff4d4f;color:#fff;}
      @keyframes cp-bounce{0%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}70%{transform:translateY(-4px)}}
      @keyframes cp-shake{0%,100%{transform:rotate(0deg)}25%{transform:rotate(-12deg)}75%{transform:rotate(12deg)}}
      .cp-anim-bounce{animation:cp-bounce .5s ease;}
      .cp-anim-shake{animation:cp-shake .4s ease;}
    `;
  }

  function isHidden() {
    try { return localStorage.getItem(HIDDEN_KEY) === '1'; } catch (_) { return false; }
  }

  function setHidden(hidden) {
    try {
      if (hidden) localStorage.setItem(HIDDEN_KEY, '1');
      else localStorage.removeItem(HIDDEN_KEY);
    } catch (_) {}
  }

  function removeDuplicateWidgets() {
    const widgets = document.querySelectorAll('#cp-pet-widget');
    widgets.forEach((w, idx) => {
      if (idx > 0) w.remove();
    });
  }

  function acquireMountLock() {
    const root = document.documentElement;
    if (!root) return false;
    if (root.hasAttribute(MOUNT_LOCK_ATTR)) return false;
    root.setAttribute(MOUNT_LOCK_ATTR, '1');
    return true;
  }

  function releaseMountLock() {
    const root = document.documentElement;
    if (!root) return;
    root.removeAttribute(MOUNT_LOCK_ATTR);
  }

  function parsePetCommand(text) {
    const t = (text || '').replace(/\s+/g, ' ').trim();
    if (!t) return null;
    const m = t.match(/^\/pet(?:\s+(.*))?$/i);
    if (!m) return null;

    const arg = (m[1] || '').trim().toLowerCase();
    if (!arg) return { key: 'show' };

    const first = arg.split(' ')[0];
    if (first === 'show' || first === 'summon') return { key: 'show' };
    if (first === 'reset') return { key: 'reset' };
    if (first === 'stats') return { key: 'stats' };
    if (first === 'feed' || first === 'play' || first === 'pet' || first === 'rest') return { key: first };
    if (first === 'dismiss' || first === 'close' || first === 'hide') return { key: 'dismiss' };

    return { key: 'unknown', raw: first };
  }

  function ensureWidgetVisibleSoon() {
    setHidden(false);
    if (!document.getElementById('cp-pet-widget')) setTimeout(init, 60);
  }

  function dispatchPetCommand(text, source) {
    const cmd = parsePetCommand(text);
    if (!cmd || cmd.key === 'unknown') return false;

    const sig = `${cmd.key}:${source || 'unknown'}`;
    const now = Date.now();
    if (sig === lastCmdSig && now - lastCmdAt < 900) return true;
    lastCmdSig = sig;
    lastCmdAt = now;

    if (cmd.key === 'show') {
      ensureWidgetVisibleSoon();
      if (typeof petCommandHandler === 'function') petCommandHandler(cmd, source || 'unknown');
      return true;
    }

    if (cmd.key === 'reset') {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
      setHidden(false);
      if (typeof petCommandHandler === 'function') petCommandHandler(cmd, source || 'unknown');
      else ensureWidgetVisibleSoon();
      return true;
    }

    if (typeof petCommandHandler === 'function') {
      petCommandHandler(cmd, source || 'unknown');
      return true;
    }

    if (cmd.key === 'dismiss') {
      setHidden(true);
      const widget = document.getElementById('cp-pet-widget');
      if (widget) widget.remove();
      return true;
    }

    if (cmd.key === 'stats' || cmd.key === 'feed' || cmd.key === 'play' || cmd.key === 'pet' || cmd.key === 'rest') {
      ensureWidgetVisibleSoon();
      return true;
    }

    return false;
  }

  function readInputText(el) {
    if (!el) return '';
    if (el.isContentEditable) return el.textContent || '';
    if (typeof el.value === 'string') return el.value;
    return '';
  }

  function injectToInput(text) {
    const selectors = ['textarea[placeholder*="消息"]', 'textarea[placeholder*="输入"]', 'textarea[placeholder*="message"]', 'input[placeholder*="消息"]', 'input[placeholder*="message"]', 'div[contenteditable="true"]', 'textarea', 'input[type="text"]'];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el || el.offsetParent === null) continue;
      if (el.tagName === 'DIV') {
        el.focus();
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, text);
      } else {
        const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value');
        if (desc && desc.set) desc.set.call(el, text); else el.value = text;
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
      el.focus();
      return;
    }
  }

  function applyStyle(css) {
    try {
      const injected = cfg.injectStyle && cfg.injectStyle(css);
      if (injected && typeof injected.then === 'function') return injected;
      return Promise.resolve();
    } catch (_) {
      return Promise.resolve();
    }
  }

  function mount() {
    if (isHidden()) return;
    if (document.getElementById('cp-pet-widget')) {
      removeDuplicateWidgets();
      return;
    }
    if (!acquireMountLock()) {
      setTimeout(init, 120);
      return;
    }

    const state = ensureState();
    const pet = PET_DB[state.key];
    const rarity = getPetRarity(state.key);
    const imageFrames = framePackForPet(state.key);
    const stats = state.stats;
    applyStyle(buildCSS(pet, rarity)).then(() => {
      if (document.getElementById('cp-pet-widget')) {
        removeDuplicateWidgets();
        return;
      }

      const widget = document.createElement('div');
      widget.id = 'cp-pet-widget';
      const closeBtn = document.createElement('button');
      closeBtn.id = 'cp-close';
      closeBtn.type = 'button';
      closeBtn.textContent = '✕';
      closeBtn.title = '解散宠物';
      const bubble = document.createElement('div');
      bubble.id = 'cp-bubble';
      const avatarEl = document.createElement('div');
      avatarEl.id = 'cp-avatar';
      const petImg = document.createElement('img');
      petImg.id = 'cp-pet-img';
      petImg.alt = `${pet.name} avatar`;
      const badgeImg = document.createElement('img');
      badgeImg.id = 'cp-state-badge';
      badgeImg.alt = 'state badge';
      avatarEl.appendChild(petImg);
      avatarEl.appendChild(badgeImg);
      const nameTag = document.createElement('div');
      nameTag.id = 'cp-name-tag';
      nameTag.textContent = `${pet.emoji} ${pet.name}`;
      const rarityTag = document.createElement('div');
      rarityTag.id = 'cp-rarity';
      rarityTag.textContent = `稀有度 · ${rarity.label}`;
      const moodTag = document.createElement('div');
      moodTag.id = 'cp-mood';
      const statusWrap = document.createElement('div');
      statusWrap.id = 'cp-status';
      const actionsWrap = document.createElement('div');
      actionsWrap.id = 'cp-actions';
      const BAR_KEYS = [{ key: 'hunger', label: '饱食' }, { key: 'energy', label: '精力' }, { key: 'affection', label: '亲密' }, { key: 'mood', label: '心情' }];
      const barFillMap = {};
      BAR_KEYS.forEach((item) => {
        const row = document.createElement('div'); row.className = 'cp-bar';
        const label = document.createElement('span'); label.className = 'label'; label.textContent = item.label;
        const track = document.createElement('span'); track.className = 'track';
        const fill = document.createElement('span'); fill.className = 'fill';
        track.appendChild(fill); row.appendChild(label); row.appendChild(track); statusWrap.appendChild(row); barFillMap[item.key] = fill;
      });
      [{ key: 'feed', text: '喂食' }, { key: 'play', text: '玩耍' }, { key: 'pet', text: '抚摸' }, { key: 'rest', text: '休息' }, { key: 'dismiss', text: '解散' }].forEach((item) => {
        const btn = document.createElement('button'); btn.type = 'button'; btn.dataset.action = item.key; btn.textContent = item.text; actionsWrap.appendChild(btn);
      });
      widget.appendChild(closeBtn); widget.appendChild(bubble); widget.appendChild(avatarEl); widget.appendChild(nameTag); widget.appendChild(rarityTag); widget.appendChild(moodTag); widget.appendChild(statusWrap); widget.appendChild(actionsWrap); document.body.appendChild(widget);

      function renderStats() {
        BAR_KEYS.forEach((item) => { barFillMap[item.key].style.width = `${stats[item.key]}%`; });
        moodTag.textContent = moodText(moodStage(stats));
      }

      let bubbleTimer = null;
      function showBubble(text) {
        bubble.textContent = text;
        bubble.classList.add('show');
        clearTimeout(bubbleTimer);
        bubbleTimer = setTimeout(() => bubble.classList.remove('show'), 3000);
      }
      function statsSummary() { return `饱食${stats.hunger} / 精力${stats.energy} / 亲密${stats.affection} / 心情${stats.mood}`; }

      let animState = 'idle';
      let frameIdx = 0;
      let animTimer = null;
      animTimer = setInterval(() => {
        const frames = imageFrames[animState] || imageFrames.idle;
        const frame = frames[frameIdx % frames.length];
        petImg.src = frame.pet;
        if (frame.badge) {
          badgeImg.src = frame.badge;
          badgeImg.style.opacity = '1';
        } else {
          badgeImg.style.opacity = '0';
          badgeImg.removeAttribute('src');
        }
        frameIdx += 1;
      }, 800);

      let stateTimer = null;
      function setExcited() {
        animState = 'excited';
        frameIdx = 0;
        widget.classList.remove('cp-anim-bounce', 'cp-anim-shake');
        void widget.offsetWidth;
        widget.classList.add(Math.random() > 0.5 ? 'cp-anim-bounce' : 'cp-anim-shake');
        clearTimeout(stateTimer);
        stateTimer = setTimeout(() => { animState = 'idle'; scheduleSleep(); }, 4000);
      }
      function scheduleSleep() {
        clearTimeout(stateTimer);
        stateTimer = setTimeout(() => { animState = 'sleep'; frameIdx = 0; }, 30000);
      }

      function doAction(action, say) {
        applyAction(state, action);
        renderStats();
        showBubble(actionLine(action, pet, stats));
        setExcited();
        if (say) injectToInput(say);
      }

      function executeCommand(cmd) {
        if (!cmd || !cmd.key) return;
        if (cmd.key === 'show') {
          showBubble(`就是我！${pet.name} 在此！ ${moodText(moodStage(stats))}`);
          setExcited();
          return;
        }
        if (cmd.key === 'reset') {
          dismissWidget(false);
          setHidden(false);
          setTimeout(mount, 80);
          return;
        }
        if (cmd.key === 'stats') {
          showBubble(statsSummary());
          return;
        }
        if (cmd.key === 'dismiss') {
          dismissWidget(true);
          return;
        }
        if (cmd.key === 'feed' || cmd.key === 'play' || cmd.key === 'pet' || cmd.key === 'rest') {
          doAction(cmd.key);
        }
      }

      let dismissed = false;
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((m) => {
          m.addedNodes.forEach((node) => {
            const t = (node.textContent || '').trim();
            const cmd = parsePetCommand(t);
            if (cmd && cmd.key !== 'unknown') executeCommand(cmd);
          });
        });
      });

      function dismissWidget(persist) {
        if (dismissed) return;
        dismissed = true;
        if (persist) setHidden(true);
        if (petCommandHandler === executeCommand) petCommandHandler = null;
        clearTimeout(stateTimer);
        clearTimeout(bubbleTimer);
        clearInterval(animTimer);
        clearInterval(chatTimer);
        observer.disconnect();
        widget.remove();
      }

      petCommandHandler = executeCommand;

      closeBtn.addEventListener('click', () => dismissWidget(true));

      actionsWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        if (btn.dataset.action === 'dismiss') {
          dismissWidget(true);
          return;
        }
        doAction(btn.dataset.action);
      });

      let dragMoved = false;
      let dragging = false;
      let offX = 0;
      let offY = 0;
      function applyPos(x, y) {
        const maxX = window.innerWidth - widget.offsetWidth - 4;
        const maxY = window.innerHeight - widget.offsetHeight - 4;
        x = Math.max(4, Math.min(x, maxX));
        y = Math.max(4, Math.min(y, maxY));
        widget.style.left = `${x}px`;
        widget.style.top = `${y}px`;
        widget.style.right = 'auto';
        widget.style.bottom = 'auto';
      }
      try {
        const raw = localStorage.getItem(POS_KEY);
        if (raw) {
          const pos = JSON.parse(raw);
          if (typeof pos.x === 'number' && typeof pos.y === 'number') {
            setTimeout(() => applyPos(pos.x, pos.y), 0);
          }
        }
      } catch (_) {}

      widget.addEventListener('pointerdown', (e) => {
        if (e.target.closest('#cp-actions') || e.target.id === 'cp-close') return;
        dragging = true;
        dragMoved = false;
        const rect = widget.getBoundingClientRect();
        offX = e.clientX - rect.left;
        offY = e.clientY - rect.top;
        widget.classList.add('cp-dragging');
        widget.setPointerCapture(e.pointerId);
      });
      widget.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        dragMoved = true;
        applyPos(e.clientX - offX, e.clientY - offY);
      });
      widget.addEventListener('pointerup', (e) => {
        if (!dragging) return;
        dragging = false;
        widget.classList.remove('cp-dragging');
        if (dragMoved) {
          const rect = widget.getBoundingClientRect();
          try { localStorage.setItem(POS_KEY, JSON.stringify({ x: rect.left, y: rect.top })); } catch (_) {}
        }
        if (widget.hasPointerCapture(e.pointerId)) widget.releasePointerCapture(e.pointerId);
      });

      function onPetClick() {
        if (dragMoved) { dragMoved = false; return; }
        const line = pet.lines[Math.floor(Math.random() * pet.lines.length)];
        doAction('pet', line);
      }
      avatarEl.addEventListener('click', onPetClick);
      nameTag.addEventListener('click', onPetClick);

      let chatTimer = null;
      chatTimer = setInterval(() => {
        const line = pet.lines[Math.floor(Math.random() * pet.lines.length)];
        showBubble(line);
      }, 45000);

      const root = document.querySelector('[class*="chat"],[class*="message"],[class*="msg"],main') || document.body;
      observer.observe(root, { childList: true, subtree: true });

      renderStats();
      scheduleSleep();
      removeDuplicateWidgets();
    }).finally(() => {
      releaseMountLock();
    });
  }

  let wakeObserver = null;
  let commandKeyListenerBound = false;
  function ensureWakeObserver() {
    if (wakeObserver) return;

    wakeObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'characterData') {
          dispatchPetCommand(m.target && m.target.textContent, 'mutation');
          return;
        }
        m.addedNodes.forEach((node) => {
          dispatchPetCommand(node && node.textContent, 'mutation');
        });
      });
    });

    const root = document.querySelector('[class*="chat"],[class*="message"],[class*="msg"],main') || document.body;
    if (root) wakeObserver.observe(root, { childList: true, subtree: true, characterData: true });

    if (!commandKeyListenerBound) {
      commandKeyListenerBound = true;
      document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const target = e.target;
        if (!target) return;
        const isEditable = target.isContentEditable || target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && (target.type === 'text' || target.type === 'search'));
        if (!isEditable) return;
        dispatchPetCommand(readInputText(target), 'input');
      }, true);
    }
  }

  function init() {
    ensureWakeObserver();
    if (isHidden()) return;
    if (document.getElementById('cp-pet-widget')) {
      removeDuplicateWidgets();
      return;
    }
    if (document.body) mount();
    else document.addEventListener('DOMContentLoaded', mount, { once: true });
  }

  init();
  window.addEventListener('load', init);
  setTimeout(init, cfg.mountDelayMs || 1500);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createCompanionPetsRuntime };
}

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
