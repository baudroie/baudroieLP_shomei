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

/** WAAPI enhancement: no CSS hidden state, no animation on interactive ancestors.
 * Cancel returns to the readable underlying style, including on live reduced-motion changes.
 */
export function useApprovedMotion(root: RefObject<HTMLDivElement | null>) {
 useEffect(() => {
  const el = root.current;
  if (!el || !el.animate || !('IntersectionObserver' in window)) return;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Map<Animation, Element>();
  const seen = new WeakSet<Element>();
  const easing = 'cubic-bezier(.22,.7,.25,1)';
  const startedAt = performance.now();
  let disposed = false;
  let observer: IntersectionObserver | undefined;
  const distance = () => matchMedia('(max-width:767px)').matches ? 10 : 16;
  const play = (node: Element, frames: Keyframe[], delay = 0, duration = 600) => {
   if (preference.matches || disposed) return;
   const animation = node.animate(frames, { duration, delay, easing, fill: 'backwards' });
   running.set(animation, node);
   animation.onfinish = () => running.delete(animation);
   animation.oncancel = () => running.delete(animation);
  };
  const rise = (node: Element, delay = 0, opaque = false) => play(node,
   [{ translate: `0 ${distance()}px`, opacity: opaque ? 1 : 0 }, { translate: '0 0', opacity: 1 }], delay);
  const reveal = (node: Element) => {
   if (seen.has(node)) return;
   seen.add(node);
   if (node.matches('h1, [data-motion-heading]')) {
    const lines = node.querySelectorAll(':scope > .motion-line, :scope > .eng-phrase, :scope > .approved-title-line > span, :scope > .eng-title-line > span');
    (lines.length ? lines : [node]).forEach((line, i) => rise(line, i * 80));
   } else if (node.matches('.job-grid')) {
    node.querySelectorAll('article').forEach((article, i) => article.querySelectorAll('.role-illustration, h3, p').forEach(child => rise(child, i * 70)));
   } else if (node.matches('.career-examples')) {
    // Reveal the complete relationship together; connectors never move independently.
    play(node, [{opacity:0}, {opacity:1}], 0, 420);
   } else if (node.matches('.infrastructure-labels')) {
    node.querySelectorAll('article').forEach((item, i) => {
     const line = item.querySelector('.topic-connector');
     if(line) play(line, [{scale:'0 1'},{scale:'1 1'}], i * 70, 300);
     item.querySelectorAll('h3, p').forEach(text => rise(text, 180 + i * 70));
    });
   } else if (node.matches('.approved-motif, .eng-learning-curves')) {
    // Opacity only: protects the approved HR photo/ribbon contact geometry.
    play(node, [{opacity:.55},{opacity:1}], 100, 600);
   } else {
    // Human figures remain opaque so decoration cannot show through their bodies.
    rise(node, 40, node.matches('.art, .hr-hero-photo, .engineer-hero-top figure > img'));
   }
  };
  const cancel = () => { for (const animation of running.keys()) animation.cancel(); running.clear(); };
  const showHash = () => {
   cancel();
   let target: Element | null = null;
   try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { /* malformed fragment is harmless */ }
   const section = target?.closest('section') || target;
   if(section) { seen.add(section); section.querySelectorAll('*').forEach(node => seen.add(node)); }
  };
  const start = () => {
   if(disposed || preference.matches) return;
   showHash();
   // Never hide text the visitor could already have started reading during a slow font load.
   if (performance.now() - startedAt > 300) {
    el.querySelectorAll('h1, [data-motion-heading]').forEach(node => {
     const rect = node.getBoundingClientRect();
     if (rect.bottom > 0 && rect.top < innerHeight) seen.add(node);
    });
   }
   observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) { reveal(entry.target); observer?.unobserve(entry.target); } });
   }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
   el.querySelectorAll('h1, [data-motion-heading], .job-grid, .career-examples, .infrastructure-labels, .welcome > img, .learning figure > img, .overview-support figure > img, .hr-hero-photo, .hr-hero > .art, .hr-support figure > img, .sales-hero > .art, .sales-team > .photo, .engineer-hero-top figure > img, .engineer-learning figure > img, main > section > .approved-motif, .eng-learning-curves').forEach(node => observer!.observe(node));
  };
  // Fonts settle before revealing text; content remains readable while they load.
  if(document.fonts) document.fonts.ready.then(start); else start();
  const onPreference = () => { if(preference.matches) { cancel(); observer?.disconnect(); } };
  preference.addEventListener('change', onPreference);
  window.addEventListener('hashchange', showHash);
  const onFocus = () => cancel();
  el.addEventListener('focusin', onFocus);
  return () => { disposed = true; cancel(); observer?.disconnect(); preference.removeEventListener('change', onPreference); window.removeEventListener('hashchange', showHash); el.removeEventListener('focusin', onFocus); };
 }, [root]);
}
