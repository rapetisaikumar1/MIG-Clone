import type { ServiceContent } from "@/lib/content/types";

/**
 * Sources: the old site's /data-governance page (features: quality, compliance, security, stewardship, lifecycle,
 * metadata; services: strategy, policies and procedures, technology, training and support), its
 * /integrated-data-solutions page (integration across databases, cloud and on-premises systems, quality, real-time
 * access, scalable architecture, analytics, security; ongoing support and optimization), the Records Management
 * service listed in the old navigation, and /maplerecord. Data migration is not stated on the old site, so it is not listed
 * here. Items not stated on the old site are "proposed" (see docs/HANDOFF.md).
 *
 * Wording follows the messaging guide (§5.3, 2026-11-07): Maverick InnoGarage designs, builds, implements and supports
 * this work. Each capability summary states the problem a buyer recognizes, then the outcome we deliver.
 */
export const dataManagement: ServiceContent = {
  slug: "data-management",
  interest: "data-management",
  name: "Data Management",
  meta: {
    title: "Data Management",
    // Guide §5.3 positioning line (158 characters).
    description:
      "Data governance, integration, quality and lifecycle management, designed and implemented so analytics, AI and Adobe experiences start from data you can trust.",
  },
  hero: {
    eyebrow: "Governance · Integration · Quality · Lifecycle",
    title: "Build data your organization can trust, find, and use.",
    lead: "We govern, integrate and improve enterprise data: named owners, quality checks, integrations and retention rules that hold up for analytics, AI and customer experiences.",
  },
  problem: {
    title: "Most data problems are ownership problems first.",
    body: [
      "Data is spread across operational systems, cloud applications, spreadsheets and records repositories. Systems disagree, definitions differ between teams, customers find errors before your checks do, and nobody is sure how long information should be kept.",
      "Every new analytics, AI or personalization project inherits those inconsistencies, and better tools alone don't solve them. We fix the causes: named owners and stewards, integrations around an agreed source, quality checks that catch errors early, and retention rules applied the same way every time.",
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
    { role: "Analytics, AI and marketing teams", need: "Documented data to build on, including consented customer data for Adobe." },
  ],
  capabilitiesIntro:
    "Our services are modular. We design, implement and support the parts you need, from governance roles and policies to integrations, quality checks and retention rules.",
  capabilities: [
    {
      id: "governance",
      title: "Data strategy and governance",
      summary:
        "Data rules often live in documents nobody follows. We set a strategy, policies and decision roles tied to your business goals and the regulations that apply to you, and set up the tools that keep them in use.",
      items: [
        "Governance strategy and roadmap",
        "Policies, standards and procedures",
        "Operating roles and decision forums",
        "Selection and setup of governance tools",
      ],
      provenance: "verified",
    },
    {
      id: "stewardship",
      title: "Ownership and stewardship",
      summary:
        "Nobody owns critical data, so issues wait. We name an owner and a steward for each data domain and train them, so issues reach the right people and get resolved.",
      items: ["Data owner and steward roles", "Decision rights and escalation paths", "Training and ongoing support for owners and stewards"],
      provenance: "verified",
    },
    {
      id: "integration",
      title: "Data integration",
      summary:
        "Systems disagree because each keeps its own copy. We connect databases, cloud services and on-premises systems, so people work from consistent, current data.",
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
      summary:
        "The same errors get fixed by hand, again and again. We build quality rules and validation into your data flows, so data stays accurate and complete without manual fixes.",
      items: ["Data profiling and quality rules", "Cleansing and validation", "Quality monitoring and issue resolution"],
      provenance: "verified",
    },
    {
      id: "metadata",
      title: "Metadata and discoverability",
      summary:
        "People can't use data they can't find or don't understand. We set up shared definitions, metadata and lineage, so data can be found, understood and trusted.",
      items: ["Business glossary and shared definitions", "Metadata management", "Lineage: where critical data comes from and how it changes"],
      provenance: "verified",
    },
    {
      id: "protection",
      title: "Security and access",
      summary:
        "Sensitive information is hard to protect when nobody knows where it is. We classify it and set access rules, so it is protected from unauthorized access and handled in line with your obligations.",
      items: ["Classification of sensitive information", "Role-based access rules", "Alignment with privacy, security and regulatory requirements"],
      provenance: "verified",
    },
    {
      id: "lifecycle",
      title: "Lifecycle and retention",
      summary:
        "Information kept forever adds cost and risk. We put lifecycle management and retention schedules in place, so information is kept while it is needed and disposed of on a documented decision.",
      items: ["Lifecycle management", "Retention schedules", "Defensible disposition, with decisions documented"],
      provenance: "verified",
    },
    {
      // Records Management was an old-site nav label (no page), and MapleRecord is our own product. The first two items
      // are proposed extensions awaiting owner confirmation (register DM-05).
      id: "records",
      title: "Records management",
      summary:
        "Retention schedules that stay on paper don't change daily work. We build record series and file plans with your records staff and put them into use, so retention and access are applied consistently.",
      items: ["Records program assessment", "Record series and file plans", "Records management in MapleRecord, our records management platform"],
      provenance: "proposed",
    },
    {
      // Proposed: the old site does not mention Adobe or AI data readiness (register DM-06).
      id: "foundations",
      title: "Data ready for Adobe, analytics, and AI",
      summary:
        "Profiles, reports and AI tools inherit every error and consent gap in their data. We prepare customer and operational data, and the rules for using it, before the platforms and projects that depend on it go live.",
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
      activities: "Map critical data, systems, owners and pain points, and profile quality where it matters most.",
      deliverable: "Data landscape and maturity assessment",
    },
    {
      stage: "Design",
      activities: "Define the governance model, standards, integration architecture and retention rules.",
      deliverable: "Governance framework, architecture and retention approach",
    },
    {
      stage: "Implement",
      activities: "Put roles and processes in place, build integrations and quality checks, and configure tools.",
      deliverable: "Working governance processes, integrations and quality checks",
    },
    {
      stage: "Improve",
      activities: "Measure quality and adoption, extend governance to new data domains, and adjust as needs change.",
      deliverable: "Quality reporting and an expansion roadmap",
    },
  ],
  deliverables: [
    { title: "Data maturity assessment", description: "Where your data management stands today, and the priorities we implement first." },
    { title: "Governance framework", description: "Policies, standards, forums and how decisions get made." },
    { title: "Ownership matrix", description: "Named owners and stewards for critical data domains." },
    { title: "Integration architecture", description: "How systems connect, which source is authoritative and how data moves." },
    { title: "Quality rules and monitoring", description: "Checks, thresholds and routines that catch issues before they reach reports or customers." },
    { title: "Retention schedule and file plan", description: "Record series, retention periods and disposition steps, which we can configure in MapleRecord." },
  ],
  useCases: [
    {
      title: "One version of customer data",
      context: "A distributor's customer records differ across ERP, CRM and billing, and marketing wants to use them in Adobe Real-Time CDP.",
      approach: "Agree on ownership and a shared customer definition, set matching and quality rules, build the integrations around an agreed source, and record consent so only permitted data reaches Adobe Experience Platform.",
      outcome: "Sales, finance, service and marketing work from consistent customer information, and audiences use only data customers agreed to share.",
    },
    {
      title: "Defensible retention for a municipality",
      context: "A city government keeps records indefinitely because no one is sure what can be destroyed.",
      approach: "Build record series and retention schedules with records staff, configure them in MapleRecord, our records management platform, and set role-based access.",
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
    { title: "Data people trust", description: "Quality checks catch errors before they reach reports, customers or AI systems." },
    { title: "Clear accountability", description: "Every critical dataset has a named owner and steward to resolve issues." },
    { title: "Lower compliance risk", description: "Retention, privacy and access rules applied consistently, with records to show it." },
    { title: "Faster initiatives", description: "Analytics, AI and Adobe projects start from documented data instead of cleanup." },
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
        "You can start with the data that matters most to one outcome, such as a customer view, a regulatory report or an AI use case. We assess how that data is managed today, implement the priorities with you, then extend governance from there instead of trying to cover everything at once.",
    },
    {
      // Verified old-site services: integration across systems, real-time access, scalable architecture, ongoing support and optimization.
      question: "Do you build the integrations, or only design them?",
      answer:
        "Both. We design the integration architecture, implement and consolidate integrations across databases, cloud and on-premises systems, and provide ongoing support and optimization once they are running.",
    },
    {
      question: "Do you work with specific tools?",
      answer:
        "Where possible we work with the technology you already have. When there is a real gap, we select, set up and integrate the tools that support governance.",
    },
    {
      question: "How does data management support Adobe and AI projects?",
      answer:
        "Adobe Experience Platform builds customer profiles from the data you send it, so duplicates, errors and missing consent can flow straight into audiences and personalization. We set quality, identity and consent rules before data is activated, and we apply them in Adobe Experience Platform as part of our Adobe Services. AI governance depends on knowing what data a system uses, who owns it and whether it may be used, which is the same groundwork.",
    },
    {
      question: "How does MapleRecord fit with your records management services?",
      answer:
        "MapleRecord, our records management platform for electronic and physical records, is designed and built by Maverick InnoGarage. When a records program needs software, we configure its retention schedules, record series and access in MapleRecord. Schedules and file plans we develop with you don't depend on any particular system.",
    },
  ],
  cta: {
    title: "Fix the data your next project depends on.",
    body: "Tell us about the systems, data and outcomes that matter most. We'll scope a practical first step with you.",
  },
};
