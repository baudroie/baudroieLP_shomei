// Source-preserving matte refinement. Only explicitly selected background regions
// are removed; white foreground regions and original ink remain protected.
const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const {PNG}=require(process.env.PNGJS_PATH||'pngjs');
const root=path.resolve(__dirname,'..');
const before=path.join(root,'artifacts/qa/alpha-20261019/original');
const configs={
 'sales-hero.png':{barriers:[[[103,903],[241,928]],[[730,847],[746,831]]],protect:[[[715,810],[746,803],[814,814],[746,831],[730,832]]],seeds:[[773,728],[381,675]],holes:[]},
 'overview-role-illustrations.png':{protect:[[[1901,135],[2074,54],[2090,57],[2090,658],[1901,658]]],seeds:[[1876,448],[1255,363],[650,358]],holes:[]},
 'sales-map.png':{barriers:[[[1798,604],[2076,604]],[[2076,604],[2076,566]],[[1414,406],[1434,374]]],protect:[[[104,375],[104,284],[156,284],[156,375]],[[156,373],[156,319],[192,319],[192,373]],[[487,443],[487,342],[524,342],[524,443]],[[525,402],[525,291],[551,283],[593,294],[593,402]],[[601,389],[601,245],[624,233],[669,247],[669,389]],[[676,294],[676,197],[698,186],[747,199],[747,294]]],holes:[]},
 'sales-phone.png':{holes:[]},
 'sales-research.png':{barriers:[[[241,976],[247,1008]],[[304,1069],[345,1069]],[[345,1069],[613,1059]],[[696,1059],[826,1062]],[[826,1062],[910,1066]]],holes:[]},
 'engineer-panorama.png':{barriers:[[[1611,632],[1742,632]],[[265,624],[293,624]]],protect:[[[1238,353],[1296,353],[1296,603],[1238,603]],[[1208,404],[1238,404],[1238,609],[1208,609]],[[1146,434],[1208,434],[1208,609],[1146,609]],[[548,414],[578,414],[578,608],[548,608]]],seeds:[[720,280]],holes:[]},
 'engineer-infrastructure.png':{barriers:[[[0,202],[0,659]],[[0,659],[55,659]]],protect:[[[834,477],[849,471],[866,477],[866,546],[834,546]]],holes:[]},
 'engineer-laptop.png':{holes:[],cream:true},
 'hr-hero.png':{protect:[[[700,777],[707,786],[708,807],[703,824],[687,839],[669,847]]],holes:[]}
};
fs.mkdirSync(before,{recursive:true});const report=[];
for(const [name,cfg] of Object.entries(configs)){
 const dest=path.join(root,'public/assets',name),original=path.join(before,name);
 if(!fs.existsSync(original))fs.writeFileSync(original,execFileSync('git',['show','4b7a457915c4bfeb51b6961eec9a4d7724d741da:public/assets/'+name],{cwd:root,maxBuffer:10*1024*1024}));
 const p=PNG.sync.read(fs.readFileSync(original)),w=p.width,h=p.height,N=w*h;
 const labels=new Int32Array(N),barrier=new Uint8Array(N),q=new Int32Array(N),regions=[];
 for(const [a,b] of cfg.barriers||[]){let len=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1]));for(let t=0;t<=len;t++){let x=Math.round(a[0]+(b[0]-a[0])*t/len),y=Math.round(a[1]+(b[1]-a[1])*t/len);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(x+dx>=0&&x+dx<w&&y+dy>=0&&y+dy<h)barrier[(y+dy)*w+x+dx]=1;}}
 function white(i){const j=i*4,r=p.data[j],g=p.data[j+1],b=p.data[j+2];return !barrier[i]&&Math.min(r,g,b)>210&&Math.max(r,g,b)-Math.min(r,g,b)<25&&!(cfg.cream&&r-b>6)}
 let id=0;for(let i=0;i<N;i++){if(labels[i]||!white(i))continue;id++;let head=0,tail=0;q[tail++]=i;labels[i]=id;let minx=w,miny=h,maxx=0,maxy=0,sx=0,sy=0;
 while(head<tail){const t=q[head++],x=t%w,y=Math.floor(t/w);minx=Math.min(x,minx);maxx=Math.max(x,maxx);miny=Math.min(y,miny);maxy=Math.max(y,maxy);sx+=x;sy+=y;for(const v of [x>0?t-1:-1,x<w-1?t+1:-1,y>0?t-w:-1,y<h-1?t+w:-1])if(v>=0&&!labels[v]&&white(v)){labels[v]=id;q[tail++]=v;}}
 regions.push({id,n:tail,box:[minx,miny,maxx,maxy],center:[Math.round(sx/tail),Math.round(sy/tail)],edge:minx===0||miny===0||maxx===w-1||maxy===h-1});}
 const remove=new Set([...regions.filter(r=>r.edge).map(r=>r.id),...cfg.holes,...(cfg.seeds||[]).map(([x,y])=>labels[y*w+x]).filter(Boolean)]);
 const out=new PNG({width:w,height:h});p.data.copy(out.data);const removed=new Uint8Array(N);
 for(let i=0;i<N;i++)if(remove.has(labels[i])){out.data[i*4+3]=0;removed[i]=1;}
 // Manually bounded white objects with deliberately open illustration contours.
 for(const poly of cfg.protect||[]){const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);for(let y=Math.min(...ys);y<=Math.max(...ys);y++)for(let x=Math.min(...xs);x<=Math.max(...xs);x++){let inside=false;for(let a=0,b=poly.length-1;a<poly.length;b=a++){const A=poly[a],B=poly[b];if((A[1]>y)!=(B[1]>y)&&x<(B[0]-A[0])*(y-A[1])/(B[1]-A[1])+A[0])inside=!inside;}const i=y*w+x;if(inside&&removed[i]){removed[i]=0;out.data[i*4+3]=255;}}}
 // Decontaminate only the 2px outer antialiased fringe, never interior whites.
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x,j=i*4;if(removed[i]||barrier[i])continue;const min=Math.min(p.data[j],p.data[j+1],p.data[j+2]);if(min<100)continue;
 let near=false;for(let dy=-2;dy<=2&&!near;dy++)for(let dx=-2;dx<=2;dx++)if(y+dy>=0&&y+dy<h&&x+dx>=0&&x+dx<w&&removed[(y+dy)*w+x+dx]){near=true;break;}
 if(near){let a=Math.min(1,(255-min)/155);out.data[j+3]=Math.round(255*a);if(a>0)for(let k=0;k<3;k++)out.data[j+k]=Math.max(0,Math.round((p.data[j+k]-255*(1-a))/a));}}
 // The original pale floor ellipse has no ink outline. Smooth its selected
 // matte boundary with local foreground colour, without changing its interior.
 if(cfg.cream){const data=Buffer.from(out.data);for(let y=580;y<h-1;y++)for(let x=1;x<w-1;x++){let j=(y*w+x)*4;if(Math.min(p.data[j],p.data[j+1],p.data[j+2])<215)continue;let weight=0,alpha=0,colors=[0,0,0],colorWeight=0,hasClear=false,hasCream=false;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const k=((y+dy)*w+x+dx)*4,wt=(dx===0?2:1)*(dy===0?2:1);weight+=wt;alpha+=data[k+3]*wt;if(data[k+3]===0)hasClear=true;if(data[k+3]>240&&p.data[k]-p.data[k+2]>8){hasCream=true;colorWeight+=wt;for(let c=0;c<3;c++)colors[c]+=p.data[k+c]*wt;}}if(hasCream&&hasClear){out.data[j+3]=Math.round(alpha/weight);for(let c=0;c<3;c++)out.data[j+c]=Math.round(colors[c]/colorWeight);}}}
 fs.writeFileSync(dest,PNG.sync.write(out));
 const dark=new PNG({width:w,height:h});for(let i=0;i<N;i++){const j=i*4,a=out.data[j+3]/255;for(let k=0;k<3;k++)dark.data[j+k]=Math.round(out.data[j+k]*a+[45,63,77][k]*(1-a));dark.data[j+3]=255;}
 fs.writeFileSync(path.join(root,'artifacts/qa/alpha-20261019',name),PNG.sync.write(dark));
 report.push({name,width:w,height:h,remove:[...remove],regions:regions.filter(r=>r.n>150),zero:removed.reduce((a,b)=>a+b,0)});
}
fs.writeFileSync(path.join(root,'artifacts/qa/alpha-20261019/regions.json'),JSON.stringify(report,null,2));
console.log(report.map(r=>({name:r.name,zero:r.zero,regions:r.regions.length})));
