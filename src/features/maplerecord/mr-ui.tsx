import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Archive, ArrowRight, ClipboardList, Inbox, UserCog, Workflow, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MrImage, MrModuleSlug } from "@/lib/content/types";

/*
 * MapleRecord design system. Every MapleRecord page builds on these pieces so the section reads as
 * one product site:
 *   - MrWindow      product screenshot in an app-window frame (title bar + label)
 *   - MrStage       light or dark backdrop a window sits on (fine grid, soft glow)
 *   - MrBadge       small product pill (logo mark + label), used in heroes
 *   - MrIconTile    square icon tile for feature cards
 *   - MrFeatureCard icon + title + body card
 *   - MrCrumbs      breadcrumbs that work on light and dark backgrounds
 *   - MrChip        small meta chip (hero highlights, tags); MrChips renders a labelled list of them.
 *                   Use these instead of <Tag> on dark stages (Tag's muted text fails contrast there).
 *   - MrLinkCard    whole-card link (icon or eyebrow, title, body, arrow cue); the title is the link
 *                   name and a stretched hit area covers the card
 *   - MrSectionDivider  hairline with the leaf mark, to split two sections of the same tone
 *   - mrModuleIcons one lucide icon per module slug, so every page shows the same icon for a module
 * Shared section blocks (MrHero, MrStats, MrSteps, MrChecklist, MrCta, …) live in mr-sections.tsx.
 * Section rhythm: hero (dark stage) → light sections alternating paper / surface / deep →
 * one dark band for figures → closing CTA (dark stage).
 * Tones: components take `tone="light" | "dark"`; mr-sections' older blocks also accept "night" (= dark).
 */

type WindowFit = "top" | "contain";
type WindowAspect = "wide" | "video" | "square" | "tall";

const aspectClass: Record<WindowAspect, string> = {
  wide: "aspect-[16/10]",
  video: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
};

/**
 * Screenshots that ship with their own white frame and margin. MrWindow trims them by default so they
 * don't show a frame inside the window frame. Pass `crop={0}` to opt out.
 */
const builtInFrameCrop: Record<string, number> = {
  "/maplerecord/records-app.webp": 0.05,
  "/maplerecord/requests-app.webp": 0.062,
  "/maplerecord/workflows-app.webp": 0.058,
};

/** Margin of the enlarged crop box, as a percentage of the window width. */
const cropPct = (crop: number) => ((crop / (1 - 2 * crop)) * 100).toFixed(3);

/** Scales each length in a `sizes` list by the crop's enlargement, so the browser picks a sharp enough file. */
function cropSizes(sizes: string, crop: number) {
  const factor = (1 / (1 - 2 * crop)).toFixed(3);
  return sizes
    .split(",")
    .map((entry) => {
      const m = entry.trim().match(/^(\(.*\)\s+)?(.+)$/);
      return m ? `${m[1] ?? ""}calc(${m[2]} * ${factor})` : entry;
    })
    .join(", ");
}

/**
 * Product screenshot in an app window. `fit="top"` fills the window and shows the top of the UI
 * (MapleRecord's screenshots are tall mock-ups; the top carries the meaning). `fit="contain"` keeps
 * the whole image visible, for diagrams. `sizes` should describe the window's rendered width.
 */
