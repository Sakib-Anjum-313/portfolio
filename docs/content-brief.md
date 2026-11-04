# Content brief

Single source of truth for every fact and line of copy on the site. Do not invent anything beyond this file.
Items marked `TODO(sakib)` are placeholders Sakib will refine later; build with them as written.

## Identity

- **Name:** Sakib Anjum
- **Role:** Full Stack Engineer & Team Lead
- **Location:** Chattogram, Bangladesh · open to remote (UTC+6), targeting US and Europe
- **Email:** sakibanjum.313@gmail.com
- **LinkedIn:** https://linkedin.com/in/sakib-anjum-cse
- **GitHub:** https://github.com/Sakib-Anjum-313
- **Resume:** `/Sakib_Anjum_Resume.pdf` (in `public/`)
- **Photo:** `public/images/my-image.png` — 853×963 transparent-background cutout (arms crossed, dark green shirt). Use Astro `<Image>` (import from `src/assets/`) so it ships as an optimized WebP/AVIF at the size shown. Place it over the blueprint grid with a thin accent ring or arc behind the shoulders; no box or border around the cutout.
- Phone number is intentionally **not** shown on the site.

## Positioning

**One sentence the whole site proves:** I turn complex business operations into reliable software systems.

- **Hero headline:** I turn complex business operations into reliable software.
- **Hero subline:** Full Stack Engineer and Team Lead. I model how a business actually works, then build systems that hold up under load, failure and messy data.
- **Availability badge:** Open to remote · UTC+6
- **Primary CTA:** See the systems → `/work` · **Secondary:** Download resume

## Proof strip (Home)

| Value | Label |
| --- | --- |
| 5M+ | users reached by the push pipeline |
| 67% | faster Order API (1.2s → 0.4s) |
| 150+ | staff on the C&F ERP |
| 4 | engineers led and mentored |
| 3 yrs | building production systems |

## How I work (Home)

1. **Go to the floor.** Learn how the business really runs before modelling it. (Two months onsite at a factory.)
2. **Model the data.** Get the schema and the rules right; everything else follows.
3. **Build for failure.** Queues, retries, idempotency, audit trails. Assume the network, the device and the traffic will misbehave.
4. **Verify everything.** Including AI-generated code: read the diff, check the requirement, test edge cases, review security.

## Experience

### Govaly Pvt Ltd — Full Stack Software Engineer / Team Lead
- **Dates:** Jul 2025 — Present
- **Link:** https://govaly.com.bd
- **Metric badge:** 5M+ users
- **Summary:** Lead a team of 4 on Govaly, a multi-vendor e-commerce marketplace, and on client ERP systems. Main lead for the mobile app and customer website (homepage, search, category and profile pages). Own architecture, releases and production.
- **Highlights:**
  - Re-architected push notifications for a 5M+ user base into an async Redis / Celery queue pipeline.
  - Built the "For You" hybrid recommendation engine for web and mobile.
  - Cut Order API response time ~67% (1.2s → 0.4s).
  - Architected the C&F ERP and its biometric attendance backend for Standard Freight Incorporation (150+ staff).
  - Improved Google Analytics and Facebook Ads tracking.
  - Built the team's AI-assisted workflow: context docs, custom review skills, diff-first verification.
- **Case studies:** push-pipeline, attendance-backend, for-you, cf-erp
- **Tech:** FastAPI · PostgreSQL · Redis · Celery · Next.js · React Native · Meilisearch · Docker · AWS

### Coders Lab Limited — Software Engineer
- **Dates:** Dec 2023 — Jul 2025
- **Metric badge:** 2 months onsite
- **Summary:** Built manufacturing ERP workflows for HKD International (CEPZ) Ltd: Bill of Materials, Master and Supplier Purchase Orders, materials control and production planning. Spent two months at the factory mapping real processes into software.
- **Tech:** React · TypeScript · Laravel · Node.js · PostgreSQL

### Education and learning
- B.Sc. in Computer Science & Engineering, International Islamic University Chittagong (2022)
- Claude Certified Architect: Foundations (in progress) · AI Engineering (in progress) · Full Stack MERN (Programming Hero) · Complete Node.js Developer (Udemy) · Advanced Patterns in React (Cosden Solutions) · Data Structures & Algorithms (JS Bangladesh)

### Skills (grouped, no levels)
- **Backend:** Python, FastAPI, Node.js, Express, NestJS, Laravel, Celery, REST API design
- **Frontend & mobile:** TypeScript, Next.js, React, React Native, React Query, Zustand, Tailwind
- **Data:** PostgreSQL, Redis, Meilisearch, Alembic, Prisma, MongoDB
- **Infra:** AWS (EC2, S3), Docker, GitHub Actions, Nginx, Linux
- **AI:** Claude Code and Codex workflows; currently learning RAG and embeddings

## Case studies

