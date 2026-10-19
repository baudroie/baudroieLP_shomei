# 2026-10-19 最終CTAの即時可読性・サービス領域の改行

## 対象と変更
- 開始ソース: GitHub design/approved-four-pages-20261019 b7152389f1c744155266b8eee475a2b259107118。ローカル24d074dとtree a16afc88002bfa9fd814f37d73e9feda8645cf90が一致。開始公開版: 31dc8cd / gh-pages 0f2a48f。
- 専用作業ブランチ fix/final-cta-readable-20261019。他の作業ファイルは変更せず。
- src/main.tsx: まとめ・営業・人事・エンジニアの最終案内h2からdata-motion-headingを削除。WAAPI監視・実行対象から除外。親要素も対象外。改行span・完成色は保持。
- まとめのネットワーク本文を「柔軟につながる仕組みを」「設計し、」のspanへ分割。クラウド見出しを意味単位で保護。375pxでは右列の右余白のみ調整し、ソリューションを分断しない。既存ネットワーク見出しの意味区切りは維持。
- src/engineer-icons.cssのみ局所追加。行内の見出し・本文開始位置をsubgridで整列。本文サイズはPC22px/スマホ16pxで不変。全文nowrapや固定高は使用せず。
- 通常アニメーション、アンカー処理、写真・図・キャリア接続線・色・CTA文言・エルメURL・固定ヘッダーは変更なし。

## 実検証
- Chrome/macOS、DPR1、1440×1000/390×1000。改行は375/430×1000でも確認。
- 最終見出し・子孫・祖先をプレビュー専用の観測スクリプトでrequestAnimationFrame毎に計測。初可視フレームから全8条件minOpacity=1、対象のWAAPI=0。通常見出しのWAAPIは継続して観測。監視スクリプトはDOM内のJSON記録以外を変更しない。公開distには入れない。
- スクリーンショットのarrivalは到達後最初に取得できた画面。描画の0msそのものの撮影ではない。初回描画の根拠は上記フレーム記録。settledと同じ幅・最終位置で比較する。
- 全4ページ×2幅: 固定ヘッダーtop=0、横溢れなし、画像欠落なし、各ページのLINE URLを保持。文字・CTAの重なりなし。最終CTA見出し・祖先opacity=1。
- 375/390/430/1440: サービス欄の意味単位改行、同じ行の本文上端一致、横溢れなし。字を小さくして解決していない。
- reduced-motionをOSの「視差効果を減らす」で実際にonにし、ブラウザーmatchMediaがtrue/scroll-behavior:autoであることを確認。全4ページ×2幅で見出し・写真・キャリア図と子孫opacity=1、横溢れなし。検証後offへ復旧しmatchMedia=falseを確認。
- #beginner/#experienced: 別ページから直接開く、再読み込み、入口クリックをPC/スマホで実施。画像・フォント読込後および停止後に正式記録。PCは両方134.20px（ヘッダー102px）、390pxは127.77/128.16px（ヘッダー96px）。対象がヘッダーに隠れない。
- 約615pxで停止する症状は通常読み込みでは再現なし。遷移途中の位置は判定に使わない。アンカーの推測修正なし、固定時間の補正や強制再スクロール追加なし。

## 未確認・制約
- 接続ブラウザーの操作APIにはネットワーク帯域/遅延制御がなく、低速画像・低速フォント読込は未検証。通常読込結果からその条件まで正常と断定しない。
- Safari/Firefox、iOS/Android実機は未検証。
- LINE友だち追加・フォーム送信・メッセージ送信は実施しない。

## 正式証拠
artifacts/qa/final-cta-20261019/ 以下の final-motion-summary.json、motion-*.json、cta-regression.json、wrapping.json、anchors-final.jsonl、reduced.json。初期途中計測のanchors.json/anchors-settled.jsonは判定に使わず。
ユーザー向け比較HTMLに4ページ×2幅の到達後/完了後と、サービス欄PC/スマホ変更前後を収録。
