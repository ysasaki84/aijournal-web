# 日本AIジャーナル

AI業界の当事者に聞く取材番組「日本AIジャーナル」のサイトです。番組の対話を記事にして公開します。

## ページ

- トップ: 番組映像と記事一覧
- `/about/`: 番組について
- `/partners/`: スポンサー募集。入力欄はサイト側で、送信は Google フォームの公開受付口へ渡す
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

## 公開

`redesign` へ push すると、`.github/workflows/deploy-pages.yml` が GitHub Pages に載せる。`light-theme` への push でも、暗い版と明るい版の両方をビルドし直す。

- 暗い版: https://ysasaki84.github.io/aijournal-web/
- 明るい版: https://ysasaki84.github.io/aijournal-web/light/

本番ドメインは `https://nipponaijournal.biz` です。配信はドメインの直下を想定しています（S3 に `dist/` を置き、CloudFront で配信する構成）。サブパスは付けません。

`/about/` や `/episodes/.../` は、それぞれのフォルダにある `index.html` を返すようにします。

問い合わせの項目IDと送信先は `src/site.config.ts` にあります。Google フォームの質問を足したり文言を変えたりしたら、ここの `contactFields` も合わせます。

## 記事を足す

`src/content/episodes/` に Markdown を追加します。`publishedAt` は YouTube の公開日を、日本時間の日付で書いてください。

```yaml
publishedAt: "2026-11-12T00:00:00+09:00"
```

共通のURL（YouTube、Podcast、問い合わせフォーム）は `src/site.config.ts` にあります。
