import html2canvas from 'html2canvas';

const CATEGORY_DISPLAY: Record<string, { emoji: string; label: string; color: string }> = {
  brain_rot:       { emoji: '🧠💀', label: 'Brain Rot',     color: '#e74c3c' },
  educational:     { emoji: '📚',   label: 'Educational',   color: '#27ae60' },
  comedy:          { emoji: '😂',   label: 'Comedy',        color: '#f1c40f' },
  wholesome:       { emoji: '💛',   label: 'Wholesome',     color: '#ff69b4' },
  food_porn:       { emoji: '🍔',   label: 'Food Porn',     color: '#e67e22' },
  cooking:         { emoji: '🍳',   label: 'Cooking',       color: '#d35400' },
  news_politics:   { emoji: '📰',   label: 'News/Politics', color: '#7f8c8d' },
  motivational:    { emoji: '💪',   label: 'Motivational',  color: '#3498db' },
  drama_storytime: { emoji: '🎭',   label: 'Drama',         color: '#9b59b6' },
  wind_down:       { emoji: '🌙',   label: 'Wind Down',     color: '#1abc9c' },
  fitness:         { emoji: '🏋️',   label: 'Fitness',       color: '#2980b9' },
  other:           { emoji: '📦',   label: 'Other',         color: '#95a5a6' }
};

async function init() {
  const { session } = await chrome.storage.local.get('session');
  if (!session) {
    document.getElementById('bars')!.innerHTML = '<div class="empty">No session yet. Open TikTok, pick a mode, and start scrolling.</div>';
    wireActions(false);
    return;
  }

  document.getElementById('date')!.textContent = new Date(session.startedAt).toLocaleDateString();

  const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  document.getElementById('session-time')!.textContent = `${m}m ${s}s`;
  document.getElementById('watched-count')!.textContent = String(session.watched || 0);
  document.getElementById('skipped-count')!.textContent = String(session.skipped || 0);

  const categories: Record<string, number> = session.categories || {};
  const total: number = Object.values(categories).reduce((a: number, b: number) => a + Number(b), 0);
  const sorted = Object.entries(categories).sort((a, b) => Number(b[1]) - Number(a[1]));

  const barsEl = document.getElementById('bars')!;
  barsEl.innerHTML = '';
  if (total === 0) {
    barsEl.innerHTML = '<div class="empty">No videos classified yet.</div>';
  } else {
    for (const [cat, count] of sorted) {
      const display = CATEGORY_DISPLAY[cat] || CATEGORY_DISPLAY.other;
      const pct = Math.round((Number(count) / total) * 100);
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.innerHTML = `
        <div class="bar-label">${display.emoji} ${display.label}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%; background:${display.color}"></div></div>
        <div class="bar-stats">${pct}% (${count})</div>
      `;
      barsEl.appendChild(row);
    }
  }

  wireActions(true);
}

function wireActions(hasSession: boolean) {
  document.getElementById('share')!.addEventListener('click', async () => {
    const receipt = document.getElementById('receipt')!;
    const canvas = await html2canvas(receipt, { backgroundColor: '#0a0a0a' });
    const link = document.createElement('a');
    link.download = 'mood-scroll-receipt.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });

  document.getElementById('reset')!.addEventListener('click', async () => {
    if (!confirm('Reset session?')) return;
    await chrome.runtime.sendMessage({ type: 'reset_session' });
    window.location.reload();
  });
}

init();
