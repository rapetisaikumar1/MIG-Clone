import type { AdobeProductSlug } from "@/lib/content/types";

/**
 * Adobe platform assessment landing page (/adobe-services/assessment).
 *
 * Basis (verified, src/content/services/adobe-services.ts): the "Understand & strategize" stage ("Review your
 * current Adobe setup, data flows, use cases and team practices" → platform assessment and roadmap),
 * the "Platform assessment" deliverable, and the FAQ "Can you improve an existing implementation?".
 * Everything else is new copy (proposed) — it describes the scope of the work only. It deliberately names
 * no durations, prices, clients, metrics or certifications.
 * Framing (messaging guide §4.1, §5.2): the assessment is the first phase of delivery — start with an
 * assessment, then we implement the priorities with you — not a standalone report.
 */

type TitledText = { title: string; body: string };

export type AdobeAssessmentContent = {
  name: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  /** Right-hand hero card: the offer at a glance (scope, approach, outputs, next steps). */
  summary: { title: string; items: { label: string; value: string }[]; note: string };
  situations: { eyebrow: string; title: string; intro: string; items: TitledText[] };
  review: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Neutral technical review areas per application (3–4 each), in Adobe's own terminology. */
    byProduct: Record<AdobeProductSlug, string[]>;
    /** Tile for visitors who use an Adobe application not listed (restates the hub FAQ answer). */
    other: { title: string; body: string; label: string };
    crossCutting: { title: string; intro: string; items: TitledText[] };
  };
  steps: { eyebrow: string; title: string; intro: string; items: { title: string; activities: string; output: string }[] };
  deliverables: { eyebrow: string; title: string; intro: string; items: TitledText[] };
  requirements: { eyebrow: string; title: string; intro: string; items: TitledText[] };
  faqs: { question: string; answer: string }[];
  cta: { title: string; body: string };
};

