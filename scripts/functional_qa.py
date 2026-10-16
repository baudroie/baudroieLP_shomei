"""Actual navigation, keyboard, focus, media bounds, and responsive smoke tests."""
import json
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

root=Path(__file__).resolve().parents[1]
results=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    for width in (1440,390,768):
        page=browser.new_page(viewport={'width':width,'height':1000},device_scale_factor=1)
        page.emulate_media(reduced_motion='reduce')
        for role in ('sales','hr','engineer'):
            page.goto('http://127.0.0.1:4173/')
            page.locator(f'.job-grid a[href="/{role}/"]').click()
            page.wait_for_url(f'**/{role}/')
            assert page.locator('h1').is_visible()
            for link in page.locator('.header a[href^="#"]').all():
                target=link.get_attribute('href')
                link.click()
                top=page.locator(target).evaluate('(e)=>e.getBoundingClientRect().top')
                assert top >= -1,(role,width,target,top)
            cta=page.locator('main button.button:visible').last
            cta.focus();cta.press('Enter')
            dialog=page.locator('dialog[open]')
            dialog.wait_for(state='visible')
            assert 'LINEリンクは設定待ちです' in dialog.inner_text()
            # Focus must stay inside the native modal while tabbing.
            page.keyboard.press('Tab')
            assert dialog.evaluate('(d)=>d.contains(document.activeElement)')
            page.keyboard.press('Escape')
            assert cta.evaluate('(e)=>e===document.activeElement')
            assert not page.evaluate('document.documentElement.scrollWidth>document.documentElement.clientWidth')
            if width==1440 and role=='hr':
                title=page.locator('.hr-support h2')
                assert title.evaluate('(e)=>e.getBoundingClientRect().height < parseFloat(getComputedStyle(e).fontSize)*1.6')
            if width==1440 and role=='engineer':
                for article in page.locator('.path-grid>article').all():
                    art=article.locator('.path-illustration').bounding_box();labels=article.locator('.path-skills').bounding_box()
                    assert art['y']+art['height'] <= labels['y']
                    assert labels['y']+labels['height'] <= article.bounding_box()['y']+article.bounding_box()['height']
                caption=page.locator('.engineer-learning figcaption').bounding_box()
                career_label=page.locator('.engineer-career>div:last-child small').bounding_box()
                assert caption['y']+caption['height'] <= career_label['y']
            if width<1000 and role=='sales':
                headline=page.locator('.sales-value h2')
                second=headline.locator('span')
                assert second.bounding_box()['y'] >= headline.bounding_box()['y'] + 40
            if width<1000:
                for link in page.locator('.header nav a:visible,.header nav button:visible,.footer a:visible').all():
                    box=link.bounding_box()
                    assert box['height']>=43.9,(role,width,link.inner_text(),box)
            page.locator('.header .logo').click();page.wait_for_url('http://127.0.0.1:4173/')
            assert page.locator('#overview-title').is_visible()
            growth=page.locator('.growth').bounding_box();business=page.locator('.business').bounding_box()
            assert growth['y']+growth['height'] <= business['y']+business['height']+1
            assert page.locator('.service-symbol img').count()==4
            for icon in page.locator('.service-symbol img').all():
                assert icon.evaluate('(i)=>i.complete && i.naturalWidth>0')
            results.append({'width':width,'role':role,'navigation':'passed','keyboard_modal':'passed','bounds':'passed'})
        page.close()
    browser.close()
out=root/'artifacts/qa/functional-report.json'
out.write_text(json.dumps({'utc':datetime.now(timezone.utc).isoformat(),'checks':results},ensure_ascii=False,indent=2)+'\n')
print(f'{len(results)} navigation/keyboard/layout scenarios passed; {out}')
