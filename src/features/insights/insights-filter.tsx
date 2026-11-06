"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { ArticleCard, type ArticleCardData } from "./article-card";

const ALL = "All";
const CHANGE_EVENT = "insights-theme-change";

/** "Data Management" -> "data-management", used in the shareable `?theme=` query. */
const toParam = (theme: string) => theme.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}
const getParam = () => new URLSearchParams(window.location.search).get("theme") ?? "";
// The page is statically rendered, so the server (and hydration) always starts from "All".
const getServerParam = () => "";

/**
 * Client-side theme filter. All articles are server-rendered, so content is in the initial HTML.
 * The selected theme is mirrored in `?theme=<slug>` so a filtered view can be shared or bookmarked.
 * Themes with no published articles are not offered; an unknown `?theme=` falls back to "All".
 */
export function InsightsFilter({ articles, themes }: { articles: ArticleCardData[]; themes: readonly string[] }) {
  const param = useSyncExternalStore(subscribe, getParam, getServerParam);
  const available = themes.filter((t) => articles.some((a) => a.theme === t));
  const theme = available.find((t) => toParam(t) === toParam(param)) ?? ALL;
  const visible = theme === ALL ? articles : articles.filter((a) => a.theme === theme);

  function select(next: string) {
    const url = new URL(window.location.href);
    if (next === ALL) url.searchParams.delete("theme");
    else url.searchParams.set("theme", toParam(next));
    window.history.replaceState(window.history.state, "", url);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  if (articles.length === 0) {
    return <p className="text-lead text-muted">New articles are on the way. Please check back soon.</p>;
  }

  return (
    <div>
      {available.length > 1 ? (
        <div role="group" aria-label="Filter insights by theme" className="flex flex-wrap gap-2">
          {[ALL, ...available].map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={theme === t}
              onClick={() => select(t)}
              className={cn(
                "min-h-11 rounded-full border px-4.5 text-sm font-medium transition-colors",
                theme === t ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      ) : null}
      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "article" : "articles"}
        {theme === ALL ? "" : ` about ${theme}`}
      </p>
      <ul className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => (
          <li key={a.slug} className="reveal">
            <ArticleCard article={a} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
