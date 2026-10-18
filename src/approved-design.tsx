import { useEffect, type RefObject } from 'react';

/** Decorative SVG geometry expressly specified in the approved handoff. */
export function Motif({kind, compact=false}: {kind: 'overview' | 'hr' | 'sales' | 'engineer'; compact?: boolean}) {
 return <div className={`approved-motif motif-${kind}${compact ? ' motif-compact' : ''}`} aria-hidden="true">
  {kind === 'overview' ? <svg viewBox="0 0 1440 800" preserveAspectRatio="none"><path className="apricot" d="M570 0H690V660L570 686Z"/><path className="yellow" d="M840 105L1440 35V115L840 185Z"/><path className="apricot" d="M1370 80H1440V790L1370 754Z"/><path className="ivory" d="M0 696L690 565V628L0 760Z"/></svg>
  : kind === 'hr' ? <svg viewBox="0 0 1440 800" preserveAspectRatio="none"><path className="ivory" d="M-150 570C280 920 640 270 1060 470S1460 350 1600 200L1600 450C1310 900 1050 530 790 610S190 1030-150 750Z"/><path className="yellow" d="M-150 635C280 980 650 380 1070 520S1490 380 1600 280L1600 400C1280 820 1090 620 790 690S180 1070-150 770Z"/><path className="apricot" d="M-150 710C250 1030 670 505 1050 590S1460 490 1600 350L1600 435C1320 850 1100 690 820 745S210 1110-150 800Z"/></svg>
  : kind === 'sales' ? <svg viewBox="0 0 1440 800" preserveAspectRatio="none"><path className="yellow" d="M735 90L1460 35L1470 720L710 630L720 580L708 550Z"/><path className="apricot" d="M880-30L1480 75L1460 780L715 680L728 660L716 646L730 632L720 616L842 145Z"/><path className="ivory" d="M-30 660L1130 770L1100 820L-30 760Z"/><path className="paper-edge" d="M718 620L735 608L727 592L742 580M844 144L857 137L852 120M1390 770L1405 759L1424 767"/></svg>
  : <svg viewBox="0 0 1440 800" preserveAspectRatio="none">{Array.from({length:9},(_,i)=><path className={`connection connection-${i%3}`} key={i} pathLength="1" d={`M${1424-i*10} -20 V${40+i*10} Q${1424-i*10} ${75+i*10} ${1385-i*10} ${75+i*10} H${1145-i*10} Q${1108-i*10} ${75+i*10} ${1108-i*10} ${110+i*10} V${405+i*10} Q${1108-i*10} ${440+i*10} ${1070-i*10} ${440+i*10} H${760-i*10} Q${723-i*10} ${440+i*10} ${723-i*10} ${475+i*10} V${550+i*9} Q${723-i*10} ${585+i*9} ${685-i*10} ${585+i*9} H${120-i*8} Q${85-i*8} ${585+i*9} ${65-i*8} ${610+i*9} L-20 ${690+i*9}`} />)}</svg>}
 </div>;
}

export function useApprovedMotion(root: RefObject<HTMLDivElement | null>) {
 useEffect(()=>{
  const el=root.current; if(!el || !el.animate) return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const running=new Set<Animation>();
  const play=(node:Element, frames:Keyframe[], delay=0, duration=560)=>{
   const a=node.animate(frames,{duration,delay,easing:'cubic-bezier(.22,.7,.25,1)',fill:'backwards'});
   running.add(a);a.onfinish=()=>running.delete(a);
  };
  let observer:IntersectionObserver|undefined;
  if(!media.matches){
   const h1=el.querySelector('h1');
   const lines=el.querySelectorAll('.eng-title-line > span, .approved-title-line > span');
   (lines.length ? lines : h1 ? [h1] : []).forEach((n,i)=>play(n,[{transform:'translateY(16px)',opacity:0},{transform:'translateY(0)',opacity:1}],i*120));
   if(matchMedia('(min-width:768px)').matches){
    el.querySelectorAll('main > section:first-child .approved-motif path').forEach((n,i)=>{
     if(n.classList.contains('connection')) play(n,[{strokeDasharray:'1',strokeDashoffset:'1'},{strokeDasharray:'1',strokeDashoffset:'0'}],i*28,720);
     else play(n,[{transform:'translateX(20px)',opacity:.35},{transform:'translateX(0)',opacity:1}],i*70,600);
    });
   }
   observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){play(e.target,[{transform:'translateY(9px)',opacity:.3},{transform:'translateY(0)',opacity:1}],0,440);observer?.unobserve(e.target);}}),{threshold:.2});
   el.querySelectorAll('.learning h2,.hr-support h2,.sales-training h2,.engineer-learning h2,.engineer-career h2').forEach(n=>observer?.observe(n));
  }
  const cancel=()=>{running.forEach(a=>a.cancel());running.clear();observer?.disconnect();};
  const changed=()=>{if(media.matches)cancel();};media.addEventListener('change',changed);
  return ()=>{cancel();media.removeEventListener('change',changed);};
 },[root]);
}
