# Sakib Anjum — Portfolio

Personal portfolio for Sakib Anjum, Full Stack Engineer & Team Lead. Positioning: **I turn complex business operations into reliable software systems.** Audience: recruiters and engineering managers hiring senior full stack engineers for remote roles (US/Europe).

## Start here
- `BUILD_PLAN.md`: pages, animations, structure and phases. Follow the phase order.
- `docs/content-brief.md`: every fact and line of copy. Never invent metrics, clients, dates or claims.

## Stack
Astro 6 (static output) · TypeScript strict · Tailwind CSS v4 · GSAP 3.13+ (all plugins from the `gsap` package) · MDX content collections. Node 22+.

## Skills to use
Skills live in `skills/` (move them to `.claude/skills/` to auto-load: `mkdir -p .claude && mv skills .claude/skills`). Until moved, read `skills/<name>/SKILL.md` directly before the matching work.
- `portfolio-design-system`: tokens, type, components, diagram style, copy voice. Use for any UI or copy.
- `astro-gsap-scenes`: required pattern for every animation (`lib/gsap.ts`, `lib/scene.ts`, matchMedia, cleanup).
- `frontend-design`: aesthetic judgement; avoid templated looks.
- `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-performance`, `gsap-frameworks`: official GSAP API guidance.

## Model per phase
- **Phases 0–2** (setup, content layer, static pages): use **Sonnet 5.5**.
- **Phases 3–5** (animation foundation, signature scenes, polish): use **Opus 5.5**.
- At the start of every session, state the current phase and the model it requires. If the active model doesn't match (check `/model`), stop and ask Sakib to switch before writing code.

## Precision rules (no mistakes, no missed details)
Work like a careful senior engineer. Speed never beats correctness.

**Before starting any task**
1. Re-read the relevant section of `BUILD_PLAN.md` and the matching part of `docs/content-brief.md`, every time. Never work from memory of an earlier session.
2. Read the skill(s) for that work (see list below) before writing code.
3. Read every file you will change, fully, before editing it.
4. Write a short task checklist from the spec: every element, label, number, state, breakpoint and animation step it mentions. Tick each item only after verifying it.
5. If anything is ambiguous, contradictory or missing, stop and ask. Never guess, never invent content.

**While building**
6. One small step at a time. Build and check after each step, not at the end.
7. Copy text exactly from `docs/content-brief.md`: names, dates, numbers, punctuation, capitalization (e.g. "C&F ERP", "SenseFace 2A", "1.2s → 0.4s", "2M+"). Never round, reword or "improve" facts.
8. Use only design tokens from `portfolio-design-system`. No hard-coded colours, fonts or spacing outside the scale.
9. Follow the `astro-gsap-scenes` template exactly for every animation: shared `lib/gsap.ts`, `onScene`, `gsap.matchMedia`, final-state markup, cleanup.
10. Don't touch files outside the current task. Don't add dependencies the plan doesn't list without asking.
11. Keep every `TODO(sakib)` marker visible in content until Sakib replaces it.

**Before saying a task is done**
12. Run `npx astro check` and `npm run build`. Zero errors, zero new warnings.
13. Open the page and check 375px, 768px and 1440px widths; check Reduce Motion on; check keyboard focus on every link and control; check the browser console is empty.
14. Compare the result against your checklist from step 4, item by item, and against the spec text one more time.
15. Read your own full diff. Look for leftover debug code, unused imports, typos in visible text, broken links, missing `alt` text, and anything the spec didn't ask for.
16. Report what was done, what was checked, and anything left open. Never claim something works without having checked it.

**Tiny details that matter here**
- Dates use an em dash with spaces: "Jul 2025 — Present".
- Metrics use tabular numbers (`tabular-nums`) so counters don't jitter.
- Every image has meaningful `alt`; decorative SVGs have `aria-hidden="true"` plus a text equivalent nearby.
- External links open in the same tab unless they're the resume PDF; external links get `rel="noopener"` when using `target="_blank"`.
- No layout shift: images have width and height; fonts load via `@fontsource-variable` with `font-display: swap`.
- Hover effects also work on keyboard focus (`:focus-visible`), and dimming is desktop-only.
- No text below 12px; body text contrast at least WCAG AA on the dark background.

## Commands
- `npm run dev`: local server
- `npx astro check`: type and content-schema check
- `npm run build`: production build (must pass before a phase is done)

## Rules
- **No test code.** Verify manually: `astro check`, `build`, browser at 375 / 768 / 1440px, macOS Reduce Motion on.
- No SEO or sitemap work in v1.
- Content first: every page must read well with animations disabled.
- Animations: only transform, opacity and SVG stroke. Plays once unless interactive. No pinning on mobile.
- Keep JavaScript small: Astro components + `<script>` by default; a Preact island only if a scene truly needs it.
- Never use real data from Govaly or Standard Freight Incorporation (screenshots, client names, employee names, figures, code). The screenshots in the parent folder are off-limits for v1.
- Keep every `TODO(sakib)` marker until Sakib supplies the real content.
- Commit after each completed phase with a clear message.
