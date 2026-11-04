# Portfolio build plan

**Goal:** a fast, clear, memorable portfolio that convinces recruiters and engineering managers in under a minute that Sakib turns complex business operations into reliable software systems.

**Scope (v1):** Home, Experience, Work index, Work case study pages, AI Workflow page. Resume is a PDF link; contact lives in the footer. No SEO work, no sitemap, no blog, no CMS, no automated tests.

**Stack:** Astro 6 (static output) · TypeScript · Tailwind CSS v4 · GSAP 3.13+ (all plugins free) · MDX content collections · Vercel or Netlify static hosting.

**Read before building:** `CLAUDE.md`, `docs/content-brief.md`, skills `portfolio-design-system`, `astro-gsap-scenes`, `frontend-design`, and the `gsap-*` skills.

---

## Site structure

| Route | Purpose | Layout |
| --- | --- | --- |
| `/` | 60-second story: who, proof, 3 systems, how I work, experience preview, contact | Full-width sections |
| `/experience` | Full career, Brittany Chiang–style hover list | Two columns on desktop: sticky left panel + scrolling right list |
| `/work` | All case studies, filterable | Full width, large rows |
| `/work/[slug]` | One case study: problem → design → result, with its signature scene | Reading column + full-width scenes |
| `/ai-workflow` | How Sakib builds with AI agents: principles, a real feature walkthrough, the AI mistake he caught, verification checklist, toolkit | Reading column + pinned walkthrough |

Global: top nav (Work · Experience · AI Workflow · Resume ↗), footer with email copy button, LinkedIn, GitHub, resume, credit line. Optional `<ClientRouter />` page transitions in phase 5.

---

## Signature idea: the living blueprint

The whole site sits on a faint blueprint grid. Real-world inputs (orders, punches, vouchers, notifications) appear as small mono-labelled tokens and visibly become clean, labelled diagrams. One visual language for every page: thin strokes, 8px boxes, mono labels, accent cyan for "the system", green / amber / red only for healthy / queued / failing.

**Blueprint cursor (desktop only):** grid lines brighten in a ~180px radius around the pointer, via a CSS mask driven by `--x`/`--y` variables updated in `requestAnimationFrame`. Subtle, cheap, and unique to this site. Used on the hero and the Experience page background.

---

## Page specs

### Home `/`

| # | Section | Content | Animation (GSAP) |
| --- | --- | --- | --- |
| 1 | Hero | Headline, subline, availability badge, 2 buttons | **Chaos → order:** ~24 mono tokens (ORDER, PUNCH, VOUCHER, PUSH, BILL) float loosely behind the text, then glide along paths (MotionPath) into three lanes feeding a "SYSTEM" box; lanes draw in (DrawSVG); small accent dots then pulse along the lanes on a slow loop. Headline reveals by word (SplitText) in parallel. Total ~2.4s, plays once. Reduced motion: final diagram, no loop. |
| 2 | Proof strip | 5 metrics from the brief | Counters tick up once in view. The 67% item shows a bar shrinking from 1.2s to 0.4s with the label updating. |
| 3 | `01 / SYSTEMS` | 3 cards: Push Pipeline, Attendance Backend, For You. Each: tagline, metric badge, mini diagram, link | Mini diagram draws itself when the card enters view; on hover a data dot travels its path once. Cards stagger in (y 16 → 0). |
| 4 | `02 / HOW I WORK` | 4 steps from the brief | One accent line, scrubbed with scroll, draws through the 4 step nodes; each node fills and its text brightens as the line reaches it. Mobile: steps reveal one by one, no scrub. |
| 5 | `03 / EXPERIENCE` | The 2 roles as compact cards (same component as `/experience`) + "Full experience →" | Hover-dim list (CSS). Stagger in once. |
| 6 | `04 / AI WORKFLOW` | Headline "AI writes code. I own the outcome.", 3 principle chips, certification-in-progress badge, link "How I build with AI →" | **Agent loop:** a 4-node loop (Context → Plan → Build → Verify). A feature token travels the loop; at Verify one red "assumption" token is rejected (shake, strike-through) and sent back to Plan, then a green token passes to "Merge". Plays once in view. |
| 7 | `05 / CONTACT` | One line ("Building something with messy real-world data? Let's talk."), email copy, links, resume | Copy button: icon morphs to a tick and "Copied" fades in. |

