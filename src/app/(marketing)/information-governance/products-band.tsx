import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow, SectionHeading, Tag } from "@/components/ui/layout";
import { coreExpertiseNav, mapleRecordPath, moliPath } from "@/config/navigation";
import { moliPillars, moliRelationship } from "@/content/moli";
import { getMrModules } from "@/lib/content/maplerecord";
import { cn } from "@/lib/utils";

/** The two core areas next to Information Governance, with labels and links from the core-expertise navigation. */
const adjacent = coreExpertiseNav.filter((n) => n.href === "/data-management" || n.href === "/ai-governance");

/**
 * Sits after the capabilities list: the two products the work is delivered on, then the adjacent core areas. Copy
 * comes from the deck's pillar 07 descriptions (via the MapleRecord callout and src/content/moli.ts) and the module
 * summaries; nothing new is claimed. No bottom padding: the approach section that follows is on the same paper
 * background and supplies its own top padding.
 */
export function ProductsBand() {
  const modules = getMrModules();
  const cards = [
    {
      id: "maplerecord",
      label: moliRelationship.mapleRecord.label,
      name: "MapleRecord",
      body: "Customized records management software for government, municipalities and regulated organizations, with workflow automation, a seamless user experience and lifecycle governance.",
      night: false,
    },
    {
      id: "moli",
      label: "AI-driven record management",
      name: "MOLI",
      body: "Our flagship AI-powered record management system for government and regulated industries, built around four capabilities.",
      night: true,
    },
  ];
  return (
    <section className="bg-paper pt-16 sm:pt-20 lg:pt-24" aria-labelledby="products-title">
      <Container>
        <SectionHeading
          className="reveal"
          id="products-title"
          eyebrow="Our products"
          title="Delivered on software we design and build"
          intro="Both products are made by Maverick InnoGarage, so the team that configures and supports them knows them from the inside."
        />
        {/* From lg the two cards share row tracks (subgrid), so descriptions and lists line up across both. */}
        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr_auto]">
          {cards.map((card) => (
            <article
              key={card.id}
              aria-labelledby={`product-${card.id}`}
              className={cn(
                "reveal flex flex-col rounded-3xl p-7 sm:p-10 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-0",
                card.night ? "on-night bg-night text-night-text" : "bg-surface ring-1 ring-line",
              )}
            >
              <div>
                <Eyebrow tone={card.night ? "night" : "light"}>{card.label}</Eyebrow>
                <h3
                  id={`product-${card.id}`}
                  className="mt-4 font-display text-[2rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[2.5rem]"
                >
                  {card.name}
                </h3>
              </div>
              <p className={cn("mt-5 max-w-[56ch]", card.night ? "text-night-muted" : "text-muted")}>{card.body}</p>
              {card.night ? (
                <ul className="mt-8 border-t border-night-line" aria-label="What MOLI brings together">
                  {moliPillars.items.map((p) => (
                    <li key={p.title} className="border-b border-night-line py-4">
                      <p className="font-medium">{p.title}</p>
                      <p className="mt-1 text-[0.9375rem] text-night-muted">{p.body}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-8 border-t border-line" aria-label="MapleRecord modules">
                  {modules.map((m) => (
                    <li key={m.slug} className="border-b border-line">
                      <Link
                        href={`${mapleRecordPath}/platform/${m.slug}`}
                        className="group flex items-baseline gap-x-5 py-4 max-sm:flex-col"
                      >
                        <span className="shrink-0 font-medium underline decoration-line-strong underline-offset-4 transition-colors group-hover:decoration-signal sm:w-32">
                          {m.name}
                        </span>
                        <span className="mt-1 text-[0.9375rem] text-muted sm:mt-0">{m.summary}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8 lg:self-end">
                {card.night ? (
                  <>
                    <ul aria-label={moliRelationship.moli.tagsLabel} className="flex flex-wrap gap-2">
                      {moliRelationship.moli.tags.map((t) => (
                        <li key={t}>
                          <Tag className="border-night-line text-night-muted">{t}</Tag>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={moliPath}
                      className="group mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-night-text underline decoration-night-line underline-offset-[6px] hover:decoration-night-text"
                    >
                      Explore MOLI
                      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </Link>
                  </>
                ) : (
                  <ArrowLink href={mapleRecordPath}>Explore MapleRecord</ArrowLink>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* The adjacent core areas: information governance shares its foundations with both. */}
        <div className="reveal mt-12 grid gap-6 border-t border-ink pt-8 lg:grid-cols-12 lg:gap-16">
          <h3 className="font-mono text-label uppercase text-muted lg:col-span-4 lg:pt-[0.9rem]">Works alongside</h3>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {adjacent.map((a) => (
              <li key={a.href} className="flex flex-col">
                <ArrowLink href={a.href} className="self-start text-lg">
                  {a.label}
                </ArrowLink>
                <p className="mt-1 text-[0.9375rem] text-muted">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
