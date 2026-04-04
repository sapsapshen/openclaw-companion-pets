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
  const PET_CHATTER_DB = {
    lobster: ['今天的水温刚刚好，我想认真营业。', '我数过了，今天你看了我三次。', '钳子礼仪第一条：先打招呼再夹空气。', '我决定把烦恼装进泡泡里再放走。', '如果你忙，我就在旁边安静冒泡。', '刚才那朵云看起来像一碗辣汤。', '我怀疑键盘下面藏着一条小海沟。', '请注意，我正在和桌角进行外交会谈。', '我宣布今天的空气带有海盐口味。', '我的左钳刚给右钳发了加班通知。', '咔哒，咔哒，我在给沉默打节拍。', '别惊讶，我能听见WiFi在打喷嚏。', '我把计划写在看不见的珊瑚上了。', '如果宇宙是火锅，我就是会走路的配菜。', '最新情报：月亮欠我一只橡皮筋。'],
    cat: ['我刚巡视完领地，一切在掌控中。', '把手伸过来，今天允许你摸两次。', '你敲键盘的节奏还算有品味。', '我决定把午睡分成三个高级阶段。', '猫条是礼仪，不是贿赂，明白吗。', '窗外那只鸟看起来在讨论我。', '我刚和影子下棋，平局。', '沙发角落已经被我盖章认证。', '我打了个哈欠，时间自动慢了半秒。', '胡须雷达提示：今晚适合神秘行动。', '我把喵声存进云端，稍后下载。', '地板突然变成了看不见的传送带。', '请保持安静，我在研究重力漏洞。', '现在起，所有纸箱归猫法庭管辖。', '我刚收到宇宙快递：一根会发光的猫毛。'],
    dog: ['我准备好了，随时可以陪你冲刺。', '闻起来今天会有好事发生。', '我把尾巴摇成了欢迎模式。', '你专注的时候，我负责守护气氛。', '散步提案已提交，等待你批准。', '刚才风告诉我你很厉害。', '我在门口练习了三种开心跑法。', '请注意，我的耳朵捕获了零食频段。', '我和地毯达成了互不打扰协定。', '今天的目标是把快乐翻倍。', '我嗅到空气里有彩虹味道。', '尾巴加速中，可能引发小型气旋。', '我把汪汪翻译成了四国语言。', '如果情绪下雨，我就是你的晴天狗。', '紧急播报：我刚追上了一颗看不见的球。'],
    frog: ['呱，苔痕上阶绿，草色入帘青。', '王维说：行到水穷处，坐看云起时。', '呱，山重水复疑无路，柳暗花明又一村。', '我在荷叶上默念：不积跬步，无以至千里。', '今天背一首：长风破浪会有时，直挂云帆济沧海。', '池塘哲学：慢一点，才能看见水纹里的月亮。', '刚刚那阵风把我吹成了哲学家。', '我的影子先跳了一步。', '请勿打扰，我在和蚊子谈判。', '呱，我决定给月亮发一条语音。', '荷叶导航显示前方有快乐弯道。', '我把烦恼折成纸船漂走了。', '池塘今晚可能刷新隐藏关卡。', '如果安静有形状，那一定是圆圆的波纹。', '最新预报：青蛙合唱团即将从我脑内开场。'],
    doraemon: ['道具库盘点完毕，今天很有希望。', '莎士比亚说：凡是过往，皆为序章。', '罗曼·罗兰说：世界上只有一种英雄主义，就是看清生活后依然热爱生活。', '四次元口袋建议你先喝口水，再慢慢解决问题。', '我把今天标记为“可以变好的一天”。', '古诗提醒：纸上得来终觉浅，绝知此事要躬行。', '时光布说你的努力会发光。', '翻译蒟蒻正在翻译猫语和风声。', '竹蜻蜓提示：保持轻盈，问题会变小。', '口袋深处传来“叮”的一声好消息。', '我把担心压缩成了可回收文件。', '空气炮今天只发射鼓励，不发射焦虑。', '缩小灯照了一下，烦恼只剩芝麻大。', '放大灯照了一下，笑容大到装不下。', '系统通知：平行宇宙的你也在认真发光。'],
    pikachu: ['电量正常，心情也满格。', '我把尾巴调整到节能快乐模式。', '今天适合来一点小小闪光。', '别担心，我的电只会点亮不刺痛。', '我听见空气里有“加油”的回音。', '滋滋，云层里藏着棉花糖电流。', '我刚和插座进行了一次礼貌握手。', '地板在偷偷给我传导好运。', '尾巴天线接收到一段开心广播。', '我把紧张电成了烟花。', '警报：耳朵尖尖检测到彩虹电压。', '请勿靠近，我的可爱可能瞬间过载。', '我给影子充电，它开始跳舞了。', '今晚的月亮看起来像发光电池。', '终极通报：我刚把哈欠电成了流星。'],
    pig: ['今天也要把日子过得香香的。', '我认真思考过，午睡是刚需。', '如果快乐有重量，我已经超标。', '你忙你的，我在这边稳稳陪着。', '小目标：把烦恼拱到角落里。', '我刚听见饼干袋子在呼唤我。', '地砖的花纹像一张藏宝图。', '我决定把打盹写进时间管理。', '空气里飘着看不见的甜甜圈。', '我和枕头签了长期合作协议。', '哼哼，脑海里正在播放慢动作综艺。', '请让开，我要追一颗想象中的花生。', '今天的重力对我格外温柔。', '我把灵感存进了尾巴卷里。', '重大新闻：我的影子刚刚学会后空翻。'],
    capybara: ['冷静是我的超能力。', '天行健，君子以自强不息。', '先呼吸，再解决；道阻且长，行则将至。', '山重水复疑无路，柳暗花明又一村。', '长风破浪会有时，直挂云帆济沧海。', '行到水穷处，坐看云起时。', '我把噪音调成了背景白噪声。', '河边石头建议我们先喝口水。', '我正在把时间切成柔软的片段。', '今天的目标是“稳”，不是“急”。', '我和太阳约好轮流发呆。', '请相信，慢一点也算向前。', '温泉模式启动，杂念自动漂走。', '如果心事太重，先放在我背上。', '系统提示：你的平静值正在被我悄悄拉高。'],
    snake: ['嘶，先观察，再行动。', '知者不惑，仁者不忧，勇者不惧。', '静以修身，俭以养德。', '千里之行，始于足下。', '非淡泊无以明志，非宁静无以致远。', '我擅长在安静里找到机会。', '空气里有一条看不见的弯路。', '嘶，我在地板上画了一个秘密问号。', '太阳借给我一截金色鳞片。', '请勿惊慌，我只是在和风对话。', '我把犹豫打了个结，先放旁边。', '尾巴末端检测到微弱奇迹信号。', '今晚的月光像一条会发光的河。', '如果答案太直，不妨试试曲线前进。', '最新谣言：我能把沉默卷成一顶帽子。'],
    cicada: ['知了，今日开嗓状态良好。', '夏天的节拍器已经启动。', '我负责把安静叫醒一点点。', '树梢很高，视野很好。', '今天也要唱出有太阳味道的声线。', '我刚和一阵热风合唱了副歌。', '树皮纹路像一张老唱片。', '知了知了，我在给云朵打拍子。', '耳边的嗡鸣其实是夏天在笑。', '我把下午两点唱成了金色。', '请把烦恼调成静音，我来负责高音。', '蝉翼震动到第三档，灵感起飞。', '我听见远处电线在跟唱。', '如果空气会发光，那一定是我的和声。', '重大演出通知：我的脑内蝉鸣团已满员。']
  };
  const CALM_PET_KEYS = new Set(['capybara', 'snake', 'doraemon', 'frog']);
  const CALM_QUOTE_LINES = [
    '天行健，君子以自强不息。',
    '地势坤，君子以厚德载物。',
    '穷则独善其身，达则兼济天下。',
    '不积跬步，无以至千里。',
    '不积小流，无以成江海。',
    '千里之行，始于足下。',
    '知人者智，自知者明。',
    '胜人者有力，自胜者强。',
    '合抱之木，生于毫末。',
    '上善若水，水善利万物而不争。',
    '海纳百川，有容乃大。',
    '静以修身，俭以养德。',
    '非淡泊无以明志，非宁静无以致远。',
    '学而不思则罔，思而不学则殆。',
    '知之者不如好之者，好之者不如乐之者。',
    '己所不欲，勿施于人。',
    '知者不惑，仁者不忧，勇者不惧。',
    '君子和而不同，小人同而不和。',
    '士不可以不弘毅，任重而道远。',
    '博学而笃志，切问而近思。',
    '山重水复疑无路，柳暗花明又一村。',
    '长风破浪会有时，直挂云帆济沧海。',
    '会当凌绝顶，一览众山小。',
    '路漫漫其修远兮，吾将上下而求索。',
    '欲穷千里目，更上一层楼。',
    '不畏浮云遮望眼，自缘身在最高层。',
    '沉舟侧畔千帆过，病树前头万木春。',
    '江流天地外，山色有无中。',
    '行到水穷处，坐看云起时。',
    '大漠孤烟直，长河落日圆。',
    '采菊东篱下，悠然见南山。',
    '问君何能尔，心远地自偏。',
    '草木本无意，荣枯自有时。',
    '读书破万卷，下笔如有神。',
    '纸上得来终觉浅，绝知此事要躬行。',
    '苔痕上阶绿，草色入帘青。',
    '宠辱不惊，看庭前花开花落。',
    '去留无意，望天上云卷云舒。',
    'The unexamined life is not worth living.',
    'Know thyself.',
    'No man ever steps in the same river twice.',
    'Fortune favors the prepared mind.',
    'Where there is no vision, there is no hope.',
    'We are what we repeatedly do. Excellence, then, is a habit.',
    'What we think, we become.',
    'The obstacle is the way.',
    'He who has a why to live can bear almost any how.',
    'To improve is to change; to be perfect is to change often.',
    'Simplicity is the ultimate sophistication.',
    'Everything has beauty, but not everyone sees it.',
    'The journey of a thousand miles begins beneath one’s feet.',
    'Calm mind brings inner strength and self-confidence.',
    'In the middle of difficulty lies opportunity.',
    'Well begun is half done.',
    'Act without haste, but never pause.',
    'Measure what is measurable, and make measurable what is not.',
    'Discipline is choosing between what you want now and what you want most.',
    'Patience is also a kind of courage.',
    'When roots are deep, there is no reason to fear the wind.',
    'A clear mind can hear the quiet answer.'
  ];
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
  const DEFAULT_STATS = { hunger: 80, energy: 80, affection: 60, mood: 75, chaos: 20, lastDecayAt: Date.now() };
  const CHATTER_GUARD = {
    minIntervalMs: 12000,
    actionCooldownMs: 10000,
    maxPerMinute: 5,
    hiddenDeferMs: 18000,
    visibleBubbleDeferMs: 3500,
    cardClickCooldownMs: 3000
  };
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

  function petChatterList(key) {
    const lines = PET_CHATTER_DB[key];
    if (Array.isArray(lines) && lines.length >= 15) return lines;
    return PET_DB[key]?.lines || [];
  }

  function randomItem(arr) {
    if (!arr || !arr.length) return '';
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function calmQuoteChance(chaos) {
    const c = clamp(Number(chaos) || 0, 0, 100);
    // Inverse relation: lower chaos => much higher proverb/quote probability.
    return clamp(0.95 - c * 0.009, 0.05, 0.95);
  }

  function pickChaosLine(key, chaos) {
    const lines = petChatterList(key);
    if (!lines.length) return '';
    const c = clamp(Number(chaos) || 0, 0, 100);

    if (CALM_PET_KEYS.has(key) && Math.random() < calmQuoteChance(c)) {
      return randomItem(CALM_QUOTE_LINES);
    }

    let start = 0;
    let end = lines.length;
    if (c < 34) {
      start = 0;
      end = Math.min(lines.length, 6);
    } else if (c < 67) {
      start = Math.min(4, lines.length - 1);
      end = Math.min(lines.length, 11);
    } else {
      start = Math.min(9, lines.length - 1);
      end = lines.length;
    }
    const pool = lines.slice(start, end).filter(Boolean);
    return randomItem(pool.length ? pool : lines);
  }

  function chatterDelayMs(chaos) {
    const c = clamp(Number(chaos) || 0, 0, 100);
    const base = 50000 - c * 420;
    const jitter = Math.floor(Math.random() * 5000);
    return Math.max(CHATTER_GUARD.minIntervalMs, base + jitter);
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
    if (typeof state.stats.chaos !== 'number') state.stats.chaos = DEFAULT_STATS.chaos;
    const elapsed = now - (state.stats.lastDecayAt || now);
    const ticks = Math.floor(elapsed / (5 * 60 * 1000));
    if (ticks > 0) {
      state.stats.hunger = clamp(state.stats.hunger - ticks * 2, 0, 100);
      state.stats.energy = clamp(state.stats.energy - ticks * 1, 0, 100);
      state.stats.affection = clamp(state.stats.affection - ticks * 1, 0, 100);
      const neglectBoost = ticks * (state.stats.affection < 45 ? 2 : 1);
      state.stats.chaos = clamp(state.stats.chaos + neglectBoost, 0, 100);
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
      feed: { hunger: +18, energy: +3, affection: +4, chaos: -6 },
      play: { hunger: -6, energy: -8, affection: +12, chaos: +8 },
      pet: { affection: +14, energy: +2, hunger: -2, chaos: -4 },
      rest: { energy: +16, hunger: -3, affection: +2, chaos: -10 }
    };
    const effect = effects[action] || effects.pet;
    const s = state.stats;
    s.hunger = clamp(s.hunger + (effect.hunger || 0), 0, 100);
    s.energy = clamp(s.energy + (effect.energy || 0), 0, 100);
    s.affection = clamp(s.affection + (effect.affection || 0), 0, 100);
    s.chaos = clamp((typeof s.chaos === 'number' ? s.chaos : DEFAULT_STATS.chaos) + (effect.chaos || 0), 0, 100);
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
      #cp-actions{margin-top:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;white-space:normal;max-height:0;opacity:0;transform:translateY(8px);overflow:hidden;pointer-events:none;transition:max-height .2s ease,opacity .18s ease,transform .2s ease,margin-top .2s ease;}
      #cp-pet-widget:hover #cp-actions,#cp-pet-widget:focus-within #cp-actions{margin-top:7px;max-height:120px;opacity:1;transform:translateY(0);pointer-events:auto;}
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
      const BAR_KEYS = [{ key: 'hunger', label: '饱食' }, { key: 'energy', label: '精力' }, { key: 'affection', label: '亲密' }, { key: 'mood', label: '心情' }, { key: 'chaos', label: '混乱' }];
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
      function statsSummary() { return `饱食${stats.hunger} / 精力${stats.energy} / 亲密${stats.affection} / 心情${stats.mood} / 混乱${stats.chaos}`; }

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
        lastActionAt = Date.now();
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
        clearTimeout(chatTimer);
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

      let lastCardSpeakAt = 0;
      function maybeSpeakOnCardClick() {
        const now = Date.now();
        if (now - lastCardSpeakAt < CHATTER_GUARD.cardClickCooldownMs) return;
        if (Math.random() > 0.35) return;
        const line = pickChaosLine(state.key, stats.chaos);
        if (!line) return;
        lastCardSpeakAt = now;
        showBubble(line);
        setExcited();
      }

      widget.addEventListener('click', (e) => {
        if (e.target.closest('#cp-actions') || e.target.id === 'cp-close') return;
        if (dragMoved) {
          dragMoved = false;
          return;
        }
        maybeSpeakOnCardClick();
      });

      let chatTimer = null;
      let lastActionAt = 0;
      const chatterHits = [];
      function pruneChatterHits(now) {
        while (chatterHits.length && now - chatterHits[0] > 60000) chatterHits.shift();
      }
      function scheduleChatter() {
        clearTimeout(chatTimer);
        chatTimer = setTimeout(() => {
          const now = Date.now();
          pruneChatterHits(now);
          if (document.hidden || dragging) {
            chatTimer = setTimeout(scheduleChatter, CHATTER_GUARD.hiddenDeferMs);
            return;
          }
          if (now - lastActionAt < CHATTER_GUARD.actionCooldownMs) {
            chatTimer = setTimeout(scheduleChatter, CHATTER_GUARD.actionCooldownMs - (now - lastActionAt));
            return;
          }
          if (bubble.classList.contains('show')) {
            chatTimer = setTimeout(scheduleChatter, CHATTER_GUARD.visibleBubbleDeferMs);
            return;
          }
          if (chatterHits.length >= CHATTER_GUARD.maxPerMinute) {
            chatTimer = setTimeout(scheduleChatter, 12000 + Math.floor(Math.random() * 3000));
            return;
          }

          const chaosPulse = Math.random() < 0.35 ? 3 : 1;
          const autoCap = 92;
          stats.chaos = clamp(stats.chaos + chaosPulse, 0, autoCap);
          if (stats.chaos >= 88 && Math.random() < 0.55) {
            // Self-soothing guardrail to prevent permanent high-chaos spam loops.
            stats.chaos = clamp(stats.chaos - 6, 0, 100);
          }
          state.updatedAt = Date.now();
          saveState(state);
          renderStats();
          showBubble(pickChaosLine(state.key, stats.chaos));
          chatterHits.push(Date.now());
          scheduleChatter();
        }, chatterDelayMs(stats.chaos));
      }
      scheduleChatter();

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
