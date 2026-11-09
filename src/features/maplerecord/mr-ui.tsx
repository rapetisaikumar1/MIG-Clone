import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Archive, ArrowRight, ClipboardList, Inbox, UserCog, Workflow, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MrImage, MrModuleSlug } from "@/lib/content/types";

/*
 * MapleRecord design system. Every MapleRecord page builds on these pieces so the section reads as
 * one product site:
 *   - MrWindow      product screenshot in a frame: a quiet caption row, or a glass bezel in heroes
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
type WindowAspect = "cinema" | "wide" | "video" | "square" | "tall";

const aspectClass: Record<WindowAspect, string> = {
  cinema: "aspect-[16/9]",
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

/** Scales each length in a `sizes` list by `factor` (a crop's enlargement or a focus zoom), so the browser picks a sharp enough file. */
function scaleSizes(sizes: string, factor: number) {
  if (factor <= 1) return sizes;
  return sizes
    .split(",")
    .map((entry) => {
      const m = entry.trim().match(/^(\(.*\)\s+)?(.+)$/);
      return m ? `${m[1] ?? ""}calc(${m[2]} * ${factor.toFixed(3)})` : entry;
    })
    .join(", ");
}

/**
 * A region of a screenshot to zoom into, so small windows show readable UI instead of a whole screen
 * shrunk to texture. `x`/`y` (0–100) is the point of the image to keep in view, as a percentage of its
 * width/height (0 0 = top left, 100 0 = top right); `zoom` (≥ 1) enlarges the image around that point.
 * Example: `{ x: 100, y: 0, zoom: 1.4 }` shows the top-right content area without the sidebar.
 */
export type MrFocus = { x: number; y: number; zoom: number };

/**
 * Product screenshot in an app window. `fit="top"` fills the window and shows the top of the UI
 * (MapleRecord's screenshots are tall mock-ups; the top carries the meaning). `fit="contain"` keeps
 * the whole image visible, for diagrams. `focus` zooms into one region (see MrFocus) — use it when the
 * window renders narrower than about 800px, where a full 1280px-wide screen's text drops below ~9px.
 * `sizes` should describe the window's rendered width. The image area shows a warm paper placeholder
 * until the screenshot loads, and keeps its aspect box, so nothing shifts.
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
  focus,
  chrome = "bar",
  className,
}: {
  image: MrImage;
  /** Caption, e.g. "MR Records" (not shown with the bezel). */
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
  /** Zoom into one region of the screenshot (ignored with `crop` or `fit="contain"`). */
  focus?: MrFocus;
  /**
   * "bar": a quiet caption row with the screen's name above the screen (default). "bezel": a glass
   * bezel for heroes; a `label` then shows as a small caption under the screen.
   */
  chrome?: "bar" | "bezel";
  className?: string;
}) {
  const crop = cropProp ?? builtInFrameCrop[image.src];
  const bezel = chrome === "bezel";
  const dark = tone === "dark";
  const zoom = !crop && fit === "top" && focus && focus.zoom > 1 ? focus : undefined;
  return (
    <figure
      className={cn(
        bezel
          ? // Hero framing: the product UI floats in a thin glass bezel, with no window chrome.
            cn(
              "rounded-[1.25rem] p-1.5 sm:p-2",
              dark
                ? "bg-white/[0.05] shadow-[0_40px_120px_-32px_rgb(0_0_0/0.85)] ring-1 ring-white/12"
                : "bg-ink/[0.03] shadow-[0_32px_80px_-36px_rgb(17_17_17/0.4)] ring-1 ring-ink/10",
            )
          : cn(
              "overflow-hidden rounded-2xl bg-surface",
              dark
                ? "shadow-[0_30px_80px_-24px_rgb(0_0_0/0.7)] ring-1 ring-white/10"
                : "shadow-[0_1px_2px_rgb(17_17_17/0.05),0_24px_56px_-28px_rgb(17_17_17/0.35)] ring-1 ring-ink/10",
            ),
        className,
      )}
    >
      {/* Caption bar: the product mark and the screen's name, quietly, as an app's own title row. */}
      {!bezel && label ? (
        <div className="flex h-9 items-center gap-2 border-b border-line/70 bg-paper/60 px-4 sm:h-10" aria-hidden>
          <LeafMark className="size-3 shrink-0" />
          <span className="truncate text-[0.75rem] font-medium leading-none tracking-[-0.005em] text-muted">{label}</span>
        </div>
      ) : null}
      <div
        className={cn(
          "relative overflow-hidden",
          // Placeholder while the screenshot loads: a warm paper tone with a faint header band, instead of a blank white panel.
          fit === "contain" && !crop ? "bg-surface" : "bg-paper-deep bg-[linear-gradient(to_bottom,rgb(255_255_255/0.55)_0_7%,transparent_7%)]",
          bezel && "rounded-[0.875rem] ring-1 ring-black/5",
          aspectClass[aspect],
        )}
      >
        {crop ? (
          // Enlarged box: every edge extends past the window by the screenshot's own margin, so the margin
          // falls outside; object-cover keeps the window filled (no gaps), anchored at the top.
          <div
            className="absolute"
            style={{ inset: 0, margin: `-${cropPct(crop)}%` }}
          >
            <Image src={image.src} alt={alt} fill sizes={scaleSizes(sizes, 1 / (1 - 2 * crop))} preload={preload} className="object-cover object-top" />
          </div>
        ) : zoom ? (
          // Focal crop: the image covers the window aligned on the focus point, then scales up around it.
          <Image
            src={image.src}
            alt={alt}
            fill
            sizes={scaleSizes(sizes, zoom.zoom)}
            preload={preload}
            className="object-cover"
            style={{ objectPosition: `${zoom.x}% ${zoom.y}%`, transform: `scale(${zoom.zoom})`, transformOrigin: `${zoom.x}% ${zoom.y}%` }}
          />
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
      {/* Bezel caption: names the screen under hero shots, so visitors can tell which module they are looking at. */}
      {bezel && label ? (
        <div className={cn("flex items-center gap-2 px-2 pb-1 pt-2.5 sm:pb-0.5", dark ? "text-night-muted" : "text-muted")} aria-hidden>
          <LeafMark className="size-3 shrink-0" />
          <span className="truncate text-[0.75rem] font-medium leading-none tracking-[-0.005em]">{label}</span>
        </div>
      ) : null}
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

/**
 * Visible breadcrumb trails are switched off site-wide (owner request, 2026-11-09), as in `Breadcrumbs`
 * (src/features/services/sections.tsx). The BreadcrumbList JSON-LD on each page is unchanged.
 */
export const MrCrumbs: (props: { items: { label: string; href?: string }[]; tone?: "light" | "dark" }) => null = () => null;

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
        "card-lift group relative flex h-full flex-col rounded-2xl p-6 transition-[box-shadow,background-color,transform] duration-200 sm:p-7",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2",
        dark
          ? "bg-night-raised ring-1 ring-night-line hover:bg-night-line/40 hover:ring-white/20 has-[a:focus-visible]:outline-night-text"
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
