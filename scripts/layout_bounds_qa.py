"""Actual text bounds and image frames for review regressions, using classic scrollbars."""
import argparse,json,math
from pathlib import Path
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--round',type=int,required=True);args=parser.parse_args();root=Path(__file__).resolve().parents[1];out=root/f'artifacts/qa/round-{args.round}';out.mkdir(exist_ok=True)
rows=[];photos=[]
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'],ignore_default_args=['--hide-scrollbars'])
 for width in (1440,390,768,999,1000,1024,1066,1280,1363):
  page=b.new_page(viewport={'width':width,'height':936},device_scale_factor=1)
  for role in ('overview','sales','hr','engineer'):
   page.goto('http://127.0.0.1:4173/'+('' if role=='overview' else role+'/'),wait_until='networkidle');page.evaluate('document.fonts.ready');page.evaluate('Promise.all([...document.images].map(i=>i.decode()))')
   metrics=page.evaluate('''()=>{const box=s=>{let r=document.querySelector(s).getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom,height:r.height}};const text=s=>{let e=document.querySelector(s),w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT),a=[],n;while(n=w.nextNode()){if(!n.textContent.trim())continue;let r=new Range();r.selectNode(n);a.push(...r.getClientRects())}return {right:Math.max(...a.map(r=>r.right)),bottom:Math.max(...a.map(r=>r.bottom))}};let r={};if(document.querySelector('.overview-hero')){r.copy=text('.hero-copy');r.photo=box('.welcome')}if(document.querySelector('.sales-value')){r.left=text('.sales-value>div:first-child');r.right=box('.value-notes')}if(document.querySelector('.engineer-learning')){r.learning=text('.engineer-learning>div');r.caption=text('.engineer-learning figcaption');r.career=box('.engineer-career h2');r.careerLabel=box('.engineer-career>div:last-child small');r.cta=box('.engineer-cta .button')}return r}''')
   if width>=1200 and role=='overview': assert metrics['copy']['right'] <= metrics['photo']['left']+1,(width,role,metrics)
   if width>=1200 and role=='sales': assert metrics['left']['right'] <= metrics['right']['left']-5,(width,role,metrics)
   if role=='engineer':
    assert metrics['learning']['bottom'] <= metrics['career']['top'],(width,'learning/career',metrics)
    assert metrics['caption']['bottom'] <= metrics['careerLabel']['top'],(width,'caption/career',metrics)
    assert metrics['cta']['right'] <= page.evaluate('document.documentElement.clientWidth'),(width,'CTA',metrics)
   for im in page.locator('img.photo').all():
    x=im.evaluate('''i=>{const r=i.getBoundingClientRect();return {file:i.getAttribute('src'),section:i.closest('section').className,width:r.width,height:r.height,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight}}''');photos.append({'page':role,'viewport':width,**x})
   rows.append({'page':role,'width':width,'passed':True,'bounds':metrics})
  page.close()
 # Capture the existing low-resolution photo at DPR2; no file changes or upscaling.
 page=b.new_page(viewport={'width':1440,'height':1000},device_scale_factor=2)
 for role,selector in [('sales','.sales-team'),('hr','.hr-support')]:
  page.goto('http://127.0.0.1:4173/'+role+'/',wait_until='networkidle');page.evaluate('document.fonts.ready');page.evaluate('Promise.all([...document.images].map(i=>i.decode()))');page.evaluate("document.documentElement.style.scrollBehavior='auto'");page.locator(selector).scroll_into_view_if_needed();page.wait_for_timeout(150);page.locator(selector).screenshot(path=str(out/f'{role}-office-lounge-dpr2.png'))
 b.close()
(out/'layout-bounds-report.json').write_text(json.dumps({'checks':rows,'photo_frames':photos,'dpr2_note':'Existing 750x500 office_lounge.jpg captured at DPR2; no AI upscaling or asset modification.'},ensure_ascii=False,indent=2)+'\n');print(f'{len(rows)} layout bounds scenarios passed; DPR2 originals recorded')
