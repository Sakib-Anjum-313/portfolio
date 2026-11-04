import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "*.mdx", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string(),
    role: z.string(),
    stack: z.array(z.string()),
    status: z.string().optional(),
    metric: z.string(),
    category: z.array(z.enum(["Backend", "Full stack", "Integrations"])),
    order: z.number(),
    cover: z.string(),
    context: z.string().optional(),
    problem: z.string().optional(),
    problems: z.array(z.object({ problem: z.string(), answer: z.string() })).optional(),
    design: z.string(),
    result: z.string().optional(),
    decisions: z.array(z.string()),
    device: z.string().optional(),
    alsoCovers: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./src/content/experience" }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    start: z.string(),
    end: z.string(),
    url: z.url().optional(),
    summary: z.string(),
    highlights: z.array(z.string()).default([]),
    metric: z.string(),
    caseStudies: z.array(reference("work")).default([]),
    tech: z.array(z.string()),
    order: z.number(),
  }),
});

export const collections = { work, experience };
