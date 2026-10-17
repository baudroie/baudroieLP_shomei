# Historical round33; its sales-team face-coverage finding was missed and superseded by round34.

# Round33 — 指摘されたCSS差の測定・修正・再撮影

撮影/描画/Pagesビルド元 `87bc39bfe771b6ce3b70952a37bd824c501c99e6`。src SHA256 `403a5937d9e661918d16fed8cd518598bde7bb187383cbce21463ec9ea0fdff6`。全public素材tree SHA256 `0db0948325acac42acee025fd9c2c693e7ca9d11822cf61fa893df86f44bd524`（round30と同一）。固定マスターはreference/manifest.jsonの4枚、元幅798/793/772/762から1440へ等比換算し、原点とglobal座標を揃えて比較。原画を編集せず、section位置合わせや縦横別伸縮で差を隠していない。

最新HEAD b712390を確認して開始。追加の他担当変更なし。round22以降の変更と承認済相談写真を保持。

## 原稿・追加色・アイコン

390growth見出しは原稿の文字を一切変えず、spanで『中長期の成長に／向けた取り組み』の意味単位2行へ。24px/1.45、PCに改行を追加しない。孤立『み』解消。

共通CSS tokenは #ff4b00 → **#fd4301**。依頼元の公開観測#ec5a29とは値に差があったが、クラウドPNG/元CSSでは#ff4b00を確認したうえで固定マスターの4点を再サンプル。12×12中央非文字領域でoverview#fd4a01 / sales#fd4101 / hr#fd4402 / engineer#fd4201を完全再現。代表値#fd4301を採用し、4ページの最終PNGでも主色画素を確認。ロゴファイル・写真・線画内部の色や画素は変更なし。詳細orange-sampling.json。

営業『成長のサポート』3アイコンは同じ画像のまま個別調整。PC slot150→195px、先頭width130%/雲128%/メンター115%で一律倍率を避ける。先頭18px/雲12pxの局所位置で頭と線を保持。labelは自然フローで約22px下がり、罫線は専用pseudo top48pxで約26px下へ。3画像ともobject-fit:containで切り抜かず、PC・1280・1066・768・390で文字/罫線の非交差を再確認。

## 曲線の測定→修正→独立レビュー

JPEG/原画のぼかし・閾値による輪郭推定は±3〜5px。写真/文字/人物の重なる低信頼点を除外。測定点が合うことを全画素一致と扱わない。

|対象|round30の大きい差|round31〜33での修正|最新測定残差|
|---|---|---|---|
|learning上辺の谷/端|左端+15、谷-16、右端-14px|1440基準の制御点、装飾だけtop-20/height610で負座標と左下延長を保持|8点+1〜+4px|
|learning写真上弧|x120/600/720で+8〜9px|photo枠・比率・object-positionを動かさずmask上弧の局所制御点を変更|7点-3〜+1px|
|営業teamくびれ下部|x方向+33〜39px|初回32で上中部に-13〜-18pxを発見。33でglobal測定点を通る局所pathへ再修正|y2600〜2800の5点-2/-2/-2/0/-2px|
|人事hero左/右|左+113〜123px、右+19〜24px|左右pseudo曲線の制御点を局所補正。文字/写真/線画の位置は保持|左0/-6px、右0/+1/-1px|
|engineerteam下辺|右-11〜-13px|装飾だけ330pxの領域へ、下辺点を延長。section flow高297pxは保持|5点0/+4/+1/-1/-1px|

30測定→31初回修正撮影→32測定で営業/HR右に残差検出→33修正・独立再測定の反復を実施。測定表はdocs/independent-curve-measurement-round-30.md、同round-32.md、docs/independent-review-round-33.md。左y220の約6pxはまだ精密差として残す。人物や文字の位置を動かして輪郭合わせしたものではない。

## 検証・ローカル証拠

固定ソースから全4ページ×1440/1280/1066/768/390 CSS px/DPR1を撮影。font ready・画像decode・スクロール停止後に撮影。全体/各PCsection/同原点side-by-side/50%overlay/differenceをartifacts/qa/round-31〜33/に保存。最終33にsubjects-stable/70部位、responsive/縦バーあり20条件、report.json/文字境界36/操作27/Pages静的12。PC全高はまとめ3557、営業3608、人事3798、engineer3900でround30から不変。

今回ユーザー指示で **新しい比較・撮影画像は公開せずローカルのみ**。PRにはソース・JSONの測定/検証/ハッシュ・レビュー文書だけを保存。画像はlocal-evidence-manifest.jsonに絶対パスとSHA256を記録し、.git/info/excludeで誤追加を防止。以前の公開済みround30画像は上書きしない。Pages配信はdistのみで比較画像を含めない。

検収済みの安全域・390役割ラベル・1280文字組みを退行検査。独立レビューでは今回の具体的P1/P2衝突・新しい人物cropなし。営業PC3アイコンは拡大後も頭/手/雲/破線が可視、ラベルと交差なし。写真ファイルと原線画は完全に未変更。

## 残課題の分離

今回の改行・指定輪郭の大差・UI色・アイコン表示サイズはCSSで対応した。素材待ちを理由に未実施にはしていない。原フォント/weightと原分離線画、未承認の営業work/team写真の画質・構図、承認写真とマスターの顔/人数/背景identityは別の継続課題。原素材を勝手に変更しない。ぼかしを含む背景色・全曲線の厳密一致、HR左約6pxは最終承認保留。判定needs-fixはこれらの同一性/精密差を指し、今回の具体CSS指摘を列挙だけで残したものではない。

スマホは暫定、正式LINEは設定待ち。main・Pages設定・権限・ネットワーク変更なし。最終公開と進捗はdocs/pages-deployment.md、docs/orchestrator-status.md。次のラウンドは34以降。
