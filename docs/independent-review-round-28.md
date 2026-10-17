# 独立補助レビュー round 28

判定: **needs-fix**。HR後続28px退行は解消。狭幅の具体的CSS P2を2件確認し、実装担当へ即時報告した。素材同一性と輪郭精度も保留。

固定版 `265654e080b92719cf9b05d3818d5c634ab17a45`。
source_sha256 `5ec9f367aa16bbea47fe6256433e135f168c3546f1218031579a802a61ef32e5`。
asset_tree_sha256 `0db0948325acac42acee025fd9c2c693e7ca9d11822cf61fa893df86f44bd524`。
資料基準 `d23ee75f9ef23b049f73fa375705ed606ce5b594`。

## 実見範囲

全4ページ1440 side-by-side、subjects-stable内HR support・sales team・engineer team・overview learningの390/768/1066/1280/1440、計20部位を実見。sales390についてはfull-pageの該当global-yを原寸cropして、部位crop外にある文字も再確認した。全ページ全幅の全ピクセルを原寸確認したとの主張ではない。CSS・アプリ・素材変更なし。

## 修正可能P2

1. **sales390: teamラベルが次sectionへ落ちる**。`sales-390.png` の「営業 × エンジニア」がteam淡色背景の外へ出て、次の「成長のサポート」eyebrowに接近/重なる。subjects-stableのteam部位にこの文字が見えなかったためfull-page原寸で確認した。単なるcrop証拠の不足ではなく実表示でもsection外。strongを含む通常フローにし、390のteam-caption/sectionが全内容の高さを確保するよう修正する。既存写真の人物構図や解像度とは別問題。
2. **engineer390: ラベル語尾の孤立**。`subjects-stable/engineer-390-engineer-team.png` 左ラベル「先輩に相談する。」が「先輩に相談す／る。」となる。狭幅限定で文字サイズ・列余白を調整し「る。」だけの行を避ける。本文や人物絵を動かす必要はない。

## 改善・追加CSSの確認

HR支援写真の手保持を維持しつつ、後続value/team/CTAはround26の約28px下方退行から戻った。PC全高3798px。今回の補正解消を総高だけでなく最新side-by-sideの後続位置でも確認した。

HR planningはPC比較で人物絵が大きくなり、本文への明白な侵入なし。sales1280は写真全幅と曲線captionが保たれ、PC本文の交差なし。engineer teamは1440で二重scaleによる巨大化・見出し交差なし。learningの14pxラベルも写真・本文と独立。追加CSSのこれらの対象に新規大規模P1は見つからない。

## 精密再現と承認保留

learning写真mask上辺や背景/CTA波形の山谷位置・振幅はなおmasterの近似であり、CSS/SVG調整可能な輪郭差として残る。原フォント/weight・原線画/アイコン・写真の顔/人数/背景identity・sales旧office写真品質/構図は別課題。承認相談写真を適用した箇所と未承認差替え候補を混同しない。新規生成や素材差替えは行っていない。

スマホは暫定。LINE正式URLとオーケストレーター実見承認も別項目。round25の「新規衝突なし」を本ラウンドへ転記せず、上記2件の修正証拠を次ラウンドで確認する。
