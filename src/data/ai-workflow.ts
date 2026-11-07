export const aiWorkflow = {
  sectionLabel: "04 / AI WORKFLOW",
  headline: "AI writes code. I own the outcome.",
  subline:
    "I use Claude Code and Codex every day, inside a workflow built so that generated code fits the existing system and nothing merges unverified.",
  certification: "Claude Certified Architect: Foundations — in progress",
  teamAngle:
    "Contributed significantly to building and improving this workflow at Govaly, and coaches the team of 4 on it.",
} as const;

export const principles = [
  {
    title: "Context before code.",
    body: "For a large legacy codebase, AI loses the architecture easily. We maintain architecture docs, code-pattern docs and project knowledge files so generated code follows existing patterns instead of inventing new abstractions.",
  },
  {
    title: "Question every claim.",
    body: "Treat AI output as a proposal to verify, not an answer to trust.",
  },
  {
    title: "Review in a separate session.",
    body: "Generated code is reviewed in a fresh, diff-focused session using custom review skills and Codex code review.",
  },
  {
    title: "If I can't explain it, it doesn't merge.",
    body: "Every important change is understood: control flow, data flow, dependencies, assumptions.",
  },
  {
    title: "Humans own security.",
    body: "Authentication, authorization, API access and data handling are always reviewed manually.",
  },
  {
    title: "Match the architecture.",
    body: "Watch for unnecessary complexity, architectural drift and performance problems.",
  },
] as const;

// Walkthrough uses the SenseFace 2A attendance integration.
export const walkthrough = [
  {
    step: "1. Context",
    ai: "Loads the architecture, code-pattern and knowledge files",
    me: "Keep those files accurate; point it at the right module",
  },
  {
    step: "2. Research",
    ai: "Reads device docs and proposes a communication design",
    me: "Challenge claims with a custom R&D / review skill; make it verify against documentation",
  },
  {
    step: "3. Plan",
    ai: "Drafts the implementation plan",
    me: "Check it against acceptance criteria, API contracts, permissions and DB requirements",
  },
  {
    step: "4. Build",
    ai: "Generates code in small steps",
    me: "Keep diffs reviewable; stop it from adding new patterns",
  },
  {
    step: "5. Validate",
    ai: "Runs type checks, lint, tests, build",
    me: 'Read failures; never accept "fixed" without re-running',
  },
  {
    step: "6. Review",
    ai: "Fresh diff-focused review session",
    me: "Read the Git diff myself; manual review of security-sensitive code",
  },
  {
    step: "7. Merge",
    ai: "—",
    me: "Final diff review, then merge",
  },
] as const;

export const theCatch = {
  claim:
    "During the SenseFace 2A integration, the AI said with high confidence that our server could push an authentication key to the device, and later device requests would include the serial number and that key.",
  challenge:
    "I didn't accept it. Using my R&D / code-review skill, I made the AI verify the claim against the device documentation.",
  result:
    "It found its own mistake: the device doesn't support a server-pushed key. We removed the assumption before implementation and adjusted the communication design.",
  lesson: "Confident output is not verified output.",
} as const;

export const checklist = [
  "Understand the generated code first: read the Git diff (control flow, data flow, dependencies, assumptions).",
  "Compare it with the actual requirement: acceptance criteria, API contracts, permissions, inputs and outputs, error cases, UI behaviour, database requirements.",
  "Run automated validation: TypeScript / type checks, ESLint, Ruff, unit and integration / API tests, build, existing regression suite.",
  "Test important edge cases manually.",
  "Verify frontend and backend independently.",
  "Inspect database changes and their side effects.",
  "Manually review security-sensitive areas: authentication, authorization, API access, data handling.",
  "Compare against the existing architecture: unnecessary complexity, drift, performance.",
  "Review the final Git diff again before merging.",
] as const;

export const toolkit = [
  { group: "Agents", items: ["Claude Code", "Codex (incl. code review)", "OpenCode"] },
  {
    group: "Context",
    items: [
      "project architecture docs",
      "code-pattern docs",
      "knowledge files (CLAUDE.md-style project memory)",
    ],
  },
  { group: "Skills", items: ["custom review skills", "custom R&D / verification skill"] },
  {
    group: "Quality gates",
    items: [
      "type checking",
      "ESLint",
      "Ruff",
      "unit and integration tests",
      "build",
      "regression suite",
    ],
  },
] as const;

export const proofBuiltIn = {
  body: "This portfolio was built the same way: a CLAUDE.md, a written build plan, a content brief as the single source of truth, and project skills for the design system and animation patterns.",
  linkLabel: "See how this site was built",
  repoUrl: null as string | null,
} as const;
