import { useEffect, type RefObject } from "react";

/** Progressive enhancement: content is always visible before/without this hook. */
export function useEngineerMotion(root: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || !el.animate) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const cancel = () => {
      animations.forEach(animation => animation.cancel());
      animations.clear();
      observer?.disconnect();
    };
    const play = (node: Element, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      const animation = node.animate(frames, options);
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    if (!media.matches) {
      el.querySelectorAll(".eng-title-line > span").forEach((line, index) => {
        play(line, [{ transform: "translateY(18px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
          { duration: 560, delay: index * 120, easing: "cubic-bezier(.22,.7,.25,1)", fill: "backwards" });
      });
      const desktop = window.matchMedia("(min-width: 768px)").matches;
      const curves = (selector: string) => el.querySelectorAll(selector).forEach((curve, index) => {
        play(curve, [{ translate: `${index ? -20 : 20}px 0` }, { translate: "0 0" }],
          { duration: 650, delay: index * 100, easing: "cubic-bezier(.22,.7,.25,1)" });
      });
      if (desktop) curves(".eng-hero-curves > span");
      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (entry.target.matches(".engineer-cta")) {
              if (desktop) curves(".eng-cta-curves > span");
            } else {
              play(entry.target, [{ transform: "translateY(10px)", opacity: .25 }, { transform: "translateY(0)", opacity: 1 }],
                { duration: 460, easing: "ease-out" });
            }
            observer?.unobserve(entry.target);
          });
        }, { threshold: .18 });
        el.querySelectorAll(".engineer-learning h2, .engineer-career h2, .engineer-cta").forEach(node => observer!.observe(node));
      }
    }
    // Changing the OS preference during an animation also immediately stops it.
    const onPreferenceChange = () => { if (media.matches) cancel(); };
    media.addEventListener("change", onPreferenceChange);
    return () => { cancel(); media.removeEventListener("change", onPreferenceChange); };
  }, [root]);
}
