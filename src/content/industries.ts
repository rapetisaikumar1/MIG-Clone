import type { AdobeProductSlug } from "@/lib/content/types";

/**
 * The eight core industries of the Capability Matrix (October 2026), in the deck's order (01–08).
 * `focus` is the deck's one-liner for each industry. Applications describe typical needs and how our practice
 * pillars apply — not claims about specific clients. Compliance is phrased as "privacy-safe", "HIPAA-aware" or
 * "designed to support"; never as certified or guaranteed compliance.
 * `id` values are redirect targets for the legacy industry URLs (src/config/redirects.ts); don't rename them.
 * `products` link an application to the matching /adobe-services/<slug> pages; list only the
 * Adobe applications MiG offers (AdobeProductSlug) and only where the text names them.
 */
export type IndustryArea =
  | "Data & Analytics"
  | "Engineering & Technology"
  | "Adobe Experience Cloud & MarTech"
  | "Experience Design"
  | "Digital & Product"
  | "Business Transformation & CRM"
  | "Records Management & Compliance"
  | "AI Governance";

export type IndustryApplication = {
  /** A practice pillar, named exactly as in `pillarsNav` (pillar 07 = MapleRecord and MOLI), or AI Governance. */
  area: IndustryArea;
  text: string;
  products?: AdobeProductSlug[];
};

export type Industry = {
  id: string;
  name: string;
  /** The Capability Matrix's one-line focus for the industry, shown prominently. */
  focus: string;
  summary: string;
  /** Three or four, one per area. */
  applications: IndustryApplication[];
  /** MapleRecord link for this sector. The first one on /industries must point to /maplerecord (tests/maplerecord.spec.ts). */
  maplerecord?: { href: string; label: string };
};

