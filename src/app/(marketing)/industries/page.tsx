import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow } from "@/components/ui/layout";
import { industries, type IndustryApplication, type IndustryArea } from "@/content/industries";
import { aiGovernanceNav, mapleRecordPath, pillarsNav } from "@/config/navigation";
import { CtaBand } from "@/features/contact/cta-band";
import { Breadcrumbs } from "@/features/services/sections";
import { adobeProductPath, getAdobeProduct } from "@/lib/content/adobe";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Our focus in healthcare, financial services, retail, telecom, government, media, manufacturing and software, and how our data, engineering, Adobe and design practices apply.",
  path: "/industries",
});

/** Each area links to its pillar page (from the navigation config, so slugs stay in one place). */
const pillarHref = (label: string) => pillarsNav.find((p) => p.label === label)?.href ?? "/services";
const areaHref: Record<IndustryArea, string> = {
  "Data & Analytics": pillarHref("Data & Analytics"),
  "Engineering & Technology": pillarHref("Engineering & Technology"),
  "Adobe Experience Cloud & MarTech": pillarHref("Adobe Experience Cloud & MarTech"),
  "Experience Design": pillarHref("Experience Design"),
  "Digital & Product": pillarHref("Digital & Product"),
  "Business Transformation & CRM": pillarHref("Business Transformation & CRM"),
  "Records Management & Compliance": mapleRecordPath,
  "AI Governance": aiGovernanceNav.href,
};

/** Every industry lists its applications in pillar order (01–07, then AI Governance), so sectors are easy to compare. */
const areaOrder = Object.keys(areaHref) as IndustryArea[];
const byArea = (a: IndustryApplication, b: IndustryApplication) => areaOrder.indexOf(a.area) - areaOrder.indexOf(b.area);

function ProductLinks({ products }: { products: NonNullable<IndustryApplication["products"]> }) {
  const items = products.flatMap((slug) => {
    const product = getAdobeProduct(slug);
    // "Adobe Real-Time CDP" rather than the full product name, so each pill stays on one line.
    return product ? [{ slug, name: `Adobe ${product.shortName}` }] : [];
  });
  if (items.length === 0) return null;
  return (
    <ul aria-label="Related Adobe applications" className="mt-3 flex flex-wrap gap-2">
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={adobeProductPath(p.slug)}
            className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full border border-line-strong px-3.5 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
          >
            {p.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Display text: keeps hyphenated words such as "HIPAA-aware" whole instead of breaking the line at the hyphen. */
function KeepHyphenated({ text }: { text: string }) {
  return text.split(/(\S+-\S+)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-line pb-14 pt-10 lg:pt-14">
        <Container>
          <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Industries" }], "/industries")} />
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Eyebrow>Industries</Eyebrow>
              <h1 className="mt-6 text-h1">Eight core industries, each with its own realities.</h1>
              <p className="mt-6 max-w-[60ch] text-lead text-muted">
                Every industry has its own regulations, customers and systems. Here is where we focus in each, and how our
                practice pillars apply: the data we integrate, the platforms we build and implement, and the experiences we
                design.
              </p>
              <p className="mt-4 max-w-[60ch] text-[0.9375rem] text-muted">
                These are typical needs and applications, not descriptions of client work.
              </p>
            </div>
            <nav aria-labelledby="industries-nav-title" className="lg:col-span-4">
              <p id="industries-nav-title" className="font-mono text-label uppercase text-muted">
                On this page
              </p>
              <ol className="mt-3 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
                {industries.map((i, index) => (
                  <li key={i.id} className="border-b border-line">
                    <Link
                      href={`#${i.id}`}
                      className="group flex min-h-11 items-center justify-between gap-3 py-2 text-[0.9375rem] leading-snug text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                    >
                      <span className="flex items-baseline gap-3">
                        <span aria-hidden className="font-mono text-xs text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {i.name}
                      </span>
                      <ArrowDown
                        aria-hidden
                        className="size-4 shrink-0 text-muted group-hover:text-signal motion-safe:transition-transform motion-safe:group-hover:translate-y-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </Container>
      </section>

      <div className="pb-6 sm:pb-12">
        <Container>
          {industries.map((industry, index) => (
            <section
              key={industry.id}
              id={industry.id}
              aria-labelledby={`${industry.id}-title`}
              className="reveal grid gap-7 border-b border-line py-10 last:border-b-0 sm:gap-8 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16"
            >
              {/* Sticky on desktop so the industry name stays beside its card while the reader works through it. */}
              <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
                <p aria-hidden className="flex items-center gap-2.5 font-mono text-label uppercase text-muted">
                  <Dot />
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${industry.id}-title`} className="mt-4 text-h2 text-balance break-words hyphens-auto lg:text-[2.125rem] xl:text-[2.625rem]">
                  {industry.name}
                </h2>
                {/* The Capability Matrix's focus line: the first thing to read for each sector. */}
                <p className="mt-5 border-l-2 border-signal pl-4 text-xl font-medium leading-snug text-balance sm:text-[1.375rem]">
                  <span className="sr-only">Focus: </span>
                  <KeepHyphenated text={industry.focus} />
                </p>
                <p className="mt-5 max-w-[60ch] text-muted">
                  <KeepHyphenated text={industry.summary} />
                </p>
              </div>
              <div className="lg:col-span-7">
                <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
                  {industry.applications.toSorted(byArea).map((a) => (
                    // Label above text at every width: pillar names such as "Adobe Experience Cloud & MarTech" are too
                    // long for a side column.
                    <li key={a.area} className="grid gap-1.5 p-5 sm:p-6">
                      {/* 44px target; the negative margin keeps the label level with the first line of text beside it. */}
                      <Link
                        href={areaHref[a.area]}
                        className="-my-2 inline-flex min-h-11 items-center gap-2.5 self-start justify-self-start font-mono text-label uppercase text-ink underline-offset-4 hover:text-signal hover:underline"
                      >
                        <Dot />
                        {a.area}
                      </Link>
                      <div>
                        <p className="text-ink-soft">
                          <KeepHyphenated text={a.text} />
                        </p>
                        {a.products?.length ? <ProductLinks products={a.products} /> : null}
                      </div>
                    </li>
                  ))}
                </ul>
                {industry.maplerecord ? (
                  <ArrowLink href={industry.maplerecord.href} className="mt-5">
                    {industry.maplerecord.label}
                  </ArrowLink>
                ) : null}
                {/* Phones and tablets: a way back to the jump list without scrolling the whole page. */}
                <a
                  href="#industries-nav-title"
                  className="mt-4 flex min-h-11 w-fit items-center gap-2 text-sm text-muted underline-offset-4 hover:text-ink hover:underline lg:hidden"
                >
                  <ArrowUp aria-hidden className="size-4" />
                  Back to industry list
                </a>
              </div>
            </section>
          ))}
        </Container>
      </div>

      <CtaBand
        title="Don't see your industry?"
        body="The underlying challenges are often the same. Tell us about your sector and what you need to build or improve, and we'll scope a practical first step with you."
      />
    </>
  );
}
