export type Tone = "default" | "system" | "ok" | "wait" | "fail";

export interface FlowNode {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: Tone;
}

export interface FlowEdge {
  from: string;
  to: string;
  tone?: "flow" | "fail";
  route?: "top";
}

export interface FlowNote {
  x: number;
  y: number;
  text: string;
  tone?: "muted" | "text" | "accent" | "ok" | "wait" | "fail";
  anchor?: "start" | "middle" | "end";
  strike?: boolean;
}

export interface FlowSpec {
  width: number;
  height: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
  notes?: FlowNote[];
}

// Push pipeline: before / after
export const pushBefore: FlowSpec = {
  width: 560,
  height: 140,
  nodes: [
    { id: "req", label: "Requests", x: 0, y: 40, w: 100 },
    { id: "api", label: "API", sub: "loops over users", x: 190, y: 40, w: 140, tone: "fail" },
    { id: "fcm", label: "Firebase", x: 440, y: 40, w: 120 },
  ],
  edges: [
    { from: "req", to: "api" },
    { from: "api", to: "fcm", tone: "fail" },
  ],
  notes: [
    { x: 260, y: 112, text: "Blocks, can crash", tone: "fail", anchor: "middle" },
    { x: 484, y: 112, text: "429 Too Many Requests", tone: "fail", anchor: "middle" },
  ],
};

export const pushAfter: FlowSpec = {
  width: 672,
  height: 150,
  nodes: [
    { id: "req", label: "Requests", x: 0, y: 40, w: 84 },
    { id: "api", label: "API", x: 132, y: 40, w: 84 },
    { id: "queue", label: "Queue", sub: "Redis", x: 264, y: 40, w: 108, tone: "system" },
    { id: "workers", label: "Workers", sub: "Celery", x: 420, y: 40, w: 108, tone: "system" },
    { id: "fcm", label: "Firebase", x: 576, y: 40, w: 96 },
  ],
  edges: [
    { from: "req", to: "api" },
    { from: "api", to: "queue" },
    { from: "queue", to: "workers" },
    { from: "workers", to: "fcm" },
  ],
  notes: [
    { x: 174, y: 112, text: "202 Scheduled", tone: "ok", anchor: "middle" },
    { x: 318, y: 112, text: "Absorbs spikes", tone: "muted", anchor: "middle" },
    { x: 474, y: 112, text: "Scale with load", tone: "muted", anchor: "middle" },
    { x: 474, y: 132, text: "Backed by PostgreSQL", tone: "muted", anchor: "middle" },
  ],
};

// Attendance backend
export const attendanceAfter: FlowSpec = {
  width: 600,
  height: 200,
  nodes: [
    { id: "terminal", label: "Terminal", sub: "SenseFace 2A", x: 0, y: 36, w: 140 },
    { id: "push", label: "PUSH receiver", x: 230, y: 36, w: 140 },
    { id: "raw", label: "Raw event", sub: "+ work item", x: 460, y: 36, w: 140, tone: "system" },
    { id: "worker", label: "Locked worker", sub: "advisory lock", x: 460, y: 116, w: 140, tone: "system" },
    { id: "daily", label: "Daily result", x: 230, y: 116, w: 140 },
    { id: "reports", label: "7 reports", x: 0, y: 116, w: 140 },
  ],
  edges: [
    { from: "terminal", to: "push" },
    { from: "push", to: "raw" },
    { from: "raw", to: "worker" },
    { from: "worker", to: "daily" },
    { from: "daily", to: "reports" },
  ],
  notes: [
    { x: 415, y: 26, text: "one transaction", tone: "accent", anchor: "middle" },
    { x: 0, y: 190, text: "Bounded retry · crash recovery · heartbeat", tone: "muted" },
  ],
};

// For You
export const forYouAfter: FlowSpec = {
  width: 480,
  height: 224,
  nodes: [
    { id: "search", label: "Search", x: 0, y: 0, w: 100, h: 32 },
    { id: "view", label: "View", x: 0, y: 42, w: 100, h: 32 },
    { id: "cart", label: "Cart", x: 0, y: 84, w: 100, h: 32 },
    { id: "order", label: "Order", x: 0, y: 126, w: 100, h: 32 },
    { id: "category", label: "Category", x: 0, y: 168, w: 100, h: 32 },
    { id: "score", label: "Hybrid score", x: 190, y: 78, w: 120, tone: "system" },
    { id: "boost", label: "Admin boost", x: 190, y: 176, w: 120 },
    { id: "feed", label: "Feed", sub: "web + mobile", x: 380, y: 78, w: 100, tone: "system" },
  ],
  edges: [
    { from: "search", to: "score" },
    { from: "view", to: "score" },
    { from: "cart", to: "score" },
    { from: "order", to: "score" },
    { from: "category", to: "score" },
    { from: "boost", to: "score" },
    { from: "score", to: "feed" },
  ],
};

