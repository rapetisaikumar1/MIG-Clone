import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  Archive,
  ArrowRight,
  Banknote,
  Building,
  Factory,
  FlaskConical,
  GraduationCap,
  Headset,
  HeartPulse,
  Landmark,
  Plug,
  Scale,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Umbrella,
  Users,
  Workflow,
} from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { mrDepartments, mrFaqs, mrFiguresNote, mrModuleTabScreens, mrOverviewCopy, mrPillars, mrPlatformIntro, mrTour, mrTrust } from "@/content/maplerecord/overview";
import { mrScreens } from "@/content/maplerecord/screens";
import { MrChecklist, MrCta, MrSampleNote } from "@/features/maplerecord/mr-sections";
import { MrIconTile, MrWindow, mrModuleIcons } from "@/features/maplerecord/mr-ui";
import { MrDepartmentExplorer, MrModuleExplorer, MrTourExplorer } from "@/features/maplerecord/overview-sections";
import { OverviewHero } from "@/features/maplerecord/overview-hero";
import { FaqSection } from "@/features/services/sections";
import { formatDate } from "@/features/insights/format";
import { getMrArticles, getMrModuleName, getMrModules, getMrSolution, getMrSolutions } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Hybrid Records Management",
  description:
    "MapleRecord, designed and built by Maverick InnoGarage: AI-first hybrid records management for electronic and physical records, with five integrated modules.",
  path: "/maplerecord",
});

type Icon = ComponentType<{ className?: string }>;

const pillarIcons: Record<(typeof mrPillars)[number]["icon"], Icon> = { governance: SlidersHorizontal, workflows: Workflow, security: ShieldCheck, integration: Plug };
const moduleIcons: Record<string, Icon> = mrModuleIcons;
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
  module: "(min-width: 1248px) 37rem, (min-width: 1024px) calc(58vw - 8.5rem), (min-width: 640px) calc(100vw - 9rem), calc(100vw - 5.5rem)",
  department: "(min-width: 1280px) 20rem, (min-width: 1024px) 12rem, (min-width: 768px) calc(50vw - 6rem), (min-width: 640px) calc(100vw - 9rem), calc(100vw - 5.5rem)",
  pillar: "(min-width: 1248px) 29rem, (min-width: 768px) calc(50vw - 7rem), (min-width: 640px) calc(100vw - 9rem), calc(100vw - 6.5rem)",
  /* Tour panel: 9 of 12 columns from xl, 8 from lg (2.5rem gaps); full width below. */
  tour: "(min-width: 1280px) 53.5rem, (min-width: 1248px) 47.25rem, (min-width: 1024px) calc(66.67vw - 4.85rem), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)",
  /* Trust cards: thirds from lg inside the sub-band (2.5rem padding), window beside the text from sm (2rem padding); 1.25rem stage padding. */
  trust: "(min-width: 1248px) 19rem, (min-width: 1024px) calc(33.33vw - 7rem), (min-width: 640px) calc(50vw - 6.5rem), calc(100vw - 7.5rem)",
  /* Article cards: thirds from lg; image beside the text (2 of 5 columns) from sm; full width on phones. */
  article: "(min-width: 1248px) 23rem, (min-width: 1024px) calc(33vw - 3rem), (min-width: 640px) calc(40vw - 2rem), calc(100vw - 2.5rem)",
};

/*
 * Section rhythm below the dark hero: paper (platform) → white (solutions) → paper (pillars, with the
 * trust band) → night (product tour) → paper-deep (articles) → paper (FAQ) → night (closing CTA, which
 * carries the maplerecord.com source line and a hairline above the footer).
 */
