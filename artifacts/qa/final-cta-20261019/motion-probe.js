// Local preview-only observer. No styles, scrolling, animation or application state are changed.
(() => {
 const output=document.createElement('script'); output.type='application/json';output.id='qa-motion-observations';document.body.append(output);
 const frames=[];const starts=new Map();const firsts=new Map();const finished=new Set();
 function tick(){
  const now=performance.now();
  const targets=[...document.querySelectorAll('.jobs-return h2,.sales-cta h2,.hr-cta h2,.engineer-cta h2,[data-motion-heading]')];
  for(const h of targets){
   const key=h.textContent;const rect=h.getBoundingClientRect();if(rect.bottom<=102||rect.top>=innerHeight||finished.has(key))continue;
   if(!starts.has(key))starts.set(key,now);
   let nodes=[h,...h.querySelectorAll('*')];for(let p=h.parentElement;p;p=p.parentElement)nodes.push(p);
   const affected=document.getAnimations().filter(a=>nodes.includes(a.effect?.target));
   const frame={text:key,final:!h.hasAttribute('data-motion-heading'),ms:Math.round(now-starts.get(key)),top:rect.top,minOpacity:Math.min(...nodes.map(n=>+getComputedStyle(n).opacity)),animations:affected.map(a=>({target:a.effect.target.className,duration:a.effect.getTiming().duration,delay:a.effect.getTiming().delay}))};
   if(!firsts.has(key))firsts.set(key,frame);
   frames.push(frame);if(frame.ms>=1100)finished.add(key);
  }
  output.textContent=JSON.stringify({reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,frames});
  requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
})();
