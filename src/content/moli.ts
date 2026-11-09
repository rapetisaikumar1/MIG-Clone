/**
 * MOLI product page copy. Source: Maverick InnoGarage Capability Matrix (October 2026), which describes MOLI as
 * "AI-Driven Record Management System with GDPR, PDPA, PIPEDA & CCPA Compliance" and "Flagship AI-powered RMS:
 * advanced search & retrieval, cloud integration across AWS and Azure, user-centric design and global privacy
 * compliance". Nothing here goes beyond those facts: no screens, figures, customers, pricing, release status or
 * architecture. Compliance is always worded as support, never as certification or a guarantee.
 */

export const moliMeta = {
  title: "MOLI AI-Driven Record Management",
  description:
    "MOLI, Maverick InnoGarage's AI-driven record management system: advanced search and retrieval, cloud integration across AWS and Azure, and support for GDPR, PDPA, PIPEDA and CCPA compliance.",
  path: "/moli",
  /** Used in the SoftwareApplication structured data. */
  schemaDescription:
    "AI-powered record management system with advanced search and retrieval, cloud integration across AWS and Azure, user-centric design, and support for GDPR, PDPA, PIPEDA and CCPA compliance.",
} as const;

export const moliHero = {
  eyebrow: "Our product · Records Management & Compliance",
  title: "MOLI, AI-driven record management",
  lead: "MOLI is our flagship AI-powered record management system for government and regulated industries. It pairs advanced search and retrieval with cloud integration across AWS and Azure, and is designed to support compliance with GDPR, PDPA, PIPEDA and CCPA.",
  primaryLabel: "Talk to an Expert",
  secondary: { label: "Explore MapleRecord", href: "/maplerecord" },
} as const;

export type MoliPillarIcon = "search" | "cloud" | "people" | "privacy";

export const moliPillars = {
  eyebrow: "Capabilities",
  title: "What MOLI brings together",
  intro: "Four capabilities, one goal: records that are easy to find and handled with care for privacy.",
  items: [
    {
      icon: "search",
      title: "AI-powered search and retrieval",
      body: "Advanced search and retrieval, so the people who manage records can find what they need across their collections.",
    },
    {
      icon: "cloud",
      title: "Cloud integration on AWS and Azure",
      body: "Built for cloud integration across Amazon Web Services and Microsoft Azure, the cloud platforms our engineering practice delivers on.",
    },
    {
      icon: "people",
      title: "User-centric design",
      body: "Designed around the people who work with records every day, drawing on the human-centric design practice behind our product work.",
    },
    {
      icon: "privacy",
      title: "Privacy compliance support",
      body: "Built with privacy in mind, MOLI is designed to support compliance with GDPR, PDPA, PIPEDA and CCPA.",
    },
  ] satisfies { icon: MoliPillarIcon; title: string; body: string }[],
};

/** Neutral, one-line descriptions of each regulation; not legal advice and not a compliance claim. */
export const moliRegulations = {
  eyebrow: "Privacy regulations",
  title: "Designed to support global privacy compliance",
  intro: "Four regulations that govern how organizations collect, use and protect personal information.",
  items: [
    {
      code: "GDPR",
      name: "General Data Protection Regulation",
      region: "European Union",
      body: "The EU regulation that governs how organizations collect, use and protect the personal data of individuals in the EU.",
    },
    {
      code: "PDPA",
      name: "Personal Data Protection Act",
      region: "Singapore",
      body: "Singapore's law governing how organizations collect, use and disclose personal data.",
    },
    {
      code: "PIPEDA",
      name: "Personal Information Protection and Electronic Documents Act",
      region: "Canada",
      body: "Canada's federal privacy law for how private-sector organizations handle personal information in commercial activities.",
    },
    {
      code: "CCPA",
      name: "California Consumer Privacy Act",
      region: "California, United States",
      body: "The California law that gives consumers rights over the personal information businesses collect about them.",
    },
  ],
  note: "Compliance depends on how each organization configures, operates and governs its systems. MOLI is designed to support those obligations; it does not certify or guarantee compliance.",
} as const;

export const moliRelationship = {
  eyebrow: "MOLI and MapleRecord",
  title: "Two records products, one practice",
  intro:
    "MOLI and MapleRecord are both Maverick InnoGarage products in our Records Management & Compliance practice. Each takes its own approach to records management.",
  rows: ["What it is", "Focus", "Built for"],
  moli: {
    label: "AI-first RMS",
    name: "MOLI",
    tags: ["GDPR", "PDPA", "PIPEDA", "CCPA", "AWS", "Azure"],
    tagsLabel: "Regulations and cloud platforms",
    linkLabel: "Discuss MOLI with our team",
    values: [
      "An AI-powered record management system.",
      "Advanced search and retrieval, cloud integration across AWS and Azure, and privacy compliance support.",
      "Government and regulated industries.",
    ],
  },
  mapleRecord: {
    label: "Records management suite",
    name: "MapleRecord",
    values: [
      "A configurable records management suite with five modules.",
      "Records management and workflow automation, with lifecycle governance.",
      "Public sector and enterprise organizations, including government and municipalities.",
    ],
    linkLabel: "Explore MapleRecord",
    href: "/maplerecord",
  },
  footer: "Not sure which fits? Tell us about your records and we will walk you through both.",
} as const;

export const moliFaqs = [
  {
    question: "What is MOLI?",
    answer:
      "MOLI is an AI-driven record management system designed and built by Maverick InnoGarage. It combines AI-powered search and retrieval, cloud integration across AWS and Azure and a user-centric design, and is designed to support compliance with GDPR, PDPA, PIPEDA and CCPA.",
  },
  {
    question: "Who is MOLI for?",
    answer: "MOLI is built for government and regulated industries, where records and the personal information in them must be managed with care.",
  },
  {
    question: "Does MOLI make us compliant with GDPR, PDPA, PIPEDA or CCPA?",
    answer:
      "No product can make an organization compliant on its own. MOLI is designed to support compliance with these regulations; how you configure, operate and govern it, along with your own policies and legal advice, determines compliance.",
  },
  {
    question: "Which cloud platforms does MOLI work with?",
    answer: "MOLI is built for cloud integration across Amazon Web Services (AWS) and Microsoft Azure.",
  },
  {
    question: "How is MOLI different from MapleRecord?",
    answer:
      "MapleRecord is a configurable records management suite for public sector and enterprise organizations, with five modules and workflow automation. MOLI is an AI-first record management system centered on search and retrieval and privacy compliance support.",
  },
] as const;

export const moliCta = {
  title: "See whether MOLI fits your records",
  body: "Tell us about your records, your cloud environment and the privacy regulations you work under, and we will show you where MOLI fits.",
} as const;
