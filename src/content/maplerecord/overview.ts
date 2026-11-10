// Written from maplerecord.com (home, /about-us, /contact-us, /blogs, /videos, /webinar, /events, /media), crawled 2026-11-03.
// Wording follows the official site. Omitted on purpose (see docs/MAPLERECORD-SOURCES.md): dated events and
// webinars that have already passed, unlinked press and video items, and "Join thousands of teams", which
// conflicts with the About page's "5+ organizations". Also dropped: the features intro "Built for teams of all sizes,
// from startups to enterprises", which conflicts with the FAQ ("built for enterprises and public-sector organizations").
// Editorial edits for the overview redesign (2026-11-06): headings shortened and put in sentence case, hype labels
// toned down ("Powerful features" → "Features", "Lightning fast" → "Fast search and retrieval", "Advanced analytics" →
// "Analytics and reporting"); feature bodies, figures and checklist copy are unchanged.
// Product screens (2026-11-06): the hero, module tabs, pillars, product tour and trust strip show recreated
// MapleRecord screens (screens.ts) with sample data. Captions describe what each screen shows; no new claims.
// MR Admin is the fifth module (owner-confirmed); its module tab says what it covers.
// Overview body polish (2026-11-06): the platform intro no longer lists the module names (the hero's module row and
// the tab bar right below already do); the department explorer and the solutions directory merged into one section;
// the "Features" grid was cut: it restated the pillars, and two lines (an encryption-strength claim and "Unlimited storage")
// are among the claims docs/HANDOFF.md lists for confirmation before launch.
// Positioning pass (2026-11-07, messaging guide §5.5): MapleRecord is Maverick InnoGarage's own product, so the hero
// carries the ownership line, the FAQ opens with the positioning line and who builds and implements MapleRecord,
// the figures note names maplerecord.com as MapleRecord's own product site, compliance is "supported" (never
// "ensured"), and the FAQ no longer implies a customer base ("Organizations choose MapleRecord…"). Published
// figures are unchanged and flagged for owner substantiation in the register (MR-13).
// Review pass (2026-11-07): the platform intro says "Reduce legacy system risk" (no absolute "Eliminate"), the
// integration pillar says "on-premises" (the site's spelling elsewhere), and the page meta carries the ownership line.
// Consistency sweep (2026-11-07): pillar eyebrows lose hype labels ("Smart", "Zero-friction", "Seamless"); pillar
// points and figures are unchanged (MR-13 flag).
// Capability deck alignment (2026-11-09, Capability Deck Oct 2026, pillar 07 "Flagship Records Management &
// Compliance"): the hero lead uses the deck's description (government, municipalities and regulated organizations;
// workflow automation; lifecycle governance), the ownership line names the records management and compliance
// practice, the FAQ drops the company label and names the deck's audience, and the overview's CTA card mentions MOLI
// once (mrRelated). Published figures are unchanged.
// Repositioning (2026-11-10): the ownership line and FAQ name the Information Governance & Records practice (pillar 07,
// renamed); the hero line links it. The CTA body says "get more value from" instead of the slogan "unlock the value in".
import type { MrImage, MrModuleSlug } from "@/lib/content/types";
import { mrScreens, type MrScreen, type MrScreenKey } from "./screens";

const image = (name: string, width: number, height: number, alt: string): MrImage => ({ src: `/maplerecord/${name}.webp`, width, height, alt });

/** Re-exported for existing server imports; client code imports "@/content/maplerecord/official" directly. */
export { mrOfficial } from "./official";

