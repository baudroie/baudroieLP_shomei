# 人事FV 仕上げ確認（2026-10-19）

基準コミット: 60c36ea。プレビュー: http://127.0.0.1:4191/approved-four-pages/hr/

## 変更
- src/approved-design.css のPC人事FV内のみ変更。文言・素材・ブランド色・既存リンク設定は変更なし。
- 既存波を写真より前面へ。写真上端342px、幅370px、高さ246.664pxは不変。写真下端の約12〜23pxへ波のアイボリーがかかる構図に調整。顔・頭・手元・対話相手は保持。containと元画像3:2を保持し、透明化・ぼかし・楕円加工なし。
- 文字とイラストは波より前面。人物内部の白塗りと不透過性を保持し、イラストの足元に同じ波が続く。
- 最下部アプリコット帯の下面を上げ、1440px中央の色領域を実画面で72px→58px（約19%減）。途中20px短縮を試した後、厚みを再計測して最終14px短縮へ調整。
- セクション690px→676px。波用領域の500pxを固定して上側の波・中央文字の位置を維持し、下側余白を増やさない。

## 実画面検証
Codex In-app Browser、DPR1、1440×900と390×1000の前後同寸比較。
文字ブロック (x410,y196,w620,h422.3125)、CTA (x540,y547.265625,w360,h71.046875)、写真 (x24,y342,w370,h246.664)、イラスト (x1046,y342,w370,h246.664) の前後矩形は一致。
375/390/430pxで clientWidth=scrollWidth。写真/イラストは両方ロード済み、contain、clipなし。CTA下端479.945→写真上端503.945で24pxの間隔。横スクロール・CTA/写真の重なり・画像枠による人物の切れなし。
ビルド成功、console errorなし。スマホCSS・CTAロジックには変更なし。

## 証拠
artifacts/hr-fv-finish/comparison-1440.jpg
artifacts/hr-fv-finish/comparison-390.jpg
artifacts/hr-fv-finish/photo-detail-comparison.jpg
artifacts/hr-fv-finish/before-metrics.json / after-metrics.json / mobile-metrics.json
artifacts/hr-fv-finish/verified-375.jpg / verified-390.jpg / verified-430.jpg

公開・mainマージ・pushなし。正式CTA URLは従来どおり未設定。

独立レビュー：PC比較・390px比較・写真部分拡大の3枚を実見し、顔/手元/相手、帯の面積、固定配置、イラストの白塗りを再確認。P1/P2指摘なし。
