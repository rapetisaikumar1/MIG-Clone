import Image from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties } from "react";
import {
  Activity,
  AlarmClock,
  ArrowRight,
  Barcode,
  Calculator,
  ChartColumn,
  Check,
  CreditCard,
  DatabaseBackup,
  EyeOff,
  FlaskConical,
  GitBranch,
  Headset,
  HeartPulse,
  History,
  Inbox,
  KeyRound,
  LayoutGrid,
  Lock,
  MousePointerClick,
  PanelsTopLeft,
  Plug,
  Scale,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Split,
  Users,
  Workflow,
} from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrPlatformFlow, mrPlatformPage, mrScreenFocus, type MrFocusRegion } from "@/content/maplerecord/modules";
import { MrChecklist, MrSteps } from "@/features/maplerecord/mr-sections";
import { LeafMark, MrChips, MrIconTile, mrModuleIcons, MrStage } from "@/features/maplerecord/mr-ui";
import { MrZoomFrame } from "@/features/maplerecord/platform-zoom";
import { getMrModule, getMrSolution } from "@/lib/content/maplerecord";
import type { MrImage, MrModule } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import "./platform-sections.css";

/*
 * Page sections for /maplerecord/platform and /maplerecord/platform/[module], built on the MapleRecord
 * design system (mr-ui, mr-sections). Section rhythm on a module page: dark hero → problems (paper) →
 * how it works (surface) → figures (dark band) → product tour (deep) → capabilities (paper) → audience
 * (deep) → other modules (surface) → closing CTA. Sections a module has no content for (MR Admin has no
 * published figures, problems or department use cases) are skipped.
 *
 * Product screens are full 2560 × 1600 app screens. Shown whole in a half-width column their UI text would be
 * a few pixels tall, so in-page windows (MrShot) show a focused region of each screen (mrScreenFocus in
 * modules.ts), as a 4:3 detail on phones, and open the whole screen at full size on click.
 */

type Icon = ComponentType<{ className?: string }>;
const nn = (i: number) => String(i + 1).padStart(2, "0");

/** Re-exported so pages can import the module icons with the platform sections. */
export { mrModuleIcons };

/** Shown once on every page that displays recreated product screens. */
export function MrSampleDataNote({ className }: { className?: string }) {
  return <p className={cn("text-sm text-muted", className)}>Product screens show sample data.</p>;
}

/** Icons for capability cards, keyed by title (see modules.ts); unknown titles fall back to Sparkles. */
const capabilityIcons: Record<string, Icon> = {
  "AI-powered hybrid search": Search,
  "Physical records management": Barcode,
  "Unified governance and compliance": ShieldCheck,
  "Intelligent automation": Sparkles,
  "Centralized request intake": Inbox,
  "Automated deadline tracking": AlarmClock,
  "Approval and workflow management": Workflow,
  "Secure redaction and governance": EyeOff,
  "Compliance and governance support": ShieldCheck,
  "Multi-department coordination": Users,
  "No-code workflow design": MousePointerClick,
  "Intelligent routing and triggers": Split,
  "Real-time monitoring and insights": Activity,
  "Enterprise governance and security": ShieldCheck,
  "Scalable and versioned orchestration": History,
  "Drag-and-drop builder": PanelsTopLeft,
  "Conditional logic": GitBranch,
  "Analytics and insights": ChartColumn,
  "Security and compliance": Lock,
  "Users and access": Users,
  "Products and licensing": CreditCard,
  "Security settings": KeyRound,
  "API and integrations": Plug,
  "Backup and recovery": DatabaseBackup,
  "System and suite settings": Settings2,
};

/** Department teams → icon and the matching MapleRecord solution page. */
const teamMeta: { match: RegExp; icon: Icon; solution: string }[] = [
  { match: /^finance/i, icon: Calculator, solution: "finance-accounting" },
  { match: /^legal/i, icon: Scale, solution: "legal-compliance" },
  { match: /^human/i, icon: Users, solution: "human-resources" },
  { match: /^operations/i, icon: Settings2, solution: "operations" },
  { match: /^healthcare/i, icon: HeartPulse, solution: "healthcare" },
  { match: /^research/i, icon: FlaskConical, solution: "research-development" },
  { match: /^customer/i, icon: Headset, solution: "customer-service" },
];

