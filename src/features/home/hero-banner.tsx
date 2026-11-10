import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container, Dot } from "@/components/ui/layout";
import { hero } from "@/content/home";
import { CapabilityMap } from "./hero/capability-map";
import { HeroBackground } from "./hero-background";

/**
 * The headline as its two sentences, each starting on its own line. The second keeps its last two words and full
 * stop together (no orphan); the final stop is in the logo's red.
 */
const sentenceBreak = hero.title.indexOf(". ") + 1;
const titleFirst = hero.title.slice(0, sentenceBreak);
const titleSecond = hero.title.slice(sentenceBreak + 1);
const tailStart = titleSecond.lastIndexOf(" ", titleSecond.lastIndexOf(" ") - 1);
const titleHead = titleSecond.slice(0, tailStart + 1);
const titleTail = titleSecond.slice(tailStart + 1, -1);

/**
 * Home hero on the dark stage. Left: who we serve and what we deliver (eyebrow, headline naming the four core
 * areas, lead with links to our two products, the two actions). Right (below on phones and tablets): the
 * capability map, the four areas as one governed stack whose labels link to the core service pages. All text is
 * server-rendered, so the headline paints immediately; the backdrop and the map's motion are decorative and stop under
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
        {/* A size container, so the headline scales with the column it sits in. Top-aligned, so the space under the
            header stays the same whatever the headline's line count; the map is centered beside it. */}
        <div className="@container lg:self-start">
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
            className="mt-6 font-display text-[clamp(2rem,10.2cqi,4rem)] font-semibold leading-[1.06] tracking-[-0.032em] sm:mt-7"
          >
            {/* Sized so "and AI governance." always fits one line: the first sentence breaks into two balanced lines. */}
            <span className="block text-balance">{titleFirst}</span>{" "}
            <span className="block">
              {titleHead}
              <span className="whitespace-nowrap">
                {titleTail}
                <span className="text-logo-red">.</span>
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-[54ch] text-lead text-night-muted sm:mt-7">
            {hero.lead.before}
            {hero.lead.links.map((p, i) => (
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
            {hero.lead.after}
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

        <CapabilityMap className="w-full max-w-[36rem] lg:max-w-none" />
      </Container>
    </section>
  );
}
