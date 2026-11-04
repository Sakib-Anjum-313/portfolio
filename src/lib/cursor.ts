import { gsap, MQ } from "./gsap";

const QUERY = `${MQ.desktop} and ${MQ.motion} and (hover: hover)`;
const GRID = 32; // px, the body background-size in global.css

/**
 * Blueprint cursor: brightens the grid lines around the pointer (desktop only).
 * `root` needs `relative isolate` so the layer sits above the page grid and below its content.
 * Returns the cleanup for `onScene`.
 */
export function blueprintCursor(root: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add(QUERY, () => {
    const layer = document.createElement("div");
    layer.className = "blueprint-cursor";
    layer.setAttribute("aria-hidden", "true");
    root.prepend(layer);

    let pointerX = 0;
    let pointerY = 0;
    let gapX = 0;
    let gapY = 0;
    let frame = 0;

    // Start the layer's box on a page grid line, so its lines match at any pixel ratio even when
    // root sits at a fractional position, then clip the overhang back to root.
    const align = () => {
      const { left, top } = root.getBoundingClientRect();
      gapX = (left + window.scrollX) % GRID;
      gapY = (top + window.scrollY) % GRID;
      layer.style.inset = `${-gapY}px 0 0 ${-gapX}px`;
      layer.style.clipPath = `inset(${gapY}px 0 0 ${gapX}px)`;
    };
    const paint = () => {
      frame = 0;
      const { left, top } = root.getBoundingClientRect();
      layer.style.setProperty("--x", `${pointerX - left + gapX}px`);
      layer.style.setProperty("--y", `${pointerY - top + gapY}px`);
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(paint);
    };
    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      layer.dataset.active = "";
      schedule();
    };
    const onLeave = () => {
      delete layer.dataset.active;
    };

    const layout = new ResizeObserver(align);
    layout.observe(document.body);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      layout.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", schedule);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      layer.remove();
    };
  });

  return () => mm.revert();
}
