import Link from "next/link";
import type { ComponentType } from "react";
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
import { mrScreens, type MrScreenKey } from "@/content/maplerecord/screens";
import { mrSolutionSummaries } from "@/content/maplerecord/solutions";
import { MrProblemSection, MrSampleNote, MrSteps } from "@/features/maplerecord/mr-sections";
import { MrChips, MrIconTile, MrLinkCard, MrStage, MrWindow, mrModuleIcons } from "@/features/maplerecord/mr-ui";
import { getMrModuleName, getMrModules } from "@/lib/content/maplerecord";
import type { MrModuleSlug, MrSolution } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/*
 * Page-specific pieces for /maplerecord/solutions and /maplerecord/solutions/[slug]. They build on the
 * shared MapleRecord design system (mr-ui, mr-sections) and keep its rhythm: light sections alternate
 * paper / surface / deep between the dark hero, the dark figures band and the closing CTA.
 */

type Icon = ComponentType<{ className?: string }>;

/** One icon per solution, used on directory cards and related links. */
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

/** Module icons. Candidates for mr-ui so the platform pages can share them. */
const moduleIcons = mrModuleIcons;

/** The screen each module card shows on industry pages (clean, legible at thumbnail size). */
const moduleCardScreens: Record<MrModuleSlug, MrScreenKey> = {
  "mr-records": "recordsRetention",
  "mr-requests": "requestsKanban",
  "mr-workflows": "workflowsCanvas",
  "mr-forms": "formsBuilder",
  "mr-admin": "adminProducts",
};

/*
 * `sizes` for the module-card thumbnail: a third of the container from xl (1.5rem gaps), capped at 36rem
 * (max-w-xl) while cards stack full width; minus the stage padding (1.5rem / 1.75rem a side).
 */
const moduleCardSizes = "(min-width: 1280px) 19.5rem, (min-width: 696px) 36rem, (min-width: 640px) calc(100vw - 7.5rem), calc(100vw - 5.5rem)";

/* Department workflow window: 7 of 12 columns from lg (3.5rem gap), inside MrStage padding. */
const workflowSizes = "(min-width: 1248px) 35.5rem, (min-width: 1024px) calc(58.33vw - 10rem), (min-width: 640px) calc(100vw - 8rem), calc(100vw - 5rem)";

/** Focus areas from a solution's `tagline` ("A · B · C"). */
function focusAreas(s: MrSolution) {
  return s.tagline
    .split("·")
    .map((t) => t.trim())
    .filter(Boolean);
}

/* ------------------------------------------------------------------ hero */

