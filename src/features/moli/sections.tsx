import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight, Cloud, Search, ShieldCheck, Users } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section, SectionHeading, Tag } from "@/components/ui/layout";
import { moliHero, moliPillars, moliRegulations, moliRelationship, type MoliPillarIcon } from "@/content/moli";
import { contactHref } from "@/features/contact/links";
import { getMrModules } from "@/lib/content/maplerecord";
import { cn } from "@/lib/utils";
import { MoliGraphic } from "./moli-graphic";

const pillarIcons: Record<MoliPillarIcon, ComponentType<{ className?: string }>> = {
  search: Search,
  cloud: Cloud,
  people: Users,
  privacy: ShieldCheck,
};

export function MoliHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pb-16 pt-10 sm:pb-20 lg:pb-24 lg:pt-14">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {/* Keep the dot on the first line if the eyebrow wraps on phones. */}
            <Eyebrow className="items-start [&>span:first-child]:mt-[0.2rem]">
              <span>{moliHero.eyebrow}</span>
            </Eyebrow>
            <h1 className="mt-6 text-h1">{moliHero.title}</h1>
            <p className="mt-7 max-w-[60ch] text-lead text-muted">{moliHero.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref("records-management")} arrow>
                {moliHero.primaryLabel}
              </ButtonLink>
              <ButtonLink href={moliHero.secondary.href} variant="outline">
                {moliHero.secondary.label}
              </ButtonLink>
            </div>
          </div>
          <div className="w-full max-lg:mx-auto max-lg:max-w-lg lg:col-span-5">
            <div className="rounded-2xl border border-line bg-surface/70 p-4 sm:p-6 lg:p-8">
              <MoliGraphic />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function MoliPillars() {
  return (
    <Section tone="surface" id="capabilities" aria-labelledby="pillars-title">
      <Container>
        <SectionHeading className="reveal" id="pillars-title" eyebrow={moliPillars.eyebrow} title={moliPillars.title} intro={moliPillars.intro} />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr] lg:gap-x-6 lg:gap-y-0">
          {moliPillars.items.map((p, i) => {
            const Icon = pillarIcons[p.icon];
            return (
              <li key={p.title} className="reveal flex flex-col rounded-3xl bg-paper p-7 ring-1 ring-line sm:p-8 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-0">
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-ink text-night-text">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span aria-hidden className="font-mono text-label text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold leading-snug tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-4 text-ink-soft">{p.body}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export function MoliRegulations() {
  return (
    <Section tone="deep" aria-labelledby="regulations-title">
      <Container>
        <SectionHeading className="reveal" id="regulations-title" eyebrow={moliRegulations.eyebrow} title={moliRegulations.title} intro={moliRegulations.intro} />
        {/* From lg the four cards share row tracks (subgrid), so every description starts on the same line even
            when a regulation's full name wraps to three lines. */}
        <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:grid-rows-[auto_1fr]">
          {moliRegulations.items.map((r) => (
            <div key={r.code} className="flex flex-col bg-surface p-7 sm:p-8 lg:row-span-2 lg:grid lg:grid-rows-subgrid lg:gap-0">
              <dt>
                <span className="block font-display text-[2rem] font-semibold leading-none tracking-[-0.03em]">{r.code}</span>
                <span className="mt-4 block font-mono text-label uppercase text-muted">{r.region}</span>
                <span className="mt-4 block font-medium leading-snug">{r.name}</span>
              </dt>
              <dd className="mt-3 text-[0.9375rem] text-muted">{r.body}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 max-w-[80ch] text-sm text-muted">{moliRegulations.note}</p>
      </Container>
    </Section>
  );
}

/**
 * Side-by-side comparison. From lg the two cards share row tracks (subgrid), so "What it is", "Focus" and
 * "Built for" line up across both products whatever the copy length.
 */
export function MoliRelationship() {
  const { moli, mapleRecord, rows } = moliRelationship;
  const modules = getMrModules();
  const cards = [
    { ...moli, night: true },
    { ...mapleRecord, night: false },
  ];
  return (
    <Section tone="surface" aria-labelledby="relationship-title">
      <Container>
        <SectionHeading className="reveal" id="relationship-title" eyebrow={moliRelationship.eyebrow} title={moliRelationship.title} intro={moliRelationship.intro} />
        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:grid-rows-[auto_repeat(3,auto)_1fr]">
          {cards.map((card) => (
            <article
              key={card.name}
              aria-labelledby={`product-${card.name}`}
              className={cn(
                "reveal flex flex-col rounded-3xl p-7 sm:p-10 lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-0",
                card.night ? "on-night bg-night text-night-text" : "bg-paper ring-1 ring-line",
              )}
            >
              <div>
                <Eyebrow tone={card.night ? "night" : "light"}>{card.label}</Eyebrow>
                <h3 id={`product-${card.name}`} className="mt-4 font-display text-[2rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.5rem]">
                  {card.name}
                </h3>
              </div>
              {rows.map((row, i) => (
                <div key={row} className={cn("mt-6 border-t pt-5", card.night ? "border-night-line" : "border-line")}>
                  <p className={cn("font-mono text-label uppercase", card.night ? "text-night-muted" : "text-muted")}>{row}</p>
                  <p className="mt-2 max-w-[48ch]">{card.values[i]}</p>
                </div>
              ))}
              <div className="mt-8 lg:self-end">
                {"href" in card ? (
                  <>
                    <ul aria-label="MapleRecord modules" className="flex flex-wrap gap-2">
                      {modules.map((m) => (
                        <li key={m.slug}>
                          <Tag>{m.name}</Tag>
                        </li>
                      ))}
                    </ul>
                    <ArrowLink href={card.href} className="mt-7">
                      {card.linkLabel}
                    </ArrowLink>
                  </>
                ) : (
                  <>
                    <ul aria-label={card.tagsLabel} className="flex flex-wrap gap-2">
                      {card.tags.map((t) => (
                        <li key={t}>
                          <Tag className="border-night-line text-night-muted">{t}</Tag>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={contactHref("records-management")}
                      className="group mt-7 inline-flex min-h-11 items-center gap-2 font-medium text-night-text underline decoration-night-line underline-offset-[6px] hover:decoration-night-text"
                    >
                      {card.linkLabel}
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </Link>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="max-w-[62ch] text-muted">{moliRelationship.footer}</p>
          <ArrowLink href={moliRelationship.practice.href}>{moliRelationship.practice.label}</ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