### Experience `/experience` (inspired by brittanychiang.com, credited in footer)

**Desktop:** left column (40%) is sticky: name, role, one-line positioning, photo (transparent cutout over the grid, accent arc behind), in-page nav (Experience · Skills · Education), social icons, resume button. Right column scrolls.

**Right column:**
1. **About:** short paragraph from the brief.
2. **Experience list:** one card per role: date range (mono, muted, left), Title · Company ↗, summary, highlight bullets (max 4 visible; "more" expands), metric badge, case study chips (link to `/work/[slug]`), tech pills.
3. **Skills:** grouped rows, no levels.
4. **Education & learning.**
5. **View full résumé ↗.**

**Interaction and animation:**
- Hover a card: panel background appears, title turns accent, ↗ nudges, other cards dim to 50% (desktop only, pure CSS with Tailwind `group`).
- Left nav item highlights for the section in view (ScrollTrigger `onToggle`), with a small accent bar that slides between items.
- A thin vertical progress rail beside the list fills as you scroll (scrub).
- Cards fade up once on load, 60ms stagger.
- Blueprint cursor on the page background.

**Mobile:** single column; sticky panel becomes a normal header; no dimming.

### Work index `/work`

- Title + one line: "Systems I designed and built, and the problems they solved."
- Filter chips: All · Backend · Full stack · Integrations. Changing the filter reorders and hides rows with **Flip** (no page reload).
- Each row: index number (mono), name, tagline, metric badge, stack pills, cover placeholder.
- **Hover (desktop):** the row's mini diagram appears in a preview panel that follows the cursor vertically within the list (quickTo on `y`), and draws itself. Mobile: cover shown inline, no follower.

### AI Workflow `/ai-workflow`

Goal: a recruiter or engineering manager leaves convinced that Sakib uses AI agents to move faster **without** lowering quality. Content: `docs/content-brief.md` → "AI-assisted engineering".

1. **Header:** "AI writes code. I own the outcome." + subline + badge "Claude Certified Architect: Foundations · in progress".
2. **Principles:** 6 cards in a 3×2 grid (2×3 on tablet, stacked on mobile). Each: mono number, title, one sentence.
3. **How I ship a feature with AI:** the 7-step walkthrough (SenseFace 2A example). Desktop: a two-lane diagram pinned on the left, "AI" lane and "Me" lane, while the steps scroll on the right; each step lights its node in both lanes and draws the hand-off arrow between them. Mobile: stacked step cards, each with its small two-lane icon.
4. **The catch:** a story block styled like a terminal/chat transcript: the AI's confident claim appears (typed), a "challenge: verify against device docs" line follows, then the claim gets struck through in red and a green corrected design line replaces it. Text is real content, not fake chat logs: label it as a reconstruction.
5. **Verification checklist:** the 9 steps as a checklist; each item ticks (check draws in) as it scrolls into view; a counter "9/9 before merge" completes at the end.
6. **Toolkit:** grouped pills: Agents · Context · Skills · Quality gates. Only confirmed items; `TODO(sakib)` items stay hidden until confirmed.
7. **Proof:** "This site was built the same way" card: CLAUDE.md, build plan, content brief, project skills, with a link to the repo (hidden until the URL exists).
8. **CTA:** links to the attendance case study and the resume.

### Case study `/work/[slug]` (one template, MDX content)

1. **TL;DR card:** role, stack, status, metric, one-line result. Stops a skimming recruiter.
2. **Context:** 2–3 sentences.
3. **The problem:** "before" scene.
4. **The design:** "after" scene, pinned on desktop while 3–4 short text steps scroll beside it; each step advances the timeline.
5. **Key decisions:** 3 cards.
6. **Result** + what's next.
7. **Next case study** link.

