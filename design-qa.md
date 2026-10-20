## 2026-10-19 エンジニア写真レイヤー修正版を公開済み

- 公開ソース: `3b44f15a5cf723c605b1a1ffaa23acffd2ede2c7`（ローカル検証コミットf752a0dとtree bf435bcfeba0ba1bd1df8938e2ba8b86fe464cd9が完全一致）。
- gh-pages: `214f1056fba18f215f80f9fd0ec841e5129a5f21`。配信tree `060385de8b2b0e16237357b9ce48cbf801592cea` の55ファイルすべてが検証済みdistとGit blob SHA一致。
- Actions: https://github.com/baudroie/baudroieLP_shomei/actions/runs/39186335210 （completed / success）。
- 公開URL: https://baudroie.github.io/baudroieLP_shomei/engineer/
- CSS `index-B43WP30C.css` / JS `index-DEareOG4.js`。公開4ページを1440/375/390/430で再読み込み、新CSS配信・横溢れなし・4種のCTA href維持を確認。エンジニア写真の登場時opacityは全4幅で1。
- 公開4ページHTML・CSS・JS・deployment.jsonは検証済distとバイト一致。公開ソースは上記3b44f15。
- 写真登場時の透け修正が完了。人事原稿の3組の根拠不足は継続のため本文・想定注記は保持。詳細 docs/engineer-layers-review-20261019.md。
- 独立担当が新版before/after-entry-390と演出完了後footer-engineer-390を追加実見し、証拠の指摘解消を確認。
- 証拠 artifacts/qa/engineer-layers-20261019/published-checks.json、published-byte-checks.json。画像は依頼元の baudroie-engineer-lines-review-20261019.html に収録。
- mainマージ・権限変更なし。PR #2はDraft維持。LINE友だち追加・送信は未実施。全体の最終検収とは別。

---

## 2026-10-19 エンジニア写真の透け修正（公開前検証済み）

対象2ファイルの限定変更。写真登場時のopacityを常時1にし、不透明なfigureで背景装飾と分離。4幅の写真矩形一致・全4ページの回帰確認済み。人事本文に3組の根拠不足があるため想定注記は維持。詳細は docs/engineer-layers-review-20261019.md。ユーザー承認済みの公開手順で反映し、公開後の状態は追記する。

---

# 最新更新：2026-10-19 写真注記・フッター修正

対象は本記録と同じコミット。開始点 `ef9a113d273a738f81d0843738597622379e0e07`、公開画面CSS `index-DCIR0hE-.css`。今回の変更範囲は実装・プレビュー検証済み。サイト全体の最終検収や公開完了を意味しない。

- 写真注記を4ページからDOMごと削除。人事の仕事内容の未確定注記は保持。
- エンジニア技術カレッジを既存の公式研修写真へ変更。人事冒頭写真・切抜きは不変。
- フッター会社名・リンク、CTA「こちらから。」を文節で保持。まとめの事業見出し末尾「る。」の孤立も解消。
- Chromeで1440/390/375/430pxの4ページを撮影・実見。横溢れ/画像欠落/写真注記残り0。3ナビ×4ページ×4幅のアンカーはヘッダーより下へ移動。末尾でもheader top=0。
- 通常モーションを確認。reduced-motion処理とCSSは元版と同一で維持。今回ライブでのOS設定切替は未再検証（別作業のブラウザ操作との競合を避けた）。
- 読取専用の別レビュー担当がソースと16枚の全体画像を実見し、今回差分の重大な漏れなし。これは以前からの全未解決事項の一括承認ではない。

詳細：`docs/photo-notes-verification-20261019.md`。取得可能な比較資料：`baudroie-photo-notes-review-20261019.html`（依頼元チャットで共有）。PNGは非公開レビュー資料として扱い、リポジトリに公開しない。測定は `artifacts/photo-notes/`。

**確認待ち**：人事の採用企画・候補者対応・入社前後フォローの実際の担当範囲。承認されるまで想定注記を残す。LINE追加後のメッセージ/タグ等は今回検証外。

---

# 過去レビュー: 人事FV曲線復元

final result: passed

詳細: docs/hr-mask-retry-status.md。元参照とPC・スマホ実画面、3点比較を実見済み。独立レビューにP1/P2なし。

---

# Approved four-page design QA — 2026-10-18

final result: passed

Scope: requested preview design, preserving the current brand color and existing functional corrections. Not approval for production publication or recruitment claims. No publish, push, or merge executed.

## Source and comparison contract
- `approved-reference/00_IMPLEMENTATION_PROMPT.md` read in full.
- Opened all four images in `approved-reference/references/`; verified SHA256 against the supplied manifest.
- Overview uses the door-frame composition. HR, sales, engineer references specify BACKGROUND directions; their repeated engineer copy/photos must NOT be transplanted. Existing role copy, imagery and structure retained.
- The reference is a partial-page concept, not a replacement of all existing business and support sections. Full-page pixel identity is not claimed.
- Baseline: local engineer preview commit `8ff05b2`, copied into independent branch `design/approved-four-pages-20261018`. Original checkout remains unchanged. Source history snapshot is `57445ee`.

