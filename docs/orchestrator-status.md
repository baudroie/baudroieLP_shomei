# Round33 — 測定したCSS差の修正と公開

URL https://baudroie.github.io/baudroieLP_shomei/
撮影・描画・ビルド元 `87bc39bfe771b6ce3b70952a37bd824c501c99e6`
公開SHA `74665af92049fad229784365e55772562f9dd94e`（親86053f8）
CSS `index-DilzdAgK.css` / JS `index-DYQvgn6f.js`
デプロイ completed / success
https://github.com/baudroie/baudroieLP_shomei/actions/runs/38895081591
公開更新JST 2026-10-16T20:38:11.951461+09:00

既存gh-pagesへ通常push。mainマージ、Pages設定・権限・ネットワーク変更なし。dist以外を公開せず、**新しい比較画像・QA画像を公開していない**。公開treeの全配信ファイルSHA256は検証済distと一致。公開URLはCONNECT proxy403のためクラウドから直接実見不可。依頼元が公開画面を検証する。

## 今回の変更

390pxまとめの見出しは原稿を保って『中長期の成長に／向けた取り組み』2行へ。learning谷と写真上弧、営業teamくびれ、HRhero左右、engineerteam底辺を同倍率/global原点の実測から局所修正。初回で残った営業/HR右差を独立レビュー後に再修正。共通orangeはマスター4枚12×12中央値を再現して#fd4301へ。営業3アイコンを個別拡大しlabel・罫線を約22〜26px下へ。ロゴ・写真・原線画の画素は未変更。

最終33は固定SHAから全4ページ1440/1280/1066/768/390で画像/フォント読込・スクロール停止後撮影。標準20、clientWidth基準20、文字境界36、操作27、Pages静的12条件成功。PC全高3557/3608/3798/3900は30から不変。人物の頭・顔・手、390役割ラベル、1280組みの検収済み箇所に新規P1/P2退行なし。独立補助レビュー docs/independent-review-round-33.md。

## 証拠と測定値

新しい画像はローカル限定。下記は /workspace/baudroieLP_shomei/artifacts/qa/round-33/ 配下で保持。PRにはJSONとレビュー文書を保存する。以前の公開round30画像は変更なし。

|ページ|ローカル最新比較|重点部位|
|---|---|---|
|まとめ|overview-side-by-side.jpg / overlay / difference|overview-focus-3.jpg、overview-390.png|
|営業|sales-side-by-side.jpg / overlay / difference|sales-focus-4.jpg / sales-focus-5.jpg、sales-1280/1066/390.png|
|人事|hr-side-by-side.jpg / overlay / difference|hr-focus-1.jpg、subjects-stable/hr-*-hr-support.png|
|エンジニア|engineer-side-by-side.jpg / overlay / difference|engineer-focus-6.jpg、subjects-stable/engineer-390-engineer-team.png|

全5幅全体・PCsection・subjects-stable70・responsive20もローカル保持。local-evidence-manifest.jsonに全画像絶対パス/ハッシュ。公開記録 artifacts/qa/pages/round33-release/deployment-status.json、サンプルorange-sampling.json、ソース/素材hash report.json。

測定は固定マスターを幅1440へ等比換算しglobal原点を保持。learning上辺8点残差+1〜+4px、写真上弧7点-3〜+1px、営業くびれ5点-2〜0px、HR右3点-1〜+1px、engineer底5点-1〜+4px。HR左y160は一致、y220には約6pxの精密差あり。測定ぼかし/閾値誤差±3〜5pxを含み、全画素同一の保証ではない。

## 残課題・次作業

今回の具体的CSS指摘は修正して独立レビュー・再撮影済み。素材待ちは分離: 原フォント/weight、原分離線画、営業work/team写真の未承認構図・画質、写真identity差。承認済み相談写真の適用は意図した例外。素材の勝手な選択・差替え・生成・アップスケールなし。HR左の精密差、背景色/全曲線の厳密一致と依頼元の最終承認は保留。スマホは暫定、正式LINEは待機表示を維持。

依頼元が公開CSS/JSを照合して再実見する。具体的CSS指摘があれば同PRで修正し、次round34以降で記録。新しい比較画像は引き続きローカル保持し、画像公開は別途ユーザー指示なしに行わない。無人常駐監視は新設していない。
