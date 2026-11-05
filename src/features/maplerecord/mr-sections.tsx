import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { ArrowRight, Check, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrOfficial } from "@/content/maplerecord/official";
import { mrContact } from "@/content/maplerecord/overview";
import { contactHref } from "@/features/contact/links";
import { MrBadge, MrCrumbs, MrIconTile, MrLinkCard, MrWindow, mrHalfSizes } from "@/features/maplerecord/mr-ui";
import type { MrImage } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

/**
 * Width of the panel a figure sits in, per breakpoint: `[min-width in px, CSS length]`, widest first,
 * ending with `[0, …]`. Include a 640px entry: the panel changes shape there (square below, 5:4 above).
 */
export type MrPanel = [minWidth: number, width: string][];

/** Panel proportions: `heightRatio` is height ÷ width below and from the sm breakpoint. */
const panelShapes = {
  /** Square on phones, 5:4 from sm. */
  default: { className: "aspect-square rounded-3xl ring-1 ring-inset ring-line/80 sm:aspect-[5/4]", heightRatio: [1, 0.8] },
  /** Portrait 4:5 from sm, for tall diagrams. */
  tall: { className: "aspect-square rounded-3xl ring-1 ring-inset ring-line/80 sm:aspect-[4/5]", heightRatio: [1, 1.25] },
  /** Flush 4:3 image area at the top of a card. */
  card: { className: "aspect-[4/3]", heightRatio: [0.75, 0.75] },
} as const;
export type MrPanelShape = keyof typeof panelShapes;

/** One of two columns at lg (with `gap` rem between them); the full container width below lg. */
export function mrHalfColumn(gap: number): MrPanel {
  return [
    [1248, `${(78 - 6 - gap) / 2}rem`],
    [1024, `calc(50vw - ${(6 + gap) / 2}rem)`],
    [640, "calc(100vw - 4rem)"],
    [0, "calc(100vw - 2.5rem)"],
  ];
}

/**
 * Turns panel widths into a `sizes` value for the image actually drawn inside the panel. Unframed
 * screenshots are fitted inside a 7% inset, so their width depends on the panel's proportions and the
 * image's aspect ratio. The small allowance keeps `sizes` from undershooting: these images use
 * `w-auto`, so their intrinsic width is the `sizes` value.
 */
function panelSizes(panel: MrPanel, image: MrImage, mode: "photo" | "peek" | "fit", shape: MrPanelShape) {
  return panel
    .map(([minWidth, width]) => {
      const heightRatio = panelShapes[shape].heightRatio[minWidth >= 640 ? 1 : 0];
      const factor = mode === "photo" ? 1 : mode === "peek" ? 0.76 : 0.86 * Math.min(1, (heightRatio * image.width) / image.height);
      const length = factor === 1 ? width : `calc(${width} * ${factor.toFixed(3)} + 4px)`;
      return minWidth ? `(min-width: ${minWidth}px) ${length}` : length;
    })
    .join(", ");
}

/**
 * Product screenshot. MapleRecord's images come in many shapes (square, portrait, landscape)
 * and most are white cards with their own borders, so each one is shown as a rounded card,
 * centered on a tinted panel of fixed proportions. Photos (`photo`) fill the frame instead.
 * Pass `panel` (the panel's width per breakpoint) so `sizes` matches the drawn image.
 */
