import type { ServiceContent } from "@/lib/content/types";

/**
 * Pillar 01 of the Capability Matrix (Capability Deck, October 2026): Data & Analytics. The URL stays /data-management
 * for SEO; its insights theme is also "Data & Analytics".
 *
 * Sources: the deck's Data & Analytics pillar (Data Strategy & Analytics; Data Governance & Data Management; Regulatory
 * Compliance, Data Quality & Security; Modern Data Architecture & Engineering; Integrated Data Solutions, unifying
 * multi-source enterprise data pipelines for accuracy and accessibility; Data Science; Data Storytelling &
 * Visualization; predictive modeling and executive insights; "governed, AI-ready assets"), the old site's
 * /data-governance page (quality, compliance, security, stewardship, lifecycle, metadata; strategy, policies and
 * procedures, technology, training and support) and /integrated-data-solutions page (integration across databases,
 * cloud and on-premises systems, real-time access, scalable architecture, analytics, ongoing support and
 * optimization), and the deck's records pillar (MapleRecord, MOLI). AI/ML enablement and cloud engineering belong to
 * pillar 02 (/software-development); this page links there instead of repeating them.
 *
 * Capability ids are link targets: /data-governance redirects to #governance, /integrated-data-solutions to
 * #integration, and the home page links #quality and #records. Keep those ids.
 */
