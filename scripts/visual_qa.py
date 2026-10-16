"""Capture real pages and compare at equal width without vertical warping.

Run from repository root: python3 scripts/visual_qa.py --round 1
Requires the Vite server on port 4173, Python Playwright, Pillow and Chromium.
"""
import argparse
import hashlib
import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--round', type=int, required=True)
parser.add_argument('--url', default='http://127.0.0.1:4173')
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
out = root / f'artifacts/qa/round-{args.round}'
out.mkdir(parents=True, exist_ok=True)
masters = json.loads((root/'reference/manifest.json').read_text())
commit = subprocess.check_output(['git','rev-parse','HEAD'],cwd=root,text=True).strip()
source_files = sorted((root/'src').glob('*'))
source_digest = hashlib.sha256(b''.join(p.read_bytes() for p in source_files)).hexdigest()
report = {'utc':datetime.now(timezone.utc).isoformat(), 'commit':commit,
          'source_sha256':source_digest, 'density':1, 'pages':[], 'failures':[]}

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
    report['browser'] = browser.version
    for entry in masters:
        name = entry['page']
        route = '/' if name == 'overview' else f'/{name}/'
        source = root / entry['file']
        assert hashlib.sha256(source.read_bytes()).hexdigest() == entry['sha256']
        page_report = {'name':name, 'route':route, 'viewports':[]}
        for width in (1440,390,768):
            page = browser.new_page(viewport={'width':width,'height':1000},device_scale_factor=1)
            errors = []
            page.on('pageerror',lambda error: errors.append(str(error)))
            page.on('console',lambda message: errors.append(message.text) if message.type=='error' else None)
            response = page.goto(args.url+route,wait_until='networkidle')
            assert response and response.status == 200
            page.evaluate('document.fonts.ready')
            page.evaluate('Promise.all([...document.images].map(i=>i.decode()))')
            assert page.evaluate('devicePixelRatio') == 1
            failures = []
            overflow = page.evaluate('document.documentElement.scrollWidth > innerWidth')
            if overflow: failures.append('horizontal overflow')
            bad_images = page.locator('img').evaluate_all('(imgs)=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)')
            if bad_images: failures.append('broken images')
            if errors: failures.append('console/page errors: '+str(errors))
            if page.locator('h1').count()!=1: failures.append('expected one h1')
            # Check every local section link and role navigation target.
            for link in page.locator('a[href^="#"]').all():
                target=link.get_attribute('href')[1:]
                if not page.locator('[id="'+target+'"]').count(): failures.append('missing anchor '+target)
            if name == 'overview':
                for role in ('sales','hr','engineer'):
                    link=page.locator(f'.job-grid a[href="/{role}/"]')
                    if link.count()!=1: failures.append('missing job navigation '+role)
            else:
                # Activate actual CTA with keyboard, exercise modal focus and Escape.
                cta=page.locator('main button.button').first
                cta.focus(); cta.press('Enter')
                dialog=page.locator('dialog[open]')
                if dialog.count()!=1: failures.append('LINE pending modal did not open')
                else:
                    if 'LINEリンクは設定待ちです' not in dialog.inner_text(): failures.append('missing LINE status')
                    page.keyboard.press('Escape')
                    if page.locator('dialog[open]').count(): failures.append('Escape failed')
                    if not cta.evaluate('(e)=>document.activeElement===e'): failures.append('focus not restored')
                if page.locator('.header .logo').get_attribute('href')!='/': failures.append('missing return route')
            page.locator('h1').click()
            page.evaluate("document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,0)")
            page.screenshot(path=str(out/f'{name}-{width}.png'),full_page=True)
            if width==1440:
                for index,section in enumerate(page.locator('main>section').all()):
                    section.screenshot(path=str(out/f'{name}-section-{index+1}.png'))
                boxes=page.locator('main>section').evaluate_all('(xs)=>xs.map(x=>({class:x.className,top:x.getBoundingClientRect().top+scrollY,height:x.getBoundingClientRect().height}))')
                page_report['sections']=boxes
            viewport_result={'width':width,'height':page.evaluate('document.documentElement.scrollHeight'),
                             'failures':failures, 'font':page.locator('h1').evaluate('(e)=>getComputedStyle(e).fontFamily')}
            page_report['viewports'].append(viewport_result)
            report['failures'].extend([f'{name}/{width}: {f}' for f in failures])
            page.close()
        # Single uniform scale, aligned at page top; pad instead of resizing screenshots.
        master=Image.open(source).convert('RGB')
        master=master.resize((1440,round(master.height*1440/master.width)),Image.Resampling.LANCZOS)
        impl=Image.open(out/f'{name}-1440.png').convert('RGB')
        height=max(master.height,impl.height)
        a=Image.new('RGB',(1440,height),'#e8e8e8');a.paste(master,(0,0))
        b=Image.new('RGB',(1440,height),'#e8e8e8');b.paste(impl,(0,0))
        pair=Image.new('RGB',(2880,height),'white');pair.paste(a,(0,0));pair.paste(b,(1440,0))
        pair.save(out/f'{name}-side-by-side.jpg',quality=90)
        Image.blend(a,b,.5).save(out/f'{name}-overlay.jpg',quality=90)
        ImageChops.difference(a,b).save(out/f'{name}-difference.png')
        page_report['master_dimensions']=[master.width,master.height]
        page_report['implementation_dimensions']=[impl.width,impl.height]
        report['pages'].append(page_report)
    browser.close()
(out/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'output':str(out),'browser':report['browser'],'failures':report['failures']},ensure_ascii=False))
raise SystemExit(bool(report['failures']))