export function MrFigure({
  image,
  className,
  panel,
  sizes: sizesProp,
  preload,
  photo,
  peek,
  shape = "default",
  alt = image.alt,
}: {
  image: MrImage;
  className?: string;
  panel?: MrPanel;
  /** Explicit `sizes`; overrides `panel`. */
  sizes?: string;
  preload?: boolean;
  photo?: boolean;
  /** Show the top of the screenshot at full width, cropped by the panel's bottom edge (for small cards). */
  peek?: boolean;
  shape?: MrPanelShape;
  /** Pass "" when the figure sits inside a link whose text already names it. */
  alt?: string;
}) {
  const sizes = sizesProp ?? (panel ? panelSizes(panel, image, photo ? "photo" : peek ? "peek" : "fit", shape) : "(min-width: 1024px) 40vw, 100vw");
  if (photo) {
    return (
      <div className={cn("overflow-hidden rounded-3xl", className)}>
        <Image src={image.src} alt={alt} width={image.width} height={image.height} sizes={sizes} preload={preload} className="h-auto w-full" />
      </div>
    );
  }
  return (
    <div className={cn("mr-stage-light relative overflow-hidden", panelShapes[shape].className, className)}>
      <div className={peek ? "absolute inset-x-[12%] top-[10%]" : "absolute inset-[7%] flex items-center justify-center"}>
        <Image
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          preload={preload}
          className={cn(
            "rounded-xl shadow-[0_1px_2px_rgb(17_17_17/0.06),0_12px_32px_-12px_rgb(17_17_17/0.18)] ring-1 ring-black/5",
            peek ? "h-auto w-full" : "h-auto max-h-full w-auto max-w-full",
          )}
        />
      </div>
    </div>
  );
}

/**
 * Product hero on the dark stage: breadcrumbs, product badge, headline, CTAs, and the product shown
 * in an app window (or a photo). `children` are extra buttons — use `variant="outline-night"`.
 */