## Evidence
- Browser: Codex in-app Chromium, DPR 1. CSS viewports 1440, 768, 430, 390, 375 × 1000.
- All current screenshot widths match the CSS viewport. References scaled proportionally to 1440 px; no unequal scaling or height matching.
- `artifacts/approved/reference-{overview,hr,sales,engineer}-1440.jpg`: source at left, implementation at right, same scale and resting state. Source is cropped concept extent; full implementation continues below.
- `comparison-*-1440.jpg` and `comparison-*-390.jpg`: BEFORE left, AFTER right, preserved full heights.
- `after-*-{1440,390,375,430,768}.jpg`: full pages.
- `mobile-contact-*.jpg`: full-size 390 px extracts at top, midpoint and final CTA; inspect in addition to full length.
- `motion-preview.mp4`: actual browser screenshots with captured timestamps, 4 initial reveal sequences plus CTA dialog/open-close. Not generated animation. Variable capture cadence, encoded as 30 fps.
- `reduced-*-390.jpg`, `reduced-motion.json`: actual macOS Reduce Motion setting enabled; media query true and title opacity 1 / transform none. Restored setting to OFF afterwards. Later changes only clipped entry decoration and separated header grid hit areas; no motion logic changed.
- `no-js.json`: script-free prerendered pages have zero scripts and 5/6/6/7 sections respectively. Body and CTA present. URL-less CTA needs JS for the existing dialog, so no-JS does not provide an external contact destination.

## Iterations / findings closed
1. P1 sales: legacy absolute art positioning enlarged it across the text and header. Restored position relative and isolated two-column grid. New screenshot confirms no overlap.
2. P2 overview: inherited image mask conflicted with straight frame. Removed obsolete hero mask, retained approved original conversation image.
3. P2 job strip: reducing strip width exposed adjacent role. Introduced inner clipping window, kept 300% original strip proportions. Latest reference-overview confirms correct role crop.
4. P2 engineer: bundle disappeared behind opaque panorama exterior. Added short, local bridge over the empty exterior to the cloud upper outline; no text/body/equipment occlusion. Latest reference-engineer confirms connection.
5. P2 sales mobile: heading orphaned final る。 Applied balanced wrap. No isolated final character remains. Minor grammatical line boundary is P3.
6. P2 mobile job decorations reached copy. Clipped decoration to illustration-only region.
7. Header mobile links were visually separate but first grid item's click box overlapped another. Assigned one grid column per navigation item, with logo spanning first two columns above.

## Required surfaces
- Typography: existing Noto Sans / Noto Serif roles retained. Headline lines reveal independently within masks. Same final position and font. 375–430 px copy and controls fit.
- Spacing: overview jobs directly after hero; existing business/learning/support follow. HR remains central-copy composition, sales illustrated hero and dark value section, engineer preserves experience panels and wave boundaries.
- Colors: `--orange:#e89314` unchanged. No logo/foreground recoloring. Background-only tokens apricot #F7D6B5, yellow #F4E4B2, ivory #FFF9EF. Engineer inherited training accents remain; line accents #B7BC7D/#DCC77C are decoration only.
- Images: all 42 public files unchanged by SHA256, no regeneration, no screenshot/photo extraction from references. HR and sales use original approved role-specific assets. AI provenance retained in alt text and pre-existing notes.
- Copy: role copy retained, overview punctuation restored, CTA labels normalized to「まずは話を聞く」「仕事や会社の話を聞く」. Removed LINE wording from sales/HR final explanatory text. No invented benefits, application requirements, time limit or interview promises added.

## Function and accessibility
- `responsive.json`: 20 route/width combinations; no document horizontal overflow, missing images, or off-screen headings/text/buttons/navigation.
- Overview hero #jobs move verified after smooth-scroll settled; target begins 43 px from viewport top at 390 px.
- Three role links and return-to-overview logo exercised, correct relative base routes.
- 9 contact controls: 3 per role. All display the existing honest unset-URL dialog. Enter opens header contact; Tab stays on Close; Escape returns focus to trigger. Close button works.
- Existing explicit focus outline retained. Decorative layers aria-hidden and pointer-events:none.
- Browser console errors queried: none observed.
- TypeScript and Vite build passed. All routes prerendered for no-JS readability.

## Independent visual review
Read-only reviewer opened original references, 4 PC comparisons and 4 mobile top/middle/end contact sheets. Three specific fixes rechecked on latest images: role crop, engineer cloud connection, sales orphan. No remaining P1/P2 within that scope. Review did not independently exercise interactions/video or every full-length pixel; those are implementation-side verification.

