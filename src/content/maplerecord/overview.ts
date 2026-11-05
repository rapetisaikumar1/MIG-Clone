// Written from maplerecord.com (home, /about-us, /contact-us, /blogs, /videos, /webinar, /events, /media), crawled 2026-11-03.
// Wording follows the official site. Omitted on purpose (see docs/MAPLERECORD-SOURCES.md): dated events and
// webinars that have already passed, unlinked press and video items, and "Join thousands of teams", which
// conflicts with the About page's "5+ organizations". Also dropped: the features intro "Built for teams of all sizes,
// from startups to enterprises", which conflicts with the FAQ ("built for enterprises and public-sector organizations").
// Editorial edits for the overview redesign (2026-11-06): headings shortened and put in sentence case, hype labels
// toned down ("Powerful features" → "Features", "Lightning fast" → "Fast search and retrieval", "Advanced analytics" →
// "Analytics and reporting"); feature bodies, figures and checklist copy are unchanged.
import type { MrImage } from "@/lib/content/types";

const image = (name: string, width: number, height: number, alt: string): MrImage => ({ src: `/maplerecord/${name}.webp`, width, height, alt });

/** Re-exported for existing server imports; client code imports "@/content/maplerecord/official" directly. */
export { mrOfficial } from "./official";

export const mrHero = {
  headline: "Manage your information ecosystem",
  lead: "An AI-first hybrid records management system for electronic and physical records",
  tagline: "Secure records. Automate requests. Streamline operations.",
  image: image("hero-dashboard", 1400, 898, "MapleRecord records dashboard"),
  imageLabel: "Dashboard",
};

export const mrPlatformIntro = {
  eyebrow: "The platform",
  body: "Eliminate legacy system risk by automating record handling into secure, compliant, audit-ready workflows.",
  title: "One unified platform. Four integrated modules.",
};

/** Section headings on the overview page (sentence case; no claims beyond the official site). */
export const mrOverviewCopy = {
  departments: {
    eyebrow: "By department",
    title: "How MapleRecord helps every department",
  },
  pillars: {
    eyebrow: "Why MapleRecord",
    title: "Governance, automation, security and integration in one platform",
  },
  solutions: {
    eyebrow: "Solutions",
    title: "Built for your industry and your department",
  },
  articles: {
    eyebrow: "Resources",
    title: "From the MapleRecord blog",
  },
  faqTitle: "Frequently asked questions",
  cta: {
    title: "Ready to transform your records management?",
    body: "Discover how MapleRecord can help your organization streamline workflows, ensure compliance, and unlock the value in your documents.",
  },
};

/** "How we help" tabs on the MapleRecord home page, linked to the matching solution pages. */
export const mrDepartments = [
  {
    name: "Finance",
    solution: "finance-accounting",
    points: [
      "Centralize financial records with automated retention and audit trails",
      "Speed up approvals, reconciliations, and compliance reporting by up to 40%",
      "Control access to invoices, contracts, and financial statements securely",
    ],
    image: image("dept-finance", 1024, 1023, "MapleRecord finance records view"),
  },
  {
    name: "Legal",
    solution: "legal-compliance",
    points: [
      "Maintain easily defensible records with lifecycle governance",
      "Simplify audits, eDiscovery, and regulatory reporting",
      "FOI/RTI and legal requests resolved 2–4× faster with secure redaction",
    ],
    image: image("dept-legal", 1024, 1024, "MapleRecord legal requests view"),
  },
  {
    name: "Human Resources",
    solution: "human-resources",
    points: [
      "Securely manage employee records from onboarding to exit, reducing manual effort by up to 40%",
      "Automate HR workflows such as policy acknowledgements and requests",
      "Ensure privacy, role-based access, and retention compliance",
    ],
    image: image("dept-hr", 1018, 1004, "MapleRecord HR workspace view"),
  },
  {
    name: "Operations",
    solution: "operations",
    points: [
      "Eliminate manual, paper-based processes with automated workflows, reducing processing time by 30–50%",
      "Improve process visibility, tracking, and accountability",
      "Standardize operational documentation across teams",
    ],
    image: image("dept-operations", 1024, 1023, "MapleRecord operations workflow view"),
  },
  {
    name: "Healthcare",
    solution: "healthcare",
    points: [
      "Manage administrative and patient-related records securely",
      "Ensure compliance with healthcare regulations and retention policies",
      "Enable up to 3× faster request handling with audit-ready records",
    ],
    image: image("dept-healthcare", 881, 940, "MapleRecord healthcare administration view"),
  },
  {
    name: "Research & Development",
    solution: "research-development",
    points: [
      "Protect sensitive research data with controlled access",
      "Maintain version control, traceability, and documentation governance",
      "Support collaboration while ensuring IP protection",
    ],
    image: image("dept-rnd", 952, 1001, "MapleRecord research workspace view"),
  },
  {
    name: "Customer Service",
    solution: "customer-service",
    points: [
      "Access complete, accurate records for faster issue resolution",
      "Automate request intake, routing, and response workflows",
      "Improve transparency, cut response times by up to 40%, and boost customer satisfaction",
    ],
    image: image("dept-customer-service", 985, 977, "MapleRecord customer service requests view"),
  },
] as const;

