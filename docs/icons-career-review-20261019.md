# 2026-10-19 サービス領域・エンジニア入口・アイコン・キャリア図

## 対象版

公開ソース3b44f15 / gh-pages 214f105。最新作業ブランチdesign/approved-four-pages-20261019の007e2a6とローカル7107ec3はtree bfd66a72298b4f19700ac50ba27f52a4a6285ee0で一致。専用worktree・fix/engineer-icons-career-20261019で実装。他作業の未コミット差分は変更していない。

## 変更

1. まとめ最初のサービス領域のみ「ネットワーク構築／運用保守」、指定本文へ変更。既存network素材を保持。見出しは意味で折返し、アイコン／見出し／本文をsubgridで同行内整列。他3領域およびエンジニア「ネットワーク仮想化」は不変。
2. 未経験／経験者リンクをアイボリー／セージの案内ボタンへ。本／積層アイコン、26px、16px文字、66px高、1px枠、6px角丸。PC2列、スマホ1列・12px間隔。#beginner/#experiencedを維持。
3. 技術領域に既存network/cloud/security画像と新規virtualization SVG。元PNG余白を表示枠内で調整。64px／48px枠、本文・街イラストは不変。
4. 学習6項目にSVGを追加。「先端技術」「強みを活かせる役割」へ変更。40px／36px、暗色面では明色線。同じ3列、375pxの長いラベルを2行化。
5. キャリアの古いSVGと旧疑似線を削除。同じ3列のCSSで親・縦線・枝・アイコンを管理。PCは76pxアイコン、線末端から14px余白。スマホは54pxアイコン・左側共通線から各項目へ枝。高さは本文で自動伸縮。各選択肢は対等。

新規SVG11種は public/assets/engineer-icons.svg のsymbol。book/layers/virtualization/certificate/hardware/chip/blueprint/strengths/specialist/manager/consultant。64×64・線幅2.4・丸端・現行オレンジ#e89314。本文に隣接するアイコンはaria-hidden=true、focusable=false。人物の頭身と描き方を統一。一覧を目視後に実配置を確認。

## 維持

承認済み主要写真・人物画・街イラスト・波・背景モチーフ・オレンジの値・技術カレッジ写真・人事写真のマスク・LINE URL・ヘッダー・フッター・最終CTAの文節保護。エンジニア冒頭のfigure isolation/白背景/opacity=1は不変。人事の想定業務注記は今回対象外として維持。

## 検証

- npm run build:pages / git diff --check 成功。
- Chrome 1440/375/390/430px、DPR1、viewport高さ1000px。全4ページ16条件で横溢れ・画像欠落・写真注記の復活なし。フッター到達時header top=0、PC102px／スマホ96px。会社／プライバシーリンクnowrap維持。LINE4種類のuLandを確認し、追加・送信は実施せず。
- 2つの入口を実クリックし8条件でスクロール停止後を確認。対象上端はPC134px／スマホ128px前後、固定ヘッダー下に32px余白。見出しも表示範囲内。最終記録 anchors-final.json（初回計測anchors.jsonは演出途中のため判定に使用しない）。
- Tabで経験者リンクにフォーカス移動。3px青枠・offset4pxを確認。
- 新しい最終CSS/JSを読み込んだ後のコンソールerrorなし。初期の専用プレビューURL変換不足によるhydrate警告は修正済みで、公開用ビルドにその変換は含まない。
- no-js/engineerでscript0、アイコン12箇所、本文・キャリア図opacity1、CTA有効、横溢れなし。
- reduced-motionでは既存matchMedia判定がplayより先に適用される。全体fadeは420ms、位置変化なし。既存設定変更時cancel処理、CSSのscroll/transition停止も不変。今回はOSの設定切替による再検証はしていない。
- 写真・人物素材のファイルは変更なし。エンジニア冒頭photo opacity1を全4幅で確認。
- 1440/390の変更前後は両方scrollY=0でフルページ撮影。そこから対象セクションを等倍切抜きして比較。375/430も対象各所を等倍切抜きで目視。見出しの高さ変更による下方のy座標の変化は隠していない。
- 独立担当が新規アイコン一覧、キャリア図、サービス4幅、375px長文ラベル、390px入口・学習・技術領域を目視。重要な未解決指摘なし。

## 証拠

artifacts/qa/icons-career-20261019/captures.json、regression.json、anchors-final.json。
比較スクリーンショット・新規アイコン一覧・focus画像は同フォルダにローカル保存し、自己完結HTMLへ収録。公開サイトの配信には含めない。
## 公開結果

- 公開元ソース `31dc8cd7667a221aeb071bf8eb19b2e657aa8c0e`。ローカルcb185baとtree bdc50b8ddd57029c513d7a1de375273803aa5111が一致。
- gh-pages `0f2a48f6aa8b3dde20017db7f685c7da2802bfb6`。56ファイルの配信tree `019b49a11383d359667799cb1ef67ff0558cb4ed` はローカル公開用distとGit blob SHAが一致。
- Actions https://github.com/baudroie/baudroieLP_shomei/actions/runs/39192307149 completed / success。
- 公開URLを再読み込み。全4ページ1440/390px、対象2ページ375/430pxの12条件で新CSS index-DsPFFcUp.css・JS index-BXfKA33m.js、改訂文言・アイコン、画像の読込完了・横溢れなし・LINE href維持を確認。
- 証拠 published-final.json。初回published.jsonは画像読込途中のため判定に使用しない。
- mainマージ・Pages設定変更なし。PR #2はDraft維持。LINE友だち追加・メッセージ送信なし。