## Known constraints / not verified
- `src/config.ts`: all 3 official contact URLs remain null. Actual destination, recruitment handling, whether application is required, selection conditions, preparation and duration are unknown. No external submissions made.
- Existing orange/white CTA contrast approximately 2.44:1. Kept per explicit instruction; requires separate color-authorized work before an accessibility compliance claim. It is not a regression introduced here.
- Reference photos/illustrations are concept materials; actual employee photography not newly supplied.
- No production deployment, main merge, or remote push. Local preview only.
- P3: sales mobile balanced heading can optionally group「一緒に考える／人がいる。」in a future typography pass.

---
## 2026-10-19 HR hero scoped composition QA
Source visual truth: artifacts/hr-fv/before-1440.jpg and before-390.jpg + current user composition brief.
Implementation: artifacts/hr-fv/after-1440.jpg and after-390.jpg.
Full-view comparison: artifacts/hr-fv/comparison-1440.jpg (2880×940), comparison-390.jpg (780×884).
Focused image evidence: artifacts/hr-fv/photo-framing.jpg; original public/assets/hr-interview-oct18.png (1536×1024).
Viewport/state: desktop1440×900, mobile390×844; top of page; initial animation completed. Exact mobile375/390/430 widths also verified using iframe harness. See docs/hr-fv-review.md for browser scaling normalization.

Required fidelity surfaces:
- Typography: title wording/family/72px desktop/2lines/emphasis retained. Body19px desktop only, content unchanged, dangling last-word wrap fixed.
- Spacing/layout: copy lowered64px in normal flow; hero798→690px; picture and illustration moved up into side columns; no face/body/text overlap. Mobile retains vertical flow.
- Colors/tokens: no color tokens modified; all existing brand/background colors preserved.
- Assets: originals unchanged; photo full3:2 contain, old clip removed; illustration opaque internal whites retained; existing three wave paths repositioned only within desktop HR hero.
- Copy: no content changes.

Iteration: P2 photo-to-wave white gap found in first comparison. Raised only the left side of existing hero wave paths. Recaptured after-1440/comparison-1440; independent reviewer re-opened both and confirmed resolution, no further P1/P2.
Interactions: hero CTA setting-wait dialog and Close verified. Console errors: none. Build passed. Formal CTA target remains unset (pre-existing).
final result: passed

---
## 2026-10-19 HR hero finishing pass
Source: 60c36ea rendered as artifacts/hr-fv-finish/before-1440.jpg and before-390.jpg.
Implementation: artifacts/hr-fv-finish/after-1440.jpg and after-390.jpg.
Comparison: artifacts/hr-fv-finish/comparison-1440.jpg (2880×936), comparison-390.jpg (780×1036), photo-detail-comparison.jpg (900×340).
Viewport:1440×900 / 390×1000, DPR1, top of page, settled animation, no normalization required. Additional375/430 screenshots and DOM bounds recorded.
Typography/copy/colors/assets: unchanged. Layout: copy/CTA/photo/illustration rects unchanged; hero690→676px. Photo only lower12–23px overlapped by original ivory wave; hands and both conversation participants visible. Lower apricot band central thickness72→58px (~19% reduction). Existing illustration opaque whites preserved.
Console errors:none. TypeScript/Vite build:passed. Mobile width=scrollWidth at375/390/430, CTA-to-photo spacing24px; no cropping or overlap. Previous CTA behavior remains unchanged.
final result: passed

---
## HR final photo and mobile typography correction
Baseline: 3e357b9; photo framing reference: artifacts/hr-fv-finish/before-1440.jpg.
PC photo moved left24px and placed above the wave, restoring its complete rectangular 3:2 image. No scaling, flipping, asset edit, or crop change. Other fixed hero elements and the reduced lower band retained.
Mobile introduction uses three semantic lines at375/390/430; font17px unchanged. PC retains two lines. No horizontal overflow; CTA-photo gap24px.
Evidence: artifacts/hr-final/; details: docs/hr-final-review.md. Viewports1440×900 and375/390/430×1000; browser scrollbar consumes15px. Raw screenshots retained without dimension normalization.
Build passed, console errors none. Read-only independent review and implementation visual inspection completed, no in-scope P1/P2.
final result: passed

## 2026-10-19 Illustration alpha only
Baseline 4b7a457. Nine illustration PNGs now retain opaque foreground whites while exposing exterior/background gaps. Existing transparent assets and all photos preserved. Removed role-art-window white backing; normal compositing for alpha illustrations. Chrome 4 pages ×375/390/430/1440 verified: loaded images, no horizontal overflow, settled image rectangles unchanged. Light/dark comparisons and independent asset review completed; six matte findings fixed and rechecked. Build passed. See docs/illustration-alpha-review-20261019.md and artifacts/qa/alpha-20261019/. No publication, merge or LINE submission. Mobile device Safari/Android not tested.
