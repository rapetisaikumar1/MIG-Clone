import type { ServiceContent } from "@/lib/content/types";

/**
 * AI Governance is a new specialization introduced with this redesign. The existing site does not
 * describe AI governance work, so every capability below is marked "proposed" pending confirmation
 * of delivery experience (see docs/HANDOFF.md).
 *
 * Framework wording rules (reviewed Nov 2026): NIST AI RMF and ISO/IEC 42001 are named as references
 * to "align with" or "map to", never as something MiG certifies. The EU AI Act is mentioned without
 * dates, because its application timetable was revised in 2026. No legal advice or compliance outcome
 * is promised. Adobe AI features are named with Adobe's current terms (AI Assistant, Adobe Experience
 * Platform agents) and only as things MiG helps review, not as products MiG builds or resells.
 * Capability ids are stable anchors (/ai-governance#inventory etc.); don't rename them.
 */
export const aiGovernance: ServiceContent = {
  slug: "ai-governance",
  interest: "ai-governance",
  name: "AI Governance",
  meta: {
    title: "AI Governance",
    description:
      "Find where AI is used, tier it by risk, give each use an owner, and set up proportionate review, so your teams can adopt AI with confidence.",
  },
  hero: {
    eyebrow: "AI Governance",
    title: "Put clear oversight around how your organization uses AI.",
    lead: "We help you find where AI is in use, assess its risks, give each use a named owner, and set up review that matches the risk, so teams can adopt AI without stalling useful work.",
  },
  problem: {
    title: "AI adoption is moving faster than the controls around it.",
    body: [
      "AI now reaches your organization in several ways: features added to tools your teams already use, services bought from vendors, models built in-house, and increasingly agents that can take actions in other systems. In many organizations, no one can say which of these are in use, what data they touch, or who is accountable when an output is wrong.",
      "Banning AI pushes its use out of sight. Adopting it without review creates privacy, security, and reputational exposure. What works is a proportionate system: a light touch for low-risk uses, and closer review for anything that affects customers, employees, or regulated processes.",
    ],
    signals: [
      "No single list of the AI tools, features, and vendors in use",
      "Approvals depend on who you ask, not on a defined process",
      "Unclear rules on what data people can enter into AI tools",
      "AI features in existing platforms switched on without review",
      "Leadership or customers asking for assurance no one can yet give",
    ],
  },
  audience: [
    { role: "CIOs and CTOs", need: "A clear view of AI use across the technology estate." },
    { role: "Chief data and analytics officers", need: "Rules for the data that trains, grounds, and feeds AI." },
    { role: "Risk, compliance and legal teams", need: "Documented controls and records that show oversight is working." },
    { role: "Business and product leaders", need: "A predictable route to approval for useful AI initiatives." },
  ],
  capabilitiesIntro:
    "Engagements are modular. Most start with an assessment and an inventory, then add the policies, roles, and review steps your situation calls for.",
  capabilities: [
    {
      id: "readiness",
      title: "Readiness and governance assessment",
      summary: "A structured review of your current AI use, policies, roles, and controls against your goals and obligations.",
      items: [
        "Stakeholder interviews and policy review",
        "Maturity view across strategy, risk, data and operations",
        "Gap analysis against the frameworks you choose, such as the NIST AI RMF or ISO/IEC\u00a042001",
      ],
      provenance: "proposed",
    },
    {
      id: "inventory",
      title: "AI inventory",
      summary: "One register of the AI tools, embedded vendor features, in-house models and agents in use.",
      items: [
        "Discovery across business units, IT and procurement",
        "Purpose, owner, data, users and risk tier recorded for each use",
        "A simple routine your team can follow to keep the register current",
      ],
      provenance: "proposed",
    },
    {
      id: "risk",
      title: "Risk assessment and prioritization",
      summary: "A consistent way to classify AI uses by impact, so review effort goes where it matters.",
      items: [
        "Risk tiers based on impact on people, data sensitivity and degree of autonomy",
        "Assessment templates for new and existing uses",
        "Prioritized remediation backlog",
      ],
      provenance: "proposed",
    },
    {
      id: "policy",
      title: "Policies and accountability",
      summary: "Clear rules and decision rights that people can follow without a specialist at their side.",
      items: [
        "Acceptable-use policy for AI tools",
        "Decision rights for proposing, approving and monitoring AI uses",
        "Terms of reference for a governance forum",
      ],
      provenance: "proposed",
    },
    {
      id: "oversight",
      title: "Human oversight and review",
      summary: "An approval process with human checkpoints matched to the level of risk.",
      items: [
        "Intake and approval workflow",
        "Human review points for higher-risk outputs and decisions",
        "Limits and sign-off rules for AI agents that act in other systems",
        "Escalation and exception handling",
      ],
      provenance: "proposed",
    },
    {
      id: "data-handling",
      title: "Data handling for AI",
      summary: "Rules for what data AI may use, built on your existing data governance rather than beside it.",
      items: [
        "Guidance for confidential and personal data in prompts, grounding and training",
        "Approved data sources, with lineage expectations",
        "Alignment with consent, retention and access policies",
      ],
      provenance: "proposed",
    },
    {
      id: "third-party",
      title: "Third-party AI evaluation",
      summary: "Due diligence for AI you buy, and for AI features that arrive in platforms you already run.",
      items: [
        "Vendor due-diligence questionnaire",
        "Contract, data-use and configuration checkpoints",
        "Review of AI features in current platforms, including Adobe Experience Cloud applications",
      ],
      provenance: "proposed",
    },
    {
      id: "monitoring",
      title: "Monitoring and documentation",
      summary: "Records and routines that show oversight continues after approval.",
      items: [
        "Documentation templates for each use case and model",
        "Monitoring expectations for quality, drift and incidents",
        "Incident reporting route and reassessment schedule",
      ],
      provenance: "proposed",
    },
    {
      id: "adoption",
      title: "Responsible adoption guidance",
      summary: "Practical guidance that helps people use AI well, not just avoid misuse.",
      items: [
        "Role-based guidance and training material",
        "Everyday dos and don'ts for common AI tools",
        "Communication plan for the governance program",
      ],
      provenance: "proposed",
    },
  ],
  approach: [
    {
      stage: "Assess",
      activities: "Interview stakeholders, review existing policies, and build a first inventory of AI use.",
      deliverable: "Current-state assessment and initial AI inventory",
    },
    {
      stage: "Design",
      activities: "Define risk tiers, decision rights, policies, and a review workflow that fit how your organization already works.",
      deliverable: "Governance framework, responsibility model and policy set",
    },
    {
      stage: "Implement",
      activities: "Pilot intake and review on real use cases, refine the templates, and train the people who will run the process.",
      deliverable: "Working review workflow and trained reviewers",
    },
    {
      stage: "Improve",
      activities: "Set monitoring and reassessment routines, and adjust controls as your AI use and the rules around it change.",
      deliverable: "Monitoring plan and prioritized roadmap",
    },
  ],
  deliverables: [
    { title: "Governance assessment", description: "Findings, a maturity view and prioritized gaps, with a summary for executives and detail for practitioners." },
    { title: "AI register", description: "Every known AI use with its purpose, owner, data sources and risk tier, in a format your team can maintain." },
    { title: "Responsibility model", description: "Who proposes, reviews, approves and monitors each AI use, and who is accountable for it." },
    { title: "Policy set", description: "An acceptable-use policy, an AI risk standard, and requirements for third-party AI." },
    { title: "Review workflow", description: "Intake form, risk-tiering questions, review checkpoints and escalation paths." },
    { title: "Governance roadmap", description: "The next steps, in order, that turn initial controls into a lasting program." },
  ],
  useCases: [
    {
      title: "Bringing unsanctioned AI use into view",
      context: "A professional services firm finds employees using several public AI assistants with client material.",
      approach: "Run a short discovery exercise, publish an acceptable-use policy, approve a sanctioned tool with data controls, and open an intake route for new requests.",
      outcome: "Leaders can see how AI is used, and staff get clear, usable rules instead of a blanket ban.",
    },
    {
      title: "Reviewing a customer-facing AI feature",
      context: "A retailer plans to launch AI-generated product descriptions and customer service replies.",
      approach: "Classify the use case, require human review for published content, set quality checks, and record the owner and monitoring plan.",
      outcome: "The launch goes ahead with defined accountability and a record of the decisions made.",
    },
    {
      title: "Governing AI features in marketing platforms",
      context: "A marketing team's platforms, including its Adobe applications, add AI assistants, agents and generative features in routine releases.",
      approach: "List the new features, check the customer data each one uses against consent and data policies, and agree with platform owners which to enable.",
      outcome: "AI features are switched on deliberately, with known data use and an owner, not by default.",
    },
  ],
  benefits: [
    { title: "Visibility", description: "Know which AI is in use, by whom, and with what data." },
    { title: "Proportionate control", description: "Focus review effort on high-impact uses and keep low-risk adoption moving." },
    { title: "Clear accountability", description: "Named owners and decision rights for every significant use of AI." },
    { title: "Records of oversight", description: "Documentation that helps you answer questions from internal audit, customers and regulators." },
  ],
  faqs: [
    {
      question: "Do we need AI governance if we only use off-the-shelf AI tools?",
      answer:
        "Usually, yes. AI built into vendor tools still processes your data and can shape decisions. Governing it is lighter work than governing models you build: an inventory, clear usage rules, and a vendor and configuration review. It still needs an owner.",
    },
    {
      question: "Which frameworks and regulations do you work with?",
      answer:
        "We help you align your practices with recognized references such as the NIST AI Risk Management Framework and ISO/IEC\u00a042001, and organize the records the EU AI Act may require. The Act applies in phases and its timetable was revised in 2026, so we confirm current obligations with your legal advisers instead of quoting dates. We don't give legal advice or issue certifications. ISO/IEC\u00a042001 certification comes from an accredited certification body.",
    },
    {
      question: "Will governance slow down our AI projects?",
      answer:
        "It shouldn't. The aim is a predictable route to approval. Low-risk uses move quickly under standard controls, and review effort goes to the uses with the most impact.",
    },
    {
      question: "Can you help us govern the AI features in our Adobe applications?",
      answer:
        "Yes. Adobe Experience Cloud applications can now include AI Assistant, Adobe Experience Platform agents and generative AI features, depending on your licenses. We help you decide which to enable, what customer data they may use under your consent and data usage policies, and who owns each one. Because we also implement Adobe applications, we can check configuration as well as policy.",
    },
    {
      question: "How does AI governance relate to data governance?",
      answer:
        "Closely. AI is only as reliable as the data it uses. We build AI oversight on your existing data ownership, quality, consent and retention practices instead of creating a separate structure. If those foundations are missing, our Data Management practice can help put them in place.",
    },
    {
      question: "Who needs to be involved from our side?",
      answer:
        "An executive sponsor, plus people from IT and security, data, privacy, legal or compliance, and the business teams that use AI most. We keep their time focused on interviews, decisions and pilot reviews.",
    },
    {
      question: "Where do we start, and how long does it take?",
      answer:
        "Most organizations start with an assessment and a first inventory, because both show where controls are needed most. Timing depends on your size and how much AI is already in use. We agree the scope and timeline with you after a first conversation about your goals.",
    },
  ],
  cta: {
    title: "Start with a clear picture of your AI use.",
    body: "Tell us where AI is showing up in your organization and what you need to be confident about. We'll suggest a practical first step.",
  },
};
