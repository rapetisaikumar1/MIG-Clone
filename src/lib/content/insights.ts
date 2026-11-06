import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { MDXComponents } from "mdx/types";
import { cache } from "react";
import { insights, type InsightMeta } from "@/content/insights";

export type Insight = InsightMeta & { readingMinutes: number };

const contentDir = path.join(process.cwd(), "src", "content", "insights");

const readSource = cache((slug: string) => readFile(path.join(contentDir, `${slug}.mdx`), "utf8"));

const readingMinutes = cache(async (slug: string) => {
  const raw = await readSource(slug);
  const words = raw.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
});

async function withReadingTime(meta: InsightMeta): Promise<Insight> {
  return { ...meta, readingMinutes: await readingMinutes(meta.slug) };
}

function byDateDesc(a: InsightMeta, b: InsightMeta) {
  return (b.published ?? "9999").localeCompare(a.published ?? "9999");
}

/** Published articles only, unless drafts are explicitly requested (Draft Mode previews). */
export async function getInsights({ includeDrafts = false } = {}): Promise<Insight[]> {
  const list = insights.filter((i) => includeDrafts || i.status === "published").sort(byDateDesc);
  return Promise.all(list.map(withReadingTime));
}

export async function getInsight(slug: string, { includeDrafts = false } = {}): Promise<Insight | null> {
  const meta = insights.find((i) => i.slug === slug);
  if (!meta || (meta.status === "draft" && !includeDrafts)) return null;
  return withReadingTime(meta);
}

export function getPublishedSlugs() {
  return insights.filter((i) => i.status === "published").map((i) => i.slug);
}

export async function loadInsightBody(slug: string) {
  const mod = (await import(`@/content/insights/${slug}.mdx`)) as { default: React.ComponentType<{ components?: MDXComponents }> };
  return mod.default;
}

/** Plain text of the article's `## ` headings, in order, for the "In this article" list. */
export async function getInsightHeadings(slug: string): Promise<string[]> {
  const raw = await readSource(slug);
  return [...raw.matchAll(/^## +(.+?)\s*$/gm)].map((m) => m[1]!.replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1"));
}
