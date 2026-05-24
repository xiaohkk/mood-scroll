const DEFAULT_PROXY_URL = 'https://muon-lite.up.railway.app';
const DEFAULT_MODEL = 'openai/gpt-5.1';
const DEMO_KEY = 'REDACTED-WAS-DEMO-KEY';

async function init() {
  const stored = await chrome.storage.local.get(['apiKey', 'proxyUrl', 'model']);
  const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
  const proxyInput = document.getElementById('proxyUrl') as HTMLInputElement;
  const modelSelect = document.getElementById('model') as HTMLSelectElement;

  apiKeyInput.value = stored.apiKey || DEMO_KEY;
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
