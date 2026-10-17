# Round 23 — 独立レビューの往復を実施

今回6件（承認トップ画像・研修写真の頭切れ・営業の曲面・スマホ改行・人事線画・エンジニア線画）は再レビューで合格。線画拡大時の副作用2件も再指示しv2で解消。記録: docs/review-loop-round-23.md / docs/independent-review-round-23.md。

原本完全一致: 未完了（写真・線画の元素材、字形・文字組み差）。LINE接続待ちは別管理。

比較証拠はローカルの artifacts/qa/round-23/ に保持（比較画像の公開は自動承認レビューで停止、GitHub未アップロード）。主対象の390px・1066px・1280pxとPC4ページ1440pxで実ブラウザを確認。配信用ビルドのbaseパス・画像読込・職種遷移を確認。

final result: blocked
理由: 原本の写真・線画・書体の完全同一性が未解決。今回6件の修正検収はpassed。完全再現済みとはしない。

# 最新: Round 22

画像差し替え・出典整理・曲線修正済み。20条件の表示検査成功。詳細: docs/round22-review.md。最終完全再現判定はneeds-fix（営業写真・素材差・LINE待ち）。

# Round 21 デザインQA — needs-fix継続

配信・撮影ソース `8290d27c7033be728aef1a8febcd18122e459500`。基準資料 d23ee75f9ef23b049f73fa375705ed606ce5b594、承認済みreferenceマスター4枚は変更なし。src SHA256 `f98ebbff8a15016331e136c2ca1ce291df6f99e52b2e17eb00c370e490082d5f`。

人事390px heroの50%幅が残るカスケードを修正。写真を全幅4:3、線画を中央配置し、高解像度の同一原写真を保持。HR支援写真は900px上限・12:5、object-position 50% 45%、小幅3:2で頭頂と原写真内の手を保つ。元画像外の身体は復元できない。PCマスターの広い写真枠との差は暫定対応として残る。

まとめスマホheroは写真の自然比率で右人物の手を保持。engineer hero線画は3:1の全景表示、写真と注記を自然な高さにし、線画まで16pxの間隔を390/768/1066で実測。HR valueはPC見出しを16px上げ、本文行間を44.5pxへ調整。既存の写真・線画ファイル36点は変更なし、差替え・生成・アップスケールなし。

検証: 全4ページ×1440/390/768/1066/1280=20条件のclientWidth横溢れ検査、標準撮影12条件、操作27条件、文字境界36条件、写真crop10条件、Pages静的12条件すべて成功。画像decode・font ready・スクロール停止後撮影。390heroは844px高さ、他の追加検証は800px。初回round21は開発サーバー停止で中断し、再起動後同じソースで全検査を完走。

証拠: artifacts/qa/round-21/ に各ページ1440/390/768、side-by-side・overlay・difference、セクション撮影。responsive/に全4×5幅。photo-crops/に390hero4枚とHR支援6幅。before-after/はround18→21の全体20比較でグローバル原点・実寸を維持、before-after-focused/は部位比較。DPR2写真証拠・layout-bounds-report.json・hero-spacing-report.jsonも保存。PC全高 {'overview': 3577, 'sales': 3608, 'hr': 3806, 'engineer': 3900}。

round19でheroの見切れ、round20でengineer注記衝突を目視発見して修正、round21を再撮影。独立補助レビュー docs/independent-review-round-21.md では新規の具体的P1/P2なし。最終承認ではない。PRコメントを各ラウンドで確認、最新6208972859の頭切れ・HR value位置指摘に対応。

残課題: 写真選定の優先3箇所（営業work/team・人事support）の画質・構図。office_lounge.jpg 750×500のぼけはCSSでは解決しない。原マスターとの写真・線画・書体の同一性差、暫定スマホ構成。営業teamのコピーと人物の構図差、営業workのcontain余白、HR支援の写真幅差は承認待ち。LINE正式URL未提供で設定待ち表示を維持。マスター再現完了・最終検収済みとはしない。

