# 日本AIジャーナル

AI業界の当事者に聞く取材番組「日本AIジャーナル」のサイトです。番組の対話を記事にして公開します。

## ページ

- トップ: 番組映像と記事一覧
- `/about/`: 番組について
- `/partners/`: スポンサー募集（Googleフォームを埋め込み）
- `/episodes/[slug]/`: 記事

## ローカルで動かす

```bash
npm install
npm run dev
```

本番用の静的ファイルは次で出力します。

```bash
npm run build
```

`dist/` の中身が公開物です。

## 本番の置き場所

公開URLは `https://nipponaijournal.biz` です。配信はドメインの直下を想定しています（S3 に `dist/` を置き、CloudFront で配信する構成）。サブパスは付けません。

`/about/` や `/episodes/.../` は、それぞれのフォルダにある `index.html` を返すようにします。

## 記事を足す

`src/content/episodes/` に Markdown を追加します。`publishedAt` は YouTube の公開日を、日本時間の日付で書いてください。

```yaml
publishedAt: "2026-11-12T00:00:00+09:00"
```

共通のURL（YouTube、Podcast、問い合わせフォーム）は `src/site.config.ts` にあります。
