import Link from "next/link";
import { ArrowDown, ArrowUp } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow } from "@/components/ui/layout";
import { industries, type IndustryApplication } from "@/content/industries";
import { CtaBand } from "@/features/contact/cta-band";
import { Breadcrumbs } from "@/features/services/sections";
import { adobeProductPath, getAdobeProduct } from "@/lib/content/adobe";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "How AI governance, Adobe services and data management apply in healthcare, retail, manufacturing, telecom, government, media, financial services and software.",
  path: "/industries",
});

const areaHref = {
  "AI Governance": "/ai-governance",
  "Adobe Services": "/adobe-services",
  "Data Management": "/data-management",
} as const;

/** Every industry lists its applications in the same order as the main navigation, so sectors are easy to compare. */
const areaOrder: IndustryApplication["area"][] = ["AI Governance", "Adobe Services", "Data Management"];
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

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-line pb-14 pt-10 lg:pt-14">
        <Container>
          <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Industries" }], "/industries")} />
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <Eyebrow>Industries</Eyebrow>
              <h1 className="mt-6 text-h1">Different sectors, the same need for trusted data.</h1>
              <p className="mt-6 max-w-[60ch] text-lead text-muted">
                Every industry has its own regulations, customers and systems. Here is how our specializations apply in
                each: the controls we put in place, the platforms we implement and the data we integrate.
              </p>
              <p className="mt-4 max-w-[60ch] text-[0.9375rem] text-muted">
                These are typical needs and applications, not descriptions of client work.
              </p>
            </div>
            <nav aria-labelledby="industries-nav-title" className="lg:col-span-4 lg:pt-2">
              <p id="industries-nav-title" className="font-mono text-label uppercase text-muted">
                On this page
              </p>
              <ol className="mt-3 grid border-t border-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
                {industries.map((i) => (
                  <li key={i.id} className="border-b border-line">
                    <Link
                      href={`#${i.id}`}
                      className="group flex min-h-11 items-center justify-between gap-3 py-2 text-[0.9375rem] leading-snug text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                    >
                      {i.name}
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

      <div className="py-6 sm:py-12">
        <Container>
          {industries.map((industry) => (
            <section
              key={industry.id}
              id={industry.id}
              aria-labelledby={`${industry.id}-title`}
              className="reveal grid gap-7 border-b border-line py-10 last:border-b-0 sm:gap-8 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:py-16"
            >
              {/* Sticky on desktop so the industry name stays beside its card while the reader works through it. */}
              <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
                <h2 id={`${industry.id}-title`} className="text-h2 text-balance break-words hyphens-auto lg:text-[2.25rem] xl:text-[2.875rem]">
                  {industry.name}
                </h2>
                <p className="mt-5 text-lg font-medium leading-snug text-balance">{industry.headline}</p>
                <p className="mt-4 max-w-[60ch] text-muted">{industry.summary}</p>
              </div>
              <div className="lg:col-span-7">
                <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
                  {industry.applications.toSorted(byArea).map((a) => (
                    <li
                      key={a.area}
                      className="grid gap-1 p-5 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:p-6 lg:grid-cols-1 lg:gap-1 xl:grid-cols-[11rem_1fr] xl:gap-6"
                    >
                      {/* 44px target; the negative margin keeps the label level with the first line of text beside it. */}
                      <Link
                        href={areaHref[a.area]}
                        className="-my-2 inline-flex min-h-11 items-center gap-2.5 self-start font-mono text-label uppercase text-ink underline-offset-4 hover:text-signal hover:underline"
                      >
                        <Dot />
                        {a.area}
                      </Link>
                      <div>
                        <p className="text-ink-soft">{a.text}</p>
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