export function MrHero({
  crumbs,
  eyebrow,
  title,
  description,
  image,
  imageLabel,
  imageFit = "top",
  imageAspect = "wide",
  meta,
  officialUrl,
  photo,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  description: string;
  image?: MrImage;
  /** App-window title, e.g. "MR Records · Organization". Defaults to the eyebrow. */
  imageLabel?: string;
  imageFit?: "top" | "contain";
  imageAspect?: "wide" | "video" | "square" | "tall";
  /** Extra content under the description (chips, highlights). Rendered on the dark stage. */
  meta?: ReactNode;
  officialUrl?: string;
  photo?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="on-night mr-stage-dark relative overflow-hidden border-b border-night-line text-night-text">
      <Container className="relative pb-16 pt-8 sm:pb-20 lg:pb-24 lg:pt-10">
        <MrCrumbs items={crumbs} tone="dark" />
        <div className={cn("mt-10 grid items-center gap-12 lg:mt-14", image && "lg:grid-cols-12 lg:gap-14")}>
          <div className={image ? "lg:col-span-6" : "max-w-4xl"}>
            <MrBadge tone="dark">{eyebrow}</MrBadge>
            <h1 className="mt-6 text-h1">{title}</h1>
            <p className="mt-6 max-w-[58ch] text-lead text-night-muted">{description}</p>
            {meta ? <div className="mt-7">{meta}</div> : null}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalLink href={mrOfficial.demo} variant="primary">
                Request a demo
              </ExternalLink>
              {children}
            </div>
            {officialUrl ? (
              <p className="mt-7 text-sm text-night-muted">
                Source:{" "}
                <a href={officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center underline decoration-night-line underline-offset-4 hover:text-night-text">
                  {officialUrl.replace("https://", "").replace(/\/$/, "")}
                  <span className="sr-only"> (opens maplerecord.com in a new tab)</span>
                </a>
              </p>
            ) : null}
          </div>
          {image ? (
            <div className="lg:col-span-6">
              {photo ? (
                <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-[0_30px_80px_-24px_rgb(0_0_0/0.7)]">
                  <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={mrHalfSizes} preload className="h-auto w-full" />
                </div>
              ) : (
                <MrWindow image={image} label={imageLabel ?? eyebrow} fit={imageFit} aspect={imageAspect} sizes={mrHalfSizes} preload tone="dark" />
              )}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

type Stat = { value?: string; label: string; body: string };
type IconType = ComponentType<{ className?: string }>;
/** "night" is the older name for "dark"; both are accepted. */
type DarkTone = "light" | "night" | "dark";
const nn = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Stat cells divided by hairlines. A missing value or "✓" renders a check badge. Five items lay out
 * 2 + 2 + 1 on tablets and 3 + 2 from lg, so no row ends in an empty cell and ranges like "60–75%" fit.
 */
export function MrStats({ items, tone = "light" }: { items: Stat[]; tone?: DarkTone }) {
  const night = tone !== "light";
  const five = items.length === 5;
  return (
    <ul
      className={cn(
        "grid gap-px overflow-hidden rounded-2xl border",
        items.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        items.length === 4 && "lg:grid-cols-4",
        five && "lg:grid-cols-6",
        night ? "border-night-line bg-night-line" : "border-line bg-line",
      )}
    >
      {items.map((s, i) => (
        <li
          key={s.label}
          className={cn(
            "flex flex-col p-6 sm:p-8",
            night ? "bg-night-raised" : "bg-surface",
            five && (i < 3 ? "lg:col-span-2" : "lg:col-span-3"),
            items.length % 2 === 1 && items.length > 3 && i === items.length - 1 && "sm:col-span-2",
          )}
        >
          <span aria-hidden className={cn("mb-6 block h-0.5 w-8 rounded-full", night ? "bg-logo-red" : "bg-signal")} />
          <p className="flex min-h-12 items-end whitespace-nowrap text-[clamp(2.25rem,1.8rem+1.1vw,3rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
            {s.value === "✓" || !s.value ? (
              <span className={cn("inline-flex size-12 items-center justify-center rounded-full ring-1", night ? "bg-white/[0.06] text-night-text ring-white/15" : "bg-signal/[0.07] text-signal ring-signal/20")}>
                <Check aria-hidden className="size-6" strokeWidth={2.5} />
                <span className="sr-only">Included</span>
              </span>
            ) : (
              s.value
            )}
          </p>
          <p className="mt-5 font-semibold leading-snug tracking-tight">{s.label}</p>
          <p className={cn("mt-2 text-[0.9375rem] leading-relaxed", night ? "text-night-muted" : "text-muted")}>{s.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function MrStatsSection({ heading, items, eyebrow = "Measurable impact" }: { heading: string; items: Stat[]; eyebrow?: string }) {
  return (
    <Section tone="night" className="mr-stage-dark" aria-labelledby="impact-title">
      <Container>
        <SectionHeading tone="night" id="impact-title" eyebrow={eyebrow} title={heading} />
        <div className="mt-12">
          <MrStats items={items} tone="night" />
        </div>
        <p className="mt-6 text-sm text-night-muted">Figures as published by MapleRecord.</p>
      </Container>
    </Section>
  );
}

/**
 * Problem / challenge cards: a numbered (or icon, via `icons[i]`) tile, title and body, with a thin
 * signal rule on top. Two or four items sit in two columns; three in a row from lg, and as wide rows
 * (tile beside text) on tablets so narrow columns don't squeeze the headings.
 */
export function MrProblemSection({
  eyebrow,
  heading,
  intro,
  items,
  icons,
  tone = "paper",
  id = "problems-title",
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: { title: string; body: string }[];
  /** Optional icon per item (same order); numbers are shown otherwise. */
  icons?: IconType[];
  tone?: "paper" | "surface" | "deep";
  /** Heading id; change it if the section appears twice on a page. */
  id?: string;
}) {
  const pairs = items.length === 2 || items.length === 4;
  return (
    <Section tone={tone} aria-labelledby={id}>
      <Container>
        <SectionHeading id={id} eyebrow={eyebrow} title={heading} intro={intro} />
        <ul className={cn("mt-12 grid gap-5 lg:gap-6", pairs ? "md:grid-cols-2" : "lg:grid-cols-3")}>
          {items.map((p, i) => {
            const Icon = icons?.[i];
            return (
              <li
                key={p.title}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-2xl p-7 ring-1 ring-line shadow-[0_1px_2px_rgb(17_17_17/0.04)] sm:p-8",
                  tone === "surface" ? "bg-paper" : "bg-surface",
                  !pairs && "md:flex-row md:gap-7 lg:flex-col lg:gap-0",
                )}
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-signal via-signal/30 to-transparent" />
                {Icon ? (
                  <MrIconTile icon={Icon} className="text-signal" />
                ) : (
                  <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-signal/[0.07] font-mono text-sm font-medium text-signal ring-1 ring-signal/15">
                    {nn(i)}
                  </span>
                )}
                <div className={cn("mt-6", !pairs && "md:mt-0 lg:mt-6")}>
                  <h3 className="text-[1.3125rem] font-semibold leading-snug tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-muted">{p.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * Connected step flow. `layout="vertical"` (default): numbered nodes joined by a rail, text beside them;
 * fits a half-width column. `layout="horizontal"`: nodes in a row joined left to right from lg (falls
 * back to vertical below lg); use it full width with 3–5 steps.
 */
export function MrSteps({
  steps,
  tone = "light",
  layout = "vertical",
  className,
}: {
  steps: { title: string; body: string }[];
  tone?: DarkTone;
  layout?: "vertical" | "horizontal";
  className?: string;
}) {
  const dark = tone !== "light";
  const node = (i: number) => (
    <span
      aria-hidden
      className={cn(
        "relative z-[1] inline-flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium",
        i === 0
          ? "bg-signal text-white shadow-[0_0_0_4px_rgb(208_0_0/0.12)]"
          : dark
            ? "bg-night-raised text-night-text ring-1 ring-white/20"
            : "bg-surface text-ink ring-1 ring-line-strong shadow-[0_1px_2px_rgb(17_17_17/0.06)]",
      )}
    >
      {nn(i)}
    </span>
  );
  const rail = dark ? "bg-night-line" : "bg-line-strong/70";
  const muted = dark ? "text-night-muted" : "text-muted";

  if (layout === "horizontal") {
    return (
      <ol className={cn("grid gap-y-10 lg:gap-x-6", steps.length === 3 && "lg:grid-cols-3", steps.length === 4 && "lg:grid-cols-4", steps.length >= 5 && "lg:grid-cols-5", className)}>
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 lg:flex-col lg:gap-0">
            {i < steps.length - 1 ? (
              <>
                {/* Rail to the next node: down on phones/tablets, across from lg. */}
                <span aria-hidden className={cn("absolute bottom-[-2.5rem] left-5 top-10 w-px -translate-x-1/2 lg:hidden", rail)} />
                <span aria-hidden className={cn("absolute left-12 right-[-1.5rem] top-5 hidden h-px lg:block", rail)} />
              </>
            ) : null}
            {node(i)}
            <div className="pt-1.5 lg:pt-6">
              <h3 className="text-lg font-semibold leading-snug tracking-tight">{s.title}</h3>
              <p className={cn("mt-2 text-[0.9375rem] leading-relaxed", muted)}>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={className}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 pb-9 last:pb-0 sm:gap-6">
          {i < steps.length - 1 ? <span aria-hidden className={cn("absolute bottom-0 left-5 top-10 w-px -translate-x-1/2", rail)} /> : null}
          {node(i)}
          <div className="pt-1.5">
            <h3 className="text-lg font-semibold leading-snug tracking-tight">{s.title}</h3>
            <p className={cn("mt-1.5", muted)}>{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Grid of title + body cards. Items with `href` become whole-card links (MrLinkCard). `icons[i]` adds an
 * icon tile; otherwise a mono index labels each card. `tone`: "light" = white cards (for paper/deep
 * sections), "paper" = warm cards (for surface sections), "dark" = on night bands.
 */
export function MrCardGrid({
  items,
  columns = 3,
  icons,
  tone = "light",
}: {
  items: { title: string; body: string; href?: string }[];
  columns?: 2 | 3;
  icons?: IconType[];
  tone?: "light" | "paper" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:gap-6", columns === 3 && "lg:grid-cols-3")}>
      {items.map((u, i) => {
        const Icon = icons?.[i];
        if (u.href) {
          return (
            <li key={u.title}>
              <MrLinkCard href={u.href} title={u.title} body={u.body} icon={Icon} eyebrow={Icon ? undefined : nn(i)} tone={dark ? "dark" : "light"} className={tone === "paper" ? "bg-paper" : undefined} />
            </li>
          );
        }
        return (
          <li
            key={u.title}
            className={cn(
              "flex flex-col rounded-2xl p-6 ring-1 sm:p-7",
              dark ? "bg-night-raised ring-night-line" : tone === "paper" ? "bg-paper ring-line" : "bg-surface ring-line shadow-[0_1px_2px_rgb(17_17_17/0.04)]",
            )}
          >
            {Icon ? (
              <MrIconTile icon={Icon} tone={dark ? "dark" : "light"} className="mb-5" />
            ) : (
              <p aria-hidden className={cn("mb-4 flex items-center gap-2.5 font-mono text-label", dark ? "text-night-muted" : "text-muted")}>
                <span className={cn("h-px w-5", dark ? "bg-logo-red" : "bg-signal")} />
                {nn(i)}
              </p>
            )}
            <h3 className="text-lg font-semibold leading-snug tracking-tight">{u.title}</h3>
            <p className={cn("mt-2 text-[0.9375rem] leading-relaxed", dark ? "text-night-muted" : "text-muted")}>{u.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Title + description rows; reads cleanly at any item count (no orphaned grid cells). `variant="panel"`
 * (default) groups the rows on a white card; `variant="plain"` keeps hairline rows on the section
 * background. `icons[i]` replaces the leading marker.
 */
export function MrRowList({
  items,
  icons,
  variant = "panel",
}: {
  items: { title: string; body: string }[];
  icons?: IconType[];
  variant?: "panel" | "plain";
}) {
  const panel = variant === "panel";
  return (
    <ul className={panel ? "divide-y divide-line overflow-hidden rounded-2xl bg-surface ring-1 ring-line shadow-[0_1px_2px_rgb(17_17_17/0.04)]" : "border-b border-line"}>
      {items.map((u, i) => {
        const Icon = icons?.[i];
        return (
          <li key={u.title} className={cn("grid gap-1.5 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8", panel ? "px-6 py-5 sm:px-8 sm:py-6" : "border-t border-line py-6")}>
            <h3 className="flex gap-3 text-[1.0625rem] font-semibold leading-snug tracking-tight">
              <span aria-hidden className="flex h-[1lh] shrink-0 items-center">
                {Icon ? <Icon className="size-4 text-signal" /> : <span className="size-1.5 rounded-full bg-signal" />}
              </span>
              {u.title}
            </h3>
            <p className="text-muted">{u.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

/** Check-marked list. `columns={2}` splits it from sm. Inherits font size from its parent. */
export function MrChecklist({
  items,
  tone = "light",
  columns = 1,
  className,
}: {
  items: readonly string[];
  tone?: DarkTone;
  columns?: 1 | 2;
  className?: string;
}) {
  const dark = tone !== "light";
  return (
    <ul className={cn("grid gap-x-8 gap-y-3", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="flex h-[1lh] shrink-0 items-center">
            <span className={cn("flex size-5 items-center justify-center rounded-full ring-1", dark ? "bg-white/[0.08] text-night-text ring-white/15" : "bg-signal/[0.07] text-signal ring-signal/20")}>
              <Check className="size-3" strokeWidth={3} />
            </span>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Security & compliance: heading on the left, a compliance panel (shield header, two-column checklist) on the right. */
export function MrSecuritySection({
  heading,
  intro,
  items,
  eyebrow = "Security & compliance",
  panelTitle = "Security & compliance",
  tone = "deep",
}: {
  heading: string;
  intro: string;
  items: string[];
  eyebrow?: string;
  /** Label in the panel's header. */
  panelTitle?: string;
  tone?: "paper" | "surface" | "deep";
}) {
  return (
    <Section tone={tone} aria-labelledby="security-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading id="security-title" eyebrow={eyebrow} title={heading} intro={intro} />
        </div>
        <div className="overflow-hidden rounded-3xl bg-surface ring-1 ring-line shadow-[0_1px_2px_rgb(17_17_17/0.04),0_28px_56px_-36px_rgb(17_17_17/0.3)] lg:col-span-7">
          <div className="flex items-center gap-4 border-b border-line bg-linear-to-b from-paper/70 to-surface px-6 py-5 sm:px-9">
            <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-ink text-paper shadow-[0_6px_16px_-8px_rgb(17_17_17/0.6)]">
              <ShieldCheck className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold leading-snug tracking-tight">{panelTitle}</p>
              <p className="text-sm text-muted">Built into the MapleRecord platform</p>
            </div>
          </div>
          <div className="px-6 py-7 text-[0.9375rem] text-ink-soft sm:px-9 sm:py-8">
            <MrChecklist items={items} columns={2} className="gap-y-4" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Closing call to action used on every MapleRecord page. */
export function MrCta({ title, body }: { title: string; body: string }) {
  return (
    <section className="on-night mr-stage-dark relative overflow-hidden py-20 text-night-text sm:py-24 lg:py-28" aria-labelledby="mr-cta-title">
      <Container className="relative grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-7">
          <Image src="/maplerecord/maplerecord-logo-white.svg" alt="MapleRecord" width={457} height={68} className="h-7 w-auto" />
          <h2 id="mr-cta-title" className="mt-8 text-h2">
            {title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-lead text-night-muted">{body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ExternalLink href={mrOfficial.demo} variant="primary">
              Request a demo
            </ExternalLink>
            <ButtonLink href="/maplerecord/contact" variant="outline-night">
              Contact MapleRecord
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-6 text-[0.9375rem] ring-1 ring-white/10 backdrop-blur-sm sm:p-7 lg:col-span-5">
          <p className="mb-3 font-mono text-label uppercase text-night-muted">Contact MapleRecord</p>
          <a href={`mailto:${mrContact.email}`} className="flex min-h-11 items-center gap-3 hover:underline hover:underline-offset-4">
            <Mail aria-hidden className="size-4 text-night-muted" />
            {mrContact.email}
          </a>
          <a href={`tel:${mrContact.phone.e164}`} className="flex min-h-11 items-center gap-3 hover:underline hover:underline-offset-4">
            <Phone aria-hidden className="size-4 text-night-muted" />
            {mrContact.phone.display}
          </a>
          <div className="mt-2 border-t border-white/10 pt-4">
            <p className="text-sm text-night-muted">MapleRecord is a Maverick InnoGarage product.</p>
            <Link href={contactHref("data-management")} className="mt-1 flex min-h-11 items-center gap-3 text-night-text hover:underline hover:underline-offset-4">
              <ArrowRight aria-hidden className="size-4 shrink-0 text-night-muted" />
              Records programs and data governance with Maverick InnoGarage
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** MapleRecord's offices as map-pin cards (city, office label, postal address). */
export function MrOffices() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6">
      {mrContact.offices.map((o) => (
        <li key={o.label} className="flex gap-5 rounded-2xl bg-surface p-6 ring-1 ring-line shadow-[0_1px_2px_rgb(17_17_17/0.04)] sm:p-7">
          <MrIconTile icon={MapPin} className="text-signal" />
          <div className="min-w-0">
            <p className="font-mono text-label uppercase text-muted">{o.label}</p>
            {"city" in o && o.city ? <p className="mt-2 text-lg font-semibold leading-snug tracking-tight">{o.city}</p> : null}
            <address className="mt-2 not-italic leading-relaxed text-ink-soft">
              {o.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
        </li>
      ))}
    </ul>
  );
}
