import { Fragment } from "react";
import { ArrowDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container, Dot } from "@/components/ui/layout";
import { HeroVisual } from "@/components/graphics/hero-visual";
import { hero } from "@/content/home";
import { HeroBackground } from "./hero-background";

/** "Responsible AI. Trusted data. …" → one entry per sentence, each ending in its full stop. */
const sentences = hero.title.split(/(?<=\.)\s+/);

/**
 * Home hero, on a dark stage like the MapleRecord banner. Each sentence of the headline starts its own line (a long one may wrap, but never joins
 * another), and its full stop takes the logo's red dot. The delivery diagram sits to the right
 * on desktop, beside its caption on tablet, and under the actions on phones.
 */
export function HeroBanner() {
  return (
    <section className="on-night relative isolate overflow-hidden border-b border-night-line bg-night text-night-text">
      <HeroBackground />
      <Container className="grid gap-12 pb-16 pt-12 sm:pb-20 sm:pt-16 md:gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:items-start lg:gap-16 lg:pb-24 lg:pt-20 xl:pt-24">
        <div>
          {/* From sm up; on phones the lead already states the company type and names each specialization.
              Every item carries its own marker (the first in logo red), so a wrapped line still reads as a list.
              One row where it fits (sm to md); in the narrower two-column hero (lg+) a 2×2 grid, so it never wraps 3 + 1. */}
          <ul
            aria-label="Our specializations"
            className="hidden flex-wrap items-center gap-x-5 gap-y-2 font-mono text-label uppercase text-night-muted sm:flex lg:grid lg:grid-cols-[repeat(2,max-content)] lg:gap-x-8"
          >
            {hero.eyebrow.map((item, i) => (
              <li key={item} className="flex items-center gap-2.5">
                {i === 0 ? <Dot className="size-1.5" /> : <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-night-muted/60" />}
                {item}
              </li>
            ))}
          </ul>

          <h1 className="text-[clamp(2.75rem,1.6rem+3.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.042em] text-balance sm:mt-7">
            {sentences.map((s, i) => (
              <Fragment key={s}>
                {i > 0 ? " " : null}
                <span className="block">
                  {s.slice(0, -1)}
                  <span className="text-logo-red">{s.slice(-1)}</span>
                </span>
              </Fragment>
            ))}
          </h1>

          <p className="mt-7 max-w-[56ch] text-lead text-night-muted">{hero.lead}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href="/contact#inquiry"
              arrow
              className="shadow-[0_10px_24px_-14px_rgb(208_0_0/0.7)] hover:shadow-[0_16px_30px_-14px_rgb(208_0_0/0.8)] active:shadow-[0_6px_14px_-10px_rgb(208_0_0/0.7)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
            >
              Talk to an Expert
            </ButtonLink>
            <ButtonLink
              href="#expertise"
              variant="outline-night"
              className="bg-white/[0.03] backdrop-blur-sm motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
            >
              Explore Our Expertise
              <ArrowDown
                aria-hidden
                className="size-4 text-night-muted transition-[transform,color] duration-200 ease-out group-hover:text-night-text motion-safe:group-hover:translate-y-0.5"
              />
            </ButtonLink>
          </div>
        </div>

        <figure className="w-full max-w-[22rem] md:max-lg:grid md:max-lg:max-w-none md:max-lg:grid-cols-[22rem_minmax(0,1fr)] md:max-lg:items-center md:max-lg:gap-10 lg:max-w-none">
          <div className="relative @container">
            {/* Faint contour rings echo the delivery loop out into the background (desktop only). */}
            <svg
              aria-hidden
              viewBox="-100 -100 200 200"
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 hidden w-[230%] -translate-x-1/2 -translate-y-1/2 overflow-visible [mask-image:radial-gradient(closest-side,#000_42%,transparent_80%)] lg:block"
            >
              <g fill="none" className="stroke-night-text/15" strokeWidth="0.12">
                <circle r="50" />
                <circle r="62" />
                <circle r="76" />
              </g>
            </svg>
            <HeroVisual />
          </div>
          <figcaption className="mt-6 border-t border-night-line pt-4 md:max-lg:mt-0">
            <span className="flex items-center gap-2.5 font-mono text-label uppercase text-night-muted">
              <Dot className="size-1.5" />
              {hero.figure.label}
            </span>
            <span className="mt-2 block max-w-[46ch] text-[0.9375rem] leading-snug text-night-text/85">{hero.figure.caption}</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