export const dataManagement: ServiceContent = {
  slug: "data-management",
  interest: "data-management",
  name: "Data & Analytics",
  insightTheme: "Data & Analytics",
  meta: {
    // The owner also calls this pillar "Data Management" and the URL uses it, so the page title leads with it.
    title: "Data Management & Analytics",
    description:
      "Data management and governance, strategy, architecture, integration, data science and visualization that turn fragmented data into governed, AI-ready assets.",
  },
  hero: {
    eyebrow: "Data management · Governance · Analytics",
    title: "Build data your organization can trust and act on.",
    lead: "Data management and governance come first. We turn fragmented enterprise data into governed, AI-ready assets, with named owners, quality and security controls and modern pipelines, then build the models and dashboards leaders act on.",
  },
  problem: {
    title: "Most data problems are ownership problems first.",
    body: [
      "Data is spread across operational systems, cloud applications, spreadsheets and records repositories. Systems disagree, definitions differ between teams, and customers find errors before your checks do.",
      "Every new analytics, AI or personalization project inherits those inconsistencies, and better tools alone don't solve them. We fix the causes, from ownership and quality rules to pipelines and retention, then build the analytics and models on top.",
    ],
    signals: [
      "Different systems give different answers to the same question",
      "No named owner for critical data",
      "The same quality problems fixed by hand, over and over",
      "Reports that leaders question instead of act on",
      "AI projects stalled on data nobody has approved",
      "Records kept forever, or disposed of inconsistently",
    ],
  },
  audience: [
    { role: "Chief data officers and data leaders", need: "A data strategy and governance program that people actually follow." },
    { role: "IT and enterprise architecture", need: "A modern data platform and pipelines that replace fragile point-to-point connections." },
    { role: "Executives and business leaders", need: "Forecasts and dashboards they trust enough to make decisions on." },
    { role: "Analytics, AI and marketing teams", need: "Documented, approved data to build on, including consented customer data for Adobe." },
    { role: "Risk, privacy and compliance teams", need: "Sensitive data classified and controlled, with evidence that the rules are applied." },
    { role: "Records and information managers", need: "Retention and disposition that are consistent and defensible." },
  ],
  capabilitiesIntro:
    "Our services are modular. We design, build and support the parts you need, from strategy, data management and governance to pipelines, models and dashboards. Cloud platforms and AI/ML enablement come from our Engineering\u00a0&\u00a0Technology practice.",
  capabilities: [
    {
      id: "strategy",
      title: "Data strategy and analytics",
      summary:
        "Data investments drift when nobody has agreed what the data is for. We set a data and analytics strategy tied to business goals, and sequence the work that delivers it.",
      items: [
        "Data and analytics maturity assessment",
        "Data strategy tied to business outcomes",
        "Analytics roadmap and prioritized use cases",
        "Success measures for each initiative",
      ],
      provenance: "verified",
    },
    {
      id: "governance",
      title: "Data governance and data management",
      summary:
        "Data rules often live in documents nobody follows. We put owners, policies and shared definitions in place that stay in use, and manage data consistently across systems.",
      items: [
        "Governance policies, standards and decision forums",
        "Named data owners and stewards, with training and support",
        "Business glossary, metadata and lineage",
        "Data management standards applied across systems",
      ],
      provenance: "verified",
    },
    {
      id: "quality",
      title: "Regulatory compliance, data quality and security",
      summary:
        "The same errors get fixed by hand, and sensitive data is hard to protect when nobody knows where it is. We build quality rules into your data flows and classify and control sensitive information.",
      items: [
        "Data profiling, quality rules and validation",
        "Quality monitoring and issue resolution",
        "Classification of sensitive information and role-based access",
        "Controls designed to support GDPR, CCPA and other obligations",
      ],
      provenance: "verified",
    },
    {
      id: "architecture",
      title: "Modern data architecture and engineering",
      summary:
        "Legacy warehouses and one-off extracts can't keep up with new sources and uses. We design and engineer data platforms that scale with your data and serve analytics and AI from one governed foundation.",
      items: [
        "Target data architecture and platform design",
        "Data engineering: ingestion, transformation and modeling",
        "Scalable architecture that grows with data volumes",
        "Cloud data platforms on AWS and Azure, built with Engineering & Technology",
      ],
      provenance: "verified",
    },
    {
      id: "integration",
      title: "Integrated data solutions",
      summary:
        "Systems disagree because each keeps its own copy. We unify multi-source enterprise data pipelines across databases, cloud services and on-premises systems, so data is accurate and accessible.",
      items: [
        "Integration strategy and architecture",
        "Multi-source pipelines and consolidation across systems",
        "Real-time access where decisions depend on it",
        "Ongoing support and optimization",
      ],
      provenance: "verified",
    },
    {
      id: "data-science",
      title: "Data science and predictive modeling",
      summary:
        "Historical reports explain what happened but not what comes next. We build predictive models on governed data and turn their results into executive insights.",
      items: [
        "Exploratory and statistical analysis",
        "Predictive modeling",
        "Executive insights tied to specific decisions",
        "Production models through AI/ML enablement in Engineering & Technology",
      ],
      provenance: "verified",
    },
    {
      id: "visualization",
      title: "Data storytelling and visualization",
      summary:
        "Dashboards nobody opens don't change decisions. We design visualizations and data stories around the questions leaders ask, built on shared definitions so the numbers agree.",
      items: [
        "Dashboards and executive reporting",
        "Data storytelling for leadership and board audiences",
        "Shared metric definitions across reports",
        "Analytics built on governed, documented data",
      ],
      provenance: "verified",
    },
    {
      id: "foundations",
      title: "AI-ready data",
      summary:
        "Profiles, reports and AI tools inherit every error and consent gap in their data. We prepare customer and operational data, and the rules for using it, before the platforms and projects that depend on it go live.",
      items: [
        "Documented, approved datasets for AI and analytics",
        "Data requirements and approvals for AI use cases",
        "Quality, identity and consent rules for customer profiles",
        "AI governance for the systems that use the data",
      ],
      platforms: ["Adobe Experience Platform", "Real-Time CDP"],
      provenance: "verified",
    },
    {
      // Lifecycle and retention come from the old /data-governance page; MapleRecord and MOLI are the deck's records pillar.
      id: "records",
      title: "Lifecycle, retention and records",
      summary:
        "Information kept forever adds cost and risk, and retention schedules on paper don't change daily work. We put lifecycle rules into use, so information is kept while needed and disposed of on a documented decision.",
      items: [
        "Retention schedules, record series and file plans",
        "Defensible disposition, with decisions documented",
        "Records management in MapleRecord, our records platform",
        "AI-driven record management with MOLI",
      ],
      provenance: "verified",
    },
  ],
  approach: [
    {
      stage: "Understand & strategize",
      activities:
        "Map critical data, systems, owners and pain points, profile quality where it matters most, and agree the decisions and use cases the data must serve.",
      deliverable: "Data landscape assessment and a prioritized data strategy",
    },
    {
      stage: "Implement & integrate",
      activities:
        "Put governance roles and policies in place, build the architecture, pipelines and quality checks, and deliver the first models and dashboards with minimal disruption.",
      deliverable: "Working governance, integrated pipelines and first analytics",
    },
    {
      stage: "Optimize & grow",
      activities:
        "Monitor quality, adoption and model performance, extend governance to new data domains, and refine analytics as needs change.",
      deliverable: "Quality and usage reporting and an expansion roadmap",
    },
  ],
  deliverables: [
    { title: "Data strategy and maturity assessment", description: "Where your data stands today, the outcomes it must support, and the priorities we implement first." },
    { title: "Governance framework and ownership matrix", description: "Policies, standards, decision forums, and named owners and stewards for critical data domains." },
    { title: "Data architecture and pipelines", description: "How systems connect, which source is authoritative, and working pipelines that move data reliably." },
    { title: "Quality rules and monitoring", description: "Checks, thresholds and routines that catch issues before they reach reports, customers or AI systems." },
    { title: "Models, dashboards and executive insights", description: "Predictive models and visualizations built on governed data, with the definitions behind every number." },
    { title: "Retention schedule and file plan", description: "Record series, retention periods and disposition steps, which we can configure in MapleRecord." },
  ],
  useCases: [
    {
      title: "One version of customer data",
      context: "A distributor's customer records differ across ERP, CRM and billing, and marketing wants to use them in Adobe Real-Time CDP.",
      approach: "Agree on ownership and a shared customer definition, set matching and quality rules, build pipelines around an agreed source, and record consent so only permitted data reaches Adobe Experience Platform.",
      outcome: "Sales, finance, service and marketing work from consistent customer information, and audiences use only data customers agreed to share.",
    },
    {
      title: "Forecasts leadership acts on",
      context: "A manufacturer's leadership team receives regional sales reports that use different definitions and arrive weeks late.",
      approach: "Consolidate the sources into one governed model, agree metric definitions, build a predictive demand model, and present it in an executive dashboard.",
      outcome: "Leaders review one set of numbers, with a forecast and the assumptions behind it.",
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
      question: "What does your Data & Analytics practice cover?",
      answer:
        "Data strategy and analytics, data governance and management, regulatory compliance, data quality and security, modern data architecture and engineering, integrated data solutions, data science, and data storytelling and visualization. Together they turn fragmented enterprise data into governed, AI-ready assets.",
    },
    {
      question: "What is data governance?",
      answer:
        "Data governance is how an organization manages the availability, usability, integrity and security of its data. It covers who is accountable for data, the policies and standards that apply, and the processes that keep data accurate and compliant.",
    },
    {
      question: "Where do you start?",
      answer:
        "You can start with the data that matters most to one outcome, such as a customer view, an executive dashboard, a regulatory report or an AI use case. We assess how that data is managed today, implement the priorities with you, then extend from there instead of trying to cover everything at once.",
    },
    {
      question: "Do you build the pipelines and models, or only design them?",
      answer:
        "Both. We design the architecture, build and consolidate pipelines across databases, cloud and on-premises systems, develop models and dashboards, and provide ongoing support and optimization once they are running.",
    },
    {
      question: "How does this relate to cloud engineering and AI/ML enablement?",
      answer:
        "Our Engineering & Technology practice builds and runs the cloud platforms on AWS and Azure and takes models into production through AI/ML enablement. Data & Analytics makes sure the data those platforms and models use is governed, high quality and approved for use. Most programs draw on both.",
    },
    {
      question: "How does data management support Adobe and AI projects?",
      answer:
        "Adobe Experience Platform builds customer profiles from the data you send it, so duplicates, errors and missing consent can flow straight into audiences and personalization. We set quality, identity and consent rules before data is activated and apply them in Adobe Experience Platform as part of our Adobe services. AI governance depends on the same groundwork: knowing what data a system uses, who owns it and whether it may be used.",
    },
    {
      question: "How do MapleRecord and MOLI fit with your records work?",
      answer:
        "MapleRecord, our records management platform for electronic and physical records, and MOLI, our AI-driven record management system, are designed and built by Maverick InnoGarage. When a records program needs software, we configure retention schedules, record series and access in them. Schedules and file plans we develop with you don't depend on any particular system.",
    },
  ],
  cta: {
    title: "Fix the data your next project depends on.",
    body: "Tell us about the systems, data and decisions that matter most. We'll scope a practical first step with you.",
  },
};