export const mrPillars = [
  {
    eyebrow: "Smart data governance",
    icon: "governance",
    title: "Intelligent information management",
    label: "Governance",
    points: [
      "Find records up to 10× faster with metadata-driven search",
      "Organize everything with secure, custom workspaces",
      "Gain actionable process insights through built-in analytics",
    ],
    image: image("pillar-governance", 1024, 1536, "MapleRecord retention, access and workflow settings"),
  },
  {
    eyebrow: "Zero-friction workflows",
    icon: "workflows",
    title: "Low-code workflow automation",
    label: "Document upload",
    points: [
      "Automate creation, review, and approvals",
      "Configure workflows quickly with low-code templates",
      "Reduce manual finance and invoice handling by 84%",
    ],
    image: image("pillar-workflows", 950, 887, "MapleRecord document upload with retention policy"),
  },
  {
    eyebrow: "Security and access",
    icon: "security",
    title: "Enterprise-grade security with context-based access",
    label: "Version history",
    points: [
      "Maintain 100% version control with complete audit trails",
      "Enforce retention and compliance policies automatically",
      "Stay audit-ready with secure archiving",
    ],
    image: image("pillar-security", 844, 1170, "MapleRecord document version history and audit trail"),
  },
  {
    eyebrow: "Seamless integration",
    icon: "integration",
    title: "Built to integrate. Designed to deploy anywhere.",
    label: "Integrations",
    points: [
      "Enable secure access across web, mobile, and desktop",
      "Integrate seamlessly with ERP/CRM systems in weeks, not months",
      "Deploy flexibly across cloud or on-premise infrastructure",
    ],
    image: image("pillar-integration", 1023, 1148, "MapleRecord integrations with ERP, CRM, cloud and on-premise systems"),
  },
] as const;

export const mrFeatures = {
  eyebrow: "Features",
  title: "Everything you need to manage records",
  items: [
    { icon: "sparkles", title: "AI-powered insights", body: "Leverage advanced AI to automatically categorize, tag, and extract insights from your records." },
    { icon: "shield", title: "Enterprise security", body: "Bank-level encryption and compliance with industry standards to keep your data safe." },
    { icon: "zap", title: "Fast search and retrieval", body: "Search and retrieve millions of records in milliseconds with our optimized infrastructure." },
    { icon: "database", title: "Unlimited storage", body: "Store as many records as you need without worrying about storage limits or costs." },
    { icon: "users", title: "Team collaboration", body: "Work together seamlessly with role-based access control and real-time updates." },
    { icon: "chart", title: "Analytics and reporting", body: "Get actionable insights with powerful reporting and visualization tools." },
  ],
} as const;

export const mrFaqs = [
  {
    question: "Why do organizations choose MapleRecord?",
    answer: "Organizations choose MapleRecord to securely manage records, automate information requests, and streamline workflows in one integrated platform.",
  },
  {
    question: "Who is MapleRecord designed for?",
    answer: "MapleRecord is built for enterprises and public-sector organizations operating in regulated environments.",
  },
  {
    question: "How does MapleRecord support security and compliance?",
    answer: "MapleRecord supports enterprise-grade security, role-based access, audit trails, and retention controls.",
  },
  {
    question: "Can MapleRecord integrate with our existing systems?",
    answer: "Yes. MapleRecord integrates with ERP, CRM, and other enterprise systems without disrupting existing operations.",
  },
  {
    question: "How quickly can MapleRecord be deployed?",
    answer: "MapleRecord is designed for rapid deployment and can be configured in weeks, depending on organizational needs.",
  },
];

/** Re-exported for existing imports; each page group now owns its own content file. */
export { mrAbout } from "./about";
export { mrContact } from "./contact";
export { mrResourceHubs } from "./resources";
