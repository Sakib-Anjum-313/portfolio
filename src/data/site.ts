const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const withBase = (path: string) => `${base}${path}`;

export const site = {
  name: "Sakib Anjum",
  role: "Full Stack Engineer & Team Lead",
  city: "Chattogram, Bangladesh",
  location: "Chattogram, Bangladesh · open to remote (UTC+6), targeting US and Europe",
  email: "sakibanjum.313@gmail.com",
  linkedin: "https://linkedin.com/in/sakib-anjum-cse",
  github: "https://github.com/Sakib-Anjum-313",
  resume: withBase("/Sakib_Anjum_Resume.pdf"),
  positioning: "I turn complex business operations into reliable software systems.",
} as const;

export const nav = [
  { label: "Work", href: withBase("/work") },
  { label: "Experience", href: withBase("/experience") },
  { label: "AI Workflow", href: withBase("/ai-workflow") },
] as const;

export const hero = {
  headline: "I turn complex business operations into reliable software.",
  subline:
    "Full Stack Engineer and Team Lead. I model how a business actually works, then build systems that hold up under load, failure and messy data.",
  availability: "Open to remote · UTC+6",
  primaryCta: { label: "See the systems", href: withBase("/work") },
  secondaryCta: { label: "Download resume", href: site.resume },
} as const;

export const proof = [
  { value: "2M+", label: "combined users reached by the push pipeline" },
  { value: "67%", label: "faster Order API (1.2s → 0.4s)" },
  { value: "150+", label: "staff on the C&F ERP" },
  { value: "4", label: "engineers led and mentored" },
  { value: "3 yrs", label: "building production systems" },
] as const;

export const howIWork = [
  {
    title: "Go to the floor.",
    body: "Learn how the business really runs before modelling it. (Two months onsite at a factory.)",
  },
  {
    title: "Model the data.",
    body: "Get the schema and the rules right; everything else follows.",
  },
  {
    title: "Build for failure.",
    body: "Queues, retries, idempotency, audit trails. Assume the network, the device and the traffic will misbehave.",
  },
  {
    title: "Verify everything.",
    body: "Including AI-generated code: read the diff, check the requirement, test edge cases, review security.",
  },
] as const;

export const about =
  "I learned early that software only works when it matches how people actually work. At Coders Lab I spent two months on a factory floor before building its ERP. At Govaly I lead a team of four engineers, and I build systems that stay correct when traffic spikes, devices go offline or data arrives twice. I use AI heavily, and I verify everything it produces.";

export const skills = [
  {
    group: "Backend",
    items: ["Python", "FastAPI", "Node.js", "Express", "NestJS", "Laravel", "Celery", "REST API design"],
  },
  {
    group: "Frontend & mobile",
    items: ["TypeScript", "Next.js", "React", "React Native", "React Query", "Zustand", "Tailwind"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "Redis", "Meilisearch", "Alembic", "Prisma", "MongoDB"],
  },
  {
    group: "Infra",
    items: ["AWS (EC2, S3)", "Docker", "GitHub Actions", "Nginx", "Linux"],
  },
  {
    group: "AI",
    items: ["Claude Code and Codex workflows; currently learning RAG and embeddings"],
  },
] as const;

export const education = {
  degree: "B.Sc. in Computer Science & Engineering, International Islamic University Chittagong (2022)",
  learning: [
    "Claude Certified Architect: Foundations (in progress)",
    "AI Engineering (in progress)",
    "Full Stack MERN (Programming Hero)",
    "Complete Node.js Developer (Udemy)",
    "Advanced Patterns in React (Cosden Solutions)",
    "Data Structures & Algorithms (JS Bangladesh)",
  ],
} as const;
