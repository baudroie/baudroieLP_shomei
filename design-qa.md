# Round34 — sales-teamのPC顔被覆P1修正

対象PRコメント6227322804を全文確認。最新c326805をfast-forwardで取り込み、他担当のdocs/public-verification-round33-followup.mdを保持。

撮影/描画/ビルド元 `026a3ad685b335016d3d4ae3c4327f20458186f2`。全src SHA256 `8de54c32d52222247b0b2701c39869015235df25c9ba36598fa0a62b8867bd5e`、全public tree SHA256 `0db0948325acac42acee025fd9c2c693e7ca9d11822cf61fa893df86f44bd524`。素材treeはround33と同一。写真・線画・ロゴ・referenceの画素を変更していない。

## 問題・原因・修正

1440の全幅office_lounge.jpgとクリーム本文背景が重なり、左女性の顔を完全に覆っていた。低解像度とは別の既存P1。round33の「新規P1/P2なし」はこの既存被覆の解消を確認したものではなく、見落としを訂正する。素材待ちの構図差として放置しない。

1200px以上のみ、写真を自然3:2で右寄せ・object-fit:contain・height100%に変更。1440では843×562px/左597px、1280では780×520px/左500px。caption位置・文字・局所くびれpath・section高は保持し、左空き領域を淡クリームに。左女性・中央男性・右女性の顔、前景の後頭部、中央/右人物の手が本文/背景に覆われない。

**暫定マスター差**: 元マスターの全幅大判写真ではなく右側約59〜61%幅の写真となり、左上に広い淡色余白、写真上側左端に直線境界が生じる。局所くびれpath自体は残すが、見える全体輪郭は元マスターと同一ではない。現素材の人物配置と全幅写真+左本文重なりの両立が困難なため、ユーザー指示どおり顔保護を優先した最小限の暫定CSS対応。photo/section/本文を一緒に縦伸縮して誤差を隠していない。

1199以下は今回変更なし。390は写真と本文が分離しており顔非被覆を保持。768/1066には以前から前景後頭部下端・肩や原画像右下の小さな手首のcropが残るが、クリームの顔被覆とは別。全幅ですべての頭/手を完全表示したとは主張しない。

## 撮影・回帰とP1専用検証

固定SHAから全4ページ×1440/1280/1066/768/390 CSS px・DPR1、font ready/画像decode/スクロール停止後に撮影。初回は前セッションのdev server停止でERR_CONNECTION_REFUSEDとなり、ループバックで再起動して同一ソースを完走。初回失敗を成功扱いにしていない。

標準20条件、clientWidth基準横溢れ20条件、操作27条件、同じSHAのPages静的12条件が成功。PC全高は3557/3608/3798/3900で前版と不変。全4ページPC全体/section/side-by-side/50%overlay/difference、全5幅と70部位はartifacts/qa/round-34/にローカル保持。営業team修正前33→後34の5幅比較はbefore-after/。local-evidence-manifest.jsonに絶対パスとSHA256。新規画像はPR/Pagesへ公開しない。

P1専用 scripts/sales_face_qa.py: 原750×500画像に対し、3人の顔、前景後頭部上側、中央/右の手の6手動ROIを定義。5幅=30領域について写真内にあること、captionの表示あり/なしで同一画素であることを検証。devとminify済みPagesビルドの両方でfailures=[]。これは画像認識による全人物保証ではなく、前景手首や後頭部全体は対象外。目視レビューも併用。

記録face-protection/report.jsonとface-protection-pages/report.json。公開ビルドのbaseパスは/baudroieLP_shomei/。独立レビューdocs/independent-review-round-34.mdでも5幅原寸部位と原写真を実見し、PC顔被覆P1解消を確認。原素材/マスターとの同一性・画質は別課題。

## 判定・公開・残課題

今回P1はローカルと公開相当ビルドで解消。公開画面そのものはプロキシ制限により依頼元が再検証する。新しいsource/publicSHA・CSS/JS・GitHubデプロイ結果はdocs/pages-deployment.mdとdocs/orchestrator-status.md。

未承認写真差替え・生成・アップスケールなし。新規比較画像公開なし。mainマージ、権限・Pages設定・ネットワーク変更なし。営業写真の画質/構図、原線画/書体同一性、暫定PC写真配置、768/1066の既存cropを明記して最終完全再現は保留。正式LINE未提供/スマホ暫定も継続。次の具体指摘は同PR・round35以降。