Order on the Work page: push-pipeline, attendance-backend, for-you, cf-erp. The Order API speed-up is a short section inside push-pipeline and on Home (latency bar), not its own page. Key decisions below are drafts: `TODO(sakib)` confirm wording.

### 1. push-pipeline — Push Notification Pipeline
- **Tagline:** Notifications for 5M+ users without taking the server down.
- **Role:** Designed and built · **Stack:** Python, Celery, Redis, PostgreSQL, Firebase Cloud Messaging
- **Metric:** 5M+ users
- **Problem:** Notifications were sent by looping over users inside the API request. Under heavy traffic the request blocked, the server sometimes crashed, and Firebase rejected bursts with too-many-requests errors.
- **Design:** The API stores the job in a queue and immediately responds that the schedule is set. Celery workers on Redis, backed by PostgreSQL, drain the queue. Under heavy traffic, more workers are added; when it drops, workers are reduced.
- **Result:** The API never blocks. A traffic spike makes the queue longer instead of crashing the server. `TODO(sakib)`: add send time or messages per minute.
- **Key decisions (draft):**
  - A queue instead of more servers: cheaper, and it absorbs spikes instead of failing under them.
  - Respond first, send later: the caller gets an answer in milliseconds regardless of audience size.
  - Scale workers, not the API: capacity follows load, and the web tier stays fast for shoppers.
- **Also on this page:** Order API 1.2s → 0.4s via query optimization, PostgreSQL indexing and caching.

### 2. attendance-backend — Biometric Attendance Backend
- **Tagline:** Hardware is unreliable and HR data is evidence. Every step is replayable, auditable and safe to retry.
- **Role:** Designed the architecture and backend · **Stack:** FastAPI, PostgreSQL, Alembic, Nginx, AWS EC2 · **Device:** ZKTeco SenseFace 2A
- **Status:** MVP built; hardware certification in progress. `TODO(sakib)`: update when live.
- **Metric:** Direct device integration, no vendor middleware
- **Problems and answers:**
  - Device re-sends the same upload → exact replays deduplicated; device gets OK only after the batch commits.
  - Accidental double scan → kept as evidence; counts as checkout only after the shift's minimum gap.
  - Terminal offline, uploads hours later → late punches recalculate the finalized day.
  - HR already corrected a day → the override stays; the day is flagged "Review required".
  - Shift rules change → immutable, effective-dated shift revisions; past days keep their rules.
  - Employee leaves → identity disabled or deleted on terminals via a command queue.
  - Privacy → no face or fingerprint templates or photos stored in the ERP.
- **Design:** terminal → PUSH receiver → immutable raw event + work item (one transaction) → single advisory-locked worker → daily result → 7 reports. Bounded retry, crash recovery, heartbeat.
- **Key decisions (draft):**
  - One locked worker instead of many: correctness first; multi-worker scaling waits until it can be proven safe.
  - Raw evidence is immutable; everything else is derived and can be recalculated.
  - Verify, don't trust: an AI-suggested device-authentication flow was checked against the device documentation and dropped before implementation because the hardware doesn't support it.

### 3. for-you — "For You" Recommendation Engine
- **Tagline:** A personal feed for every shopper, steerable by the business.
- **Role:** Designed and built · **Stack:** FastAPI, PostgreSQL, Next.js, React Native
- **Metric:** Hybrid ranking
- **Problem (draft):** Every shopper saw the same home page and category order, and merchandising had no way to promote products to the right people.
- **Design:** Hybrid scoring from recent searches, product views, cart, orders and category affinity, plus admin-boosted products. One API serves web and mobile.
- **Result:** `TODO(sakib)`: add CTR or share of orders from the feed.
- **Key decisions (draft):**
  - Transparent scoring over ML: works from day one and can be tuned by the business.
  - Admin boost built in, so merchandising and personalization work together.
  - Designed so a learned ranker can replace the scoring step later.
- **Demo data:** generic placeholder products only (shapes and colours), never real Govaly products.

### 4. cf-erp — C&F ERP for Standard Freight Incorporation
- **Tagline:** A clearing-and-forwarding business, from job to ledger, in one system.
- **Role:** Architected and delivered end to end · **Stack:** Next.js, TypeScript, FastAPI, PostgreSQL, Docker, AWS
- **Metric:** 150+ staff
- **Context:** Standard Freight Incorporation, a 150+ person clearing and forwarding company.
- **Design:** Modules for jobs, vouchers, billing, accounts and HR with clear relational boundaries; ~15 operational and financial reports including Ledger, Journal and Contra; HR attendance extended by the biometric backend.
- **Key decisions (draft):**
  - Reports derive from the same posted entries, so they always agree.
  - Clear module boundaries: jobs, money and people evolve independently.
  - Ship in slices: requirements, schema, API, UI, deployment per module.

## AI-assisted engineering (Home section + `/ai-workflow` page)

Everything below is from Sakib's own description of how he and his team work at Govaly, unless marked `TODO(sakib)`.

