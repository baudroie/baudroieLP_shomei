# 人事LP ファーストビュー構図修正

Preview: http://127.0.0.1:4191/approved-four-pages/hr/
Branch: design/hr-hero-composition-20261019

## 対象と変更
src/approved-design.css の追記のみ。すべて .approved-design .hr-hero 配下に限定。
写真・イラスト・ロゴ・文章・タイトルの72px/2行/書体・確定オレンジ・CTA機能とリンク設定は変更なし。他ページと人事FV以外は変更なし。

PCでは文字ブロックの開始を132pxから196pxへ64px下降。transformではなくpaddingと通常フローで配置。
写真・イラストは左右の専用空間へ移動し、文字より背面のz-index:0。中央620pxを確保。
写真は1536×1024の元画像を3:2でcontain表示。旧styles.css由来のclip-path:shapeと、横長300px枠のcoverが見切れの原因。頭・顔・上半身・対話相手・手元を含む全画像を表示。画像加工・生成・差し替えなし。
説明文のみ21px→19pxにして、意図せぬ「まで。」だけの折り返しを解消。コピーは同一。
ファーストビューは約798px→690px。タイトルを下げるための縦方向の引き伸ばしなし。
既存3本の波は色を維持し、PCの左側制御点を上げて写真の足元へ接続。中央コピーの白場・顔・上半身を維持。
スマホは従来の文字→写真→イラストの縦配置。写真を原寸比率・containに統一。

## 検証
- npm run build:approved-preview 成功。TypeScript/Viteビルド成功。
- 実ブラウザ1440×900、390×844の同一範囲前後比較。
- 375/390/430pxの同一オリジンiframeで実表示幅を固定し検証（スクロールバー分を除くclientWidth=353/368/408とscrollWidthが一致）。横はみ出しなし。
- 全3幅でCTA下端479px、写真上端503px。24pxの間隔があり、人物とCTAの重なりなし。
- 写真・イラストの左右端は全幅でコンテンツ領域内。画像比率3:2。
- 相談CTA→設定待ちダイアログ→閉じるを実操作。正式URL未設定は既存状態のまま。
- ブラウザconsole errorなし。
- 独立レビューで写真と波の間の空白をP2として検出→波の左側を上げる修正→再撮影→同じレビュワーが画像を再確認し解消判定。追加P1/P2なし。

## 証拠
artifacts/hr-fv/comparison-1440.jpg / comparison-390.jpg：左before、右after。
artifacts/hr-fv/after-1440.jpg / after-390.jpg：実装。
artifacts/hr-fv/photo-framing.jpg：PC実画面の写真部分の切り出し。
artifacts/hr-fv/verified-375.jpg / verified-390.jpg / verified-430.jpg：実効幅固定検証。
artifacts/hr-fv/metrics.json：計測値。

撮影はCodex In-app Browser。既存ズーム0.7のためviewport overrideを補正して実効CSS幅1440/390を確認。ブラウザ撮影APIの出力右下に余剰白領域が付くため、実際に描画されたCSS範囲を等倍で切り出し、ページ画像の伸縮なし。スマホ3サイズはiframeのCSS幅そのものを375/390/430に固定して再検証。

## 制約
添付画像はLibraryの画像ID/メタデータを確認したが、ローカル転送は失敗。今回の視覚比較は修正対象プレビューを実際に開いて撮影したbeforeを基準とし、ユーザーの構図指示と組み合わせて実施。
正式CTA URL・遷移後の受付内容は未設定・未確認。公開/mainマージ/リモートpushは実施していない。
