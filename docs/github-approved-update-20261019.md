# GitHub反映: 承認済み4ページと人事FV最終調整

- ベース: feat/four-role-landing-pages / 05efb8bc1cc56879478ab0b27f3a170bce430c26。既存PR #1の最新状態。
- ブランチ: design/approved-four-pages-20261019。既存PRへ重ねるDraft PRとして提出。
- 実装移送元: ローカル approved-four-page-preview / 42ebb4b。
- 対象: 4ページの選定背景・CTA文言・動作・承認済み人事素材・人事FVの曲線と枠内人物位置・スマホ改行。
- 新たなデザイン変更はせず、確認済みsrc/public 54ファイルをSHA-256で照合し、全件一致。
- npm run build:approved-preview 成功。出力CSS index-O6hFtd5m.css、JS index-CWm8Ya8_.jsが確認済みローカル版とバイト一致。
- プレビュー用ビルドは別のローカルディレクトリに依存しないよう整備。任意の転送先が必要な場合だけ APPROVED_PREVIEW_COPY_TO を設定する。
- 採用参照: approved-reference/。元の人事曲線参照: approved-reference/hr-mask-original.png。
- 証拠: artifacts/approved/（4ページ）、artifacts/hr-mask/（人事最終）、その他hr-*は途中の比較履歴。
- 実画面の検証結果は docs/approved-design-handoff.md と docs/hr-mask-retry-status.md。GitHub移送時は表示関連ファイルが同一のため追加のデザイン改変なし。
- CTA正式URLは未設定。既存オレンジと白文字のコントラストは既報の確認事項として維持。
- main、gh-pages、Pages設定、既存PR #1のブランチは変更しない。公開・マージ・auto-mergeなし。

GitHub登録では既存ルールを優先し、比較画像・動画・参照画像はローカル保持。検証JSONとレビュー文書、必要な実装素材のみ登録する。ローカル証拠のSHA-256一覧は docs/local-evidence-approved-20261019.json。通常git pushの認証が利用できないため接続済みGitHub連携のGit Data APIで同じファイル内容を新規ブランチへ登録。
