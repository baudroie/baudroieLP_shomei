"""Record actual masks/crop geometry and stable focused evidence, without inferring visual approval."""
import argparse,json,hashlib,subprocess
from pathlib import Path
from datetime import datetime,timezone
from playwright.sync_api import sync_playwright
p=argparse.ArgumentParser();p.add_argument('--round',type=int,required=True);a=p.parse_args();root=Path.cwd();out=root/f'artifacts/qa/round-{a.round}/subjects';out.mkdir(parents=True,exist_ok=True)
if (out/'report.json').exists():raise SystemExit('Use a new round; evidence cannot be overwritten')
report={'source_commit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'utc':datetime.now(timezone.utc).isoformat(),'src':{str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(Path('src').glob('*')) if p.is_file()},'checks':[]}
selectors={'overview':['.overview-hero','.learning','.overview-support','.jobs'],'sales':['.sales-hero','.sales-team','.sales-cta'],'hr':['.hr-hero','.hr-support','.hr-team','.hr-cta'],'engineer':['.engineer-hero','.engineer-paths','.engineer-team']}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);report['browser']=b.version
 for width in [1440,1280,1066,768,390]:
  for role,sels in selectors.items():
   page=b.new_page(viewport={'width':width,'height':844 if width==390 else 800},device_scale_factor=1)
   page.goto('http://127.0.0.1:4173/'+('' if role=='overview' else role+'/'),wait_until='networkidle');page.evaluate('document.fonts.ready');page.evaluate('Promise.all([...document.images].map(i=>i.decode()))')
   page.evaluate("document.documentElement.style.scrollBehavior='auto'")
   for sel in sels:
    el=page.locator(sel);el.scroll_into_view_if_needed();page.wait_for_timeout(180)
    el.screenshot(path=str(out/f'{role}-{width}-{sel[1:]}.png'))
    report['checks'].append({'page':role,'width':width,'section':sel,'clientWidth':page.evaluate('document.documentElement.clientWidth'),'scrollWidth':page.evaluate('document.documentElement.scrollWidth'),'images':el.locator('img').evaluate_all('imgs=>imgs.map(i=>{const s=getComputedStyle(i),r=i.getBoundingClientRect();return {src:i.getAttribute("src"),natural:[i.naturalWidth,i.naturalHeight],box:[r.width,r.height],fit:s.objectFit,position:s.objectPosition,mask:s.maskImage,clip:s.clipPath}})')})
   page.close()
 b.close()
(out/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print('Saved',len(report['checks']),'focused subject checks; visual review remains required')