// C&F ERP
export const cfErpAfter: FlowSpec = {
  width: 580,
  height: 260,
  nodes: [
    { id: "jobs", label: "Jobs", x: 0, y: 0, w: 100, h: 40 },
    { id: "vouchers", label: "Vouchers", x: 120, y: 0, w: 100, h: 40, tone: "system" },
    { id: "billing", label: "Billing", x: 240, y: 0, w: 100, h: 40 },
    { id: "accounts", label: "Accounts", x: 360, y: 0, w: 100, h: 40 },
    { id: "hr", label: "HR", x: 480, y: 0, w: 100, h: 40 },
    { id: "posted", label: "Posted entries", x: 100, y: 96, w: 140, tone: "system" },
    { id: "ledger", label: "Ledger", x: 0, y: 176, w: 100, h: 40 },
    { id: "journal", label: "Journal", x: 120, y: 176, w: 100, h: 40 },
    { id: "contra", label: "Contra", x: 240, y: 176, w: 100, h: 40 },
  ],
  edges: [
    { from: "vouchers", to: "posted" },
    { from: "posted", to: "ledger" },
    { from: "posted", to: "journal" },
    { from: "posted", to: "contra" },
  ],
  notes: [
    { x: 380, y: 124, text: "One source,", tone: "text" },
    { x: 380, y: 144, text: "every report agrees", tone: "text" },
    { x: 0, y: 250, text: "3 of ~15 operational and financial reports", tone: "muted" },
  ],
};

// Home: mini diagrams on the system cards
export const miniPush: FlowSpec = {
  width: 264,
  height: 80,
  nodes: [
    { id: "req", label: "Request", x: 0, y: 18, w: 72 },
    { id: "queue", label: "Queue", x: 96, y: 18, w: 72, tone: "system" },
    { id: "workers", label: "Workers", x: 192, y: 18, w: 72 },
  ],
  edges: [
    { from: "req", to: "queue" },
    { from: "queue", to: "workers" },
  ],
};

export const miniAttendance: FlowSpec = {
  width: 264,
  height: 80,
  nodes: [
    { id: "punch", label: "Punch", x: 0, y: 18, w: 72 },
    { id: "evidence", label: "Evidence", x: 96, y: 18, w: 72, tone: "system" },
    { id: "reports", label: "Reports", x: 192, y: 18, w: 72 },
  ],
  edges: [
    { from: "punch", to: "evidence" },
    { from: "evidence", to: "reports" },
  ],
};

export const miniForYou: FlowSpec = {
  width: 264,
  height: 80,
  nodes: [
    { id: "signals", label: "Signals", x: 0, y: 18, w: 72 },
    { id: "score", label: "Score", x: 96, y: 18, w: 72, tone: "system" },
    { id: "feed", label: "Feed", x: 192, y: 18, w: 72 },
  ],
  edges: [
    { from: "signals", to: "score" },
    { from: "score", to: "feed" },
  ],
};

// Home: agent loop (final state)
export const agentLoop: FlowSpec = {
  width: 516,
  height: 130,
  nodes: [
    { id: "context", label: "Context", x: 0, y: 56, w: 84 },
    { id: "plan", label: "Plan", x: 108, y: 56, w: 84 },
    { id: "build", label: "Build", x: 216, y: 56, w: 84 },
    { id: "verify", label: "Verify", x: 324, y: 56, w: 84, tone: "system" },
    { id: "merge", label: "Merge", x: 432, y: 56, w: 84, tone: "ok" },
  ],
  edges: [
    { from: "context", to: "plan" },
    { from: "plan", to: "build" },
    { from: "build", to: "verify" },
    { from: "verify", to: "merge" },
    { from: "verify", to: "plan", tone: "fail", route: "top" },
  ],
  notes: [
    { x: 258, y: 12, text: "assumption rejected, back to plan", tone: "fail", anchor: "middle" },
    { x: 474, y: 124, text: "verified", tone: "ok", anchor: "middle" },
  ],
};

// /ai-workflow: two lanes, AI and Me, seven steps
const steps = ["Context", "Research", "Plan", "Build", "Validate", "Review", "Merge"];

export const aiLanes: FlowSpec = {
  width: 330,
  height: 372,
  nodes: [
    ...steps.slice(0, 6).map((_, i) => ({
      id: `ai${i + 1}`,
      label: String(i + 1),
      x: 40,
      y: 28 + i * 50,
      w: 44,
      h: 32,
    })),
    ...steps.map((_, i) => ({
      id: `me${i + 1}`,
      label: String(i + 1),
      x: 170,
      y: 28 + i * 50,
      w: 44,
      h: 32,
      tone: (i === 6 ? "ok" : "system") as Tone,
    })),
  ],
  edges: steps.slice(0, 6).map((_, i) => ({ from: `ai${i + 1}`, to: `me${i + 1}` })),
  notes: [
    { x: 62, y: 14, text: "AI", tone: "accent", anchor: "middle" },
    { x: 192, y: 14, text: "Me", tone: "accent", anchor: "middle" },
    ...steps.map((name, i) => ({
      x: 232,
      y: 28 + i * 50 + 20,
      text: name,
      tone: "muted" as const,
    })),
  ],
};
