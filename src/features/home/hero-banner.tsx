import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Dot } from "@/components/ui/layout";
import { hero } from "@/content/home";
import { CapabilityMap } from "./hero/capability-map";
import { HeroBackground } from "./hero-background";

/** The headline with its last word and full stop kept together (no orphan), the stop in the logo's red. */
const lastSpace = hero.title.lastIndexOf(" ");
const titleHead = hero.title.slice(0, lastSpace + 1);
const titleTail = hero.title.slice(lastSpace + 1, -1);

/**
 * Home hero on the dark stage. Left: who we are for and what we deliver (eyebrow, headline, lead with links to
 * our two products, the two actions). Right (below on phones and tablets): the capability map, the platform we
 * build as a layered illustration whose four labels link to the core service pages. All text is server-rendered,
 * so the headline paints immediately; the backdrop and the map's motion are decorative and stop under
 * prefers-reduced-motion.
 */
export function HeroBanner() {
  return (
    <section
      aria-labelledby="hero-title"
      className="on-night relative isolate overflow-hidden border-b border-night-line bg-night text-night-text"
    >
      <HeroBackground />
      <Container className="grid gap-14 pb-14 pt-10 sm:pt-12 md:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:pb-20 lg:pt-14 xl:gap-16">
        <div>
          <ul
            aria-label="About Maverick InnoGarage"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-label uppercase text-night-muted"
          >
            {hero.eyebrow.map((item, i) => (
              <li key={item} className="flex items-center gap-2.5">
                {/* Each item carries its own marker, so a wrapped line still reads as a list. */}
                {i === 0 ? <Dot className="size-1.5" /> : <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-night-muted/60" />}
                {item}
              </li>
            ))}
          </ul>

          <h1
            id="hero-title"
            className="mt-6 max-w-[15ch] text-balance font-display text-[clamp(2.5rem,1.45rem+4.4vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.032em] sm:mt-7 lg:text-[clamp(3rem,0.9rem+3.4vw,4.375rem)]"
          >
            {titleHead}
            <span className="whitespace-nowrap">
              {titleTail}
              <span className="text-logo-red">.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-lead text-night-muted sm:mt-7">
            {hero.lead} {hero.products.before}
            {hero.products.links.map((p, i) => (
              <span key={p.href}>
                {i > 0 ? " and " : null}
                <Link
                  href={p.href}
                  className="font-medium text-night-text underline decoration-night-line decoration-1 underline-offset-4 transition-colors hover:decoration-logo-red"
                >
                  {p.label}
                </Link>
              </span>
            ))}
            .
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href={hero.primaryCta.href}
              arrow
              className="shadow-[0_10px_24px_-14px_rgb(200_0_0/0.7)] hover:shadow-[0_16px_30px_-14px_rgb(200_0_0/0.8)] active:shadow-[0_6px_14px_-10px_rgb(200_0_0/0.7)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="outline-night"
              className="bg-white/[0.03] backdrop-blur-sm motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <CapabilityMap className="w-full max-w-[40rem] lg:max-w-none" />
      </Container>
    </section>
  );
}
