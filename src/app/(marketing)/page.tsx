import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { BuildGlyph, GovernanceGlyph, JourneyGlyph, LifecycleGlyph } from "@/components/graphics/service-graphics";
import { deliveryApproach, expertise, problems } from "@/content/home";
import { industries } from "@/content/industries";
import { mrSampleDataNote } from "@/content/maplerecord/overview";
import { company } from "@/config/site";
import { CtaBand } from "@/features/contact/cta-band";
import { AdobeSection } from "@/features/home/adobe-section";
import { HeroBanner } from "@/features/home/hero-banner";
import { ConnectionDiagram } from "@/features/home/connection-diagram";
import { ArticleCard } from "@/features/insights/article-card";
import { ApproachSteps } from "@/features/services/sections";
import { getInsights } from "@/lib/content/insights";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: company.positioning, path: "/" });

const glyphs = { governance: GovernanceGlyph, journey: JourneyGlyph, lifecycle: LifecycleGlyph, build: BuildGlyph };

/** AI Governance band: three capability anchors on /ai-governance, titles and summaries taken from its content. */
const aiGovernanceHighlights = ["inventory", "risk", "oversight"];

const maplerecordModules = ["MR Records", "MR Requests", "MR Workflows", "MR Forms", "MR Admin"];

/** One hover pattern for every link row on the page: muted arrow → signal red with a 2px nudge (motion-safe). */
const rowArrow =
  "size-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-signal motion-safe:transition-[color,transform] motion-safe:group-hover:translate-x-0.5";
const rowTitle = "decoration-1 underline-offset-4 group-hover:underline";

/*
 * Section order follows the narrative and the order of prominence: what we do (expertise) → AI Governance
 * (priority 1) → the problems we solve → how the specializations connect → the featured Adobe Services section
 * → how we work → sectors → our product → insights → contact.
 * Tones alternate so consecutive sections never share a background.
 */
