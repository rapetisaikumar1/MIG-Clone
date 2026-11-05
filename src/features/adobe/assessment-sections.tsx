import Link from "next/link";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, Section, SectionHeading } from "@/components/ui/layout";
import { company } from "@/config/site";
import type { AdobeAssessmentContent } from "@/content/adobe/assessment";
import { AdobePartnerPanel } from "@/features/adobe/partner-panel";
import { contactHref } from "@/features/contact/links";
import { Breadcrumbs } from "@/features/services/sections";
import { adobeProductPath, adobeServicesPath } from "@/lib/content/adobe";
import type { AdobeProduct } from "@/lib/content/types";
import { cn } from "@/lib/utils";

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
            <Eyebrow>{content.hero.eyebrow}</Eyebrow>
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
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {content.summary.items.map((item) => (
                <div key={item.label} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
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
        <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {s.items.map((item) => (
            <li key={item.title} className="border-t border-line-strong pt-6">
              <Dot />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-muted">{item.body}</p>
            </li>
          ))}
          <li className="border-t border-ink pt-6">
            <p className="font-mono text-label uppercase text-muted">Something else?</p>
            <p className="mt-5 text-lg font-semibold tracking-tight">Tell us what you&apos;re trying to solve.</p>
            <ArrowLink href={contactHref("adobe-services")} className="mt-3">
              Describe your setup
            </ArrowLink>
          </li>
        </ul>
      </Container>
    </Section>
  );
}

export function ReviewSection({ content, products }: { content: Content; products: AdobeProduct[] }) {
  const r = content.review;
  return (
    <Section id="what-we-review" aria-labelledby="review-title">
      <Container>
        <SectionHeading id="review-title" eyebrow={r.eyebrow} title={r.title} intro={r.intro} />

        <nav aria-label="Jump to an Adobe application" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`#review-${p.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  {p.shortName}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#review-cross-cutting"
                className="inline-flex min-h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper transition-colors hover:bg-ink-soft"
              >
                {r.crossCutting.title}
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const areas = r.byProduct[p.slug];
            return (
              <li key={p.slug} id={`review-${p.slug}`} className="flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
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
          {/* Fills the slot beside the seventh card in the two-column layout; from lg the cross-cutting card does. */}
          <li className="flex flex-col rounded-2xl border border-dashed border-line-strong p-6 sm:p-7 lg:hidden">
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
            className="on-night rounded-2xl bg-night p-6 text-night-text sm:col-span-2 sm:p-7"
          >
            <p className="font-mono text-label uppercase text-night-muted">Cross-cutting</p>
            <h3 id="cross-cutting-title" className="mt-3 text-lg font-semibold leading-snug tracking-tight">
              {r.crossCutting.title}
            </h3>
            <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-night-muted">{r.crossCutting.intro}</p>
            <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
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
          </li>
        </ul>
        <p className="mt-8 max-w-3xl text-sm text-muted">
          Adobe and the Adobe product names above are trademarks of Adobe Inc. {company.name} is an independent consultancy.
        </p>
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
        <ol className="relative mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
          <span aria-hidden className="absolute left-0 right-0 top-[1.375rem] hidden h-px bg-night-line xl:block" />
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
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {d.items.map((item) => (
              <li key={item.title} className="relative rounded-2xl border border-line bg-surface p-6 pr-12">
                <svg aria-hidden viewBox="0 0 20 24" className="absolute right-5 top-6 h-6 w-5 text-line-strong">
                  <path d="M1 1 H13 L19 7 V23 H1 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13 1 V7 H19" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
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
          <ol className="border-t border-ink lg:col-span-7">
            {r.items.map((item, i) => (
              <li key={item.title} className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3rem_11rem_1fr] sm:gap-6">
                <span aria-hidden className="font-mono text-label text-muted sm:pt-1">
                  {pad(i + 1)}
                </span>
                <h3 className="text-lg font-semibold leading-snug tracking-tight">{item.title}</h3>
                <p className="text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}

/** Renders nothing when the partner statement is switched off (company.adobePartner.verified). */
export function AssessmentPartnerSection() {
  if (!company.adobePartner.verified) return null;
  return (
    <Section tone="deep" spacing="compact" aria-label="Adobe partnership">
      <Container>
        <AdobePartnerPanel />
      </Container>
    </Section>
  );
}
