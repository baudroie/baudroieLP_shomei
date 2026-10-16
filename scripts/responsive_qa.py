"""Classic-scrollbar responsive captures, with clientWidth based overflow checks."""
import argparse,hashlib,json,subprocess
from datetime import datetime,timezone
from pathlib import Path
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser();parser.add_argument('--round',type=int,required=True);parser.add_argument('--widths',default='1440,390,768,999,1000,1024,1066,1280,1363');parser.add_argument('--baseline',action='store_true');parser.add_argument('--height',type=int,default=800);args=parser.parse_args()
root=Path(__file__).resolve().parents[1];out=root/f'artifacts/qa/round-{args.round}/responsive';out.mkdir(parents=True,exist_ok=True)
if (out/'report.json').exists():raise SystemExit('Recorded round exists: choose a fresh round.')
assets=[{'file':str(p.relative_to(root)),'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted((root/'public').rglob('*')) if p.is_file()]
report={'utc':datetime.now(timezone.utc).isoformat(),'commit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'source_sha256':hashlib.sha256(b''.join(p.read_bytes() for p in sorted((root/'src').glob('*')))).hexdigest(),'asset_tree_sha256':hashlib.sha256(json.dumps(assets,sort_keys=True).encode()).hexdigest(),'scrollbars':'classic: ignore --hide-scrollbars','dpr':1,'checks':[],'failures':[]}
focus={'overview':['.overview-hero','.jobs'],'sales':['.sales-intro','.sales-value'],'hr':['.hr-hero','.hr-planning','.hr-support','.hr-value'],'engineer':['.engineer-learning','.engineer-career','.engineer-team','.engineer-cta']}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'],ignore_default_args=['--hide-scrollbars'])
 report['browser']=b.version
 for width in map(int,args.widths.split(',')):
  for role in focus:
   page=b.new_page(viewport={'width':width,'height':args.height},device_scale_factor=1);page.emulate_media(reduced_motion='reduce')
   errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
   response=page.goto('http://127.0.0.1:4173/'+('' if role=='overview' else role+'/'),wait_until='networkidle')
   page.evaluate("document.documentElement.style.scrollBehavior='auto'");page.evaluate('document.fonts.ready');page.evaluate('Promise.all([...document.images].map(i=>i.decode()))')
   page.evaluate("window.scrollTo({top:0,behavior:'instant'})");page.wait_for_function('scrollY===0');page.wait_for_timeout(120)
   metrics=page.evaluate('''()=>{const r=document.documentElement;return {innerWidth,clientWidth:r.clientWidth,scrollWidth:r.scrollWidth,offenders:[...document.querySelectorAll('main *')].filter(e=>e.getBoundingClientRect().right>r.clientWidth+.5).map(e=>({tag:e.tagName,class:e.className,right:e.getBoundingClientRect().right})).slice(0,25)}}''')
   row={'page':role,'width':width,**metrics,'errors':errors,'sections':{}}
   for selector in focus[role]:
    el=page.locator(selector);row['sections'][selector]=el.evaluate('''e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {x:r.x,y:r.y+scrollY,width:r.width,height:r.height,fontSize:s.fontSize,fontWeight:s.fontWeight,color:s.color,lineHeight:s.lineHeight,images:[...e.querySelectorAll('img')].map(i=>{const b=i.getBoundingClientRect(),s=getComputedStyle(i);return {src:i.getAttribute('src'),width:b.width,height:b.height,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight,objectFit:s.objectFit}})}}''')
   page.screenshot(path=str(out/f'{role}-{width}.png'),full_page=True)
   if width in (1066,1440):
    for selector in focus[role]:
     el=page.locator(selector);el.scroll_into_view_if_needed();page.wait_for_timeout(120);el.screenshot(path=str(out/f'{role}-{width}-{selector[1:]}.png'))
   if metrics['scrollWidth']>metrics['clientWidth']:report['failures'].append(f'{role}/{width} overflow {metrics["scrollWidth"]}>{metrics["clientWidth"]}')
   if errors:report['failures'].append(f'{role}/{width} page errors')
   assert response.status==200
   report['checks'].append(row);page.close()
 b.close()
(out/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps({'checks':len(report['checks']),'failures':report['failures']},ensure_ascii=False));raise SystemExit(0 if args.baseline else bool(report['failures']))