export const mrHero = {
  headline: "Manage your information ecosystem",
  lead: "AI-first records management for government, municipalities and regulated organizations, with workflow automation and lifecycle governance for electronic and physical records.",
  /** Shown under the tagline (register MR-03). */
  maker: {
    before: "Designed and built by Maverick InnoGarage, part of our ",
    label: "Information Governance & Records practice",
    href: "/information-governance",
    after: ".",
  },
  tagline: "Secure records. Automate requests. Streamline operations.",
  screen: mrScreens.suiteLauncher,
  /**
   * Smaller windows layered around the App dashboard from lg (overview-hero.tsx): MR Records behind it,
   * MR Workflows in front. Chosen because neither screen appears elsewhere on the overview.
   */
  side: {
    behind: mrScreens.recordsFiles,
    front: mrScreens.workflowsList,
  },
  /** Kept for existing imports (the platform page hero). */
  image: mrScreens.recordsDashboard as MrImage,
};

export const mrPlatformIntro = {
  eyebrow: "The platform",
  body: "Reduce legacy system risk by automating record handling into secure, audit-ready workflows that support compliance.",
  title: "One unified platform. Five integrated modules.",
};

/** The screen each module's tab shows in the overview's module explorer. */
export const mrModuleTabScreens: Record<MrModuleSlug, MrScreenKey> = {
  "mr-records": "recordsLifecycle",
  "mr-requests": "requestsKanban",
  "mr-workflows": "workflowsCanvas",
  "mr-forms": "formsBuilder",
  "mr-admin": "adminProducts",
};

/** Small print shown once near product screens on each MapleRecord page. */
export const mrSampleDataNote = "Product screens show sample data.";

/** Small print under published figures on every MapleRecord page (messaging guide §5.5). */
export const mrFiguresNote = "Figures as published on maplerecord.com, MapleRecord's product site.";

/** The ownership sentence (messaging guide §5.5), stated in the closing CTA card on every MapleRecord page. */
export const mrOwnership = "MapleRecord is designed and built by Maverick InnoGarage.";

/** Light cross-link to MiG's other records product, shown once in the overview's CTA card (after mrOwnership). */
export const mrRelated = { before: "It sits alongside ", label: "MOLI, our AI-driven record management system", href: "/moli", after: "." };

/** Section headings on the overview page (sentence case; no claims beyond the official site). */
export const mrOverviewCopy = {
  departments: {
    eyebrow: "Solutions",
    title: "How MapleRecord helps every department",
    /** Sub-heading for the industry links under the department explorer. */
    industries: "Also built for your industry",
  },
  pillars: {
    eyebrow: "Why MapleRecord",
    title: "Governance, automation, security and integration in one platform",
  },
  articles: {
    eyebrow: "Resources",
    title: "From the MapleRecord blog",
  },
  faqTitle: "Frequently asked questions",
  cta: {
    title: "Ready to transform your records management?",
    body: "Discover how MapleRecord can help your organization streamline workflows, support compliance, and get more value from your documents.",
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
      "Protect privacy with role-based access and support retention compliance",
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
      "Support compliance with healthcare regulations and retention policies",
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
      "Support collaboration while protecting intellectual property",
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
    eyebrow: "Data governance",
    icon: "governance",
    title: "Intelligent information management",
    points: [
      "Find records up to 10× faster with metadata-driven search",
      "Organize everything with secure, custom workspaces",
      "Gain actionable process insights through built-in analytics",
    ],
    screen: mrScreens.recordsRetention,
  },
  {
    eyebrow: "Workflow automation",
    icon: "workflows",
    title: "No-code workflow automation",
    points: [
      "Automate creation, review, and approvals",
      "Configure workflows quickly with no-code templates",
      "Reduce manual finance and invoice handling by 84%",
    ],
    screen: mrScreens.workflowsRuns,
  },
  {
    eyebrow: "Security and access",
    icon: "security",
    title: "Enterprise-grade security with context-based access",
    points: [
      "Maintain 100% version control with complete audit trails",
      "Enforce retention and compliance policies automatically",
      "Stay audit-ready with secure archiving",
    ],
    screen: mrScreens.adminSecurity,
  },
  {
    eyebrow: "Integration and deployment",
    icon: "integration",
    title: "Built to integrate. Designed to deploy anywhere.",
    points: [
      "Enable secure access across web, mobile, and desktop",
      "Integrate seamlessly with ERP/CRM systems in weeks, not months",
      "Deploy flexibly across cloud or on-premises infrastructure",
    ],
    screen: mrScreens.adminIntegrations,
  },
] as const;