**Signature scenes** (each is one component in `src/components/scenes/`):

| Scene | Before | After / interaction |
| --- | --- | --- |
| `PushPipelineScene` | Requests pile onto one API box running a loop; box fills amber, shakes, turns red; "429 Too Many Requests" pops from Firebase | Requests drop into a queue that stacks; API instantly returns green `202 Scheduled`; workers pull jobs. **Traffic slider:** drag up → queue grows, workers fan out 2 → 6; drag down → shrink. Server never turns red. |
| `LatencyBar` (inside push-pipeline) | One bar at 1.2s made of three layers: slow query, missing index, no cache | Each fix peels a layer off; bar settles at 0.4s with "−67%". |
| `AttendanceScene` | Punch dots leave a terminal; one duplicate dot | Dots travel (MotionPath) into a locked "Raw evidence" vault; the duplicate bounces off with "duplicate ignored"; a locked worker turns evidence into a month calendar that fills with Present / Late / Holiday / Weekly off. **Button:** "Send a late punch" → a day recalculates; an overridden day keeps its value and gains a "Review required" flag. |
| `ForYouScene` | Grid of 6 placeholder product cards in a fixed order | Five signal toggles (Search, View, Cart, Order, Category) and an "Admin boost" toggle; each change reorders the grid with Flip and shows a small score next to each card. |
| `AgentLoopScene` (Home) | — | Context → Plan → Build → Verify loop; rejected assumption loops back; verified change reaches Merge. |
| `AiWalkthroughScene` (`/ai-workflow`) | — | Pinned two-lane AI / Me diagram advanced by scroll steps; checklist ticks; transcript strike-through. |
| `CfErpScene` | Modules as nodes: Jobs, Vouchers, Billing, Accounts, HR | A voucher token enters, posts, and its effect lights up the Ledger, Journal and Contra report nodes at the same moment ("one source, every report agrees"). |

All scenes: final state is the default markup; reduced motion shows it; mobile replaces pinning with in-view autoplay; text equivalent below each.

---

## Project structure

```
portfolio/
├─ CLAUDE.md
├─ BUILD_PLAN.md
├─ docs/content-brief.md
├─ skills/ → .claude/skills/        # project skills (see CLAUDE.md)
├─ public/
│  ├─ Sakib_Anjum_Resume.pdf
│  └─ images/
│     ├─ profile-placeholder.svg
│     └─ covers/{push-pipeline,attendance-backend,for-you,cf-erp}.svg
└─ src/
   ├─ content.config.ts             # collections: work (MDX), experience (YAML/JSON)
   ├─ content/
   │  ├─ work/*.mdx
   │  └─ experience/*.yaml
   ├─ data/site.ts                  # name, links, proof metrics, how-I-work steps
   ├─ layouts/BaseLayout.astro      # fonts, grid background, nav, footer
   ├─ pages/
   │  ├─ index.astro
   │  ├─ experience.astro
   │  ├─ ai-workflow.astro
   │  └─ work/{index.astro,[slug].astro}
   ├─ components/
   │  ├─ ui/                        # SectionLabel, Card, Pill, MetricBadge, MetricCounter, ArrowLink, Button, CopyEmail
   │  ├─ sections/                  # Hero, ProofStrip, FeaturedSystems, HowIWork, ExperienceList, AiWorkflowTeaser, ContactCta
   │  ├─ diagrams/                  # static mini diagrams per project
   │  └─ scenes/                    # HeroScene, PushPipelineScene, LatencyBar, AttendanceScene, ForYouScene, CfErpScene, AgentLoopScene, AiWalkthroughScene
   ├─ lib/{gsap.ts,scene.ts,cursor.ts}
   └─ styles/global.css             # Tailwind v4 + @theme tokens + grid background
```

---

## Phases

**Model:** Phases 0–2 use **Sonnet 5.5**; Phases 3–5 use **Opus 5.5** (switch with `/model`). Follow the precision rules in `CLAUDE.md` for every task.

