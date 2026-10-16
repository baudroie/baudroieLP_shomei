# オーケストレーター向け実装進捗

更新: 2026-10-16 12:15 JST。再現用のUTC実施時刻は各report.jsonに記録。

- PR: https://github.com/baudroie/baudroieLP_shomei/pull/1 （Draft）
- 作業ブランチ: `feat/four-role-landing-pages`
- 資料基準: `d23ee75f9ef23b049f73fa375705ed606ce5b594`
- 最新描画ソースのコミット: `3df59a5f8a16bf5a7e1637632b427372df25bcd9`
- 撮影ソースSHA256: `a367ac2e7d77ecfb27d4439a197454e749b68799038498423f7c68da18b35b8a`
- 最新完了ラウンド: **round 6**。撮影後のアプリ描画ソース変更なし。後続コミットは証拠・文書の保存用。別版の画像を最新実装の証拠として扱わない。
- 判定: **needs-fix / 完全再現・最終検収未達**。主要機能と狭幅検査は成功。写真・線画・原フォントの同一性には残差分あり。

## 最新検証

- TypeScript型チェック + Vite本番ビルド成功。
- 実アプリのlockfileで `npm ci --offline` を再実行しビルド成功。
- Chromium 154.0.8037.57、1440/390/768 CSS px、DPR1。画像decode・document.fonts.ready完了後に4ページを撮影、12画面条件failures=[]。
- `scripts/functional_qa.py`：9通りの実クリック職種遷移、戻り、ページ内ナビ、Enter/Tab/Escape・フォーカス復帰、スマホ44px操作領域、人事PC支援見出し1行、成長パネルの収まり、図/ラベル非重なりのシナリオ成功。
- デフォルト `npm run dev -- --port 4181 --strictPort` （host上書きなし）を起動し、127.0.0.1のみのlisten + HTTP 200を確認。`artifacts/qa/default-startup-report.json`。
- `reference/` と `original-assets/` の追跡変更なし。4マスターSHA256一致。

|ページ|マスター等比換算高|実装高|最新の全体比較|
|---|---:|---:|---|
|overview|3557px|3557px|`artifacts/qa/round-6/overview-side-by-side.jpg`|
|sales|3601px|3603px|`artifacts/qa/round-6/sales-side-by-side.jpg`|
|hr|3798px|3798px|`artifacts/qa/round-6/hr-side-by-side.jpg`|
|engineer|3900px|3900px|`artifacts/qa/round-6/engineer-side-by-side.jpg`|

高さ一致を視覚合格の根拠にしない。全体・各セクション・同じページy座標のfocus比較を実見。縦伸縮やセクション別の位置合わせはしていない。

## 各ページとプレビュー

クラウド内部で `127.0.0.1:4173` のViteを起動中。内部確認対象パスは `/`、`/sales/`、`/hr/`、`/engineer/`。共有プレビューURLは未発行。利用者のPCからlocalhostで閲覧できるとは案内しない。

0.0.0.0待ち受けは自動承認レビューが非公開ソース/素材露出リスクとして拒否。ループバックを維持し、`vite.config.ts` のデフォルトも127.0.0.1へ修正済み。権限・ネットワーク制限は緩和していない。本番公開・mainマージは未実施。

## レビュー指示と反映

オーケストレーターコメント: https://github.com/baudroie/baudroieLP_shomei/pull/1#issuecomment-6207055226

1. デフォルト待ち受け修正：対応済み。上記実起動検証あり。
2. 最新ラウンド・撮影コミット・ハッシュ・文書/PR本文整合：本書、design-qa.md、PR本文をround 6基準へ更新。
3. P1四件の修正前後：`artifacts/qa/resolved-findings/` にround 2とround 6を同じページ座標で並べて保存。人事ヒーロー、サービス/成長パネル、エンジニア図/ラベル。対応manifest.json参照。

各ラウンドのPRコメント・レビュー・行コメントは `artifacts/qa/round-N/reviews-start.json` / `reviews-end.json` に保存。最初のPR作成前はAPI接続を切り分け、限定した必要ドメイン追加後に復旧。レビュー受信時刻より前の「空」と、その後の指示受信を区別。

独立レビューは `docs/independent-review-round-2.md`、`round-3.md`、`round-4.md` に保存。round 3で初期P1四件の解消を確認。round 4以降はP2位置・画像サイズ等を実測補正。round 6の補助的な別エージェントレビューは `docs/independent-review-round-6.md` に保存。大きな配置不良の再発は指摘されず、素材同一性の差によるneeds-fixを維持。依頼元レビュワーの最終検収とは区別する。監視設定の存在は依頼元コメントの申告として記録し、本チャットが1時間ごとの常時監視を運用しているとは主張しない。

## 残差分・必要物・次作業

- 公式写真は必須の元写真を保持。歓迎・対話・チームの人数/構図が生成マスターと異なる。個人を切り抜いて生成写真へ置き換えたり、実社員と称していない。
- 分離線画・写真・原フォントは提供されていない。個別Image Gen素材とNoto書体で近似したが、線幅・顔・細部・画像の輪郭・字形の同一性は未達。完全一致には承認マスターに使用した文字なし分離素材とフォント情報が必要。
- LINE職種別正式URLは未提供。`src/config.ts` でnull管理、待機ダイアログを実装。設定後に実遷移確認が必要。
- スマホは暫定レスポンシブ。独自スマホデザインの承認済みとはしない。
- 次作業：依頼元のround 6証拠確認と具体的な修正指示を反映。素材同一性は元レイヤー/分離素材で差し替えて再比較。公開買付け時点情報は最新一次情報の確認待ちで原稿補正記録へ分離。視覚needs-fixを維持し、自動マージしない。

## 再開

`npm run dev`、`npm run build`。撮影は `python3 scripts/visual_qa.py --round N`、実操作検査は `python3 scripts/functional_qa.py`。環境のinstall_script/start_skillも実装後の起動手順へ更新保存済み（環境設定の公開とサイト公開は別）。
