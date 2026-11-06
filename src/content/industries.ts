import type { AdobeProductSlug } from "@/lib/content/types";

/**
 * Rewritten from the eight industry pages on the existing site around the specializations.
 * These describe typical needs and applications — not claims about specific clients.
 * `id` values are redirect targets for the legacy industry URLs (src/config/redirects.ts); don't rename them.
 * `products` link an application to the matching /adobe-services/<slug> pages; list only the
 * Adobe applications MiG offers (AdobeProductSlug) and only where the text names them.
 */
export type IndustryApplication = {
  area: "AI Governance" | "Adobe Services" | "Data Management";
  text: string;
  products?: AdobeProductSlug[];
};

export type Industry = {
  id: string;
  name: string;
  headline: string;
  summary: string;
  applications: IndustryApplication[];
  /** MapleRecord link for this sector. The first one on /industries must point to /maplerecord (tests/maplerecord.spec.ts). */
  maplerecord?: { href: string; label: string };
};

export const industries: Industry[] = [
  {
    id: "healthcare-pharmaceutical",
    name: "Healthcare & Pharmaceutical",
    headline: "Digital-first patient and member journeys, built on protected data.",
    summary:
      "Healthcare and life sciences organizations want to expand digital self-service and streamline administration while handling sensitive health information under strict privacy rules.",
    applications: [
      {
        area: "Data Management",
        text: "Classification, access control and retention for health and research data, including clear rules on what may reach marketing and analytics tools.",
      },
      {
        area: "Adobe Services",
        text: "Accessible patient, member and professional sites in Adobe Experience Manager with review workflows for regulated content, and permission-based communications in Adobe Marketo Engage.",
        products: ["experience-manager", "marketo-engage"],
      },
      {
        area: "AI Governance",
        text: "Risk review and human oversight for AI used in administrative workflows, patient communication or content drafting.",
      },
    ],
  },
  {
    id: "retail-cpg",
    name: "Retail & CPG",
    headline: "Relevant shopping experiences from connected customer data.",
    summary:
      "Retail and consumer brands aim for personalized web and mobile experiences, timely recommendations and promotions, and sales and marketing systems that share one view of the customer.",
    applications: [
      {
        area: "Adobe Services",
        text: "Audiences built from unified profiles in Real-Time CDP, tests and personalized offers in Adobe Target, and Adobe Commerce storefronts that use the same customer data.",
        products: ["real-time-cdp", "target", "commerce"],
      },
      {
        area: "Data Management",
        text: "Customer and product data quality across commerce, loyalty, CRM and marketing systems.",
      },
      {
        area: "AI Governance",
        text: "Oversight for AI-generated product content, recommendations and automated promotions.",
      },
    ],
  },
  {
    id: "manufacturing-distribution",
    name: "Manufacturing & Distribution",
    headline: "Accurate product information across every channel and touchpoint.",
    summary:
      "Manufacturers and distributors connect communication channels and customer touchpoints so that real-time product information supports assisted selling, self-service purchasing and faster sales cycles.",
    applications: [
      {
        area: "Data Management",
        text: "ERP, product and customer data integrated into governed sources, so pricing, availability and specifications agree across channels.",
      },
      {
        area: "Adobe Services",
        text: "Self-service ordering for dealers and distributors with Adobe Commerce B2B features such as company accounts, shared catalogs, quick order and negotiable quotes, plus product content in Adobe Experience Manager.",
        products: ["commerce", "experience-manager"],
      },
      {
        area: "AI Governance",
        text: "Assessment of AI used in demand forecasting, quoting or customer service.",
      },
    ],
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    headline: "Timely offers and service, from customer data handled with consent.",
    summary:
      "Telecommunications providers want every interaction to be timely and useful: anticipating needs, personalizing with AI, and managing large volumes of customer data responsibly.",
    applications: [
      {
        area: "AI Governance",
        text: "Risk tiering and monitoring for AI-driven personalization, churn models and service automation.",
      },
      {
        area: "Data Management",
        text: "Consent-aware customer data, quality controls and retention across billing, CRM and digital systems.",
      },
      {
        area: "Adobe Services",
        text: "Account, usage and digital behavior unified into real-time profiles in Adobe Experience Platform, with Real-Time CDP audiences activated to web, app and assisted channels.",
        products: ["experience-platform", "real-time-cdp"],
      },
    ],
  },
  {
    id: "government-public-sector",
    name: "Government & Public Sector",
    headline: "Transparent, accessible services and records people can rely on.",
    summary:
      "Public bodies are expected to offer responsive self-service portals, digital documents, forms and signatures, and well-governed records, while reducing wait times and in-person visits.",
    applications: [
      {
        area: "Data Management",
        text: "Records programs, retention schedules and role-based access, configured in MapleRecord, our records management platform.",
      },
      {
        area: "AI Governance",
        text: "Inventories, policies and vendor review for AI in public-facing services.",
      },
      {
        area: "Adobe Services",
        text: "Accessible public websites in Adobe Experience Manager, with Adobe Analytics showing where residents struggle to complete tasks online.",
        products: ["experience-manager", "analytics"],
      },
    ],
    maplerecord: { href: "/maplerecord", label: "See MapleRecord for public-sector records" },
  },
  {
    id: "media-entertainment",
    name: "Media & Entertainment",
    headline: "Experiences that understand audiences across every screen.",
    summary:
      "Media and entertainment organizations want every moment on their sites, streaming services and apps to feel relevant, building long-term relationships based on trust.",
    applications: [
      {
        area: "Adobe Services",
        text: "Audience behavior measured across web and app experiences in Adobe Analytics, and tests and personalization in Adobe Target.",
        products: ["analytics", "target"],
      },
      {
        area: "Data Management",
        text: "Trusted audience data, consistent content metadata, and metrics that every team defines the same way.",
      },
      {
        area: "AI Governance",
        text: "Accountability for AI-assisted content creation and recommendations, including review before AI-generated material is published.",
      },
    ],
  },
  {
    id: "financial-sector",
    name: "Financial Services",
    headline: "Proactive customer experiences grounded in governed data.",
    summary:
      "Financial institutions want to increase adoption of digital products and improve customer satisfaction, while maintaining effective data governance and reducing inbound service volume.",
    applications: [
      {
        area: "Data Management",
        text: "Data governance, lineage and quality for regulatory reporting and customer data.",
      },
      {
        area: "AI Governance",
        text: "Documented oversight for AI that influences customer-facing decisions, such as eligibility, pricing or service routing.",
      },
      {
        area: "Adobe Services",
        text: "Product and service content in Adobe Experience Manager, personalized and tested with Adobe Target, and measured end to end in Adobe Analytics.",
        products: ["experience-manager", "target", "analytics"],
      },
    ],
  },
  {
    id: "software-technology",
    name: "Software & Technology",
    headline: "Continuous experience optimization from product and marketing data.",
    summary:
      "Software companies rely on data-driven marketing and product analytics to reach product-market fit, improve customer satisfaction and compete effectively.",
    applications: [
      {
        area: "Adobe Services",
        text: "Lead management and nurture programs in Adobe Marketo Engage, with Adobe Analytics and Adobe Target to measure and improve trial, sign-up and onboarding journeys.",
        products: ["marketo-engage", "analytics", "target"],
      },
      {
        area: "AI Governance",
        text: "Governance for AI features built into your products and for the AI tools your teams use internally.",
      },
      {
        area: "Data Management",
        text: "Integrated product usage, billing and CRM data that sales, marketing and product teams can trust.",
      },
    ],
  },
];
