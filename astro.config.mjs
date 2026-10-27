// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Update once the production domain is known (used for canonical URLs / sitemap).
  site: 'https://example.com',
  server: { port: 3000 },
});