export default function MapleRecordPage() {
  const modules = getMrModules();
  const industries = getMrSolutions("industry");
  const articles = getMrArticles();

  return (
    <>
      <OverviewHero />

      {/* Modules */}
      <Section id="platform" aria-labelledby="platform-title">
        <Container>
          <SectionHeading className="reveal" id="platform-title" eyebrow={mrPlatformIntro.eyebrow} title={mrPlatformIntro.title} intro={mrPlatformIntro.body} />
          <ArrowLink href="/maplerecord/platform" className="mt-6">
            Explore the full platform
          </ArrowLink>
          <MrModuleExplorer
            className="mt-12 lg:mt-14"
            label="MapleRecord modules"
            items={modules.map((m) => {
              const ModuleIcon = moduleIcons[m.slug] ?? Archive;
              const screen = mrScreens[mrModuleTabScreens[m.slug]];
              return {
                value: m.slug,
                label: m.name,
                icon: <ModuleIcon className="size-4" />,
                content: (
                  <div className="grid h-full overflow-hidden rounded-3xl bg-surface ring-1 ring-line lg:grid-cols-12">
                    <div className="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:justify-center lg:p-12">
                      <h3 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.025em] sm:text-[2rem]">{m.name}</h3>
                      <p className="mt-4 text-lead text-muted">{m.summary}</p>
                      <div className="mt-7 border-t border-line pt-7">
                        <MrChecklist items={m.highlights} />
                      </div>
                      <ArrowLink href={`/maplerecord/platform/${m.slug}`} className="mt-8 self-start">
                        Learn more about {m.name}
                      </ArrowLink>
                    </div>
                    <div className="mr-stage-light flex items-center border-t border-line p-6 sm:p-10 lg:col-span-7 lg:border-l lg:border-t-0">
                      <div data-shot className="w-full">
                        <MrWindow image={screen} label={screen.label} fit="top" aspect="wide" sizes={sizes.module} />
                      </div>
                    </div>
                  </div>
                ),
              };
            })}
          />
          <MrSampleNote className="mt-6" />
        </Container>
      </Section>

      {/* Solutions: departments as a tab explorer, then the industries as compact links */}
      <Section tone="surface" aria-labelledby="departments-title">
        <Container>
          <SectionHeading className="reveal" id="departments-title" eyebrow={mrOverviewCopy.departments.eyebrow} title={mrOverviewCopy.departments.title} />
          <MrDepartmentExplorer
            className="mt-12 lg:mt-14"
            label="Departments"
            items={mrDepartments.map((d) => {
              const DeptIcon = solutionIcons[d.solution] ?? Users;
              // The tab keeps its short name; the panel names the solution page it links to.
              const solution = getMrSolution(d.solution);
              const isIndustry = solution?.kind === "industry";
              return {
                value: d.solution,
                label: d.name,
                icon: <DeptIcon className="size-[1.125rem]" />,
                content: (
                  <div className="grid h-full overflow-hidden rounded-3xl bg-paper ring-1 ring-line md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_16rem] xl:grid-cols-2">
                    <div className="flex flex-col p-7 sm:p-9">
                      <div className="flex items-center gap-3">
                        <MrIconTile icon={DeptIcon} />
                        <p className="font-mono text-label uppercase text-muted">{isIndustry ? "Industry solution" : "Department solution"}</p>
                      </div>
                      <h3 className="mt-6 text-h3">{solution?.label ?? d.name}</h3>
                      <div className="mt-5">
                        <MrChecklist items={[...d.points]} />
                      </div>
                      <ArrowLink href={`/maplerecord/solutions/${d.solution}`} className="mt-auto self-start pt-8">
                        {`See the ${d.name.toLowerCase()}${isIndustry ? " industry" : ""} solution`}
                      </ArrowLink>
                    </div>
                    <div className="mr-stage-light flex items-center border-t border-line p-6 sm:p-8 md:border-l md:border-t-0">
                      <div data-shot className="w-full">
                        <MrWindow image={d.image} label={solution?.label ?? d.name} fit="top" aspect="square" sizes={sizes.department} />
                      </div>
                    </div>
                  </div>
                ),
              };
            })}
          />
          <p className="mt-6 text-sm text-muted">{mrFiguresNote}</p>

          <div className="mt-14 border-t border-line pt-10 lg:mt-16">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <h3 id="industries-title" className="text-lg font-semibold tracking-tight">
                {mrOverviewCopy.departments.industries}
              </h3>
              <ArrowLink href="/maplerecord/solutions">All solutions</ArrowLink>
            </div>
            <ul aria-labelledby="industries-title" className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {industries.map((s) => {
                const SolutionIcon = solutionIcons[s.slug] ?? ArrowRight;
                return (
                  <li key={s.slug}>
                    <Link
                      href={`/maplerecord/solutions/${s.slug}`}
                      className="card-lift group flex min-h-14 items-center gap-3.5 rounded-2xl bg-paper px-4 py-3 font-medium ring-1 ring-line hover:ring-line-strong sm:px-5"
                    >
                      <SolutionIcon aria-hidden className="size-[1.125rem] shrink-0 text-signal" />
                      <span className="flex-1">{s.label}</span>
                      <ArrowRight aria-hidden className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink motion-reduce:transition-none" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Why MapleRecord: four pillars as a 2×2 grid, then the trust band */}
      <Section aria-labelledby="pillars-title">
        <Container>
          <SectionHeading className="reveal" id="pillars-title" eyebrow={mrOverviewCopy.pillars.eyebrow} title={mrOverviewCopy.pillars.title} />
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14">
            {mrPillars.map((p) => (
              <li key={p.eyebrow} className="reveal flex flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
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
                {/* A fixed-height peek into the product: the card's bottom edge crops the window. */}
                <div className="mr-stage-light mt-auto h-48 overflow-hidden border-t border-line px-6 pt-6 sm:h-64 sm:px-9 sm:pt-8 lg:h-72">
                  <MrWindow image={p.screen} label={p.screen.label} fit="top" aspect="wide" sizes={sizes.pillar} className="rounded-b-none" />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">{mrFiguresNote}</p>

          {/* Trust & compliance: the records evidence trail, as a sub-band of the pillars */}
          <div className="mt-16 rounded-3xl bg-paper-deep p-5 ring-1 ring-line sm:p-8 lg:mt-20 lg:p-10">
            <div className="grid gap-x-10 gap-y-4 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-6">
                <Eyebrow>{mrTrust.eyebrow}</Eyebrow>
                <h3 className="mt-4 text-h3">{mrTrust.title}</h3>
              </div>
              <p className="max-w-[60ch] text-muted lg:col-span-6">{mrTrust.intro}</p>
            </div>
            <ul className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-3">
              {mrTrust.items.map((t) => (
                // content-start: the screen row keeps its height, so the three titles line up.
                <li key={t.title} className="reveal grid content-start overflow-hidden rounded-2xl bg-surface ring-1 ring-line sm:grid-cols-2 sm:content-stretch lg:grid-cols-1 lg:content-start">
                  <div className="mr-stage-light border-b border-line p-5 sm:border-b-0 sm:border-r lg:border-b lg:border-r-0">
                    {/* No title-bar label: at a third of the width it would truncate, and the caption below names the screen. */}
                    <MrWindow image={t.screen} fit="top" aspect="wide" sizes={sizes.trust} />
                  </div>
                  <div className="p-6 sm:self-center lg:self-auto">
                    <h4 className="text-lg font-semibold leading-snug tracking-tight">{t.title}</h4>
                    <p className="mt-2 text-[0.9375rem] text-muted">{t.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Product tour: the page's one dark band */}
      <Section tone="night" className="mr-stage-dark" aria-labelledby="tour-title">
        <Container>
          <SectionHeading className="reveal" tone="night" id="tour-title" eyebrow={mrTour.eyebrow} title={mrTour.title} intro={mrTour.intro} />
          <MrTourExplorer
            className="mt-12 lg:mt-14"
            label="Product screens"
            items={mrTour.stops.map((stop) => {
              const product = stop.screen.product;
              const href = product === "suite" ? "/maplerecord/platform" : `/maplerecord/platform/mr-${product}`;
              const name = product === "suite" ? "Maple" : getMrModuleName(`mr-${product}`);
              return {
                value: stop.screen.id,
                module: name,
                label: stop.title,
                content: (
                  <figure>
                    <div data-shot>
                      <MrWindow image={stop.screen} label={stop.screen.label} fit="top" aspect="wide" sizes={sizes.tour} tone="dark" />
                    </div>
                    <figcaption className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                      <p className="max-w-[62ch] text-night-muted">
                        <span className="font-semibold text-night-text">{stop.title}.</span> {stop.body}
                      </p>
                      <Link
                        href={href}
                        className="group inline-flex min-h-11 items-center gap-2 self-start font-medium text-night-text underline decoration-night-line underline-offset-[6px] hover:decoration-night-text sm:-mt-2.5"
                      >
                        Explore {name}
                        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                      </Link>
                    </figcaption>
                  </figure>
                ),
              };
            })}
          />
        </Container>
      </Section>

      {/* Latest articles */}
      <Section tone="deep" aria-labelledby="articles-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <SectionHeading className="reveal" id="articles-title" eyebrow={mrOverviewCopy.articles.eyebrow} title={mrOverviewCopy.articles.title} />
            <ArrowLink href="/maplerecord/resources">All resources</ArrowLink>
          </div>
          <ul className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-6">
            {articles.map((a) => (
              <li key={a.slug} className="reveal">
                <Link
                  href={`/maplerecord/resources/${a.slug}`}
                  className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line hover:ring-line-strong sm:grid sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:flex lg:flex-col"
                >
                  {/* One warm monochrome treatment for the blog's stock photos, so they sit with the product screens. */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-paper-deep sm:aspect-auto sm:min-h-48 sm:border-b-0 sm:border-r lg:aspect-[16/10] lg:min-h-0 lg:border-b lg:border-r-0">
                    <Image
                      src={a.image.src}
                      alt=""
                      fill
                      sizes={sizes.article}
                      className="object-cover grayscale-[85%] transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                    <div aria-hidden className="absolute inset-0 bg-paper-deep mix-blend-multiply" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
                      <span className="rounded-full bg-paper px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink-soft ring-1 ring-line">{a.category}</span>
                      <time dateTime={a.published}>{formatDate(a.published)}</time>
                    </p>
                    <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4">{a.title}</h3>
                    <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
                      Read article
                      <ArrowRight className="size-4 text-signal transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <FaqSection faqs={mrFaqs} title={mrOverviewCopy.faqTitle} />

      {/* The ownership sentence and the source line ("Product details are also published on maplerecord.com") sit in the CTA's contact card. */}
      <MrCta title={mrOverviewCopy.cta.title} body={mrOverviewCopy.cta.body} source />
    </>
  );
}
