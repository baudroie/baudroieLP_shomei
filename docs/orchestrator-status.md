## 2026-10-19 サービス文言・エンジニアアイコン／キャリア図の追加修正

指定5項目を実装し4幅・全4ページの回帰確認完了。独立目視レビューに重要な未解決指摘なし。詳細 docs/icons-career-review-20261019.md。公開手順は既存designブランチ更新→同じ検証ビルドをgh-pagesへ反映。公開反映済み。ソース31dc8cd、gh-pages 0f2a48f、Actions 39192307149成功。公開URLの12条件を再確認し、新文言・アイコン・CSS/JSの反映、画像欠落／横溢れなしを確認。詳細と証拠は上記レビューに記録。

## 2026-10-19 エンジニア写真レイヤー修正版を公開済み

- 公開ソース: `3b44f15a5cf723c605b1a1ffaa23acffd2ede2c7`（ローカル検証コミットf752a0dとtree bf435bcfeba0ba1bd1df8938e2ba8b86fe464cd9が完全一致）。
- gh-pages: `214f1056fba18f215f80f9fd0ec841e5129a5f21`。配信tree `060385de8b2b0e16237357b9ce48cbf801592cea` の55ファイルすべてが検証済みdistとGit blob SHA一致。
- Actions: https://github.com/baudroie/baudroieLP_shomei/actions/runs/39186335210 （completed / success）。
- 公開URL: https://baudroie.github.io/baudroieLP_shomei/engineer/
- CSS `index-B43WP30C.css` / JS `index-DEareOG4.js`。公開4ページを1440/375/390/430で再読み込み、新CSS配信・横溢れなし・4種のCTA href維持を確認。エンジニア写真の登場時opacityは全4幅で1。
- 公開4ページHTML・CSS・JS・deployment.jsonは検証済distとバイト一致。公開ソースは上記3b44f15。
- 写真登場時の透け修正が完了。人事原稿の3組の根拠不足は継続のため本文・想定注記は保持。詳細 docs/engineer-layers-review-20261019.md。
- 独立担当が新版before/after-entry-390と演出完了後footer-engineer-390を追加実見し、証拠の指摘解消を確認。
- 証拠 artifacts/qa/engineer-layers-20261019/published-checks.json、published-byte-checks.json。画像は依頼元の baudroie-engineer-lines-review-20261019.html に収録。
- mainマージ・権限変更なし。PR #2はDraft維持。LINE友だち追加・送信は未実施。全体の最終検収とは別。

---

## 2026-10-19 エンジニア写真の透け修正（公開前検証済み）

対象2ファイルの限定変更。写真登場時のopacityを常時1にし、不透明なfigureで背景装飾と分離。4幅の写真矩形一致・全4ページの回帰確認済み。人事本文に3組の根拠不足があるため想定注記は維持。詳細は docs/engineer-layers-review-20261019.md。ユーザー承認済みの公開手順で反映し、公開後の状態は追記する。

---

## 2026-10-19 写真注記・折返し修正版を公開済み

ユーザーの公開指示により、以下の未公開記録を更新しました。

- 公開元ソース: `d25a2c9ef56fa6df152bc1e2279a00e89e7cb966`
- gh-pages: `aa14518c9d3731f00a2552ff50e7c09950b9c3c9`
- 配信tree: `4ea1974c5fb144285277228bbb5d79ece0e12353`（55ファイルすべて検証済みdistとGit blob SHA一致）
- Actions: https://github.com/baudroie/baudroieLP_shomei/actions/runs/39184467624 （completed / success）
- 公開URL: https://baudroie.github.io/baudroieLP_shomei/
- CSS `index-C4JHzsEv.css` / JS `index-DZa17xO8.js`。
- 公開4ページHTML・CSS・JS・deployment.jsonを取得し、ローカル公開用distとバイト一致。
- 公開4ページをChrome 1440/390pxで実見。読込後の画像欠落・横溢れ・削除対象写真注記なし。フッターで固定ヘッダーtop=0、会社/プライバシーリンクとエンジニア「こちらから。」を確認。4種類のLINE hrefを確認。
- 人事の想定業務注記は保持。担当範囲の事実確認は引き続き必要。
- 今回は既に検証済みの修正版の公開確認。375/430は先行プレビュー検証、reduced-motionライブ再検証とLINEアプリ内の友だち追加/タグ/配信は今回対象外。
- スクリーンショットは非公開のローカル `artifacts/photo-notes/published-{overview,hr,sales,engineer}-{1440,390}.png`。390pxの計測は `artifacts/photo-notes/published-browser-checks.json`。
- mainマージなし。PR #2はDraftを維持。サイト全体の最終検収とは別。

