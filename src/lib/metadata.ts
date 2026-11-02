import type { Metadata } from "next";
import { company } from "@/config/site";

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
  const fullTitle = title ? `${title} · ${company.name}` : company.name;
  // Page-level openGraph replaces the inherited object, so the shared image is referenced explicitly.
  const images = [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${company.name} — AI Governance, Adobe Services and Data Management` }];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, type, siteName: company.name, locale: "en_US", images },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
