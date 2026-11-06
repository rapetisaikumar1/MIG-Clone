import type { ApproachStage } from "@/lib/content/types";

export const hero = {
  eyebrow: ["AI Governance", "Adobe Services", "Data Management", "Software Development"],
  title: "Responsible AI. Trusted data. Better digital experiences.",
  lead: "Maverick InnoGarage is a software development and professional services company. We put responsible oversight around AI, implement and connect Adobe Experience Cloud applications, build enterprise data your teams can trust, and develop enterprise software, including MapleRecord, our own records management platform.",
  figure: {
    label: "How we deliver",
    caption: "Our specializations around the outcomes you need, designed, built and improved in a continuous loop.",
  },
};

export const expertise = [
  {
    href: "/ai-governance",
    title: "AI Governance",
    summary: "Oversight that lets your teams adopt AI with confidence: inventories, risk tiers, clear accountability and proportionate review.",
    services: ["Readiness assessments", "AI inventories", "Policies and accountability", "Human oversight and review", "Third-party AI evaluation"],
    glyph: "governance",
  },
  {
    href: "/adobe-services",
    title: "Adobe Services",
    summary: "Adobe Experience Cloud applications implemented, connected to each other and to your enterprise systems, and improved over time.",
    services: ["Customer data and profiles", "Content and digital assets", "Analytics, testing and personalization", "Marketing automation and commerce", "Integration with enterprise systems"],
    glyph: "journey",
  },
  {
    href: "/data-management",
    title: "Data Management",
    summary: "Governed, integrated, high-quality data with clear owners, from creation through retention and records management.",
    services: ["Strategy and governance", "Integration and real-time access", "Quality and metadata", "Lifecycle and retention", "Records management"],
    glyph: "lifecycle",
  },
  {
    // provenance: proposed. Basis: owner-stated 2026-11-07 (software development is a core specialization);
    // evidenced by MapleRecord; verified old-site titles (AEM custom development, data integration).
    href: "/software-development",
    title: "Software Development",
    summary: "Enterprise software designed, built and integrated around how your teams work, by the team that builds MapleRecord.",
    services: ["Custom enterprise applications", "Workflow and forms automation", "System and data integration", "Custom development on Adobe platforms", "Support and continued improvement"],
    glyph: "build",
  },
] as const;

/**
 * "How it connects": one hypothetical scenario walked through the three layers of the hero diagram.
 * Illustrative only. It describes no client and is labeled as such on the page.
 */
export const connectionScenario = {
  title: "Preparing data for an AI assistant",
  steps: [
    {
      layer: "Data foundations",
      area: "Data Management",
      href: "/data-management",
      body: "Classify the documents and customer data the assistant will draw on, confirm who owns them, and fix quality issues in critical fields.",
    },
    {
      layer: "Governance controls",
      area: "AI Governance",
      href: "/ai-governance",
      body: "Rate the use case as higher risk, require human review of customer-facing answers, and decide what to monitor.",
    },
    {
      layer: "Digital experiences",
      area: "Adobe Services",
      href: "/adobe-services",
      body: "Manage approved answer content in Adobe Experience Manager, and measure how customers use the assistant with Adobe Analytics.",
    },
  ],
  feedback: "Monitoring what the assistant actually says feeds back into data quality and review rules.",
} as const;

export const problems = [
  {
    problem: "AI use is expanding without clear oversight",
    detail: "Teams adopt AI tools and features faster than policies, owners and review processes can keep up.",
    href: "/ai-governance#oversight",
    service: "AI Governance",
  },
  {
    problem: "Adobe and enterprise systems don't talk to each other",
    detail: "Profiles, content and analytics run as separate projects with manual handoffs.",
    href: "/adobe-services#integration",
    service: "Adobe Services",
  },
  {
    problem: "Digital experiences feel inconsistent",
    detail: "Content, personalization and measurement vary by channel, region and team.",
    href: "/adobe-services#content",
    service: "Adobe Services",
  },
  {
    problem: "Data is fragmented or unreliable",
    detail: "Systems disagree, quality issues surface late, and nobody trusts the numbers.",
    href: "/data-management#quality",
    service: "Data Management",
  },
  {
    problem: "Records and information lifecycles are complex",
    detail: "Retention schedules exist on paper but are applied inconsistently, if at all.",
    href: "/data-management#records",
    service: "Data Management",
  },
  {
    problem: "Critical processes run on spreadsheets and email",
    detail: "Packaged tools don't fit, so requests, approvals and records are tracked by hand.",
    href: "/software-development#custom-applications",
    service: "Software Development",
  },
] as const;

export const deliveryApproach: ApproachStage[] = [
  {
    stage: "Assess",
    activities: "Understand your goals, current platforms, data and controls through interviews, reviews and profiling.",
    deliverable: "Current-state assessment with prioritized opportunities",
  },
  {
    stage: "Design",
    activities: "Shape the target model: architecture, governance roles, policies and the use cases to deliver first.",
    deliverable: "Target design and a sequenced roadmap",
  },
  {
    stage: "Implement",
    activities: "Configure platforms, build software and integrations, put processes in place, and train the people who will run them.",
    deliverable: "Working solution, documentation and trained teams",
  },
  {
    stage: "Improve",
    activities: "Measure adoption and quality, refine controls and experiences, and extend to new areas.",
    deliverable: "Improvement backlog and ongoing support",
  },
];
