import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  Archive,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  BriefcaseBusiness,
  BarChart3,
  Building,
  ClipboardList,
  Database,
  Factory,
  FlaskConical,
  GraduationCap,
  Headset,
  HeartPulse,
  Inbox,
  Landmark,
  Network,
  Plug,
  Scale,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Umbrella,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { mrDepartments, mrFaqs, mrFeatures, mrHero, mrOfficial, mrOverviewCopy, mrPillars, mrPlatformIntro } from "@/content/maplerecord/overview";
import { MrChecklist, MrCta } from "@/features/maplerecord/mr-sections";
import { MrBadge, MrFeatureCard, MrIconTile, MrWindow } from "@/features/maplerecord/mr-ui";
import { MrDepartmentExplorer, MrModuleExplorer } from "@/features/maplerecord/overview-sections";
import { FaqSection } from "@/features/services/sections";
import { formatDate } from "@/features/insights/format";
import { getMrArticles, getMrModules, getMrSolutions } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Hybrid Records Management",
  description:
    "MapleRecord is an AI-first hybrid records management system for electronic and physical records, with MR Records, MR Requests, MR Workflows and MR Forms.",
  path: "/maplerecord",
});

type Icon = ComponentType<{ className?: string }>;

const featureIcons: Record<(typeof mrFeatures.items)[number]["icon"], Icon> = { sparkles: Sparkles, shield: ShieldCheck, zap: Zap, database: Database, users: Users, chart: BarChart3 };
const pillarIcons: Record<(typeof mrPillars)[number]["icon"], Icon> = { governance: SlidersHorizontal, workflows: Workflow, security: ShieldCheck, integration: Plug };
const moduleIcons: Record<string, Icon> = { "mr-records": Archive, "mr-requests": Inbox, "mr-workflows": Workflow, "mr-forms": ClipboardList };
const solutionIcons: Record<string, Icon> = {
  "financial-services": Landmark,
  insurance: Umbrella,
  healthcare: HeartPulse,
  education: GraduationCap,
  manufacturing: Factory,
  "state-local-government": Building,
  "finance-accounting": Banknote,
  "legal-compliance": Scale,
  "human-resources": Users,
  operations: Settings2,
  "research-development": FlaskConical,
  "customer-service": Headset,
};

/*
 * `sizes` for each window, from the 78rem container (72rem of content from 1248px; 2.5rem / 4rem / 6rem
 * of side padding below that) minus the panel and stage padding around each window.
 */
const sizes = {
  hero: "(min-width: 1248px) 41rem, (min-width: 1024px) calc(58vw - 5rem), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)",
  module: "(min-width: 1248px) 37rem, (min-width: 1024px) calc(58vw - 8.5rem), (min-width: 640px) calc(100vw - 9rem), calc(100vw - 5.5rem)",
  department: "(min-width: 1280px) 20rem, (min-width: 1024px) calc(33vw - 6rem), (min-width: 768px) calc(50vw - 6rem), (min-width: 640px) calc(100vw - 9rem), calc(100vw - 5.5rem)",
  pillar: "(min-width: 1248px) 29rem, (min-width: 768px) calc(50vw - 7rem), (min-width: 640px) calc(100vw - 9rem), calc(100vw - 6.5rem)",
  article: "(min-width: 1248px) 23rem, (min-width: 768px) calc(33vw - 3rem), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)",
};

