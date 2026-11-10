import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { coreExpertiseNav, pillarsNav, servicesPath, type NavItem } from "@/config/navigation";
import { coreAreas, pillarCapabilities, pillarsIntro } from "@/content/home";
import { coreGlyphs, pillarGlyphs } from "./pillar-glyphs";

/** Card rows shared through subgrid from md: glyph and reference, title, capabilities, links. */
const card =
  "reveal card-lift group group/glyph relative flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7 md:row-span-4 md:grid md:grid-rows-subgrid md:gap-y-0 lg:p-8";
/** Four cards per group: 1 column on phones, 2 on tablets, 4 on wide screens, so each group closes evenly. */
const grid = "mt-5 grid gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-4";

type CardProps = {
  glyph?: (props: { className?: string }) => React.JSX.Element;
  /** Capability Matrix pillar number(s) in the top corner, e.g. "07" or "01 + 02". */
  reference: string;
  label: string;
  href: string;
  capabilities: readonly string[];
  /** Extra destinations (pillar 07's products), shown instead of the "Explore" cue. */
  links?: NavItem[];
};

/** One card: the title is a stretched link to the area's page; extra links sit above it (z-10). */
function AreaCard({ glyph: Glyph, reference, label, href, capabilities, links }: CardProps) {
  return (
    <li className={card}>
      <div className="flex items-start justify-between gap-4">
        {Glyph ? <Glyph className="h-12 w-[4.5rem] md:h-16 md:w-24" /> : <span />}
        <span className="whitespace-nowrap font-mono text-label text-muted">
          <span className="sr-only">{reference.includes("+") ? "Builds on pillars " : "Pillar "}</span>
          {reference}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-semibold leading-snug tracking-[-0.015em] text-balance md:mt-8">
        <Link
          href={href}
          className="decoration-1 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl group-hover:underline"
        >
          {label}
        </Link>
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
        {links ? (
          links.map((l) => (
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
}

/**
 * What we deliver: the four core areas (Information, Data and AI Governance, and MarTech) as peer cards, then the
 * four supporting practice pillars of the Capability Matrix. Pillars 07, 01 and 03 sit behind three of the core
 * areas, so all seven pillars appear once. Pillar 07's card also links to its two products, MapleRecord and MOLI.
 */
export function PillarsSection() {
  const corePillarHrefs = new Set(coreExpertiseNav.map((a) => a.href));
  const supporting = pillarsNav.filter((p) => !corePillarHrefs.has(p.href));

  return (
    <Section id="pillars" aria-labelledby="pillars-title">
      <Container>
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="pillars-title" eyebrow={pillarsIntro.eyebrow} title={pillarsIntro.title} intro={pillarsIntro.intro} />
          <ArrowLink href={servicesPath}>All services</ArrowLink>
        </div>

        <p id="core-areas-label" className="reveal mt-14 font-mono text-label uppercase text-muted">
          {pillarsIntro.coreLabel}
        </p>
        <ul aria-labelledby="core-areas-label" className={grid}>
          {coreExpertiseNav.map((a) => (
            <AreaCard
              key={a.href}
              glyph={coreGlyphs[a.href]}
              reference={coreAreas[a.href]?.ref ?? ""}
              label={a.label}
              href={a.href}
              capabilities={coreAreas[a.href]?.capabilities ?? []}
              links={pillarsNav.find((p) => p.href === a.href)?.links}
            />
          ))}
        </ul>

        <p id="supporting-pillars-label" className="reveal mt-12 font-mono text-label uppercase text-muted">
          {pillarsIntro.supportingLabel}
        </p>
        <ul aria-labelledby="supporting-pillars-label" className={grid}>
          {supporting.map((p) => (
            <AreaCard
              key={p.number}
              glyph={pillarGlyphs[p.number]}
              reference={p.number}
              label={p.label}
              href={p.href}
              capabilities={pillarCapabilities[p.number] ?? []}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
