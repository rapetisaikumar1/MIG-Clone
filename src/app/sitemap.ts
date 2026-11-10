import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { adobeAssessmentPath, adobeProductPath, getAdobeProducts } from "@/lib/content/adobe";
import { getInsights } from "@/lib/content/insights";
import { getMrArticles, getMrModules, getMrSolutions } from "@/lib/content/maplerecord";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/data-management", priority: 0.9 },
  { path: "/software-development", priority: 0.9 },
  { path: "/adobe-services", priority: 0.9 },
  { path: adobeAssessmentPath, priority: 0.8 },
  { path: "/experience-design", priority: 0.9 },
  { path: "/digital-product", priority: 0.9 },
  { path: "/business-transformation", priority: 0.9 },
  { path: "/information-governance", priority: 0.9 },
  { path: "/ai-governance", priority: 0.9 },
  { path: "/moli", priority: 0.8 },
  { path: "/maplerecord", priority: 0.8 },
  { path: "/maplerecord/platform", priority: 0.6 },
  { path: "/maplerecord/solutions", priority: 0.6 },
  { path: "/maplerecord/resources", priority: 0.5 },
  { path: "/maplerecord/about", priority: 0.5 },
  { path: "/maplerecord/contact", priority: 0.5 },
  { path: "/industries", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/insights", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
  { path: "/cookies", priority: 0.2 },
];

// Drafts are never listed: getInsights() returns published articles only.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getInsights();
  return [
    ...staticRoutes.map(({ path, priority }) => ({ url: `${siteUrl}${path === "/" ? "" : path}`, priority })),
    ...getAdobeProducts().map((p) => ({ url: `${siteUrl}${adobeProductPath(p.slug)}`, priority: 0.8 })),
    ...articles.map((a) => ({ url: `${siteUrl}/insights/${a.slug}`, lastModified: a.published, priority: 0.5 })),
    ...getMrModules().map((m) => ({ url: `${siteUrl}/maplerecord/platform/${m.slug}`, priority: 0.6 })),
    ...getMrSolutions().map((s) => ({ url: `${siteUrl}/maplerecord/solutions/${s.slug}`, priority: 0.5 })),
    ...getMrArticles().map((a) => ({ url: `${siteUrl}/maplerecord/resources/${a.slug}`, lastModified: a.published, priority: 0.4 })),
  ];
}