export const adobeAssessment: AdobeAssessmentContent = {
  name: "Adobe platform assessment",
  meta: {
    title: "Adobe Platform Assessment",
    description:
      "The first phase of Adobe delivery: a scoped review of your setup, data flows and use cases that ends in prioritized opportunities and a roadmap to implement.",
  },
  hero: {
    // The four steps below, as on the AI Governance and Data Management heroes.
    eyebrow: "Scope · Review · Prioritize · Roadmap",
    title: "Find out what's holding your Adobe platforms back.",
    lead: "A scoped review of your Adobe setup, from configuration and data flows to use cases and team practices, that ends with prioritized opportunities and a roadmap to implement. It's the first phase of delivery, not a standalone report.",
  },
  summary: {
    title: "At a glance",
    items: [
      { label: "Scope", value: "One Adobe application or several, and the connections between them" },
      { label: "Approach", value: "Team interviews and a review of configuration and data flows" },
      { label: "You receive", value: "Report, current-state map and prioritized roadmap, plus a readout" },
      { label: "Afterwards", value: "We implement the priorities with you, or your team acts on the roadmap" },
    ],
    note: "The applications in scope, the depth of review and the timeline are agreed with you before work starts.",
  },
  situations: {
    eyebrow: "When it helps",
    title: "Who an assessment is for",
    intro: "An assessment helps when you need a clear, shared picture of your Adobe setup before deciding what to implement next.",
    items: [
      {
        title: "Progress stalled after go-live",
        body: "The platform launched, but new use cases, adoption or optimization haven't moved forward since.",
      },
      {
        title: "Reports don't reconcile",
        body: "Numbers differ between Adobe applications, your CRM or internal reporting, and it isn't clear why.",
      },
      {
        title: "You're planning a new use case",
        body: "You want to know whether the current setup can support it, and what would need to change first.",
      },
      {
        title: "You're adding another Adobe application",
        body: "Before expanding, you want to understand how the new application would connect to what is already in place.",
      },
      {
        title: "A new team has inherited the setup",
        body: "The people who built it have moved on, documentation is thin, and you need to know how it works today.",
      },
    ],
  },
  review: {
    eyebrow: "What we review",
    title: "Application by application, and the connections between them",
    intro: "An assessment can cover one Adobe application or several. These are the areas it covers for each, adjusted to the scope we agree with you.",
    byProduct: {
      "experience-platform": [
        "XDM schemas and identity namespaces",
        "Sources, datasets and data ingestion",
        "Data usage labels, governance and consent policies",
        "Sandboxes and access permissions",
      ],
      "real-time-cdp": [
        "Audience definitions and evaluation methods",
        "Merge policies and profile configuration",
        "Destinations and activation dataflows",
        "Consent and data usage policy enforcement",
      ],
      "experience-manager": [
        "Components and editable templates",
        "Authoring and publishing workflows",
        "Multi Site Manager and language copies",
        "Asset organization and metadata in AEM Assets",
      ],
      analytics: [
        "Data collection through Tags or Web\u00a0SDK",
        "Report suites, eVars, props and events",
        "Data quality and consistency",
        "Analysis Workspace projects in use",
      ],
      target: [
        "Implementation through at.js or Web\u00a0SDK",
        "Activity types, setup and goal metrics",
        "Audiences and targeting rules",
        "Reporting source, including Analytics for Target (A4T)",
      ],
      "marketo-engage": [
        "Lead lifecycle and scoring",
        "Program and smart campaign structure",
        "Salesforce or Microsoft Dynamics sync",
        "Database health and reporting",
      ],
      commerce: [
        "Catalog, websites and store views",
        "Extensions and custom code",
        "Performance and caching",
        "Version, patches and upgrade path",
      ],
      "content-management": [
        "Content types, templates and Content Fragment Models",
        "Authoring, review and approval workflows",
        "Metadata, tagging and asset expiry",
        "Publishing to sites, apps and language copies",
      ],
    },
    other: {
      title: "Using another Adobe application?",
      body: "Tell us what you use, and we'll tell you plainly whether we're a good fit.",
      label: "Ask about your setup",
    },
    crossCutting: {
      title: "Across every application",
      intro: "Many issues sit between applications rather than inside one, so these areas are part of every assessment.",
      items: [
        {
          title: "Data flows between applications",
          body: "How data moves between your Adobe applications, and where it is delayed, duplicated or inconsistent.",
        },
        {
          title: "Integrations",
          body: "Connections to CRM, ERP and data platforms: what is connected, how, and who maintains it.",
        },
        {
          title: "Governance and access",
          body: "User roles and permissions, data usage policies and consent handling across applications.",
        },
        {
          title: "Team practices and documentation",
          body: "How changes are requested, built, tested and released, and what is written down.",
        },
      ],
    },
  },
  steps: {
    eyebrow: "How it works",
    title: "Four steps from scope to roadmap",
    intro: "Each step has a defined output, so you can see what's been found before the final readout. The roadmap then sets the order of implementation.",
    items: [
      {
        title: "Scope and access",
        activities: "We agree the applications, use cases and questions in scope, who we'll speak with, and the access needed.",
        output: "Agreed scope and plan",
      },
      {
        title: "Interviews and configuration review",
        activities: "We talk with the people who use and run the platforms, and review configuration, implementation and data flows.",
        output: "Current-state observations",
      },
      {
        title: "Findings and prioritization",
        activities: "We consolidate what we found and rank opportunities by business impact, effort and dependencies.",
        output: "Prioritized opportunities",
      },
      {
        title: "Readout and roadmap",
        activities: "We walk your stakeholders through the findings and agree the sequence in which the priorities are implemented.",
        output: "Assessment report and roadmap",
      },
    ],
  },
  deliverables: {
    eyebrow: "Deliverables",
    title: "What you'll have at the end",
    intro: "Written for the people who will make decisions and do the work, whether that's your team or ours.",
    items: [
      {
        title: "Platform assessment report",
        body: "How your Adobe applications are configured and used, where the gaps are, and the prioritized opportunities.",
      },
      {
        title: "Current-state map",
        body: "Your applications, data flows and integrations as they work today, in one view.",
      },
      {
        title: "Prioritized recommendations and roadmap",
        body: "What to address first and why, with dependencies and a suggested sequence.",
      },
      {
        title: "Readout session",
        body: "A working session to walk through the findings with your stakeholders and answer their questions.",
      },
    ],
  },
  requirements: {
    eyebrow: "Before we start",
    title: "What we'll need from you",
    intro: "The details are agreed at scoping. In general, an assessment needs four things.",
    items: [
      {
        title: "Access",
        body: "Read-only access to the applications in scope where possible, or a guided walkthrough with your team.",
      },
      {
        title: "A few stakeholders",
        body: "Time with the people who use, run and depend on the platforms — for example marketing, analytics and development.",
      },
      {
        title: "Your goals",
        body: "The business questions, planned use cases or problems you want the assessment to focus on.",
      },
      {
        title: "Existing documentation",
        body: "Any solution designs, architecture diagrams or tracking plans you already have. It's fine if there are none.",
      },
    ],
  },
  faqs: [
    {
      question: "How long does an assessment take, and what does it cost?",
      answer:
        "Both depend on the number of applications in scope and the depth of review. We agree the scope with you first, then confirm the timeline and cost before any work starts.",
    },
    {
      question: "Do we need to use all of these Adobe applications?",
      answer: "No. An assessment can cover one application or several, depending on what you use and what you want to understand.",
    },
    {
      question: "Do you need access to our systems?",
      answer:
        "Reviewing configuration directly gives the clearest picture, so we ask for read-only access where possible. The access needed is agreed with you at scoping.",
    },
    {
      question: "Can you assess a setup that someone else implemented?",
      answer: "Yes. The assessment looks at how your Adobe applications are configured and used today, regardless of who built them.",
    },
    {
      question: "What happens after the assessment?",
      answer:
        "The assessment is the first phase of delivery, so the roadmap becomes the plan for what follows. Our team then delivers the priorities with yours, whether that's implementation and integration, optimization and ongoing support, or training. The roadmap is also written so your team can act on it directly.",
    },
  ],
  cta: {
    title: "Start with a clear picture of your Adobe setup.",
    body: "Tell us which Adobe applications you use and what you'd like to understand, and we'll agree the scope of the assessment with you.",
  },
};
