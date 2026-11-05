import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { HeroVisual } from "@/components/graphics/hero-visual";
import { GovernanceGlyph, JourneyGlyph, LifecycleGlyph, MapleRecordGraphic } from "@/components/graphics/service-graphics";
import { deliveryApproach, expertise, hero, problems } from "@/content/home";
import { industries } from "@/content/industries";
import { company } from "@/config/site";
import { CtaBand } from "@/features/contact/cta-band";
import { AdobeSection } from "@/features/home/adobe-section";
import { ConnectionDiagram } from "@/features/home/connection-diagram";
import { ArticleCard } from "@/features/insights/article-card";
import { ApproachSteps } from "@/features/services/sections";
import { getInsights } from "@/lib/content/insights";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: company.positioning, path: "/" });

const glyphs = { governance: GovernanceGlyph, journey: JourneyGlyph, lifecycle: LifecycleGlyph };

export default async function HomePage() {
  const latest = (await getInsights()).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <Container className="grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[55fr_45fr] lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            {/* Every item carries its own marker so the list wraps cleanly on narrow screens. */}
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-label uppercase text-muted">
              {hero.eyebrow.map((item) => (
                <span key={item} className="flex items-center gap-2.5">
                  <Dot className="size-1.5" />
                  {item}
                </span>
              ))}
            </p>
            <h1 className="mt-7 max-w-[14ch] text-display font-semibold">{hero.title}</h1>
            <p className="mt-7 max-w-[54ch] text-lead text-muted">{hero.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact#inquiry" arrow>
                Talk to an Expert
              </ButtonLink>
              <ButtonLink href="#expertise" variant="outline">
                Explore Our Expertise
              </ButtonLink>
            </div>
          </div>
          <div>
            <HeroVisual className="mx-auto max-w-[34rem]" />
            <ol className="mt-6 grid gap-2 sm:hidden" aria-label="Diagram layers">
              {["AI & digital experiences", "Governance controls", "Data foundations"].map((label, i) => (
                <li key={label} className="flex items-center gap-3 font-mono text-label uppercase text-muted">
                  <span className="inline-flex size-6 items-center justify-center rounded-full border border-line-strong text-[0.625rem]">{3 - i}</span>
                  {label}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Three areas of expertise */}
      <Section id="expertise" aria-labelledby="expertise-title">
        <Container>
          <SectionHeading
            id="expertise-title"
            eyebrow="Our expertise"
            title="Three specializations. One connected practice."
            intro="Each specialization stands on its own, and each works better with the other two."
          />
          <ul className="mt-14 grid border-t border-ink lg:grid-cols-3 lg:divide-x lg:divide-line">
            {expertise.map((e, i) => {
              const Glyph = glyphs[e.glyph];
              return (
                <li key={e.href} className="flex flex-col border-b border-line py-10 lg:border-b-0 lg:px-10 lg:first:pl-0 lg:last:pr-0">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <Glyph />
                  </div>
                  <h3 className="mt-6 text-[clamp(1.75rem,1.45rem+0.9vw,2.25rem)] leading-tight tracking-[-0.03em]">
                    <Link href={e.href} className="hover:underline hover:decoration-2 hover:underline-offset-8">
                      {e.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-muted">{e.summary}</p>
                  <ul className="mt-6 space-y-2 text-[0.9375rem]">
                    {e.services.map((s) => (
                      <li key={s} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-ink" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <ArrowLink href={e.href} className="mt-auto pt-8">
                    Explore {e.title}
                  </ArrowLink>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      {/* Adobe practice: applications by area, partner statement, assessment entry point */}
      <AdobeSection />

      {/* Business problems */}
      <Section aria-labelledby="problems-title">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="problems-title" eyebrow="Where we help" title="Problems we help solve" />
            </div>
          </div>
          <ul className="border-t border-ink lg:col-span-8">
            {problems.map((p) => (
              <li key={p.problem} className="border-b border-line">
                <Link href={p.href} className="group grid gap-3 py-7 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-10">
                  <span>
                    <span className="block text-h3 font-semibold group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                      {p.problem}
                    </span>
                    <span className="mt-2 block text-muted">{p.detail}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 font-mono text-label uppercase text-ink">
                    {p.service}
                    <ArrowRight aria-hidden className="size-4 text-signal transition-transform group-hover:translate-x-0.5" />
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
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow tone="night">How it connects</Eyebrow>
              <h2 id="connect-title" className="mt-5 text-h2">
                {company.thesis}
              </h2>
            </div>
            <p className="text-lead text-night-muted lg:col-span-5 lg:pt-12">
              An AI assistant that draws on unreliable data gives unreliable answers. Personalization built on unconsented
              profiles creates risk instead of loyalty. We work across all three layers, so the data, the controls and the
              customer experience are designed together.
            </p>
          </div>
          <ConnectionDiagram />
        </Container>
      </Section>

      {/* Delivery approach */}
      <Section tone="surface" aria-labelledby="approach-title">
        <Container>
          <SectionHeading
            id="approach-title"
            eyebrow="How we work"
            title="Assess → Design → Implement → Improve"
            intro="The same four stages shape every engagement, whatever the specialization. Each one ends with a deliverable you own and can act on."
          />
          <ApproachSteps stages={deliveryApproach} />
        </Container>
      </Section>

      {/* Industries and MapleRecord */}
      <Section aria-labelledby="industries-title">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="industries-title"
              eyebrow="Industries"
              title="Applied to the realities of your sector"
              intro="Regulations, customers and systems differ by industry. See how our specializations apply in each."
            />
            <ul className="mt-10 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
              {industries.map((i) => (
                <li key={i.id} className="border-b border-line">
                  <Link href={`/industries#${i.id}`} className="group flex min-h-14 items-center justify-between gap-4 py-3 font-medium">
                    {i.name}
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-muted transition-colors group-hover:text-signal" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="on-night flex h-full flex-col rounded-3xl bg-night p-7 text-night-text sm:p-10">
              <Eyebrow tone="night">Our product</Eyebrow>
              <h3 className="mt-5 text-h2">MapleRecord</h3>
              <p className="mt-4 max-w-[48ch] text-night-muted">
                An AI-first hybrid records management system for electronic and physical records, with four integrated
                modules: MR Records, MR Requests, MR Workflows and MR Forms.
              </p>
              <MapleRecordGraphic tone="night" className="mt-8" />
              <ArrowLink href="/maplerecord" className="mt-6 text-night-text decoration-night-line">
                Explore MapleRecord
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest insights */}
      <Section tone="deep" aria-labelledby="insights-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading id="insights-title" eyebrow="Insights" title="Recent articles" />
            <ArrowLink href="/insights">All insights</ArrowLink>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {latest.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title="Ready to build on a trusted foundation?"
        body="Tell us where you are with AI, Adobe or your data. We'll help you identify a practical first step."
      />
    </>
  );
}
