# Round 23 — 独立レビューの往復を実施

今回6件（承認トップ画像・研修写真の頭切れ・営業の曲面・スマホ改行・人事線画・エンジニア線画）は再レビューで合格。線画拡大時の副作用2件も再指示しv2で解消。記録: docs/review-loop-round-23.md / docs/independent-review-round-23.md。

原本完全一致: 未完了（写真・線画の元素材、字形・文字組み差）。LINE接続待ちは別管理。

比較証拠はローカルの artifacts/qa/round-23/ に保持（比較画像の公開は自動承認レビューで停止、GitHub未アップロード）。主対象の390px・1066px・1280pxとPC4ページ1440pxで実ブラウザを確認。配信用ビルドのbaseパス・画像読込・職種遷移を確認。

# 最新: Round 22

画像差し替え・出典整理・曲線修正済み。20条件の表示検査成功。詳細: docs/round22-review.md。最終完全再現判定はneeds-fix（営業写真・素材差・LINE待ち）。

# Round 21 — 閲覧用Pages修正反映

URL: https://baudroie.github.io/baudroieLP_shomei/

配信元・撮影ソース: `8290d27c7033be728aef1a8febcd18122e459500`
公開コミット: `82cea63dcf27debeebc801f99fb4e630794db015`
GitHubデプロイ: completed / success
https://github.com/baudroie/baudroieLP_shomei/actions/runs/38859519238
CSS: index-B6WLWNlQ.css、JS: index-BAgdPVBr.js。

既存gh-pagesを54d0d7cから通常push。mainマージ、設定・権限・ネットワーク変更なし。sourceとQAを同一ソースで保存。distだけを公開、4ページの直アクセス・画像・フォント・project base・リンクを12条件で静的実ブラウザ検証。証拠 artifacts/qa/pages/round21-release/。Git pushは.gitなしURLで認証に失敗し、既存origin同一の.git付きURLで正常保存した。秘密値の読出し・認証変更なし。

クラウドから公開URLはCONNECT proxy 403のため実見不可。依頼元が公開画面を実見する。写真画質・マスター同一性の最終検収は未完了。

## 今回の修正と証拠

人事390×844 hero: 残留50%幅を取り除き、写真全幅・線画中央へ。3024×2268の同一写真を保持。HR支援は写真の頭頂と原写真内の手を保つ暫定比率・位置へ。まとめhero写真の手、engineer hero線画両端と注記の余白も修正。HR value見出しと行間を調整。

全4ページ1440/390/768/1066/1280の20条件を目視再確認、clientWidthベース横溢れゼロ。標準12、操作27、文字境界36、写真crop10、Pages12条件成功。画像・フォント読込とスクロール停止後に撮影。

|ページ|最新PC比較|全5幅|スマホhero|
|---|---|---|
|まとめ|artifacts/qa/round-21/overview-side-by-side.jpg|round-21/responsive/overview-*|round-21/photo-crops/overview-hero-390x844.png|
|営業|artifacts/qa/round-21/sales-side-by-side.jpg|round-21/responsive/sales-*|round-21/photo-crops/sales-hero-390x844.png|
|人事|artifacts/qa/round-21/hr-side-by-side.jpg|round-21/responsive/hr-*|round-21/photo-crops/hr-hero-390x844.png|
|エンジニア|artifacts/qa/round-21/engineer-side-by-side.jpg|round-21/responsive/engineer-*|round-21/photo-crops/engineer-hero-390x844.png|

上表の短縮パスはすべてartifacts/qa/配下。overlay/difference/全体/セクションも同round。修正前round18と後round21の全体比較before-after/、部位比較before-after-focused/。HR支援1066・1363を含む6幅はphoto-crops/。独立補助レビュー docs/independent-review-round-21.md。

PR最新具体レビュー6208972859を各QA開始/終了で確認し、頭切れとHR value位置へ対応。round21終了時まで新規コメントなし。継続監視は依頼元の既存GitHub監視とPR節目確認で行い、このセッションで常駐24時間監視を新設したとは扱わない。

## 残課題と次作業

needs-fix継続。写真選定の優先3箇所は営業work/team・人事support。office_lounge.jpg 750×500の画質不足、営業teamのコピーと人物構図、営業workのcontain余白、HR支援の900px暫定幅とマスター幅との差を残す。その他の任意画質候補と区別し docs/photo-replacement-pending.md へ記録。画像・線画差替え/生成/アップスケールなし。

マスターとの写真・線画・書体の同一性差、暫定スマホ構成、LINE正式URL未提供は未解決。依頼元の公開実見と写真候補・構図の承認後、選定済素材だけを反映し、新規round22以降で撮影比較を続ける。修正可能な新規CSS指摘があれば同PRで対応。mainへマージしない。

