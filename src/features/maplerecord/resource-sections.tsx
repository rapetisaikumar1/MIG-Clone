import Image from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronDown, Clock, MonitorPlay, Newspaper, Presentation, Tag } from "lucide-react";
import { Container } from "@/components/ui/layout";
import type { MrResourceHub } from "@/content/maplerecord/resources";
import { formatDate } from "@/features/insights/format";
import { MrBadge, MrCrumbs, MrIconTile } from "@/features/maplerecord/mr-ui";
import { MrTocNav } from "@/features/maplerecord/resource-toc";
import { getMrArticleExcerpt } from "@/lib/content/maplerecord";
import type { MrArticle, MrArticleBlock } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import styles from "./mr-company.module.css";

/*
 * MapleRecord resources: blog index cards, the editorial article layout (hero, body, table of
 * contents, source note) and the cards that link out to maplerecord.com's resource hubs.
 * Builds on the MapleRecord design system in mr-ui.tsx / mr-sections.tsx. Clickable cards use the site's
 * shared `card-lift` hover and rise in with `reveal` (both motion-safe, globals.css).
 */

type Crumb = { label: string; href?: string };

const articleHref = (a: MrArticle) => `/maplerecord/resources/${a.slug}`;

/* ---------- Article data helpers ---------- */

/** Reading time at ~220 words per minute (rounded up), from the article's blocks. */
export function mrReadingMinutes(a: MrArticle) {
  const words = a.blocks
    .flatMap((b) => (b.type === "list" ? b.items : [b.text]))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

/** Stable anchor id for a heading, e.g. "1. Supporting Transparency" → "supporting-transparency". */
function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

type TocEntry = { id: string; text: string; children: { id: string; text: string }[] };

/** Level-2 headings with their level-3 subsections; ids are de-duplicated. */
function tableOfContents(blocks: MrArticleBlock[]) {
  const seen = new Map<string, number>();
  const ids = new Map<number, string>();
  const toc: TocEntry[] = [];
  blocks.forEach((b, i) => {
    if (b.type !== "heading") return;
    const base = headingId(b.text) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    const id = n ? `${base}-${n + 1}` : base;
    ids.set(i, id);
    const parent = b.level === 3 ? toc.at(-1) : undefined;
    if (parent) parent.children.push({ id, text: b.text });
    else toc.push({ id, text: b.text, children: [] });
  });
  return { toc, ids };
}

/* ---------- Shared bits ---------- */

/** Category, date and reading time. Icons instead of "·" separators, so wrapped lines never start or end with one. */
function ArticleMeta({
  article,
  tone = "light",
  stacked,
  className,
}: {
  article: MrArticle;
  tone?: "light" | "dark";
  /** Category on its own line, date and reading time together below it (for narrow text panels). */
  stacked?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-label uppercase", stacked && "gap-y-2.5", tone === "dark" ? "text-night-muted" : "text-muted", className)}>
      <span className={cn("inline-flex items-center gap-1.5", stacked && "basis-full", tone === "dark" ? "text-night-text" : "text-signal")}>
        <Tag aria-hidden className="size-3.5" />
        {article.category}
        <span className="sr-only">,</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays aria-hidden className="size-3.5" />
        <time dateTime={article.published}>{formatDate(article.published)}</time>
        <span className="sr-only">,</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock aria-hidden className="size-3.5" />
        {mrReadingMinutes(article)} min read
      </span>
    </p>
  );
}

/** Visual "Read article" cue inside a card; the card's heading link carries the accessible name. */
function ReadCue({ children = "Read article" }: { children?: ReactNode }) {
  return (
    <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.9375rem] font-medium text-ink">
      {children}
      <ArrowRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
    </span>
  );
}

/**
 * Clickable card: the shared `card-lift` hover/focus lift. A border (not a ring) draws the edge, because
 * card-lift's shadow would replace a ring's box-shadow; keyboard focus shows as an outline.
 */
const cardSurface =
  "card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface hover:border-line-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal";

/** Stagger index for a grid item's reveal (see .stagger in mr-company.module.css). */
const staggerStyle = (i: number, perRow: number) => ({ "--i": i % perRow }) as CSSProperties;

/* ---------- Blog index ---------- */

