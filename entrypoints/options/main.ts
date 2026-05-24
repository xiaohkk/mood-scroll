const DEFAULT_PROXY_URL = 'https://api.openai.com';
const DEFAULT_MODEL = 'gpt-4o';

async function init() {
  const stored = await chrome.storage.local.get(['apiKey', 'proxyUrl', 'model']);
  const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
  const proxyInput = document.getElementById('proxyUrl') as HTMLInputElement;
  const modelSelect = document.getElementById('model') as HTMLSelectElement;

  // No pre-filled key — user must paste their own.
  apiKeyInput.value = stored.apiKey || '';
  proxyInput.value = stored.proxyUrl || DEFAULT_PROXY_URL;
  modelSelect.value = stored.model || DEFAULT_MODEL;

  document.getElementById('save')!.addEventListener('click', async () => {
    await chrome.storage.local.set({
      apiKey: apiKeyInput.value.trim(),
      proxyUrl: proxyInput.value.trim() || DEFAULT_PROXY_URL,
      model: modelSelect.value || DEFAULT_MODEL
    });
    const status = document.getElementById('status')!;
    status.classList.add('show');
    setTimeout(() => status.classList.remove('show'), 1500);
  });
}
init();
