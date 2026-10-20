# 人事FV 左写真・曲線復元レビュー

final result: passed

参照: approved-reference/hr-mask-original.png (2048×1133、元スクリーンショット下端で写真が途中まで)。既存 styles.css の shape() を数値も含めそのまま復元。元参照の全高は欠けているため、比較画像には欠けている範囲を補完せず注記した。

## 変更
- src/main.tsx: 写真の外枠を分離。
- src/approved-design.css: 元の曲線を外枠へ適用。内側写真は縦横均等115.384615%、left -15.384615%、top -7.6923075%。枠内に空白を出さず、女性の顔中心を約37%へ配置。
- 写真枠全体の位置・サイズは修正前と同一。人物の左右反転・変形、素材変更なし。
- この最新指示では曲線内の位置を優先し、内側だけ約15%の均等拡大を使用。女性の頭・上半身・両手を切り落とさないことを実画面で確認した。

## 比較・検証
Chromeの実画面、PC1440×900、スマホ375/390/430×1000、画像ピクセル寸法は各CSS viewportと一致。
- 顔中心約37%、頭・顔・上半身・手元が曲線内。枠内の空白なし。
- 文字ブロック: x410 y196 w620 h422.3125、写真枠 x0 y342 w370 h246.6641、右イラスト x1046 y342 w370 h246.6641。修正前後で一致。
- 3つのスマホ幅で scrollWidth=innerWidth、画像欠落0、CTAから写真まで24px。
- 説明文の3行と「入社前後」のまとまりを保持。
- CTAの設定待ちダイアログ、閉じる、フォーカス復帰を確認。console error 0。
- npm run build:approved-preview 成功。4191のプレビューへ反映。
- 接続タイムアウトは新規検証タブで復旧。未完了状態は解消。

## 見た目の確認
文字/書体: 変更なし。余白/構図: 左写真以外の座標一致。色: 確定オレンジと波を変更なし。画像: 元素材・元形状を維持し女性の位置のみ調整。文章: 変更なし。

## 証拠
artifacts/hr-mask/three-way-comparison.jpg
artifacts/hr-mask/pc-comparison.jpg
artifacts/hr-mask/photo-detail.jpg
artifacts/hr-mask/final-1440.jpg
artifacts/hr-mask/final-390.jpg
artifacts/hr-mask/final-pc-full.jpg
artifacts/hr-mask/metrics.json

独立レビュー hr_mask_review: PC・375/390/430px確認、P1/P2なし。
残確認: CTA正式URL未設定。公開・mainマージなし。