export default function MapleRecordPage() {
  const modules = getMrModules();
  const industries = getMrSolutions("industry");
  const departments = getMrSolutions("department");
  const articles = getMrArticles();

  return (
    <>
      {/* Hero: dark product stage, matching MrHero on the other MapleRecord pages */}
      <section className="on-night mr-stage-dark relative overflow-hidden border-b border-night-line text-night-text" aria-labelledby="mr-overview-title">
        <Container className="relative grid items-center gap-12 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-14 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-5">
            <MrBadge tone="dark">MapleRecord</MrBadge>
            <h1 id="mr-overview-title" className="mt-6 text-h1">
              {mrHero.headline}
            </h1>
            <p className="mt-6 max-w-[48ch] text-lead text-night-muted">{mrHero.lead}</p>
            <p className="mt-4 font-medium text-night-text">{mrHero.tagline}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ExternalLink href={mrOfficial.demo} variant="primary">
                Request a demo
              </ExternalLink>
              <ButtonLink href="#platform" variant="outline-night">
                Explore the platform
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <MrWindow image={mrHero.image} label={mrHero.imageLabel} fit="top" aspect="wide" sizes={sizes.hero} preload tone="dark" />
          </div>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 lg:col-span-12">
            <p id="mr-hero-modules" className="font-mono text-label uppercase text-night-muted">
              Four integrated modules
            </p>
            <ul aria-labelledby="mr-hero-modules" className="flex flex-wrap gap-2">
              {modules.map((m) => {
                const ModuleIcon = moduleIcons[m.slug] ?? Archive;
                return (
                  <li key={m.slug}>
                    <Link
                      href={`/maplerecord/platform/${m.slug}`}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm text-night-text ring-1 ring-white/15 transition-colors hover:bg-white/5 hover:ring-white/40"
                    >
                      <ModuleIcon aria-hidden className="size-4 text-night-muted" />
                      {m.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      {/* Modules */}
      <Section id="platform" className="scroll-mt-36" aria-labelledby="platform-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <SectionHeading id="platform-title" eyebrow={mrPlatformIntro.eyebrow} title={mrPlatformIntro.title} intro={mrPlatformIntro.body} />
            <ArrowLink href="/maplerecord/platform">Explore the full platform</ArrowLink>
          </div>
          <MrModuleExplorer
            className="mt-12"
            label="MapleRecord modules"
            items={modules.map((m) => {
              const ModuleIcon = moduleIcons[m.slug] ?? Archive;
              return {
                value: m.slug,
                label: m.name,
                icon: <ModuleIcon className="size-4" />,
                content: (
                  <div className="grid overflow-hidden rounded-3xl bg-surface ring-1 ring-line lg:grid-cols-12">
                    <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-5 lg:p-12">
                      <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[2rem]">{m.name}</h3>
                      <p className="mt-4 text-lead text-muted">{m.summary}</p>
                      <div className="mt-7 border-t border-line pt-7">
                        <MrChecklist items={m.highlights} />
                      </div>
                      <ArrowLink href={`/maplerecord/platform/${m.slug}`} className="mt-8 self-start">
                        Learn more about {m.name}
                      </ArrowLink>
                    </div>
                    <div className="mr-stage-light border-t border-line p-6 sm:p-10 lg:col-span-7 lg:border-l lg:border-t-0">
                      <MrWindow image={m.tabImage} label={m.name} fit="top" aspect="video" sizes={sizes.module} />
                    </div>
                  </div>
                ),
              };
            })}
          />
        </Container>
      </Section>

      {/* By department */}
      <Section tone="surface" aria-labelledby="departments-title">
        <Container>
          <SectionHeading id="departments-title" eyebrow={mrOverviewCopy.departments.eyebrow} title={mrOverviewCopy.departments.title} />
          <MrDepartmentExplorer
            className="mt-12"
            label="Departments"
            items={mrDepartments.map((d) => {
              const DeptIcon = solutionIcons[d.solution] ?? Users;
              return {
                value: d.solution,
                label: d.name,
                icon: <DeptIcon className="size-[1.125rem]" />,
                content: (
                  <div className="grid h-full overflow-hidden rounded-3xl bg-paper ring-1 ring-line md:grid-cols-2">
                    <div className="flex flex-col p-7 sm:p-9">
                      <MrIconTile icon={DeptIcon} />
                      <h3 className="mt-6 text-h3">{d.name}</h3>
                      <div className="mt-5">
                        <MrChecklist items={[...d.points]} />
                      </div>
                      <ArrowLink href={`/maplerecord/solutions/${d.solution}`} className="mt-auto self-start pt-8">
                        See the {d.name.toLowerCase()} solution
                      </ArrowLink>
                    </div>
                    <div className="mr-stage-light flex items-center border-t border-line p-6 sm:p-8 md:border-l md:border-t-0">
                      <MrWindow image={d.image} label={d.name} fit="top" aspect="square" sizes={sizes.department} className="w-full" />
                    </div>
                  </div>
                ),
              };
            })}
          />
          <p className="mt-8 text-sm text-muted">Figures as published by MapleRecord.</p>
        </Container>
      </Section>

      {/* Why MapleRecord: four pillars as a 2×2 grid */}
      <Section aria-labelledby="pillars-title">
        <Container>
          <SectionHeading id="pillars-title" eyebrow={mrOverviewCopy.pillars.eyebrow} title={mrOverviewCopy.pillars.title} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {mrPillars.map((p) => {
              const diagram = p.icon === "integration";
              return (
                <li key={p.eyebrow} className="flex flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
                  <div className="p-7 sm:p-9">
                    <div className="flex items-center gap-3">
                      <MrIconTile icon={pillarIcons[p.icon]} />
                      <p className="font-mono text-label uppercase text-muted">{p.eyebrow}</p>
                    </div>
                    <h3 className="mt-6 text-h3">{p.title}</h3>
                    <div className="mt-5">
                      <MrChecklist items={[...p.points]} />
                    </div>
                  </div>
                  <div className="mr-stage-light mt-auto border-t border-line px-6 pt-6 sm:px-9 sm:pt-8">
                    {/* The window is cropped by the card's bottom edge, so it reads as a peek into the product. */}
                    <MrWindow
                      image={p.image}
                      label={p.label}
                      fit={diagram ? "contain" : "top"}
                      aspect="wide"
                      sizes={sizes.pillar}
                      className="rounded-b-none"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 text-sm text-muted">Figures as published by MapleRecord.</p>
        </Container>
      </Section>

      {/* Features: the page's one dark band */}
      <Section tone="night" className="mr-stage-dark" aria-labelledby="features-title">
        <Container>
          <SectionHeading tone="night" id="features-title" eyebrow={mrFeatures.eyebrow} title={mrFeatures.title} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {mrFeatures.items.map((f) => (
              <li key={f.title}>
                <MrFeatureCard tone="dark" icon={featureIcons[f.icon]} title={f.title} body={f.body} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Solutions directory */}
      <Section tone="surface" aria-labelledby="solutions-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <SectionHeading id="solutions-title" eyebrow={mrOverviewCopy.solutions.eyebrow} title={mrOverviewCopy.solutions.title} />
            <ArrowLink href="/maplerecord/solutions">All solutions</ArrowLink>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              { id: "solutions-industries", heading: "By industry", icon: BriefcaseBusiness, items: industries },
              { id: "solutions-departments", heading: "By department", icon: Network, items: departments },
            ].map((group) => (
              <div key={group.id} className="rounded-3xl bg-paper p-5 ring-1 ring-line sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <MrIconTile icon={group.icon} className="bg-surface" />
                    <h3 id={group.id} className="text-lg font-semibold tracking-tight">
                      {group.heading}
                    </h3>
                  </div>
                  <p className="shrink-0 whitespace-nowrap font-mono text-label uppercase text-muted">{group.items.length} solutions</p>
                </div>
                <ul aria-labelledby={group.id} className="mt-6 divide-y divide-line overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
                  {group.items.map((s) => {
                    const SolutionIcon = solutionIcons[s.slug] ?? ArrowRight;
                    return (
                      <li key={s.slug}>
                        <Link
                          href={`/maplerecord/solutions/${s.slug}`}
                          className="group flex min-h-14 items-center gap-3.5 px-4 py-3 font-medium transition-colors hover:bg-paper sm:px-5"
                        >
                          <SolutionIcon aria-hidden className="size-[1.125rem] shrink-0 text-signal" />
                          <span className="flex-1">{s.label}</span>
                          <ArrowRight aria-hidden className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Latest articles */}
      <Section tone="deep" aria-labelledby="articles-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <SectionHeading id="articles-title" eyebrow={mrOverviewCopy.articles.eyebrow} title={mrOverviewCopy.articles.title} />
            <ArrowLink href="/maplerecord/resources">All resources</ArrowLink>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/maplerecord/resources/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line transition-shadow hover:shadow-[0_24px_48px_-28px_rgb(17_17_17/0.35)] hover:ring-ink/30"
                >
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper">
                    <Image src={a.image.src} alt="" fill sizes={sizes.article} className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
                      <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink-soft ring-1 ring-line">{a.category}</span>
                      <time dateTime={a.published}>{formatDate(a.published)}</time>
                    </p>
                    <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4">{a.title}</h3>
                    <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
                      Read article
                      <ArrowRight className="size-4 text-signal transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FaqSection faqs={mrFaqs} title={mrOverviewCopy.faqTitle} />

      {/* Required source disclosure, kept quiet at the foot of the page */}
      <div className="border-t border-line bg-paper">
        <Container className="py-6">
          <p className="text-sm text-muted">
            MapleRecord is a Maverick InnoGarage product. Product details are also published on{" "}
            <a
              href={mrOfficial.site}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 items-center gap-1 underline decoration-line-strong underline-offset-4 hover:text-ink hover:decoration-ink"
            >
              maplerecord.com
              <ArrowUpRight aria-hidden className="size-3.5" />
              <span className="sr-only"> (opens maplerecord.com in a new tab)</span>
            </a>
            .
          </p>
        </Container>
      </div>

      <MrCta title={mrOverviewCopy.cta.title} body={mrOverviewCopy.cta.body} />
    </>
  );
}
