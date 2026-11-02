/**
 * Rewritten from the eight industry pages on the existing site around the three specializations.
 * These describe typical needs and applications — not claims about specific clients.
 */
export type Industry = {
  id: string;
  name: string;
  headline: string;
  summary: string;
  applications: { area: "AI Governance" | "Adobe Services" | "Data Management"; text: string }[];
  maplerecord?: boolean;
};

export const industries: Industry[] = [
  {
    id: "healthcare-pharmaceutical",
    name: "Healthcare & Pharmaceutical",
    headline: "Digital-first patient and member journeys, built on protected data.",
    summary:
      "Healthcare and life sciences organizations want to expand digital self-service and streamline administration while handling sensitive health information under strict privacy rules.",
    applications: [
      { area: "Data Management", text: "Classification, access control and retention for sensitive health and research data." },
      { area: "Adobe Services", text: "Personalized, accessible digital journeys with content and communications managed in one place." },
      { area: "AI Governance", text: "Review and human oversight for AI used in administrative workflows or patient communication." },
    ],
  },
  {
    id: "retail-cpg",
    name: "Retail & CPG",
    headline: "Relevant shopping experiences from connected customer data.",
    summary:
      "Retail and consumer brands aim for personalized web and mobile experiences, relevant recommendations and promotions, and sales and marketing systems that share one view of the customer.",
    applications: [
      { area: "Adobe Services", text: "Unified profiles, audience activation, testing and commerce on connected Adobe applications." },
      { area: "Data Management", text: "Customer and product data quality across commerce, CRM and marketing systems." },
      { area: "AI Governance", text: "Oversight for AI-generated product content and recommendation features." },
    ],
  },
  {
    id: "manufacturing-distribution",
    name: "Manufacturing & Distribution",
    headline: "Accurate product information across every channel and touchpoint.",
    summary:
      "Manufacturers and distributors connect communication channels and customer touchpoints so that real-time product information supports assisted selling, self-service purchasing and faster sales cycles.",
    applications: [
      { area: "Data Management", text: "Integration of ERP, product and customer data into reliable, governed sources." },
      { area: "Adobe Services", text: "B2B commerce, product content and multi-site management for regional teams." },
      { area: "AI Governance", text: "Assessment of AI used in forecasting, quoting or customer service." },
    ],
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    headline: "Timely, relevant interactions with data handled compliantly.",
    summary:
      "Telecommunications providers want every interaction to be relevant and timely: anticipating needs, personalizing with AI, and managing large volumes of customer data responsibly.",
    applications: [
      { area: "AI Governance", text: "Risk tiering and monitoring for AI-driven personalization and service automation." },
      { area: "Data Management", text: "Consent-aware customer data, quality controls and retention across large systems." },
      { area: "Adobe Services", text: "Real-time profiles and journey orchestration across digital and assisted channels." },
    ],
  },
  {
    id: "government-public-sector",
    name: "Government & Public Sector",
    headline: "Transparent, accessible services and records people can rely on.",
    summary:
      "Public bodies are expected to offer responsive self-service portals, digital documents, forms and signatures, and well-governed records — while reducing wait times and in-person visits.",
    applications: [
      { area: "Data Management", text: "Records programs, retention schedules and role-based access, including MapleRecord." },
      { area: "AI Governance", text: "Inventories, policies and vendor review for AI in public-facing services." },
      { area: "Adobe Services", text: "Accessible content platforms and digital service journeys." },
    ],
    maplerecord: true,
  },
  {
    id: "media-entertainment",
    name: "Media & Entertainment",
    headline: "Experiences that understand audiences across every screen.",
    summary:
      "Media and entertainment organizations want every moment on their sites, streaming services and apps to feel relevant, building long-term relationships based on trust.",
    applications: [
      { area: "Adobe Services", text: "Audience analytics, testing and personalization across web and app experiences." },
      { area: "Data Management", text: "Trusted audience data and consistent metrics across teams." },
      { area: "AI Governance", text: "Accountability for AI-assisted content creation and recommendations." },
    ],
  },
  {
    id: "financial-sector",
    name: "Financial Services",
    headline: "Proactive customer experiences grounded in governed data.",
    summary:
      "Financial institutions want to increase adoption of digital products and improve customer satisfaction, while maintaining effective data governance and reducing inbound service volume.",
    applications: [
      { area: "Data Management", text: "Data governance, lineage and quality for regulatory and customer data." },
      { area: "AI Governance", text: "Documented oversight for AI that influences customer-facing decisions." },
      { area: "Adobe Services", text: "Personalized digital journeys and measurement for financial products." },
    ],
  },
  {
    id: "software-technology",
    name: "Software & Technology",
    headline: "Continuous experience optimization from product and marketing data.",
    summary:
      "Software companies rely on data-driven marketing and product analytics to reach product-market fit, improve customer satisfaction and compete effectively.",
    applications: [
      { area: "Adobe Services", text: "Marketing automation, analytics and experimentation across the customer lifecycle." },
      { area: "AI Governance", text: "Governance for AI features built into products and internal tools." },
      { area: "Data Management", text: "Integrated product, usage and customer data that teams can trust." },
    ],
  },
];
