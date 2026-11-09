import type { ServiceContent } from "@/lib/content/types";

/**
 * Pillar 03 of the Capability Matrix (Oct 2026), "Adobe Experience Cloud & MarTech: 9 Adobe offerings. One connected
 * stack." The hub presents the umbrella offering, Adobe Experience Cloud (AEC: "end-to-end digital strategy, content,
 * and customer journey orchestration", adobeHub.experienceCloud); the other eight offerings have their own pages.
 * Product scope and per-product service types come from the existing site's Adobe pages
 * (/adobe-experience-platform, /adobe-real-time-cdp, /adobe-experience-manager, /adobe-content-management,
 * /adobe-analytics, /adobe-target, /adobe-marketo-services, /adobe-commerce). Product names and
 * descriptions follow Adobe's current documentation naming as of November 2026.
 * Partner status is displayed in the header from company.adobePartner in config/site.ts.
 * Positioning (messaging guide §5.2): Adobe Experience Cloud applications implemented, integrated with your
 * enterprise systems, customized where standard features stop, and supported over time, by an Adobe Solution
 * Partner. The platform assessment is presented as the first phase of delivery, not as a standalone report.
 *
 * The hub deliberately has no `platforms` matrix: the applications section in
 * src/features/adobe/hub-sections.tsx lists each product once (what it does + verified service types)
 * and carries the product-slug anchors (/adobe-services#target) that the matrix used to provide.
 */
export const adobeServices: ServiceContent = {
  slug: "adobe-services",
  interest: "adobe-services",
  name: "Adobe Services",
  // Adobe articles are published under the insights theme "Adobe" (register GL-14).
  insightTheme: "Adobe",
  meta: {
    title: "Adobe Experience Cloud & MarTech",
    description:
      "Adobe Experience Cloud designed, implemented and optimized end to end: Experience Platform, Real-Time CDP, Experience Manager, Analytics, Marketo Engage, Target, Commerce and content management.",
  },
  hero: {
    // The pillar name from the Capability Matrix; the header nav keeps the shorter "Adobe Services".
    eyebrow: "Adobe Experience Cloud & MarTech",
    title: "Nine Adobe offerings. One connected stack.",
    lead: "As an Adobe Solution Partner, MiG designs, implements and optimizes Adobe Experience Cloud end to end, from customer data and content to testing, analytics and commerce, and integrates it with the CRM and data systems around it.",
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
    "We organize our Adobe delivery around what you're trying to achieve, then implement, integrate and customize the applications that serve it.",
  // Provenance is per capability. Three items inside "verified" capabilities are proposed extensions
  // (docs/HANDOFF.md), pending owner confirmation: "Profile data governance and quality" (customer-data),
  // "Integration testing" and "Documentation and handover" (integration).
  // "Data strategy and measurement planning" renames a verified old-site title (messaging guide §5.2,
  // register AH-01/AP-02; owner sign-off requested). Keep it identical to analytics.ts.
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
      summary: "Enterprise asset management, headless and hybrid CMS, and streamlined content creation, governance and omnichannel publishing.",
      items: ["Site and component implementation", "Digital asset management", "Multi-site management and localization", "Content strategy, governance and authoring workflows"],
      platforms: ["Adobe Experience Manager", "Adobe Content Management"],
      provenance: "verified",
    },
    {
      id: "measurement",
      title: "Analytics and measurement",
      summary: "Numbers teams trust, from tracking design to the dashboards people use to make decisions.",
      items: ["Measurement plans and tracking implementation", "Custom dashboards and reporting", "Data strategy and measurement planning", "Ongoing optimization"],
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
      summary: "B2B marketing automation, lead lifecycle management and campaign operations that run reliably across channels.",
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
      stage: "Understand & strategize",
      activities:
        "Review your current Adobe setup, data flows, use cases and team practices, then define the target architecture, data model and the use cases to deliver first.",
      deliverable: "Platform assessment, solution design and prioritized roadmap",
    },
    {
      stage: "Implement & integrate",
      activities:
        "Configure, build and test the Adobe applications, integrate them with each other and your CRM, commerce and data platforms with minimal disruption, and train your teams.",
      deliverable: "Working implementation, documentation and trained users",
    },
    {
      stage: "Optimize & grow",
      activities: "Monitor adoption, data and performance, then refine journeys, audiences, tests, content and campaigns.",
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
        "Across Adobe Experience Cloud: Adobe Experience Platform, Real-Time CDP, Experience Manager, Analytics, Marketo Engage, Target, Commerce and content management in AEM Sites and Assets. We can focus on one application or work across several and the integrations between them. If you use another Adobe application, ask us and we'll tell you plainly whether we're a good fit.",
    },
    {
      question: "Can you improve an existing implementation?",
      answer:
        "Yes. We can start from a setup that's already live: we review how it's configured and used, then fix, integrate or optimize what's holding it back.",
    },
    {
      question: "Do you provide training?",
      answer:
        "Yes. Training and support are part of our Adobe services. We document what we deliver and train the people who will run it, so your teams can operate and extend it without us.",
    },
    {
      question: "How do you handle customer data and consent in Adobe applications?",
      answer:
        "We design data models, data usage labels and access so that profiles and audiences are used only in ways your consent records and data governance policies allow. This is where our Adobe work connects with our Data & Analytics practice.",
    },
    {
      question: "Where should we start?",
      answer:
        "If you're not sure, start with a platform assessment, the first phase of delivery: we review how your Adobe applications are configured, integrated and used, then implement the priorities with you. If you already know what you need, we start directly with implementation, customization, optimization or training.",
    },
    {
      question: "What do you need from us to get started?",
      answer:
        "Which Adobe applications you use, what you want to improve, and who on your side owns the platforms. Share this through the contact form and we'll follow up to discuss it.",
    },
  ],
  cta: {
    title: "Get more from your Adobe investment.",
    body: "Tell us which Adobe applications you use and where you want to improve. We'll scope a practical first step with you.",
  },
};

