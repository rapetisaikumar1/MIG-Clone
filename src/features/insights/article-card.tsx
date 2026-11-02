import Link from "next/link";
import type { Insight } from "@/lib/content/insights";
import { cn } from "@/lib/utils";
import { formatDate } from "./format";

export type ArticleCardData = Pick<Insight, "slug" | "title" | "description" | "theme" | "published" | "readingMinutes" | "status">;

export function ArticleCard({ article, className, headingLevel = "h3" }: { article: ArticleCardData; className?: string; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={cn("group relative flex h-full flex-col border-t border-ink pt-6", className)}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-label uppercase text-muted">
        <span className="text-ink">{article.theme}</span>
        <span aria-hidden>·</span>
        <span>{article.readingMinutes} min read</span>
        {article.status === "draft" ? <span className="rounded-full bg-signal px-2 py-0.5 text-white">Draft</span> : null}
      </div>
      <Heading className="mt-4 text-h3">
        <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {article.title}
        </Link>
      </Heading>
      <p className="mt-3 text-[0.9375rem] text-muted">{article.description}</p>
      <p className="mt-auto pt-6 text-sm text-muted">
        <time dateTime={article.published}>{formatDate(article.published)}</time>
      </p>
    </article>
  );
}