---

# 最新：2026-10-19 写真注記・折返しの追加修正

対象は本記録と同じコミット（開始点ef9a113）。最新ユーザー方針をIMPLEMENTATION_BRIEF冒頭へ反映。4ページの写真注記削除・alt整理、公式研修写真への切替、フッターとCTAの折返しを実装。人事の業務内容の未確定注記は保持。

4ページ×1440/390/375/430を実ブラウザで撮影。画像欠落/横はみ出しなし。ヘッダー3ナビ×16条件の移動と末尾のheader top=0を確認。通常モーション維持、reduced-motionロジックは不変（今回のライブ切替は未再検証）。読取専用の別レビュー担当が16枚と差分を確認。

証拠：`artifacts/photo-notes/browser-checks.json`、`interactions.json`。比較画像は依頼元の `baudroie-photo-notes-review-20261019.html`。ローカルプレビューは `/approved-four-pages/` の4ルート、起動方法は既存READMEに準拠。外部からlocalhostへ接続できるとは扱わない。

次の判断：人事の担当範囲の事実確認。今回の修正はPRへ反映し、mainマージ・gh-pages更新は行わない。旧公開版を今回の修正版と混同しない。以前の記録は以下に履歴として保持。

---

# Round34 — sales-teamのPC顔被覆修正を公開

プレビュー https://baudroie.github.io/baudroieLP_shomei/sales/#sales-team
配信元・撮影・ビルドSHA `026a3ad685b335016d3d4ae3c4327f20458186f2`
公開SHA `a3cea681cd5f3b0f64407010d0bb97f16b4723a9`（親74665af）
CSS `index-Cxalxh3m.css` / JS `index-5w4Ugcp-.js`
GitHubデプロイ completed / success
https://github.com/baudroie/baudroieLP_shomei/actions/runs/38987041707
公開更新JST 2026-10-17T09:35:03.847541+09:00

PR指摘6227322804へ対応。最新c326805を保持して開始。現750×500写真のまま、PC写真を右寄せ自然3:2表示へ。1440は843×562px/左597px、1280は780×520px/左500px。captionとsection高さを保持し、写真左の空きを淡色で処理。3人の顔と前景後頭部がクリーム/文字で隠れない。

**暫定差**: マスターの全幅写真とは異なり、右側約59〜61%幅の写真と左上淡色余白、写真上側左端の直線境界になる。局所くびれpathを保持しているが全体輪郭一致ではない。元写真の構図では全幅背景+マスター本文の重なりと顔保護を両立できず、ユーザー指示により顔保護を優先した。本文/後続セクションの位置を動かさず、PC全高は前版と同じ。

5幅1440/1280/1066/768/390をfont/画像読込とスクロール停止後に撮影・実見。標準20、clientWidth横溢れ20、操作27、Pages静的12条件が成功。P1専用顔/後頭部上側/手の6ROI×5幅はdevと公開ビルドで写真内・caption表示による画素変化なし。768/1066の既存前景後頭部下端/肩/手首cropは別記し、全ての頭と手を表示したとは扱わない。独立レビュー docs/independent-review-round-34.md。

同一ソースのdistのみを既存gh-pagesへ通常pushし、配信tree全ファイルhashが検証済distと一致。mainマージ・Pages設定・権限・ネットワーク変更なし。素材差替え/生成/アップスケールなし。新規画像公開なし。公開URL直接確認はCONNECT proxy403で実施できず、依頼元がライブを再検証する。

## 証拠と訂正

画像はローカル /workspace/baudroieLP_shomei/artifacts/qa/round-34/ のみ保持。最新営業5幅部位は subjects-stable/sales-{1440,1280,1066,768,390}-sales-team.png、前後比較before-after/、全体/section/横並び/overlay/differenceも同round。local-evidence-manifest.jsonに絶対パス/hash。PRにはJSON/レビューのみ保存。

face-protection/report.jsonはdev、face-protection-pages/report.jsonはminifyしたPagesビルドで各30ROI。元画像の3人の顔、前景後頭部上部、中央と右人物の手に限定し、全写真の保証と混同しない。

