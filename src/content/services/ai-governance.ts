import type { ServiceContent } from "@/lib/content/types";

/**
 * AI Governance is a new specialization introduced with this redesign. The existing site does not
 * describe AI governance work, so every capability below is marked "proposed" pending confirmation
 * of delivery experience (see docs/HANDOFF.md).
 */
export const aiGovernance: ServiceContent = {
  slug: "ai-governance",
  interest: "ai-governance",
  name: "AI Governance",
  meta: {
    title: "AI Governance",
    description:
      "Inventory AI use, assess and prioritize risk, assign accountability, and set up review processes so your teams can adopt AI with confidence.",
  },
  hero: {
    eyebrow: "AI Governance",
    title: "Put clear oversight around how your organization uses AI.",
    lead: "We help you find out where AI is in use, weigh its risks, give each use a named owner, and set up reviews that let teams adopt AI with confidence without stalling useful work.",
  },
  problem: {
    title: "AI adoption is moving faster than the controls around it.",
    body: [
      "AI now arrives in three ways: as features inside tools your teams already use, as services bought from vendors, and as models built in-house. In many organizations, no one can say with confidence which AI systems are in use, what data they touch, or who is accountable when an output is wrong.",
      "Banning AI outright pushes its use out of sight. Adopting it without review creates privacy, security, and reputational exposure. What works is a proportionate system: a light touch for low-risk uses, and rigorous review for anything that affects customers, employees, or regulated processes.",
    ],
    signals: [
      "No single list of the AI systems, features, and vendors in use",
      "Approvals depend on who you ask, not on a defined process",
      "Unclear rules on what data can be entered into AI tools",
      "Vendor AI features switched on without assessment",
      "Leadership asking for assurance that no one can yet provide",
    ],
  },
  audience: [
    { role: "CIOs and CTOs", need: "A clear view of AI use across the technology estate." },
    { role: "Chief data and analytics officers", need: "Rules for the data that trains, grounds, and feeds AI." },
    { role: "Risk, compliance and legal teams", need: "Documented controls and evidence that oversight is happening." },
    { role: "Business and product leaders", need: "A predictable path to approval for useful AI initiatives." },
  ],
  capabilitiesIntro:
    "Engagements are modular. Most start with an assessment and inventory, then add the policies, roles, and review processes your situation calls for.",
  capabilities: [
    {
      id: "readiness",
      title: "Readiness and governance assessment",
      summary: "A structured review of current AI use, policies, roles, and controls against your goals and obligations.",
      items: ["Stakeholder interviews and policy review", "Maturity view across strategy, risk, data and operations", "Gap analysis against the frameworks you choose to align with"],
      provenance: "proposed",
    },
    {
      id: "inventory",
      title: "AI inventory",
      summary: "A maintained register of AI systems, embedded vendor features, and in-house models.",
      items: ["Discovery across business units and procurement", "Purpose, owner, data and users recorded for each system", "A simple routine for keeping the register current"],
      provenance: "proposed",
    },
    {
      id: "risk",
      title: "Risk assessment and prioritization",
      summary: "A consistent way to classify AI uses by impact, so effort goes where it matters.",
      items: ["Risk-tiering criteria tailored to your context", "Assessment templates for new and existing uses", "Prioritized remediation backlog"],
      provenance: "proposed",
    },
    {
      id: "policy",
      title: "Policies and accountability",
      summary: "Clear rules and decision rights that people can follow without a specialist at their side.",
      items: ["Acceptable-use policy for AI tools", "Roles and decision rights for proposing, approving and monitoring", "Terms of reference for a governance forum"],
      provenance: "proposed",
    },
    {
      id: "oversight",
      title: "Human oversight and review",
      summary: "Approval processes with human checkpoints proportionate to risk.",
      items: ["Intake and approval workflow", "Human-in-the-loop checkpoints for higher-risk uses", "Escalation and exception handling"],
      provenance: "proposed",
    },
    {
      id: "data-handling",
      title: "Data handling for AI",
      summary: "Rules for what data AI systems may use, connected to your existing data governance.",
      items: ["Guidance for confidential and personal data in prompts and training", "Approval of data sources, with lineage expectations", "Alignment with retention and access policies"],
      provenance: "proposed",
    },
    {
      id: "third-party",
      title: "Third-party AI evaluation",
      summary: "Due diligence for AI bought from vendors or switched on inside existing platforms.",
      items: ["Vendor due-diligence questionnaire", "Contract and configuration checkpoints", "Review of AI features in current platforms"],
      provenance: "proposed",
    },
    {
      id: "monitoring",
      title: "Monitoring and documentation",
      summary: "Records and routines that show oversight continues after approval.",
      items: ["Documentation templates for each use case and model", "Expectations for monitoring performance, drift and incidents", "Periodic re-assessment schedule"],
      provenance: "proposed",
    },
    {
      id: "adoption",
      title: "Responsible adoption guidance",
      summary: "Practical guidance that helps people use AI well, not just avoid misuse.",
      items: ["Role-based guidance and training material", "Everyday dos and don'ts for common AI tools", "Communication plan for the governance program"],
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
      activities: "Define risk tiers, decision rights, policies, and a review workflow that fit your operating model.",
      deliverable: "Governance framework, responsibility model and policy set",
    },
    {
      stage: "Implement",
      activities: "Pilot intake and review on real use cases, refine the templates, and train the people who will run the process.",
      deliverable: "Working oversight workflow and trained reviewers",
    },
    {
      stage: "Improve",
      activities: "Set monitoring and re-assessment schedules, and adjust controls as AI use and regulation change.",
      deliverable: "Monitoring plan and prioritized roadmap",
    },
  ],
  deliverables: [
    { title: "AI governance assessment", description: "Findings, a maturity view, and gaps, written for executives and practitioners alike." },
    { title: "AI inventory and register", description: "A structured register of AI systems and uses, with owners, purposes and data sources." },
    { title: "Responsibility model", description: "Who proposes, reviews, approves and monitors each AI use, and who is accountable for it." },
    { title: "Policy set", description: "An acceptable-use policy, an AI risk standard, and requirements for third-party AI." },
    { title: "Oversight workflow", description: "Intake form, risk-tiering questions, review checkpoints and escalation paths." },
    { title: "Governance roadmap", description: "The sequence of actions that turns initial controls into a lasting program." },
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
      title: "Assessing AI features in vendor platforms",
      context: "A public-sector body discovers its platforms are adding AI features through routine updates.",
      approach: "Create a vendor AI questionnaire, review data-use terms, and agree configuration standards before any feature is enabled.",
      outcome: "New AI capabilities are switched on deliberately, not by default.",
    },
  ],
  benefits: [
    { title: "Visibility", description: "Know which AI systems are in use, by whom, and with what data." },
    { title: "Proportionate control", description: "Focus review effort on high-impact uses and keep low-risk adoption moving." },
    { title: "Clear accountability", description: "Named owners and decision rights for every significant use of AI." },
    { title: "Evidence of oversight", description: "Documentation that answers questions from internal audit, customers and regulators." },
  ],
  faqs: [
    {
      question: "Do we need AI governance if we only use off-the-shelf AI tools?",
      answer:
        "In most cases, yes. AI embedded in vendor tools still processes your data and can influence decisions. Governing these tools is usually lighter work (clear usage rules, vendor review, and an inventory), but it is still needed.",
    },
    {
      question: "Which frameworks and regulations do you work with?",
      answer:
        "We can help you map your governance practices to recognized references such as the NIST AI Risk Management Framework and ISO/IEC 42001, and organize the documentation that regulations such as the EU AI Act may call for. We don't provide legal advice or certification. We work alongside your legal and compliance advisers.",
    },
    {
      question: "Will governance slow down our AI projects?",
      answer:
        "It shouldn't. The aim is a predictable route to approval. Low-risk uses move quickly under standard controls, and review effort is concentrated where the impact is highest.",
    },
    {
      question: "How does AI governance relate to data governance?",
      answer:
        "Closely. AI systems are only as reliable as the data they use. We build AI oversight on top of your existing data ownership, quality and retention practices instead of creating a separate structure.",
    },
    {
      question: "How long does an initial assessment take?",
      answer:
        "It depends on the size of your organization and how much AI is already in use. We agree the scope and timeline with you at the start, after an initial conversation about your goals.",
    },
  ],
  cta: {
    title: "Start with a clear picture of your AI use.",
    body: "Tell us where AI is showing up in your organization and what you need to be confident about. We'll suggest a practical first step.",
  },
};
