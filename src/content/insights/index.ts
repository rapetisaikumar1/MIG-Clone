/**
 * Insight metadata. Bodies live in sibling `<slug>.mdx` files (trusted, reviewed content only).
 * `published` dates are the original WordPress publication dates. Original posts showed only
 * WordPress usernames as authors, so no individual author is displayed.
 */
import type { AdobeProductSlug } from "@/lib/content/types";

export const insightThemes = ["AI Governance", "MarTech", "Data & Analytics", "Customer Experience"] as const;
export type InsightTheme = (typeof insightThemes)[number];

export type InsightMeta = {
  slug: string;
  title: string;
  /** Shorter <title> for search results when `title` plus the site suffix runs past ~60 characters. */
  metaTitle?: string;
  description: string;
  theme: InsightTheme;
  status: "published" | "draft";
  published?: string;
  legacyUrl?: string;
  /** Adobe application the article is about; its service page becomes the article's "Related expertise" link. */
  adobeProduct?: AdobeProductSlug;
  /** Hand-picked "More insights" slugs, used first when the article's own theme has no other articles. */
  related?: string[];
};

export const insights: InsightMeta[] = [
  {
    slug: "data-governance-guide",
    metaTitle: "A Guide to Data Governance",
    title: "A comprehensive guide to data governance",
    description: "What data governance is, why it matters, its core components, and six steps to put an effective strategy in place.",
    theme: "Data & Analytics",
    status: "published",
    published: "2024-12-05",
    // Verified: despite its slug, this WordPress URL served this data governance guide, not an Adobe Experience Cloud
    // article (docs/CONTENT-INVENTORY.md, docs/MIGRATION.md), so the redirect to this article is correct.
    legacyUrl: "/benefits-of-adobe-experience-cloud-for-your-business/",
  },
  {
    slug: "the-importance-of-data-governance-in-the-digital-age",
    metaTitle: "Why Data Governance Matters Today",
    title: "The importance of data governance in the digital age",
    description: "A short overview of why data governance matters, the components of a governance program, and where to start.",
    theme: "Data & Analytics",
    status: "published",
    published: "2024-12-06",
  },
  {
    slug: "driving-customer-experience-excellence-with-adobe-experience-platform",
    metaTitle: "Adobe Experience Platform and CX",
    title: "Driving customer experience excellence with Adobe Experience Platform",
    description: "How unified profiles, streaming data, audiences and AI in Adobe Experience Platform support personalized customer experiences.",
    theme: "MarTech",
    status: "published",
    published: "2024-12-06",
    adobeProduct: "experience-platform",
  },
  {
    slug: "revolutionizing-customer-engagement-with-adobe-real-time-cdp",
    metaTitle: "Customer Engagement with Real-Time CDP",
    title: "Improving customer engagement with Adobe Real-Time CDP",
    description: "An overview of Adobe Real-Time CDP: unified profiles, real-time audiences, activation to other channels, and privacy controls.",
    theme: "MarTech",
    status: "published",
    published: "2024-12-06",
    adobeProduct: "real-time-cdp",
  },
  {
    slug: "maximizing-efficiency-with-adobe-experience-manager",
    metaTitle: "Maximizing Efficiency with AEM",
    title: "Maximizing efficiency with Adobe Experience Manager",
    description: "How AEM Sites, AEM Assets and multi-channel content delivery in Adobe Experience Manager help teams work more efficiently.",
    theme: "MarTech",
    status: "published",
    published: "2024-12-06",
    adobeProduct: "experience-manager",
  },
  {
    slug: "enhancing-customer-experience-with-personalization-and-innovation",
    metaTitle: "Personalizing the Customer Experience",
    title: "Enhancing customer experience with personalization and innovation",
    description: "Why customer experience matters, the role of personalization and unified customer data, and practical strategies to improve CX.",
    theme: "Customer Experience",
    status: "published",
    published: "2024-12-06",
    // The only Customer Experience article: point readers to the Adobe articles on unified profiles and audiences.
    related: ["driving-customer-experience-excellence-with-adobe-experience-platform", "revolutionizing-customer-engagement-with-adobe-real-time-cdp"],
  },
  {
    slug: "start-ai-governance-with-an-inventory",
    title: "Start AI governance with an inventory",
    description: "Why a simple, maintained AI inventory is the most useful first step toward oversight, and what to record in it.",
    theme: "AI Governance",
    status: "draft",
  },
  {
    slug: "records-retention-from-schedule-to-system",
    title: "Records retention: from schedule to system",
    description: "Why retention schedules fail in practice, and how record series, roles and automation make them work.",
    theme: "Data & Analytics",
    status: "draft",
  },
];
