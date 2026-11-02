import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { getInsights } from "@/lib/content/insights";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/ai-governance", priority: 0.9 },
  { path: "/adobe-services", priority: 0.9 },
  { path: "/data-management", priority: 0.9 },
  { path: "/maplerecord", priority: 0.7 },
  { path: "/industries", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/insights", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy", priority: 0.2 },
];

// Drafts are never listed: getInsights() returns published articles only.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getInsights();
  return [
    ...staticRoutes.map(({ path, priority }) => ({ url: `${siteUrl}${path === "/" ? "" : path}`, priority })),
    ...articles.map((a) => ({ url: `${siteUrl}/insights/${a.slug}`, lastModified: a.published, priority: 0.5 })),
  ];
}
