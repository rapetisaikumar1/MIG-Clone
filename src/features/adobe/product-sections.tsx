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
import { keepHyphenatedWords } from "./keep-hyphenated";
import { AdobeProductCard } from "./product-card";

/**
 * Sections for the Adobe application pages (/adobe-services/[product]).
 * Every list-driven section renders nothing when its content array is empty, and no layout assumes a fixed count.
 *
 * Motion: section headings and content blocks below the hero carry the shared `reveal` utility (a transform-only,
 * scroll-driven rise defined in globals.css, motion-safe), and linked cards carry `card-lift`. Nothing in the
 * hero moves, and no effect changes the opacity of text.
 */

export type RelatedAdobeProduct = { product: AdobeProduct; why: string };
type Crumb = { label: string; href?: string };

/** Two columns, or three when the count fills rows of three evenly. */
const gridCols = (count: number) => (count % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2");

/** In-page anchor for one service entry, so the hero's "At a glance" list can link to it. */
const serviceId = (title: string) =>
  `service-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

/**
 * Two-column grids leave an odd last item alone with an empty slot beside it; let it span the row instead.
 * `from` is the breakpoint where the grid becomes two columns; `resetAtLg` undoes the span where it switches to
 * three columns. Class strings stay literal so Tailwind can see them.
 */
const spanOddLast = (resetAtLg: boolean, from: "sm" | "md" = "md") =>
  cn(
    from === "sm" ? "sm:[&>li:last-child:nth-child(odd)]:col-span-2" : "md:[&>li:last-child:nth-child(odd)]:col-span-2",
    resetAtLg && "lg:[&>li:last-child:nth-child(odd)]:col-span-1",
  );

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

export function ProductHero({ product, crumbs }: { product: AdobeProduct; crumbs: Crumb[] }) {
  return (
    <section className="border-b border-line bg-paper pb-16 pt-10 sm:pb-20 lg:pb-24 lg:pt-14">
      <Container>
        <Breadcrumbs items={crumbs} />
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-7">
            <Eyebrow>{product.area}</Eyebrow>
            <h1 className="mt-6 text-h1 [overflow-wrap:break-word]">{product.hero.title}</h1>
            <p className="mt-7 max-w-[60ch] text-lead text-muted">{keepHyphenatedWords(product.hero.lead)}</p>
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
          </div>
          <div className="min-w-0 lg:col-span-5">
            <AtAGlance product={product} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * The hero's summary card: Adobe's one-line description, then (from lg, where it sits beside the hero) an index
 * of our services that jumps to each entry in #services. Below lg the Services section follows closely enough
 * that the index would only repeat it. Related applications are not listed here; they have their own section.
 */
function AtAGlance({ product }: { product: AdobeProduct }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
      <h2 className="font-mono text-label uppercase text-muted">At a glance</h2>
      <p className="mt-5 text-h3 font-semibold">{keepHyphenatedWords(product.name)}</p>
      <p className="mt-3 text-[0.9375rem] text-muted">{product.description}</p>
      {product.services.length > 0 ? (
        <nav aria-label={`${product.shortName} services`} className="mt-7 hidden border-t border-line pt-5 lg:block">
          <p className="font-mono text-label uppercase text-muted">Our services</p>
          <ol className="mt-2 divide-y divide-line">
            {product.services.map((s, i) => (
              <li key={s.title}>
                <a
                  href={`#${serviceId(s.title)}`}
                  className="group flex min-h-11 items-center gap-3 py-1.5 text-[0.9375rem] text-ink-soft transition-colors hover:text-ink"
                >
                  <span aria-hidden className="w-5 shrink-0 font-mono text-label text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{s.title}</span>
                  <ArrowRight aria-hidden className="size-3.5 shrink-0 rotate-90 text-muted transition-colors group-hover:text-signal" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <div className="mt-6 border-t border-line pt-5">
        {/* The assessment is presented as the first phase of delivery (messaging guide §4). */}
        <p className="text-sm text-muted">Not sure where to start? We begin with an assessment, then implement the priorities with you.</p>
        {/* One size down in the narrow lg column, so the label stays on one line with its arrow. */}
        <ArrowLink href={adobeAssessmentPath} className="text-[0.9375rem] lg:max-xl:text-sm">
          What the platform assessment covers
        </ArrowLink>
      </div>
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
          {/* Sticky at lg so the heading stays beside a feature list that runs longer than it. */}
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <SectionHeading
              className="reveal"
              id="overview-title"
              eyebrow="Product overview"
              title={keepHyphenatedWords(overview.heading)}
              intro={overview.intro}
            />
            <p className="mt-8 max-w-[52ch] border-l-2 border-line-strong pl-4 text-sm text-muted">
              Describes Adobe&apos;s software, not a {company.name} offering.
            </p>
          </div>
          {overview.features.length > 0 ? (
            /* From lg, subgrid rows keep titles and bodies aligned across the two columns when a title wraps;
               below lg the columns are too narrow for that to help, so each item flows on its own. */
            <ul className={cn("-mb-10 grid content-start gap-x-10 sm:grid-cols-2 lg:col-span-7", spanOddLast(false, "sm"))}>
              {overview.features.map((f) => (
                <li key={f.title} className="reveal border-t border-line-strong pb-10 pt-6 lg:row-span-2 lg:grid lg:grid-rows-subgrid">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight">{keepHyphenatedWords(f.title)}</h3>
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
          {/* Sticky at lg like the overview heading, so the heading column doesn't sit empty beside a longer list. */}
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <SectionHeading
              className="reveal"
              id="signals-title"
              eyebrow="When teams reach out"
              title="Problems we solve"
              intro={keepHyphenatedWords(`Common reasons teams bring us in for ${product.shortName} work, whether the platform is new or already live.`)}
            />
          </div>
          <div className="reveal self-start rounded-2xl bg-paper-deep p-7 sm:p-9 lg:col-span-7">
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
    <Section tone="surface" id="services" aria-labelledby="services-title">
      <Container>
        <SectionHeading className="reveal" id="services-title" eyebrow="Services" title={keepHyphenatedWords(`What we deliver for ${product.shortName}`)} />
        {/* From lg, each item spans four subgrid rows (number, title, body, list) so they line up across a row.
            Below lg the bodies differ too much in length for that, so items flow naturally. */}
        <ol
          className={cn(
            "-mb-14 mt-14 grid gap-x-10 sm:grid-cols-2",
            gridCols(product.services.length),
            spanOddLast(product.services.length % 3 === 0, "sm"),
          )}
        >
          {product.services.map((s, i) => (
            <li
              key={s.title}
              id={serviceId(s.title)}
              className="reveal content-start border-t border-line-strong pb-14 pt-6 lg:row-span-4 lg:grid lg:grid-rows-subgrid"
            >
              <span aria-hidden className="block font-mono text-label text-muted">
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
    <li className="reveal flex flex-col rounded-2xl border border-line bg-surface p-7 sm:p-9 lg:row-span-5 lg:mb-6 lg:grid lg:grid-rows-subgrid lg:gap-y-0">
      <IllustrativeLabel className="self-start justify-self-start" />
      <h3 className="mt-6 text-h3">{keepHyphenatedWords(scenario.title)}</h3>
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
    <Section tone="deep" aria-labelledby="scenarios-title">
      <Container>
        <SectionHeading
          className="reveal"
          id="scenarios-title"
          eyebrow="Practical applications"
          title={keepHyphenatedWords(`${product.shortName} in practice`)}
          // Same eyebrow and disclaimer as the use-case sections on the service pages; the title stays product-specific.
          intro="These are illustrative scenarios that show typical situations and approaches. They are not descriptions of specific client projects."
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
  const threeUp = related.length % 3 === 0;
  return (
    <Section tone="surface" aria-labelledby="related-title">
      <Container>
        <SectionHeading
          className="reveal"
          id="related-title"
          eyebrow="Related applications"
          title={keepHyphenatedWords(`Applications that work alongside ${product.shortName}`)}
        />
        {/* From md, each card is a four-row subgrid (area, name, note, link), so notes and links line up across a row
            even when one product name wraps. Row gaps become margins so they don't open up inside the subgrid. */}
        <ul
          className={cn(
            "reveal mt-12 grid gap-6 md:-mb-6 md:gap-y-0",
            // Rows of three stay one column until lg, so tablets don't show two cards plus one stretched card.
            threeUp ? "lg:grid-cols-3" : "md:grid-cols-2",
            !threeUp && spanOddLast(false),
          )}
        >
          {related.map(({ product: r, why }) => (
            <li key={r.slug} className="md:row-span-4 md:mb-6 md:grid md:grid-rows-subgrid">
              {/* "Adobe" + the short name keeps every title on one line, so a long full name ("Adobe Real-Time Customer
                  Data Platform") doesn't open a blank line under its neighbours' titles in the subgrid row. */}
              <AdobeProductCard
                product={{ ...r, name: `Adobe ${r.shortName}` }}
                note={why}
                className="bg-paper md:row-span-4 md:grid md:grid-rows-subgrid md:gap-y-0"
              />
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
              <SectionHeading className="reveal" id="insights-title" eyebrow="Insights" title="Related reading" />
              {allInsights}
            </div>
            {/* The list spans the full eight columns so its edges line up with the container. */}
            <ul className={cn("reveal grid gap-x-8 gap-y-12 lg:col-span-8", articles.length === 2 && "md:grid-cols-2")}>
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

  const threeUp = articles.length !== 4;
  return (
    <Section tone="deep" aria-labelledby="insights-title">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading className="reveal" id="insights-title" eyebrow="Insights" title="Related reading" />
          {allInsights}
        </div>
        <ul className={cn("reveal mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2", threeUp && "lg:grid-cols-3", spanOddLast(threeUp))}>
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

/* ---------- 8. Remaining applications + partner statement ---------- */

/**
 * Compact index of the applications not already shown on the page (the page filters out itself and its related
 * applications), then the partner statement. `tone` lets the page keep section backgrounds alternating.
 * Four entries sit in one row of four at lg rather than three plus a lone fourth.
 */
export function OtherProducts({ others, tone = "paper" }: { others: AdobeProduct[]; tone?: "paper" | "deep" }) {
  return (
    <Section tone={tone} spacing="compact" aria-labelledby="other-title">
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
          <ul
            className={cn(
              "mt-6 grid border-t border-ink sm:grid-cols-2 sm:gap-x-10",
              others.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3",
              spanOddLast(others.length % 4 !== 0, "sm"),
            )}
          >
            {others.map((o) => (
              <li key={o.slug} className="border-b border-line">
                <Link
                  href={adobeProductPath(o.slug)}
                  className={cn(
                    "group -mx-3 flex min-h-16 items-center justify-between gap-4 rounded-lg px-3 py-4 transition-colors",
                    tone === "deep" ? "hover:bg-paper" : "hover:bg-paper-deep",
                  )}
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