/** Focus-area chips for the hero `meta` slot (dark stage). */
export function SolutionHeroChips({ solution }: { solution: MrSolution }) {
  return <MrChips items={focusAreas(solution)} label="Focus areas" tone="dark" />;
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

/* ------------------------------------------------------------- directory */

export function SolutionDirectory({
  id,
  eyebrow,
  title,
  intro,
  items,
  tone,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: MrSolution[];
  tone: "paper" | "surface";
}) {
  return (
    <Section id={id} tone={tone} className="scroll-mt-36" aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {items.map((s) => (
            <li key={s.slug}>
              <MrLinkCard
                href={`/maplerecord/solutions/${s.slug}`}
                title={s.label}
                body={mrSolutionSummaries[s.slug] ?? s.metaDescription ?? s.description}
                icon={solutionIcon(s.slug)}
                cta="Explore solution"
                className={tone === "surface" ? "bg-paper" : undefined}
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
      </Container>
    </Section>
  );
}

/** Index: the five modules every solution is built from (3 + 2 from lg, 2 + 2 + 1 on tablets). */
export function SolutionPlatformBand() {
  return (
    <Section tone="deep" spacing="compact" aria-labelledby="platform-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="platform-title" eyebrow="Platform" title="One platform behind every solution" intro="Each solution runs on the same unified platform and its five integrated modules." />
          <ArrowLink href="/maplerecord/platform" className="shrink-0">
            Explore the platform
          </ArrowLink>
        </div>
        <ul className={cn("mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6", getMrModules().length === 5 ? "lg:grid-cols-6" : "lg:grid-cols-4")}>
          {getMrModules().map((m, i, all) => (
            <li
              key={m.slug}
              className={cn(
                all.length === 5 && (i < 3 ? "lg:col-span-2" : "lg:col-span-3"),
                all.length % 2 === 1 && i === all.length - 1 && "sm:col-span-2 lg:col-span-3",
              )}
            >
              <MrLinkCard href={`/maplerecord/platform/${m.slug}`} title={m.name} body={m.summary} icon={moduleIcons[m.slug]} cta="Explore module" />
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

/** Industry pages: one card per module, branded like the platform pages (MR Records, MR Requests, …). */
export function SolutionModules({ label, heading, items }: { label: string } & NonNullable<MrSolution["modules"]>) {
  return (
    <Section id="modules" tone="surface" className="scroll-mt-36" aria-labelledby="modules-title">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="modules-title"
            eyebrow="How it works"
            title={heading}
            intro={`${listNames(items.map((m) => getMrModuleName(m.module)))} on one platform, and what each one does for ${label.toLowerCase().replace(" & ", " and ")}.`}
          />
          <ArrowLink href="/maplerecord/platform" className="shrink-0">
            Explore the platform
          </ArrowLink>
        </div>
        <ul className="mt-12 grid gap-5 lg:mt-14 lg:gap-6 xl:grid-cols-3">
          {items.map((m) => {
            const name = getMrModuleName(m.module);
            const screen = mrScreens[moduleCardScreens[m.module]];
            return (
              <li key={m.module} className="flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-line">
                <div className="on-night flex items-center gap-3 bg-night px-6 py-4 text-night-text sm:px-7">
                  <MrIconTile icon={moduleIcons[m.module]} tone="dark" className="size-9 rounded-lg" />
                  <p className="font-mono text-label uppercase">{name}</p>
                </div>
                {/* Screen peek: the window is cut by the stage's bottom edge, like the overview pillars. */}
                <div className="mr-stage-light border-b border-line px-6 pt-6 sm:px-7">
                  <MrWindow image={screen} label={screen.label} fit="top" aspect="wide" sizes={moduleCardSizes} className="mx-auto max-w-xl rounded-b-none" />
                </div>
                {/* Side by side inside the card while cards stack full width (md–lg); stacked at xl (three columns). */}
                <div className="flex flex-1 flex-col p-6 sm:p-7 md:grid md:grid-cols-2 md:gap-x-10 xl:flex">
                  <div>
                    <h3 className="text-h3">{m.title}</h3>
                    <p className="mt-3 text-muted">{m.body}</p>
                  </div>
                  <ul className="mt-6 space-y-3 border-t border-line pt-6 text-[0.9375rem] md:mt-0 md:border-t-0 md:pt-0 xl:mt-6 xl:border-t xl:pt-6">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <Check aria-hidden className="mt-1 size-4 shrink-0 text-signal" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <ArrowLink href={`/maplerecord/platform/${m.module}`} className="mt-auto self-start pt-6 md:col-span-2">
                    Learn more about {name}
                  </ArrowLink>
                </div>
              </li>
            );
          })}
        </ul>
        <MrSampleNote className="mt-6" />
      </Container>
    </Section>
  );
}

/** "A, B and C". */
function listNames(names: string[]) {
  return names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : (names[0] ?? "");
}

/* -------------------------------------------------------------- workflow */

/** Department pages walk one request through intake, records, approvals and delivery. */
const flowModules: MrModuleSlug[] = ["mr-requests", "mr-records", "mr-workflows"];

const workflowScreen = mrScreens.workflowsCanvas;

export function SolutionWorkflow({ heading, steps }: NonNullable<MrSolution["workflow"]>) {
  return (
    <Section id="workflow" tone="surface" className="scroll-mt-36" aria-labelledby="workflow-title">
      <Container>
        <SectionHeading id="workflow-title" eyebrow="How it works" title={heading} />
        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:items-start lg:gap-14">
          <MrSteps steps={steps} className="lg:col-span-5" />
          <figure className="lg:sticky lg:top-40 lg:col-span-7">
            <MrStage>
              <MrWindow image={workflowScreen} label={workflowScreen.label} fit="top" aspect="wide" sizes={workflowSizes} />
            </MrStage>
            <figcaption className="mt-4 text-sm text-muted">
              The MR Workflows designer, where approval steps like these are laid out: here a destruction authorization with trigger, approval, assignment
              and end nodes. <MrSampleNote className="inline" />
            </figcaption>
          </figure>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 lg:mt-14">
          <p className="font-mono text-label uppercase text-muted">Modules in this flow</p>
          <ul className="flex flex-wrap gap-2">
            {flowModules.map((slug) => {
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
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------- use cases */

/** Use cases as one hairline-divided panel (the same cell language as MrStats). */
export function SolutionUseCases({ heading, items }: MrSolution["useCases"]) {
  return (
    <Section id="use-cases" className="scroll-mt-36" aria-labelledby="use-cases-title">
      <Container>
        <SectionHeading id="use-cases-title" eyebrow="Use cases" title={heading} />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line shadow-[0_1px_2px_rgb(17_17_17/0.04)] sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {items.map((u, i) => (
            <li key={u.title} className={cn("bg-surface p-6 sm:p-8", items.length % 2 === 1 && i === items.length - 1 && "sm:col-span-2 lg:col-span-1")}>
              <p aria-hidden className="flex items-center gap-2.5 font-mono text-label text-muted">
                <span className="h-px w-5 bg-signal" />
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight">{u.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{u.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- related */

export function SolutionRelated({ current, siblings }: { current: MrSolution; siblings: MrSolution[] }) {
  const industry = current.kind === "industry";
  const other = industry ? { id: "departments", label: "Browse solutions by department" } : { id: "industries", label: "Browse solutions by industry" };
  const tile = "group flex min-h-16 items-center gap-3.5 rounded-xl px-4 py-3 ring-1 transition-[box-shadow,background-color] duration-200";
  return (
    <Section tone="surface" spacing="compact" aria-labelledby="more-title">
      <Container>
        <Eyebrow>Explore more</Eyebrow>
        <h2 id="more-title" className="mt-4 text-h3">
          More {industry ? "industry" : "department"} solutions
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((x) => {
            const SolutionIcon = solutionIcon(x.slug);
            return (
              <li key={x.slug}>
                <Link href={`/maplerecord/solutions/${x.slug}`} className={cn(tile, "bg-paper ring-line hover:bg-surface hover:ring-line-strong hover:shadow-[0_12px_28px_-20px_rgb(17_17_17/0.35)]")}>
                  <SolutionIcon aria-hidden className="size-5 shrink-0 text-signal" />
                  <span className="font-medium">{x.label}</span>
                  <ArrowRight aria-hidden className="ml-auto size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                </Link>
              </li>
            );
          })}
          <li>
            <Link href={`/maplerecord/solutions#${other.id}`} className={cn(tile, "on-night bg-night text-night-text ring-night hover:bg-night-raised")}>
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
