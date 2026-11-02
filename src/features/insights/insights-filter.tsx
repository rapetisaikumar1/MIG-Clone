"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArticleCard, type ArticleCardData } from "./article-card";

/** Client-side theme filter. All articles are server-rendered, so content is in the initial HTML. */
export function InsightsFilter({ articles, themes }: { articles: ArticleCardData[]; themes: readonly string[] }) {
  const [theme, setTheme] = useState<string>("All");
  const available = ["All", ...themes.filter((t) => articles.some((a) => a.theme === t))];
  const visible = theme === "All" ? articles : articles.filter((a) => a.theme === theme);

  return (
    <div>
      <div role="group" aria-label="Filter insights by theme" className="flex flex-wrap gap-2">
        {available.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={theme === t}
            onClick={() => setTheme(t)}
            className={cn(
              "min-h-11 rounded-full border px-4.5 text-sm font-medium transition-colors",
              theme === t ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "article" : "articles"}
        {theme === "All" ? "" : ` about ${theme}`}
      </p>
      <ul className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => (
          <li key={a.slug}>
            <ArticleCard article={a} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
