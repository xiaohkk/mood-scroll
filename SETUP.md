# Mood Scroll — TikTok Feed Curator

Pick a mood. Mood Scroll auto-skips TikTok videos that don't match it and watches + likes the ones that do — training TikTok's algorithm in real time.

## Quick install (60 seconds)

1. **Download** `mood-scroll-extension.zip` and unzip anywhere.
2. Open **chrome://extensions** in Chrome (or any Chromium browser — Brave, Arc, Edge).
3. Toggle **Developer mode** ON (top-right corner).
4. Click **Load unpacked** and select the unzipped `chrome-mv3` folder.
5. The options page auto-opens. **The demo API key + proxy are pre-filled.** Just click **Save**.
6. Open **tiktok.com/foryou** — yellow **✨** floating button appears bottom-right.

## How to use

Click the **✨** button to open the panel, then pick one of 5 modes:

| Mode | What it does |
|---|---|
| **⏩ Auto Scroll** | Hands-off — watches each video, auto-likes it, advances every 5s. No filtering, just lets the feed train naturally. |
| **🧠💀 Brain Rot** | Keeps mindless dopamine content (satisfying loops, weird trends, animal antics, food porn). Skips everything that requires thinking. |
| **🍳 Cooking** | Only videos that actually show recipes or cooking technique. Skips food reviews, restaurant b-roll, dance videos with food. |
| **😂 Laugh** | Only genuinely funny content — sketches, witty edits, absurd humor. Skips cringe and mean-spirited pranks. |
| **✨ Custom** | Type ANY niche description (e.g. `"indie game dev"`, `"60s rock"`, `"vintage car restoration"`). The classifier matches against your exact prompt. |

### How it works under the hood
For every video:
1. **Instant pre-skip** if a hashtag clearly disqualifies it (free, ~5ms)
2. **Keyword negative-skip** for confident non-matches (free, ~10ms)
3. **GPT-4o-mini vision verification** — sends one frame of the video + caption + creator → returns category (~700ms, ~$0.002)
4. **Local match decision** — does the category match the mode? If yes → auto-like + hold for category-appropriate time. If no → skip immediately.

## Two power features

### 📱 Phone Mode
Click **📱 Phone Mode** in the panel → Chrome resizes to a 440px strip on the right edge of your screen + hides ALL of TikTok's chrome (nav, header, like/comment buttons, captions). Open Cursor / VS Code on the left 3/4. TikTok keeps auto-scrolling on the right.

### 🪟 New Window
Click **🪟 New Window** → opens TikTok in a separate narrow Chrome popup. Your current tabs stay full-size.

## What the algorithm learns
- **Watch time** (the strongest TikTok signal — matches hold 10-15s before advancing)
- **Likes** (auto-liked on every match)
- **Skips** (fast-skip negative signal on non-matches)

After ~10-20 matched videos, a green **🎯 LOCKED IN** banner pops to confirm TikTok's algo has converged on your mood. From then on, your feed is curated.

## Demo API key (shared across testers)

The pre-filled key is a demo key with limited credits (~40,000 video classifications shared across all users). If it runs out, get your own free key:

- **OpenAI**: https://platform.openai.com → API keys → create one starting with `sk-...`
- Paste in **Options** → click **Save**

## Privacy

- Everything runs locally in your browser.
- The only network request is to the classifier API with video frames + caption text.
- No tracking, no analytics, no accounts.
- All session data lives in `chrome.storage.local`.

## Files in this package

```
chrome-mv3/                — the loadable extension folder
├── manifest.json
├── background.js           — service worker (API calls)
├── content-scripts/        — runs on tiktok.com
├── popup.html
├── options.html            — pre-filled setup
└── receipt.html            — your "feed diet" stats
```

Built with [WXT](https://wxt.dev) (TypeScript + Vite). Source on request.