export function MrWindow({
  image,
  label,
  fit = "top",
  aspect = "wide",
  sizes,
  preload,
  alt = image.alt,
  tone = "light",
  crop: cropProp,
  className,
}: {
  image: MrImage;
  /** Title-bar label, e.g. "MR Records". */
  label?: string;
  fit?: WindowFit;
  aspect?: WindowAspect;
  sizes: string;
  preload?: boolean;
  alt?: string;
  /** "dark" when the window sits on a dark stage (stronger shadow, darker hairline). */
  tone?: "light" | "dark";
  /**
   * For screenshots that carry their own white frame/margin: the fraction of the image's width to trim
   * from each edge (e.g. 0.05). Implies `fit="top"`. Default: no crop.
   */
  crop?: number;
  className?: string;
}) {
  const crop = cropProp ?? builtInFrameCrop[image.src];
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl bg-surface",
        tone === "dark"
          ? "shadow-[0_30px_80px_-24px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
          : "shadow-[0_1px_2px_rgb(17_17_17/0.05),0_24px_56px_-28px_rgb(17_17_17/0.35)] ring-1 ring-ink/10",
        className,
      )}
    >
      {/* Title bar: window controls, then the label centred in an address-style pill. */}
      <div className="grid h-9 grid-cols-[3.25rem_minmax(0,1fr)_3.25rem] items-center gap-2 border-b border-line/70 bg-linear-to-b from-surface to-paper/90 px-3.5 sm:h-10" aria-hidden>
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong/80" />
          <span className="size-2.5 rounded-full bg-line-strong/80" />
          <span className="size-2.5 rounded-full bg-line-strong/80" />
        </span>
        {label ? (
          <span className="mx-auto flex max-w-full min-w-0 items-center gap-1.5 rounded-md bg-paper px-2.5 py-1 ring-1 ring-line/80">
            <LeafMark className="size-3 shrink-0" />
            <span className="truncate font-mono text-[0.6875rem] uppercase leading-none tracking-[0.08em] text-muted">{label}</span>
          </span>
        ) : null}
      </div>
      <div className={cn("relative overflow-hidden bg-surface", aspectClass[aspect])}>
        {crop ? (
          // Enlarged box: every edge extends past the window by the screenshot's own margin, so the margin
          // falls outside; object-cover keeps the window filled (no gaps), anchored at the top.
          <div
            className="absolute"
            style={{ inset: 0, margin: `-${cropPct(crop)}%` }}
          >
            <Image src={image.src} alt={alt} fill sizes={cropSizes(sizes, crop)} preload={preload} className="object-cover object-top" />
          </div>
        ) : (
          <Image
            src={image.src}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            className={fit === "top" ? "object-cover object-top" : "object-contain p-[4%]"}
          />
        )}
      </div>
    </figure>
  );
}

/** Backdrop for product windows. Padding scales with the viewport so the window stays the hero. */
export function MrStage({ tone = "light", children, className }: { tone?: "light" | "dark"; children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl p-5 sm:p-8 lg:p-10", tone === "dark" ? "mr-stage-dark" : "mr-stage-light ring-1 ring-inset ring-line/80", className)}>
      {children}
    </div>
  );
}

/** Product pill: MapleRecord leaf + label. */
export function MrBadge({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-3.5 font-mono text-label uppercase",
        tone === "dark" ? "bg-white/[0.06] text-night-text ring-1 ring-white/12" : "bg-surface text-ink-soft ring-1 ring-line",
      )}
    >
      <LeafMark className="size-4" />
      {children}
    </p>
  );
}

/** The maple leaf from MapleRecord's logo, as a standalone mark (vector; `object-contain` keeps its 76:68 shape in square boxes). */
export function LeafMark({ className }: { className?: string }) {
  return (
    <Image aria-hidden src="/maplerecord/maplerecord-leaf.svg" alt="" width={76} height={68} className={cn("h-auto object-contain", className)} />
  );
}

export function MrIconTile({ icon: Icon, tone = "light", className }: { icon: ComponentType<{ className?: string }>; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-xl",
        tone === "dark" ? "bg-white/[0.07] text-night-text ring-1 ring-white/12" : "bg-paper text-signal ring-1 ring-line",
        className,
      )}
    >
      <Icon className="size-5" />
    </span>
  );
}

export function MrFeatureCard({
  icon,
  title,
  body,
  tone = "light",
  headingLevel = "h3",
  children,
}: {
  icon?: ComponentType<{ className?: string }>;
  title: string;
  body?: string;
  tone?: "light" | "dark";
  headingLevel?: "h3" | "h4";
  children?: ReactNode;
}) {
  const Heading = headingLevel;
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl p-6 sm:p-7",
        tone === "dark" ? "bg-night-raised ring-1 ring-night-line" : "bg-surface ring-1 ring-line",
      )}
    >
      {icon ? <MrIconTile icon={icon} tone={tone} /> : null}
      <Heading className={cn("text-lg font-semibold leading-snug tracking-tight", icon && "mt-5")}>{title}</Heading>
      {body ? <p className={cn("mt-2 text-[0.9375rem]", tone === "dark" ? "text-night-muted" : "text-muted")}>{body}</p> : null}
      {children}
    </div>
  );
}

