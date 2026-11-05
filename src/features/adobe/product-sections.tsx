import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, IllustrativeLabel, Section, SectionHeading } from "@/components/ui/layout";
import { company } from "@/config/site";
import { contactHref } from "@/features/contact/links";
import { ArticleCard, type ArticleCardData } from "@/features/insights/article-card";
import { Breadcrumbs } from "@/features/services/sections";
import { adobeAssessmentPath, adobeProductPath, adobeServicesPath } from "@/lib/content/adobe";
import type { AdobeProduct, UseCase } from "@/lib/content/types";
import { cn } from "@/lib/utils";
import { AdobePartnerPanel } from "./partner-panel";
import { AdobeProductCard } from "./product-card";

/**
 * Sections for the Adobe application pages (/adobe-services/[product]).
 * Every list-driven section renders nothing when its content array is empty, and no layout assumes a fixed count.
 */

export type RelatedAdobeProduct = { product: AdobeProduct; why: string };
type Crumb = { label: string; href?: string };

/**
 * Large headings would otherwise break product names at their hyphen ("Real-" / "Time CDP").
 * Wraps each hyphenated word in a no-wrap span; plain strings pass through unchanged.
 */
function keepHyphenatedWords(text: string): ReactNode {
  const parts = text.split(/(\S+-\S+)/);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** Two columns, or three when the count fills rows of three evenly. */
const gridCols = (count: number) => (count % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2");

function DashList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2 text-[0.9375rem] text-ink-soft", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-ink" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- 1. Hero ---------- */

export function ProductHero({ product, crumbs, related }: { product: AdobeProduct; crumbs: Crumb[]; related: RelatedAdobeProduct[] }) {
  return (
    <section className="border-b border-line bg-paper pb-16 pt-10 sm:pb-20 lg:pb-24 lg:pt-14">
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid items-start gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <Eyebrow>{product.area}</Eyebrow>
            <h1 className="mt-6 text-h1 [overflow-wrap:break-word]">{product.hero.title}</h1>
            <p className="mt-7 max-w-[60ch] text-lead text-muted">{product.hero.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={contactHref("adobe-services", { product: product.slug })} arrow className="text-center">
                {/* Short label on small phones so the button stays on one line; display:none hides the other from the accessible name. */}
                <span className="sm:hidden">Discuss your project</span>
                <span className="hidden sm:inline">Discuss your {product.shortName} project</span>
              </ButtonLink>
              <ButtonLink href={contactHref("adobe-services", { product: product.slug, topic: "assessment" })} variant="outline">
                Request an assessment
              </ButtonLink>
            </div>
            <ArrowLink href={adobeAssessmentPath} className="mt-6 text-[0.9375rem]">
              What the platform assessment covers
            </ArrowLink>
          </div>
          <div className="min-w-0 lg:col-span-5">
            <AtAGlance product={product} related={related} />
          </div>
        </div>
      </Container>
    </section>
  );
}

function AtAGlance({ product, related }: { product: AdobeProduct; related: RelatedAdobeProduct[] }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-mono text-label uppercase text-muted">At a glance</h2>
      <p className="mt-5 text-h3 font-semibold">{product.name}</p>
      <p className="mt-3 text-[0.9375rem] text-muted">{product.description}</p>
      <dl className="mt-7 divide-y divide-line border-t border-line">
        {product.services.length > 0 ? (
          <div className="py-5">
            <dt className="font-mono text-label uppercase text-muted">Our services</dt>
            <dd className="mt-3">
              <ol className="space-y-1.5 text-[0.9375rem] text-ink-soft">
                {product.services.map((s, i) => (
                  <li key={s.title} className="flex items-baseline gap-3">
                    <span aria-hidden className="w-5 shrink-0 font-mono text-label text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">{s.title}</span>
                  </li>
                ))}
              </ol>
            </dd>
          </div>
        ) : null}
        {related.length > 0 ? (
          <div className="pt-5">
            <dt className="font-mono text-label uppercase text-muted">Works with</dt>
            <dd className="mt-1">
              <ul className="flex flex-wrap gap-x-6">
                {related.map(({ product: r }) => (
                  <li key={r.slug}>
                    <Link
                      href={adobeProductPath(r.slug)}
                      className="group inline-flex min-h-11 items-center gap-2 font-medium underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-signal"
                    >
                      {/* Short form keeps long names ("Adobe Real-Time Customer Data Platform") on one line. */}
                      Adobe {r.shortName}
                      <ArrowRight aria-hidden className="size-4 shrink-0 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}

/* ---------- 2. Overview ---------- */

export function ProductOverview({ product }: { product: AdobeProduct }) {
  const { overview } = product;
  return (
    <Section tone="deep" aria-labelledby="overview-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading id="overview-title" eyebrow="Product overview" title={keepHyphenatedWords(overview.heading)} intro={overview.intro} />
            <p className="mt-8 max-w-[52ch] border-l-2 border-line-strong pl-4 text-sm text-muted">
              This section describes Adobe&apos;s product, not a {company.name} offering. {product.name} is a trademark of Adobe Inc.
            </p>
          </div>
          {overview.features.length > 0 ? (
            /* Subgrid rows keep titles and bodies aligned across the two columns when a title wraps. */
            <ul className="-mb-10 grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-7">
              {overview.features.map((f) => (
                <li key={f.title} className="row-span-2 grid grid-rows-subgrid border-t border-line-strong pb-10 pt-6">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{f.body}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/* ---------- 3. Signals ---------- */

export function ProductSignals({ product }: { product: AdobeProduct }) {
  if (product.signals.length === 0) return null;
  return (
    <Section aria-labelledby="signals-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="signals-title"
              eyebrow="When teams reach out"
              title="Signs it's time for help"
              intro={`Situations that commonly prompt a conversation about ${product.shortName}.`}
            />
          </div>
          <div className="self-start rounded-2xl bg-paper-deep p-7 sm:p-9 lg:col-span-7">
            <ul className="space-y-5">
              {product.signals.map((s) => (
                <li key={s} className="flex gap-3.5 text-[1.0625rem] leading-snug">
                  <Dot className="mt-[0.5rem]" />
                  <span className="min-w-0">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- 4. Services ---------- */

export function ProductServices({ product }: { product: AdobeProduct }) {
  if (product.services.length === 0) return null;
  return (
    <Section tone="surface" id="services" className="scroll-mt-36" aria-labelledby="services-title">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title={keepHyphenatedWords(`How we help with ${product.shortName}`)}
          intro={`The service types we provide for ${product.name}, and what each one involves.`}
        />
        {/* Each item spans four subgrid rows (number, title, body, list) so they line up across a row. */}
        <ol className={cn("-mb-14 mt-14 grid gap-x-10 sm:grid-cols-2", gridCols(product.services.length))}>
          {product.services.map((s, i) => (
            <li key={s.title} className="row-span-4 grid grid-rows-subgrid content-start border-t border-line-strong pb-14 pt-6">
              <span aria-hidden className="font-mono text-label text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-h3">{s.title}</h3>
              <p className="mt-3 max-w-[60ch] text-muted">{s.body}</p>
              {s.items.length > 0 ? <DashList items={s.items} className="mt-5 max-w-[60ch]" /> : <span aria-hidden />}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/* ---------- 5. Scenarios ---------- */

function ScenarioCard({ scenario }: { scenario: UseCase }) {
  const rows: [string, string][] = [
    ["Situation", scenario.context],
    ["Approach", scenario.approach],
    ["Intended outcome", scenario.outcome],
  ];
  return (
    <li className="flex flex-col rounded-2xl border border-line bg-surface p-7 sm:p-9 lg:row-span-5 lg:mb-6 lg:grid lg:grid-rows-subgrid lg:gap-y-0">
      <IllustrativeLabel className="self-start justify-self-start" />
      <h3 className="mt-6 text-h3">{scenario.title}</h3>
      {/* display:contents lets each row join the card's subgrid at lg; the dl keeps its semantics. */}
      <dl className="mt-6 space-y-5 lg:contents">
        {rows.map(([term, text], i) => (
          <div key={term} className={cn("border-t border-line pt-4", i === 0 && "lg:mt-6")}>
            <dt className="font-mono text-label uppercase text-muted">{term}</dt>
            <dd className="mt-1.5 text-[0.9375rem] text-ink-soft">{text}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}

export function ProductScenarios({ product }: { product: AdobeProduct }) {
  if (product.scenarios.length === 0) return null;
  return (
    <Section aria-labelledby="scenarios-title">
      <Container>
        <SectionHeading
          id="scenarios-title"
          eyebrow="Illustrative scenarios"
          title={keepHyphenatedWords(`${product.shortName} in practice`)}
          intro="These are illustrative scenarios that show typical situations and approaches. They are not descriptions of specific client engagements."
        />
        <ul className={cn("mt-14 grid gap-6 lg:-mb-6 lg:gap-y-0", product.scenarios.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
          {product.scenarios.map((s) => (
            <ScenarioCard key={s.title} scenario={s} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ---------- 6. Related applications ---------- */

export function RelatedProducts({ product, related }: { product: AdobeProduct; related: RelatedAdobeProduct[] }) {
  if (related.length === 0) return null;
  return (
    <Section tone="surface" aria-labelledby="related-title">
      <Container>
        <SectionHeading
          id="related-title"
          eyebrow="Related applications"
          title={keepHyphenatedWords(`Applications that work alongside ${product.shortName}`)}
        />
        <ul className={cn("mt-12 grid gap-6 md:grid-cols-2", related.length % 3 === 0 && "lg:grid-cols-3")}>
          {related.map(({ product: r, why }) => (
            <li key={r.slug}>
              <AdobeProductCard product={r} note={why} className="bg-paper" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ---------- 7. Related insights ---------- */

export function RelatedInsights({ articles }: { articles: ArticleCardData[] }) {
  if (articles.length === 0) return null;
  const allInsights = (
    <ArrowLink href="/insights" className="shrink-0 self-start sm:self-auto">
      All insights
    </ArrowLink>
  );

  // One or two articles: heading on the left, articles on the right, so a single card isn't stranded in a 3-column grid.
  if (articles.length < 3) {
    return (
      <Section tone="deep" aria-labelledby="insights-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:col-span-4">
              <SectionHeading id="insights-title" eyebrow="Insights" title="Related reading" />
              {allInsights}
            </div>
            <ul className={cn("grid gap-x-8 gap-y-12 lg:col-span-8", articles.length === 2 ? "md:grid-cols-2" : "max-w-2xl")}>
              {articles.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="deep" aria-labelledby="insights-title">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="insights-title" eyebrow="Insights" title="Related reading" />
          {allInsights}
        </div>
        <ul className={cn("mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3", articles.length === 4 && "lg:grid-cols-2")}>
          {articles.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ---------- 9. Other applications + partner statement ---------- */

export function OtherProducts({ others }: { others: AdobeProduct[] }) {
  return (
    <Section tone="deep" spacing="compact" aria-labelledby="other-title">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="other-title" className="font-mono text-label uppercase text-muted">
            Other Adobe applications
          </h2>
          <ArrowLink href={adobeServicesPath} className="self-start sm:self-auto">
            Adobe Services overview
          </ArrowLink>
        </div>
        {others.length > 0 ? (
          <ul className="mt-6 grid border-t border-ink sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug} className="border-b border-line">
                <Link
                  href={adobeProductPath(o.slug)}
                  className="group flex min-h-16 items-center justify-between gap-4 py-4 transition-colors hover:text-ink"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-label uppercase text-muted">{o.area}</span>
                    <span className="mt-1.5 block font-medium leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4">
                      {o.name}
                    </span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <AdobePartnerPanel className="mt-14" />
      </Container>
    </Section>
  );
}
