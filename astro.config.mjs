import { defineConfig } from 'astro/config';
import remarkCjkStrong from './src/lib/remark-cjk-strong.mjs';

export default defineConfig({
  // 要差し替え：公開URL（OGP画像などの絶対URLに使います）
  site: 'https://example.com',
  markdown: {
    remarkPlugins: [remarkCjkStrong],
  },
});
