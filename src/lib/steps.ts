import { gsap, ScrollTrigger } from "./gsap";

// Lowest opacity that keeps a pinned step's text and number at WCAG AA on the page background.
const DIM = 0.65;

/**
 * Plays a paused timeline with labels `step0`…`stepN` against a scene's `[data-step]` items.
 * Desktop: each step scrolling past plays to its label, in either direction, and brightens.
 * Mobile: no scroll link, the whole timeline plays once in view.
 * Returns the cleanup for the matchMedia handler.
 */
export function playSteps(root: HTMLElement, tl: gsap.core.Timeline, desktop: boolean, dim = DIM) {
  if (!desktop) {
    ScrollTrigger.create({
      trigger: root.querySelector("figure") ?? root,
      start: "top 80%",
      once: true,
      onEnter: () => void tl.play(),
    });
    return () => {};
  }

  const steps = gsap.utils.toArray<HTMLElement>("[data-step]", root);
  let playhead: gsap.core.Tween | undefined;

  const go = (index: number) => {
    // Capped so a fast scroll or a jump catches up quickly instead of playing every step in full.
    const distance = Math.abs(tl.labels[`step${index}`] - tl.time());
    playhead = tl.tweenTo(`step${index}`, { duration: Math.min(distance, 1) });
    steps.forEach((step, i) => {
      gsap.to(step, { opacity: i === index - 1 ? 1 : dim, duration: 0.3, overwrite: "auto" });
    });
  };

  gsap.set(steps, { opacity: dim });
  steps.forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 60%",
      onEnter: () => go(i + 1),
      onLeaveBack: () => go(i),
    });
  });

  return () => playhead?.kill();
}
