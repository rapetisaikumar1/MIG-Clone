import { company, siteUrl } from "@/config/site";

type Json = Record<string, unknown>;

/** Renders structured data. JSON.stringify output with "<" escaped cannot break out of the script element. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

const absolute = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

/** Items mirror the visible <Breadcrumbs>; the last item (current page) may omit href. */
export function breadcrumbJsonLd(items: { label: string; href?: string }[], currentPath: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: absolute(item.href ?? currentPath),
    })),
  };
}

/** Only for FAQs that are visible on the same page. */
export function faqJsonLd(faqs: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

export function serviceJsonLd({ name, description, path, serviceType }: { name: string; description: string; path: string; serviceType: string }): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: absolute(path),
    provider: { "@type": "Organization", name: company.name, url: siteUrl },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
  };
}

/** Article structured data for an insight or resource page; `image` is a site path such as "/maplerecord/blog-roi.webp". */
export function articleJsonLd({
  headline,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}): Json {
  const organization = { "@type": "Organization", name: company.name, url: siteUrl };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: absolute(path),
    mainEntityOfPage: absolute(path),
    datePublished,
    ...(dateModified ? { dateModified } : {}),
    image: absolute(image ?? "/opengraph-image"),
    author: organization,
    publisher: { ...organization, logo: { "@type": "ImageObject", url: `${siteUrl}/brand/mig-logo.svg` } },
  };
}
