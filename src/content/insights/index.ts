/**
 * Insight metadata. Bodies live in sibling `<slug>.mdx` files (trusted, reviewed content only).
 * `published` dates are the original WordPress publication dates. Original posts showed only
 * WordPress usernames as authors, so no individual author is displayed.
 */
export const insightThemes = ["AI Governance", "Adobe", "Data Management", "Customer Experience"] as const;
export type InsightTheme = (typeof insightThemes)[number];

export type InsightMeta = {
  slug: string;
  title: string;
  description: string;
  theme: InsightTheme;
  status: "published" | "draft";
  published?: string;
  legacyUrl?: string;
};

export const insights: InsightMeta[] = [
  {
    slug: "data-governance-guide",
    title: "Unlocking the Power of Data: A Comprehensive Guide to Data Governance",
    description: "What data governance is, why it matters, its core components, and the steps to put an effective strategy in place.",
    theme: "Data Management",
    status: "published",
    published: "2024-12-05",
    legacyUrl: "/benefits-of-adobe-experience-cloud-for-your-business/",
  },
  {
    slug: "the-importance-of-data-governance-in-the-digital-age",
    title: "The Importance of Data Governance in the Digital Age",
    description: "How quality management, stewardship, security, privacy and lifecycle management combine into a governance program.",
    theme: "Data Management",
    status: "published",
    published: "2024-12-06",
  },
  {
    slug: "driving-customer-experience-excellence-with-adobe-experience-platform",
    title: "Driving Customer Experience Excellence with Adobe Experience Platform",
    description: "How unified profiles, real-time data and segmentation in Adobe Experience Platform support personalized experiences.",
    theme: "Adobe",
    status: "published",
    published: "2024-12-06",
  },
  {
    slug: "revolutionizing-customer-engagement-with-adobe-real-time-cdp",
    title: "Revolutionizing Customer Engagement with Adobe Real-Time CDP",
    description: "An overview of Adobe Real-Time CDP: unified profiles, real-time processing, segmentation and privacy controls.",
    theme: "Adobe",
    status: "published",
    published: "2024-12-06",
  },
  {
    slug: "maximizing-efficiency-with-adobe-experience-manager",
    title: "Maximizing Efficiency with Adobe Experience Manager",
    description: "How content management, digital asset management and multi-channel delivery in Adobe Experience Manager improve efficiency.",
    theme: "Adobe",
    status: "published",
    published: "2024-12-06",
  },
  {
    slug: "enhancing-customer-experience-with-personalization-and-innovation",
    title: "Enhancing Customer Experience with Personalization and Innovation",
    description: "The role of personalization, unified customer data and AI-assisted engagement in a better customer experience.",
    theme: "Customer Experience",
    status: "published",
    published: "2024-12-06",
  },
  {
    slug: "start-ai-governance-with-an-inventory",
    title: "Start AI Governance with an Inventory",
    description: "Why a simple, maintained AI inventory is the most useful first step toward oversight, and what to record in it.",
    theme: "AI Governance",
    status: "draft",
  },
  {
    slug: "records-retention-from-schedule-to-system",
    title: "Records Retention: From Schedule to System",
    description: "Why retention schedules fail in practice, and how record series, roles and automation make them work.",
    theme: "Data Management",
    status: "draft",
  },
];
