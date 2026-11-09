import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Insight } from "@/lib/content/insights";
import { cn } from "@/lib/utils";
import { formatShortDate } from "./format";

export type ArticleCardData = Pick<Insight, "slug" | "title" | "description" | "theme" | "published" | "readingMinutes" | "status">;

/** Separator drawn before every meta item except the first, so a wrapped row never ends on a stray dot. */
const metaItem = "whitespace-nowrap before:mr-3 before:text-line-strong before:content-['·'] first:before:hidden";

/**
 * Editorial card: the whole card is clickable through the title's stretched link.
 * Hover/focus draws a red rule over the top border and nudges the arrow (transform only, motion-safe).
 */
export function ArticleCard({ article, className, headingLevel = "h3" }: { article: ArticleCardData; className?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={cn("group relative flex h-full flex-col border-t border-ink pt-6", className)}>
      <span
        aria-hidden
        className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-signal group-focus-within:scale-x-100 group-hover:scale-x-100 motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label uppercase text-muted">
        <span className={cn(metaItem, "text-ink")}>{article.theme}</span>
        {article.status === "draft" ? <span className="rounded-full bg-signal px-2 py-0.5 text-white">Draft</span> : null}
      </p>
      <Heading className="mt-4 text-h3 text-balance">
        <Link
          href={`/insights/${article.slug}`}
          className="decoration-1 underline-offset-4 after:absolute after:inset-0 group-hover:underline"
        >
          {article.title}
        </Link>
      </Heading>
      <p className="mt-3 text-[0.9375rem] text-muted">{article.description}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-6 text-sm">
        <span aria-hidden className="flex items-center gap-2 font-medium text-ink">
          Read article
          <ArrowRight className="size-4 text-signal motion-safe:transition-transform motion-safe:group-hover:translate-x-1 motion-safe:duration-200" />
        </span>
        {/* Reading time sits with the date, so the top meta row (theme only) never wraps in narrow cards. */}
        <span className="flex items-center gap-x-3 font-mono text-label uppercase text-muted">
          {article.published ? (
            <time dateTime={article.published} className={metaItem}>
              {formatShortDate(article.published)}
            </time>
          ) : null}
          <span className={metaItem}>{article.readingMinutes} min</span>
        </span>
      </div>
    </article>
  );
}