round33の「新規P1/P2なし」は今回の既存被覆の解消を確認しておらず、見落としを訂正。docs/public-verification-round33-followup.mdと指摘コメントを保持。

今回PCの顔被覆P1はローカル/公開相当ビルドで解消し、公開再検証待ち。写真画質/原線画/書体同一性、暫定右寄せ写真のマスター差、768/1066の既存下側crop、LINE正式URL未提供・スマホ暫定は継続課題。次round35以降も新規画像はローカル保持。


## 2026-10-19 承認済み4ページのGitHub反映
最新の作業内容は docs/github-approved-update-20261019.md を参照。
base=feat/four-role-landing-pages@05efb8b、head=design/approved-four-pages-20261019。
ローカル承認版42ebb4bからsrc/public 54ファイル一致、ビルド出力CSS/JS一致。
証拠 artifacts/approved/ と artifacts/hr-mask/。本番・main未変更、Draft PRで提出。


## 2026-10-19 LINE URL接続（公開とは別工程）
ユーザー提供の4URLをsrc/config.tsへ設定。まとめ下部に直接LINE相談CTAを追加し、6本の職種リンクとページ内リンクは維持。
比較基準は最新ブランチ8b9f53d。旧Pagesは今回の検証対象にしていない。
公開相当の最新ビルドをlocalhost:4193/baudroieLP_shomei/で検証。詳細はdocs/line-url-verification-20261019.md。
GitHubへはDraft PR #2の既存headブランチを更新する。Pages配信・mainマージは実施しない。


## 2026-10-19 最新4ページとLINE URLをPagesへ公開済み

ユーザーの公開指示により、先行する「Pages未公開」状態を更新。
- 公開元ソース: e9af3655229b01995d1c477d7bb43239b0221394
- gh-pages公開コミット: 58b537151b5a33cd53b1a95be43f8afebf9a03ef
- 配信tree: 29f09260c3f3b8462d5a946bbcb537a202b74f65
- デプロイ: https://github.com/baudroie/baudroieLP_shomei/actions/runs/39155460787 （completed / success）
- 公開URL: https://baudroie.github.io/baudroieLP_shomei/
- 51ファイルすべてが検証済みdistとGitHub treeでSHA一致。
- 公開deployment.jsonのsource_commitがe9af365、CSS index-CEtWWikq.css / JS index-CCqdp7rz.jsを確認。
- 公開4ページをChromeの1440/390pxで検証。読込完了後、画像欠落・横溢れなし。コンソールerrorなし。
- 4ページのCTAから指定uLand（まとめDEUpQ8／人事XJFhyu／営業nRXMPl／エンジニアWxzOIt）のエルメQR案内へ実遷移を確認。
- 4ページHTML・CSS・JS・deployment.jsonの公開レスポンスはローカルdistとバイト一致。
- mainマージなし。PR #2はDraftを維持。LINEアプリ内の友だち追加・タグ付与・配信は検証対象外。


## 2026-10-19 固定ヘッダーと表示演出
実装・ブラウザ確認を完了。詳細 docs/polish-verification-20261019.md。証拠 artifacts/polish/。元ソースa05e987、旧公開e9af365との比較。人事写真・配色・主要素材を維持。公開処理へ進む。


## 2026-10-19 固定ヘッダー・表示演出の最終版を公開済み

- 実装ソース: c9ca2d20047300698482afe45179e8e70caaaeae
- gh-pages: f7bf01b2b871f265a1dfb11e929f95d28cf91db9
- Actions: https://github.com/baudroie/baudroieLP_shomei/actions/runs/39160623724 （completed / success）
- 公開URL: https://baudroie.github.io/baudroieLP_shomei/
- CSS index-DCIR0hE-.css / JS index-MxbsS-hI.js。
- 公開4ページをChrome 1440/390pxで読み込み完了後に検証。画像欠落・横溢れなし、固定ヘッダーPC102px/スマホ96px、フッターまで上端0px。4種類のLINE href一致。
- 詳細 docs/polish-verification-20261019.md、公開計測 artifacts/polish/public-verification.json。
- mainマージなし。PR #2はDraft。スマホ実機の性能・LINEアプリ内の友だち追加/タグ配信は未検証。
- 比較画像8枚と約8秒GIFを含む自己完結HTMLを納品。
