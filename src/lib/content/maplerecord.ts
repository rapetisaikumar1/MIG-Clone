import { mrArticles } from "@/content/maplerecord/articles";
import { mrModules } from "@/content/maplerecord/modules";
import { mrSolutions } from "@/content/maplerecord/solutions";
import type { MrArticle, MrModuleSlug, MrSolution } from "./types";

export function getMrModules() {
  return mrModules;
}

export function getMrModule(slug: string) {
  return mrModules.find((m) => m.slug === slug) ?? null;
}

export function getMrModuleName(slug: MrModuleSlug) {
  return mrModules.find((m) => m.slug === slug)?.name ?? slug;
}

export function getMrSolutions(kind?: MrSolution["kind"]) {
  return kind ? mrSolutions.filter((s) => s.kind === kind) : mrSolutions;
}

export function getMrSolution(slug: string) {
  return mrSolutions.find((s) => s.slug === slug) ?? null;
}

export function getMrArticles() {
  return [...mrArticles].sort((a, b) => b.published.localeCompare(a.published));
}

export function getMrArticle(slug: string) {
  return mrArticles.find((a) => a.slug === slug) ?? null;
}

/** First paragraph of an article, used for cards and meta descriptions. */
export function getMrArticleExcerpt(article: MrArticle) {
  for (const block of article.blocks) if (block.type === "paragraph") return block.text;
  return "";
}
