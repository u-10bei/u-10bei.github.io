// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://u-10bei.github.io',
  // Keep the Jekyll-era URLs: /about.html, /2021/09/<slug>.html, /posts/ ...
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
});
