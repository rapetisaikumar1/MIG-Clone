import type { ServiceContent } from "@/lib/content/types";

/*
 * Pillar 02 of the Capability Matrix (Capability Deck, October 2026): Engineering & Technology. The URL slug
 * /software-development predates the pillar name and is kept for SEO.
 *
 * Grounding:
 * - deck (verified): Cloud Strategy & Engineering (AWS, Azure); DevOps & CI/CD Automation; AI/ML Enablement;
 *   Mobile Development; Quality Assurance Engineering. The deck names no tools or stacks beyond AWS and Azure, so
 *   none are named here.
 * - verified old-site titles: AEM "Custom development", Commerce "Implementation and customization" / "Platform
 *   migration", AEP and Marketo "Customization and optimization", Integrated Data Solutions integration titles.
 * - evidenced by MapleRecord: MiG designed, built and runs MapleRecord (five modules), confirmed by the owner on 2026-11-06.
 * - owner-stated (2026-11-07, restated in the round-3 brief): custom enterprise software is core expertise
 *   ("Enterprise Technology Solutions": engineering, cloud, custom software). The application patterns named here
 *   (forms, approval routing, workflows, audit trails) are the ones MapleRecord itself demonstrates.
 * MapleRecord is presented by the callout placed directly after the capabilities (see the page), so it is not repeated
 * here as a capability card.
 * No clients, team size, delivery models, SLAs or certifications: those are owner questions.
 */
