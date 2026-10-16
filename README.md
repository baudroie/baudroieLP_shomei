# ボードルア 署名欄用LP

承認済みマスター4ページをクラウドCodexで実装するリポジトリです。

## 実装の入口

1. AGENTS.md と docs/IMPLEMENTATION_BRIEF.md を読む。
2. reference/manifest.json に記載された4枚の固定マスターを実見する。
3. original-assets/assets/ の公式素材を確認する。
4. docs/CLOUD_START.md の順に実装・撮影・比較・修正を行う。

対象: /、/sales/、/hr/、/engineer/。

React + TypeScript + Viteで4ページを実装中です。最新の視覚QA判定はdesign-qa.md、進捗はdocs/orchestrator-status.mdを確認してください。LINEの正式URLは未提供です。

本番公開や自動マージは含みません。文字と導線は編集可能なHTMLで実装します。

## 開発

Node.js 24 / npm 11で確認。リポジトリルートで実行します。

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 4173 --strictPort
npm run build
```

開発サーバーは現在の環境でループバック限定。0.0.0.0への公開は自動レビューが拒否したため行っていません。共有プレビューは下記GitHub Pagesです。

## QA

Python 3.12、Pillow、Playwright、`/usr/bin/chromium`が必要です。

```sh
python3 scripts/visual_qa.py --round 22
python3 scripts/functional_qa.py
```

Viteを起動した状態で実行。1440・390・768 CSS px/DPR1で全ページを撮影し、1440pxでは各セクションも撮影。横並び・50%overlay・差分と検証レポートを `artifacts/qa/round-N/` に保存します。Chromiumがサンドボックスのソケット制限で起動できない場合は正規の実行承認経路を使います。TLS検証や画像ハッシュは無効化しません。

`src/config.ts` に職種別LINE URLを設定できます。未設定時は「LINEリンクは設定待ちです」のダイアログを表示し、Escapeで閉じて操作元へフォーカスを戻します。

公式写真の出典・AI生成素材は `docs/asset-manifest.json`、原稿補正は `docs/content-corrections.md`。生成素材はマスターとの完全一致ではなく、公式写真との構図差を含めQAで継続確認します。

最新の比較は `artifacts/qa/round-21/`、判定はneeds-fixです。撮影ソースは `8290d27`。次のQAには未使用のラウンド番号を選び、過去の証拠を上書きしないでください。通常の `npm run dev` も127.0.0.1限定です。

## GitHub Pages

共有Pagesはround21対応の修正版へ更新済み。配信元8290d27、公開用gh-pages/82cea63、デプロイ情報はdocs/pages-deployment.md。クラウドから公開URLの直接実見はプロキシ403のため未実施。

現在のPages設定の変更は不要です。詳細はdocs/pages-deployment.mdとdocs/orchestrator-status.md。

共有URL: https://baudroie.github.io/baudroieLP_shomei/

公開用ビルド: `npm ci && npm run build:pages`。4ページの入口HTMLを生成し、サブディレクトリに画像・フォント・リンクを合わせます。ローカル検証: `python3 scripts/pages_qa.py`。公開後の確認: `python3 scripts/pages_qa.py --url https://baudroie.github.io/baudroieLP_shomei/ --output artifacts/qa/pages/live`。

配信対象はdist内だけです。mainへのマージは不要。更新時は検証後のdistをgh-pagesへ通常pushしてください。詳しくはdocs/pages-deployment.md。

中間幅の検査: `python3 scripts/responsive_qa.py --round 22`、境界検査: `python3 scripts/layout_bounds_qa.py --round 22`。人物見切れ・重なりを含む目視レビューと機械検査を区別します。写真選定待ちはdocs/photo-replacement-pending.md。
