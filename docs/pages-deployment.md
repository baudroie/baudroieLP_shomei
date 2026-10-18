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

---

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

---

過去の公開履歴：

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
