# 実装進捗

- 資料基準: d23ee75f9ef23b049f73fa375705ed606ce5b594
- 作業ブランチ: feat/four-role-landing-pages
- 状態: 4ページ初稿を実装、round 1比較後に修正中。視覚判定needs-fix。
- 実装: /、/sales/、/hr/、/engineer/。React + TypeScript + Vite、文字・導線はHTML。
- プレビュー: クラウド内部の127.0.0.1:4173で起動。共有URLなし。利用者のlocalhostとして案内しない。
- 待ち受け制限: 0.0.0.0は自動承認レビューに拒否されたため、ループバック限定でQAを継続。
- 初回証拠: artifacts/qa/round-1/ (12全体画像、各PCセクション、4横並び/overlay/差分、report.json)
- 比較対象: round-1/report.jsonのsource_sha256。初回撮影時HEADは資料基準コミットでソースは未コミットだったため、ソースハッシュも保存。
- 機能確認: 390/768全4ページ横溢れなし、全ページ画像ロード、LINE待機モーダル、Enter/Escape・フォーカス復帰。営業1440の横溢れとfavicon404は修正し再検証予定。
- 未解決: 原フォント、公式写真と生成マスターの構図差、線画の使い回し、PCの細部・余白・改行。LINE正式URL待ち。スマホは暫定レスポンシブ。
- ネットワーク: api.github.com、www.baudroie.jp、media.baudroie.jpのみ追加案を保存。現在API/公式サイト取得成功。全許可はしていない。
- 次作業: 初稿をDraft PRへ保存、個別線画の差し替えとround 2、独立レビュー。各ラウンド開始/終了にPR指示を確認。
- 独立レビュー: 未実施。依頼元レビュワーの確認待ち。設定済み監視の稼働を本チャットが確認したとは主張しない。
