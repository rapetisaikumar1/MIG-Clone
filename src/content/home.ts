import type { ApproachStage } from "@/lib/content/types";

/*
 * Home page copy. Source of truth: the Maverick InnoGarage Capability Matrix (Capability Deck, October 2026).
 * Figures, pillar capabilities, delivery stages and industry focus lines are taken from the deck; nothing here
 * describes a specific client.
 */

/** Meta description for "/" (≤ 160 characters): the four core areas named in the hero, and who they are for. */
export const homeDescription =
  "Information, data and AI governance, and MarTech on Adobe Experience Cloud, designed, implemented, run and supported for enterprises and the public sector.";

/**
 * Home hero. The headline names the four core areas (Information, Data and AI Governance, and MarTech); the lead
 * says what we do in them and for whom. Adobe appears only as the platform MarTech is delivered on. Figures:
 * "12+ years" and "enterprises and the public sector" are from the deck; the Adobe Solution Partner badge is in
 * the header.
 */
export const hero = {
  eyebrow: ["Enterprises and the public sector", "12+ years of delivery"],
  /** The last two words and the full stop are kept together when rendered, so the line never ends on an orphan. */
  title: "Information, data and AI governance. MarTech built on it.",
  /** The lead, with the two product names rendered as links between `before` and `after`. */
  lead: {
    before:
      "We design, implement, run and support information, data and AI governance programs and the software behind them, including our own records management products, ",
    links: [
      { label: "MapleRecord", href: "/maplerecord" },
      { label: "MOLI", href: "/moli" },
    ],
    after: ". We deliver MarTech on Adobe Experience Cloud.",
  },
  primaryCta: { label: "Talk to an Expert", href: "/contact#inquiry" },
  secondaryCta: { label: "Explore our services", href: "/services" },
};

/**
 * The hero's capability map: the four core areas as layers of one governed stack, each linking to its service
 * page (labels and links as in `coreExpertiseNav`, src/config/navigation.ts). Order is top to bottom in the
 * illustration; `id` is the illustration's layer, `layer` its name, `label` the service.
 */
export const heroLayers = [
  {
    id: "information",
    layer: "Records & information",
    label: "Information Governance",
    detail: "Records lifecycle, retention and privacy, with MapleRecord and MOLI",
    href: "/information-governance",
  },
  {
    id: "data",
    layer: "Data",
    label: "Data Governance",
    detail: "Data ownership, quality, security and regulatory compliance",
    href: "/data-management",
  },
  {
    id: "ai",
    layer: "AI & models",
    label: "AI Governance",
    detail: "Responsible AI, AI risk management and compliance support",
    href: "/ai-governance",
  },
  {
    id: "martech",
    layer: "Customer experience",
    label: "MarTech",
    detail: "Customer data, content and personalization on Adobe Experience Cloud",
    href: "/adobe-services",
  },
] as const;

/**
 * Capabilities per practice pillar, keyed by the pillar number in `pillarsNav` (src/config/navigation.ts),
 * which supplies the labels and links. Wording follows the deck's capability matrix. On the home page,
 * pillars 01, 03 and 07 appear as core areas (`coreAreas`); the others as supporting pillars.
 */
export const pillarCapabilities: Record<string, readonly string[]> = {
  "01": [
    "Data strategy & analytics",
    "Data governance & data management",
    "Modern data architecture & engineering",
    "Data science",
    "Data storytelling & visualization",
    "Integrated data solutions",
  ],
  "02": [
    "Cloud strategy & engineering (AWS, Azure)",
    "DevOps",
    "AI/ML enablement",
    "Mobile development",
    "Quality assurance engineering",
    "Custom applications & system integration",
  ],
  "03": [
    "Adobe Experience Platform (AEP)",
    "Real-Time CDP",
    "Adobe Experience Manager (AEM)",
    "Adobe Analytics & Adobe Target",
    "Marketo services",
    "Adobe Commerce",
    "Content management",
  ],
  "04": [
    "User research & insights",
    "Digital product & service design",
    "Design thinking",
    "Digital marketing, communications & media",
    "Experience assessments",
    "Content creation & management",
    "CX optimization",
  ],
  "05": [
    "Digital strategy & transformation",
    "Product vision & strategy",
    "User-centric design",
    "Product development & go-to-market",
    "Product organization transformation",
    "Agile transformation",
  ],
  "06": [
    "Customer experience & engagement",
    "Organizational design & alignment",
    "Process & business optimization",
    "Change enablement & insights",
    "Program & project management",
    "Microsoft Dynamics 365",
  ],
  "07": [
    "MapleRecord: public sector & enterprise records management",
    "Workflow automation",
    "MOLI: AI-driven record management system",
    "Designed to support GDPR, PDPA, PIPEDA & CCPA compliance",
  ],
};

/**
 * The four core areas (owner direction, 2026-11-10), in `coreExpertiseNav` order, keyed by its `href`, which
 * supplies the label and link. `ref` is the Capability Matrix pillar number behind each area; AI Governance is not a
 * pillar in the deck and extends pillars 01 (data governance) and 02 (AI/ML enablement). Capabilities follow the
 * deck (07, 01, 03) and the AI Governance page's capability list.
 */