/** Large card for the newest article. */
export function MrFeaturedArticle({ article }: { article: MrArticle }) {
  return (
    <article className={cn(cardSurface, "lg:grid lg:grid-cols-12 lg:rounded-3xl")}>
      <div className="relative aspect-[16/9] overflow-hidden bg-paper-deep lg:col-span-7 lg:aspect-auto lg:min-h-[26rem]">
        <Image
          src={article.image.src}
          alt=""
          fill
          preload
          sizes="(min-width: 1248px) 42rem, (min-width: 1024px) calc((100vw - 6rem) * 0.583), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-ink/80 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-white backdrop-blur-sm sm:left-5 sm:top-5">
          Latest article
        </span>
      </div>
      <div className="flex flex-col p-6 sm:p-9 lg:col-span-5 lg:p-10 xl:p-12">
        <ArticleMeta article={article} stacked />
        <h3 className="mt-5 text-[clamp(1.5rem,1.25rem+0.8vw,1.875rem)] font-semibold leading-[1.15] tracking-tight">
          <Link href={articleHref(article)} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:decoration-2 group-hover:underline-offset-[6px]">
            {article.title}
          </Link>
        </h3>
        <p className="mt-4 line-clamp-4 text-muted">{getMrArticleExcerpt(article)}</p>
        <ReadCue />
      </div>
    </article>
  );
}

/** Article card with image, meta, title and excerpt. */
export function MrArticleCard({ article, headingLevel = "h3" }: { article: MrArticle; headingLevel?: "h3" | "h4" }) {
  const Heading = headingLevel;
  return (
    <article className={cardSurface}>
      <div className="relative aspect-[16/9] overflow-hidden bg-paper-deep">
        <Image
          src={article.image.src}
          alt=""
          fill
          sizes="(min-width: 1248px) 35rem, (min-width: 768px) calc(50vw - 3rem), calc(100vw - 2.5rem)"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Stacked, so cards side by side break their meta the same way whatever the category's length. */}
        <ArticleMeta article={article} stacked />
        <Heading className="mt-4 text-[1.3125rem] font-semibold leading-snug tracking-tight">
          <Link href={articleHref(article)} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
            {article.title}
          </Link>
        </Heading>
        <p className="mt-3 line-clamp-3 text-[0.9375rem] text-muted">{getMrArticleExcerpt(article)}</p>
        <ReadCue />
      </div>
    </article>
  );
}