export default async function HomePage() {
  const latest = (await getInsights()).slice(0, 3);
  const aiGovernance = getService("ai-governance");
  const aiHighlights = aiGovernanceHighlights.flatMap((id) => aiGovernance.capabilities.filter((c) => c.id === id));

  return (
    <>
      <HeroBanner />

      {/* Four specializations */}
      <Section id="expertise" aria-labelledby="expertise-title">
        <Container>
          <SectionHeading
            id="expertise-title"
            eyebrow="Our expertise"
            title="Four specializations that work together"
            intro="Each one stands on its own. Combine them where AI, customer experience, data and software meet."
            className="reveal"
          />
          {/* A 2×2 grid from md: subgrid rows (glyph, title, summary, list, link) keep each pair of cards aligned,
              and a hairline separates the two columns. */}
          <ul className="mt-14 grid border-t border-ink md:grid-cols-2">
            {expertise.map((e) => {
              const Glyph = glyphs[e.glyph];
              return (
                <li
                  key={e.href}
                  className="reveal group/glyph flex flex-col border-b border-line py-10 md:row-span-5 md:grid md:grid-rows-subgrid md:gap-y-0 md:odd:pr-8 md:even:border-l md:even:pl-8 lg:odd:pr-12 lg:even:pl-12 lg:py-12"
                >
                  <Glyph />
                  <h3 className="mt-6 text-[clamp(1.75rem,1.45rem+0.9vw,2.25rem)] leading-tight tracking-[-0.03em]">
                    <Link href={e.href} className="decoration-2 underline-offset-8 hover:underline">
                      {e.title}
                    </Link>
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-muted">{e.summary}</p>
                  <ul className="mt-6 space-y-2 text-[0.9375rem]">
                    {e.services.map((s) => (
                      <li key={s} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-ink" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <ArrowLink href={e.href} className="self-start pt-8 md:justify-self-start">
                    Explore {e.title}
                  </ArrowLink>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* AI Governance first among the specializations: a compact band reusing the /ai-governance copy. */}
      <Section tone="surface" spacing="compact" aria-labelledby="ai-governance-title">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="reveal lg:col-span-6">
            <Eyebrow>AI Governance</Eyebrow>
            <h2 id="ai-governance-title" className="mt-5 text-h2 text-balance">
              Put clear oversight around how your organization uses AI.
            </h2>
            <p className="mt-6 max-w-[52ch] text-lead text-muted">
              Responsible AI, AI risk management and compliance support, put in place and kept running, so your teams can
              adopt AI with confidence.
            </p>
            <ArrowLink href="/ai-governance" className="mt-6">
              Explore AI Governance
            </ArrowLink>
          </div>
          <ul className="border-t border-ink lg:col-span-6 lg:mt-2">
            {aiHighlights.map((c) => (
              <li key={c.id} className="reveal border-b border-line">
                <Link href={`/ai-governance#${c.id}`} className="group grid grid-cols-[1fr_auto] items-center gap-6 py-6 sm:gap-10">
                  <span>
                    <span className={`block text-h3 font-semibold ${rowTitle}`}>{c.title}</span>
                    <span className="mt-2 block text-muted">{c.summary}</span>
                  </span>
                  <ArrowRight aria-hidden className={rowArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Business problems */}
      <Section tone="deep" aria-labelledby="problems-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="problems-title" eyebrow="Where we help" title="Problems we help solve" className="reveal" />
            </div>
          </div>
          <ul className="border-t border-ink lg:col-span-8">
            {problems.map((p) => (
              <li key={p.problem} className="reveal border-b border-line">
                <Link href={p.href} className="group grid gap-3 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
                  <span>
                    <span className={`block text-balance text-h3 font-semibold ${rowTitle}`}>{p.problem}</span>
                    <span className="mt-2 block text-pretty text-muted">{p.detail}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-label uppercase text-ink">
                    {p.service}
                    <ArrowRight aria-hidden className={rowArrow} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* How the specializations connect */}
      <Section tone="night" aria-labelledby="connect-title">
        <Container>
          <div className="reveal grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="night">How it connects</Eyebrow>
              <h2 id="connect-title" className="mt-5 text-h2">
                {company.thesis}
              </h2>
            </div>
            <p className="text-lead text-night-muted lg:col-span-5 lg:pt-12">
              An AI assistant that draws on unreliable data gives unreliable answers. Personalization built on unconsented
              profiles creates risk instead of loyalty. We work across the data, the controls, the customer experience and the
              software that connects them, so they are designed and built together.
            </p>
          </div>
          <ConnectionDiagram />
        </Container>
      </Section>

      {/* Adobe Services section: application map, assessment entry point, partner statement */}
      <AdobeSection />

      {/* Delivery approach */}
      <Section tone="surface" aria-labelledby="approach-title">
        <Container>
          <SectionHeading
            id="approach-title"
            eyebrow="How we work"
            title="Every project follows the same four stages"
            intro="Whatever the specialization, each stage ends with a deliverable you own and can act on."
            className="reveal"
          />
          <ApproachSteps stages={deliveryApproach} />
        </Container>
      </Section>

      {/* Industries */}
      <Section aria-labelledby="industries-title">
        <Container>
          <SectionHeading
            id="industries-title"
            eyebrow="Industries"
            title="Applied to the realities of your sector"
            intro="Regulations, customers and systems differ by industry. See how our specializations apply in each."
            className="reveal"
          />
          <ul className="mt-12 grid border-t border-ink sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
            {industries.map((i) => (
              <li key={i.id} className="reveal border-b border-line">
                <Link href={`/industries#${i.id}`} className="group flex min-h-16 items-center justify-between gap-4 py-3 font-medium">
                  <span className={rowTitle}>{i.name}</span>
                  <ArrowRight aria-hidden className={rowArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* MapleRecord: our own product, shown with a real product screen */}
      <Section tone="deep" aria-labelledby="maplerecord-title">
        {/* reveal on the container, card-lift on the card: each owns its own transform. */}
        <Container className="reveal">
          <div className="card-lift on-night relative isolate overflow-hidden rounded-3xl bg-night text-night-text lg:grid lg:grid-cols-12">
            <div className="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12 xl:p-14">
              <Eyebrow tone="night">Our product</Eyebrow>
              <h2 id="maplerecord-title" className="mt-5 text-h2">
                MapleRecord
              </h2>
              <p className="mt-5 max-w-[46ch] text-night-muted">
                An AI-first hybrid records management system for electronic and physical records, with five integrated
                modules. Designed and built by Maverick InnoGarage.
              </p>
              <ul aria-label="MapleRecord modules" className="mt-6 flex flex-wrap gap-2">
                {maplerecordModules.map((m) => (
                  <li
                    key={m}
                    className="rounded-full border border-night-line px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-night-muted"
                  >
                    {m}
                  </li>
                ))}
              </ul>
              {/* Stretched link: the whole card is clickable; the link's name stays "Explore MapleRecord". */}
              <ArrowLink
                href="/maplerecord"
                className="mt-8 self-start text-night-text decoration-night-line after:absolute after:inset-0 after:rounded-3xl lg:mt-auto lg:pt-10"
              >
                Explore MapleRecord
              </ArrowLink>
              <p className="mt-3 text-sm text-night-muted">{mrSampleDataNote}</p>
            </div>
            {/* The screen bleeds off the card's right and bottom edges; from lg it fills the row height (cropped from
                the top left), so a taller text column never leaves a gap under it. */}
            <div className="pointer-events-none pl-7 sm:pl-10 lg:col-span-7 lg:pl-0 lg:pt-12 xl:pt-14">
              <div className="w-[118%] overflow-hidden rounded-tl-xl border-l border-t border-night-line shadow-[0_-12px_40px_-12px_rgb(0_0_0/0.6)] sm:w-[112%] lg:h-full lg:w-[128%]">
                <Image
                  src="/maplerecord/screens/records-dashboard.webp"
                  alt="MR Records dashboard with sample data: record totals, an activity chart, today's tasks and alerts"
                  width={2560}
                  height={1600}
                  sizes="(min-width: 1280px) 900px, (min-width: 1024px) 70vw, 110vw"
                  className="h-auto w-full lg:h-full lg:object-cover lg:object-left-top"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest insights */}
      <Section aria-labelledby="insights-title">
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="insights-title" eyebrow="Insights" title="From our insights" />
            <ArrowLink href="/insights">All insights</ArrowLink>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {latest.map((a) => (
              <li key={a.slug} className="reveal">
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="Ready to build on a trusted foundation?"
        body="Tell us about your AI governance, Adobe, data or software project. We'll scope a practical first step and deliver it with you."
      />
    </>
  );
}
