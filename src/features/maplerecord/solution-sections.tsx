import Image from "next/image";
import Link from "next/link";
import type { ComponentType, CSSProperties } from "react";
import {
  ArrowDown,
  ArrowRight,
  Banknote,
  Calculator,
  Check,
  CircleAlert,
  ClipboardCheck,
  Clock,
  Cog,
  Factory,
  Files,
  FlaskConical,
  FolderOpen,
  Gauge,
  GraduationCap,
  Headset,
  HeartPulse,
  Landmark,
  LayoutGrid,
  Lock,
  Scale,
  ShieldAlert,
  Umbrella,
  Users,
} from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { ExternalLink } from "@/components/ui/external-link";
import { mrOfficial } from "@/content/maplerecord/official";
import { mrScreens, type MrScreen, type MrScreenKey } from "@/content/maplerecord/screens";
import { mrSolutionFlows, mrSolutionModuleScreens, mrSolutionPointers, mrSolutionSummaries } from "@/content/maplerecord/solutions";
import { MrProblemSection, MrSampleNote } from "@/features/maplerecord/mr-sections";
import { LeafMark, MrBadge, MrChips, MrCrumbs, MrIconTile, MrLinkCard, MrStage, mrModuleIcons } from "@/features/maplerecord/mr-ui";
import { getMrModuleName, getMrModules } from "@/lib/content/maplerecord";
import type { MrModuleSlug, MrSolution } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import css from "./solution-sections.module.css";

/*
 * Page-specific pieces for /maplerecord/solutions and /maplerecord/solutions/[slug]. They build on the
 * shared MapleRecord design system (mr-ui, mr-sections) and keep its rhythm: light sections alternate
 * paper / surface / deep between the dark hero, the dark figures band and the closing CTA.
 * Motion (solution-sections.module.css): a slow screen pan on module cards, steps that draw in as they
 * scroll, travelling dots on the two diagrams. All of it is off with prefers-reduced-motion.
 */

type Icon = ComponentType<{ className?: string }>;

/** One icon per solution, used on directory cards, the index map and related links. */
const solutionIcons: Record<string, Icon> = {
  "financial-services": Banknote,
  insurance: Umbrella,
  healthcare: HeartPulse,
  education: GraduationCap,
  manufacturing: Factory,
  "state-local-government": Landmark,
  "finance-accounting": Calculator,
  "legal-compliance": Scale,
  "human-resources": Users,
  operations: Cog,
  "research-development": FlaskConical,
  "customer-service": Headset,
};

function solutionIcon(slug: string): Icon {
  return solutionIcons[slug] ?? LayoutGrid;
}

const moduleIcons = mrModuleIcons;
const allModules: MrModuleSlug[] = ["mr-records", "mr-requests", "mr-workflows", "mr-forms", "mr-admin"];

/** Focus areas from a solution's `tagline` ("A · B · C"). */
function focusAreas(s: MrSolution) {
  return s.tagline
    .split("·")
    .map((t) => t.trim())
    .filter(Boolean);
}

const numberWords = ["None", "One", "Two", "Three", "Four", "Five"];

/** Multiplies every length in a `sizes` list, for images drawn larger than their window (zoomed crops). */
function scaleSizes(sizes: string, factor: number) {
  return sizes
    .split(",")
    .map((entry) => {
      const m = entry.trim().match(/^(\(.*\)\s+)?(.+)$/);
      return m ? `${m[1] ?? ""}calc(${m[2]} * ${factor.toFixed(3)})` : entry;
    })
    .join(", ");
}

/* ------------------------------------------------------------------ hero */

/** Hero `meta` slot on solution pages: focus-area chips, plus the sample-data note for the hero screen. */
export function SolutionHeroMeta({ solution }: { solution: MrSolution }) {
  return (
    <>
      <MrChips items={focusAreas(solution)} label="Focus areas" tone="dark" />
      <MrSampleNote tone="dark" className="mt-4" />
    </>
  );
}