export const mrFaqs = [
  {
    question: "What is MapleRecord?",
    answer:
      "MapleRecord is Maverick InnoGarage’s AI-first hybrid records management platform for electronic and physical records, with five integrated modules: MR Records, MR Requests, MR Workflows, MR Forms and MR Admin.",
  },
  {
    // provenance: proposed (owner-stated 2026-11-07: MiG builds MapleRecord and provides professional services around it).
    question: "Who builds and implements MapleRecord?",
    answer:
      "MapleRecord is designed and built by Maverick InnoGarage as part of its Information Governance & Records practice. Our team also implements it: we configure it for your records program, integrate it with your systems, train your people and provide ongoing support.",
  },
  {
    question: "Why choose MapleRecord?",
    answer: "MapleRecord lets you securely manage records, automate information requests, and streamline workflows in one integrated platform.",
  },
  {
    question: "Who is MapleRecord designed for?",
    answer: "MapleRecord is built for government, municipalities and regulated organizations, from public-sector agencies to enterprises in regulated industries.",
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

type Stop = { screen: MrScreen; title: string; body: string };

/** "See it in action": one stop per screen, across all five modules. Captions describe the screen only. */
export const mrTour = {
  eyebrow: "See it in action",
  title: "A closer look at the product",
  intro: "Screens from each of the five modules, from searching records to monitoring the suite.",
  stops: [
    { screen: mrScreens.recordsSearch, title: "Search", body: "Search across workspaces in Simple, Advanced, Query or AI mode, with matching records listed in one results table." },
    { screen: mrScreens.recordsBoxes, title: "Physical storage", body: "Physical records are tracked in storage boxes, each with its box number, box type, file count, capacity and status." },
    { screen: mrScreens.requestsTriage, title: "Request triage", body: "A request in triage: the validation checklist, fee assessment and payment steps, with a countdown to the due date." },
    { screen: mrScreens.requestsRedaction, title: "Redaction", body: "The redaction history of each document in a request, with AI analysis, manual redactions and status changes." },
    { screen: mrScreens.workflowsDashboard, title: "Workflow dashboard", body: "Workflow counts, pending approvals, run outcomes and the latest runs, with quick links to common tasks." },
    { screen: mrScreens.formsLogic, title: "Conditional logic", body: "Rules that show or hide fields as a form is filled in, here a payment field that depends on the request type." },
    { screen: mrScreens.formsSubmissions, title: "Submissions", body: "The submissions archive, with each tracking number, form version, mode, status, routing and statutory deadline." },
    { screen: mrScreens.adminStatus, title: "System status", body: "Service health for each MapleRecord service, with latency and the state of the underlying infrastructure." },
  ] satisfies Stop[],
};

/** Trust strip: the records evidence trail. */
export const mrTrust = {
  eyebrow: "Trust & compliance",
  title: "Audit trails, verification and defensible disposal",
  intro: "MR Records logs user actions, tracks blockchain verification and keeps a register of authorized destructions.",
  items: [
    { screen: mrScreens.recordsAudit, title: "Audit trail", body: "Actions are logged with timestamp, device, operating system, browser, user, action ID and action type." },
    { screen: mrScreens.recordsBlockchain, title: "Blockchain verification", body: "The verification network's connection status, with block and write statistics." },
    { screen: mrScreens.recordsDestruction, title: "Destruction register", body: "Authorized destructions with certificate numbers, medium, record series, method and approvers." },
  ] satisfies Stop[],
};

/** Re-exported for existing imports; each page group now owns its own content file. */
export { mrAbout } from "./about";
export { mrContact } from "./contact";
export { mrResourceHubs } from "./resources";
