// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://tsogtb.com',
  // Static output (default) — deploys as plain HTML/CSS/JS to Cloudflare Pages.
  build: {
    inlineStylesheets: 'auto',
  },
});
