"""Check copy overlay against manually identified source photo faces/head/hand regions."""
import argparse,json,subprocess,hashlib,math,io
from pathlib import Path
from PIL import Image,ImageChops
from playwright.sync_api import sync_playwright
p=argparse.ArgumentParser();p.add_argument('--round',type=int,required=True);p.add_argument('--url',default='http://127.0.0.1:4173');p.add_argument('--subdir',default='face-protection');a=p.parse_args();out=Path(f'artifacts/qa/round-{a.round}/{a.subdir}');out.mkdir(parents=True,exist_ok=True)
if (out/'report.json').exists():raise SystemExit('Choose a new evidence round')
regions={'left_woman_face':[115,185,155,250],'center_man_face':[250,135,294,198],'right_woman_face':[425,145,470,216],'foreground_head':[195,285,265,340],'center_hands':[230,228,275,260],'right_hands':[375,260,413,295]}
report={'source_commit':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'asset_sha256':hashlib.sha256(Path('public/assets/office_lounge.jpg').read_bytes()).hexdigest(),'source_regions':regions,'url':a.url,'note':'Manual source-space regions; compares exact same render with caption on/off. Visual review still required.','checks':[],'failures':[]}
with sync_playwright() as p:
 b=p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);report['browser']=b.version
 for width in [1440,1280,1066,768,390]:
  page=b.new_page(viewport={'width':width,'height':1000},device_scale_factor=1);page.goto(a.url.rstrip('/')+'/sales/',wait_until='networkidle');page.evaluate('document.fonts.ready');page.evaluate('Promise.all([...document.images].map(i=>i.decode()))');page.locator('h1').click();page.evaluate("document.documentElement.style.scrollBehavior='auto';window.scrollTo({top:0,behavior:'instant'})");page.wait_for_timeout(150)
  box=page.locator('.sales-team > img').evaluate('i=>{const r=i.getBoundingClientRect(),s=getComputedStyle(i);return {x:r.x,y:r.y,width:r.width,height:r.height,fit:s.objectFit,position:s.objectPosition}}')
  regular=Image.open(io.BytesIO(page.screenshot(full_page=True))).convert('RGB');page.locator('.team-caption').evaluate("e=>e.style.visibility='hidden'");clear=Image.open(io.BytesIO(page.screenshot(full_page=True))).convert('RGB');page.locator('.team-caption').evaluate("e=>e.style.visibility=''")
  sx=box['width']/750;sy=box['height']/500;scale=min(sx,sy) if box['fit']=='contain' else max(sx,sy);pos=[float(x.strip('%'))/100 for x in box['position'].split()];ox=box['x']+(box['width']-750*scale)*pos[0];oy=box['y']+(box['height']-500*scale)*pos[1]
  row={'width':width,'box':box,'regions':[]}
  for name,(x1,y1,x2,y2) in regions.items():
   rect=[ox+x1*scale,oy+y1*scale,ox+x2*scale,oy+y2*scale];visible=rect[0]>=box['x']-.5 and rect[1]>=box['y']-.5 and rect[2]<=box['x']+box['width']+.5 and rect[3]<=box['y']+box['height']+.5
   crop=tuple(round(z) for z in rect);diff=ImageChops.difference(regular.crop(crop),clear.crop(crop));covered=diff.getbbox() is not None
   row['regions'].append({'name':name,'screen_rect':rect,'inside_photo':visible,'caption_changes_pixels':covered})
   if covered or not visible:report['failures'].append(f'{width}/{name}: overlay={covered}, inside={visible}')
  report['checks'].append(row);page.close()
 b.close()
(out/'report.json').write_text(json.dumps(report,indent=2));print(json.dumps({'checks':len(report['checks']),'failures':report['failures']}))
raise SystemExit(bool(report['failures']))
