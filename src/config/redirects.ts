/**
 * Legacy WordPress URLs → new routes. This list is the single source for both
 * next.config.ts redirects and the migration table in docs/MIGRATION.md.
 * All are permanent (308). Fragments land visitors on the relevant section.
 */
export type LegacyRedirect = {
  source: string;
  destination: string;
  note: "consolidated" | "renamed" | "retired";
};

const industry = (slug: string): LegacyRedirect => ({
  source: `/${slug}`,
  destination: `/industries#${slug}`,
  note: "consolidated",
});

const article = (slug: string, target = slug): LegacyRedirect => ({
  source: `/${slug}`,
  destination: `/insights/${target}`,
  note: target === slug ? "renamed" : "consolidated",
});

export const legacyRedirects: LegacyRedirect[] = [
  { source: "/blog", destination: "/insights", note: "renamed" },
  { source: "/feed", destination: "/insights", note: "retired" },
  { source: "/comments/feed", destination: "/insights", note: "retired" },

  // Adobe: the Experience Cloud overview → the hub; each legacy product URL → its dedicated page.
  // Keep in sync with `legacyPaths` in src/content/adobe/products/*.ts (literal strings: next.config.ts imports this file).
  { source: "/adobe-experience-cloud", destination: "/adobe-services", note: "consolidated" },
  { source: "/adobe-experience-platform", destination: "/adobe-services/experience-platform", note: "renamed" },
  { source: "/adobe-real-time-cdp", destination: "/adobe-services/real-time-cdp", note: "renamed" },
  { source: "/adobe-experience-manager", destination: "/adobe-services/experience-manager", note: "renamed" },
  { source: "/adobe-content-management", destination: "/adobe-services/experience-manager", note: "consolidated" },
  { source: "/adobe-analytics", destination: "/adobe-services/analytics", note: "renamed" },
  { source: "/adobe-target", destination: "/adobe-services/target", note: "renamed" },
  { source: "/adobe-marketo-services", destination: "/adobe-services/marketo-engage", note: "renamed" },
  { source: "/adobe-commerce", destination: "/adobe-services/commerce", note: "renamed" },

  // Data services → Data Management
  { source: "/data-governance", destination: "/data-management#governance", note: "consolidated" },
  { source: "/integrated-data-solutions", destination: "/data-management#integration", note: "consolidated" },
  // Retired service names; the URLs are kept as legacy redirects (see docs/HANDOFF.md)
  { source: "/microsoft-dynamics-365", destination: "/data-management#integration", note: "retired" },
  { source: "/digital-transformation-consulting", destination: "/about#approach", note: "retired" },

  industry("healthcare-pharmaceutical"),
  industry("retail-cpg"),
  industry("manufacturing-distribution"),
  industry("telecommunications"),
  industry("government-public-sector"),
  industry("media-entertainment"),
  industry("financial-sector"),
  industry("software-technology"),

  article("the-importance-of-data-governance-in-the-digital-age"),
  article("maximizing-efficiency-with-adobe-experience-manager"),
  article("revolutionizing-customer-engagement-with-adobe-real-time-cdp"),
  article("driving-customer-experience-excellence-with-adobe-experience-platform"),
  article("enhancing-customer-experience-with-personalization-and-innovation"),
  article("enhancing-customer-experience-the-key-to-business-success", "enhancing-customer-experience-with-personalization-and-innovation"),
  // These two URLs both served the "Comprehensive Guide to Data Governance" article
  article("benefits-of-adobe-experience-cloud-for-your-business", "data-governance-guide"),
  article("the-importance-of-effective-records-management-in-todays-digital-era", "data-governance-guide"),
  // Served "A Comprehensive Guide to Digital Transformation" — outside the new focus
  { source: "/top-5-benefits-of-adobe-experience-cloud-for-your-business", destination: "/insights", note: "retired" },
];
