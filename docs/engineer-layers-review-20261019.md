# 2026-10-19 エンジニア写真レイヤー修正・人事原稿の確認

開始点: feac85d614d416322882ab205980ae0b1e335d62（design/approved-four-pages-20261019）。公開のユーザー承認に基づき既存gh-pagesへ反映する。mainは変更しない。

## 原因と限定修正

元写真engineer-network.pngは非透過PNGで、線の焼込みなし。公開Chromeの安定後はimg opacity=1、mix-blend-mode=normal、maskなし。セクションisolation:isolate / motif z-index:-1 / hero-top z-index:1は既に正しい。一方、useApprovedMotionのopaque対象から当該写真が漏れ、登場時にopacity 0→1になっていた。実際の初回表示でbefore opacity=0.0533264を記録し、腕・機器上に線が透けるフレームを撮影。

当該写真だけopacity 1→1へ変更。移動量・時間・他要素の演出とreduced-motion取消処理は不変。figureをposition:relative / isolation:isolate / 白背景の不透明面にし、imgはnormal blend。z-indexの数値は増やさない。写真・SVG・オレンジ・サイズ・トリミング・本文・CTA設定は変更なし。

## 検証

- npm run build:pages成功。
- Chrome 1440/375/390/430px、高さ1000、scrollY=0でbefore/after撮影。写真の矩形は全幅で全項目一致。写真内線なし、外側線あり、写真欠け・CTA重なり・横溢れなし。
- 初回表示390px before/afterフレーム: after opacity=1。双方同幅・同スクロール位置（モーション中の時刻は完全同期ではない）。安定後比較も4幅を保存。
- 全4ページ×4幅で横溢れなし、フッター位置までヘッダーtop=0。リンクhrefの4種類uLand（DEUpQ8/nRXMPl/XJFhyu/WxzOIt）不変。フッター会社リンクとプライバシーリンクのnowrapを確認。最終CTA「こちらから。」維持。
- 390pxの未経験アンカー移動・Tabフォーカス可視を実確認。LINE/フォーム/メッセージ送信は実施せず。
- reduced-motionの処理はコード上不変。この回ではOS設定切替の実操作は再実施していない。
- 独立担当が差分2ファイル、冒頭8枚、フッター16枚を実見。最初のフッター画像の演出途中を指摘、全16枚をスクロールと最終sectionの可視要素opacity=1を待って再撮影。
- 計測: artifacts/qa/engineer-layers-20261019/{before,after,entry,regression,footer-verified}.json。regression.jsonのbottomはスクロール途中の観測、完了判定はfooter-verified.jsonを使用。
- スクリーンショットは同ディレクトリのbefore/after-{width}.png、before/after-entry-390.png、footer-{page}-{width}.png（依頼元の比較HTMLへ収録、公開サイトには含めない）。

## 人事の事実確認（デザイン承認と分離）

資料: handoff_20261015/BAUDROIE_CODEX_IMPLEMENTATION_PROMPT.txt、docs/IMPLEMENTATION_BRIEF.mdは人事を「ユーザーが想定で作ることを了承した企画案」としている。design-input/00_IMPLEMENTATION_PROMPT.mdは背景・構図の承認であり、業務の事実承認ではない。

公式記事 https://media.baudroie.jp/news/archives/39 （2026-05-08公開、2026-10-19確認）から、選考時の候補者との対話、入社前のCCNA学習における先輩紹介、入社後・配属後の相談・定期フォローは確認できた。人事・営業・先輩の支援は既存ユーザー提供要件にも記載。ただし以下の文は具体的担当範囲・運用の根拠不足。

| 確認が必要な原文 | 確認点 |
|---|---|
| 「採用の企画、入社前後のフォローまで。」の『採用の企画』／「会社の魅力の伝え方や、候補者との接点を考える。」 | 今回募集する人事が採用広報・接点企画を担当するか |
| 「日々の採用活動をチームで振り返り、よりよい出会いにつなげます。」 | 定例のチーム振返り・改善活動が実際に行われているか |
| 「現場の声と候補者の想いをつなぎ、どんな出会いや支援が必要かを考えていきます。」／「候補者との対話も、採用活動の工夫も。社内の仲間と情報を共有し、相談しながら進めていきます。」 | 現場の声を採用企画へつなぐ担当範囲と、社内共有・相談の実際の運用 |

本文全体の事実確認には至らず、人事本文・「業務内容は想定を含みます。詳細はお問い合わせください。」は変更しない。新たな注意書きや画像説明は設けない。
