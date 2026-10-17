"""Verify the built GitHub Pages site locally or at an explicit deployed URL."""
import argparse, functools, http.server, json, threading
from pathlib import Path
from playwright.sync_api import sync_playwright
p=argparse.ArgumentParser();p.add_argument('--url');p.add_argument('--output',default='artifacts/qa/pages/local');args=p.parse_args()
root=Path(__file__).resolve().parents[1];out=root/args.output;out.mkdir(parents=True,exist_ok=True)
server=None
if not args.url:
    class Handler(http.server.SimpleHTTPRequestHandler):
        def translate_path(self,path):
            return super().translate_path(path.removeprefix('/baudroieLP_shomei'))
        def log_message(self,*args): pass
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Handler,directory=str(root/'dist')))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    url=f'http://127.0.0.1:{server.server_port}/baudroieLP_shomei/'
else: url=args.url.rstrip('/')+'/'
results=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for width in (1440,390,768):
        page=browser.new_page(viewport={'width':width,'height':1000},device_scale_factor=1)
        errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        for role in ('overview','sales','hr','engineer'):
            route='' if role=='overview' else role+'/'
            response=page.goto(url+route,wait_until='networkidle');assert response.status==200
            page.evaluate('document.fonts.ready');page.evaluate('Promise.all([...document.images].map(i=>i.decode()))')
            assert not errors,errors
            assert page.locator('h1').count()==1
            assert 'ページが見つかりません' not in page.locator('h1').inner_text()
            assert not page.evaluate('document.documentElement.scrollWidth>document.documentElement.clientWidth')
            assert page.locator('img').evaluate_all('(xs)=>xs.every(i=>i.complete&&i.naturalWidth>0)')
            assert page.evaluate('document.fonts.check(\'700 20px "Noto Sans CJK JP"\')')
            assert page.locator('.logo').first.get_attribute('href')=='/baudroieLP_shomei/'
            if role=='overview':
                link=page.locator('.job-grid a').first;link.click();page.wait_for_url(url+'sales/')
                assert '大手企業の課題に' in page.locator('h1').inner_text()
                page.locator('.logo').first.click();page.wait_for_url(url)
            else:
                button=page.locator('main button.button').first;button.focus();button.press('Enter')
                assert 'LINEリンクは設定待ちです' in page.locator('dialog[open]').inner_text()
                page.keyboard.press('Escape');assert button.evaluate('(e)=>e===document.activeElement')
            page.locator('h1').click();page.evaluate('window.scrollTo(0,0)')
            page.screenshot(path=str(out/f'{role}-{width}.png'),full_page=True)
            results.append({'page':role,'width':width,'status':response.status,'passed':True})
        page.close()
    browser.close()
(out/'report.json').write_text(json.dumps({'url':url,'deployment':json.loads((root/'dist/deployment.json').read_text()),'checks':results},ensure_ascii=False,indent=2)+'\n')
if server:server.shutdown()
print(f'{len(results)} Pages build checks passed: {out}')
