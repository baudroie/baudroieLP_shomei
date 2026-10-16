# 視覚QA — round 17

判定: **needs-fix / 最終検収保留**。今回指示の見切れ・重複・中間幅の横溢れは最新証拠で改善確認。素材品質・構図・原書体/線画同一性の未承認差は別課題として残す。

## 比較版

- 資料基準: d23ee75f9ef23b049f73fa375705ed606ce5b594、reference/manifest.jsonの4枚を実見、SHA256一致。
- 最新撮影ソース: `e17e5d68d2019b3f12314fb503c203e8ec4c2163`
- source_sha256: `ba47d6eb1ec3de82e0f69e5affbbcf3bcd5e0a1dd40887ba3a6ce5f42e428f44`
- asset_tree_sha256: `f669420d5272fa85368efa98286b3b974e8f0f63ac54ca9e812028de2eb8fddc`（public素材/フォント36ファイル、旧5d13cddから無変更）。
- 元素材・reference・写真・フォントは不変。撮影後のアプリ変更なしを照合。後続文書/証拠コミットと撮影ソースを区別。
- 修正前はround12/responsive、コミット `5d13cdd356d1d5bbf76f31f028565adfbd93a443`。round13–16の途中欠陥も保存している。

## 撮影・検査

Chromium 154.0.8037.57 / DPR1。document.fonts.ready・全img.decodeを待ち、smooth scrollを停止して先頭/対象sectionで静止後に撮影。1440pxの通常キャンバスでは固定マスターを幅1440へ単一倍率で等比変換し、先頭/global yで整列。足りない高さは灰色パディング。セクション単位の位置補正・画像変形なし。

- 1440/390/768の4ページ通常撮影12条件、failures=[]。
- 1440/390/768/999/1000/1024/1066/1280/1363の4ページ＝36条件。Playwrightの--hide-scrollbarsを外し、Linux Chromiumの通常縦バーを表示。**documentElement.scrollWidthとclientWidthで判定**し全条件一致。innerWidthとの差もreportに保存。1363指定時clientWidth1348を再現。ページ全体をoverflow-x:hiddenで隠す修正なし。
- 27操作シナリオ成功。職種への実クリック/戻り/ナビhash、LINE待機Enter/Tab/Escape・フォーカス復帰、操作領域、成長パネル収まりを確認。
- 36実文字境界シナリオ成功。hero本文/写真、営業左右、learning/career、caption/キャリア例、末尾CTAを検査。画像比較の合否とは区別。
- 通常ビルドとPages用ビルド成功。DPR2は既存office写真をそのまま撮影し品質不足を記録。

## 1440pxの全体比較

|ページ|マスター高|実装高|最新証拠|
|---|---:|---:|---|
|overview|3557|3577|`artifacts/qa/round-17/overview-side-by-side.jpg`|
|sales|3601|3608|`artifacts/qa/round-17/sales-side-by-side.jpg`|
|hr|3798|3798|`artifacts/qa/round-17/hr-side-by-side.jpg`|
|engineer|3900|3900|`artifacts/qa/round-17/engineer-side-by-side.jpg`|

まとめは人物を収める表示枠で全高+20px、営業は自然な内容高で+7px。高さを押し込んで一致させていない。人事・エンジニアの高さ一致も視覚合格の証明ではない。

各ページの全体・section・同global y focus・50%overlay・differenceはround17直下、全指定幅の縦バー表示画像と実測はresponsive/。**修正前後20組**はbefore-after/（1000/1066/1280/1363/1440、全4ページ、同viewport/ページ先頭整列/無伸縮/旧横溢れ領域を保持）。manifest.jsonに元寸法と版を記録。

## 指示別の修正と確認

|対象|原因|修正/証拠・結果|
|---|---|---|
|まとめhero・ナビ|固定520pxコピーと可変写真の交差|白い読領域を確保、写真幅62%、字幅/CTAを可変化、ナビ白地。1200未満は縦組み。最新responsive全幅とhero focusで重複なし|
|まとめjobs頭切れ/右ボタン|300%stripを高さ155pxへ拡大crop、列のmin-content幅|同じstripを適切な220×200枠で等比表示、minmax(0,1fr)とボタン幅調整。1000〜1199も3列維持。1066 focusで頭・手・機器と全CTAを確認|
|営業intro横溢れ|固定負margin68pxと中間幅paddingの差|minmax列/親paddingに一致するmargin。clientWidth検査へ。写真はcontainで主役頭切れ回避（白余白は素材構図待ち）|
|営業濃色重複・team/CTA侵入|固定px/nowrap、早すぎるPC切替、狭い曲線コピー領域|可変字幅・列/内容高、1200切替、1200〜1399のteamを通常2列、CTA文字/図を枠内へ。1000/1066/1280/1363実見で衝突なし|
|人事planning人物切れ|1774×887線画のcover|既存線画をcontain。左右の人物・手を維持|
|人事hero単色・lead侵入|単色背景、画像と読み領域の競合|CSSの白/クリーム面を追加。1280はcopy上段、画像/線画下段の専用grid。見切れ/重複なし|
|人事value本文濃度|weight500、行間43.75px|同梱Noto Sansで700、25px、#607087、40pxへ。比較computed詳細はround13/hr-value-computed.json（旧CSS再現方法も明記）。3行/右濃色配置を保持|
|engineer team両端/CTA|横長1942×809をcover、%列合計にgap加算|contain/自然比率、gapを除いたfr列、CTA図contain/文字を調整。1066全人物・本/鉛筆・CTAを確認|
|engineer learning/career・経験者本文|固定高/拡大absolute図が本文へ侵入|1200未満縦組み、中間幅auto高/図を親枠100%contain。1440の安全なリズムは維持。研修写真は1400未満自然2:1で頭全表示|
|追加:まとめgrowth越境|中間幅でもbusiness固定高1290|中間幅の内容高へ。1000〜1280のパネル越境を実操作検査でも確認し解消|

## 再比較の履歴と独立レビュー

round12修正前に36条件中15件の横溢れ。round13でHR装飾の溢れを検出→14で修正。14は横溢れゼロでも、15の目視で1000/1280のP1重なりを検出→切替/通常フローへ修正。16残りの研修写真crop・HRgrid順を17で修正。機械検査だけで合格にはしない。

補助レビュー: docs/independent-review-round-15.md / round-16.md / round-17.md。最新17は全4PC＋指定各幅を実見し、今回のP1/P2解消を確認。依頼元の最終検収とは別。

## 残課題

- **office_lounge.jpg 750×500の画質**。営業team/人事supportで大判表示しDPR2で不足。CSS/AIアップスケールで解消した扱いにしない。docs/photo-replacement-pending.mdにページ/section/元寸法/最大枠/推奨原画像/必要構図を記録。候補/構図は依頼元で決定。
- その他写真/線画の人数・姿勢・顔・細部、原フォントの字形/太さ/字間はマスター同一でない。今回素材差し替え/生成なし。承認前に無断で差を許容済みとしない。
- containにした写真/線画の白余白・描画面積、残る小さい組版/枠差は最終承認待ち。完全再現とは報告しない。
- LINE正式URL未提供。設定待ちを表示、実遷移未検証。390/768等は暫定レスポンシブ。

## Pages閲覧反映

ユーザーの追加指示でround17対応ソースfa4bc3dからビルドし、gh-pages/54d0d7cへ反映。GitHubデプロイ成功。公開URL直接確認はクラウドのプロキシ403により未実施。詳細docs/pages-deployment.md。視覚判定needs-fix・写真承認待ちは変更しない。
