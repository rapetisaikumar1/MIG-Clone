import type { ServiceContent } from "@/lib/content/types";

/**
 * Pillar 06 of the Maverick InnoGarage Capability Matrix (October 2026): Customer Experience & Engagement,
 * Organizational Design & Alignment, Process & Business Optimization, Change Enablement & Insights, Program & Project
 * Management, and Microsoft Dynamics 365 ("Tailored enterprise solutions for sales, marketing and customer service").
 * Microsoft Dynamics 365 was also a page on the old site (/microsoft-dynamics-365 now redirects to #dynamics-365, so
 * that capability id must not change). All six capabilities are deck items and therefore "verified"; their bullets
 * describe how the work is delivered.
 *
 * Positioning: this is delivery work. We run programs, implement CRM, redesign and automate processes and enable
 * change. Dynamics 365 is described generically (Sales, Customer Service, Customer Insights – Journeys); no Microsoft
 * partnership or certification is claimed.
 */
export const businessTransformation: ServiceContent = {
  slug: "business-transformation",
  interest: "business-transformation",
  name: "Business Transformation & CRM",
  insightTheme: "Customer Experience",
  meta: {
    title: "Business Transformation & CRM",
    description:
      "Process redesign and automation, organizational alignment, change enablement, program delivery and Microsoft Dynamics\u00a0365 CRM, implemented end to end.",
  },
  hero: {
    eyebrow: "Process · CRM · Change · Programs",
    title: "Change how your organization runs, and make it stick.",
    lead: "We run transformation programs end to end: redesigning and automating processes, implementing Microsoft Dynamics\u00a0365, aligning teams and roles, and preparing people to work the new way.",
  },
  problem: {
    title: "Transformation stalls between the plan and daily work.",
    body: [
      "Most organizations know what needs to change. Customer information sits in spreadsheets and inboxes, approvals pass through long email chains, teams overlap after a reorganization, and a CRM bought years ago is used by a fraction of the people it was meant for.",
      "The gap is rarely the idea; it is execution. We close it by doing the work: mapping and redesigning processes with the people who run them, configuring and integrating the systems that support them, defining roles and decision rights, and running the program until the new way of working is in daily use.",
    ],
    signals: [
      "Customer history split across sales, service and marketing tools",
      "Processes that depend on email, spreadsheets and manual handoffs",
      "A CRM that few people use, or use the same way",
      "Unclear ownership after a reorganization or merger",
      "Several initiatives running at once with no shared plan",
    ],
  },
  audience: [
    { role: "COOs and operations leaders", need: "Faster, simpler processes with owners and measures everyone can see." },
    { role: "Sales, service and marketing leaders", need: "One customer record and processes their teams actually follow." },
    { role: "Transformation and PMO leaders", need: "A delivery team that runs the program, not just the plan." },
    { role: "IT and enterprise applications teams", need: "A CRM that is configured, integrated and maintainable." },
  ],
  capabilitiesIntro:
    "Four ways we modernize how enterprises run. Business transformation and Microsoft Dynamics\u00a0365 are set out below; records management for government and regulated industries runs on our own products, MapleRecord and MOLI.",
  capabilities: [
    {
      id: "customer-experience",
      title: "Customer experience and engagement",
      summary:
        "Customers feel every handoff between teams. We map journeys across sales, service and marketing, then redesign the processes and systems behind them, so each interaction builds on the last.",
      items: [
        "Customer journey and touchpoint mapping",
        "Engagement processes across sales, service and marketing",
        "Customer feedback loops built into daily operations",
        "Journey measures tied to business outcomes",
      ],
      provenance: "verified",
    },
    {
      id: "organizational-design",
      title: "Organizational design and alignment",
      summary:
        "Overlapping teams and unclear ownership slow every decision. We define structures, roles and decision rights around the work, and put them in place with the leaders who run it.",
      items: [
        "Operating model and team structure",
        "Roles, responsibilities and decision rights",
        "Alignment of goals and measures across teams",
        "Transition plans for reorganizations and mergers",
      ],
      provenance: "verified",
    },
    {
      id: "process-optimization",
      title: "Process and business optimization",
      summary:
        "Manual steps and rework hide in most core processes. We map how work really flows, remove what adds no value, and automate the steps that remain repetitive.",
      items: [
        "Current-state process mapping and measurement",
        "Redesigned future-state processes",
        "Workflow automation and system configuration",
        "Process owners, controls and performance measures",
      ],
      provenance: "verified",
    },
    {
      id: "change-enablement",
      title: "Change enablement and insights",
      summary:
        "New processes and systems only pay off when people use them. We plan and run the people side of change and track adoption, so issues surface early and get resolved.",
      items: [
        "Stakeholder and impact analysis",
        "Communication and training plans, delivered",
        "Adoption measures and feedback reporting",
        "Reinforcement after go-live",
      ],
      provenance: "verified",
    },
    {
      id: "program-management",
      title: "Program and project management",
      summary:
        "Parallel initiatives compete for the same people and budget. We run programs and projects with one plan, clear governance and regular reporting, from kickoff to handover.",
      items: [
        "Program setup, scope and roadmap",
        "Agile and phased delivery management",
        "Risk, dependency and budget tracking",
        "Status reporting for sponsors and steering groups",
      ],
      provenance: "verified",
    },
    {
      // Deck wording: "Tailored enterprise solutions for sales, marketing and customer service". Generic description only;
      // no Microsoft partnership or certification is claimed. Linked from /microsoft-dynamics-365 (see redirects.ts).
      id: "dynamics-365",
      title: "Microsoft Dynamics\u00a0365",
      summary:
        "Tailored enterprise solutions for sales, marketing and customer service: streamlining business operations, strengthening customer relationships and driving measurable growth.",
      items: [
        "Implementation and configuration of Dynamics\u00a0365 Sales",
        "Case and service processes in Dynamics\u00a0365 Customer Service",
        "Marketing journeys in Dynamics\u00a0365 Customer Insights – Journeys",
        "Integration with ERP, data platforms and Adobe Marketo Engage",
        "Training, adoption support and ongoing optimization",
      ],
      provenance: "verified",
    },
  ],
  approach: [
    {
      stage: "Understand & strategize",
      activities:
        "Map current processes, customer journeys, systems and roles with the people who run them, and agree on measurable targets and priorities.",
      deliverable: "Current-state assessment and a prioritized transformation roadmap",
    },
    {
      stage: "Implement & integrate",
      activities:
        "Redesign and automate processes, configure and integrate Dynamics\u00a0365, put new roles in place and run the program to plan, with minimal disruption.",
      deliverable: "Working processes, a configured CRM and trained teams",
    },
    {
      stage: "Optimize & grow",
      activities:
        "Track adoption and process measures, refine workflows and configuration, and extend the change to further teams and regions.",
      deliverable: "Adoption and performance reporting with a next-phase backlog",
    },
  ],
  deliverables: [
    { title: "Transformation roadmap", description: "Priorities, phases and measures, agreed with the leaders who own the outcome." },
    { title: "Process maps and redesigned workflows", description: "How work flows today and how it will flow, with owners and controls." },
    { title: "Operating model and role design", description: "Team structures, responsibilities and decision rights for the new way of working." },
    { title: "Configured Dynamics\u00a0365 environment", description: "Sales, service or marketing processes configured, integrated and documented." },
    { title: "Change and training plan", description: "Communications, training and adoption measures, delivered with your teams." },
    { title: "Program plan and status reporting", description: "One plan, governance and regular reporting across workstreams." },
  ],
  useCases: [
    {
      title: "Sales and service on one CRM",
      context:
        "A B2B distributor's sales team tracks opportunities in spreadsheets, and its service team works cases from a shared inbox. Neither sees the other's history.",
      approach:
        "Map the sales and service processes, implement Dynamics\u00a0365 Sales and Customer Service around them, bring account and contact data into one record, and train both teams.",
      outcome: "Sales and service work from the same customer history, and managers see pipeline and case volumes in one place.",
    },
    {
      title: "Faster approvals in a back-office process",
      context: "A regional health provider's purchase approvals pass through long email chains and take weeks to complete.",
      approach:
        "Measure the current process, remove duplicate review steps, automate routing and reminders, and name an owner with clear thresholds for each approval level.",
      outcome: "Approvals follow one documented route, and cycle time is measured and reported each month.",
    },
    {
      title: "Bringing two teams together after a reorganization",
      context: "A services company merges two customer-facing teams with different processes, tools and reporting lines.",
      approach:
        "Define the combined structure, roles and decision rights, run a phased transition as one program, and support it with communications, training and adoption tracking.",
      outcome: "One team with agreed processes and ownership, and adoption measured through the transition.",
    },
  ],
  benefits: [
    { title: "Simpler operations", description: "Fewer manual steps and handoffs in the processes that matter most." },
    { title: "Connected customer relationships", description: "Sales, service and marketing working from one customer record." },
    { title: "Change that holds", description: "Roles, training and adoption measures that keep the new way of working in place." },
    { title: "Measurable progress", description: "Targets agreed up front and reported throughout the program." },
  ],
  faqs: [
    {
      question: "Do you plan the transformation or deliver it?",
      answer:
        "Both, with the emphasis on delivery. Discovery and the roadmap are the first stage of the work. The same team then redesigns processes, configures and integrates systems, runs the program and supports adoption until the new way of working is in daily use.",
    },
    {
      question: "Which Microsoft Dynamics\u00a0365 applications do you work with?",
      answer:
        "We implement, configure and integrate Dynamics\u00a0365 Sales, Dynamics\u00a0365 Customer Service and Dynamics\u00a0365 Customer Insights – Journeys for marketing. We configure them around your processes and connect them to the systems your teams already use.",
    },
    {
      question: "Do we need a new CRM to start?",
      answer:
        "No. Many programs are process, organization or change work with no new system involved. When a CRM is part of the answer, we start from the processes it needs to support, then configure the platform around them.",
    },
    {
      question: "Can Dynamics\u00a0365 work alongside our Adobe stack?",
      answer:
        "Yes. Adobe Marketo Engage syncs natively with Microsoft Dynamics, and we set up and maintain that sync as part of our Adobe Services. We also integrate CRM data with the data platforms behind analytics and personalization, so customer information stays consistent.",
    },
    {
      question: "How do you make sure the change sticks?",
      answer:
        "We plan the people side of change from the start: who is affected, what they need to learn and how adoption will be measured. After go-live we track those measures and keep refining processes and configuration until they hold.",
    },
    {
      question: "How does this relate to MapleRecord and MOLI?",
      answer:
        "MapleRecord and MOLI are our own records management products for government and regulated industries. MapleRecord covers public sector and enterprise records management with workflow automation, and MOLI is our AI-driven record management system, designed to support compliance with GDPR, PDPA, PIPEDA and CCPA.",
    },
  ],
  cta: {
    title: "Plan the change, then deliver it with one team.",
    body: "Tell us about the process, team or CRM you want to change. We'll scope a practical first phase with you.",
  },
};
