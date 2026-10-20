# イラスト外側白背景の透過

基準: `4b7a457915c4bfeb51b6961eec9a4d7724d741da`。作業ブランチ: `fix/illustration-alpha-20261019`。公開・mainマージは未実施。

## 変更

| 使用ページ | 透過PNGへ更新した素材 |
| --- | --- |
| 営業 | sales-hero.png、sales-map.png、sales-phone.png、sales-research.png、hr-hero.png（メンター制度の挿絵） |
| まとめ | overview-role-illustrations.png |
| エンジニア | engineer-panorama.png、engineer-infrastructure.png、engineer-laptop.png |
| 人事 | 素材変更なし。既存の透過済み画像を保持 |

元画像の人物・構図・線・配色を保持。外側につながる白領域と、個別に確認した腕間・髪の隙間を選択してアルファ化。輪郭が開いている衣服・手・椅子・建物・紙・サーバーは個別の保護領域を指定。白の一括削除はしていない。背景との境界だけマットの白にじみを除去し、淡い楕円の縁を整えた。生成候補には位置・色の差があったため、そのRGB画像は採用せず元画素から仕上げた。

`src/approved-design.css` の `.role-art-window` を透明化し、`.approved-design .art` は normal 合成へ。サイズ・位置・トリミング指定を変更していない。画像全体のopacity、multiply、screenで隠す実装は追加していない。

hr-hero-white、hr-planning-white、hr-team-white、hr-notebook-white、engineer-beginner-transparent、既存アイコンなど、透過済み素材はバイト単位で維持。写真、背景モチーフ、色変数、コピー、CTA/LINE URL、通知設定は変更なし。エンジニア経験者の意図された暗色素材も変更なし。

## 検証

- Chromeで全4ページ×375/390/430/1440pxを表示・撮影。全16条件で画像読込成功、横溢れなし。
- 修正前後の画像矩形をDOM計測。演出完了後の位置・幅・高さが全16条件で一致（固定ヘッダーも同条件で比較）。
- 営業・まとめの優先箇所はPC/スマホの比較画像を保存。淡色 `#f1e4d0` と濃色 `#2d3f4d` の上で全9素材を比較し、外側の透過と内部白の保持を実見。
- 独立担当が元画像と濃色合成9点を実見。椅子・手・サーバー下端など6箇所の指摘を修正し、再確認で明確な内部欠損・消し残しなし。独立担当の範囲は素材確認であり、ブラウザー検証とは区別する。
- `npm run build` 成功。実装差分は9 PNGと背景/合成CSS、および再現・検証記録のみ。

証拠: `artifacts/qa/alpha-20261019/browser-checks.json`、`layout-comparison.json`、`pixel-checks.json`。画像は同ディレクトリの比較レポートと依頼元へ渡す自己完結HTMLに収録。撮影画像・原画像コピーは既存方針に従いGitへ含めない。

## 範囲と制約

今回の実動作確認はデスクトップChromeの指定viewport。iOS Safari/Android実機は未確認。モーションの再設計、reduced-motion切替、LINE友だち追加やメッセージ送信は今回の対象外。公開サイトは更新していない。

再現スクリプト `scripts/illustration-alpha.cjs` は pngjs を利用（実行環境では一時依存として導入）。元画像は上記基準コミットから取得し、素材ごとの明示マスクを適用する。

## 保存状況
実装のローカルコミット `86a371f`、検証記録 `dfe6b81`。Git CLIは送信認証がなく、接続済みGitHub経由の保存も自動承認レビューが「公開しない指示の範囲を超える外部送信」と判断して停止した。以降のGitHub送信は行っていない。リモートブランチ・PRは未作成で、本番公開・マージなし。自己完結比較HTMLを依頼元へ提出する。
