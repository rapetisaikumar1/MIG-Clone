import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import type { AdobeAssessmentContent } from "@/content/adobe/assessment";
import { AdobePartnerPanel } from "@/features/adobe/partner-panel";
import { contactHref } from "@/features/contact/links";
import { Breadcrumbs } from "@/features/services/sections";
import { adobeProductPath, adobeServicesPath } from "@/lib/content/adobe";
import type { AdobeProduct } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import motion from "./motion.module.css";

type Content = AdobeAssessmentContent;

const pad = (n: number) => String(n).padStart(2, "0");

/** Short hairline used as a list bullet across the site's sections. */
function Rule({ night = false }: { night?: boolean }) {
  return <span aria-hidden className={cn("mt-[0.7rem] h-px w-3 shrink-0", night ? "bg-night-text" : "bg-ink")} />;
}

export function AssessmentHero({ content, breadcrumbs }: { content: Content; breadcrumbs: { label: string; href?: string }[] }) {
  return (
    <section aria-labelledby="assessment-title" className="relative overflow-hidden border-b border-line bg-paper pb-16 pt-10 sm:pb-20 lg:pb-24 lg:pt-14">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {/* A multi-term eyebrow can wrap on phones: as on the service heroes, keep the dot on the first line and
                each separator with the term before it, so a wrapped line never starts with "·". */}
            <Eyebrow className="items-start [&>span:first-child]:mt-[0.2rem]">
              <span>{content.hero.eyebrow.replaceAll(" · ", "\u00a0· ")}</span>
            </Eyebrow>
            <h1 id="assessment-title" className="mt-6 text-h1">
              {content.hero.title}
            </h1>
            <p className="mt-7 max-w-[60ch] text-lead text-muted">{content.hero.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref("adobe-services", { topic: "assessment" })} arrow>
                Request an assessment
              </ButtonLink>
              <ButtonLink href={adobeServicesPath} variant="outline">
                See all Adobe services
              </ButtonLink>
            </div>
          </div>
          <aside aria-labelledby="assessment-summary-title" className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:col-span-5">
            <h2 id="assessment-summary-title" className="flex items-center gap-2.5 font-mono text-label uppercase text-muted">
              <Dot />
              {content.summary.title}
            </h2>
            {/* Label beside value, except in the narrow lg column (1024–1279), where a 7rem label column would
                squeeze each value to two or three words a line. */}
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {content.summary.items.map((item) => (
                <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4 lg:max-xl:grid-cols-1 lg:max-xl:gap-1">
                  <dt className="pt-0.5 font-mono text-label uppercase text-muted">{item.label}</dt>
                  <dd className="font-medium leading-snug">{item.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-muted">{content.summary.note}</p>
          </aside>
        </div>
      </Container>
    </section>
  );
}

export function SituationsSection({ content }: { content: Content }) {
  const s = content.situations;
  return (
    <Section tone="surface" aria-labelledby="situations-title">
      <Container>
        <SectionHeading id="situations-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
        <ul className="reveal mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item) => (
            <li key={item.title} className="border-t border-line-strong pt-6">
              <h3 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight">
                <Dot className="-translate-y-0.5" />
                {item.title}
              </h3>
              <p className="mt-2 text-muted">{item.body}</p>
            </li>
          ))}
          <li className="border-t border-ink pt-6">
            <p className="font-mono text-label uppercase text-muted">Something else?</p>
            <p className="mt-2 text-lg font-semibold tracking-tight">Tell us what you&apos;re trying to solve.</p>
            <ArrowLink href={contactHref("adobe-services")} className="mt-3">
              Describe your setup
            </ArrowLink>
          </li>
        </ul>
      </Container>
    </Section>
  );
}

/** Card chrome for the review grid; from sm, subgrid rows keep titles, lists and links aligned across a row. */
const reviewCard = "flex flex-col rounded-2xl p-6 sm:row-span-4 sm:mb-5 sm:grid sm:grid-rows-subgrid sm:gap-y-0 sm:p-7";

/**
 * Per-application review areas, then the cross-cutting areas at full width. The seven application cards plus
 * the "another application" card fill even rows: 2×4 from sm, and 3 + 3 + (1 + the wide "another" card) from lg.
 * The partner statement closes the section and covers the Adobe trademark notice.
 */
export function ReviewSection({ content, products }: { content: Content; products: AdobeProduct[] }) {
  const r = content.review;
  const chip =
    "inline-flex min-h-11 items-center gap-2.5 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-surface";
  return (
    <Section id="what-we-review" aria-labelledby="review-title">
      <Container>
        <SectionHeading id="review-title" eyebrow={r.eyebrow} title={r.title} intro={r.intro} />

        {/* Plain anchors, not next/link: a real hash navigation is what makes the destination card match :target. */}
        <nav aria-label="Jump to an Adobe application" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {products.map((p) => (
              <li key={p.slug}>
                <a href={`#review-${p.slug}`} className={chip}>
                  {p.shortName}
                </a>
              </li>
            ))}
            <li>
              {/* Same outline as its siblings (these are links, not a selected filter); the dot marks the shared area. */}
              <a href="#review-cross-cutting" className={chip}>
                <Dot />
                {r.crossCutting.title}
              </a>
            </li>
          </ul>
        </nav>

        <ul className="reveal mt-12 grid gap-5 sm:-mb-5 sm:grid-cols-2 sm:gap-y-0 lg:grid-cols-3">
          {products.map((p) => {
            const areas = r.byProduct[p.slug];
            return (
              <li key={p.slug} id={`review-${p.slug}`} className={cn(reviewCard, motion.target, "border border-line bg-surface")}>
                <p className="font-mono text-label uppercase text-muted">{p.area}</p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">{p.name}</h3>
                <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-soft">
                  {areas.map((a) => (
                    <li key={a} className="flex gap-3">
                      <Rule />
                      {a}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <ArrowLink href={adobeProductPath(p.slug)} className="text-[0.9375rem]">
                    {p.shortName} services
                  </ArrowLink>
                </div>
              </li>
            );
          })}
          <li className={cn(reviewCard, "border border-dashed border-line-strong lg:col-span-2")}>
            <p className="font-mono text-label uppercase text-muted">Other applications</p>
            <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight">{r.other.title}</h3>
            <p className="mt-2 text-[0.9375rem] text-muted">{r.other.body}</p>
            <div className="mt-auto pt-5">
              <ArrowLink href={contactHref("adobe-services")} className="text-[0.9375rem]">
                {r.other.label}
              </ArrowLink>
            </div>
          </li>
          <li
            id="review-cross-cutting"
            className={cn(motion.target, "on-night col-span-full rounded-2xl bg-night p-6 text-night-text sm:mb-5 sm:p-8 lg:p-10")}
          >
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-label uppercase text-night-muted">Cross-cutting</p>
                <h3 id="cross-cutting-title" className="mt-3 text-h3">
                  {r.crossCutting.title}
                </h3>
                <p className="mt-3 max-w-[60ch] text-[0.9375rem] text-night-muted">{r.crossCutting.intro}</p>
              </div>
              <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
                {r.crossCutting.items.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <Rule night />
                    <span>
                      <span className="block font-medium">{item.title}</span>
                      <span className="mt-1 block text-[0.9375rem] text-night-muted">{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
        <AdobePartnerPanel className="mt-16" />
      </Container>
    </Section>
  );
}

export function StepsSection({ content }: { content: Content }) {
  const s = content.steps;
  return (
    <Section tone="night" aria-labelledby="steps-title">
      <Container>
        <SectionHeading tone="night" id="steps-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
        <ol className="reveal relative mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
          {/* Hairline track, with a lighter line drawn over it as the steps scroll into view (motion.module.css). */}
          <span aria-hidden className="absolute left-0 right-0 top-[1.375rem] hidden h-px bg-night-line xl:block" />
          <span aria-hidden className={cn(motion.connector, "absolute left-0 right-0 top-[1.375rem] hidden h-px bg-night-muted/70 xl:block")} />
          {s.items.map((step, i) => (
            <li key={step.title} className="relative flex flex-col">
              <span
                aria-hidden
                className={cn(
                  "relative z-10 inline-flex size-11 items-center justify-center rounded-full font-mono text-sm",
                  i === 0 ? "bg-signal text-white" : "bg-night-raised text-night-text ring-1 ring-night-line",
                )}
              >
                {pad(i + 1)}
              </span>
              <h3 className="mt-6 text-h3">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mb-6 mt-3 text-night-muted">{step.activities}</p>
              {/* mt-auto keeps the Output rows aligned across a row when titles wrap differently. */}
              <div className="mt-auto border-t border-night-line pt-4">
                <p className="font-mono text-label uppercase text-night-muted">Output</p>
                <p className="mt-2 font-medium leading-snug">{step.output}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function AssessmentDeliverables({ content }: { content: Content }) {
  const d = content.deliverables;
  return (
    <Section tone="deep" aria-labelledby="deliverables-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="deliverables-title" eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
          </div>
          <ul className="reveal grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {d.items.map((item) => (
              <li key={item.title} className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export function RequirementsSection({ content }: { content: Content }) {
  const r = content.requirements;
  return (
    <Section tone="surface" aria-labelledby="requirements-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="requirements-title" eyebrow={r.eyebrow} title={r.title} intro={r.intro} />
          </div>
          {/* Not a sequence, so no step numbers. */}
          <ul className="border-t border-ink lg:col-span-7">
            {r.items.map((item) => (
              <li key={item.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <h3 className="text-lg font-semibold leading-snug tracking-tight">{item.title}</h3>
                <p className="text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
