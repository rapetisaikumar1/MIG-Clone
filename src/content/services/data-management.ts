import type { ServiceContent } from "@/lib/content/types";

/**
 * Sources: the existing /data-governance and /integrated-data-solutions pages, the Records Management
 * service listed in the old navigation, and /maplerecord. Items not stated on the old site are "proposed".
 */
export const dataManagement: ServiceContent = {
  slug: "data-management",
  interest: "data-management",
  name: "Data Management",
  meta: {
    title: "Data Management",
    description:
      "Data governance, integration, quality, metadata, lifecycle and records management, building trusted data foundations for analytics, AI and customer experiences.",
  },
  hero: {
    eyebrow: "Data Management",
    title: "Build data your organization can trust, find, and use.",
    lead: "We help you govern, integrate, and improve enterprise data, with clear ownership, reliable quality, and lifecycle controls that hold up for analytics, AI, and customer experiences.",
  },
  problem: {
    title: "Most data problems are ownership problems first.",
    body: [
      "Data is spread across operational systems, cloud applications, spreadsheets and records repositories. Definitions differ between teams, customers find quality issues before your controls do, and nobody is sure how long information should be kept.",
      "These problems compound as organizations invest in analytics, AI and personalization, because each new initiative inherits the inconsistencies underneath it. Lasting improvement combines technology with clear accountability and practical processes.",
    ],
    signals: [
      "Different systems give different answers to the same question",
      "No named owner for critical data",
      "The same quality problems fixed by hand, over and over",
      "Uncertainty about what data exists and where it lives",
      "Records kept forever, or disposed of inconsistently",
    ],
  },
  audience: [
    { role: "Chief data officers and data leaders", need: "A governance program that people actually follow." },
    { role: "IT and enterprise architecture", need: "Integration patterns that reduce point-to-point complexity." },
    { role: "Records and information managers", need: "Retention and disposition that are consistent and defensible." },
    { role: "Analytics and AI teams", need: "Reliable, documented data to build on." },
  ],
  capabilitiesIntro:
    "We start with the data that matters most to a specific outcome, then extend governance and integration from there.",
  capabilities: [
    {
      id: "governance",
      title: "Data strategy and governance",
      summary: "A governance approach aligned to business goals and the obligations that apply to you.",
      items: ["Governance strategy and roadmap", "Policies, standards and procedures", "Governance operating model and forums"],
      provenance: "verified",
    },
    {
      id: "stewardship",
      title: "Ownership and stewardship",
      summary: "Clear roles and responsibilities for managing data assets.",
      items: ["Data owner and steward roles", "Decision rights and escalation paths", "Steward onboarding and training"],
      provenance: "verified",
    },
    {
      id: "integration",
      title: "Integration and migration",
      summary: "Data from databases, cloud services and on-premises systems brought together consistently.",
      items: ["Integration strategy and architecture", "Implementation across systems", "Migration planning and validation"],
      provenance: "verified",
    },
    {
      id: "quality",
      title: "Quality and validation",
      summary: "Accurate, complete and reliable data, maintained by process rather than heroics.",
      items: ["Data profiling and quality rules", "Cleansing and validation", "Quality monitoring and issue resolution"],
      provenance: "verified",
    },
    {
      id: "metadata",
      title: "Metadata and discoverability",
      summary: "Data that people can find, understand and trust.",
      items: ["Business glossary and definitions", "Metadata management", "Lineage for critical data"],
      provenance: "verified",
    },
    {
      id: "protection",
      title: "Access and information protection",
      summary: "Sensitive information protected from unauthorized access and misuse.",
      items: ["Classification of sensitive information", "Role-based access principles", "Alignment with privacy and security requirements"],
      provenance: "verified",
    },
    {
      id: "lifecycle",
      title: "Lifecycle and retention",
      summary: "Information managed from creation to disposal, so it stays accurate and relevant.",
      items: ["Lifecycle management", "Retention schedules", "Defensible disposition"],
      provenance: "verified",
    },
    {
      id: "records",
      title: "Records management",
      summary: "Records programs and software that make retention and access consistent.",
      items: ["Records program assessment", "Record series and file plans", "Records software, including MapleRecord"],
      provenance: "verified",
    },
    {
      id: "foundations",
      title: "Foundations for analytics, AI and experiences",
      summary: "Data prepared for the initiatives that depend on it.",
      items: ["Analytics-ready, documented datasets", "Data requirements for AI use cases", "Customer data foundations for Adobe platforms"],
      provenance: "proposed",
    },
  ],
  approach: [
    {
      stage: "Assess",
      activities: "Map critical data, systems, owners and pain points, and profile quality where it matters most.",
      deliverable: "Data landscape and maturity assessment",
    },
    {
      stage: "Design",
      activities: "Define the governance model, standards, integration architecture and lifecycle rules.",
      deliverable: "Governance framework, architecture and retention approach",
    },
    {
      stage: "Implement",
      activities: "Put roles and processes in place, build integrations and quality controls, and configure tooling.",
      deliverable: "Working governance processes, integrations and quality controls",
    },
    {
      stage: "Improve",
      activities: "Measure quality and adoption, extend governance to new domains, and refine as needs change.",
      deliverable: "Quality reporting and an expansion roadmap",
    },
  ],
  deliverables: [
    { title: "Data maturity assessment", description: "Where your data practices stand today and what to address first." },
    { title: "Governance framework", description: "Policies, standards, forums, and how decisions get made." },
    { title: "Ownership matrix", description: "Named owners and stewards for critical data domains." },
    { title: "Integration architecture", description: "How systems connect, which source is authoritative, and how data moves." },
    { title: "Quality rules and monitoring", description: "Defined checks, thresholds and routines for resolving issues." },
    { title: "Retention schedule and file plan", description: "Record series, retention periods and disposition steps." },
  ],
  useCases: [
    {
      title: "One version of customer data",
      context: "A distributor's customer records differ across ERP, CRM and billing.",
      approach: "Define ownership and a shared customer definition, set matching and quality rules, and integrate the systems around an agreed source.",
      outcome: "Sales, finance and service work from consistent customer information.",
    },
    {
      title: "Defensible retention for a municipality",
      context: "A city government keeps records indefinitely because no one is sure what can be destroyed.",
      approach: "Build record series and retention schedules with records staff, configure them in a records system such as MapleRecord, and set role-based access.",
      outcome: "Retention is applied consistently, and disposition decisions are documented.",
    },
    {
      title: "Data readiness for an AI initiative",
      context: "A financial services team wants to use internal documents and transaction data in an AI assistant.",
      approach: "Classify the data, confirm ownership and permitted uses, improve quality for the fields that matter, and document lineage.",
      outcome: "The AI project starts from data that is understood, approved and fit for purpose.",
    },
  ],
  benefits: [
    { title: "Better data quality", description: "More reliable data for operations and decision-making." },
    { title: "Clear accountability", description: "Every critical dataset has an owner and a steward." },
    { title: "Reduced compliance risk", description: "Consistent handling of retention, privacy and access requirements." },
    { title: "Faster initiatives", description: "Analytics, AI and Adobe projects start from data that's ready." },
  ],
  faqs: [
    {
      question: "What is data governance?",
      answer:
        "Data governance is how an organization manages the availability, usability, integrity and security of its data. It covers who is accountable for data, the policies and standards that apply, and the processes that keep data accurate and compliant.",
    },
    {
      question: "Where do you start?",
      answer:
        "With the data that matters most to a specific outcome, such as a customer view, a regulatory report or an AI use case. Governance grows from there, instead of trying to cover everything at once.",
    },
    {
      question: "Do you recommend specific tools?",
      answer: "Where possible we work with the technology you already have, and recommend new tooling only when it addresses a real gap.",
    },
    {
      question: "What is MapleRecord?",
      answer:
        "MapleRecord is an AI-first hybrid records management system for electronic and physical records, built for enterprises and public-sector organizations in regulated environments. It brings records, information requests, workflows and forms together in one platform.",
    },
    {
      question: "How does data management support AI and Adobe initiatives?",
      answer:
        "Both depend on trusted data. AI governance relies on knowing what data a system uses and who owns it, and Adobe personalization relies on accurate, consented customer profiles. Good data management makes both easier and safer.",
    },
  ],
  cta: {
    title: "Find out where your data foundation needs work.",
    body: "Tell us about the systems, data and outcomes that matter most. We'll help you decide where to begin.",
  },
};