/** Grid of article cards: two columns for two articles, three from three. */
export function MrArticleGrid({ articles, headingLevel }: { articles: MrArticle[]; headingLevel?: "h3" | "h4" }) {
  return (
    <ul className={cn(styles.stagger, "grid gap-6 lg:gap-8", articles.length >= 2 && "md:grid-cols-2", articles.length >= 3 && "lg:grid-cols-3")}>
      {articles.map((a, i) => (
        <li key={a.slug} className="reveal" style={staggerStyle(i, 3)}>
          <MrArticleCard article={a} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}

const hubIcons: Record<MrResourceHub["kind"], ComponentType<{ className?: string }>> = {
  videos: MonitorPlay,
  webinars: Presentation,
  events: CalendarDays,
  media: Newspaper,
};

/**
 * Card linking to a resource hub on maplerecord.com; says it opens the other site in a new tab. A compact
 * row (icon beside the text) on phones, a tile from sm.
 */
export function MrHubCard({ hub, className }: { hub: MrResourceHub; className?: string }) {
  const host = new URL(hub.href).hostname.replace(/^www\./, "");
  return (
    <article className={cn(cardSurface, "flex-row items-start gap-4 p-5 sm:flex-col sm:gap-0 sm:p-7", className)}>
      <MrIconTile icon={hubIcons[hub.kind]} className="shrink-0" />
      <ArrowUpRight
        aria-hidden
        className="absolute right-5 top-5 size-5 text-muted transition-[color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal sm:right-7 sm:top-7"
      />
      <div className="min-w-0 flex-1 sm:mt-6">
        <h3 className="pr-8 text-lg font-semibold leading-snug tracking-tight sm:pr-0">
          <a href={hub.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:underline-offset-4">
            {hub.title}
            <span className="sr-only"> on {host} (opens in a new tab)</span>
          </a>
        </h3>
        <p className="mt-1 text-[0.9375rem] text-muted sm:mt-2">{hub.body}</p>
      </div>
    </article>
  );
}

/** The four resource hubs, rising in one after another. */
export function MrHubGrid({ hubs }: { hubs: MrResourceHub[] }) {
  return (
    <ul className={cn(styles.stagger, "grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6")}>
      {hubs.map((h, i) => (
        <li key={h.kind} className="reveal" style={staggerStyle(i, 4)}>
          <MrHubCard hub={h} className="bg-paper" />
        </li>
      ))}
    </ul>
  );
}

/* ---------- Article page ---------- */

/** Dark editorial hero; leaves room at the bottom for the featured image to overlap. */
export function MrArticleHero({ article, crumbs }: { article: MrArticle; crumbs: Crumb[] }) {
  return (
    <header className="on-night mr-stage-dark relative overflow-hidden border-b border-night-line text-night-text">
      <Container className="relative pb-28 pt-10 sm:pb-36 lg:pb-44 lg:pt-14">
        <MrCrumbs items={crumbs} tone="dark" />
        <div className="max-w-4xl">
          <MrBadge tone="dark">MapleRecord blog</MrBadge>
          <h1 className="mt-6 text-[clamp(2rem,1.45rem+2.3vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.026em]">{article.title}</h1>
          <ArticleMeta article={article} tone="dark" className="mt-7" />
        </div>
      </Container>
    </header>
  );
}

/** Where to anchor each article photo's crop (object-position), so the subject stays in frame. */
const imageFocus: Record<string, string> = {
  "roi-of-modern-records-management": "50% 75%",
};

/**
 * Featured image, pulled up over the hero's bottom edge. From lg it spans the reading column (8 of 12
 * columns) rather than the full container: the source photos are 1080px wide, so this keeps them close to
 * their own resolution instead of upscaling them to ~1150px.
 */
export function MrArticleImage({ article }: { article: MrArticle }) {
  return (
    <Container className="relative -mt-20 grid sm:-mt-28 lg:-mt-36 lg:grid-cols-12 lg:gap-14">
      <figure className="overflow-hidden rounded-2xl bg-paper-deep shadow-[0_30px_80px_-32px_rgb(0_0_0/0.55)] ring-1 ring-black/10 sm:rounded-3xl lg:col-span-8">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          width={article.image.width}
          height={article.image.height}
          preload
          sizes="(min-width: 1248px) 47rem, (min-width: 1024px) calc(66.7vw - 5.5rem), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
          className="aspect-[16/10] h-auto w-full object-cover sm:aspect-[16/9]"
          style={{ objectPosition: imageFocus[article.slug] ?? "50% 50%" }}
        />
      </figure>
    </Container>
  );
}

const takeawayLabels = ["Outcome", "ROI Impact"];

function Paragraph({ text, lead }: { text: string; lead?: boolean }) {
  const label = takeawayLabels.find((l) => text.startsWith(`${l}:`));
  if (label) {
    return (
      <p className="mt-6 rounded-r-xl border-l-2 border-signal bg-surface px-5 py-4 text-ink ring-1 ring-line">
        <strong className="block font-mono text-label uppercase text-signal">
          {label}
          <span className="sr-only">:</span>
        </strong>
        <span className="mt-1.5 block">{text.slice(label.length + 1).trim()}</span>
      </p>
    );
  }
  return <p className={lead ? "text-lead text-ink" : undefined}>{text}</p>;
}

/** "1. Title": number set apart in red; the text (and accessible name) is unchanged. */
function HeadingText({ text }: { text: string }) {
  const m = /^(\d+\.)\s+(.*)$/.exec(text);
  if (!m) return text;
  return (
    <>
      <span className="text-signal">{m[1]}</span> {m[2]}
    </>
  );
}

/** Article body from blocks, with heading anchors that the table of contents links to. */
function ArticleBody({ blocks, ids }: { blocks: MrArticleBlock[]; ids: Map<number, string> }) {
  const firstParagraph = blocks.findIndex((b) => b.type === "paragraph");
  return (
    <div className="prose-mig">
      {blocks.map((b, i) => {
        if (b.type === "list") {
          return (
            <ul key={i}>
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "heading") {
          return b.level === 3 ? (
            <h3 key={i} id={ids.get(i)} className="text-[1.1875rem] leading-snug mt-10">
              <HeadingText text={b.text} />
            </h3>
          ) : (
            <h2 key={i} id={ids.get(i)} className="border-t border-line pt-10 text-[clamp(1.375rem,1.2rem+0.7vw,1.75rem)] leading-[1.2] mt-14">
              <HeadingText text={b.text} />
            </h2>
          );
        }
        return <Paragraph key={i} text={b.text} lead={i === firstParagraph} />;
      })}
    </div>
  );
}

/** The section being read (set by MrTocNav) reads in ink. */
const currentLink = "aria-[current=location]:text-ink";

/** `touch`: 44px rows for the phone disclosure; the desktop rail is denser. */
function TocList({ toc, touch }: { toc: TocEntry[]; touch?: boolean }) {
  return (
    <ol className={cn("text-[0.9375rem]", !touch && "space-y-1")}>
      {toc.map((e) => (
        <li key={e.id}>
          <a
            href={`#${e.id}`}
            className={cn("flex items-center rounded-md py-1 leading-snug text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline", touch ? "min-h-11" : "min-h-8", currentLink)}
          >
            {e.text}
          </a>
          {e.children.length ? (
            <ol className={cn("ml-3 border-l border-line pl-3 text-sm", touch ? "mb-1" : "mb-2 space-y-0.5")}>
              {e.children.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className={cn("flex items-center py-1 leading-snug text-muted underline-offset-4 transition-colors hover:text-ink hover:underline", touch ? "min-h-11" : "min-h-7", currentLink)}
                  >
                    {c.text}
                  </a>
                </li>
              ))}
            </ol>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/**
 * Article body in a ~68ch reading column, with an "On this page" table of contents: a disclosure
 * above the body on small screens, a sticky column beside it from lg. The sticky list is capped to the
 * viewport and scrolls on its own; with JavaScript it marks the section being read (MrTocNav). A thin
 * reading-progress rule tracks the body (CSS only). Ends with the source note.
 */
export function MrArticleLayout({ article }: { article: MrArticle }) {
  const { toc, ids } = tableOfContents(article.blocks);
  const hasToc = toc.length >= 3;
  return (
    <Container className="grid gap-10 pb-20 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-14 lg:pb-28 lg:pt-20">
      {hasToc ? (
        <details className="group/toc rounded-2xl bg-surface ring-1 ring-line lg:hidden">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 font-mono text-label uppercase text-ink-soft [&::-webkit-details-marker]:hidden">
            On this page
            <ChevronDown aria-hidden className="size-4 transition-transform duration-200 group-open/toc:rotate-180 motion-reduce:transition-none" />
          </summary>
          <MrTocNav className="border-t border-line px-5 pb-3 pt-2">
            <TocList toc={toc} touch />
          </MrTocNav>
        </details>
      ) : null}
      <div className={cn(styles.article, "min-w-0 lg:col-span-8")}>
        <span aria-hidden className={styles.progress} />
        <ArticleBody blocks={article.blocks} ids={ids} />
        <SourceNote article={article} />
      </div>
      {hasToc ? (
        <div className="hidden lg:col-span-4 lg:block xl:col-span-3 xl:col-start-10">
          <MrTocNav className="sticky top-28">
            <p className="font-mono text-label uppercase text-muted">On this page</p>
            <div data-toc-scroll className={cn(styles.tocScroll, "mt-4 max-h-[calc(100dvh-11rem)] overflow-y-auto overscroll-contain pb-10")}>
              <div className="relative border-l border-line pl-6">
                <span
                  data-toc-marker
                  aria-hidden
                  className="absolute -left-px top-0 h-px w-0.5 origin-top bg-signal opacity-0 transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none"
                />
                <TocList toc={toc} />
              </div>
            </div>
          </MrTocNav>
        </div>
      ) : null}
    </Container>
  );
}

function SourceNote({ article }: { article: MrArticle }) {
  return (
    <div className="mt-16 flex max-w-[68ch] flex-col gap-5 rounded-2xl bg-paper-deep p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div className="flex items-start gap-4">
        <Image aria-hidden src="/maplerecord/maplerecord-leaf.svg" alt="" width={76} height={68} className="mt-1 h-auto w-7 shrink-0" />
        <div>
          <p className="font-semibold tracking-tight">From the MapleRecord team</p>
          <p className="mt-1 text-[0.9375rem] text-ink-soft">
            First published on maplerecord.com, MapleRecord’s product site, on <time dateTime={article.published}>{formatDate(article.published)}</time>.
          </p>
        </div>
      </div>
      <a
        href={article.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start rounded-full bg-surface px-4.5 text-sm font-medium text-ink ring-1 ring-line-strong transition-colors hover:ring-ink sm:self-auto"
      >
        Read on maplerecord.com
        <ArrowUpRight aria-hidden className="size-4" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
