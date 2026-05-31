import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  srcDir: '.',
  manifest: {
    name: 'Mood Scroll',
    description: 'Pick a mode. We scroll for you.',
    version: '1.0.0',
    permissions: ['storage', 'activeTab', 'scripting', 'tabs'],
    // tiktok.com is the only host we need at install time (for the content
    // script). MV3 background service workers can fetch ANY URL without
    // host_permissions — so api.openai.com, anthropic, or any custom
    // proxy URL the user sets all work without being declared here.
    // This keeps the Chrome Web Store review surface minimal.
    host_permissions: [
      'https://www.tiktok.com/*'
    ]
  }
});
