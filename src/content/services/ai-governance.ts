import type { ServiceContent } from "@/lib/content/types";

/**
 * AI Governance is one of our four core areas (owner direction, 2026-11-10: Information, Data and AI Governance and
 * MarTech), but it is not a pillar of the 2026 Capability Matrix. The deck lists the work it builds on: Data Governance &
 * Data Management and Regulatory Compliance, Data Quality & Security (pillar 01, /data-management) and AI/ML Enablement
 * (pillar 02, /software-development), so the page stays grounded in that delivery. The page links to both pillars from
 * the band in src/app/(marketing)/ai-governance/page.tsx, and the data-handling capability links to
 * /information-governance (records and documents that ground AI).
 *
 * The owner names AI governance as a core expertise (responsible AI, AI risk management, compliance support; Nov 2026),
 * but the deck does not list the individual capabilities, so each stays "proposed" until the owner confirms the scope
 * (docs/HANDOFF.md, register items AI-01, AI-02). No delivered tooling (register software, guardrails, automated
 * monitoring) or AI platforms are claimed: the work is implemented in the client's existing tools.
 *
 * Framework wording rules (reviewed Nov 2026): NIST AI RMF and ISO/IEC 42001 are named as references to "align with"
 * or "map to", never as something MiG certifies. The EU AI Act is mentioned without dates, because its application
 * timetable has changed since it was adopted. No legal advice or compliance outcome is promised. Adobe AI features are
 * named with Adobe's current terms (AI Assistant, Adobe Experience Platform agents) and only as things MiG reviews.
 * Capability ids are stable anchors (/ai-governance#inventory etc., used by the home page); don't rename them.
 */
