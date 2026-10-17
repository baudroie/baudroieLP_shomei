const { chromium } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright');
const fs=require('fs');
(async()=>{
 const dir=process.cwd()+'/artifacts/qa/round-22';fs.mkdirSync(dir,{recursive:true});
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',headless:true,args:['--no-sandbox','--disable-gpu','--disable-software-rasterizer','--use-gl=disabled','--disable-dev-shm-usage','--no-zygote','--single-process']});
 let results=[]; const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1});
 for(const width of [1440,390,768,1066,1280]) for(const route of ['','sales','hr','engineer']) {
 await page.setViewportSize({width,height:1000}); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/'+route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
 await page.screenshot({path:`${dir}/${route||'overview'}-${width}.png`,fullPage:true});
 const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>document.documentElement.clientWidth,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src),sources:[...document.querySelectorAll('figcaption')].map(x=>x.textContent),photos:[...document.querySelectorAll('.overview-support img,.hr-support img')].map(i=>({src:i.src,width:i.width,height:i.height,position:getComputedStyle(i).objectPosition})),height:document.documentElement.scrollHeight}));
 if(route==='hr'||route==='')await page.locator(route?'#hr-support':'#support').screenshot({path:`${dir}/${route||'overview'}-support-${width}.png`});
 if(route){await page.locator('main button.button').first().click();if(await page.locator('dialog[open]').count()!==1)errors.push('CTA modal failed');}
 results.push({route:route||'overview',width,...metrics,errors}); }
 fs.writeFileSync(dir+'/report.json',JSON.stringify(results,null,2));await browser.close();console.log(JSON.stringify(results.map(({route,width,overflow,broken,errors})=>({route,width,overflow,broken,errors})),null,2));
})();
