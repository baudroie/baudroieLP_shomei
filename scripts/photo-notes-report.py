"""Package captured browser evidence; does not drive or modify a browser."""
from pathlib import Path
import base64, hashlib, json, subprocess
from datetime import datetime, timezone

root = Path(__file__).resolve().parents[1]
out = root / 'artifacts/photo-notes'
names = {'overview': 'まとめ', 'hr': '人事', 'sales': '営業', 'engineer': 'エンジニア'}
def image(file):
    jpg = file.with_suffix('.jpg')
    subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '78', str(file), '--out', str(jpg)], check=True, stdout=subprocess.DEVNULL)
    return 'data:image/jpeg;base64,' + base64.b64encode(jpg.read_bytes()).decode()

source = {str(p.relative_to(root)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted((root/'src').glob('*')) if p.is_file()}
selected = {f'{prefix}{role}-{width}.png' for role in names for width in [1440,390,375,430] for prefix in ['', 'footer-']}
selected |= {f'before-{role}-{width}.png' for role in names for width in [1440,390]}
evidence = {p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(out.glob('*.png')) if p.name in selected}
manifest = {'created_utc':datetime.now(timezone.utc).isoformat(),'base_commit':'ef9a113d273a738f81d0843738597622379e0e07','source_sha256':source,'evidence_sha256':evidence,'note':'Local Chrome captures; previews only. No production update.'}
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
html = ['''<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ボードルアLP 写真注記・折返し修正</title><style>body{font-family:system-ui,sans-serif;color:#202020;background:#faf9f6;line-height:1.8;max-width:1460px;margin:auto;padding:28px}h1{font-size:30px}h2{font-size:23px;margin-top:36px}p{max-width:950px}summary{cursor:pointer;padding:16px;background:#fff;font-weight:700}details{margin:18px 0;border:1px solid #ddd}img{display:block;width:100%;height:auto}.pair{display:grid;grid-template-columns:1fr 1fr;align-items:start;gap:12px}.pair figure{margin:0;min-width:0}figcaption{padding:12px;background:#eee;position:sticky;top:0}table{border-collapse:collapse;width:100%}td,th{padding:10px;border-bottom:1px solid #ccc;text-align:left}.footers{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}a{color:#18567d}@media(max-width:700px){body{padding:16px}.pair{min-width:700px}.scroll{overflow-x:auto}.footers{grid-template-columns:1fr 1fr}}</style>
<h1>写真注記と折り返しを整理した4ページ</h1><p>2026年10月19日｜実装・プレビュー検証済み。公開サイトへの反映は未実施。</p>
<p><a href="https://github.com/baudroie/baudroieLP_shomei/pull/2">実装PR #2</a>／比較基準：公開版 ef9a113（CSS index-DCIR0hE-.css）</p>
<table><tr><th>項目</th><th>変更・検証</th></tr><tr><td>写真注記</td><td>4ページの写真直下・フッターのAI生成注記を削除。空の注記要素と関連余白を整理。</td></tr><tr><td>写真・alt</td><td>画像内容を簡潔に説明。エンジニア技術カレッジをまとめで使う公式研修写真へ。人事冒頭の承認済み写真・切抜きは維持。</td></tr><tr><td>折り返し</td><td>フッター会社名・各リンクとCTA「こちらから。」を保護。まとめ事業見出しの「る。」だけの改行も修正。</td></tr><tr><td>1440 / 390 / 375 / 430px</td><td>4ページを撮影。画像欠落・横溢れ・写真注記残り0。ページ内3ナビ×16条件を確認。末尾でも固定ヘッダーtop=0。</td></tr><tr><td>動き</td><td>通常モーションを維持。reduced-motionのCSS・ロジックは不変。今回のライブ設定切替は再実施していません。</td></tr></table>
<h2>人事の仕事内容は確認待ち</h2><p>採用企画、候補者対応、入社前の学習・相談対応、先輩エンジニアとの橋渡し、配属後フォローが実際の人事の担当範囲か確認が必要です。「業務内容は想定を含みます」の注記を保持しています。</p>
<p>別の読取専用レビュー担当が16枚の全体画像とソース差分を確認し、今回差分に重大な漏れは見つかりませんでした。サイト全体の最終検収や募集内容の事実確認完了を示すものではありません。</p>
<h2>公開版との比較</h2><p>左が現在の公開版、右が修正版。各ペアは同じブラウザ幅。画像の高さはそろえず、そのまま表示しています。</p>''']
for width in [1440,390]:
    for role,name in names.items():
        html.append(f'<details><summary>{name}｜{width}px</summary><div class="scroll"><div class="pair"><figure><figcaption>公開版</figcaption><img alt="{name}の公開版" src="{image(out/f"before-{role}-{width}.png")}"></figure><figure><figcaption>修正版</figcaption><img alt="{name}の修正版" src="{image(out/f"{role}-{width}.png")}"></figure></div></div></details>')
html.append('<h2>390pxの最終CTA・フッター</h2><div class="footers">')
for role,name in names.items():
    html.append(f'<figure><figcaption>{name}</figcaption><img alt="{name}のCTAとフッター" src="{image(out/f"footer-{role}-390.png")}"></figure>')
html.append('</div><h2>375px・430pxの補足確認</h2>')
for width in [375,430]:
    html.append(f'<details><summary>{width}px の4ページ</summary><div class="footers">')
    for role,name in names.items():
        html.append(f'<figure><figcaption>{name}</figcaption><img alt="{name} {width}px" src="{image(out/f"{role}-{width}.png")}"></figure>')
    html.append('</div></details>')
html.append('<p>画像・ソースのハッシュはPR内 artifacts/photo-notes/manifest.json、操作記録はinteractions.json。LINE友だち追加後の初回メッセージやタグ設定は今回の検証対象外です。</p></html>')
dest=out/'baudroie-photo-notes-review-20261019.html'
dest.write_text(''.join(html))
print(json.dumps({'path':str(dest),'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}))
