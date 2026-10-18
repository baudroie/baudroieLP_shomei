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
