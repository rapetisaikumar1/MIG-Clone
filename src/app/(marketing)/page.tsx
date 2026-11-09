import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { moliPath, pillarsNav } from "@/config/navigation";
import { connection, deliveryApproach, homeCta, homeDescription, maplerecordFeature, problems } from "@/content/home";
import { industries } from "@/content/industries";
import { mrSampleDataNote } from "@/content/maplerecord/overview";
import { CtaBand } from "@/features/contact/cta-band";
import { AdobeSection } from "@/features/home/adobe-section";
import { ClientImpactSection } from "@/features/home/client-impact";
import { ConnectionDiagram } from "@/features/home/connection-diagram";
import { HeroBanner } from "@/features/home/hero-banner";
import { PillarsSection } from "@/features/home/pillars-section";
import { ArticleCard } from "@/features/insights/article-card";
import { ApproachSteps } from "@/features/services/sections";
import { getInsights } from "@/lib/content/insights";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: homeDescription, path: "/" });

const pillarLabel = (n: string) => pillarsNav.find((p) => p.number === n)?.label ?? "";

/** One hover pattern for every link row on the page: muted arrow → signal red with a 2px nudge (motion-safe). */
const rowArrow =
  "size-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-signal motion-safe:transition-[color,transform] motion-safe:group-hover:translate-x-0.5";
const rowTitle = "decoration-1 underline-offset-4 group-hover:underline";

/*
 * Section order follows the Capability Matrix narrative: who we are (hero) → the seven practice pillars → the
 * problems they solve → how the pillars connect → the featured Adobe practice → how we deliver (three stages) →
 * industries → our products → client impact (hidden until confirmed) → insights → contact.
 * Each figure appears once: "12+ years" in the hero, 7 pillars, 9 Adobe offerings and 8 industries in their own
 * section headings (there is no separate figures strip, which only repeated them).
 * Tones alternate so consecutive sections never share a background.
 */
export default async function HomePage() {
  const latest = (await getInsights()).slice(0, 3);

  return (
    <>
      <HeroBanner />
      <PillarsSection />

      {/* Business problems, one per pillar */}
      <Section tone="deep" aria-labelledby="problems-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                id="problems-title"
                eyebrow="Where we help"
                title="Problems we help solve"
                intro="Start from the problem. Each one leads to the pillar that addresses it."
                className="reveal"
              />
            </div>
          </div>
          <ul className="border-t border-ink lg:col-span-8">
            {problems.map((p) => (
              <li key={p.problem} className="reveal border-b border-line">
                <Link href={p.href} className="group grid grid-cols-[1fr_auto] items-center gap-6 py-7 sm:gap-10">
                  <span>
                    <span className="block font-mono text-label uppercase text-muted">
                      {p.pillar} · {pillarLabel(p.pillar)}
                    </span>
                    <span className={`mt-3 block text-balance text-h3 font-semibold ${rowTitle}`}>{p.problem}</span>
                    <span className="mt-2 block text-pretty text-muted">{p.detail}</span>
                  </span>
                  <ArrowRight aria-hidden className={rowArrow} />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* How the pillars connect */}
      <Section tone="night" aria-labelledby="connect-title">
        <Container>
          <div className="reveal grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="night">{connection.eyebrow}</Eyebrow>
              <h2 id="connect-title" className="mt-5 text-h2">
                {connection.title}
              </h2>
            </div>
            <p className="text-lead text-night-muted lg:col-span-5 lg:pt-12">{connection.body}</p>
          </div>
          <ConnectionDiagram />
        </Container>
      </Section>

      {/* Adobe Services section: application map, assessment entry point, partner statement */}
      <AdobeSection />

      {/* Delivery approach: the deck's three stages */}
      <Section tone="surface" aria-labelledby="approach-title">
        <Container>
          <SectionHeading
            id="approach-title"
            eyebrow="How we deliver"
            title="From vision to victory, in three stages"
            intro="Whatever the pillar, every engagement moves through the same three stages, and each one ends with something you own and can act on."
            className="reveal"
          />
          <ApproachSteps stages={deliveryApproach} />
        </Container>
      </Section>

      {/* Industries, with the deck's focus line for each (`Industry.focus`) */}
      <Section aria-labelledby="industries-title">
        <Container>
          <SectionHeading
            id="industries-title"
            eyebrow="Industries"
            title="Applied to the realities of your sector"
            intro="Regulations, customers and systems differ by sector. Here is where our work focuses in each of the eight we serve."
            className="reveal"
          />
          <ul className="mt-12 grid border-t border-ink sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
            {industries.map((i) => (
                <li key={i.id} className="reveal border-b border-line">
                  <Link href={`/industries#${i.id}`} className="group flex h-full items-start justify-between gap-4 py-6">
                    <span>
                      <span className={`block font-semibold ${rowTitle}`}>{i.name}</span>
                      <span className="mt-2 block text-[0.9375rem] leading-snug text-muted">{i.focus}</span>
                    </span>
                    <ArrowRight aria-hidden className={`mt-1 ${rowArrow}`} />
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
              <Eyebrow tone="night">{maplerecordFeature.eyebrow}</Eyebrow>
              <h2 id="maplerecord-title" className="mt-5 text-h2">
                {maplerecordFeature.title}
              </h2>
              <p className="mt-5 max-w-[46ch] text-night-muted">{maplerecordFeature.body}</p>
              <ul aria-label="MapleRecord modules" className="mt-6 flex flex-wrap gap-2">
                {maplerecordFeature.modules.map((m) => (
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
              {/* MOLI sits above the card's stretched link (z-10) so it stays its own link. */}
              <p className="relative z-10 mt-8 border-t border-night-line pt-6 text-[0.9375rem] text-night-muted">
                <Link
                  href={moliPath}
                  className="group/moli mr-2 inline-flex items-center gap-1.5 font-semibold text-night-text underline decoration-night-line underline-offset-4 hover:decoration-logo-red"
                >
                  {maplerecordFeature.moli.label}
                  <ArrowRight aria-hidden className="size-4 text-logo-red motion-safe:transition-transform motion-safe:group-hover/moli:translate-x-0.5" />
                </Link>
                {maplerecordFeature.moli.body}
              </p>
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

      <ClientImpactSection />

      {/* Latest insights */}
      <Section aria-labelledby="insights-title">
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="insights-title" eyebrow="Insights" title="Recent articles" />
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

      <CtaBand title={homeCta.title} body={homeCta.body} />
    </>
  );
}