/** Breadcrumbs for MapleRecord heroes; `tone="dark"` on dark stages. */
export function MrCrumbs({ items, tone = "light" }: { items: { label: string; href?: string }[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn("flex flex-wrap items-center gap-x-2 text-sm", dark ? "text-night-muted" : "text-muted")}>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden>/</span> : null}
            {item.href ? (
              <Link href={item.href} className={cn("inline-flex min-h-6 items-center underline-offset-4 hover:underline", dark ? "hover:text-night-text" : "hover:text-ink")}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-night-text" : "text-ink"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Responsive `sizes` for a window in one of two hero/feature columns inside the 78rem container. */
export const mrHalfSizes = "(min-width: 1248px) 36rem, (min-width: 1024px) 45vw, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)";

/**
 * Small meta chip for hero highlights and tags. `icon` is optional (lucide icon); without one a small
 * signal dot leads. Contrast: night-text on the dark stage, ink-soft on light (both ≥ 7:1).
 */
export function MrChip({
  children,
  icon: Icon,
  tone = "light",
  className,
}: {
  children: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-2 rounded-full px-3 text-[0.8125rem] font-medium leading-tight",
        dark ? "bg-white/[0.06] text-night-text ring-1 ring-white/14" : "bg-surface text-ink-soft ring-1 ring-line",
        className,
      )}
    >
      {Icon ? (
        <Icon aria-hidden className={cn("size-3.5 shrink-0", dark ? "text-night-muted" : "text-signal")} />
      ) : (
        <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", dark ? "bg-logo-red" : "bg-signal")} />
      )}
      {children}
    </span>
  );
}

/** A labelled list of MrChips, e.g. `<MrChips label="Highlights" items={m.hero.trust} tone="dark" />`. */
export function MrChips({
  items,
  label,
  tone = "light",
  icon,
  className,
}: {
  items: readonly string[];
  /** Accessible name for the list. */
  label: string;
  tone?: "light" | "dark";
  icon?: ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item}>
          <MrChip tone={tone} icon={icon}>
            {item}
          </MrChip>
        </li>
      ))}
    </ul>
  );
}

/**
 * Card that links somewhere as a whole. The title is the link (so its accessible name stays short) and a
 * stretched pseudo-element makes the full card clickable; the card shows the focus ring. `cta` is a visual
 * cue under the body (e.g. "Explore module"); `eyebrow` a mono label above the title; `children` render
 * between body and cta (keep them non-interactive).
 */
export function MrLinkCard({
  href,
  title,
  body,
  eyebrow,
  icon,
  cta,
  tone = "light",
  headingLevel = "h3",
  className,
  children,
}: {
  href: string;
  title: string;
  body?: string;
  eyebrow?: string;
  icon?: ComponentType<{ className?: string }>;
  cta?: string;
  tone?: "light" | "dark";
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
  children?: ReactNode;
}) {
  const Heading = headingLevel;
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl p-6 transition-[box-shadow,background-color] duration-200 sm:p-7",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2",
        dark
          ? "bg-night-raised ring-1 ring-night-line hover:bg-[#1e1e20] hover:ring-white/20 has-[a:focus-visible]:outline-night-text"
          : "bg-surface ring-1 ring-line hover:shadow-[0_18px_40px_-24px_rgb(17_17_17/0.3)] hover:ring-line-strong has-[a:focus-visible]:outline-signal",
        className,
      )}
    >
      {icon ? <MrIconTile icon={icon} tone={tone} className="mb-5" /> : null}
      {eyebrow ? <p className={cn("mb-3 font-mono text-label uppercase", dark ? "text-night-muted" : "text-muted")}>{eyebrow}</p> : null}
      <Heading className="text-lg font-semibold leading-snug tracking-tight">
        <Link href={href} className="inline-flex min-h-6 items-center outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']">
          {title}
        </Link>
      </Heading>
      {body ? <p className={cn("mt-2 text-[0.9375rem]", dark ? "text-night-muted" : "text-muted")}>{body}</p> : null}
      {children}
      <span
        aria-hidden
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium",
          dark ? "text-night-text" : "text-ink",
        )}
      >
        {cta}
        <ArrowRight className={cn("size-4 transition-transform duration-200 group-hover:translate-x-0.5", dark ? "text-night-text" : "text-signal")} />
      </span>
    </div>
  );
}

/** Hairline with the leaf mark at its centre, for separating two adjacent sections of the same tone. */
export function MrSectionDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("mx-auto flex w-full max-w-[78rem] items-center gap-4 px-5 sm:px-8 lg:px-12", className)}>
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-line" />
      <LeafMark className="size-4 opacity-80" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-line" />
    </div>
  );
}

/** The icon that stands for each MapleRecord module, everywhere in the section. */
export const mrModuleIcons: Record<MrModuleSlug, LucideIcon> = {
  "mr-records": Archive,
  "mr-requests": Inbox,
  "mr-workflows": Workflow,
  "mr-forms": ClipboardList,
  "mr-admin": UserCog,
};
