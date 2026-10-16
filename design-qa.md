# Round 26 — 再レビュー・修正・公開検証

撮影/描画/ビルド元 `f0bd0bd053a8ed981e2bf4a61e9f7f5b7c1f2bfd`。比較基準 d23ee75f9ef23b049f73fa375705ed606ce5b594 の固定reference4枚。全src SHA256 `55f8c11507ed426d6f9c7637b9641c2c99a9fca8535c334b6220ceb883b7cb61`、全public素材tree SHA256 `0db0948325acac42acee025fd9c2c693e7ca9d11822cf61fa893df86f44bd524`。各src個別hashはsubjects-stable/report.json、素材個別hashはreport.json、ブラウザ/DPR/viewport/UTCも記録。承認相談写真SHA256 `f7f051f94c71e0230c26d9a3ae2e5b5649753a7dfab70ff0db41f44fe4c1691f`（1536×1024）。

## 引継ぎ・承認範囲

他担当の最新 `f90cc03` をfast-forwardで取り込み、round22の曲線・承認相談写真・キャプション変更を保持。gh-pagesは既存 `cbe53cb` から通常更新。トップで同じ承認相談写真を使うことは今回ユーザーが明示承認。写真差替えによる元マスター構図との違いは意図した例外。未承認写真、新規生成、AIアップスケールは一切なし。

## 比較→修正→再撮影

|対象|round23の現状|修正・確認|状態|
|---|---|---|---|
|まとめhero|旧welcome写真で最新承認未反映|承認相談写真へ。PCは写真マスク、狭幅は3:2で4人の頭と会話の手を保持|実見済み・承認例外|
|まとめlearning|横長cropと斜めmask上辺が頭に近い|24の原比率PCでは領域超過を発見。25でPC比率1.72/object-position50%20%、狭幅は1477:1108原比率へ。写真上弧・淡橙背景上下波を再調整|26全5幅実見|
|まとめjobs|役職名〜ボタンが約35px下|PC線画枠200→165px。総高3577→3557でマスター全高と一致、ページは伸縮なし|配置改善、絵柄差は残る|
|engineer team|実描画が小さく下の余白が多い|PC1400以上だけ120%拡大、右端維持・位置調整。人物/本文交差なし。背景下辺波も調整|改善|
|engineer経験者1280|末尾『か。』孤立|1200〜1399だけ本文サイズとtext-wrap:prettyを調整|孤立解消|
|人事support|承認写真の手が下辺に接する|26でPC比率3.55→3.3、位置35→42%。頭と原画像内の会話の手を保持。写真高さ約+28pxは構図維持の意図した調整|全5幅実見|
|全4ページ輪郭|旧21は矩形、22は比較画像未保存|22の背景SVGと写真maskを保持・比較。learning/teamの振幅を追加修正|26に3比較形式保存|

## 検証と証拠

各ページ1440/1280/1066/768/390 CSS px、DPR1、font ready・画像decode・スクロール停止後に撮影。round23=f90cc03、24=de6e536、25=58aad43、26=f0bd0bdを先にコミットして撮影。撮影後のsrc変更なし。23以前のmetadataを修正して新版扱いにしていない。round22の画像欠落/版対応unverifiedは履歴として保持し、26の新証拠で補う。

- 全4×5幅=20条件標準撮影、全体・PC各section・side-by-side・50%overlay・difference: artifacts/qa/round-26/
- classic scrollbar付きclientWidth検査20条件: responsive/（failures=[]）。
- 固定リンク混入を避け、ページ先頭で安定撮影した全体から実寸部位を切り出し: subjects-stable/ 70部位。初回subjects/はスクロール中の固定要素混入を含む診断用で、最終証拠に使わない。
- round23→26全体20比較: before-after/。グローバル原点を揃え、縮尺・縦横比・全体高さを維持、差を隠すsection位置合わせなし。
- 文字境界36条件・DPR2写真: layout-bounds-report.jsonと写真PNG。操作27条件: artifacts/qa/functional-report.json。
- 同ソースPages静的12条件、4ルートHTTP200・画像・フォント・職種導線・設定待ちdialog/keyboard: artifacts/qa/pages/round26-release/。

PC実装寸法: {'overview': [1440, 3557], 'sales': [1440, 3608], 'hr': [1440, 3826], 'engineer': [1440, 3900]}。高さ差は画像比較で隠さず表示。PR最新具体レビュー6210555056の証拠欠落・ソース不一致・hero未反映に対応。コメント取得は23開始時と26の作業中/終了時。24/25のreviews-observed-after-round.jsonは終了後取得した観測であり、開始時取得と偽らない。

## 判定・残課題

needs-fix / 最終検収待ち。承認相談写真の配置・今回の文字衝突と頭切れは修正したが、写真/原線画/書体のマスター同一性は未達。輪郭の微差（learning左上弧、CTA上下波の振幅）、文字の描画・細部余白は完全なピクセル一致ではない。元素材やフォント不明だけを理由に具体的なCSS不具合を放置した扱いにはしない。今回の具体的修正は表に記載。

写真選定は以前の3箇所のうち人事supportが承認済相談画像になり、未承認の営業work/teamはoffice_lounge750×500を保持。画質・構図は未解決。スマホは暫定レスポンシブ、正式LINE URLは設定待ち。mainマージ、Pages設定・権限・ネットワーク変更なし。

## Round26公開後の追加P2

独立レビューでHR写真の高さ増分により後続セクションが約28px下がる退行を発見。写真保持と支援説明前margin32→4pxで補正し、round27で全4ページを再撮影中。26は最終版ではない。
