import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Link previews need absolute URLs. On Vercel the production domain is known at build time;
// set SITE_URL to override it (e.g. a custom domain). Locally it falls back to relative paths.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
).replace(/\/$/, '');

const siteUrlInHtml = {
  name: 'site-url-in-html',
  transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl),
};

export default defineConfig({
  plugins: [react(), siteUrlInHtml],
  server: { port: 3000, open: true },
  preview: { port: 3000 },
});
