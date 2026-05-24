import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  srcDir: '.',
  manifest: {
    name: 'Mood Scroll',
    description: 'Pick a mode. We scroll for you.',
    version: '1.0.0',
    permissions: ['storage', 'activeTab', 'scripting', 'tabs'],
    host_permissions: [
      'https://www.tiktok.com/*',
      'https://generativelanguage.googleapis.com/*',
      'https://muon-lite.up.railway.app/*',
      'https://api.anthropic.com/*'
    ]
  }
});
