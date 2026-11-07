---
name: portfolio-design-system
description: Sakib Anjum's portfolio visual system — colour tokens, type, spacing, components, SVG diagram style and copy voice. Use whenever creating or changing any page, component, section, diagram or copy in this portfolio.
---

# Portfolio design system

The site has one job: prove that **Sakib turns complex business operations into reliable software systems**. Every design choice serves that sentence. The visual idea is a **living blueprint**: messy real-world inputs become clean, labelled system diagrams.

Read `docs/content-brief.md` for all facts and copy. Never invent metrics, employers, dates or clients.

## Tokens (Tailwind v4 `@theme` in `src/styles/global.css`)

```css
@theme {
  --color-ink-950: #071A20;   /* page background */
  --color-ink-900: #0C2A33;   /* surfaces, cards (matches resume header) */
  --color-ink-800: #123642;   /* raised surfaces, hover panels */
  --color-line:    #1E4652;   /* borders, diagram strokes at rest */
  --color-grid:    #0F2F39;   /* blueprint grid lines */
  --color-text:    #E6F0F2;   /* primary text */
  --color-muted:   #8FA9B0;   /* secondary text */
  --color-accent:  #7FD3DF;   /* the system: active lines, links, focus */
  --color-ok:      #4ADE80;   /* healthy / done / 200 */
  --color-wait:    #FBBF24;   /* queued / pending */
  --color-fail:    #F87171;   /* failure / 429 / crash */

  --font-sans: "Inter Variable", system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
}
```

Status colours carry meaning only (ok / waiting / failure). Never use them as decoration.

## Type

| Role | Style |
| --- | --- |
| Hero headline | sans, 600, clamp(2.5rem, 6vw, 4.75rem), tracking -0.03em, leading 1.05 |
| Page / section title | sans, 600, 2rem–2.5rem, tracking -0.02em |
| Section label | mono, 12px, uppercase, tracking 0.18em, accent: `01 / SYSTEMS` |
| Body | sans, 16–17px, leading 1.65, muted for secondary paragraphs |
| Metrics | mono, 600, tabular-nums |
| Diagram labels | mono, 11–12px |

Max line length for prose: 65ch.

## Layout and spacing

- Container: `max-w-6xl mx-auto px-6 md:px-10`.
- Section rhythm: `py-24 md:py-32`. One idea per section.
- Spacing scale: Tailwind's 4px steps; prefer 4, 6, 8, 12, 16, 24.
- Radius: 8px for cards and diagram boxes; 999px for pills and badges.
- Borders: 1px `--color-line`. Hover lifts to `--color-ink-800` + accent border at 40% opacity.
- Background: `--color-ink-950` with a blueprint grid (CSS `background-image` with two linear gradients, 32px cells, `--color-grid`). The grid is the site's signature texture.

## Components (in `src/components/ui/`)

- `SectionLabel` — mono index + name: `02 / EXPERIENCE`.
- `Card` — surface, 1px border, 8px radius, padding 24; optional `href` makes the whole card one link with a visible focus ring.
- `Pill` — tech tag: mono 12px, accent text, accent background at 10%, rounded-full.
- `MetricBadge` — one metric per role/project: `2M+ combined users`, mono, ok-coloured dot.
- `MetricCounter` — big number + label; counts up once when in view.
- `ArrowLink` — text + ↗ that nudges 2px up-right on hover.
- `Button` — primary (accent bg, ink text) and ghost (border only). Max two per view.

## SVG diagram style (all scenes and mini diagrams)

- viewBox-based, responsive width, no fixed pixel sizes.
- Boxes: `rx="8"`, stroke 1.25, stroke `--color-line`, fill `--color-ink-900`.
- Active path / data flow: stroke `--color-accent`.
- Labels: mono, 11–12px, `--color-muted`; key labels `--color-text`.
- Moving data = small rounded rects or 4px circles in accent.
- Every element GSAP will touch has a readable `id` or `data-part` (`#pp-queue`, `data-part="worker"`).
- One arrowhead `<marker>` per SVG, accent or line colour.
- Every diagram has a text equivalent (caption or `sr-only` paragraph).

## Copy voice

Calm, precise, engineering-led. Outcome first, then how. Short sentences. Numbers over adjectives. No "passionate", no emoji, no skill-percentage bars, no buzzword stacks.

## Never

- Particle backgrounds, 3D blobs, custom cursors that hide the real cursor, cursor trails.
- Real client data, real employee names, real financial figures, internal URLs or source code from Govaly or Standard Freight Incorporation. Use redrawn diagrams and placeholder data.
- Copying another portfolio's exact look. The Experience list is inspired by brittanychiang.com; the footer credits that.
