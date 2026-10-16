> 更新: 依頼元が2026-10-16 04:51 UTCに共有URL到達を確認済み（PR6208344208）。Pagesは配信中の旧6995de1/313e9d0。以下のAPI403/設定待ちは当時の履歴です。現在設定変更は不要。最新CSSはround17/PRにあり、今回配信ブランチは更新していません。

# GitHub Pages公開準備

2026-10-16のユーザー依頼「githubpagesで閲覧できるようにしておいて」により、以前の公開禁止指示に代わってPages公開が許可された。mainマージは行わない。

- 状態: **成果物保存済み / Pages有効化は権限不足で未完了**。
- 予定公開URL: https://baudroie.github.io/baudroieLP_shomei/
- 元ソース: `313e9d09a15d9ab4ce33df67e1353efef5a8c2f2`
- 配信用gh-pagesコミット: `6995de1d36f2b70488d2159e604a8a623b0a00ec`
- ビルド内deployment.jsonも元ソースを記録。ソース・QA画像・referenceは配信ブランチに含めず、ビルド成果物のみ。

## 検証済み

npm run build:pages成功。project base `/baudroieLP_shomei/`、各職種index.html、404.html、.nojekyllを生成。型チェック成功。ローカルの静的HTTPサーバーで4ページ×1440/390/768pxの12条件を確認。直接アクセスHTTP200、画像/フォントロード、横溢れなし、職種リンクとまとめへ戻る、LINE設定待ちEnter/Escape/フォーカス復帰が成功。`artifacts/qa/pages/local/` にreportと12枚の実ブラウザ撮影あり。デザイン変更はなく公開パス対応のみ。視覚比較の基準版はround11（0ab1177）、完全再現判定needs-fixは変わらない。

## 配信有効化の不足権限

GitHubのリポジトリ情報ではadmin:trueだが、現在のGitHub App連携でPOST /repos/baudroie/baudroieLP_shomei/pagesはHTTP403 `Resource not accessible by integration`。Actions設定読取も同じ403。利用可能な正規ツールに別のGitHub管理接続はない。秘密値の読取や非正規認証は行っていない。APIの権限不足は自動承認レビュー拒否とは別。

ユーザーによる最後の設定: https://github.com/baudroie/baudroieLP_shomei/settings/pages を開き、Build and deploymentのSourceを **Deploy from a branch**、Branchを **gh-pages** / **/ (root)** にしてSave。配置済みの成果物がGitHub側で配信される。

このクラウドからbaudroie.github.ioへのHTTP確認も接続プロキシの403で制限されている。ネットワーク全許可にしていない。配信有効化後にクラウドから実公開確認する場合、必要な追加接続先は **baudroie.github.io:443** のみ。現在は実公開サイトの到達性・GitHub側ビルド成功を未確認とし、公開済みとは報告しない。

## 更新

`npm run build:pages` → `python3 scripts/pages_qa.py` → distだけをgh-pagesへ通常push。既存ブランチは履歴を保持し、force pushしない。LINEは正式URL提供まで設定待ち。
