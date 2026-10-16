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

開発サーバーは現在の環境でループバック限定。0.0.0.0への公開は自動レビューが拒否したため行っていません。共有プレビューは未作成です。

## QA

Python 3.12、Pillow、Playwright、`/usr/bin/chromium`が必要です。

```sh
python3 scripts/visual_qa.py --round 1
```

Viteを起動した状態で実行。1440・390・768 CSS px/DPR1で全ページを撮影し、1440pxでは各セクションも撮影。横並び・50%overlay・差分と検証レポートを `artifacts/qa/round-N/` に保存します。Chromiumがサンドボックスのソケット制限で起動できない場合は正規の実行承認経路を使います。TLS検証や画像ハッシュは無効化しません。

`src/config.ts` に職種別LINE URLを設定できます。未設定時は「LINEリンクは設定待ちです」のダイアログを表示し、Escapeで閉じて操作元へフォーカスを戻します。

公式写真の出典・AI生成素材は `docs/asset-manifest.json`、原稿補正は `docs/content-corrections.md`。生成素材はマスターとの完全一致ではなく、公式写真との構図差を含めQAで継続確認します。