export const aiGovernance: ServiceContent = {
  slug: "ai-governance",
  interest: "ai-governance",
  name: "AI Governance",
  meta: {
    title: "AI Governance",
    description:
      "Responsible AI and AI risk management: AI inventories, risk tiers, policies, oversight workflows and monitoring, built on our data governance work.",
  },
  hero: {
    eyebrow: "Responsible AI · AI risk · Compliance",
    title: "Put clear oversight around how your organization uses AI.",
    lead: "We put responsible AI into practice: AI inventories, risk tiers, policies, oversight workflows with named owners, and monitoring, built on the data governance and AI/ML enablement work we already deliver.",
  },
  problem: {
    title: "AI adoption is moving faster than the controls around it.",
    body: [
      "AI now reaches your organization in several ways: features added to tools your teams already use, services bought from vendors, models built in-house, and increasingly agents that can take actions in other systems. In many organizations, no one can say which of these are in use, what data they touch or who is accountable when an output is wrong.",
      "Banning AI pushes its use out of sight. Adopting it without review creates privacy, security and reputational exposure. What works is a proportionate system, put in place and kept running: a light touch for low-risk uses, and closer review for anything that affects customers, employees or regulated processes.",
    ],
    signals: [
      "No single list of the AI tools, features and vendors in use",
      "Approvals depend on who you ask, not on a defined process",
      "Unclear rules on what data people can enter into AI tools",
      "AI features in existing platforms switched on without review",
      "Leadership or customers asking for assurance no one can yet give",
    ],
  },
  audience: [
    { role: "CIOs and CTOs", need: "A clear view of AI use across the technology estate." },
    { role: "Chief data and analytics officers", need: "Rules for the data that trains, grounds and feeds AI." },
    { role: "Risk, compliance and legal teams", need: "Documented controls and records that show oversight is working." },
    { role: "Business and product leaders", need: "A predictable route to approval for useful AI initiatives." },
  ],
  capabilitiesIntro:
    "Combine the capabilities below to fit your situation, from a first assessment to a review process that runs inside your existing tools. Each one builds on the data governance, data quality and security, and AI/ML enablement work we already deliver.",
  capabilities: [
    {
      id: "readiness",
      title: "Readiness and governance assessment",
      summary:
        "The first stage of delivery. We review your current AI use, policies, roles and controls against your goals and obligations, and turn the gaps into a prioritized plan we implement with you.",
      items: [
        "Stakeholder interviews and policy review",
        "Maturity view across strategy, risk, data and operations",
        "Gap analysis that maps your controls to the frameworks you choose, such as the NIST AI RMF or ISO/IEC\u00a042001",
      ],
      provenance: "proposed",
    },
    {
      id: "inventory",
      title: "AI inventory",
      summary:
        "You can't govern AI you can't see. We build one register of the AI tools, embedded vendor features, in-house models and agents in use.",
      items: [
        "Discovery across business units, IT and procurement",
        "Purpose, owner, data, users and risk tier recorded for each use",
        "A simple routine your team can follow to keep the register current",
      ],
      provenance: "proposed",
    },
    {
      id: "risk",
      title: "AI risk tiering",
      summary:
        "Without a shared way to rate risk, every review starts from scratch. We define risk tiers by impact and assess each use against them, so review effort goes where it matters.",
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
      summary:
        "Unwritten rules get applied unevenly. We write policies and decision rights that people can follow in their day-to-day work.",
      items: [
        "Acceptable-use policy for AI tools",
        "Decision rights for proposing, approving and monitoring AI uses",
        "Terms of reference for a governance forum",
      ],
      provenance: "proposed",
    },
    {
      id: "oversight",
      title: "Oversight workflows",
      summary:
        "Ad hoc approvals become a defined route. We set up intake and approval in your existing tools, with human checkpoints matched to the level of risk.",
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
      summary:
        "Unclear data rules let confidential information reach AI tools. We define what data AI may use, building on your existing data governance rather than beside it.",
      items: [
        "Guidance for confidential and personal data in prompts, grounding and training",
        "Approved data sources, with lineage expectations",
        "Alignment with consent, retention and access policies",
        "Records and documents that ground AI, governed through our Information Governance & Records practice",
        "Built on the governance, quality and security controls from our Data & Analytics practice",
      ],
      provenance: "proposed",
    },
    {
      id: "third-party",
      title: "Third-party AI evaluation",
      summary:
        "AI features arrive in platforms you already run, sometimes switched on by default. We review the AI you buy and the AI features in your current platforms before people rely on them.",
      items: [
        "Vendor due-diligence questionnaire",
        "Contract, data-use and configuration checkpoints",
        "Review of AI features in current platforms, including Adobe Experience Cloud applications",
      ],
      provenance: "proposed",
    },
    {
      id: "monitoring",
      title: "Monitoring and compliance records",
      summary:
        "Oversight can't stop at approval. We set up the monitoring, documentation, incident reporting and reassessment routines that keep it running and show it is working.",
      items: [
        "Documentation templates for each use case and model",
        "Monitoring routines for quality, drift and incidents, each with an owner",
        "Incident reporting route and reassessment schedule",
        "Records of reviews and decisions, organized to support audit and regulatory requests",
        "Applied to the models and AI features we build through our Engineering & Technology practice",
      ],
      provenance: "proposed",
    },
    {
      id: "adoption",
      title: "Responsible adoption and training",
      summary:
        "Rules alone don't change how people work. We train your teams to use AI well, with guidance written for each role.",
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
      stage: "Understand & strategize",
      activities:
        "Interview stakeholders, review your AI, data and privacy policies, and build a first inventory of AI use, rated by risk.",
      deliverable: "Current-state assessment, initial AI inventory and prioritized plan",
    },
    {
      stage: "Implement & integrate",
      activities:
        "Put risk tiers, policies, decision rights and an intake and review workflow in place, built on your data governance and your existing tools. Pilot on real use cases and train the reviewers.",
      deliverable: "Policy set, working review workflow and trained reviewers",
    },
    {
      stage: "Optimize & grow",
      activities: "Run monitoring, documentation and reassessment routines, and adjust controls as your AI use and the rules around it change.",
      deliverable: "Monitoring plan and governance roadmap",
    },
  ],
  deliverables: [
    { title: "Governance assessment", description: "Findings, a maturity view and prioritized gaps that set the order of implementation." },
    { title: "AI register", description: "Every known AI use with its purpose, owner, data sources and risk tier, in a format your team can maintain." },
    { title: "Responsibility model", description: "Who proposes, reviews, approves and monitors each AI use, and who is accountable for it." },
    { title: "Policy set", description: "An acceptable-use policy, an AI risk standard and requirements for third\u2011party AI." },
    { title: "Review workflow", description: "Intake form, risk-tiering questions, review checkpoints and escalation paths, piloted on real use cases." },
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
    { title: "Visibility", description: "Know which AI is in use, by whom and with what data." },
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
        "We help you align your controls with recognized references such as the NIST AI Risk Management Framework and ISO/IEC\u00a042001, and organize the records the EU AI Act may require. The Act applies in phases and its application timetable has changed since it was adopted, so we confirm current obligations with your legal advisers instead of quoting dates. We don't give legal advice or issue certifications. ISO/IEC\u00a042001 certification comes from an accredited certification body.",
    },
    {
      question: "Will governance slow down our AI projects?",
      answer:
        "It shouldn't. The aim is a predictable route to approval. Low-risk uses move quickly under standard controls, and review effort goes to the uses with the most impact.",
    },
    {
      question: "Can you help us govern the AI features in our Adobe applications?",
      answer:
        "Yes. Adobe Experience Cloud applications can now include AI Assistant, Adobe Experience Platform agents and generative AI features, depending on your licenses. We review each feature with you: whether to enable it, what customer data it may use under your consent and data usage policies, and who owns it. Because we also implement Adobe applications, we can check configuration as well as policy.",
    },
    {
      question: "How does AI governance relate to your data and AI/ML work?",
      answer:
        "AI governance is one of our four core areas, alongside Information Governance, Data Governance and MarTech, and it draws on both. AI is only as reliable as the data it uses, so we build AI oversight on your existing data ownership, quality, consent and retention rules instead of creating a separate structure. If those foundations are missing, our Data & Analytics practice can put them in place. When we build or integrate AI through our AI/ML enablement work, the same risk tiers, owners and monitoring apply.",
    },
    {
      question: "Who needs to be involved from our side?",
      answer:
        "An executive sponsor, plus people from IT and security, data, privacy, legal or compliance, and the business teams that use AI most. We keep their time focused on decisions, reviews and pilot use cases.",
    },
    {
      question: "Where do we start, and how long does it take?",
      answer:
        "You can start with an assessment and a first inventory, because both show where controls are needed most. Then we implement the priorities with you: risk tiers, policies, the review workflow and training. Timing depends on your size and how much AI is already in use. We agree the scope and timeline with you after a first conversation about your goals.",
    },
  ],
  cta: {
    title: "Start with a clear picture of your AI use.",
    body: "Tell us where AI is showing up in your organization and what you need to be confident about. We'll scope a practical first step with you, from a first inventory to a working review process.",
  },
};
