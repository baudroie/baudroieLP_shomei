# 人事FV 最終調整

比較対象: 3e357b9。写真の形状・トリミングの基準: artifacts/hr-fv-finish/before-1440.jpg（波重ね前）。
プレビュー: http://127.0.0.1:4191/approved-four-pages/hr/

## 変更範囲
- PCの写真要素のみleft24px→0。女性の顔と上半身を左側へ移動し、背景の波がその背後から右へ続く配置。
- 写真z-indexを2に戻し、波による写真下端の被覆を解除。元画像3:2、contain、矩形、サイズ、上端は維持。拡大・反転・追加トリミングなし。
- スマホの説明文を意味単位の3つのspanへ分割。767px以下のみblock/nowrap、PCは従来の2行。文言・17pxのスマホ文字サイズは変更なし。
- タイトル/CTA/右イラスト/色/薄くした下部帯/セクション高さは維持。人事FV以外は変更なし。

## 確認
- 実ブラウザviewport 1440×900、375/390/430×1000、DPR1で確認。
- PCで写真全体と女性の顔・両手・対話相手が見える。中央の文字/CTA、右イラストの配置を維持。
- モバイル3幅で説明文が指定の意味単位3行、入社前後の分断なし。写真とCTAの間隔24px。画像は全体表示。
- 各幅scrollWidth=clientWidth。検証ブラウザの縦スクロールバーは15pxのためclientWidthはviewportより15px小さい。スクリーンショットはブラウザの返却サイズのまま保存し、寸法を加工していない。
- TypeScript/Viteビルド成功、ブラウザconsole errorなし。
- 独立レビュー担当がソース差分・PC/375/390/430画像・計測値を確認し、対象範囲のP1/P2なし。実装担当も画像を確認済み。

## 提出画像
- artifacts/hr-final/final-1440.jpg: PCファーストビュー
- artifacts/hr-final/photo-detail.jpg: 写真周辺（ブラウザの矩形撮影）
- artifacts/hr-final/final-pc-full.jpg: PCページ全体
- artifacts/hr-final/final-390.jpg: スマホファーストビュー
- artifacts/hr-final/final-mobile-full.jpg: スマホページ全体
- artifacts/hr-final/final-375.jpg / final-430.jpg: 追加幅検証
- artifacts/hr-final/pc-metrics.json / mobile-metrics.json: DOM計測

公開・mainマージ・pushなし。正式CTA URLは既存の未設定状態を維持。
final result: passed
