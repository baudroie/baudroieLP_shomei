# 4ページ確定デザインの反映

ローカルプレビュー： http://127.0.0.1:4191/approved-four-pages/
人事： /approved-four-pages/hr/
営業： /approved-four-pages/sales/
エンジニア： /approved-four-pages/engineer/

既存のプレビューサーバーの独立したサブディレクトリへ配置しています。元ページ、元ソース、本番は変更していません。サーバー終了後は、この作業ディレクトリで `npm ci` → `npm run dev -- --host 127.0.0.1 --port 4192` と実行し、`http://127.0.0.1:4192/` を開いてください。

全ページのHTML事前出力： `npm run build:approved-preview`。`approved-dist` に出力されます（baseは /approved-four-pages/）。現在のビルドスクリプトは元のローカルプレビューの独立サブディレクトリにもコピーします。

## 変更ファイル
- src/main.tsx：まとめの職種入口の順序変更、モチーフの配置、CTA、行単位見出し、パノラマ外周の接続線。
- src/approved-design.tsx：職種別背景SVG、初回のみのモーション、reduced-motion対応。
- src/approved-design.css：背景専用トークン、4種の構図、スマホ配置、フォーカス、リンクモーション。
- scripts/build-approved-preview.mjs：4ページのprerender、script-free確認用ページ。
- package.json：build:approved-preview追加。
- artifacts/approved：比較画像・検証JSON・動画・review.html。

## 保持したもの
現在のオレンジ #e89314、ロゴ、既存画像42点、共有色CSS、既存レスポンシブ修正、URL設定ファイル。元作業コピーのsrc/publicは着手時ハッシュと一致。4ページとも既存内容を保持し、営業・人事へのエンジニア素材転用はしていません。

## 検証
1440/768/430/390/375px、9か所の相談ボタン、閉じる・Escape・Tab・フォーカス復帰、職種ページ往復、ページ内移動、全画像ロード、console、TypeScript/Viteビルド。
実OSの視差効果を減らす設定で確認し、元のOFFへ復帰。スクリプトなしでも本文・CTA表示。

## 背景色
#F7D6B5：扉の縦面、人事の帯、営業の紙面。
#F4E4B2：扉の横面、人事の帯、営業の紙面。
#FFF9EF：各背景の明るい面。
#B7BC7D/#DCC77C：エンジニア接続線の補助色。
既存の研修用背景色は維持。ブランド色・ボタン色には使用していません。

## 未確認事項
全3職種の正式CTA URL、遷移先と受付条件。面談時間・選考との関係・準備不要などの条件は未追加。
白文字と既存オレンジのコントラスト約2.44:1は保持指示に従い変更なし。
本番公開、mainマージ、リモートpushは未実施。

独立レビューは採用画像・PC比較・スマホの冒頭中盤末尾と主要3修正の範囲。動画・全操作は実装担当の検証です。
