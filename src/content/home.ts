import type { ApproachStage } from "@/lib/content/types";

export const hero = {
  eyebrow: ["AI Governance", "Adobe Services", "Data Management"],
  title: "Responsible AI. Trusted data. Better digital experiences.",
  lead: "Maverick InnoGarage helps organizations establish AI oversight, implement Adobe platforms, and strengthen the quality and control of enterprise data.",
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
    summary: "Implementation, integration and optimization across Adobe's customer data, content, analytics, personalization, automation and commerce applications.",
    services: ["Experience Platform and Real-Time CDP", "Experience Manager", "Analytics and Target", "Marketo Engage", "Commerce"],
    glyph: "journey",
  },
  {
    href: "/data-management",
    title: "Data Management",
    summary: "Governed, integrated, high-quality data with clear owners, from creation through retention and records management.",
    services: ["Strategy and governance", "Integration and migration", "Quality and metadata", "Lifecycle and retention", "Records management"],
    glyph: "lifecycle",
  },
] as const;

export const connection = [
  {
    step: "Data foundations",
    title: "Trusted data",
    body: "Owned, integrated, quality-checked data with known lineage and retention rules.",
    href: "/data-management",
  },
  {
    step: "Governance controls",
    title: "Responsible use",
    body: "Policies, risk tiers and human review that decide how data and AI may be used.",
    href: "/ai-governance",
  },
  {
    step: "Outcomes",
    title: "AI and digital experiences",
    body: "AI that people can rely on, and Adobe-powered journeys built on accurate, consented profiles.",
    href: "/adobe-services",
  },
] as const;

export const problems = [
  {
    problem: "AI use is expanding without clear oversight",
    detail: "Teams adopt AI tools and features faster than policies, owners and review processes can keep up.",
    href: "/ai-governance",
    service: "AI Governance",
  },
  {
    problem: "Data is fragmented or unreliable",
    detail: "Systems disagree, quality issues surface late, and nobody trusts the numbers.",
    href: "/data-management#quality",
    service: "Data Management",
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
    problem: "Nobody clearly owns the data",
    detail: "Without named owners and stewards, standards are never agreed and issues are never resolved.",
    href: "/data-management#stewardship",
    service: "Data Management",
  },
  {
    problem: "Records and information lifecycles are complex",
    detail: "Retention schedules exist on paper but are applied inconsistently, if at all.",
    href: "/data-management#records",
    service: "Data Management",
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
    activities: "Configure platforms, build integrations, put processes in place, and train the people who will run them.",
    deliverable: "Working solution, documentation and trained teams",
  },
  {
    stage: "Improve",
    activities: "Measure adoption and quality, refine controls and experiences, and extend to new areas.",
    deliverable: "Improvement backlog and ongoing support",
  },
];

/** Practical commitments (not performance claims) used in the credibility section. */
export const commitments = [
  { title: "Specialists in three connected areas", body: "Focused expertise in AI governance, Adobe platforms and data management, and in how they depend on each other." },
  { title: "Tangible deliverables at every stage", body: "Assessments, designs, policies, configurations and runbooks that you own and can act on." },
  { title: "Product experience in records management", body: "We build and support MapleRecord, our records management software for the public sector." },
  { title: "Offices in the US and Canada", body: "Teams in Delaware, Texas and Ontario." },
];
