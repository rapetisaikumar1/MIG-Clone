import Link from "next/link";
import type { ComponentType } from "react";
import {
  Activity,
  AlarmClock,
  ArrowRight,
  Barcode,
  Calculator,
  ChartColumn,
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
import { mrPlatformFlow, mrPlatformPage } from "@/content/maplerecord/modules";
import { MrChecklist, MrSteps } from "@/features/maplerecord/mr-sections";
import { MrChips, MrFeatureCard, MrIconTile, mrModuleIcons, MrStage, MrWindow } from "@/features/maplerecord/mr-ui";
import { getMrModule, getMrSolution } from "@/lib/content/maplerecord";
import type { MrImage, MrModule } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/*
 * Page sections for /maplerecord/platform and /maplerecord/platform/[module], built on the MapleRecord
 * design system (mr-ui, mr-sections). Section rhythm on a module page: dark hero → problems (paper) →
 * how it works (surface) → figures (dark band) → product tour (deep) → capabilities (paper) → audience
 * (deep) → other modules (surface) → closing CTA. Sections a module has no content for (MR Admin has no
 * published figures, problems or department use cases) are skipped. Product images are recreated
 * MapleRecord screens (16:10, src/content/maplerecord/screens.ts), shown in wide app windows.
 */

type Icon = ComponentType<{ className?: string }>;

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
  "Compliance-ready framework": ShieldCheck,
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

/** Chips on a dark stage (hero `meta`). Items with `href` render as links. */
export function MrDarkChips({ label, items }: { label: string; items: { label: string; href?: string; icon?: Icon }[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label={label}>
      {items.map(({ label: text, href, icon: ChipIcon }) => {
        const inner = (
          <>
            {ChipIcon ? <ChipIcon aria-hidden className="size-3.5 text-night-muted" /> : <span aria-hidden className="size-1.5 rounded-full bg-logo-red" />}
            {text}
          </>
        );
        const chip = "inline-flex min-h-8 items-center gap-2 rounded-full px-3.5 text-sm text-night-text ring-1 ring-white/15";
        return (
          <li key={text}>
            {href ? (
              <Link href={href} className={cn(chip, "transition-colors hover:bg-white/[0.06] hover:ring-white/35")}>
                {inner}
              </Link>
            ) : (
              <span className={chip}>{inner}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Module cards (platform index grid and "other modules") ---------- */

const cardSizes = {
  // Window is 86% of the card; cards are two columns (gap-6) from md.
  lg: "(min-width: 1248px) 31rem, (min-width: 1024px) calc(43vw - 3.25rem), (min-width: 768px) calc(43vw - 2.25rem), (min-width: 640px) calc(86vw - 3.5rem), calc(86vw - 2.25rem)",
  // Four columns (gap-6) from xl, two from md.
  sm: "(min-width: 1280px) 15rem, (min-width: 1024px) calc(43vw - 3.25rem), (min-width: 768px) calc(43vw - 2.25rem), (min-width: 640px) calc(86vw - 3.5rem), calc(86vw - 2.25rem)",
};

/**
 * Module card: the module's hero screen rises out of a light stage (the window runs past the stage's lower
 * edge on purpose, so it reads as a live app rather than a cropped picture), then name, summary and an
 * "Explore" link that covers the whole card.
 */
export function MrModuleCard({ module: m, size = "lg", index }: { module: MrModule; size?: "lg" | "sm"; index?: number }) {
  const ModuleIcon = mrModuleIcons[m.slug];
  const lg = size === "lg";
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-line transition-[box-shadow] duration-300 hover:shadow-[0_24px_56px_-32px_rgb(17_17_17/0.35)]"
    >
      <div className={cn("mr-stage-light relative overflow-hidden border-b border-line", lg ? "aspect-[16/10]" : "aspect-[16/11]")}>
        <div className="absolute inset-x-[7%] top-[13%] transition-transform duration-300 ease-out group-hover:-translate-y-1">
          {/* Small cards get the module name: the full screen label would truncate in a quarter-width card. */}
          <MrWindow image={m.hero.image} label={lg ? m.hero.image.label : m.name} aspect="wide" fit="top" sizes={cardSizes[size]} />
        </div>
      </div>
      <div className={cn("flex flex-1 flex-col", lg ? "p-7 sm:p-9" : "p-6 sm:p-7")}>
        <div className="flex items-center gap-3">
          <MrIconTile icon={ModuleIcon} className={lg ? undefined : "size-9 rounded-lg"} />
          {index !== undefined ? <span className="font-mono text-label uppercase text-muted">Module {String(index + 1).padStart(2, "0")}</span> : null}
        </div>
        <h3 className={cn("mt-5", lg ? "text-h3" : "text-lg font-semibold tracking-tight")}>{m.name}</h3>
        <p className={cn("mt-2 text-muted", !lg && "text-[0.9375rem]")}>{m.summary}</p>
        {lg ? (
          <div className="mt-6 text-[0.9375rem] text-ink-soft">
            <MrChecklist items={m.highlights} />
          </div>
        ) : null}
        <Link
          href={`/maplerecord/platform/${m.slug}`}
          className={cn(
            "mt-auto inline-flex min-h-11 items-center gap-2 self-start font-medium underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-signal",
            "after:absolute after:inset-0 after:rounded-3xl after:content-['']",
            lg ? "pt-7" : "pt-5 text-[0.9375rem]",
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
    <Section id="modules" className="scroll-mt-36" aria-labelledby="modules-title">
      <Container>
        <SectionHeading id="modules-title" eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {modules.map((m, i) => (
            <li key={m.slug}>
              <MrModuleCard module={m} index={i} />
            </li>
          ))}
        </ul>
        <MrSampleDataNote className="mt-6" />
      </Container>
    </Section>
  );
}

/** Window in the 7-of-12 column (inside MrStage padding); full container width below lg. */
const bandSizes = "(min-width: 1248px) 36rem, (min-width: 1024px) calc(50vw - 5rem), (min-width: 640px) calc(100vw - 8rem), calc(100vw - 5rem)";

/** Platform index: MR Admin as the suite's administration console, with its hero screen and the areas it covers. */
export function MrAdminBand({ module: m }: { module: MrModule }) {
  const band = mrPlatformPage.admin;
  return (
    <Section id="mr-admin" tone="surface" className="scroll-mt-36" aria-labelledby="admin-title">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading id="admin-title" eyebrow={band.eyebrow} title={band.title} intro={band.body} />
          <MrChips label="What MR Admin manages" items={band.areas} className="mt-8" />
          <div className="mt-9">
            <ArrowLink href={`/maplerecord/platform/${m.slug}`}>Explore {m.name}</ArrowLink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <MrStage className="mx-auto max-w-2xl lg:max-w-none">
            <MrWindow image={m.hero.image} label={m.hero.image.label} aspect="wide" fit="top" sizes={bandSizes} />
          </MrStage>
        </div>
      </Container>
    </Section>
  );
}

/** Platform index: how the five modules connect, as a five-step strip joined by hairlines. */
export function MrPlatformFlow() {
  const steps = mrPlatformFlow.steps.map((s) => ({ ...s, name: getMrModule(s.module)?.name ?? s.module }));
  return (
    <Section tone="deep" aria-labelledby="flow-title">
      <Container>
        <SectionHeading id="flow-title" eyebrow={mrPlatformFlow.eyebrow} title={mrPlatformFlow.heading} intro={mrPlatformFlow.intro} />
        <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => {
            const StepIcon = mrModuleIcons[s.module];
            return (
              <li key={s.module} className="flex flex-col">
                <div className="flex items-center gap-4">
                  <MrIconTile icon={StepIcon} className="bg-surface" />
                  {/* Hairline toward the next module (one row at lg). */}
                  {i < steps.length - 1 ? <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-line-strong to-line lg:block" /> : null}
                </div>
                <p className="mt-6 font-mono text-label uppercase text-muted">
                  {String(i + 1).padStart(2, "0")} · {s.role}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  <Link href={`/maplerecord/platform/${s.module}`} className="inline-flex min-h-6 items-center underline-offset-4 hover:underline">
                    {s.name}
                  </Link>
                </h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{s.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

/* ---------- Module page sections ---------- */

/** "Why MR …?": the problems, as numbered columns in one panel divided by hairlines. Skipped without `why`. */
export function MrModuleProblems({ module: m }: { module: MrModule }) {
  if (!m.why) return null;
  const items = m.why.problems;
  return (
    <Section aria-labelledby="problems-title">
      <Container>
        <SectionHeading id="problems-title" eyebrow={`Why ${m.name}?`} title={m.why.heading} />
        {/* Two items sit side by side from md; three get columns from lg and, on tablets, title | body rows. */}
        <ol
          className={cn(
            "mt-12 grid divide-y divide-line overflow-hidden rounded-3xl bg-surface ring-1 ring-line",
            items.length === 2 ? "md:grid-cols-2 md:divide-x md:divide-y-0" : "lg:grid-cols-3 lg:divide-x lg:divide-y-0",
          )}
        >
          {items.map((p, i) => (
            <li key={p.title} className={cn("p-7 sm:p-9", items.length !== 2 && "md:grid md:grid-cols-[minmax(0,17rem)_1fr] md:gap-x-10 lg:block")}>
              <div>
                <div className="flex items-center gap-3" aria-hidden>
                  <span className="font-mono text-label text-signal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-line" />
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight">{p.title}</h3>
              </div>
              <p className={cn("mt-3 text-muted", items.length !== 2 && "md:mt-9 lg:mt-3")}>{p.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/** Window width in the 7-of-12 column (inside MrStage padding); capped at 36rem below lg. */
const howSizes = "(min-width: 1248px) 36rem, (min-width: 1024px) calc(50vw - 5rem), (min-width: 640px) 32rem, calc(100vw - 5rem)";

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
            <MrWindow image={m.how.image} label={m.how.image.label} aspect="wide" fit="top" sizes={howSizes} />
          </MrStage>
        </div>
      </Container>
    </Section>
  );
}

/** Tour window: the 7-of-12 column from lg (gap-14), the full container width below. */
const tourSizes = "(min-width: 1248px) 41rem, (min-width: 1024px) calc(58vw - 5rem), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)";

/**
 * Product tour: 2–4 recreated screens, each beside a numbered caption of what it shows. Rows alternate
 * sides from lg; on smaller screens the caption comes first so the heading leads into its screen.
 */
export function MrModuleTour({ module: m }: { module: MrModule }) {
  const stops = m.tour.stops;
  return (
    <Section id="tour" tone="deep" className="scroll-mt-36" aria-labelledby="tour-title">
      <Container>
        <SectionHeading id="tour-title" eyebrow="Product tour" title={`Inside ${m.name}`} intro={m.tour.intro} />
        <ol className="mt-14 grid gap-16 lg:mt-16 lg:gap-24">
          {stops.map((stop, i) => (
            <li key={stop.screen.src} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <div className={cn("lg:col-span-5", i % 2 === 0 ? "lg:order-2" : "lg:order-1")}>
                <div className="flex items-center gap-3" aria-hidden>
                  <span className="font-mono text-label text-signal">
                    {String(i + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
                  </span>
                  <span className="h-px w-12 bg-line-strong" />
                </div>
                <h3 className="mt-5 text-h3">{stop.title}</h3>
                <p className="mt-4 max-w-[46ch] text-lg leading-relaxed text-muted">{stop.body}</p>
              </div>
              <div className={cn("lg:col-span-7", i % 2 === 0 ? "lg:order-1" : "lg:order-2")}>
                <MrWindow image={stop.screen} label={stop.screen.label} aspect="wide" fit="top" sizes={tourSizes} />
              </div>
            </li>
          ))}
        </ol>
        <MrSampleDataNote className="mt-12 lg:mt-16" />
      </Container>
    </Section>
  );
}

/** Key capabilities as icon cards with checklists; balanced for 4 (2 × 2), 5 (3 + 2) and 6 (3 × 2) items. */
export function MrModuleCapabilities({ module: m }: { module: MrModule }) {
  const n = m.capabilities.length;
  return (
    <Section id="capabilities" className="scroll-mt-36" aria-labelledby="caps-title">
      <Container>
        <SectionHeading id="caps-title" eyebrow="Capabilities" title="Key capabilities" />
        <ul className={cn("mt-12 grid gap-5 sm:grid-cols-2", n === 5 ? "lg:grid-cols-6" : n !== 4 && "lg:grid-cols-3")}>
          {m.capabilities.map((c, i) => (
            <li
              key={c.title}
              className={cn(
                // Five cards: 2 + 2 + 1 (full width) on tablets, 3 + 2 on wide screens.
                n === 5 && (i < 3 ? "lg:col-span-2" : "lg:col-span-3"),
                n === 5 && i === 4 && "sm:col-span-2",
              )}
            >
              <MrFeatureCard icon={capabilityIcons[c.title] ?? Sparkles} title={c.title}>
                <div className="mt-5 border-t border-line pt-5 text-[0.9375rem] text-ink-soft">
                  <MrChecklist items={c.items} />
                </div>
              </MrFeatureCard>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
/** "Who it helps": department rows with icons, linked to the matching MapleRecord solution pages. Skipped without `audience`. */
export function MrModuleAudience({ module: m }: { module: MrModule }) {
  if (!m.audience) return null;
  return (
    <Section tone="deep" aria-labelledby="who-title">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <SectionHeading id="who-title" eyebrow="Use cases" title="Who it helps" intro={m.audience.intro} className="lg:sticky lg:top-40" />
        </div>
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {m.audience.teams.map((t) => {
            const meta = teamMeta.find((x) => x.match.test(t.title));
            const solution = meta ? getMrSolution(meta.solution) : null;
            return (
              <li key={t.title} className="flex gap-4 border-t border-line-strong/60 py-6">
                <MrIconTile icon={meta?.icon ?? Users} className="size-10 bg-surface" />
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {solution ? (
                      <Link href={`/maplerecord/solutions/${solution.slug}`} className="group/team inline-flex min-h-6 items-center gap-1.5 underline-offset-4 hover:underline">
                        {t.title}
                        <span className="sr-only"> (see the {solution.label} solution)</span>
                        <ArrowRight aria-hidden className="size-4 text-muted transition-[color,transform] group-hover/team:translate-x-0.5 group-hover/team:text-signal" />
                      </Link>
                    ) : (
                      t.title
                    )}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] text-muted">{t.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/** Switcher to the other modules (four of the five), as compact product cards (2 × 2 on tablets, one row from xl). */
export function MrOtherModules({ modules }: { modules: MrModule[] }) {
  return (
    <Section tone="surface" spacing="compact" aria-labelledby="other-title">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="other-title" eyebrow="Platform" title="Explore the other modules" />
          <ArrowLink href="/maplerecord/platform">Platform overview</ArrowLink>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {modules.map((o) => (
            <li key={o.slug}>
              <MrModuleCard module={o} size="sm" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
