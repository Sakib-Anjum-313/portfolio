---
name: astro-gsap-scenes
description: How to build animated sections ("scenes") in this Astro portfolio with GSAP — file template, plugin registration, init and cleanup with Astro view transitions, reduced motion, mobile fallbacks and manual checks. Use whenever adding or editing any animation, scroll effect or interactive SVG in this project.
---

# Astro + GSAP scenes

A **scene** is one `.astro` component that owns its markup (usually an inline SVG), a text equivalent, and a `<script>` that animates it. Use the official `gsap-*` skills in this folder for API details; this skill defines how GSAP fits *this* project.

## Rules

1. **Every animation explains something.** If it doesn't show a problem, a flow or a result, cut it.
2. **Content first.** Headline and proof are readable before any animation finishes. The page must make sense with JavaScript off.
3. **Reduced motion.** With `prefers-reduced-motion: reduce`, show each scene's final state instantly. Never hide content behind an animation that won't run.
4. **Animate only `transform`, `opacity`, and SVG stroke/`drawSVG`.** Never width, height, top, left or margins.
5. **Plays once.** Entrance animations use `once: true`. Scrubbed scenes stay under ~1.5 viewport heights.
6. **Mobile (< 1024px):** no pinning. Replace pinned or scrubbed timelines with a short autoplay when in view.
7. **Scope everything** to the scene root. Never query the whole document from a scene.
8. **Always clean up** (`mm.revert()`), so view transitions never stack ScrollTriggers.

## Shared setup (create once)

`src/lib/gsap.ts` — the only place plugins are registered. Since GSAP 3.13 all plugins ship free in the `gsap` npm package.

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, Flip, SplitText);
gsap.defaults({ ease: "power3.out", duration: 0.6 });

export { gsap, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, Flip, SplitText };

export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
} as const;
```

`src/lib/scene.ts` — starts a scene on every page load and cleans it up before Astro swaps pages. Works with or without `<ClientRouter />`.

```ts
type Cleanup = (() => void) | void;

export function onScene(name: string, init: (root: HTMLElement) => Cleanup) {
  const cleanups = new Map<HTMLElement, () => void>();

  const start = () => {
    document.querySelectorAll<HTMLElement>(`[data-scene="${name}"]`).forEach((root) => {
      if (cleanups.has(root)) return;
      const c = init(root);
      cleanups.set(root, c ?? (() => {}));
    });
  };
  const stop = () => {
    cleanups.forEach((c) => c());
    cleanups.clear();
  };

  start(); // initial load (module scripts run after the DOM is parsed)
  document.addEventListener("astro:page-load", start); // later navigations with ClientRouter
  document.addEventListener("astro:before-swap", stop);
}
```

## Scene template

```astro
---
// src/components/scenes/ExampleScene.astro
interface Props { caption: string }
const { caption } = Astro.props;
---
<figure class="scene" data-scene="example">
  <svg viewBox="0 0 800 360" class="w-full h-auto" aria-hidden="true">
    <!-- Final state is the default markup. GSAP animates FROM hidden states. -->
    <path id="ex-line" d="M40 180 H760" stroke="currentColor" fill="none" />
    <rect data-part="box" x="360" y="140" width="80" height="80" rx="8" />
  </svg>
  <figcaption class="sr-only">{caption}</figcaption>
</figure>

<script>
  import { gsap, MQ } from "../../lib/gsap";
  import { onScene } from "../../lib/scene";

  onScene("example", (root) => {
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
      const { motion, desktop } = ctx.conditions as Record<string, boolean>;
      if (!motion) return; // reduced motion: the markup already shows the final state

      const tl = gsap.timeline({
        scrollTrigger: desktop
          ? { trigger: root, start: "top 75%", end: "bottom 40%", scrub: 0.6 }
          : { trigger: root, start: "top 80%", once: true },
      });
      tl.from(q("#ex-line"), { drawSVG: "0%", duration: 1 })
        .from(q("[data-part=box]"), { autoAlpha: 0, y: 12, stagger: 0.06 }, "<0.3");
    });

    return () => mm.revert();
  });
</script>
```

Key points: markup = final state; animate with `.from()`; `gsap.matchMedia()` handles reduced motion and breakpoints and reverts cleanly.

## Interactive scenes (sliders, toggles)

- Use native controls (`<input type="range">`, `<button aria-pressed>`) so keyboard and screen readers work.
- Drive the SVG from one `render(value)` function with `gsap.to(..., { overwrite: "auto" })`, called on `input`.
- Keep state in the scene's closure; no global stores.
- Only if a scene's state becomes truly complex, move it to a Preact island (`client:visible`) and use the same GSAP patterns inside a `useEffect` with `gsap.context()` cleanup.

## Reorders (Flip)

```ts
const state = Flip.getState(q("[data-flip]"));
// change DOM order or classes here
Flip.from(state, { duration: 0.5, ease: "power2.inOut", absolute: true });
```

## Manual check after every scene (no automated tests in this project)

- [ ] `npm run build` and `npx astro check` pass with no errors.
- [ ] Looks right at 375px, 768px and 1440px wide.
- [ ] macOS: System Settings → Accessibility → Display → Reduce motion ON shows the final state with nothing missing.
- [ ] Navigate away and back (with ClientRouter): animation runs once, no duplicates, no console errors.
- [ ] Chrome DevTools Performance: no long tasks or layout thrashing while scrolling the scene.
