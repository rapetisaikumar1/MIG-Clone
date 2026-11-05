import Link from "next/link";
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

function ProductLinks({ products }: { products: NonNullable<IndustryApplication["products"]> }) {
  const items = products.flatMap((slug) => {
    const product = getAdobeProduct(slug);
    return product ? [{ slug, name: product.name }] : [];
  });
  if (items.length === 0) return null;
  return (
    <ul aria-label="Related Adobe applications" className="mt-3 flex flex-wrap gap-2">
      {items.map((p) => (
        <li key={p.slug}>
          <Link
            href={adobeProductPath(p.slug)}
            className="inline-flex min-h-8 items-center rounded-full border border-line-strong px-3 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
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
                Every industry has its own regulations, customers and systems. Here is how our three specializations typically
                apply in each.
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
                {industries.map((i, index) => (
                  <li key={i.id} className="border-b border-line">
                    <Link
                      href={`#${i.id}`}
                      className="flex min-h-11 items-center gap-3 py-2 text-[0.9375rem] leading-snug text-ink-soft underline-offset-4 hover:text-ink hover:underline"
                    >
                      <span aria-hidden className="w-5 shrink-0 font-mono text-xs text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {i.name}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </Container>
      </section>

      <div className="py-8 sm:py-12">
        <Container>
          {industries.map((industry, index) => (
            <section
              key={industry.id}
              id={industry.id}
              aria-labelledby={`${industry.id}-title`}
              className="grid gap-8 border-b border-line py-14 last:border-b-0 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <p aria-hidden className="font-mono text-label text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${industry.id}-title`} className="mt-3 text-h2">
                  {industry.name}
                </h2>
                <p className="mt-5 text-lg font-medium leading-snug">{industry.headline}</p>
                <p className="mt-4 max-w-[60ch] text-muted">{industry.summary}</p>
              </div>
              <div className="lg:col-span-7">
                <ul className="divide-y divide-line rounded-2xl border border-line bg-surface">
                  {industry.applications.map((a) => (
                    <li key={a.area} className="grid gap-2 p-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                      <Link
                        href={areaHref[a.area]}
                        className="inline-flex min-h-7 items-center gap-2.5 self-start font-mono text-label uppercase text-ink underline-offset-4 hover:text-signal hover:underline"
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
              </div>
            </section>
          ))}
        </Container>
      </div>

      <CtaBand
        title="Don't see your industry?"
        body="The underlying challenges are often the same. Tell us about your sector and what you're trying to achieve."
      />
    </>
  );
}
