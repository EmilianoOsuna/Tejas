import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Static output: the home page has no server-side state. The contact form
// posts to a third-party endpoint (see src/scripts/form.js).
export default defineConfig({
  site: 'https://www.tejaschocolate.com',
  output: 'static',
  integrations: [tailwind({ applyBaseStyles: false })],
  build: { inlineStylesheets: 'auto' },
});
