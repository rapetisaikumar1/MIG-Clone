import type { ServiceContent } from "@/lib/content/types";

/*
 * Grounding (see the software-development spec and the messaging guide, §5.4):
 * - owner-stated: the owner directive of 2026-11-07 names software development a core specialization (the area, not specific services).
 * - evidenced by MapleRecord: MiG designed, built and runs MapleRecord (five modules), confirmed by the owner on 2026-11-06.
 * - verified old-site title: AEM "Custom development", Commerce "Implementation and customization" / "Platform migration",
 *   AEP and Marketo "Customization and optimization", Integrated Data Solutions integration titles, "Training and support".
 * No technology stacks, clients, team size, delivery models, SLAs or certifications: those are owner questions.
 */
export const softwareDevelopment: ServiceContent = {
  slug: "software-development",
  interest: "software-development",
  name: "Software Development",
  meta: {
    title: "Software Development",
    description:
      "Enterprise software designed, built and integrated by the team behind MapleRecord: business applications, workflow automation and Adobe development.",
  },
  hero: {
    eyebrow: "Design · Build · Integrate · Support",
    title: "Enterprise software, built around how your teams work.",
    lead: "We design, build and integrate enterprise software: business applications, workflow and forms automation, system integration and custom development on Adobe platforms. We also build and run MapleRecord, our own records management platform.",
  },
  problem: {
    title: "When off-the-shelf tools don't fit, work falls back to spreadsheets and email.",
    body: [
      "Approvals, requests, records and handoffs often run on spreadsheets, shared inboxes and tools that were never designed to work together. Each workaround adds manual effort, hides status and makes it hard to show who did what, and when.",
      "Buying another package rarely closes the gap. What works is software shaped around the actual process, connected to the systems that already hold your data, and built so your teams can run it and change it as needs evolve.",
    ],
    signals: [
      "Critical processes tracked in spreadsheets and email",
      "The same data re-keyed between systems",
      "Approvals and requests with no visible status or audit trail",
      "Customizations on core platforms that are hard to maintain",
      "Packaged software that covers most of the process, but not the part that matters",
    ],
  },
  audience: [
    { role: "CIOs and IT leaders", need: "Software that fits the process and connects to the systems you already run." },
    { role: "Operations and department heads", need: "Requests, approvals and records handled in one place, with visible status." },
    { role: "Records, compliance and audit teams", need: "Role-based access and audit trails built in from the start." },
    { role: "Digital and marketing teams", need: "Adobe platforms extended where standard features stop." },
  ],
  capabilitiesIntro:
    "Take each capability on its own or combine them, from a single integration to a complete business application.",
  capabilities: [
    {
      // Basis: owner-stated 2026-11-07; pattern evidenced by MapleRecord (records, requests, admin).
      id: "custom-applications",
      title: "Custom enterprise applications",
      summary: "Business applications designed and built around your processes, for the work packaged software doesn't fit.",
      items: [
        "Requirements, process mapping and solution design",
        "Application design and development",
        "Role-based access and audit trails built in",
        "Testing, release, documentation and handover",
      ],
      provenance: "proposed",
    },
    {
      // Basis: evidenced by MapleRecord (MR Workflows, MR Forms, MR Requests); delivering this for clients is owner-stated.
      id: "automation",
      title: "Workflow, forms and process automation",
      summary: "Manual steps replaced with digital forms, routing rules and automated workflows that people can follow and audit.",
      items: [
        "Digital forms with conditional logic",
        "Approval and routing workflows",
        "Scheduled and event-triggered automation",
        "Request intake and tracking",
      ],
      provenance: "proposed",
    },
    {
      // Basis: verified old-site titles (Integrated Data Solutions; Adobe "Implementation and integration").
      id: "integration",
      title: "System and data integration",
      summary: "Databases, cloud services, on-premises systems and Adobe applications connected, so data moves without re-keying.",
      items: [
        "Integration across databases, cloud services and on-premises systems",
        "Connections between Adobe Experience Cloud applications and enterprise systems",
        "Real-time access where decisions depend on it",
        "Architecture that scales as systems are added",
      ],
      provenance: "verified",
    },
    {
      // Basis: verified old-site titles (AEM "Custom development"; Commerce "Implementation and customization",
      // "Platform migration"; AEP and Marketo "Customization and optimization").
      id: "adobe-development",
      title: "Custom development on Adobe platforms",
      summary: "Adobe Experience Cloud applications extended where standard features stop, built to stay maintainable.",
      items: [
        "Adobe Experience Manager custom development",
        "Adobe Commerce implementation, customization and platform migration",
        "Customization and optimization of Adobe Experience Platform and Marketo Engage",
      ],
      provenance: "verified",
    },
    {
      // Basis: evidenced by MapleRecord (owner confirmation 2026-11-06; five modules from the real UI).
      id: "product-engineering",
      title: "Product engineering: MapleRecord",
      summary: "We design, build and run our own enterprise platform, MapleRecord, for electronic and physical records.",
      items: [
        "Five modules: MR Records, MR Requests, MR Workflows, MR Forms and MR Admin",
        "Retention schedules, request handling and workflows in one platform",
        "Configured for organizations whose records needs it fits",
      ],
      provenance: "verified",
    },
    {
      // Basis: verified old-site "Ongoing support and optimization" / "Training and support" (Adobe and data pages);
      // extending it to custom software is owner-stated and needs confirmation.
      id: "support",
      title: "Support and continued improvement",
      summary: "Software kept useful after launch, with fixes, enhancements and training for the people who run it.",
      items: [
        "Ongoing support and optimization",
        "Enhancements as processes and regulations change",
        "Training for users and administrators",
      ],
      provenance: "proposed",
    },
  ],
  approach: [
    {
      stage: "Assess",
      activities: "Map the process, users, systems and data involved, and agree what the first release must do.",
      deliverable: "Scope and prioritized requirements",
    },
    {
      stage: "Design",
      activities: "Design the solution, the integrations and the access model, and agree what to build and what to configure.",
      deliverable: "Solution design and release plan",
    },
    {
      stage: "Implement",
      activities: "Build, integrate and test in short iterations, then release with documentation and training.",
      deliverable: "Working software, documentation and trained users",
    },
    {
      stage: "Improve",
      activities: "Support the software in use, fix issues and add enhancements as needs change.",
      deliverable: "Enhancement backlog and ongoing support",
    },
  ],
  deliverables: [
    { title: "Scope and requirements", description: "The process, users, data and systems involved, and what the first release must do." },
    { title: "Solution design", description: "How the software works, what it connects to, and who can see and do what." },
    { title: "Working software", description: "Built, tested and released, with access controls and audit trails where they matter." },
    { title: "Integrations", description: "Documented connections to the systems that hold your data." },
    { title: "Documentation and handover", description: "Plain-language guides for users and administrators." },
    { title: "Support plan", description: "How issues are reported and resolved, and how enhancements are prioritized." },
  ],
  useCases: [
    {
      title: "Replacing a spreadsheet approval process",
      context: "A public agency tracks permit approvals in spreadsheets and email, and nobody can see where a request is.",
      approach:
        "Map the steps and decision points, build a digital form and approval workflow with role-based access, and connect it to the systems that hold applicant data.",
      outcome: "Each request has a visible status, a named owner and an audit trail, and staff stop re-keying data.",
    },
    {
      title: "Connecting a commerce platform to back-office systems",
      context: "A distributor's Adobe Commerce store and its ERP don't share orders or pricing, so staff re-enter both by hand.",
      approach:
        "Design the integration around the ERP as the source for pricing and inventory, customize the store where the standard flow falls short, and test with real order volumes.",
      outcome:
        "Orders and prices flow between systems without manual entry, and the team spends its time on customers instead of data entry.",
    },
    {
      title: "Records and requests in one system",
      context: "A municipality handles records retention and information requests in separate tools and paper files.",
      approach:
        "Configure MapleRecord, our records management platform, with record series, retention schedules, request intake and role-based access.",
      outcome: "Records and requests are managed in one system, with retention applied consistently and every action recorded.",
    },
  ],
  benefits: [
    { title: "Software that fits", description: "Built around the process, not the other way round." },
    { title: "Less manual work", description: "Fewer handoffs, re-keyed data and status-chasing emails." },
    { title: "Visible accountability", description: "Role-based access and audit trails show who did what, and when." },
    { title: "Room to change", description: "Documented, supported software your teams can extend as needs evolve." },
  ],
  faqs: [
    {
      question: "What kind of software do you build?",
      answer:
        "Enterprise business software: applications for requests, approvals, records and other multi-step processes; workflow and forms automation; integrations between systems; and custom development on Adobe Experience Cloud applications. We also build and run MapleRecord, our own records management platform.",
    },
    {
      question: "Do you build from scratch, or extend what we already have?",
      answer:
        "Both. Where a platform you already run covers most of the need, we configure, customize or integrate it. Where it doesn't, we build. We agree which approach fits during scoping, before any build starts.",
    },
    {
      question: "Should we build custom software or use MapleRecord?",
      answer:
        "If the need is records management, information requests, records workflows or forms, MapleRecord may already cover it, and configuring it is usually faster than building. If the process is specific to your organization, custom software may fit better. We'll tell you plainly which one makes sense.",
    },
    {
      question: "How does software development connect with your other services?",
      answer:
        "Closely. Software we build follows the data governance and AI governance rules your organization sets, and it can connect to your Adobe applications. Our AI Governance, Adobe Services and Data Management work and our software development share the same delivery approach.",
    },
    {
      question: "Who needs to be involved from our side?",
      answer:
        "A business owner for the process, the people who do the work today, and someone from IT who knows the systems the software must connect to. We keep their time focused on requirements, reviews and testing.",
    },
  ],
  cta: {
    title: "Tell us what you need to build.",
    body: "Describe the process, the people and the systems involved. We'll scope a practical first release with you.",
  },
};