/** Index hero: jump links to the two directories, with their counts. */
export function SolutionJumpLinks({ groups }: { groups: { id: string; label: string; count: number }[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {groups.map((g) => (
        <li key={g.id}>
          <a
            href={`#${g.id}`}
            className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white/[0.06] px-4 text-sm font-medium text-night-text ring-1 ring-white/14 transition-colors hover:bg-white/[0.1] hover:ring-white/30"
          >
            {g.label}
            <span className="font-mono text-xs text-night-muted">{String(g.count).padStart(2, "0")}</span>
            <ArrowDown aria-hidden className="size-3.5 text-night-muted transition-transform group-hover:translate-y-0.5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Solutions index hero. Same anatomy as MrHero (crumbs, badge, h1, lead, meta, demo button) but with the
 * "one platform" map in the right column instead of a screenshot: the six industries above the five
 * modules, the six departments below, joined by connectors. The map is a second way into the pages, so
 * its tiles are links; it shows from lg, where the column would otherwise be empty.
 */
export function SolutionsIndexHero({
  crumbs,
  title,
  description,
  industries,
  departments,
}: {
  crumbs: { label: string; href?: string }[];
  title: string;
  description: string;
  industries: MrSolution[];
  departments: MrSolution[];
}) {
  return (
    <section className="on-night mr-stage-dark relative overflow-hidden border-b border-night-line text-night-text">
      <Container className="relative pb-16 pt-8 sm:pb-20 lg:pb-24 lg:pt-10">
        <MrCrumbs items={crumbs} tone="dark" />
        <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <MrBadge tone="dark">Solutions</MrBadge>
            <h1 className="mt-6 text-h1">{title}</h1>
            <p className="mt-6 max-w-[58ch] text-lead text-night-muted">{description}</p>
            <div className="mt-7">
              <SolutionJumpLinks
                groups={[
                  { id: "industries", label: "Industries", count: industries.length },
                  { id: "departments", label: "Departments", count: departments.length },
                ]}
              />
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalLink href={mrOfficial.demo} variant="primary">
                Request a demo
              </ExternalLink>
            </div>
          </div>
          <div className="hidden lg:col-span-6 lg:block">
            <PlatformMap industries={industries} departments={departments} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function PlatformMap({ industries, departments }: { industries: MrSolution[]; departments: MrSolution[] }) {
  const group = (items: MrSolution[], label: string) => (
    <ul aria-label={label} className="grid grid-cols-3 gap-2">
      {items.map((s) => {
        const SolutionIcon = solutionIcon(s.slug);
        return (
          <li key={s.slug}>
            <Link
              href={`/maplerecord/solutions/${s.slug}`}
              className="group flex h-full min-h-11 flex-col items-center gap-2 rounded-xl px-2 py-2.5 text-center text-[0.8125rem] font-medium leading-tight text-night-text transition-colors hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-night-text"
            >
              <span aria-hidden className="inline-flex size-9 items-center justify-center rounded-lg bg-white/[0.07] ring-1 ring-white/12 transition-colors group-hover:ring-white/30">
                <SolutionIcon className="size-[1.125rem]" />
              </span>
              {s.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
  // Three connectors between each row of tiles and the platform card; dots run toward the platform.
  const connectors = (direction: "down" | "up") => (
    <div aria-hidden className="grid h-9 grid-cols-3 gap-2">
      {[0, 1, 2].map((i) => (
        <span key={i} className="relative mx-auto w-px bg-linear-to-b from-white/10 via-white/22 to-white/10">
          <span
            className={cn(css.dot, direction === "up" && css.dotUp, "absolute -left-[2.5px] top-0 size-1.5 rounded-full bg-logo-red shadow-[0_0_0_3px_rgb(208_0_0/0.25)]")}
            style={{ animationDelay: `${i * 0.5 + (direction === "up" ? 1.8 : 0)}s` } as CSSProperties}
          />
        </span>
      ))}
    </div>
  );
  return (
    <div className="rounded-[1.25rem] bg-white/[0.035] p-5 shadow-[0_40px_120px_-32px_rgb(0_0_0/0.85)] ring-1 ring-white/12 xl:p-6">
      <p className="px-2 font-mono text-label uppercase text-night-muted">Industries</p>
      <div className="mt-2">{group(industries, "Industries")}</div>
      {connectors("down")}
      <div className="rounded-2xl bg-night-raised px-4 py-4 ring-1 ring-white/14">
        <p className="flex items-center justify-center gap-2 font-mono text-label uppercase text-night-muted">
          <LeafMark className="size-3.5" />
          One platform
        </p>
        <ul aria-label="Modules" className="mt-3 flex flex-wrap justify-center gap-1.5">
          {getMrModules().map((m) => {
            const ModuleIcon = moduleIcons[m.slug];
            return (
              <li key={m.slug}>
                <Link
                  href={`/maplerecord/platform/${m.slug}`}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white/[0.06] px-3 text-[0.8125rem] font-medium text-night-text ring-1 ring-white/14 transition-colors hover:bg-white/[0.1] hover:ring-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night-text"
                >
                  <ModuleIcon aria-hidden className="size-3.5 text-night-muted" />
                  {m.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {connectors("up")}
      {group(departments, "Departments")}
      <p className="mt-2 px-2 font-mono text-label uppercase text-night-muted">Departments</p>
    </div>
  );
}

/* ------------------------------------------------------------- directory */

/**
 * Compact link row: icon, title, one-line summary, arrow. The title is the link (short accessible name)
 * and a stretched hit area covers the row, as in MrLinkCard.
 */
function SolutionRow({ href, title, body, icon: RowIcon, className }: { href: string; title: string; body?: string; icon: Icon; className?: string }) {
  return (
    <div
      className={cn(
        "card-lift group relative flex h-full items-start gap-4 rounded-2xl border border-line bg-paper p-5 transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:shadow-[0_18px_40px_-24px_rgb(17_17_17/0.3)] sm:p-6",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal",
        className,
      )}
    >
      <MrIconTile icon={RowIcon} className="size-10 rounded-lg" />
      <div className="min-w-0 flex-1">
        <h3 className="text-[1.0625rem] font-semibold leading-snug tracking-tight">
          <Link href={href} className="inline-flex min-h-6 items-center outline-none after:absolute after:inset-0 after:rounded-2xl after:content-['']">
            {title}
          </Link>
        </h3>
        {body ? <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{body}</p> : null}
      </div>
      <ArrowRight aria-hidden className="mt-1 size-4 shrink-0 text-muted transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:text-signal" />
    </div>
  );
}

/**
 * Solutions directory. `variant="cards"` (industries): full cards with focus-area chips.
 * `variant="rows"` (departments): compact link rows, so the two directories read differently at a glance.
 */
export function SolutionDirectory({
  id,
  eyebrow,
  title,
  intro,
  items,
  tone,
  variant = "cards",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: MrSolution[];
  tone: "paper" | "surface";
  variant?: "cards" | "rows";
}) {
  const summary = (s: MrSolution) => mrSolutionSummaries[s.slug] ?? s.metaDescription ?? s.description;
  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
        {variant === "rows" ? (
          <ul className="reveal mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:gap-4 xl:grid-cols-3">
            {items.map((s) => (
              <li key={s.slug}>
                <SolutionRow href={`/maplerecord/solutions/${s.slug}`} title={s.label} body={summary(s)} icon={solutionIcon(s.slug)} className={tone === "paper" ? "bg-surface" : undefined} />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
            {items.map((s) => (
              <li key={s.slug}>
                <MrLinkCard
                  href={`/maplerecord/solutions/${s.slug}`}
                  title={s.label}
                  body={summary(s)}
                  icon={solutionIcon(s.slug)}
                  cta="Explore solution"
                  className={cn("card-lift", tone === "surface" && "bg-paper")}
                >
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Focus areas">
                    {focusAreas(s).map((t) => (
                      <li key={t} className={cn("rounded-md px-2 py-0.5 text-xs font-medium text-ink-soft ring-1 ring-line", tone === "surface" ? "bg-surface" : "bg-paper")}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </MrLinkCard>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}

/**
 * Index: the five modules every solution is built from. Cards 3 + 2 from lg, 2 + 2 + 1 on tablets;
 * compact rows on phones, where five full cards would be a long stack.
 */
export function SolutionPlatformBand() {
  const modules = getMrModules();
  return (
    <Section tone="deep" spacing="compact" aria-labelledby="platform-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="platform-title" eyebrow="Platform" title="One platform behind every solution" intro="Each solution runs on the same unified platform and its five integrated modules." />
          <ArrowLink href="/maplerecord/platform" className="shrink-0">
            Explore the platform
          </ArrowLink>
        </div>
        <ul className={cn("reveal mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:gap-6", modules.length === 5 ? "lg:grid-cols-6" : "lg:grid-cols-4")}>
          {modules.map((m, i, all) => (
            <li
              key={m.slug}
              className={cn(
                all.length === 5 && (i < 3 ? "lg:col-span-2" : "lg:col-span-3"),
                all.length % 2 === 1 && i === all.length - 1 && "sm:col-span-2 lg:col-span-3",
              )}
            >
              <SolutionRow href={`/maplerecord/platform/${m.slug}`} title={m.name} body={m.summary} icon={moduleIcons[m.slug]} className="bg-surface sm:hidden" />
              <MrLinkCard href={`/maplerecord/platform/${m.slug}`} title={m.name} body={m.summary} icon={moduleIcons[m.slug]} cta="Explore module" className="card-lift hidden sm:flex" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------ challenges */

/** Picks an icon from a challenge title; most specific rule first. */
const challengeIconRules: [RegExp, Icon][] = [
  [/security|privacy/i, Lock],
  [/compliance|regulatory|audit/i, ShieldAlert],
  [/slow|delay|cycle|backlog|manual/i, Clock],
  [/fragment|overload/i, Files],
  [/quality/i, ClipboardCheck],
  [/efficiency/i, Gauge],
  [/record|document|administration/i, FolderOpen],
];

export function SolutionChallenges({ heading, intro, items }: MrSolution["challenges"]) {
  const icons = items.map((c) => challengeIconRules.find(([re]) => re.test(c.title))?.[1] ?? CircleAlert);
  return <MrProblemSection eyebrow="The challenge" heading={heading} intro={intro} items={items} icons={icons} />;
}

/* --------------------------------------------------------------- modules */

/** Fallback card screens when a solution doesn't name its own. */
const defaultModuleScreens: Record<MrModuleSlug, MrScreenKey> = {
  "mr-records": "recordsRetention",
  "mr-requests": "requestsKanban",
  "mr-workflows": "workflowsRuns",
  "mr-forms": "formsSubmissions",
  "mr-admin": "adminProducts",
};

/**
 * The region of each screen a module card zooms into, in the screen's 1280 × 800 CSS-px canvas: the
 * top-left corner (x, y) and the width (w) of the crop. About 450 px wide, so UI text stays legible at
 * card size; the window's aspect sets the height. Screens without an entry show whole.
 */
const screenFocus: Partial<Record<MrScreenKey, { x: number; y: number; w: number }>> = {
  recordsAudit: { x: 256, y: 280, w: 440 },
  recordsLifecycle: { x: 796, y: 84, w: 456 },
  recordsSearch: { x: 248, y: 72, w: 480 },
  recordsFiles: { x: 312, y: 92, w: 460 },
  recordsRetention: { x: 288, y: 232, w: 480 },
  requestsKanban: { x: 252, y: 250, w: 440 },
  requestsTriage: { x: 304, y: 266, w: 460 },
  requestsRedaction: { x: 448, y: 296, w: 440 },
  requestsDashboard: { x: 248, y: 144, w: 500 },
  workflowsRuns: { x: 248, y: 140, w: 460 },
  workflowsList: { x: 248, y: 72, w: 480 },
  workflowsCanvas: { x: 536, y: 196, w: 480 },
};

const CANVAS_W = 1280;
const CANVAS_H = 800;
/** Window aspect (4:3) as width ÷ height. */
const PEEK_ASPECT = 4 / 3;

/*
 * `sizes` for the module-card window: a third of the container from xl (1.5rem gaps), capped at 36rem
 * (max-w-xl) while cards stack full width; minus the stage padding (1.5rem / 1.75rem a side).
 */
const moduleCardSizes = "(min-width: 1280px) 21.5rem, (min-width: 696px) 36rem, (min-width: 640px) calc(100vw - 7.5rem), calc(100vw - 5.5rem)";

/**
 * A product screen zoomed into one region, in a window with a caption row. On hover or focus within the
 * card (`css.peekCard`), the screen pans slowly upward inside the window to show more of the region.
 */
function ScreenPeek({ screen, focus, sizes, className }: { screen: MrScreen; focus?: { x: number; y: number; w: number }; sizes: string; className?: string }) {
  const f = focus ?? { x: 0, y: 0, w: CANVAS_W };
  const zoom = CANVAS_W / f.w;
  const viewH = f.w / PEEK_ASPECT;
  // How far the screen can travel up before its bottom edge enters the window (UI px), capped.
  const pan = Math.max(0, Math.min(CANVAS_H - f.y - viewH, viewH * 0.75));
  const style = {
    width: `${zoom * 100}%`,
    left: `${(-f.x / f.w) * 100}%`,
    top: `${(-f.y / viewH) * 100}%`,
    "--pan": `${(-pan / CANVAS_H) * 100}%`,
  } as CSSProperties;
  return (
    <figure className={cn("overflow-hidden rounded-2xl bg-surface shadow-[0_1px_2px_rgb(17_17_17/0.05),0_24px_56px_-28px_rgb(17_17_17/0.35)] ring-1 ring-ink/10", className)}>
      <div className="flex h-9 items-center gap-2 border-b border-line/70 bg-paper/60 px-4" aria-hidden>
        <LeafMark className="size-3 shrink-0" />
        <span className="truncate text-[0.75rem] font-medium leading-none tracking-[-0.005em] text-muted">{screen.label}</span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <div className={cn("absolute aspect-[16/10]", css.peek)} style={style}>
          <Image src={screen.src} alt={screen.alt} fill sizes={scaleSizes(sizes, zoom)} className="object-cover" />
        </div>
      </div>
    </figure>
  );
}

/**
 * Industry pages: one card per module, branded like the platform pages (MR Records, MR Requests, …).
 * From xl the three cards share a subgrid, so headers, screens, dividers, bullets and links line up.
 */
export function SolutionModules({ slug, label, heading, items }: { slug: string; label: string } & NonNullable<MrSolution["modules"]>) {
  const screens = mrSolutionModuleScreens[slug] ?? {};
  const shown = new Set(items.map((m) => m.module));
  const others = allModules.filter((m) => !shown.has(m));
  const audience = label.toLowerCase().replace(" & ", " and ");
  return (
    <Section id="modules" tone="surface" aria-labelledby="modules-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="modules-title"
            eyebrow="How it works"
            title={heading}
            intro={`${numberWords[items.length] ?? items.length} of MapleRecord's five modules do most of the work for ${audience}. Here is what each one does.`}
          />
          <ArrowLink href="/maplerecord/platform" className="shrink-0">
            Explore the platform
          </ArrowLink>
        </div>
        <ul className="mt-12 grid gap-5 lg:mt-14 lg:gap-6 xl:grid-cols-3 xl:grid-rows-[auto_auto_auto_1fr_auto]">
          {items.map((m) => {
            const name = getMrModuleName(m.module);
            const key = screens[m.module] ?? defaultModuleScreens[m.module];
            const screen = mrScreens[key];
            return (
              <li
                key={m.module}
                className={cn(
                  "card-lift flex flex-col overflow-hidden rounded-2xl border border-line bg-paper xl:row-span-5 xl:grid xl:grid-rows-subgrid xl:gap-y-0",
                  css.peekCard,
                )}
              >
                <div className="on-night flex items-center gap-3 bg-night px-6 py-4 text-night-text sm:px-7">
                  <MrIconTile icon={moduleIcons[m.module]} tone="dark" className="size-9 rounded-lg" />
                  <p className="font-mono text-label uppercase">{name}</p>
                </div>
                {/* Screen peek: the window is cut by the stage's bottom edge, like the overview pillars. */}
                <div className="mr-stage-light border-b border-line px-6 pt-6 sm:px-7">
                  <ScreenPeek screen={screen} focus={screenFocus[key]} sizes={moduleCardSizes} className="mx-auto max-w-xl rounded-b-none" />
                </div>
                {/* Side by side inside the card while cards stack full width (md–lg); subgrid rows at xl. */}
                <div className="flex flex-1 flex-col p-6 sm:p-7 md:grid md:grid-cols-2 md:gap-x-10 xl:contents">
                  <div className="xl:px-7 xl:pt-7">
                    <h3 className="text-h3">{m.title}</h3>
                    <p className="mt-3 text-muted">{m.body}</p>
                  </div>
                  <ul className="mt-6 space-y-3 border-t border-line pt-6 text-[0.9375rem] md:mt-0 md:border-t-0 md:pt-0 xl:mx-7 xl:mt-6 xl:border-t xl:pt-6">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-signal" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 md:col-span-2 xl:col-auto xl:mt-0 xl:px-7 xl:pb-7">
                    <ArrowLink href={`/maplerecord/platform/${m.module}`}>Learn more about {name}</ArrowLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <MrSampleNote />
          {others.length ? <ModuleChipRow label="Also on the platform" modules={others} /> : null}
        </div>
      </Container>
    </Section>
  );
}

/** Mono label + module chips linking to each module page. */
function ModuleChipRow({ label, modules }: { label: string; modules: MrModuleSlug[] }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
      <p className="font-mono text-label uppercase text-muted">{label}</p>
      <ul aria-label={label} className="flex flex-wrap gap-2">
        {modules.map((slug) => {
          const ModuleIcon = moduleIcons[slug];
          return (
            <li key={slug}>
              <Link
                href={`/maplerecord/platform/${slug}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-paper px-4 text-sm font-medium ring-1 ring-line transition-colors hover:ring-ink/40"
              >
                <ModuleIcon aria-hidden className="size-4 text-signal" />
                {getMrModuleName(slug)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------- workflow */

/** Department pages walk one request through intake, records, approvals and delivery. */
const defaultFlowModules: MrModuleSlug[] = ["mr-requests", "mr-records", "mr-workflows", "mr-requests"];
const phases = ["Intake", "Records", "Approvals", "Delivery"];

export function SolutionWorkflow({ slug, heading, steps }: { slug: string } & NonNullable<MrSolution["workflow"]>) {
  const flow = mrSolutionFlows[slug];
  const stepModules = steps.map((_, i) => flow?.modules[i] ?? defaultFlowModules[i] ?? "mr-workflows");
  const flowModules = [...new Set(stepModules)];
  const showDiagram = Boolean(flow) && steps.length === 4;
  return (
    <Section id="workflow" tone="surface" aria-labelledby="workflow-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="workflow-title" eyebrow="How it works" title={heading} />
          <ArrowLink href="/maplerecord/platform" className="shrink-0">
            Explore the platform
          </ArrowLink>
        </div>
        <div className={cn("mt-12 grid gap-12 lg:mt-16 lg:items-start lg:gap-14", showDiagram && "lg:grid-cols-12")}>
          <FlowSteps steps={steps} modules={stepModules} className={showDiagram ? "lg:col-span-5" : "max-w-3xl"} />
          {showDiagram && flow ? <FlowDiagram nodes={flow.nodes} modules={stepModules} className="hidden lg:sticky lg:top-32 lg:col-span-7 lg:block" /> : null}
        </div>
        <div className="mt-12 border-t border-line pt-8 lg:mt-14">
          <ModuleChipRow label="Modules in this flow" modules={flowModules} />
        </div>
      </Container>
    </Section>
  );
}

/**
 * Numbered steps joined by a rail (MrSteps' look), each tagged with the module that runs it. As the steps
 * scroll into view the rail draws down in signal red and each node gains a signal ring (CSS module).
 */
function FlowSteps({ steps, modules, className }: { steps: { title: string; body: string }[]; modules: MrModuleSlug[]; className?: string }) {
  return (
    <ol className={className}>
      {steps.map((s, i) => {
        const ModuleIcon = moduleIcons[modules[i]!];
        return (
          <li key={s.title} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6">
            {i < steps.length - 1 ? (
              <span aria-hidden className="absolute bottom-0 left-5 top-10 w-px -translate-x-1/2 bg-line-strong/70">
                <span className={cn("absolute inset-0 bg-signal", css.railFill)} />
              </span>
            ) : null}
            <span
              aria-hidden
              className={cn(
                "relative z-[1] inline-flex size-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium",
                i === 0 ? "bg-signal text-white shadow-[0_0_0_4px_rgb(208_0_0/0.12)]" : "bg-surface text-ink ring-1 ring-line-strong shadow-[0_1px_2px_rgb(17_17_17/0.06)]",
              )}
            >
              {i > 0 ? <span className={cn("absolute -inset-px rounded-full ring-2 ring-signal/70", css.nodeRing)} /> : null}
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-1.5">
              <h3 className="text-lg font-semibold leading-snug tracking-tight">{s.title}</h3>
              <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.75rem] uppercase tracking-[0.04em] text-ink-soft">
                <ModuleIcon aria-hidden className="size-3.5 text-signal" />
                <span className="sr-only">Runs in </span>
                {getMrModuleName(modules[i]!)}
              </p>
              <p className="mt-2 text-muted">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/*
 * Flow diagram for department pages: the page's four steps as nodes on a 4:3 stage, joined clockwise
 * (intake → records → approvals → delivery). Nodes are HTML positioned by percentage over an SVG with
 * the same 400 × 300 box, so connectors stay aligned at any width. A dot travels the connectors (SVG
 * animateMotion) and hides with reduced motion; static chevrons give the direction either way.
 */
const nodeAt = [
  { x: 100, y: 75 },
  { x: 300, y: 75 },
  { x: 300, y: 225 },
  { x: 100, y: 225 },
];
const flowPath = "M100 75 H300 V225 H100";

function FlowDiagram({ nodes, modules, className }: { nodes: string[]; modules: MrModuleSlug[]; className?: string }) {
  return (
    <figure aria-hidden className={className}>
      <MrStage className="p-6 sm:p-8 lg:p-8 xl:p-10">
        <div className="relative aspect-[4/3]">
          <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" fill="none">
            <path d={flowPath} stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 5" strokeLinecap="round" />
            {/* Direction chevrons at each connector's midpoint. */}
            <path d="M196 70 l6 5 -6 5" stroke="var(--signal)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M295 146 l5 6 5 -6" stroke="var(--signal)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M204 220 l-6 5 6 5" stroke="var(--signal)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <g className="motion-reduce:hidden">
              <circle r="7" fill="var(--signal)" opacity="0.16" />
              <circle r="3.5" fill="var(--signal)" />
              <animateMotion dur="6s" repeatCount="indefinite" path={flowPath} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
            </g>
          </svg>
          <span className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-surface/90 py-1.5 pl-2 pr-3 font-mono text-[0.6875rem] uppercase text-muted ring-1 ring-line">
            <LeafMark className="size-3.5" />
            MapleRecord
          </span>
          {nodes.map((label, i) => {
            const ModuleIcon = moduleIcons[modules[i]!];
            const at = nodeAt[i]!;
            return (
              <div
                key={label}
                className="absolute w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-surface p-3 shadow-[0_1px_2px_rgb(17_17_17/0.06),0_14px_30px_-18px_rgb(17_17_17/0.35)] ring-1 ring-line xl:p-4"
                style={{ left: `${at.x / 4}%`, top: `${at.y / 3}%` }}
              >
                <p className="flex items-center justify-between gap-2 font-mono text-[0.6875rem] uppercase text-muted">
                  <span>
                    {String(i + 1).padStart(2, "0")} · {phases[i]}
                  </span>
                </p>
                {/* Two lines reserved, so the nodes in a row match in height and the connectors stay centred. */}
                <p className="mt-1.5 min-h-[2.75em] text-[0.875rem] font-semibold leading-snug tracking-tight xl:text-[0.9375rem]">{label}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-paper px-2 py-0.5 text-[0.75rem] font-medium text-ink-soft ring-1 ring-line">
                  <ModuleIcon className="size-3 text-signal" />
                  {getMrModuleName(modules[i]!)}
                </p>
              </div>
            );
          })}
        </div>
      </MrStage>
    </figure>
  );
}

/* ------------------------------------------------------------- use cases */

/**
 * Use cases as one hairline-divided panel (the same cell language as MrStats). A red dash leads each cell;
 * no numbers, since the use cases have no order (numbering is kept for workflow steps).
 */
export function SolutionUseCases({ slug, heading, items }: { slug: string } & MrSolution["useCases"]) {
  const pointer = mrSolutionPointers[slug];
  return (
    <Section id="use-cases" aria-labelledby="use-cases-title">
      <Container>
        <SectionHeading id="use-cases-title" eyebrow="Use cases" title={heading} />
        <ul className="reveal mt-12 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line shadow-[0_1px_2px_rgb(17_17_17/0.04)] sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {items.map((u, i) => (
            <li key={u.title} className={cn("bg-surface p-6 sm:p-8", items.length % 2 === 1 && i === items.length - 1 && "sm:col-span-2 lg:col-span-1")}>
              <span aria-hidden className="block h-0.5 w-6 rounded-full bg-signal" />
              <h3 className="mt-5 text-lg font-semibold leading-snug tracking-tight">{u.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{u.body}</p>
            </li>
          ))}
        </ul>
        {pointer ? (
          <p className="mt-6 flex flex-wrap items-center gap-x-3 text-[0.9375rem] text-muted">
            {pointer.lead}
            <ArrowLink href={`/maplerecord/solutions/${pointer.slug}`}>{pointer.label}</ArrowLink>
          </p>
        ) : null}
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- related */

export function SolutionRelated({ current, siblings }: { current: MrSolution; siblings: MrSolution[] }) {
  const industry = current.kind === "industry";
  const other = industry ? { id: "departments", label: "Browse solutions by department" } : { id: "industries", label: "Browse solutions by industry" };
  const tile = "card-lift group flex min-h-16 items-center gap-3.5 rounded-xl border px-4 py-3 transition-[box-shadow,background-color,border-color] duration-200";
  return (
    <Section tone="surface" spacing="compact" aria-labelledby="more-title">
      <Container>
        <Eyebrow>Explore more</Eyebrow>
        <h2 id="more-title" className="mt-4 text-h3">
          More {industry ? "industry" : "department"} solutions
        </h2>
        <ul className="reveal mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((x) => {
            const SolutionIcon = solutionIcon(x.slug);
            return (
              <li key={x.slug}>
                <Link href={`/maplerecord/solutions/${x.slug}`} className={cn(tile, "bg-paper border-line hover:bg-surface hover:border-line-strong hover:shadow-[0_12px_28px_-20px_rgb(17_17_17/0.35)]")}>
                  <SolutionIcon aria-hidden className="size-5 shrink-0 text-signal" />
                  <span className="font-medium">{x.label}</span>
                  <ArrowRight aria-hidden className="ml-auto size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                </Link>
              </li>
            );
          })}
          <li>
            <Link href={`/maplerecord/solutions#${other.id}`} className={cn(tile, "on-night border-night bg-night text-night-text hover:bg-night-raised")}>
              <LayoutGrid aria-hidden className="size-5 shrink-0 text-night-muted" />
              <span className="font-medium">{other.label}</span>
              <ArrowRight aria-hidden className="ml-auto size-4 shrink-0 text-night-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
