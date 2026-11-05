import type { Metadata } from "next";
import { company } from "@/config/site";

/**
 * Home page title (≤ 60 characters so search results show it in full). Pages without a `title`
 * use it as an absolute title, so it never depends on the root layout's default.
 */
export const siteTitle = `${company.name} — AI Governance, Adobe & Data Management`;

/** X/Twitter handle derived from the verified social profile URL in config/site.ts. */
const xHandle = (() => {
  const href = company.social.find((s) => s.label === "X")?.href;
  const handle = href?.match(/x\.com\/([A-Za-z0-9_]+)/)?.[1];
  return handle ? `@${handle}` : undefined;
})();

/** Per-page metadata with canonical + social tags. Titles use the root template "%s · Maverick InnoGarage". */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
}: {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const fullTitle = title ? `${title} · ${company.name}` : siteTitle;
  // Page-level openGraph replaces the inherited object, so the shared image is referenced explicitly.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${company.name} — AI Governance, Adobe Services and Data Management` }];
  return {
    title: title ?? { absolute: siteTitle },
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type, siteName: company.name, locale: "en_US", images },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
      ...(xHandle ? { site: xHandle } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
