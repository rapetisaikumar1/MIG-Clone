import type { ServiceContent } from "@/lib/content/types";

/**
 * Sources: the old site's /data-governance page (features: quality, compliance, security, stewardship, lifecycle,
 * metadata; services: strategy, policies and procedures, technology, training and support), its
 * /integrated-data-solutions page (integration across databases, cloud and on-premises systems, quality, real-time
 * access, scalable architecture, analytics, security; ongoing support and optimization), the Records Management
 * service listed in the old navigation, and /maplerecord. Data migration is not stated on the old site, so it is not listed
 * here. Items not stated on the old site are "proposed" (see docs/HANDOFF.md).
 */
export const dataManagement: ServiceContent = {
  slug: "data-management",
  interest: "data-management",
  name: "Data Management",
  meta: {
    title: "Data Management",
    description:
      "Data governance, integration, quality, metadata, retention and records management, so analytics, AI and Adobe experiences start from data you can trust.",
  },
  hero: {
    eyebrow: "Data Management",
    title: "Build data your organization can trust, find, and use.",
    lead: "We help you govern, integrate, and improve enterprise data, with named owners, quality checks, and retention rules that hold up for analytics, AI, and customer experiences.",
  },
  problem: {
    title: "Most data problems are ownership problems first.",
    body: [
      "Data is spread across operational systems, cloud applications, spreadsheets, and records repositories. Definitions differ between teams, customers find errors before your checks do, and nobody is sure how long information should be kept.",
      "Every new analytics, AI, or personalization project inherits those inconsistencies. Better tools alone don't fix them. Lasting improvement comes from clear accountability, practical processes, and technology that supports both.",
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
    { role: "IT and enterprise architecture", need: "Integration that replaces fragile point-to-point connections." },
    { role: "Records and information managers", need: "Retention and disposition that are consistent and defensible." },
    { role: "Analytics, AI, and marketing teams", need: "Documented data to build on, including consented customer data for Adobe." },
  ],
  capabilitiesIntro:
    "We start with the data that matters most to a specific outcome, then extend governance and integration from there.",
  capabilities: [
    {
      id: "governance",
      title: "Data strategy and governance",
      summary: "A governance approach tied to your business goals and the regulations that apply to you.",
      items: [
        "Governance strategy and roadmap",
        "Policies, standards, and procedures",
        "Operating model and decision forums",
        "Selection and setup of governance tools",
      ],
      provenance: "verified",
    },
    {
      id: "stewardship",
      title: "Ownership and stewardship",
      summary: "Clear roles and responsibilities for managing data assets.",
      items: ["Data owner and steward roles", "Decision rights and escalation paths", "Training and ongoing support for owners and stewards"],
      provenance: "verified",
    },
    {
      id: "integration",
      title: "Data integration",
      summary: "Databases, cloud services, and on-premises systems connected, so people work from consistent, current data.",
      items: [
        "Integration strategy and architecture that scales",
        "Implementation and consolidation across systems",
        "Real-time access where decisions depend on it",
        "Ongoing support and optimization",
      ],
      provenance: "verified",
    },
    {
      id: "quality",
      title: "Quality and validation",
      summary: "Accurate, complete data, kept that way by routine checks instead of manual fixes.",
      items: ["Data profiling and quality rules", "Cleansing and validation", "Quality monitoring and issue resolution"],
      provenance: "verified",
    },
    {
      id: "metadata",
      title: "Metadata and discoverability",
      summary: "Data that people can find, understand, and trust.",
      items: ["Business glossary and shared definitions", "Metadata management", "Lineage: where critical data comes from and how it changes"],
      provenance: "verified",
    },
    {
      id: "protection",
      title: "Security and compliance",
      summary: "Sensitive information protected from unauthorized access and handled in line with your obligations.",
      items: ["Classification of sensitive information", "Role-based access rules", "Alignment with privacy, security, and regulatory requirements"],
      provenance: "verified",
    },
    {
      id: "lifecycle",
      title: "Lifecycle and retention",
      summary: "Information managed from creation to disposal, so it stays accurate and relevant.",
      items: ["Lifecycle management", "Retention schedules", "Defensible disposition, with decisions documented"],
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
      title: "Data ready for Adobe, analytics, and AI",
      summary: "Customer and operational data prepared for the platforms and projects that depend on it.",
      items: [
        "Quality and identity rules for customer profiles",
        "Consent and usage rules defined before data is activated",
        "Documented, analytics-ready datasets",
        "Data requirements and approvals for AI use cases",
      ],
      platforms: ["Adobe Experience Platform", "Real-Time CDP"],
      provenance: "proposed",
    },
  ],
  approach: [
    {
      stage: "Assess",
      activities: "Map critical data, systems, owners, and pain points, and profile quality where it matters most.",
      deliverable: "Data landscape and maturity assessment",
    },
    {
      stage: "Design",
      activities: "Define the governance model, standards, integration architecture, and retention rules.",
      deliverable: "Governance framework, architecture, and retention approach",
    },
    {
      stage: "Implement",
      activities: "Put roles and processes in place, build integrations and quality checks, and configure tools.",
      deliverable: "Working governance processes, integrations, and quality checks",
    },
    {
      stage: "Improve",
      activities: "Measure quality and adoption, extend governance to new data domains, and adjust as needs change.",
      deliverable: "Quality reporting and an expansion roadmap",
    },
  ],
  deliverables: [
    { title: "Data maturity assessment", description: "Where your data practices stand today and what to address first." },
    { title: "Governance framework", description: "Policies, standards, forums, and how decisions get made." },
    { title: "Ownership matrix", description: "Named owners and stewards for critical data domains." },
    { title: "Integration architecture", description: "How systems connect, which source is authoritative, and how data moves." },
    { title: "Quality rules and monitoring", description: "Defined checks, thresholds, and routines for resolving issues." },
    { title: "Retention schedule and file plan", description: "Record series, retention periods, and disposition steps." },
  ],
  useCases: [
    {
      title: "One version of customer data",
      context: "A distributor's customer records differ across ERP, CRM, and billing, and marketing wants to use them in Adobe Real-Time CDP.",
      approach: "Agree on ownership and a shared customer definition, set matching and quality rules, integrate around an agreed source, and record consent so only permitted data reaches Adobe Experience Platform.",
      outcome: "Sales, finance, service, and marketing work from consistent customer information, and audiences use only data customers agreed to share.",
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
      outcome: "The AI project starts from data that is understood, approved, and fit for purpose.",
    },
  ],
  benefits: [
    { title: "Data people trust", description: "Quality checks catch errors before they reach reports, customers, or AI systems." },
    { title: "Clear accountability", description: "Every critical dataset has a named owner and steward to resolve issues." },
    { title: "Lower compliance risk", description: "Retention, privacy, and access rules applied consistently, with records to show it." },
    { title: "Faster initiatives", description: "Analytics, AI, and Adobe projects start from documented data instead of cleanup." },
  ],
  faqs: [
    {
      question: "What is data governance?",
      answer:
        "Data governance is how an organization manages the availability, usability, integrity, and security of its data. It covers who is accountable for data, the policies and standards that apply, and the processes that keep data accurate and compliant.",
    },
    {
      question: "Where do you start?",
      answer:
        "With the data that matters most to a specific outcome, such as a customer view, a regulatory report, or an AI use case. We assess current practices for that data, then extend governance from there instead of trying to cover everything at once.",
    },
    {
      question: "Do you recommend specific tools?",
      answer:
        "Where possible we work with the technology you already have. When there is a real gap, we help you select, set up, and integrate tools that support governance.",
    },
    {
      question: "How does data management support Adobe and AI projects?",
      answer:
        "Adobe Experience Platform builds customer profiles from the data you send it, so duplicates, errors, and missing consent can flow straight into audiences and personalization. We set quality, identity, and consent rules before data is activated, and our Adobe Services team applies them in the platform. AI governance depends on knowing what data a system uses, who owns it, and whether it may be used, which is the same groundwork.",
    },
    {
      question: "How does MapleRecord fit with your records management services?",
      answer:
        "MapleRecord is our records management platform for electronic and physical records. When a records program needs software, we can configure its retention schedules, record series, and access in MapleRecord. Schedules and file plans we develop with you don't depend on any particular system.",
    },
  ],
  cta: {
    title: "Find out where your data foundation needs work.",
    body: "Tell us about the systems, data, and outcomes that matter most. We'll help you decide where to begin.",
  },
};
