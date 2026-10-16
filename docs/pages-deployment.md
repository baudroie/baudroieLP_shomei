# GitHub Pages閲覧用修正反映

- URL: https://baudroie.github.io/baudroieLP_shomei/
- 配信元ソースSHA: `fa4bc3d3f1074e0a98454ec1541a9d93fc4f907a`
- 対応するround17描画ソース: `e17e5d68d2019b3f12314fb503c203e8ec4c2163`
- 公開用コミット: `54d0d7c7fd51e1002617c362a39fcf7eb1d62588`
- GitHubデプロイ: completed / success、https://github.com/baudroie/baudroieLP_shomei/actions/runs/38856709282
- 確認UTC: 2026-10-16T05:38:36.508180+00:00

ユーザーの今回指示により既存gh-pagesへ通常push。旧6995de1を親として履歴を保持し、mainマージ・Pages設定・権限変更を行っていない。素材差替え・生成・アップスケールなし。

fa4bc3dのsrc/publicハッシュはround17と一致。npm run build:pagesでproject baseを指定し、4ページのindex.html、404.html、.nojekyll、deployment.jsonを生成。配信対象はdistのみ。reference・ソース・QA画像は公開ブランチに含めない。

12条件のローカル静的ブラウザ検査（1440/390/768×4ページ）が成功。ページ直アクセスHTTP200、画像・フォント・職種リンク・ロゴ復帰・LINE設定待ちとキーボード動作を確認。artifacts/qa/pages/round17-release/に撮影/report/全配信ファイルSHA256/デプロイ状態を保存。CSS index-B7UDXxZH.css、JS index-qJ4PQdBD.js。

公開URLへのクラウド直接アクセスはCONNECT proxy 403。設定変更せず、公開HTTP/画面の実見は未確認として依頼元へ引継ぎ。GitHub Actionsのデプロイ成功は確認済み。今回の閲覧用反映は写真画質・マスター同一性の最終検収完了を意味しない。office_lounge.jpg 750×500等の課題はdocs/photo-replacement-pending.mdに残す。