/**
 * Hub-only sections on /adobe-services (rendered by src/features/adobe/hub-sections.tsx).
 * The applications section lists each product once (area, name and the product's one-line `summary`
 * from src/content/adobe/products); the per-product service lists stay on the product pages. "Ways to work
 * with us" lists the verified service types (assessment, implementation and integration, optimization and
 * support, training; offered as distinct entry points is proposed, docs/HANDOFF.md) — no prices,
 * durations or offers. The governance block expands the FAQ answer above and the "Profile data
 * governance and quality" / "Documentation and handover" capability items (both marked proposed in
 * docs/HANDOFF.md).
 */
export type AdobeWayToWork = {
  id: string;
  title: string;
  description: string;
  goodWhen: string;
  /** "assessment" links to /adobe-services/assessment; "contact" to the Adobe contact form. */
  action: "assessment" | "contact";
  actionLabel: string;
};

export const adobeHub = {
  /**
   * Offering 02 of the Capability Matrix, the umbrella over the other eight. Deck text: "Adobe Experience Cloud (AEC) —
   * End-to-end digital strategy, content, and customer journey orchestration." No separate page: this hub is its page.
   */
  experienceCloud: {
    area: "End to end",
    name: "Adobe Experience Cloud",
    summary: "End-to-end digital strategy, content and customer journey orchestration across the Adobe applications you use.",
    points: [
      "One roadmap and architecture across your Adobe applications",
      "Data, content and measurement designed to work together",
      "Customer journeys coordinated across channels and applications",
      "Integration with your CRM, commerce and data platforms",
    ],
  },
  applications: {
    eyebrow: "Adobe offerings",
    title: "Adobe Experience Cloud and the applications in it",
    intro: "We work across Adobe Experience Cloud as a whole, and on each application within it. Every application has its own page covering what it does and the services we provide for it.",
  },
  waysToWork: {
    eyebrow: "Ways to work with us",
    title: "Start where you are",
    intro: "Whether you're adopting a new application or improving one you already run, pick the starting point that fits. Each one leads into work our team delivers with yours.",
    /** Label on the assessment card, the suggested first step when a visitor is unsure (as the FAQ says). */
    recommendedLabel: "Not sure? Start here",
    items: [
      {
        id: "assessment",
        title: "Platform assessment",
        description: "The first phase of delivery: a review of how your Adobe applications are configured, integrated and used, ending in prioritized opportunities we can implement with you.",
        goodWhen: "you're unsure where the gaps are, or an implementation stalled after go-live.",
        action: "assessment",
        actionLabel: "About the assessment",
      },
      {
        id: "implementation",
        title: "Implementation and integration",
        description: "We implement Adobe applications, connect them to each other and to your CRM, commerce and data platforms, and customize them where standard features stop.",
        goodWhen: "you're adopting a new Adobe application or connecting one to the rest of your stack.",
        action: "contact",
        actionLabel: "Discuss implementation",
      },
      {
        id: "optimization",
        title: "Optimization and ongoing support",
        description: "We refine and support what's already live: tracking, audiences, tests, content workflows and site performance.",
        goodWhen: "the platform is live but isn't delivering what you expected.",
        action: "contact",
        actionLabel: "Discuss optimization",
      },
      {
        id: "training",
        title: "Training and enablement",
        description: "We train your teams and hand over documentation and runbooks, so they can operate and extend what's in place.",
        goodWhen: "your teams aren't yet using features you already license.",
        action: "contact",
        actionLabel: "Discuss training",
      },
    ] satisfies AdobeWayToWork[],
  },
  governance: {
    eyebrow: "Governance built in",
    title: "Data governance inside your Adobe stack",
    intro:
      "Profiles and audiences are only as useful as the data behind them, and only as safe as the rules around it. We build consent, usage rules, data quality and documentation into Adobe work from the start, drawing on our Data & Analytics practice.",
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
    link: { href: "/data-management", label: "Explore Data & Analytics" },
  },
};
