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
  const crumbs = [{ label: "Home", href: "/" }, { label: "Adobe Services", href: adobeServicesPath }, { label: product.shortName }];

  // Ignore links to products that aren't on the site, and never link a page to itself.
  const related: RelatedAdobeProduct[] = product.related.flatMap(({ slug, why }) => {
    const r = slug === product.slug ? undefined : getAdobeProduct(slug);
    return r ? [{ product: r, why }] : [];
  });
  const others = getAdobeProducts().filter((p) => p.slug !== product.slug);

  // getInsight returns null for drafts and unknown slugs; only published articles are listed.
  const articles = (await Promise.all(product.insights.map((slug) => getInsight(slug)))).filter((a): a is Insight => a !== null);

  const jsonLd = [
    breadcrumbJsonLd(crumbs, path),
    serviceJsonLd({ name: `${product.name} services`, description: product.meta.description, path, serviceType: product.name }),
    ...(product.faqs.length > 0 ? [faqJsonLd(product.faqs)] : []),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProductHero product={product} crumbs={crumbs} related={related} />
      <ProductOverview product={product} />
      <ProductSignals product={product} />
      <ProductServices product={product} />
      <ProductScenarios product={product} />
      <RelatedProducts product={product} related={related} />
      <RelatedInsights articles={articles} />
      {product.faqs.length > 0 ? <FaqSection faqs={product.faqs} title={`${product.shortName} questions`} /> : null}
      <OtherProducts others={others} />
      <CtaBand title={product.cta.title} body={product.cta.body} interest="adobe-services" product={product.slug} />
    </>
  );
}
