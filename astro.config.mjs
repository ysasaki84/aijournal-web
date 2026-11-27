import { defineConfig } from 'astro/config';
import remarkCjkStrong from './src/lib/remark-cjk-strong.mjs';

export default defineConfig({
  // 本番ドメイン。配信はドメイン直下（S3 + CloudFront などの静的ホスティング）を想定。
  site: 'https://nipponaijournal.biz',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [remarkCjkStrong],
  },
});
