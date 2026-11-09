import type { ApproachStage } from "@/lib/content/types";

/*
 * Home page copy. Source of truth: the Maverick InnoGarage Capability Matrix (Capability Deck, October 2026).
 * Figures, pillar capabilities, delivery stages and industry focus lines are taken from the deck; nothing here
 * describes a specific client.
 */

/** Meta description for "/" (≤ 160 characters): the core expertise named in the hero. */
export const homeDescription =
  "AI governance, Adobe Experience Cloud, data & analytics, and cloud & custom software on AWS and Azure, delivered for enterprises and the public sector.";

/**
 * Home hero. The headline names what we deliver; the lead names the core expertise (Capability Matrix pillars
 * 01–03 and 07, plus AI Governance) and who it is for. Figures: "12+ years" and "Adobe Solution Partner" are
 * from the deck.
 */
export const hero = {
  eyebrow: ["Adobe Solution Partner", "12+ years of delivery"],
  /** The last word and the full stop are kept together when rendered, so the line never ends on an orphan. */
  title: "One partner for data, AI, Adobe and cloud.",
  lead: "We design, implement and support AI governance, Adobe Experience Cloud, data and analytics, and cloud and custom software on AWS and Azure for enterprises and the public sector.",
  /** Second sentence of the lead, with the two product names rendered as links. */
  products: {
    before: "We also build our own records management products, ",
    links: [
      { label: "MapleRecord", href: "/maplerecord" },
      { label: "MOLI", href: "/moli" },
    ],
  },
  primaryCta: { label: "Talk to an Expert", href: "/contact#inquiry" },
  secondaryCta: { label: "Explore our services", href: "/services" },
};

/**
 * The hero's capability map: four core areas as layers of one platform, each linking to its service page.
 * Order is top to bottom in the illustration. `layer` is the illustration's layer name, `label` the service.
 */
export const heroLayers = [
  {
    id: "governance",
    layer: "Across every layer",
    label: "AI Governance",
    detail: "Responsible AI, AI risk management and compliance support",
    href: "/ai-governance",
  },
  {
    id: "experience",
    layer: "Experience",
    label: "Adobe Experience Cloud",
    detail: "Experience Platform, Real-Time CDP, AEM, Analytics, Target",
    href: "/adobe-services",
  },
  {
    id: "data",
    layer: "Data & AI",
    label: "Data & Analytics",
    detail: "Data governance, modern data architecture, data science",
    href: "/data-management",
  },
  {
    id: "foundation",
    layer: "Foundation",
    label: "Engineering & Technology",
    detail: "Cloud on AWS and Azure, DevOps, custom software",
    href: "/software-development",
  },
] as const;

/**
 * Capabilities per practice pillar, keyed by the pillar number in `pillarsNav` (src/config/navigation.ts),
 * which supplies the labels and links. Wording follows the deck's capability matrix.
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

export const pillarsIntro = {
  eyebrow: "Capability matrix",
  title: "7 practice pillars. One accountable partner.",
  intro:
    "Start with one practice or combine several. Each card links to the full detail.",
  /** AI Governance is not a pillar in the deck: shown as the responsible-AI extension of pillars 01 and 02. */
  aiGovernance: {
    eyebrow: "Also",
    title: "AI Governance",
    body: "Responsible AI and AI risk management, extending our data governance and AI/ML enablement work.",
  },
} as const;

/**
 * "How it connects": one hypothetical scenario walked through three of the pillars.
 * Illustrative only. It describes no client and is labeled as such on the page.
 */
export const connection = {
  eyebrow: "How it connects",
  title: "Three pillars, one customer journey.",
  body: "Personalization on unreliable data creates risk, and a well-built platform still falls short if the journey doesn't fit how people work. Delivering across pillars lets us build the data, the platform and the experience as one.",
};

export const connectionScenario = {
  title: "Personalizing customer journeys on unified data",
  steps: [
    {
      layer: "Data foundations",
      area: "Data & Analytics",
      href: "/data-management",
      body: "Bring customer data from CRM, commerce and service systems into governed pipelines, confirm who owns it, and fix quality issues in critical fields.",
    },
    {
      layer: "Platforms & activation",
      area: "Adobe Experience Cloud & MarTech",
      href: "/adobe-services",
      body: "Unify profiles in Adobe Experience Platform, build audiences in Real-Time CDP, and test personalized content with Adobe Target.",
    },
    {
      layer: "Customer experience",
      area: "Experience Design",
      href: "/experience-design",
      body: "Research what customers need, design the journeys and content around it, and measure what changes with Adobe Analytics.",
    },
  ],
  feedback: "What customers actually do feeds back into data quality, audiences and design decisions.",
} as const;

/** Business problems, one per practice pillar (`pillar` = number in `pillarsNav`). */
export const problems = [
  {
    problem: "Data is fragmented or unreliable",
    detail: "Systems disagree, quality issues surface late, and nobody trusts the numbers.",
    pillar: "01",
    href: "/data-management#quality",
  },
  {
    problem: "Infrastructure slows every release",
    detail: "Manual deployments, aging environments and thin test coverage hold back new features.",
    pillar: "02",
    href: "/software-development#cloud",
  },
  {
    problem: "Adobe and enterprise systems don't talk to each other",
    detail: "Profiles, content and analytics run as separate projects with manual handoffs.",
    pillar: "03",
    href: "/adobe-services#integration",
  },
  {
    problem: "Digital experiences don't reflect what users need",
    detail: "Journeys are designed around internal structures, and nobody measures where people drop off.",
    pillar: "04",
    href: "/experience-design",
  },
  {
    problem: "Product ideas stall before they reach market",
    detail: "Priorities shift, teams work in silos, and launches slip from quarter to quarter.",
    pillar: "05",
    href: "/digital-product",
  },
  {
    problem: "Processes and CRM don't match how teams work",
    detail: "Sales, service and operations work around their systems with spreadsheets and email.",
    pillar: "06",
    href: "/business-transformation#process-optimization",
  },
  {
    problem: "Records and retention are applied inconsistently",
    detail: "Retention schedules exist on paper, and finding the right record takes days.",
    pillar: "07",
    href: "/maplerecord",
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
  eyebrow: "Our products",
  title: "MapleRecord",
  body: "Public sector & enterprise records management for government, municipalities and regulated organizations, with workflow automation, lifecycle governance and five integrated modules. Designed and built by Maverick InnoGarage.",
  modules: ["MR Records", "MR Requests", "MR Workflows", "MR Forms", "MR Admin"],
  moli: {
    label: "MOLI",
    body: "Our AI-driven record management system, designed to support GDPR, PDPA, PIPEDA and CCPA compliance.",
  },
} as const;

export const homeCta = {
  title: "Ready to plan your next step?",
  body: "Tell us about your data, cloud, Adobe, design or records management project. We'll scope a practical first step and deliver it with you.",
};
