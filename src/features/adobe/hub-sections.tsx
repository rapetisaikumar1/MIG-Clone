import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Dot, Section, SectionHeading } from "@/components/ui/layout";
import { adobeHub } from "@/content/services/adobe-services";
import { contactHref } from "@/features/contact/links";
import { keepHyphenatedWords } from "@/features/adobe/keep-hyphenated";
import { AdobePartnerPanel } from "@/features/adobe/partner-panel";
import { adobeAssessmentPath, adobeProductPath, getAdobeProducts } from "@/lib/content/adobe";
import { cn } from "@/lib/utils";

/*
 * Sections that only the /adobe-services hub renders, slotted into the shared ServicePage.
 * Copy lives in src/content/services/adobe-services.ts (`adobeHub`); product facts come from
 * src/content/adobe/products via getAdobeProducts().
 *
 * Motion: card grids carry the shared `reveal` utility (transform-only rise as they scroll into view) and
 * clickable cards carry `card-lift` (hover/focus-within lift); both are defined in globals.css and are
 * motion-safe. Neither changes opacity, so text is never left partially transparent.
 */

/** Card chrome shared by the dark application tiles: subgrid rows from sm keep titles, summaries and links aligned. */
const nightCard =
  "card-lift group relative flex flex-col rounded-2xl p-6 transition-colors focus-within:border-night-text has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-night-text sm:row-span-4 sm:mb-4 sm:grid sm:grid-rows-subgrid sm:gap-y-0 sm:p-7";

/**
 * The one place the hub lists Adobe applications: area, name and a one-line summary of our work on it.
 * The per-application service lists live on each application's page (and in "Services and capabilities"
 * above), so the cards don't repeat them. Each card links to its page and carries the product slug as
 * its id, so /adobe-services#target and similar anchors keep working.
 */
export function AdobeApplicationsSection() {
  const { eyebrow, title, intro, startTile } = adobeHub.applications;
  const products = getAdobeProducts();
  return (
    <Section tone="night" id="applications" aria-labelledby="applications-title">
      <Container>
        <SectionHeading tone="night" id="applications-title" eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="reveal mt-12 grid gap-4 sm:-mb-4 sm:grid-cols-2 sm:gap-y-0 xl:grid-cols-4">
          {products.map((p) => (
            <li key={p.slug} id={p.slug} className={cn(nightCard, "border border-night-line bg-night-raised hover:border-night-muted")}>
              <p className="font-mono text-label uppercase text-night-muted">{p.area}</p>
              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
                <Link href={adobeProductPath(p.slug)} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                  {p.name}
                </Link>
              </h3>
              <p className="mt-2 text-[0.9375rem] text-night-muted">{p.summary}</p>
              <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium">
                Explore
                <ArrowRight className="size-4 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </li>
          ))}
          <li className={cn(nightCard, "border border-dashed border-night-muted/60 hover:border-night-text")}>
            <p className="flex items-center gap-2.5 font-mono text-label uppercase text-night-muted">
              <Dot />
              {startTile.eyebrow}
            </p>
            <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">
              <Link href={adobeAssessmentPath} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
                {startTile.title}
              </Link>
            </h3>
            <p className="mt-2 text-[0.9375rem] text-night-muted">{startTile.body}</p>
            <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium">
              {startTile.label}
              <ArrowRight className="size-4 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </li>
        </ul>
        <AdobePartnerPanel tone="night" className="mt-14" />
      </Container>
    </Section>
  );
}

/** The MiG differentiator: consent, labels, quality and documentation designed into Adobe work. */
export function AdobeGovernanceSection() {
  const { eyebrow, title, intro, items, link } = adobeHub.governance;
  return (
    <Section aria-labelledby="adobe-governance-title">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="adobe-governance-title" eyebrow={eyebrow} title={title} intro={intro} />
            <ArrowLink href={link.href} className="mt-8">
              {link.label}
            </ArrowLink>
          </div>
          {/* Not a sequence, so no step numbers. */}
          <ul className="reveal grid content-start gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:pt-2">
            {items.map((item) => (
              <li key={item.title} className="border-t border-line-strong pt-6">
                <h3 className="text-h3">{keepHyphenatedWords(item.title)}</h3>
                <p className="mt-3 text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/**
 * "Ways to work with us": four entry points, each grounded in a verified service type, each leading into
 * delivery. The assessment card is the suggested starting point (as the hub FAQ says), so its emphasis
 * carries a visible label rather than an unexplained heavy border. Each card is one link target: the action link is stretched over the card.
 * From sm, each card is a four-row subgrid (title, description, "Good when", action), so those parts line up
 * across a row even when one card's description is shorter.
 */
export function AdobeWaysToWorkSection() {
  const { eyebrow, title, intro, recommendedLabel, items } = adobeHub.waysToWork;
  return (
    <Section tone="deep" id="ways-to-work-with-us" aria-labelledby="ways-to-work-title">
      <Container>
        <SectionHeading id="ways-to-work-title" eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="reveal mt-14 grid gap-x-4 gap-y-8 sm:-mb-6 sm:grid-cols-2 sm:gap-y-0 xl:grid-cols-4">
          {items.map((e) => {
            const href = e.action === "assessment" ? adobeAssessmentPath : contactHref("adobe-services");
            const recommended = e.action === "assessment";
            return (
              <li
                key={e.id}
                className={cn(
                  "card-lift relative flex flex-col rounded-2xl border bg-surface p-6 transition-colors sm:row-span-4 sm:mb-6 sm:grid sm:grid-rows-subgrid sm:gap-y-0 sm:p-7",
                  recommended ? "border-ink" : "border-line hover:border-line-strong",
                )}
              >
                {recommended ? (
                  <p className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-paper sm:left-7">
                    <Dot />
                    {recommendedLabel}
                  </p>
                ) : null}
                <h3 className="text-h3">{e.title}</h3>
                <p className="mt-3 text-[0.9375rem] text-muted">{e.description}</p>
                <div className="mt-6 border-t border-line pt-4">
                  <p className="font-mono text-label uppercase text-muted">Good when</p>
                  <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink-soft">{e.goodWhen}</p>
                </div>
                <div className="mt-auto pt-6">
                  <ArrowLink href={href} className="after:absolute after:inset-0 after:rounded-2xl">
                    {e.actionLabel}
                  </ArrowLink>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
