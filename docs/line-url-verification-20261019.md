# LINE URL設定と最新ブランチ検証 — 2026-10-19 JST

## 対象
- ブランチ: design/approved-four-pages-20261019、Draft PR #2。
- 変更前コミット: 8b9f53d5f0b604f7dd5057399d5c959eaebd36f7。
- 検証対象: このブランチに以下の変更を加えた最新ソースからのビルド。以前のGitHub Pages表示を最新実装の確認済みとして扱っていない。

## 変更
src/config.tsで4流入元を一元管理。LineSource型を追加し、職種Role型は既存の3職種のまま維持。

| 流入元 | uLand | ページ内CTA数 |
| --- | --- | --- |
| まとめ | DEUpQ8 | 1 |
| 人事 | XJFhyu | 3 |
| 営業 | nRXMPl | 3 |
| エンジニア | WxzOIt | 3 |

すべて https://s.lmes.jp/landing-qr/1657893371-rRVdmjzQ?uLand= に上記値を指定。
まとめページには既存の直接LINE CTAがなかったため、職種リンク群の下に「仕事や会社の話を聞く」を追加。
まとめの職種LPリンク6本、#jobsなどのページ内リンク、各職種のナビ・戻りリンクは維持。
各職種のヘッダー・FV・下部CTAはすべてその職種のURLを使用。

## 実施した検証
- npm run build:approved-preview 成功（TypeScript検査を含む）。
- npm run build:pages 成功（TypeScript検査を含む）。
- Pages用dist: CSS index-CEtWWikq.css / JS index-CCqdp7rz.js。
- 最新distを http://127.0.0.1:4193/baudroieLP_shomei/ で配信し、Chrome実ブラウザで検証。
- 4ページ×1440/768/390pxで全LINEリンクを確認。各流入元のURLと全件一致。
- 上記12ケースで画像欠落なし、存在しないアンカーなし、横スクロールなし（scrollWidthは1425/753/375px、スクロールバーを除いた幅）。
- PCの4ページ、スマホのまとめ下部・人事FV・営業FVを画面確認。人事の最終写真枠と配置を保持。
- 4ページそれぞれのCTAをクリックし、指定uLandを保持したエルメの「スマホでQRコードを読み込んでください」画面へ実遷移することを確認。
- まとめ→営業の職種LP遷移、エンジニア→#beginnerのページ内移動を実操作で確認。
- 検証タブのコンソールerrorログは0件。
- git diff --check 成功。

## GitHub登録とPages公開の区別
この変更はDraft PR #2の既存ブランチへ登録する。Pages公開処理、mainへのマージは実施していない。
作業前のgh-pages SHAはa3cea681cd5f3b0f64407010d0bb97f16b4723a9、mainはd23ee75f9ef23b049f73fa375705ed606ce5b594。
公開ページは旧版のまま。GitHub登録完了をPages公開完了とは報告しない。

LINEアプリ内での友だち追加、タグ付与、メッセージ配信は今回の検証範囲外。
