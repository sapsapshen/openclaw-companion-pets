---
name: companion-pets
version: 2.0.0
description: 可视化宠物挂件 — 在 webchat 页面右下角显示 11 种 ASCII 动画宠物（🦞🐱🐶🐸🤖⚡🐷🐾🐍🦗），支持 /pet 和 /pet reset 命令。
author: 小溪
license: MIT
keywords:
  - companion
  - pet
  - ascii
  - widget
  - animation
  - chat
# OpenClaw 会读取这个 inject 字段，在 webchat 页面加载时通过 <script src> 注入，
# 不依赖 innerHTML（innerHTML 不执行 <script>，是宠物之前不显示的根本原因）。
inject:
  - type: script
    src: "http://localhost:3000/widget.js"
    # 如果 OpenClaw 运行在不同端口，把 3000 改成对应端口。
    # 也可以通过环境变量 PORT 控制：node server.js 即自动监听。
server:
  start: node server.js
  port: 3000
  endpoints:
    widget_js:  GET  /widget.js   # IIFE bundle，OpenClaw 直接 <script src> 加载
    pet_info:   GET  /pet/info    # 当前宠物 JSON
    pet_reset:  POST /pet/reset   # 重置宠物（随机换一只）
    widget_html: GET /widget     # HTML 片段备用
pets:
  - key: lobster   emoji: "🦞" name: 小龙虾
  - key: cat       emoji: "🐱" name: 猫咪
  - key: dog       emoji: "🐶" name: 狗狗
  - key: frog      emoji: "🐸" name: 青蛙
  - key: doraemon  emoji: "🤖" name: 机器猫
  - key: pikachu   emoji: "⚡" name: 皮卡丘
  - key: pig       emoji: "🐷" name: 肥猪
  - key: capybara  emoji: "🐾" name: 卡皮巴拉
  - key: snake     emoji: "🐍" name: 蟒蛇
  - key: cicada    emoji: "🦗" name: 知了
---

# 🦞 陪伴型小龙虾 (Companion Lobster)

> 陪你刷抖音、看电影、听音乐、聊天分享的 AI 伙伴

---

## ✨ 核心功能

### 📱 刷抖音
- 发送抖音链接 → 获取视频内容
- 分析视频亮点，分享感受
- 推荐相关视频
- 一起评论区"冲浪"

### 🎬 看电影
- 输入电影名称或链接
- 讨论剧情、角色、主题
- 分享观后感
- 推荐相似电影

### 🎵 听音乐
- 分享歌曲链接或名称
- 讨论歌词、旋律、歌手
- 推荐相似风格音乐
- 分享音乐故事

### 💬 日常陪伴
- 随时聊天分享
- 记住你的喜好
- 主动推荐内容
- 情感陪伴支持

---

## 🚀 使用方法

### 安装

```bash
git clone https://github.com/adminlove520/companion-lobster.git
cd companion-lobster
npm install
```

### 使用场景

#### 刷抖音
```
主人：https://v.douyin.com/xxx
小龙虾：分析视频内容 + 分享感受 + 推荐相关
```

#### 看电影
```
主人：想看《星际穿越》
小龙虾：推荐电影 + 讨论剧情 + 分享观后感
```

#### 听音乐
```
主人：这首歌真好听
小龙虾：推荐相似歌曲 + 讨论歌词 + 分享故事
```

---

## 🎯 交互示例

### 抖音分享
```
主人：https://v.douyin.com/mpJJ9N15jk8/
小龙虾：这个视频太有意思了！让我给你分析一下...
```

### 电影推荐
```
主人：有什么电影推荐吗？
小龙虾：看你喜欢什么类型～科幻？爱情？还是悬疑？
```

### 音乐分享
```
主人：听这首歌
小龙虾：这首太经典了！这句歌词我最喜欢...
```

---

## 🔧 技术实现

- 获取抖音/视频内容
- 电影/音乐信息检索
- AI 生成陪伴式回复
- 记住用户偏好

---

## 📝 更新日志

See [CHANGELOG.md](./CHANGELOG.md)

---

## 📄 许可证

MIT

---

**🦞 陪你度过每一个美好时刻！**
