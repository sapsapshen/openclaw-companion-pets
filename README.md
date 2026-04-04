# Companion Pets

> A multi-pet animated companion widget powered by native browser capabilities, injectable into any webpage.

---

## ✨ Features

- 🐶 Runs with native browser capabilities, no extra plugin required
- 🦊 Multiple pets to choose from for work and entertainment
- 🐾 Rich animations showing different pet forms with ASCII-style presentation
- 🖥️ Easy to inject into modern pages, including frameworks like OpenClaw
- ❤️ Four-dimensional state system: Fullness / Energy / Affection / Mood, evolving naturally over time
- 🎮 Interactive actions: feed, play, pet, and rest, each affecting pet states in real time
- 💬 Enhanced command feedback: supports `/pet`, `/pet stats`, `/pet feed|play|pet|rest`, `/pet reset`
- 🧲 Stronger interaction feedback: drag-to-position, status bar panel, and auto chat bubbles
- ✅ Uses consistent OpenMoji image avatars instead of simple ASCII doodles

## Pet Images and States

- Image source: OpenMoji CDN (uniform icon style, loaded over the network)
- Each pet displays corresponding image frames by runtime state: `idle`, `excited`, `sleep`
- State frames are composed from the same OpenMoji asset set to keep all pet avatars visually consistent

> Asset credit: OpenMoji by HfG Schwabisch Gmund (CC BY-SA 4.0)

---

## 🚀 Quick Start

### Option 1: Local Server Mode (Recommended)
1. Run `npm install` in the project root.
2. Run `npm start` to start the server.
3. Open `http://localhost:3000` to view the demo page.
4. Inject `http://localhost:3000/widget.js` into OpenClaw or your target page.

### Option 2: Browser Extension Mode
1. Run `npm run sync:runtime` to generate the latest runtime code.
2. Load the `extension/` folder in Chrome Extensions (Developer Mode).
3. Open a matching site and the pet widget will appear automatically.

### Option 3: Userscript Mode
1. Run `npm run sync:runtime` to generate the latest `companion-pets.user.js`.
2. Import the script into Tampermonkey.
3. Open a matching site to experience pet interactions.

---

## 🏗️ Runtime Modes

- Server-side injection: `server.js` + `companion.js`
- Extension injection: `extension/content.js`
- Userscript injection: `companion-pets.user.js`
- Single-source runtime: `pet-runtime.js`

---

## 🕹️ Pet Commands

- `/pet`: show the current pet
- `/pet stats`: show current pet states
- `/pet feed`: feed
- `/pet play`: play
- `/pet pet`: pet (stroke)
- `/pet rest`: rest
- `/pet reset`: reset and randomly adopt a new pet

---

## 🔌 API (Server Mode)

- `GET /widget.js`: pet frontend script (IIFE)
- `GET /widget`: pet HTML snippet (fallback)
- `GET /pet/info`: current pet and state data
- `POST /pet/action`: pet action (`feed`/`play`/`pet`/`rest`)
- `POST /pet/reset`: reset and reassign a pet

---

## 🧩 Single-Source Maintenance

This project now uses a true single-source architecture:

- Runtime single source of truth: `pet-runtime.js`
- Generated target files: `extension/content.js`, `companion-pets.user.js`
- Build command: `npm run sync:runtime`
- Validation command: `npm run validate`

Recommended development workflow:

1. Edit `pet-runtime.js`
2. Run `npm run sync:runtime`
3. Run `npm run validate`
4. Start with `npm start` or verify interactions in extension/userscript mode

---

## 📄 License

MIT
