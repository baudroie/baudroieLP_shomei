import { useEffect, type RefObject } from 'react';

/** Sticky participates in layout even when JS is unavailable. Measure only anchor clearance. */
export function useHeaderPosition(header: RefObject<HTMLElement | null>, sentinel: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const measure = () => document.documentElement.style.setProperty('--header-height', `${Math.ceil(el.getBoundingClientRect().height)}px`);
    measure();
    const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    resize?.observe(el);
    window.addEventListener('resize', measure, { passive: true });
    const observer = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(([entry]) => {
      el.classList.toggle('is-scrolled', !entry.isIntersecting);
    }) : null;
    if (sentinel.current) observer?.observe(sentinel.current);
    const revealFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || el.contains(target) || target.classList.contains('skip-link')) return;
      const rect = target.getBoundingClientRect();
      if (rect.top < el.getBoundingClientRect().bottom + 12) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    document.addEventListener('focusin', revealFocus);
    return () => { resize?.disconnect(); observer?.disconnect(); window.removeEventListener('resize', measure); document.removeEventListener('focusin', revealFocus); };
  }, [header, sentinel]);
}
