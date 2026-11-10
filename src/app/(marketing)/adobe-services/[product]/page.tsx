import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumbJsonLd, faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import {
  OtherProducts,
  ProductHero,
  ProductOverview,
  ProductScenarios,
  ProductServices,
  ProductSignals,
  RelatedInsights,
  RelatedProducts,
  type RelatedAdobeProduct,
} from "@/features/adobe/product-sections";
import { CtaBand } from "@/features/contact/cta-band";
import { FaqSection } from "@/features/services/sections";
import { adobeProductPath, adobeServicesPath, getAdobeProduct, getAdobeProducts } from "@/lib/content/adobe";
import { getInsight, type Insight } from "@/lib/content/insights";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAdobeProducts().map((p) => ({ product: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/adobe-services/[product]">): Promise<Metadata> {
  const product = getAdobeProduct((await params).product);
  if (!product) return {};
  return pageMetadata({ title: product.meta.title, description: product.meta.description, path: adobeProductPath(product.slug) });
}

export default async function AdobeProductPage({ params }: PageProps<"/adobe-services/[product]">) {
  const product = getAdobeProduct((await params).product);
  if (!product) notFound();

  const path = adobeProductPath(product.slug);
  const crumbs = [{ label: "Home", href: "/" }, { label: "MarTech", href: adobeServicesPath }, { label: product.shortName }];

  // Ignore links to products that aren't on the site, and never link a page to itself.
  const related: RelatedAdobeProduct[] = product.related.flatMap(({ slug, why }) => {
    const r = slug === product.slug ? undefined : getAdobeProduct(slug);
    return r ? [{ product: r, why }] : [];
  });
  // The closing index lists only applications the page hasn't already linked: not itself, not its related ones.
  const others = getAdobeProducts().filter((p) => p.slug !== product.slug && !related.some((r) => r.product.slug === p.slug));

  // getInsight returns null for drafts and unknown slugs; only published articles are listed.
  const articles = (await Promise.all(product.insights.map((slug) => getInsight(slug)))).filter((a): a is Insight => a !== null);

  const jsonLd = [
    breadcrumbJsonLd(crumbs, path),
    serviceJsonLd({ name: `${product.name} services`, description: product.meta.description, path, serviceType: product.name }),
    ...(product.faqs.length > 0 ? [faqJsonLd(product.faqs)] : []),
  ];

  // On screen only, "Real-Time" in the FAQ heading gets a non-breaking hyphen so it never wraps as "Real-" /
  // "Time CDP" in its narrow lg column. Questions keep the plain text: they must match the FAQPage structured data.
  const keepName = (text: string) => text.replaceAll("Real-Time", "Real\u2011Time");

  return (
    <>
      <JsonLd data={jsonLd} />
      {/* The product's own content first (overview → signals → services → scenarios → FAQ), then the ways onward
          (related applications → reading → remaining applications). Tones alternate: deep, paper, surface, deep,
          paper, surface, deep, then paper (or deep when there is no reading section above it). */}
      <ProductHero product={product} crumbs={crumbs} />
      <ProductOverview product={product} />
      <ProductSignals product={product} />
      <ProductServices product={product} />
      <ProductScenarios product={product} />
      {product.faqs.length > 0 ? <FaqSection faqs={product.faqs} title={keepName(`${product.shortName} questions`)} /> : null}
      <RelatedProducts product={product} related={related} />
      <RelatedInsights articles={articles} />
      <OtherProducts others={others} tone={articles.length > 0 ? "paper" : "deep"} />
      <CtaBand title={product.cta.title} body={product.cta.body} interest="adobe-services" product={product.slug} />
    </>
  );
}