Each phase ends with a working site. Verification is manual (no test code): `npx astro check`, `npm run build`, and a browser check at 375 / 768 / 1440px.

### Phase 0: Setup (≈ half a day) · model: Sonnet 5.5
1. Scaffold into a temp folder (create-astro refuses non-empty folders), then move files up:
   `npm create astro@latest -- _scaffold --template minimal --typescript strict --install --no-git` → move `_scaffold/*` and dotfiles into `portfolio/`, delete `_scaffold`.
2. `npx astro add tailwind mdx` (Tailwind v4 via `@tailwindcss/vite`).
3. `npm i gsap @fontsource-variable/inter @fontsource-variable/jetbrains-mono`.
4. Requires Node 22+ (`node -v`; use `nvm use 22` if needed).
5. Tokens and grid background in `global.css` per `portfolio-design-system`.
6. `BaseLayout` with nav, footer, fonts. `git init` and first commit.

**Done when:** blank pages for all five routes render with nav, footer, grid and fonts.

### Phase 1: Content layer (≈ half a day) · model: Sonnet 5.5
1. `src/content.config.ts` with Zod schemas (import `z` from `astro/zod`): `work` (title, slug, tagline, role, stack[], status, metric, category[], order, cover, problem, design, result, decisions[]) and `experience` (company, title, start, end, url, summary, highlights[], metric, caseStudies[], tech[]).
2. Fill all entries from `docs/content-brief.md`, keeping every `TODO(sakib)`.
3. `src/data/site.ts` for identity, links, proof metrics, how-I-work steps.
4. Resume PDF, photo and 4 blueprint covers are already in `public/`. Copy `public/images/my-image.png` to `src/assets/` and render it with Astro `<Image>` (WebP/AVIF, correct sizes).

**Done when:** `astro check` passes and pages can list the content.

### Phase 2: Static pages, no animation (≈ 3–4 days) · model: Sonnet 5.5
Build Home, Experience, Work index, AI Workflow and the case study template with real content and **static** diagrams (final states). Responsive at all three widths. Experience hover-dim (CSS only) belongs here.

**Done when:** the site is complete, clear and good-looking with zero JavaScript animation. It could launch as is.

### Phase 3: Animation foundation (≈ half a day) · model: Opus 5.5
`lib/gsap.ts`, `lib/scene.ts`, `lib/cursor.ts` exactly as in `astro-gsap-scenes`. Add simple shared reveals (section label + title fade-up). Confirm reduced motion and navigation cleanup work.

### Phase 4: Signature scenes (≈ 5–7 days), in this order · model: Opus 5.5
1. `HeroScene` + SplitText headline (first impression).
2. Proof strip counters + latency mini bar.
3. Featured system cards' mini diagrams.
4. `PushPipelineScene` with traffic slider + `LatencyBar` (best story, build it fully).
5. How I work scrubbed line.
6. Experience page: active nav, progress rail, blueprint cursor.
7. `AgentLoopScene` (Home) and `AiWalkthroughScene` + checklist ticks (`/ai-workflow`).
8. `AttendanceScene`.
9. `ForYouScene` (Flip) and Work index Flip filter + hover preview.
10. `CfErpScene`.

**Done when:** each scene passes the manual checklist in `astro-gsap-scenes`.

### Phase 5: Polish and launch (≈ 1–2 days) · model: Opus 5.5
1. Optional `<ClientRouter />` with `transition:name` on case study titles (card title morphs into page title). Re-check scene cleanup.
2. Performance: Lighthouse performance 95+ on mobile; home page JS under ~100 KB.
3. Cross-browser: Chrome, Safari, Firefox; iPhone Safari.
4. Deploy (Vercel or Netlify, static). Domain later, e.g. `sakibanjum.dev`.
5. Swap placeholders as Sakib sends them (search `TODO(sakib)`).

---

## Out of scope for v1
SEO, sitemap, blog, CMS, contact form, dark/light toggle (site is dark by design), i18n, automated tests, real product screenshots.