export const coreAreas: Record<string, { ref: string; capabilities: readonly string[] }> = {
  "/information-governance": {
    ref: "07",
    capabilities: [
      "Records lifecycle governance",
      "Public sector & enterprise records management with MapleRecord",
      "Workflow automation",
      "AI-driven record management with MOLI",
      "Designed to support GDPR, PDPA, PIPEDA & CCPA compliance",
    ],
  },
  "/data-management": {
    ref: "01",
    capabilities: [
      "Data governance & data management",
      "Regulatory compliance, data quality & security",
      "Data strategy & analytics",
      "Modern data architecture & engineering",
      "Data science & visualization",
    ],
  },
  "/ai-governance": {
    ref: "01 + 02",
    capabilities: [
      "Readiness & governance assessment",
      "AI inventory & risk tiering",
      "Policies, accountability & oversight workflows",
      "Data handling for AI",
      "Monitoring & compliance records",
    ],
  },
  "/adobe-services": {
    ref: "03",
    capabilities: [
      "Customer data & real-time profiles",
      "Content & digital asset management",
      "Personalization & testing",
      "Analytics & attribution",
      "Marketing automation & commerce",
      "Delivered on Adobe Experience Cloud",
    ],
  },
};

export const pillarsIntro = {
  eyebrow: "Capability matrix",
  title: "Four core areas. Seven practice pillars behind them.",
  intro:
    "Governance and MarTech lead our work. Engineering, design, product and business transformation build and run what each one needs. Start with one area or combine several.",
  coreLabel: "Core expertise",
  supportingLabel: "Supporting practice pillars",
} as const;

/**
 * "How it connects": one hypothetical scenario walked through the four core areas, from information to MarTech.
 * Illustrative only. It describes no client and is labeled as such on the page.
 */
export const connection = {
  eyebrow: "How it connects",
  title: "Four areas, one governed customer journey.",
  body: "Personalization built on ungoverned records, unreliable data or unreviewed AI creates risk. Delivering the four areas together means every step follows the same rules.",
};

export const connectionScenario = {
  title: "Personalizing customer journeys under one set of rules",
  steps: [
    {
      layer: "Information",
      area: "Information Governance",
      href: "/information-governance",
      body: "Classify the customer records you hold, set retention rules, and apply them consistently across systems.",
    },
    {
      layer: "Data",
      area: "Data Governance",
      href: "/data-management#governance",
      body: "Give customer data named owners, shared definitions and quality rules, so every later use starts from trusted fields.",
    },
    {
      layer: "AI",
      area: "AI Governance",
      href: "/ai-governance#risk",
      body: "Register and risk-tier the AI that scores or segments customers, with review checkpoints before it goes live.",
    },
    {
      layer: "MarTech",
      area: "MarTech",
      href: "/adobe-services#customer-data",
      body: "Unify profiles in Adobe Experience Platform, build audiences in Real-Time CDP and personalize with Adobe Target.",
    },
  ],
  feedback: "Campaign results and customer requests feed back into retention rules, data quality and AI reviews.",
} as const;

/**
 * Business problems: the four core areas first, then two supporting pillars. `area` is the label shown above
 * each problem; `href` points at the page, or the capability anchor on it, that addresses the problem.
 */
export const problems = [
  {
    problem: "Records and retention are applied inconsistently",
    detail: "Retention schedules exist on paper, and finding the right record takes days.",
    area: "Information Governance",
    href: "/information-governance#records-lifecycle",
  },
  {
    problem: "Nobody owns or trusts the data",
    detail: "Systems disagree, definitions vary by team, and quality issues surface late.",
    area: "Data Governance",
    href: "/data-management#governance",
  },
  {
    problem: "AI is in use without clear oversight",
    detail: "Teams adopt AI tools faster than anyone can review them, and nobody holds a complete list.",
    area: "AI Governance",
    href: "/ai-governance#inventory",
  },
  {
    problem: "Customer data, content and analytics don't connect",
    detail: "Profiles, content and measurement run as separate projects with manual handoffs.",
    area: "MarTech",
    href: "/adobe-services#customer-data",
  },
  {
    problem: "Infrastructure slows every release",
    detail: "Manual deployments, aging environments and thin test coverage hold back new features.",
    area: "Engineering & Technology",
    href: "/software-development#cloud",
  },
  {
    problem: "Processes and CRM don't match how teams work",
    detail: "Sales, service and operations work around their systems with spreadsheets and email.",
    area: "Business Transformation & CRM",
    href: "/business-transformation#process-optimization",
  },
] as const;

/** "From vision to victory": the deck's three delivery stages. Also used on /about. */
export const deliveryApproach: ApproachStage[] = [
  {
    stage: "Understand & strategize",
    activities: "Deep-dive discovery into business challenges to craft tailored, measurable strategies.",
    deliverable: "A tailored strategy with measurable goals and a prioritized roadmap",
  },
  {
    stage: "Implement & integrate",
    activities: "Seamless deployment of data, cloud, and Adobe and enterprise platforms with minimal disruption.",
    deliverable: "A working, integrated solution, documentation and trained teams",
  },
  {
    stage: "Optimize & grow",
    activities: "Continuous monitoring, analytics and refinement for sustained long-term growth.",
    deliverable: "Ongoing monitoring, an improvement backlog and continued support",
  },
];

export const maplerecordFeature = {
  eyebrow: "Information Governance",
  title: "MapleRecord",
  body: "Public sector & enterprise records management for government, municipalities and regulated organizations, with workflow automation, lifecycle governance and five integrated modules. Designed and built by Maverick InnoGarage.",
  /** Closing line of the card: both products are delivered as part of Information Governance. */
  governance: { before: "Both products are part of our ", label: "Information Governance", href: "/information-governance", after: " work." },
  modules: ["MR Records", "MR Requests", "MR Workflows", "MR Forms", "MR Admin"],
  moli: {
    label: "MOLI",
    body: "Our AI-driven record management system, designed to support GDPR, PDPA, PIPEDA and CCPA compliance.",
  },
} as const;

export const homeCta = {
  title: "Ready to plan your next step?",
  body: "Tell us about your information governance, data governance, AI governance or MarTech project, or the engineering and design work around it. We'll scope a practical first step and deliver it with you.",
};
