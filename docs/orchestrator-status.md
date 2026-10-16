# オーケストレーター向け実装進捗

更新UTC: 2026-10-16T03:47:49.361270+00:00

- Draft PR: https://github.com/baudroie/baudroieLP_shomei/pull/1
- 作業ブランチ: `feat/four-role-landing-pages`
- 資料基準コミット: `d23ee75f9ef23b049f73fa375705ed606ce5b594`
- 最新撮影ソースコミット: `0ab11772598287adbb072f45f39e90b3eef2ff76`
- 描画ソースSHA256: `ec30b48fa44aa2db93d03bb2128a27cc06b40f3f9d21f0db7a4a59a5f88b7204`
- public素材/フォント一式SHA256: `f669420d5272fa85368efa98286b3b974e8f0f63ac54ca9e812028de2eb8fddc`。全36ファイルの個別SHA256は最新report.jsonのassets。
- 最新完了: **round 11**。撮影後の描画ソース・素材・フォント変更なしを照合済み。後続の証拠/文書コミットは撮影版とは区別。
- 判定: **needs-fix / final result: blocked**。4ページ実装・機能検査は完了。写真/線画/原フォント同一性の最終検収は未達。

## 最新証拠

親ディレクトリ `artifacts/qa/round-11/`。各ページの1440/390/768px全体、1440px各section、横並び、50%overlay、difference、同じglobal yのfocusを保存。基準4マスターを実見し、全体と重点部を反復比較。画像の縦横倍率を変えたり、セクションごとに位置をずらしていない。高さ一致は視覚合格を意味しない。

|ページ/ルート|マスター等比換算高|実装高|最新比較|
|---|---:|---:|---|
|まとめ `/`|3557|3557|`artifacts/qa/round-11/overview-side-by-side.jpg`|
|営業 `/sales/`|3601|3603|`artifacts/qa/round-11/sales-side-by-side.jpg`|
|人事 `/hr/`|3798|3798|`artifacts/qa/round-11/hr-side-by-side.jpg`|
|エンジニア `/engineer/`|3900|3900|`artifacts/qa/round-11/engineer-side-by-side.jpg`|

全ページの同名 `-overlay.jpg` / `-difference.png` / `-focus-N.jpg` / `-section-N.png` / `-390.png` / `-768.png` も最新証拠。過去ラウンドは上書き禁止（スクリプトガードとevidence-protection-reportあり）。

## 検証

- Node/npm、Python/Pillow/Playwright、Chromiumが利用可能。React・TypeScript・Vite実装。型チェック+本番ビルド成功。lockfileのnpm ci --offlineも確認済み。
- Chromium 154.0.8037.57、DPR1、1440/390/768 CSS px。document.fonts.readyと全img.decode待機。全12画面条件failures=[]。
- 実クリック職種遷移/戻り/ナビanchor、LINE待機Enter/Tab/Escape・フォーカス復帰、横溢れ、スマホ44px操作領域等の9シナリオ成功。
- 人事PC「入社前も、その先も。」1行、成長パネル収まり、図/ラベル独立領域、営業狭幅の見出し別行を確認。
- 最新概要 `artifacts/qa/latest-verification.json`、詳細 `functional-report.json`。参考資料reference/とoriginal-assets/は無変更、マスターSHA一致。

## プレビューと接続

共有プレビューURLは未発行。クラウド内部確認のみ `http://127.0.0.1:4173/`（利用者PCのlocalhostではない）。`npm run dev` のデフォルトも127.0.0.1限定。host上書きなしの起動・listen・HTTP200検証は `artifacts/qa/default-startup-report.json`。

0.0.0.0起動は、自動承認レビューが非公開ソース/素材の露出リスクとして拒否したため採用していない。ループバックによる代替で制作・検査を完了。ネットワークは必要な個別ドメイン（api.github.com / www.baudroie.jp / media.baudroie.jp）を所定レビューで追加。全許可にしていない。mainマージ・本番公開なし。

## レビュー対応

依頼元コメント6207055226: デフォルト127.0.0.1、撮影版/文書整合、P1修正前後証拠を反映。`artifacts/qa/resolved-findings/` はround2→6を同一座標で保存。

依頼元 https://github.com/baudroie/baudroieLP_shomei/pull/1#issuecomment-6207313122 に対応:

1. 最新ソース固定で全4ページ/各section/global focus/overlay/differenceと390/768を再撮影。撮影コミット・source SHA・全素材/フォントSHAをreportに明記。
2. 支援写真幅/位置を補正。既製アイコンを個別黒主線+橙アクセントPNGへ置換し、薄線と営業の雲の破線欠落も補正。最新overview-focus-2/3/4、sales-focus-5参照。
3. 営業濃色の書体サイズ/基線、人事価値見出し/対話線画、エンジニア育成枠を補正し再撮影。最新sales-focus-3、hr-focus-2/4、engineer-focus-4参照。
4. README、design-qa.md、本書、PR本文を最新ラウンドへ同期。高さ一致や機械検査を完全一致/最終検収として扱わない。

各QA開始/終了のPRコメント・レビュー・行コメントはround-N/reviews-start/end.json。補助独立レビューはdocs/independent-review-round-{2,3,4,6,8,9,10,11}.md。旧P1の再発なし、round8薄線/破線、round9学習列/狭幅見出しを反映。依頼元の最終承認とは区別する。依頼元の1時間監視設定の申告は受領したが、本環境が常時監視を運用しているとは主張しない。

## 未解決と次作業

- **写真/線画の同一性**: 公式元写真を優先する資料指示を守るため、生成マスターと人数/構図が異なる。線画は個別再生成で近似し、顔/姿勢/細部/線質は同一原画ではない。完全再現にはマスターで使った文字なし分離写真・線画が必要。資料から人物を切り抜き実在社員と偽る置換はしていない。
- **原フォント**: 元書体情報なし。ライセンス付きNoto Sans/Serif JPを同梱し表示固定したが字形/字間/ウェイトの厳密一致は未達。元フォント名/ウェイトまたは分離デザイン仕様が必要。
- **LINE**: 正式URL未提供。src/config.tsでnull管理、「LINEリンクは設定待ちです」を明示。URL受領後の実遷移確認が次作業。
- **コピー時点情報**: 未確認の公開買付け日付の断定は避け、docs/content-corrections.mdに補正理由を記録。
- **スマホ**: 390/768pxは暫定レスポンシブ。スマホ専用マスターの承認とは区別。
- 次は依頼元の最新証拠に対する具体指示を反映。完全同一素材/フォントが入手できたら差し替えて再比較。現時点で視覚合格とはせずDraft/needs-fixを維持。

## 再開手順

`npm run dev`、`npm run build`。次の未使用ラウンドは `python3 scripts/visual_qa.py --round 12`、操作検査 `python3 scripts/functional_qa.py`。環境install_script/start_skillは実装後の再開手順へ保存済み。