export const softwareDevelopment: ServiceContent = {
  slug: "software-development",
  interest: "software-development",
  name: "Engineering & Technology",
  meta: {
    title: "Engineering & Technology",
    // 155 characters.
    description:
      "Cloud engineering on AWS and Azure, DevOps and CI/CD, AI/ML enablement, mobile development, QA and custom enterprise applications, designed, built and run.",
  },
  hero: {
    eyebrow: "Cloud · DevOps · AI/ML · Mobile · QA",
    title: "Engineering that ships, scales and keeps running.",
    lead: "We engineer cloud platforms on AWS and Azure, automate delivery with DevOps and CI/CD, bring AI/ML into real applications, and build mobile apps and enterprise software, with quality assurance built into every release.",
  },
  problem: {
    title: "Slow releases and fragile systems hold the rest of the business back.",
    body: [
      "Applications run on infrastructure nobody wants to touch. Releases are manual and infrequent, testing happens at the end, and every change carries risk. Meanwhile, teams wait on mobile access, AI pilots stall before production, and critical processes still run on spreadsheets and email.",
      "Adding tools rarely fixes it. What works is engineering discipline end to end: cloud platforms designed for how you operate, automated pipelines with quality checks at every step, and software shaped around the actual process and connected to the systems that hold your data.",
    ],
    signals: [
      "Releases that are manual, infrequent and risky",
      "Cloud costs and environments that nobody fully owns",
      "Defects found by users instead of by testing",
      "AI/ML pilots that never reach production",
      "Field and frontline teams without mobile access to core systems",
      "Critical processes tracked in spreadsheets and email",
    ],
  },
  audience: [
    { role: "CIOs, CTOs and IT leaders", need: "Cloud platforms and software that are secure, supported and cost-aware." },
    { role: "Engineering and product leaders", need: "Faster, safer releases through automation and built-in testing." },
    { role: "Operations and department heads", need: "Applications and mobile tools that fit how the work is actually done." },
    { role: "Data and analytics teams", need: "A path from AI/ML models to applications people use every day." },
  ],
  capabilitiesIntro:
    "Enterprise technology solutions, one capability at a time or combined: from a cloud migration or a test automation program to a complete custom application.",
  capabilities: [
    {
      id: "cloud",
      title: "Cloud strategy and engineering",
      summary: "Cloud platforms on AWS and Azure, planned around your workloads and engineered to be secure, resilient and cost-aware.",
      items: [
        "Cloud strategy, readiness assessment and roadmap",
        "Architecture and landing zones on AWS and Azure",
        "Migration and modernization of existing applications",
        "Security, access and cost controls built in",
      ],
      provenance: "verified",
    },
    {
      id: "devops",
      title: "DevOps and CI/CD automation",
      summary: "Build, test and release automated end to end, so changes ship more often with less risk.",
      items: [
        "Continuous integration and delivery pipelines",
        "Infrastructure as code and repeatable environments",
        "Automated quality and security checks in every pipeline",
        "Monitoring, alerting and release practices",
      ],
      provenance: "verified",
    },
    {
      id: "ai-ml",
      title: "AI/ML enablement",
      summary: "AI and machine learning moved from pilot to production, inside the applications and workflows people already use.",
      items: [
        "Use-case selection and feasibility",
        "Data pipelines and cloud environments for model development",
        "AI/ML capabilities built into applications and workflows",
        "Responsible-AI controls with our AI Governance practice",
      ],
      provenance: "verified",
    },
    {
      id: "mobile",
      title: "Mobile development",
      summary: "Mobile apps that give customers, staff and field teams secure access to the services and data they need.",
      items: [
        "Mobile app design and development",
        "Secure connections to enterprise systems and workflows",
        "Testing across devices and screen sizes",
        "Release, monitoring and ongoing updates",
      ],
      provenance: "verified",
    },
    {
      id: "qa",
      title: "Quality assurance engineering",
      summary: "Testing built into delivery from the first sprint, so defects are found by your pipeline, not your users.",
      items: [
        "Test strategy and planning",
        "Functional, regression and integration testing",
        "Test automation within CI/CD pipelines",
        "Performance and load testing",
      ],
      provenance: "verified",
    },
    {
      // Basis: owner-stated core expertise (custom enterprise software); pattern evidenced by MapleRecord
      // (MR Workflows, MR Forms, MR Requests). Keep the id stable for deep links.
      id: "custom-applications",
      title: "Custom applications and workflow automation",
      summary: "Business applications, digital forms and workflows built around your processes, for the work packaged software doesn't fit.",
      items: [
        "Requirements, process mapping and solution design",
        "Application design and development",
        "Digital forms, approval routing and automated workflows",
        "Role-based access and audit trails built in",
      ],
      provenance: "verified",
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
        "Customization of Adobe Experience Platform and Marketo Engage",
      ],
      provenance: "verified",
    },
  ],
  approach: [
    {
      stage: "Understand & strategize",
      activities:
        "Review your applications, infrastructure, release process and the problem to solve, then agree the target architecture and what the first release must do.",
      deliverable: "Assessment, target architecture and delivery roadmap",
    },
    {
      stage: "Implement & integrate",
      activities:
        "Build, migrate and integrate in short iterations, with automated pipelines and testing from the start, and release with minimal disruption.",
      deliverable: "Working software and platforms, pipelines and documentation",
    },
    {
      stage: "Optimize & grow",
      activities:
        "Monitor performance, reliability and cost, fix issues, and add enhancements as your needs and platforms change.",
      deliverable: "Monitoring, an improvement backlog and ongoing support",
    },
  ],
  deliverables: [
    { title: "Assessment and roadmap", description: "Where your applications and platforms stand today, and a prioritized path forward." },
    { title: "Target architecture", description: "How the cloud platform, applications and integrations fit together, and who can access what." },
    { title: "Working software and platforms", description: "Built, tested and released, with access controls and audit trails where they matter." },
    { title: "Automated pipelines", description: "Repeatable build, test and deployment, with quality checks at every step." },
    { title: "Test assets", description: "Test plans, automated test suites and results your teams can keep running." },
    { title: "Documentation and support", description: "Plain-language guides, a handover for your teams, and an agreed way to resolve issues." },
  ],
  useCases: [
    {
      title: "Moving a core application to the cloud",
      context: "An organization runs a customer-facing application on aging on-premises servers, with quarterly manual releases.",
      approach:
        "Assess the application and its dependencies, design the target environment on AWS or Azure, migrate in stages, and set up a CI/CD pipeline with automated regression tests.",
      outcome: "Releases become routine instead of risky events, and the platform scales with demand.",
    },
    {
      title: "Giving field teams a mobile app",
      context: "Inspectors record findings on paper and re-enter them at the office, so reports lag by days.",
      approach:
        "Design a mobile app around the inspection workflow, connect it securely to the back-office system, and test it across the devices the team uses.",
      outcome: "Findings are captured once, on site, and reach the people who act on them the same day.",
    },
    {
      title: "Replacing a spreadsheet approval process",
      context: "A public agency tracks permit approvals in spreadsheets and email, and nobody can see where a request is.",
      approach:
        "Map the steps and decision points, build a digital form and approval workflow with role-based access, and connect it to the systems that hold applicant data.",
      outcome: "Each request has a visible status, a named owner and an audit trail, and staff stop re-keying data.",
    },
  ],
  benefits: [
    { title: "Faster, safer releases", description: "Automated pipelines and testing reduce the risk of every change." },
    { title: "Cloud you control", description: "Platforms on AWS and Azure with security and cost controls built in." },
    { title: "Software that fits", description: "Built around the process, not the other way round." },
    { title: "Room to grow", description: "Documented, supported systems your teams can extend as needs evolve." },
  ],
  faqs: [
    {
      question: "Which cloud platforms do you work with?",
      answer:
        "AWS and Azure. We plan, build and migrate workloads on either, and connect them to the on-premises and cloud systems you already run.",
    },
    {
      question: "What does quality assurance engineering cover?",
      answer:
        "Test strategy and planning, functional, regression and integration testing, and test automation inside your delivery pipelines. We build testing into delivery from the start, whether we are building the software or testing software your teams build.",
    },
    {
      question: "Do you build mobile apps?",
      answer:
        "Yes. We design and build mobile apps for customers, staff and field teams, connect them securely to your enterprise systems, and test them across the devices your users have.",
    },
    {
      question: "How does AI/ML enablement relate to your data and AI governance work?",
      answer:
        "AI/ML depends on well-governed data and needs clear rules for responsible use. Our engineering teams build the pipelines, environments and application features; our Data & Analytics and AI Governance practices cover the data foundations and the controls around them.",
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
  ],
  cta: {
    title: "Tell us what you need to build or modernize.",
    body: "Describe the application, platform or process involved. We'll scope a practical first release with you.",
  },
};
