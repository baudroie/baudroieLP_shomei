# Round30 — 公開・再レビュー・再修正の反映

プレビュー https://baudroie.github.io/baudroieLP_shomei/
配信元・撮影・ビルドSHA `1bb085daea688492e7db3e3c6adbdcd902ca7e4f`
公開コミット `86053f86f6a851d0a624eb46b71668af21d1109e`（親fac562b）
GitHubデプロイ completed / success
https://github.com/baudroie/baudroieLP_shomei/actions/runs/38871385741
成果物 CSS `index-BMxQx0QK.css` / JS `index-CpvK5LyS.js`
確認JST: 2026-10-16T17:06:52.643316+09:00

他担当f90cc03を取り込み、並行の5613f33もmerge265654eで統合。round22以降のコード・証拠を保持し、強制pushなし。別担当の同名round23証拠はother-worker-round23/、レビューはdocs/other-worker-independent-review-round-23.mdへ分けて由来を保持。

承認相談写真をまとめトップへ適用。研修写真の頭、jobs配置、engineerteamサイズ・1280本文改行を修正。round26を公開して再レビューし、HR後続28pxずれを写真下余白で補正。統合後に見つかった営業390役割ラベル侵入とengineer支援ラベル孤立も29で修正、本文の軽微な孤立行を30で修正し再撮影した。

最終30はHEADを固定したまま全4ページ5幅の撮影・部位70・ビルド・Pages12条件を完了。同じsrc/public hashから公開し、remote gh-pages HEADと全配信ファイルhashが検証済distに一致。round27〜29の途中buildは公開せず、26と30だけを既存gh-pagesへ通常push。mainマージ、Pages設定・権限・ネットワーク変更なし。

公開URLへの直接アクセスはCONNECT proxy403。公開画面自体のクラウド実見は未実施で依頼元が確認する。GitHubデプロイと配信tree照合、ローカル静的ブラウザ検査は成功。写真/書体/原線画の最終検収とは別。

## 最新証拠

以下はすべてartifacts/qa/round-30/配下。

|ページ|PCマスター横並び|5幅全体|重点部位|
|---|---|---|---|
|まとめ|overview-side-by-side.jpg|overview-1440/1280/1066/768/390.png|subjects-stable/overview-*-overview-hero.png、overview-*-learning.png|
|営業|sales-side-by-side.jpg|sales-1440/1280/1066/768/390.png|subjects-stable/sales-390-sales-team.png|
|人事|hr-side-by-side.jpg|hr-1440/1280/1066/768/390.png|subjects-stable/hr-*-hr-support.png|
|エンジニア|engineer-side-by-side.jpg|engineer-1440/1280/1066/768/390.png|subjects-stable/engineer-390-engineer-team.png|

各ページoverlay/difference、全PCsection、before-after/の23→30全体20比較も保存。全体比較はglobal原点・実寸、マスターだけ幅1440へ等比換算。元画像を歪ませず差を隠さない。

標準撮影20条件、clientWidth横溢れ20条件、文字境界36条件、操作27条件、Pages12条件が成功。ブラウザ154/DPR1、画像・font読込とスクロール停止後撮影。最終ソースとsrc/public hashはreport.json、各src hashはsubjects-stable/report.json。Pages証拠 artifacts/qa/pages/round30-release/。独立補助レビュー docs/independent-review-round-30.md。

## 残課題・次作業

最終判定needs-fix。新たな具体的P1/P2衝突は30レビューで見つからなかったが、原線画/書体同一性、輪郭の精密差は未達。承認写真の変更は意図した例外。写真選定待ちは営業work/teamの2箇所。人事supportは承認写真に更新済みで旧750px課題と区別。未承認写真差替え、新規生成、AIアップスケールなし。スマホは暫定レスポンシブ、正式LINEは設定待ち。

依頼元が公開版のCSS/JSと上記ソースを照合し全4ページを実見する。新規具体P1/P2なら同PRで修正し、次の証拠は31以降。素材・書体の承認待ちは別記してCSS指摘を止めない。常駐監視は新設しておらず、依頼元の既存監視とセッション内PR確認で継続。
