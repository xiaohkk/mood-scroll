import { MODES } from '@/entrypoints/shared/modes';

let currentMode: string | null = null;

async function init() {
  const stored = await chrome.storage.local.get(['currentMode', 'session']);
  currentMode = stored.currentMode || null;
  renderModes();
  updateStats();
  setInterval(updateStats, 500);

  document.getElementById('view-receipt')!.addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('/receipt.html') });
  });

  document.getElementById('reset-link')!.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!confirm('Reset session counters?')) return;
    await chrome.runtime.sendMessage({ type: 'reset_session' });
    updateStats();
  });
}

function renderModes() {
  const grid = document.getElementById('modes-grid')!;
  grid.innerHTML = '';
  for (const mode of MODES) {
    const btn = document.createElement('button');
    btn.className = 'mode-btn' + (currentMode === mode.id ? ' active' : '');
    btn.dataset.mode = mode.id;
    btn.innerHTML = `<span class="emoji">${mode.emoji}</span><span class="label">${mode.label}</span>`;
    btn.addEventListener('click', () => toggleMode(mode.id));
    grid.appendChild(btn);
  }
}

async function toggleMode(modeId: string) {
  if (currentMode === modeId) {
    currentMode = null;
    await chrome.storage.local.set({ currentMode: null });
    await broadcastToTikTokTabs({ type: 'stop' });
  } else {
    currentMode = modeId;
    await chrome.storage.local.set({ currentMode: modeId });
    await broadcastToTikTokTabs({ type: 'set_mode', mode: modeId });
  }
  renderModes();
}

async function broadcastToTikTokTabs(msg: any) {
  const tabs = await chrome.tabs.query({ url: 'https://www.tiktok.com/*' });
  for (const tab of tabs) {
    if (tab.id !== undefined) {
      chrome.tabs.sendMessage(tab.id, msg).catch(() => {});
    }
  }
}

async function updateStats() {
  const { session } = await chrome.storage.local.get('session');
  const watched = session?.watched || 0;
  const skipped = session?.skipped || 0;
  const startedAt = session?.startedAt || Date.now();
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  document.getElementById('watched')!.textContent = String(watched);
  document.getElementById('skipped')!.textContent = String(skipped);
  document.getElementById('timer')!.textContent = `${m}:${String(s).padStart(2, '0')}`;
}

init();
