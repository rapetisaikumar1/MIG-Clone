import type { ServiceContent } from "@/lib/content/types";

/**
 * Product scope and per-product service types come from the existing site's Adobe pages
 * (/adobe-experience-platform, /adobe-real-time-cdp, /adobe-experience-manager, /adobe-content-management,
 * /adobe-analytics, /adobe-target, /adobe-marketo-services, /adobe-commerce). Product names and
 * descriptions follow Adobe's current documentation naming as of November 2026.
 * Partner status is displayed in the header from company.adobePartner in config/site.ts.
 *
 * The hub deliberately has no `platforms` matrix: the applications section in
 * src/features/adobe/hub-sections.tsx lists each product once (what it does + verified service types)
 * and carries the product-slug anchors (/adobe-services#target) that the matrix used to provide.
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
    lead: "We implement, integrate and optimize Adobe Experience Cloud applications, from Experience Platform and Real-Time CDP to Experience Manager and Commerce, and connect them to the CRM, commerce and data systems they depend on.",
  },
  problem: {
    title: "Licensed capability isn't the same as delivered value.",
    body: [
      "Each Adobe application does a lot on its own, but many organizations implement them as separate projects. The result is customer profiles that don't match analytics, content that can't be personalized, and campaigns built on stale audiences.",
      "The symptoms are manual workarounds, inconsistent customer experiences, and trouble showing a return on the investment. Closing that gap depends less on features than on data design, integration, governance, and how teams run the platforms day to day.",
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
      summary: "Schemas, identity and data flows designed so real-time profiles and audiences are accurate and ready to use across channels.",
      items: ["Data model and identity strategy", "Source connections and ingestion", "Audience design and activation", "Profile data governance and quality"],
      platforms: ["Adobe Experience Platform", "Real-Time CDP"],
      provenance: "verified",
    },
    {
      id: "content",
      title: "Content and digital assets",
      summary: "Websites and assets your teams can update quickly and reuse across sites, regions and channels.",
      items: ["Site and component implementation", "Digital asset management", "Multi-site management and localization", "Content strategy and authoring workflows"],
      platforms: ["Adobe Experience Manager"],
      provenance: "verified",
    },
    {
      id: "measurement",
      title: "Analytics and measurement",
      summary: "Numbers teams trust, from tracking design to the dashboards people use to make decisions.",
      items: ["Measurement plans and tracking implementation", "Custom dashboards and reporting", "Data strategy and consultation", "Ongoing optimization"],
      platforms: ["Adobe Analytics"],
      provenance: "verified",
    },
    {
      id: "personalization",
      title: "Testing and personalization",
      summary: "Experiments and targeted experiences built on reliable audience data and content that's ready to vary.",
      items: ["Personalization strategy", "A/B and multivariate test design", "Audience-based targeting", "Campaign optimization"],
      platforms: ["Adobe Target", "Real-Time CDP", "Adobe Experience Manager"],
      provenance: "verified",
    },
    {
      id: "automation",
      title: "Marketing automation",
      summary: "Lead management and nurture programs that run reliably across channels.",
      items: ["Instance setup and CRM integration", "Campaign and nurture program automation", "Campaign performance reporting", "Instance customization and optimization"],
      platforms: ["Adobe Marketo Engage"],
      provenance: "verified",
    },
    {
      id: "commerce-capability",
      title: "Commerce",
      summary: "Online stores that perform well and share data with your content, marketing and back-office systems.",
      items: ["E-commerce strategy", "Store implementation and customization", "Migration to Adobe Commerce", "Performance optimization and ongoing support"],
      platforms: ["Adobe Commerce"],
      provenance: "verified",
    },
    {
      id: "integration",
      title: "Integration with enterprise systems",
      summary: "Adobe applications connected to each other and to the systems around them, so data moves without manual handoffs.",
      items: ["Connections to CRM, ERP and data platforms", "Data flows between Adobe applications", "Integration testing", "Documentation and handover"],
      platforms: ["All applications"],
      provenance: "verified",
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
      question: "Which Adobe applications do you work with?",
      answer:
        "Adobe Experience Platform, Real-Time CDP, Experience Manager, Analytics, Target, Marketo Engage and Commerce. We can focus on one application or work across several and the integrations between them. If you use another Adobe application, ask us and we'll tell you plainly whether we're a good fit.",
    },
    {
      question: "Can you improve an existing implementation?",
      answer:
        "Yes. Many engagements start with a setup that's already live: we review how it's configured and used, then fix, integrate or optimize what's holding it back.",
    },
    {
      question: "Do you provide training?",
      answer:
        "Yes. Training and support are part of our Adobe services. We document what we deliver and train the people who will run it, so your teams can operate and extend it without us.",
    },
    {
      question: "How do you handle customer data and consent in Adobe applications?",
      answer:
        "We design data models, data usage labels and access so that profiles and audiences are used only in ways your consent records and data governance policies allow. This is where our Adobe work connects with our Data Management practice.",
    },
    {
      question: "Where should we start?",
      answer:
        "If you're not sure, start with a platform assessment: a review of how your Adobe applications are configured, integrated and used, with prioritized next steps. If you already know what you need, we can start directly with implementation, optimization or training.",
    },
    {
      question: "What do you need from us to get started?",
      answer:
        "Which Adobe applications you use, what you want to improve, and who on your side owns the platforms. Share this through the contact form and we'll follow up to discuss it.",
    },
  ],
  cta: {
    title: "Get more from your Adobe investment.",
    body: "Tell us which Adobe applications you use and where you want to improve. We'll recommend where to start.",
  },
};

/**
 * Hub-only sections on /adobe-services (rendered by src/features/adobe/hub-sections.tsx).
 * The applications section lists each product once, using the product's neutral description and its
 * verified service types from src/content/adobe/products. Entry points are the verified service types
 * (assessment, implementation and integration, optimization and support, training) — no prices,
 * durations or offers. The governance block expands the FAQ answer above and the "Profile data
 * governance and quality" / "Documentation and handover" capability items (both marked proposed in
 * docs/HANDOFF.md).
 */
