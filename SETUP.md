# Mood Scroll — TikTok Feed Curator

Pick a mode. Mood Scroll classifies every TikTok video and auto-skips anything that doesn't match — watching + liking the ones that do — to train TikTok's algorithm in real time.

## Quick install (60 seconds)

1. Download **`mood-scroll-extension.zip`** and unzip anywhere.
2. Open **chrome://extensions** in Chrome (or Brave / Arc / Edge).
3. Toggle **Developer mode** ON (top-right corner).
4. Click **Load unpacked** and select the unzipped **`chrome-mv3`** folder.
5. The options page auto-opens. **Demo API key + proxy URL + model are pre-filled.** Just click **Save**.
6. Open **tiktok.com/foryou** — yellow **✨** floating button appears bottom-right.

## The 8 modes

Click the **✨** button to open the panel:

| Mode | What it matches |
|---|---|
| **⏩ Auto Scroll** | Hands-off — watches every video, auto-likes, advances every 5s. No filtering. Just lets the feed train naturally on what plays. |
| **🧠💀 Brain Rot** | Animated / AI-generated / edited slop. Family Guy + Subway Surfers stacked, Skibidi Toilet, AI Peter Griffin narrators, anime+phonk edits, sigma slow-mo edits, split-screen game-footage videos. Real-people content is NOT matched. |
| **🍳 Cooking** | Recipe demonstrations and cooking technique. Food reviews / restaurant b-roll / dance-with-food are skipped. |
| **😂 Laugh** | Genuine comedy — sketches with punchlines, witty edits, absurd humor. Skips cringe and mean pranks. |
| **💎 LARP** | Visible wealth flex — Lambos, Rolexes, mansions, cash spreads, designer hauls, Tate-style alpha content. Any visible cash → instant LARP. |
| **💪 Fitness** | Gym physique content — shirtless lifters, pump checks, deadlift/squat demos, bodybuilding aesthetic. |
| **💅 Baddies** | Attractive women aesthetic content — gym girls, OOTD, glam, that-girl/clean-girl, slow-mo walks, fit checks. |
| **✨ Custom** | Type ANY niche (e.g. `"vintage car restoration"`, `"60s rock"`, `"indie game dev"`). Classifier matches against your text. |

## How it works under the hood (per video)

1. **Sponsored skip** — TikTok ads + `#sponsored / #ad` always skip (every mode)
2. **Negative hashtag pre-skip** — known-bad tags = instant skip (free, ~5ms)
3. **Tier 1 keyword pre-skip** — confident non-matches skip (free, ~10ms)
4. **API + vision** — gpt-4o with a frame + caption decides (~1-2s, ~$0.005)
5. **Local match** — does category match your mode's allow-list?
6. **Match** → auto-like + hold for category-appropriate time → advance

**Visual modes** (LARP / Baddies / Brain Rot / Fitness) **skip steps 2-3** and go straight to API + frame — visual evidence is the truth.

## Two power layouts

### 📱 Phone Mode
One click → Chrome resizes to 440px on the right edge of your screen + ALL of TikTok's chrome (nav, header, like/comment/save buttons, captions, music label) hides. Open Cursor / VS Code on the left 3/4 — TikTok keeps auto-scrolling in the narrow panel.

### 🪟 New Window
Opens TikTok in a separate narrow Chrome popup. Current tabs stay full-size.

## What TikTok's algorithm learns
- **Watch time** (the #1 ranking signal — matches hold 5-15s based on category)
- **Likes** (auto-liked on every match within rate limit)
- **Skips** (fast non-match skipping signals "don't show this")

After ~10-20 matched videos, a green **🎯 LOCKED IN** banner pops to confirm convergence. From then on, your feed is curated to your mood.

## Demo API key (shared across testers)

The pre-filled key is a demo with $80 of credits, shared across all installs. ~16,000 video classifications at gpt-4o rates. If it runs out:

- **OpenAI**: https://platform.openai.com → API keys
- Paste in **Options** → click **Save**

## Privacy

- Everything runs locally in your browser.
- The only network request is to the classifier API with video frames + caption text.
- No tracking, no accounts, no analytics.
- All state lives in `chrome.storage.local`.

## Files

```
chrome-mv3/                  — the loadable extension
mood-scroll-extension.zip    — same thing zipped for sharing
mood-scroll-demo.mp4         — 24s demo video
mood-scroll-demo-contact-sheet.jpg — preview thumbnails
SETUP.md                     — this file
```

Built with [WXT](https://wxt.dev) (TypeScript + Vite). 322 KB built.