/** Window proportions that show (nearly) the whole image with `fit="top"`. */
export function mrWindowAspect(image: MrImage) {
  const ratio = image.width / image.height;
  return ratio < 0.9 ? "tall" : ratio < 1.2 ? "square" : ratio < 1.45 ? "video" : "wide";
}

/**
 * Hero `meta` on the dark stage. Items with `href` are links and look like pills (≥ 44px tall); items
 * without are plain highlights with a check, so only real links look clickable.
 */
export function MrDarkChips({ label, items }: { label: string; items: { label: string; href?: string; icon?: Icon }[] }) {
  const links = items.some((i) => i.href);
  return (
    // Links: two equal columns on phones (an odd last pill spans both, so none is left orphaned), a wrapping row from sm.
    // Highlights: a short stacked list on phones (a wrapping row there leaves the third one alone on its line).
    <ul className={cn(links ? "grid grid-cols-2 gap-2 sm:flex sm:flex-wrap" : "flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6")} aria-label={label}>
      {items.map(({ label: text, href, icon: ChipIcon }, i) => (
        <li key={text} className={cn(links && i === items.length - 1 && items.length % 2 === 1 && "col-span-2")}>
          {href ? (
            <Link
              href={href}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-sm text-night-text ring-1 ring-white/15 transition-[background-color,box-shadow] hover:bg-white/[0.06] hover:ring-white/35 sm:w-auto"
            >
              {ChipIcon ? <ChipIcon aria-hidden className="size-3.5 text-night-muted" /> : null}
              {text}
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2.5 text-[0.9375rem] text-night-text">
              <span aria-hidden className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-white/15">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ---------- Focused product screen ---------- */

/** Width of the window per breakpoint: `[min-width in px, CSS length]`, widest first, ending with `[0, …]`; include 640. */
type Panel = [minWidth: number, width: string][];

const pct = (n: number) => `${(n * 100).toFixed(3)}%`;

/** Image size and offset (as CSS lengths relative to the window) that make `region` fill a window of `windowAspect`. */
function regionStyle(image: MrImage, region: MrFocusRegion, windowAspect: number) {
  const imageAspect = image.width / image.height;
  const w = Math.min(region.w, 1, windowAspect / imageAspect);
  const h = (w * imageAspect) / windowAspect; // region height, as a fraction of the image height
  const x = Math.max(0, Math.min(region.x, 1 - w));
  const y = Math.max(0, Math.min(region.y, 1 - h));
  return { w, width: pct(1 / w), left: pct(-x / w), top: pct((-y / w) * (windowAspect / imageAspect)) };
}

/**
 * A product screen in an app window (caption bar + screen), showing the screen's focus region enlarged.
 * `detail`: below 640px the window becomes a 4:3 detail of the region meant for phones. `zoomable`: the
 * screen opens whole at full size (keep it off inside cards that are links themselves).
 */
function MrShot({
  image,
  label,
  panel,
  detail = true,
  zoomable = true,
  className,
}: {
  image: MrImage;
  label: string;
  panel: Panel;
  detail?: boolean;
  zoomable?: boolean;
  className?: string;
}) {
  const focus = mrScreenFocus[image.src];
  const whole = { x: 0, y: 0, w: 1 };
  const desktop = regionStyle(image, focus ?? whole, 1.6);
  const phone = detail ? regionStyle(image, focus?.phone ?? focus ?? whole, 4 / 3) : desktop;
  // The image is drawn 1/w times as wide as the window, so request a file that much wider.
  const sizes = panel
    .map(([min, width]) => {
      const f = (1 / (min >= 640 ? desktop.w : phone.w)).toFixed(3);
      return `${min ? `(min-width: ${min}px) ` : ""}calc(${width} * ${f})`;
    })
    .join(", ");
  const vars = {
    "--mrp-w": desktop.width,
    "--mrp-l": desktop.left,
    "--mrp-t": desktop.top,
    "--mrp-wp": phone.width,
    "--mrp-lp": phone.left,
    "--mrp-tp": phone.top,
  } as CSSProperties;
  const screen = (
    // Same warm placeholder as MrWindow while the (lazy) screen loads, instead of a blank white panel.
    <div className={cn("mrp-shot relative overflow-hidden bg-paper-deep bg-[linear-gradient(to_bottom,rgb(255_255_255/0.55)_0_7%,transparent_7%)]", detail ? "aspect-[4/3] sm:aspect-[16/10]" : "aspect-[16/10]")} style={vars}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} />
    </div>
  );
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-2xl bg-surface shadow-[0_1px_2px_rgb(17_17_17/0.05),0_24px_56px_-28px_rgb(17_17_17/0.35)] ring-1 ring-ink/10",
        className,
      )}
    >
      <div className="flex h-9 items-center gap-2 border-b border-line/70 bg-paper/60 px-4 sm:h-10" aria-hidden>
        <LeafMark className="size-3 shrink-0" />
        <span className="truncate text-[0.75rem] font-medium leading-none tracking-[-0.005em] text-muted">{label}</span>
      </div>
      {zoomable ? (
        <MrZoomFrame image={image} label={label}>
          {screen}
        </MrZoomFrame>
      ) : (
        screen
      )}
    </figure>
  );
}

/* ---------- Module cards (platform index grid and "other modules") ---------- */

const cardPanels: Record<"lg" | "sm", Panel> = {
  // Window is 86% of the card; cards are two columns (gap-6) from md.
  lg: [
    [1248, "31rem"],
    [1024, "calc(43vw - 3.25rem)"],
    [768, "calc(43vw - 2.25rem)"],
    [640, "calc(86vw - 3.5rem)"],
    [0, "calc(86vw - 2.25rem)"],
  ],
  // Four columns (gap-6) from xl, two from md; no screen below md.
  sm: [
    [1280, "15rem"],
    [1024, "calc(43vw - 3.25rem)"],
    [640, "calc(43vw - 2.25rem)"],
    [0, "calc(43vw - 2.25rem)"],
  ],
};

/**
 * Module card: the module's hero screen rises out of a light stage (the window runs past the stage's lower
 * edge on purpose, so it reads as a live app rather than a cropped picture), then name, summary and an
 * "Explore" link that covers the whole card. Small cards drop the screen below md and become compact rows.
 */
export function MrModuleCard({ module: m, size = "lg", index }: { module: MrModule; size?: "lg" | "sm"; index?: number }) {
  const ModuleIcon = mrModuleIcons[m.slug];
  const lg = size === "lg";
  return (
    <article
      className={cn(
        "card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-line",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal",
        !lg && "max-md:rounded-2xl",
      )}
    >
      <div className={cn("mr-stage-light relative overflow-hidden border-b border-line", lg ? "aspect-[16/10]" : "aspect-[16/11] max-md:hidden")}>
        <div className="absolute inset-x-[7%] top-[13%] transition-transform duration-300 ease-out group-hover:-translate-y-1">
          {/* Small cards get the module name: the full screen label would truncate in a quarter-width card. */}
          <MrShot image={m.hero.image} label={lg ? m.hero.image.label : m.name} panel={cardPanels[size]} detail={false} zoomable={false} />
        </div>
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col",
          lg ? "p-7 sm:p-9" : "p-6 sm:p-7 max-md:grid max-md:grid-cols-[auto_minmax(0,1fr)] max-md:gap-x-4 max-md:p-5",
        )}
      >
        <div className={cn("flex items-center gap-3", !lg && "max-md:row-span-3 max-md:items-start")}>
          <MrIconTile icon={ModuleIcon} className={lg ? undefined : "size-9 rounded-lg"} />
          {index !== undefined ? <span className="font-mono text-label uppercase text-muted">Module {nn(index)}</span> : null}
        </div>
        <h3 className={cn("mt-5", lg ? "text-h3" : "text-lg font-semibold tracking-tight max-md:mt-0.5")}>{m.name}</h3>
        <p className={cn("mt-2 text-muted", !lg && "text-[0.9375rem] max-md:mt-1")}>{m.summary}</p>
        {lg ? (
          <div className="mt-6 text-[0.9375rem] text-ink-soft">
            <MrChecklist items={m.highlights} />
          </div>
        ) : null}
        <Link
          href={`/maplerecord/platform/${m.slug}`}
          className={cn(
            "mt-auto inline-flex min-h-11 items-center gap-2 self-start font-medium underline decoration-line-strong decoration-1 underline-offset-[6px] outline-none transition-colors group-hover:decoration-signal",
            "after:absolute after:inset-0 after:rounded-3xl after:content-['']",
            lg ? "pt-7" : "pt-5 text-[0.9375rem] max-md:pt-1",
          )}
        >
          Explore {m.name}
          <ArrowRight aria-hidden className="size-4 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

/** Platform index: the four lifecycle modules as a 2 × 2 grid of product cards (MR Admin follows in its own band). */
export function MrModuleGrid({ modules }: { modules: MrModule[] }) {
  const { eyebrow, title, intro } = mrPlatformPage.showcase;
  return (
    <Section id="modules" aria-labelledby="modules-title" className="lg:pb-24">
      <Container>
        <SectionHeading id="modules-title" eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {modules.map((m, i) => (
            <li key={m.slug} className="reveal">
              <MrModuleCard module={m} index={i} />
            </li>
          ))}
        </ul>
        <MrSampleDataNote className="mt-6" />
      </Container>
    </Section>
  );
}

/** Window inside MrStage padding: the 7-of-12 column from lg, the stage's max width below. */
const bandPanel: Panel = [
  [1248, "36rem"],
  [1024, "calc(50vw - 5rem)"],
  [640, "38rem"],
  [0, "calc(100vw - 5rem)"],
];

/** Platform index: MR Admin as the suite's administration console, with its hero screen and the areas it covers. */
export function MrAdminBand({ module: m }: { module: MrModule }) {
  const band = mrPlatformPage.admin;
  return (
    <Section id="mr-admin" tone="surface" aria-labelledby="admin-title">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading id="admin-title" eyebrow={band.eyebrow} title={band.title} intro={band.body} />
          <MrChips label="What MR Admin manages" items={band.areas} className="mt-8" />
          <div className="mt-9">
            <ArrowLink href={`/maplerecord/platform/${m.slug}`}>Explore {m.name}</ArrowLink>
          </div>
        </div>
        <div className="reveal lg:col-span-7">
          <MrStage className="mx-auto max-w-2xl lg:max-w-none">
            <MrShot image={m.hero.image} label={m.hero.image.label} panel={bandPanel} />
          </MrStage>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Platform index: how the modules connect, in lifecycle order (Forms → Requests → Workflows → Records) with
 * MR Admin as the layer underneath. Connectors join the module nodes at every breakpoint (a rail down the
 * left below lg, a line across from lg); a small dot travels along them when motion is allowed.
 */
export function MrPlatformFlow() {
  const { steps, base } = mrPlatformFlow;
  const admin = getMrModule(base.module);
  const AdminIcon = mrModuleIcons[base.module];
  const card =
    "card-lift relative flex flex-1 flex-col rounded-2xl bg-surface p-6 ring-1 ring-line has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal";
  const stretched = "outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']";
  return (
    <Section tone="deep" aria-labelledby="flow-title">
      <Container>
        <SectionHeading id="flow-title" eyebrow={mrPlatformFlow.eyebrow} title={mrPlatformFlow.heading} intro={mrPlatformFlow.intro} />
        <ol className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-4">
          {steps.map((s, i) => {
            const StepIcon = mrModuleIcons[s.module];
            return (
              <li key={s.module} className="reveal relative flex gap-4 sm:gap-5 lg:flex-col lg:gap-6">
                {i < steps.length - 1 ? (
                  <span
                    aria-hidden
                    style={{ "--mrp-i": i } as CSSProperties}
                    className="mrp-seg absolute -bottom-6 left-[1.375rem] top-11 w-px bg-line-strong lg:-right-6 lg:bottom-auto lg:left-11 lg:top-[1.375rem] lg:h-px lg:w-auto"
                  >
                    <span className="mrp-packet" />
                  </span>
                ) : null}
                <MrIconTile icon={StepIcon} className="relative bg-surface" />
                <div className={card}>
                  {/* 1024–1279px: "04 · Store and govern" wraps in the narrow cards; reserve two lines so the module names stay level. */}
                  <p className="font-mono text-label uppercase text-muted lg:max-xl:min-h-[2lh]">
                    {nn(i)} · {s.role}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    <Link href={`/maplerecord/platform/${s.module}`} className={stretched}>
                      {getMrModule(s.module)?.name ?? s.module}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
        {/* MR Admin as the base layer: dashed drops from every step at lg, one full-width card. */}
        <div className="reveal relative mt-6 lg:mt-10">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 hidden h-10 grid-cols-4 gap-6 lg:grid">
            {steps.map((s) => (
              <span key={s.module} className="relative">
                <span className="absolute inset-y-0 left-[1.375rem] border-l border-dashed border-line-strong" />
              </span>
            ))}
          </div>
          <div className={cn(card, "gap-4 sm:flex-row sm:items-center sm:gap-6 sm:p-7")}>
            <MrIconTile icon={AdminIcon} />
            <div className="sm:w-56 sm:shrink-0">
              <p className="font-mono text-label uppercase text-muted">{base.role}</p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">
                <Link href={`/maplerecord/platform/${base.module}`} className={stretched}>
                  {admin?.name ?? base.module}
                </Link>
              </h3>
            </div>
            <p className="text-[0.9375rem] text-muted sm:flex-1">{base.body}</p>
            <ArrowRight aria-hidden className="hidden size-5 shrink-0 text-signal sm:block" />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- Module page sections ---------- */

/**
 * "Why MR …?": the problems, numbered, in one panel divided by hairlines. Three problems sit in columns from
 * lg (title | body rows on tablets); two are stacked beside the heading. Skipped without `why`.
 */
export function MrModuleProblems({ module: m }: { module: MrModule }) {
  if (!m.why) return null;
  const items = m.why.problems;
  const two = items.length <= 2;
  return (
    <Section aria-labelledby="problems-title">
      <Container className={cn(two && "grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14")}>
        <SectionHeading id="problems-title" eyebrow={`Why ${m.name}?`} title={m.why.heading} className={two ? "lg:col-span-5" : undefined} />
        <ol
          className={cn(
            "grid divide-y divide-line overflow-hidden rounded-3xl bg-surface ring-1 ring-line",
            two ? "lg:col-span-7" : "mt-12 lg:grid-cols-3 lg:divide-x lg:divide-y-0",
          )}
        >
          {items.map((p, i) => (
            <li key={p.title} className={cn("p-7 sm:p-9", !two && "md:grid md:grid-cols-[minmax(0,17rem)_1fr] md:gap-x-10 lg:block")}>
              <div>
                <div className="flex items-center gap-3" aria-hidden>
                  <span className="font-mono text-label text-signal">{nn(i)}</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h3 className={cn("text-xl font-semibold leading-snug tracking-tight", two ? "mt-5" : "mt-6")}>{p.title}</h3>
              </div>
              <p className={cn("mt-3 text-muted", !two && "md:mt-9 lg:mt-3")}>{p.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/** Window width in the 7-of-12 column (inside MrStage padding); capped at 36rem below lg. */
const howPanel: Panel = [
  [1248, "36rem"],
  [1024, "calc(50vw - 5rem)"],
  [640, "32rem"],
  [0, "calc(100vw - 5rem)"],
];

/** "How it operates": steps beside a large framed product screen that stays in view. */
export function MrModuleHow({ module: m }: { module: MrModule }) {
  return (
    <Section tone="surface" aria-labelledby="how-title">
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading id="how-title" eyebrow="How it operates" title={m.how.heading} />
          <div className="mt-10">
            <MrSteps steps={m.how.steps} />
          </div>
        </div>
        <div className="lg:sticky lg:top-40 lg:col-span-7">
          <MrStage className="mx-auto max-w-xl lg:max-w-none">
            <MrShot image={m.how.image} label={m.how.image.label} panel={howPanel} />
          </MrStage>
        </div>
      </Container>
    </Section>
  );
}

/** Tour window: the 7-of-12 column from lg (gap-14), the full container width below. */
const tourPanel: Panel = [
  [1248, "40rem"],
  [1024, "calc((100vw - 9.5rem) * 0.584)"],
  [640, "calc(100vw - 4rem)"],
  [0, "calc(100vw - 2.5rem)"],
];

/**
 * Product tour: 2–4 recreated screens (the page's sample-data note sits in the module hero), each beside a numbered caption of what it shows; each window shows
 * the part of the screen the caption describes and opens the whole screen on click. Rows alternate sides
 * from lg; on smaller screens the caption comes first so the heading leads into its screen.
 */
export function MrModuleTour({ module: m }: { module: MrModule }) {
  const stops = m.tour.stops;
  return (
    <Section id="tour" tone="deep" aria-labelledby="tour-title" className="lg:pb-24">
      <Container>
        <SectionHeading id="tour-title" eyebrow="Product tour" title={`Inside ${m.name}`} intro={m.tour.intro} />
        <ol className="mt-12 grid gap-14 lg:mt-14 lg:gap-20">
          {stops.map((stop, i) => (
            <li key={stop.screen.src} className="reveal grid items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-14">
              <div className={cn("lg:col-span-5", i % 2 === 0 ? "lg:order-2" : "lg:order-1")}>
                <div className="flex items-center gap-3" aria-hidden>
                  <span className="font-mono text-label text-signal">
                    {nn(i)} / {String(stops.length).padStart(2, "0")}
                  </span>
                  <span className="h-px w-12 bg-line-strong" />
                </div>
                <h3 className="mt-4 text-h3 sm:mt-5">{stop.title}</h3>
                <p className="mt-3 max-w-[46ch] leading-relaxed text-muted sm:mt-4 sm:text-lg">{stop.body}</p>
              </div>
              <div className={cn("lg:col-span-7", i % 2 === 0 ? "lg:order-1" : "lg:order-2")}>
                <MrShot image={stop.screen} label={stop.screen.label} panel={tourPanel} />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/**
 * Key capabilities as icon cards with checklists; balanced for 4 (2 × 2), 5 (3 + 2) and 6 (3 × 2) items. Each card
 * spans three rows of a subgrid (icon, title, checklist), so when one title in a row wraps to two lines the
 * hairlines and checklists of its neighbors still start level. The grid's row gap (1.25rem) doubles as the space
 * between those parts.
 */
export function MrModuleCapabilities({ module: m }: { module: MrModule }) {
  const n = m.capabilities.length;
  return (
    <Section aria-labelledby="caps-title">
      <Container>
        {/* The #capabilities target is the heading, so "Explore capabilities" lands on it rather than on the section's top padding. */}
        <div id="capabilities">
          <SectionHeading id="caps-title" eyebrow="Capabilities" title="Key capabilities" />
        </div>
        <ul className={cn("mt-12 grid gap-5 sm:grid-cols-2", n === 5 ? "lg:grid-cols-6" : n !== 4 && "lg:grid-cols-3")}>
          {m.capabilities.map((c, i) => (
            <li
              key={c.title}
              className={cn(
                "reveal row-span-3 grid grid-rows-subgrid rounded-2xl bg-surface p-6 ring-1 ring-line sm:p-7",
                // Five cards: 2 + 2 + 1 (full width) on tablets, 3 + 2 on wide screens.
                n === 5 && (i < 3 ? "lg:col-span-2" : "lg:col-span-3"),
                n === 5 && i === 4 && "sm:col-span-2",
              )}
            >
              <MrIconTile icon={capabilityIcons[c.title] ?? Sparkles} className="justify-self-start" />
              <h3 className="text-lg font-semibold leading-snug tracking-tight">{c.title}</h3>
              <div className="border-t border-line pt-5 text-[0.9375rem] text-ink-soft">
                <MrChecklist items={c.items} />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * "Who it helps": department cards linked to the matching MapleRecord solution pages; compact two-up
 * name cards on phones, icon above the name (beside it, Poppins names such as "Healthcare administration"
 * overflow at 390px). Seven teams get an "All solutions" card to fill a 4 × 2 grid; otherwise that link
 * sits beside the heading. Skipped without `audience`.
 */
export function MrModuleAudience({ module: m }: { module: MrModule }) {
  if (!m.audience) return null;
  const teams = m.audience.teams;
  const cell = teams.length % 2 === 1;
  const card =
    "card-lift relative flex h-full flex-col rounded-2xl bg-surface p-3.5 ring-1 ring-line sm:p-6 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal";
  const stretched = "outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']";
  return (
    <Section tone="deep" aria-labelledby="who-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="who-title" eyebrow="Use cases" title="Who it helps" intro={m.audience.intro} />
          {cell ? null : <ArrowLink href="/maplerecord/solutions">All solutions</ArrowLink>}
        </div>
        <ul className={cn("mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-12", teams.length + (cell ? 1 : 0) === 8 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {teams.map((t) => {
            const meta = teamMeta.find((x) => x.match.test(t.title));
            const solution = meta ? getMrSolution(meta.solution) : null;
            return (
              <li key={t.title} className="reveal">
                <div className={cn(card, "group")}>
                  <div>
                    <MrIconTile icon={meta?.icon ?? Users} className="size-9 rounded-lg sm:size-11 sm:rounded-xl" />
                    <h3 className="mt-3 min-w-0 text-[0.9375rem] font-semibold leading-snug tracking-tight sm:mt-5 sm:text-lg">
                      {solution ? (
                        <Link href={`/maplerecord/solutions/${solution.slug}`} className={stretched}>
                          {t.title}
                          <span className="sr-only"> (see the {solution.label} solution)</span>
                        </Link>
                      ) : (
                        t.title
                      )}
                    </h3>
                  </div>
                  <p className="mt-2 hidden text-[0.9375rem] text-muted sm:block">{t.body}</p>
                  {solution ? (
                    <span aria-hidden className="mt-auto hidden pt-4 sm:block">
                      <ArrowRight className="size-4 text-muted transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-signal" />
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}
          {cell ? (
            <li className="reveal">
              <div className={cn(card, "group bg-transparent ring-line-strong/70")}>
                <div>
                  <MrIconTile icon={LayoutGrid} className="size-9 rounded-lg sm:size-11 sm:rounded-xl" />
                  <h3 className="mt-3 min-w-0 text-[0.9375rem] font-semibold leading-snug tracking-tight sm:mt-5 sm:text-lg">
                    <Link href="/maplerecord/solutions" className={stretched}>
                      All solutions
                    </Link>
                  </h3>
                </div>
                <p className="mt-2 hidden text-[0.9375rem] text-muted sm:block">MapleRecord by department and industry.</p>
                <span aria-hidden className="mt-auto hidden pt-4 sm:block">
                  <ArrowRight className="size-4 text-signal transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </li>
          ) : null}
        </ul>
      </Container>
    </Section>
  );
}

/** Switcher to the other modules (four of the five): compact rows on phones, product cards from md (one row from xl). */
export function MrOtherModules({ modules }: { modules: MrModule[] }) {
  return (
    <Section tone="surface" spacing="compact" aria-labelledby="other-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="other-title" eyebrow="Platform" title="Explore the other modules" />
          <ArrowLink href="/maplerecord/platform">Platform overview</ArrowLink>
        </div>
        <ul className="mt-8 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {modules.map((o) => (
            <li key={o.slug} className="reveal">
              <MrModuleCard module={o} size="sm" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