export type AdobeEngagement = {
  id: string;
  title: string;
  description: string;
  goodWhen: string;
  /** "assessment" links to /adobe-services/assessment; "contact" to the Adobe contact form. */
  action: "assessment" | "contact";
  actionLabel: string;
};

export const adobeHub = {
  applications: {
    eyebrow: "Adobe applications",
    title: "The applications we implement and support",
    intro: "What each application does and the services we provide for it. Each has its own page with more detail.",
    servicesLabel: "Our services",
    startTile: {
      eyebrow: "Platform assessment",
      title: "Not sure which application to start with?",
      body: "An assessment reviews how your Adobe applications are configured, connected and used, and recommends where to start.",
      label: "About the assessment",
    },
  },
  engagements: {
    eyebrow: "Ways to engage",
    title: "Start where you are",
    intro: "Whether you're adopting a new application or improving one you already run, there's a sensible first step.",
    items: [
      {
        id: "assessment",
        title: "Platform assessment",
        description: "A review of how your Adobe applications are configured, integrated and used, ending in prioritized opportunities.",
        goodWhen: "you're unsure where the gaps are, or an implementation stalled after go-live.",
        action: "assessment",
        actionLabel: "About the assessment",
      },
      {
        id: "implementation",
        title: "Implementation and integration",
        description: "Setting up Adobe applications and connecting them to each other and to your CRM, commerce and data platforms.",
        goodWhen: "you're adopting a new Adobe application or connecting one to the rest of your stack.",
        action: "contact",
        actionLabel: "Discuss implementation",
      },
      {
        id: "optimization",
        title: "Optimization and ongoing support",
        description: "Refining what's already live: tracking, audiences, tests, content workflows and site performance.",
        goodWhen: "the platform is live but isn't delivering what you expected.",
        action: "contact",
        actionLabel: "Discuss optimization",
      },
      {
        id: "training",
        title: "Training and enablement",
        description: "Training, documentation and runbooks so your teams can operate and extend what's in place.",
        goodWhen: "your teams aren't yet using features you already license.",
        action: "contact",
        actionLabel: "Discuss training",
      },
    ] satisfies AdobeEngagement[],
  },
  governance: {
    eyebrow: "Governance built in",
    title: "Data governance inside your Adobe stack",
    intro:
      "Profiles and audiences are only as useful as the data behind them, and only as safe as the rules around it. We build consent, usage rules, data quality and documentation into Adobe work from the start, drawing on our Data Management practice.",
    items: [
      {
        title: "Consent-aware profiles",
        body: "Data models and identity rules designed so that profiles and audiences reflect the consent you've collected.",
      },
      {
        title: "Data usage labels and access",
        body: "Labels and access set up so that sensitive data is used only for the purposes your policies allow.",
      },
      {
        title: "Profile data quality",
        body: "Source connections and ingestion reviewed so that the profiles your teams activate stay accurate.",
      },
      {
        title: "Documented integrations",
        body: "Data flows between Adobe applications and enterprise systems, documented and handed over to your teams.",
      },
    ],
    link: { href: "/data-management", label: "Explore Data Management" },
  },
};
