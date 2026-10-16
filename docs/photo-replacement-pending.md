# 最新: Round30 写真選定の状態

以前の優先3箇所（営業work/team・人事support）のうち、人事supportは承認済 `support-conversation-approved.webp` 1536×1024へ他担当round22で反映済み。今回ユーザーの追加承認により、まとめheroにも同画像を使用。まとめsupportも同画像。未承認の別候補、新規生成、アップスケールは行っていない。

未承認選定待ちは **営業workとsales-teamの2箇所**。現office_lounge.jpg750×500の画質不足、workのcontain余白、teamの左コピー領域と人物の構図差を保持。HR supportを旧750pxの画質不足として列挙しない。

その他の任意画質改善候補: college_training.jpg1477×1108、engineer-training.png1774×887。承認済相談写真は大判/DPR2での実見を継続するが、元750pxの画質課題とは区別。HR hero3024×2268は現素材保持。新しい写真が必要な場合も依頼元でユーザーが選定する。

最新構図証拠: artifacts/qa/round-30/subjects-stable/、表示枠とDPR2はlayout-bounds-report.json。

---
以下はround21時点の履歴で、現在の選定状態ではない。

# 写真選定と画質候補

依頼元でユーザーが候補・構図を決定する。今回、写真・線画の差替え、新規画像生成、アップスケールなし。

## 選定中の優先3箇所

|箇所|現素材|残課題・必要構図|
|---|---|---|
|営業work|office_lounge.jpg 750×500|手元・資料・机が入る構図。現状containの余白と面積縮小。|
|営業team|同上|右側に人物、左側にコピーの余白。現状人物とコピーの構図差、拡大時の画質不足。|
|人事support|同上|4人の頭・顔・原写真内の手を保持する横長構図。round21は最大900×375、スマホ3:2で暫定改善。画質不足とマスター写真幅差は未解決。|

DPR2では現HR枠でも1800px以上の横幅が目安。マスターの約1304×365枠へ戻す場合は2608px以上の幅と、その比率で頭と手が収まる構図が必要。元画像外の手や身体はCSSで復元できない。

## その他の任意の画質改善候補

優先3箇所とは区別し、差替え必須・承認済みとは扱わない。まとめwelcome_team.jpg（1477×1108）、college_training.jpg（1477×1108）、engineer-training.png（1774×887）は大きなDPR2表示で解像度改善候補。実測枠は artifacts/qa/round-21/layout-bounds-report.json に全9幅分を保存。候補の最終構図は依頼元が決定する。

HR hero recruiting_conversation.jpg（3024×2268）は高解像度の現素材を保持しCSSで修正済み。まとめsupportも同素材。engineer-network.png（1536×1024）は現在最大700pxの自然比率表示で保持。これらを今回の写真選定3箇所へ混在させない。写真・線画のマスター同一性審査は画質の問題と別に継続する。

最新証拠: round-21/photo-crops/、sales-office-lounge-dpr2.png、hr-office-lounge-dpr2.png。
