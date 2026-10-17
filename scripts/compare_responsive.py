"""Before/after evidence: identical viewports, global page origin, no rescaling."""
import argparse,json
from pathlib import Path
from PIL import Image
p=argparse.ArgumentParser();p.add_argument('--before',type=int,required=True);p.add_argument('--after',type=int,required=True);p.add_argument('--widths',default='1000,1066,1280,1363,1440');a=p.parse_args();root=Path(__file__).resolve().parents[1];out=root/f'artifacts/qa/round-{a.after}/before-after';out.mkdir(exist_ok=True)
before=root/f'artifacts/qa/round-{a.before}/responsive';after=root/f'artifacts/qa/round-{a.after}/responsive';manifest={'method':'No rescaling. Page top/global y aligned. Pad to maximum original canvas size. Baseline overflow is retained, never cropped away. Left before, right after.','before':json.loads((before/'report.json').read_text())['commit'],'after':json.loads((after/'report.json').read_text())['commit'],'files':[]}
for width in map(int,a.widths.split(',')):
 for role in ('overview','sales','hr','engineer'):
  x=Image.open(before/f'{role}-{width}.png').convert('RGB');y=Image.open(after/f'{role}-{width}.png').convert('RGB');w=max(x.width,y.width);h=max(x.height,y.height);pair=Image.new('RGB',(w*2,h),'#e8e8e8');pair.paste(x,(0,0));pair.paste(y,(w,0));name=f'{role}-{width}.jpg';pair.save(out/name,quality=90);manifest['files'].append({'file':name,'viewport':width,'before_dimensions':list(x.size),'after_dimensions':list(y.size),'pane_width':w})
(out/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');print(f'{len(manifest["files"])} before/after pairs saved')
