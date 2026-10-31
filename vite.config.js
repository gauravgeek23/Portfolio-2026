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

// Pages listed in sitemap.xml (case studies by slug, matching src/data/projects.js).
const pages = [
  '/',
  '/play',
  '/notes',
  '/about',
  '/resume',
  ...[
    'academic-calendar',
    'lottiefiles-vision-pro',
    'toppr-answr',
    'iconscout-plugin',
    'camera-app-wear-os',
    'iphone-kit',
  ].map((slug) => `/work/${slug}`),
];

// robots.txt and sitemap.xml need the absolute site URL, so they're written at build time.
const seoFiles = {
  name: 'seo-files',
  apply: 'build',
  generateBundle() {
    const sitemap = siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml` : '';
    this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /${sitemap}\n` });
    if (!siteUrl) return;
    const urls = pages.map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n');
    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    });
  },
};

export default defineConfig({
  plugins: [react(), siteUrlInHtml, seoFiles],
  server: { port: 3000, open: true },
  preview: { port: 3000 },
});
