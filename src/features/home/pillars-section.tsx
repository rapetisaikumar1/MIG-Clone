import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GovernanceGlyph } from "@/components/graphics/service-graphics";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { aiGovernanceNav, pillarsNav, servicesPath } from "@/config/navigation";
import { pillarCapabilities, pillarsIntro } from "@/content/home";
import { pillarGlyphs } from "./pillar-glyphs";

/** Card rows shared through subgrid from md: glyph and number, title, capabilities, links. */
const card = "reveal relative flex flex-col rounded-2xl p-6 sm:p-7 md:row-span-4 md:grid md:grid-rows-subgrid md:gap-y-0 lg:p-8";

/**
 * "7 practice pillars. One accountable partner." The seven pillars of the Capability Matrix as cards, plus an
 * eighth cell for AI Governance and the services hub, so the grid closes evenly at every width
 * (1 column on phones, 2 on tablets, 4 on desktop).
 * Pillars 01–06 are whole-card links (stretched title link); pillar 07 links to its two products instead.
 */
export function PillarsSection() {
  return (
    <Section id="pillars" aria-labelledby="pillars-title">
      <Container>
        <SectionHeading
          id="pillars-title"
          eyebrow={pillarsIntro.eyebrow}
          title={pillarsIntro.title}
          intro={pillarsIntro.intro}
          className="reveal"
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {pillarsNav.map((p) => {
            const Glyph = pillarGlyphs[p.number];
            const capabilities = pillarCapabilities[p.number] ?? [];
            return (
              <li key={p.number} className={`${card} card-lift group group/glyph border border-line bg-surface`}>
                <div className="flex items-start justify-between gap-4">
                  {Glyph ? <Glyph className="h-12 w-[4.5rem] md:h-16 md:w-24" /> : <span />}
                  <span className="font-mono text-label text-muted">{p.number}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.015em] text-balance md:mt-8">
                  {p.links ? (
                    p.label
                  ) : (
                    <Link
                      href={p.href}
                      className="decoration-1 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl group-hover:underline"
                    >
                      {p.label}
                    </Link>
                  )}
                </h3>
                <ul className="mt-5 space-y-2 text-[0.9375rem] leading-snug text-muted">
                  {capabilities.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span aria-hidden className="mt-[0.6rem] h-px w-2.5 shrink-0 bg-line-strong" />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-end gap-x-6 pt-4 md:pt-6">
                  {p.links ? (
                    p.links.map((l) => (
                      <ArrowLink key={l.href} href={l.href} className="relative z-10">
                        {l.label}
                      </ArrowLink>
                    ))
                  ) : (
                    // Visual cue only: the title link above already covers the card.
                    <span aria-hidden className="inline-flex min-h-11 items-center font-medium text-ink">
                      Explore
                      <ArrowRight className="ml-2 size-4 text-signal transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </li>
            );
          })}

          {/* Eighth cell: AI Governance (not a pillar in the deck) and the services hub. */}
          <li className={`${card} group/glyph border border-dashed border-line-strong`}>
            <div className="flex items-start justify-between gap-4">
              <GovernanceGlyph className="h-12 w-[4.5rem] md:h-16 md:w-24" />
              <span className="font-mono text-label uppercase text-muted">{pillarsIntro.aiGovernance.eyebrow}</span>
            </div>
            <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.015em] md:mt-8">
              {pillarsIntro.aiGovernance.title}
            </h3>
            <p className="mt-5 text-[0.9375rem] leading-snug text-muted">{pillarsIntro.aiGovernance.body}</p>
            <div className="flex flex-col items-start pt-6">
              <ArrowLink href={aiGovernanceNav.href}>Explore AI Governance</ArrowLink>
              <ArrowLink href={servicesPath}>All services</ArrowLink>
            </div>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
