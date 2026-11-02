import type { ServiceContent } from "@/lib/content/types";

/**
 * Product scope and per-product service types come from the existing site's Adobe pages
 * (/adobe-experience-platform, /adobe-real-time-cdp, /adobe-experience-manager, /adobe-content-management,
 * /adobe-analytics, /adobe-target, /adobe-marketo-services, /adobe-commerce). Product names and
 * descriptions follow Adobe's current documentation naming as of November 2026.
 * No partner tier is claimed here — see company.adobePartner in config/site.ts.
 */
export const adobeServices: ServiceContent = {
  slug: "adobe-services",
  interest: "adobe-services",
  name: "Adobe Services",
  meta: {
    title: "Adobe Services",
    description:
      "Implementation, integration and optimization for Adobe Experience Platform, Real-Time CDP, Experience Manager, Analytics, Target, Marketo Engage and Commerce.",
  },
  hero: {
    eyebrow: "Adobe Services",
    title: "Make your Adobe platforms work as one customer experience system.",
    lead: "We implement, integrate, and optimize Adobe Experience Platform, Real-Time CDP, Experience Manager, Analytics, Target, Marketo Engage, and Commerce, and we connect them to the enterprise data they depend on.",
  },
  problem: {
    title: "Licensed capability isn't the same as delivered value.",
    body: [
      "Each Adobe application is powerful on its own, but many organizations run them as separate projects. The result is customer profiles that don't match analytics, content that can't be personalized, and campaigns built on stale audiences.",
      "The symptoms are manual workarounds, inconsistent customer experiences, and trouble showing what the investment returns. Getting value depends less on features than on data design, integration, governance, and the way teams operate the platforms day to day.",
    ],
    signals: [
      "Customer profiles fragmented across Adobe and other systems",
      "Personalization held back by content or data readiness",
      "Reports from different tools that don't reconcile",
      "Implementations that stalled after go-live",
      "Teams unsure how to use features they already license",
    ],
  },
  audience: [
    { role: "Marketing and digital experience leaders", need: "Personalized, consistent journeys across channels." },
    { role: "Marketing operations", need: "Reliable automation, clean data, and less manual effort." },
    { role: "Technology and architecture teams", need: "Sound integration with CRM, commerce and data platforms." },
    { role: "E-commerce leaders", need: "A commerce platform that scales and connects to the wider experience." },
  ],
  capabilitiesIntro:
    "We organize Adobe work around what you're trying to achieve, then bring in the applications that serve it.",
  capabilities: [
    {
      id: "customer-data",
      title: "Customer data and profiles",
      summary: "Schemas, identity and data flows designed so that real-time profiles and audiences are accurate and usable.",
      items: ["Data model and identity strategy", "Source connections and ingestion", "Audience design and activation", "Profile data governance and quality"],
      platforms: ["Adobe Experience Platform", "Real-Time CDP"],
      provenance: "verified",
    },
    {
      id: "content",
      title: "Content and digital assets",
      summary: "Sites and assets that teams can update quickly and reuse across channels.",
      items: ["Site and component implementation", "Digital asset management", "Multi-site management and localization", "Content strategy and authoring workflows"],
      platforms: ["Adobe Experience Manager"],
      provenance: "verified",
    },
    {
      id: "measurement",
      title: "Analytics and measurement",
      summary: "Measurement that teams trust, from tracking design to the dashboards people use.",
      items: ["Measurement plans and implementation", "Custom dashboards and reporting", "Data strategy and consultation", "Ongoing optimization"],
      platforms: ["Adobe Analytics"],
      provenance: "verified",
    },
    {
      id: "personalization",
      title: "Testing and personalization",
      summary: "Experiments and targeted experiences grounded in audience data and ready content.",
      items: ["Personalization strategy", "A/B and multivariate test design", "Audience-based targeting", "Campaign optimization"],
      platforms: ["Adobe Target", "Real-Time CDP", "Adobe Experience Manager"],
      provenance: "verified",
    },
    {
      id: "automation",
      title: "Marketing automation",
      summary: "Lead management and nurture programs that run reliably across channels.",
      items: ["Instance setup and integration", "Campaign management and automation", "Reporting and analytics", "Customization and optimization"],
      platforms: ["Adobe Marketo Engage"],
      provenance: "verified",
    },
    {
      id: "commerce-capability",
      title: "Commerce",
      summary: "Online stores that perform and connect to content, data and marketing.",
      items: ["E-commerce strategy", "Implementation and customization", "Migration to Adobe Commerce", "Support and performance optimization"],
      platforms: ["Adobe Commerce"],
      provenance: "verified",
    },
    {
      id: "integration",
      title: "Integration with enterprise systems",
      summary: "Adobe applications connected to each other and to the systems around them.",
      items: ["Connections to CRM, ERP and data platforms", "Data flows between Adobe applications", "Integration testing", "Documentation and handover"],
      platforms: ["All applications"],
      provenance: "verified",
    },
  ],
  platforms: [
    {
      id: "experience-platform",
      name: "Adobe Experience Platform",
      area: "Customer data",
      description:
        "Adobe's foundation for bringing customer data together from across channels and standardizing it into real-time customer profiles that other Adobe applications use.",
      services: ["Implementation and integration", "Customization and optimization", "Data strategy and management", "Training and support"],
    },
    {
      id: "real-time-cdp",
      name: "Adobe Real-Time Customer Data Platform",
      area: "Customer data",
      description:
        "An application built on Adobe Experience Platform for building audiences from unified profiles and activating them to marketing, advertising and personalization destinations.",
      services: ["Implementation and setup", "Data strategy and management", "Personalization and campaign optimization", "Training and support"],
    },
    {
      id: "experience-manager",
      name: "Adobe Experience Manager",
      area: "Content",
      description:
        "Adobe's content and digital asset management platform for building websites and delivering content and assets across channels.",
      services: [
        "Implementation and integration",
        "Content and asset management",
        "Personalization and targeting",
        "Multi-site management",
        "Content strategy",
        "Custom development",
      ],
    },
    {
      id: "analytics",
      name: "Adobe Analytics",
      area: "Analytics",
      description:
        "Collects and analyzes behavioral data from websites, apps and other digital channels, with segmentation, reporting and attribution.",
      services: ["Implementation", "Custom dashboards", "Data strategy and consultation", "Ongoing support and optimization"],
    },
    {
      id: "target",
      name: "Adobe Target",
      area: "Personalization",
      description:
        "Testing and personalization: A/B and multivariate tests, plus rule-based and AI-assisted targeting of content and offers.",
      services: ["Implementation and setup", "Personalization strategy", "A/B and multivariate testing", "Ongoing support and management"],
    },
    {
      id: "marketo-engage",
      name: "Adobe Marketo Engage",
      area: "Marketing automation",
      description:
        "Marketing automation for lead management, nurturing and cross-channel engagement programs, widely used in B2B marketing.",
      services: ["Implementation and integration", "Campaign management and automation", "Reporting and analytics", "Customization and optimization"],
    },
    {
      id: "commerce",
      name: "Adobe Commerce",
      area: "Commerce",
      description:
        "A commerce platform, formerly known as Magento, for B2C and B2B online stores, with catalog management and extensibility.",
      services: ["E-commerce strategy", "Implementation and customization", "Platform migration", "Ongoing support and optimization"],
    },
  ],
  approach: [
    {
      stage: "Assess",
      activities: "Review your current Adobe setup, data flows, use cases and team practices.",
      deliverable: "Platform assessment and prioritized opportunities",
    },
    {
      stage: "Design",
      activities: "Define the target architecture, data model, integrations, and the use cases to deliver first.",
      deliverable: "Solution design and implementation plan",
    },
    {
      stage: "Implement",
      activities: "Configure, build, integrate and test, and train your teams to run what we deliver.",
      deliverable: "Working implementation, documentation and trained users",
    },
    {
      stage: "Improve",
      activities: "Monitor adoption and performance, then refine journeys, tests and content.",
      deliverable: "Optimization backlog and ongoing support",
    },
  ],
  deliverables: [
    { title: "Platform assessment", description: "How your Adobe applications are configured and used, and where the gaps are." },
    { title: "Solution architecture and data model", description: "Schemas, identity, integrations and data flows, documented." },
    { title: "Measurement plan", description: "What to track, why, and how it maps to business questions." },
    { title: "Implemented configuration", description: "Configured applications and integrations, tested against agreed use cases." },
    { title: "Personalization and testing roadmap", description: "Prioritized experiments and audience-based experiences." },
    { title: "Runbooks and training", description: "Documentation and sessions that let your teams operate independently." },
  ],
  useCases: [
    {
      title: "Unifying profiles for personalization",
      context: "A retailer runs web analytics, email and commerce separately and can't personalize consistently.",
      approach: "Design an identity strategy in Adobe Experience Platform, connect commerce and CRM data, and define shared audiences in Real-Time CDP for web and email.",
      outcome: "Marketing works from one profile and a shared set of audiences across channels.",
    },
    {
      title: "Rebuilding a content platform",
      context: "A manufacturer maintains several regional websites with duplicated content and slow updates.",
      approach: "Implement Adobe Experience Manager with shared components, multi-site management and a localization workflow.",
      outcome: "Regional teams publish from a common foundation, and brand and product content stays consistent.",
    },
    {
      title: "Making measurement trustworthy",
      context: "A media company's teams quote different numbers for the same campaign.",
      approach: "Write a measurement plan, re-implement Adobe Analytics tracking, validate the data, and build shared dashboards.",
      outcome: "Teams make decisions from one agreed set of metrics.",
    },
  ],
  benefits: [
    { title: "A connected customer view", description: "Profiles, content and measurement that work from the same data." },
    { title: "Faster content delivery", description: "Reusable components and workflows that shorten the path to publish." },
    { title: "Measurable experimentation", description: "Tests and personalization tied to metrics everyone agrees on." },
    { title: "More from existing licenses", description: "Put capabilities you already pay for into everyday use." },
  ],
  faqs: [
    {
      question: "Which Adobe products do you work with?",
      answer:
        "Adobe Experience Platform, Real-Time CDP, Experience Manager, Analytics, Target, Marketo Engage and Commerce. If you use other Adobe applications, ask us and we'll tell you plainly whether we're a good fit.",
    },
    {
      question: "Can you improve an existing implementation?",
      answer:
        "Yes. Many engagements start with an assessment of an existing setup, followed by fixes, integration work or ongoing optimization.",
    },
    {
      question: "Do you provide training?",
      answer: "Yes. Training and support are part of our Adobe services, so your teams can operate and extend what we deliver.",
    },
    {
      question: "How do you handle customer data and consent in Adobe applications?",
      answer:
        "We design data models, labels and access so that the use of profiles and audiences follows your consent and data governance policies. This is where our Adobe work connects directly with our Data Management practice.",
    },
  ],
  cta: {
    title: "Get more from your Adobe investment.",
    body: "Tell us which Adobe applications you use and where you want to improve. We'll recommend where to start.",
  },
};