export const industries: Industry[] = [
  {
    id: "healthcare-pharmaceutical",
    name: "Healthcare & Pharmaceutical",
    focus: "Digital-first patient workflows and privacy-safe, HIPAA-aware data activation.",
    summary:
      "Healthcare and life sciences organizations want to expand digital self-service and streamline administration while handling sensitive health information under strict privacy rules.",
    applications: [
      {
        area: "Data & Analytics",
        text: "Classification, access control and retention rules for health and research data, so only permitted data reaches analytics and marketing tools.",
      },
      {
        area: "Adobe Experience Cloud & MarTech",
        text: "Consent-aware audiences in Real-Time CDP, and accessible patient, member and professional sites in Adobe Experience Manager with review workflows for regulated content.",
        products: ["real-time-cdp", "experience-manager"],
      },
      {
        area: "Experience Design",
        text: "User research and service design for digital-first patient and member workflows, from booking and intake to follow-up.",
      },
      {
        area: "AI Governance",
        text: "Risk review and human oversight for AI used in administrative workflows, patient communication or content drafting.",
      },
    ],
  },
  {
    id: "financial-sector",
    name: "Financial Services",
    focus: "Regulatory compliance, secure analytics and digital banking journeys.",
    summary:
      "Financial institutions want to increase adoption of digital products and improve customer satisfaction, while maintaining effective data governance and meeting regulatory obligations.",
    applications: [
      {
        area: "Data & Analytics",
        text: "Data governance, lineage and quality for regulatory reporting, and secure analytics on governed customer data.",
      },
      {
        area: "Engineering & Technology",
        text: "Secure cloud platforms on AWS and Azure, with DevOps automation and quality assurance for customer-facing applications.",
      },
      {
        area: "Adobe Experience Cloud & MarTech",
        text: "Digital banking journeys in Adobe Experience Manager, personalized and tested with Adobe Target, and measured end to end in Adobe Analytics.",
        products: ["experience-manager", "target", "analytics"],
      },
      {
        area: "AI Governance",
        text: "Documented oversight for AI that influences customer-facing decisions, such as eligibility, pricing or service routing.",
      },
    ],
  },
  {
    id: "retail-cpg",
    name: "Retail & CPG",
    focus: "Ultra-personalized web and mobile commerce, and targeted promotions.",
    summary:
      "Retail and consumer brands aim for personalized web and mobile experiences, timely recommendations and promotions, and sales and marketing systems that share one view of the customer.",
    applications: [
      {
        area: "Data & Analytics",
        text: "Customer and product data quality across commerce, loyalty, CRM and marketing systems.",
      },
      {
        area: "Engineering & Technology",
        text: "Mobile app development and quality assurance engineering for shopping experiences that hold up at peak demand.",
      },
      {
        area: "Adobe Experience Cloud & MarTech",
        text: "Audiences built from unified profiles in Real-Time CDP, personalized offers in Adobe Target, and Adobe Commerce storefronts that use the same customer data.",
        products: ["real-time-cdp", "target", "commerce"],
      },
      {
        area: "Experience Design",
        text: "Experience assessments and CX optimization across the path to purchase, informed by user research.",
      },
    ],
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    focus: "High-volume customer data unification and lifecycle engagement.",
    summary:
      "Telecommunications providers want every interaction to be timely and useful: anticipating needs, personalizing offers and service, and managing large volumes of customer data responsibly.",
    applications: [
      {
        area: "Data & Analytics",
        text: "Data pipelines that unify high-volume billing, usage and CRM data, with consent, quality and retention controls.",
      },
      {
        area: "Adobe Experience Cloud & MarTech",
        text: "Real-time profiles in Adobe Experience Platform, with Real-Time CDP audiences activated across web, app and assisted channels for lifecycle engagement.",
        products: ["experience-platform", "real-time-cdp"],
      },
      {
        area: "Business Transformation & CRM",
        text: "Microsoft Dynamics 365 for sales and customer service, working from the same unified customer view.",
      },
      {
        area: "AI Governance",
        text: "Risk tiering and monitoring for AI-driven personalization, churn models and service automation.",
      },
    ],
  },
  {
    id: "government-public-sector",
    name: "Government & Public Sector",
    focus: "Modernized citizen services and MapleRecord records governance.",
    summary:
      "Public bodies are expected to offer responsive self-service portals, digital documents, forms and signatures, and well-governed records, while reducing wait times and in-person visits.",
    applications: [
      {
        area: "Adobe Experience Cloud & MarTech",
        text: "Accessible public websites in Adobe Experience Manager, with Adobe Analytics showing where residents struggle to complete tasks online.",
        products: ["experience-manager", "analytics"],
      },
      {
        area: "Experience Design",
        text: "Research-led, accessible citizen services that reduce wait times and in-person visits.",
      },
      {
        area: "Records Management & Compliance",
        text: "Records programs, retention schedules, requests and role-based access, configured in MapleRecord, our records management platform.",
      },
      {
        area: "AI Governance",
        text: "Inventories, policies and vendor review for AI in public-facing services.",
      },
    ],
    maplerecord: { href: "/maplerecord", label: "Explore MapleRecord" },
  },
  {
    id: "media-entertainment",
    name: "Media & Entertainment",
    focus: "Audience intelligence, content management and omnichannel delivery.",
    summary:
      "Media and entertainment organizations want every moment on their sites, streaming services and apps to feel relevant, building long-term relationships based on trust.",
    applications: [
      {
        area: "Data & Analytics",
        text: "Trusted audience data, consistent content metadata, and metrics that every team defines the same way.",
      },
      {
        area: "Adobe Experience Cloud & MarTech",
        text: "Audience intelligence and journey analytics in Adobe Analytics, with content managed in Adobe Experience Manager and delivered to every channel.",
        products: ["analytics", "experience-manager"],
      },
      {
        area: "Digital & Product",
        text: "Product strategy, development and agile delivery for streaming services and apps.",
      },
      {
        area: "AI Governance",
        text: "Review before AI-generated content or recommendations are published.",
      },
    ],
  },
  {
    id: "manufacturing-distribution",
    name: "Manufacturing & Distribution",
    focus: "Supply-chain visibility and process optimization.",
    summary:
      "Manufacturers and distributors need a clear view of suppliers, inventory and orders, efficient processes, and accurate product information in every channel that supports assisted selling and self-service purchasing.",
    applications: [
      {
        area: "Data & Analytics",
        text: "ERP, inventory and order data integrated into governed sources, with dashboards that give supply-chain visibility.",
      },
      {
        area: "Adobe Experience Cloud & MarTech",
        text: "Self-service ordering for dealers and distributors with Adobe Commerce B2B features such as company accounts, shared catalogs and negotiable quotes.",
        products: ["commerce"],
      },
      {
        area: "Business Transformation & CRM",
        text: "Process and business optimization from order to delivery, with program management and change enablement for the teams involved.",
      },
    ],
  },
  {
    id: "software-technology",
    name: "Software & Technology",
    focus: "Scalable cloud architecture, AI/ML enablement and product velocity.",
    summary:
      "Software companies need platforms that scale with demand, AI features they can ship with confidence, and product and marketing teams that move quickly on reliable data.",
    applications: [
      {
        area: "Engineering & Technology",
        text: "Scalable cloud architecture on AWS and Azure, DevOps and CI/CD automation, and AI/ML enablement for product features.",
      },
      {
        area: "Adobe Experience Cloud & MarTech",
        text: "Lead management and nurture in Adobe Marketo Engage, with Adobe Analytics and Adobe Target to improve trial, sign-up and onboarding journeys.",
        products: ["marketo-engage", "analytics", "target"],
      },
      {
        area: "Digital & Product",
        text: "Product vision, product development and go-to-market, with agile delivery that keeps releases moving.",
      },
      {
        area: "AI Governance",
        text: "Governance for AI features built into your products and for the AI tools your teams use internally.",
      },
    ],
  },
];
