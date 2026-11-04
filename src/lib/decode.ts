import { gsap } from "./gsap";

const GLYPHS = "<>/_{}[]#01".split("");

/**
 * Resolves an element's text from scrambled glyphs, left to right. Mono text only: every glyph has
 * the same width and spaces stay put, so the line never rewraps. The caller restores the text on cleanup.
 */
export function decode(el: HTMLElement, duration = 1) {
  const text = el.textContent ?? "";
  const state = { revealed: 0 };

  return gsap.to(state, {
    revealed: text.length,
    duration,
    ease: "none",
    onUpdate: () => {
      const count = Math.floor(state.revealed);
      const rest = [...text.slice(count)].map((char) => (char === " " ? char : gsap.utils.random(GLYPHS)));
      el.textContent = text.slice(0, count) + rest.join("");
    },
  });
}