- **Section label (Home):** `04 / AI WORKFLOW`
- **Headline:** AI writes code. I own the outcome.
- **Subline:** I use Claude Code and Codex every day, inside a workflow built so that generated code fits the existing system and nothing merges unverified.
- **Certification badge:** Claude Certified Architect: Foundations — in progress. `TODO(sakib)`: change to "Certified" + month/year and credential link when passed.

### Principles
1. **Context before code.** For a large legacy codebase, AI loses the architecture easily. We maintain architecture docs, code-pattern docs and project knowledge files so generated code follows existing patterns instead of inventing new abstractions.
2. **Question every claim.** Treat AI output as a proposal to verify, not an answer to trust.
3. **Review in a separate session.** Generated code is reviewed in a fresh, diff-focused session using custom review skills and Codex code review.
4. **If I can't explain it, it doesn't merge.** Every important change is understood: control flow, data flow, dependencies, assumptions.
5. **Humans own security.** Authentication, authorization, API access and data handling are always reviewed manually.
6. **Match the architecture.** Watch for unnecessary complexity, architectural drift and performance problems.

### How I ship a feature with AI (walkthrough, using the SenseFace 2A attendance integration)
| Step | What the AI does | What I do |
| --- | --- | --- |
| 1. Context | Loads the architecture, code-pattern and knowledge files | Keep those files accurate; point it at the right module |
| 2. Research | Reads device docs and proposes a communication design | Challenge claims with a custom R&D / review skill; make it verify against documentation |
| 3. Plan | Drafts the implementation plan | Check it against acceptance criteria, API contracts, permissions and DB requirements |
| 4. Build | Generates code in small steps | Keep diffs reviewable; stop it from adding new patterns |
| 5. Validate | Runs type checks, lint, tests, build | Read failures; never accept "fixed" without re-running |
| 6. Review | Fresh diff-focused review session | Read the Git diff myself; manual review of security-sensitive code |
| 7. Merge | — | Final diff review, then merge |

### The catch (story block)
- **Claim:** During the SenseFace 2A integration, the AI said with high confidence that our server could push an authentication key to the device, and later device requests would include the serial number and that key.
- **Challenge:** I didn't accept it. Using my R&D / code-review skill, I made the AI verify the claim against the device documentation.
- **Result:** It found its own mistake: the device doesn't support a server-pushed key. We removed the assumption before implementation and adjusted the communication design.
- **Lesson:** Confident output is not verified output.

### Verification checklist (used before every merge)
1. Understand the generated code first: read the Git diff (control flow, data flow, dependencies, assumptions).
2. Compare it with the actual requirement: acceptance criteria, API contracts, permissions, inputs and outputs, error cases, UI behaviour, database requirements.
3. Run automated validation: TypeScript / type checks, ESLint, Ruff, unit and integration / API tests, build, existing regression suite.
4. Test important edge cases manually.
5. Verify frontend and backend independently.
6. Inspect database changes and their side effects.
7. Manually review security-sensitive areas: authentication, authorization, API access, data handling.
8. Compare against the existing architecture: unnecessary complexity, drift, performance.
9. Review the final Git diff again before merging.

### Toolkit
- **Agents:** Claude Code, Codex (incl. code review), OpenCode
- **Context:** project architecture docs, code-pattern docs, knowledge files (CLAUDE.md-style project memory)
- **Skills:** custom review skills, custom R&D / verification skill
- **Quality gates:** type checking, ESLint, Ruff, unit and integration tests, build, regression suite
- `TODO(sakib)` confirm before listing: plan mode, subagents, hooks, MCP servers, git worktrees for parallel agents, headless / CI agents.

### Proof built into this site
This portfolio was built the same way: a `CLAUDE.md`, a written build plan, a content brief as the single source of truth, and project skills for the design system and animation patterns. Link: "See how this site was built" → GitHub repo. `TODO(sakib)`: add repo URL once public.

### Team angle
Contributed significantly to building and improving this workflow at Govaly, and coaches the team of 4 on it.

## About (short, used on Home and Experience) — draft, `TODO(sakib)` rewrite in your voice

I learned early that software only works when it matches how people actually work. At Coders Lab I spent two months on a factory floor before building its ERP. At Govaly I lead a team of four engineers, and I build systems that stay correct when traffic spikes, devices go offline or data arrives twice. I use AI heavily, and I verify everything it produces.

## Visual assets

- `public/images/my-image.png` — Sakib's photo (transparent cutout). Copy into `src/assets/` for `<Image>` optimization.
- `public/images/profile-placeholder.svg` — monogram fallback; not needed now that the photo exists.
- `public/images/covers/*.svg` — blueprint placeholder covers per case study.
- Real product screenshots exist in `../` (Govaly admin and website, SFI ERP screens). **Do not use them in v1.** They contain client names, employee names and financial figures. They can be added later only after blurring and the employer's OK.

## Credits

Footer line: "Experience layout inspired by Brittany Chiang." (links to https://brittanychiang.com)
