# オーケストレーター向け実装進捗

更新UTC: 2026-10-16T05:27:19.261389+00:00

- PR: https://github.com/baudroie/baudroieLP_shomei/pull/1 （Draft）
- ブランチ: feat/four-role-landing-pages
- 資料基準: d23ee75f9ef23b049f73fa375705ed606ce5b594
- 最新撮影ソース: `e17e5d68d2019b3f12314fb503c203e8ec4c2163`
- source_sha256: `ba47d6eb1ec3de82e0f69e5affbbcf3bcd5e0a1dd40887ba3a6ce5f42e428f44`
- 全素材/フォントSHA256: `f669420d5272fa85368efa98286b3b974e8f0f63ac54ca9e812028de2eb8fddc`、36ファイル。旧5d13cdd以降不変。
- 最新QA: **round17**。今回指摘のCSS問題は補助レビューで解消確認。全体は**needs-fix / 最終検収保留**（画質/構図/素材同一性/書体の承認待ち）。

## 対応したレビュー

6208344208と6208400965を全文読了。指定事項と追加で発見した中間幅不良を既存素材のまま修正。詳細の原因・修正・証拠表はdesign-qa.md。1200未満を縦組みの基本へ変更、1000〜1199のまとめ職種は3列。1280人事heroは専用grid。1440の4ページ構成を保持。

round12修正前→round13〜16修正と再発見→round17最新を保存。横溢れゼロだけでは合格にせず、目視で残P1を見つけて修正した。写真・線画の差し替え/新規生成/AIアップスケール、mainマージ、権限/ネットワーク設定変更なし。

## 最新証拠と検証

- artifacts/qa/round-17/report.json：1440/390/768の4ページ・12条件failures=[]。各ページ全体/section/global focus/50%overlay/difference。
- artifacts/qa/round-17/responsive/report.json：1440/390/768/999/1000/1024/1066/1280/1363 × 4ページ36条件、通常縦バーあり。clientWidthとscrollWidth一致、全画像/フォントロード完了後撮影。
- artifacts/qa/round-17/before-after/：修正前round12と最新17、20組。無伸縮・先頭/global y整列、元の横溢れ領域を隠さない。
- artifacts/qa/functional-report.json：27実リンク/キーボード/表示領域シナリオ成功。
- artifacts/qa/round-17/layout-bounds-report.json：36実文字境界検査成功。DPR2のsales/hr写真証拠も同じディレクトリ。
- artifacts/qa/latest-verification.json：版・hash・検証件数一覧。
- docs/independent-review-round-17.md：最新補助目視レビュー。依頼元の最終承認とは区別。
- 通常/Pages用ビルド成功。参考資料と素材ファイルは無変更。撮影後の描画ソース/hashを照合済み。

|ページ|最新1440比較|
|---|---|
|まとめ `/`|artifacts/qa/round-17/overview-side-by-side.jpg|
|営業 `/sales/`|artifacts/qa/round-17/sales-side-by-side.jpg|
|人事 `/hr/`|artifacts/qa/round-17/hr-side-by-side.jpg|
|エンジニア `/engineer/`|artifacts/qa/round-17/engineer-side-by-side.jpg|

## 共有URLと配信版

共有Pages URL: https://baudroie.github.io/baudroieLP_shomei/ 。今回のユーザー指示で、既存gh-pagesへ修正版を反映しました。

- 配信元ソースSHA: `fa4bc3d3f1074e0a98454ec1541a9d93fc4f907a`（PR head fa4bc3d）。
- round17描画コード: `e17e5d68d2019b3f12314fb503c203e8ec4c2163`。fa4bc3dのsrc/public hashがround17と一致することをビルド前に照合。
- 公開用コミット: `54d0d7c7fd51e1002617c362a39fcf7eb1d62588`（旧6995de1を親に通常push、履歴保持）。
- GitHub側デプロイ: **completed / success**。https://github.com/baudroie/baudroieLP_shomei/actions/runs/38856709282 （確認UTC 2026-10-16T05:38:36.508180+00:00）。
- 公開入口: /baudroieLP_shomei/、sales/、hr/、engineer/。各index.html、画像・フォント・ナビ/ロゴをproject baseで検証。12ローカル静的ブラウザ条件成功。
- CSS: index-B7UDXxZH.css、JS: index-qJ4PQdBD.js。deployment.jsonに配信元ソースとビルド日時を記録。
- 証拠/全配信ファイルSHA256: artifacts/qa/pages/round17-release/deployment-status.json、report.json、12画面撮影。

クラウドからbaudroie.github.ioの直接アクセスはCONNECT proxy 403。ネットワーク/Pages設定/権限を変更せず、公開HTTPと画面の最終実見は依頼元へ。GitHubデプロイ成功と公開画面の実見済みは区別します。素材差替え/生成/アップスケール、mainマージは行っていません。今回反映は閲覧用であり、画質/マスター同一性の最終検収完了ではありません。

## 残課題と次作業

1. office_lounge.jpg（750×500）の画質不足は素材承認待ち。docs/photo-replacement-pending.mdに全写真枠・必要構図・DPR2目安を掲載。依頼元でユーザーと写真候補を選定する。元画像は不変。
2. 写真/線画の構図・人物同一性、原書体、contain表示による余白などの最終差分は承認待ち。今回のCSS不良の解消とは分ける。
3. LINE URLはsrc/config.tsでnull、設定待ちダイアログ。正式URL受領後に実遷移確認。
4. 次は依頼元の最新PR証拠確認と写真/構図の決定を反映。今回のPages閲覧反映を完全再現・最終検収済みとは扱わない。スマホ/中間幅は暫定レスポンシブ。

## 再開

npm run dev（127.0.0.1限定）、npm run build。次の未使用ラウンドは18。python3 scripts/visual_qa.py --round 18 と python3 scripts/responsive_qa.py --round 18、python3 scripts/functional_qa.py、python3 scripts/layout_bounds_qa.py --round 18。過去の撮影は上書きしない。
