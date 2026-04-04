# Companion Pets

> 多宠物字符动画陪伴小部件 — 纯浏览器原生能力，可注入任何网页。

---

## ✨ 特性

- 🐶 纯浏览器原生能力，无需安装额外插件即可运行
- 🦊 多种宠物提供选择，陪伴你的工作与娱乐
- 🐾 动画丰富，通过字符画呈现不同的宠物形态
- 🖥️ 轻松注入到包含 openclaw 等框架在内的现代页面中
- ❤️ 四维状态系统：饱食 / 精力 / 亲密 / 心情，随时间自然变化
- 🎮 可交互动作：喂食、玩耍、抚摸、休息，实时影响宠物状态
- 💬 命令反馈增强：支持 `/pet`、`/pet stats`、`/pet feed|play|pet|rest`、`/pet reset`
- 🧲 更强交互反馈：拖拽定位、状态条面板、自动闲聊气泡

---

## 🚀 快速开始

### 方式一：本地服务模式（推荐）
1. 在项目根目录执行 `npm install`。
2. 执行 `npm start` 启动服务。
3. 打开 `http://localhost:3000` 查看演示页面。
4. 在 OpenClaw 或目标页面注入 `http://localhost:3000/widget.js`。

### 方式二：浏览器扩展模式
1. 执行 `npm run sync:runtime` 生成最新运行时代码。
2. 在 Chrome 扩展管理页加载 `extension/` 目录（开发者模式）。
3. 打开匹配站点后会自动出现宠物挂件。

### 方式三：Userscript 模式
1. 执行 `npm run sync:runtime` 生成最新 `companion-pets.user.js`。
2. 在 Tampermonkey 中导入该脚本。
3. 打开匹配站点体验宠物交互。

---

## 🏗️ 运行形态

- 服务端注入：`server.js` + `companion.js`
- 扩展注入：`extension/content.js`
- Userscript 注入：`companion-pets.user.js`
- 单源运行时：`pet-runtime.js`

---

## 🕹️ 宠物命令

- `/pet`：查看当前宠物
- `/pet stats`：查看当前宠物状态
- `/pet feed`：喂食
- `/pet play`：玩耍
- `/pet pet`：抚摸
- `/pet rest`：休息
- `/pet reset`：重置并随机领养新宠物

---

## 🔌 API（服务端模式）

- `GET /widget.js`：宠物前端脚本（IIFE）
- `GET /widget`：宠物 HTML 片段（备用）
- `GET /pet/info`：当前宠物与状态数据
- `POST /pet/action`：宠物动作（`feed`/`play`/`pet`/`rest`）
- `POST /pet/reset`：重置并重新分配宠物

---

## 🧩 单源化维护

当前项目已实现真正单源化：

- 运行时唯一源码：`pet-runtime.js`
- 生成目标文件：`extension/content.js`、`companion-pets.user.js`
- 生成命令：`npm run sync:runtime`
- 校验命令：`npm run validate`

推荐开发流程：

1. 修改 `pet-runtime.js`
2. 执行 `npm run sync:runtime`
3. 执行 `npm run validate`
4. 启动 `npm start` 或在扩展/Userscript中验证交互

---

## 📄 许可证

MIT
