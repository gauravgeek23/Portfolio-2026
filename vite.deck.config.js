import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds the interview deck as a standalone, offline HTML presentation (see deck.html).
// npx vite build --config vite.deck.config.js --outDir <dir>
// It's a classic (IIFE) script, deferred, because browsers refuse module scripts over file://.
const classicScript = {
  name: 'classic-script',
  enforce: 'post',
  transformIndexHtml: (html) => html.replace(/<script type="module" crossorigin/g, '<script defer'),
};

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [react(), classicScript],
  build: {
    modulePreload: false,
    assetsInlineLimit: 0,
    rollupOptions: { input: 'deck.html', output: { format: 'iife' } },
  },
});
