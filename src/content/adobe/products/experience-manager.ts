import type { AdobeProduct } from "@/lib/content/types";

/**
 * Verified on the old site: product scope, and the six service types below (titles unchanged).
 * Everything else is new copy. Adobe feature names checked against Experience League
 * (AEM as a Cloud Service, headless, Edge Delivery Services, MSM and translation docs), Nov 2026.
 * Edge Delivery Services: "part of Adobe Experience Manager", authored in the Universal Editor or with
 * document-based authoring (Microsoft Word/SharePoint or Google Docs/Drive). Experience Fragments and
 * Content Fragments can be exported to Adobe Target as offers.
 * Not claimed (unconfirmed by MiG): AEM 6.5 to AEM as a Cloud Service migration, AEM Forms, Edge Delivery
 * Services builds. Add them only once MiG confirms delivery capability.
 */
export const experienceManager: AdobeProduct = {
  slug: "experience-manager",
  name: "Adobe Experience Manager",
  shortName: "Experience Manager",
  area: "Content",
  legacyPaths: ["/adobe-experience-manager", "/adobe-content-management"],
  summary: "Websites, content and digital assets in Adobe Experience Manager that teams can update and reuse across channels.",
  description: "Adobe's content and digital asset management platform for building websites and delivering content and assets across channels.",
  meta: {
    title: "Adobe Experience Manager Services",
    description:
      "Adobe Experience Manager implementation, integration, multi-site management, content strategy and custom development for AEM Sites and AEM Assets.",
  },
  hero: {
    title: "Content and assets your teams can publish and reuse across every site.",
    lead: "We implement and integrate Adobe Experience Manager, organize your content and assets, set up multi-site management, and build the custom components and personalization your teams need.",
  },
  overview: {
    heading: "What Adobe Experience Manager does",
    intro:
      "Adobe Experience Manager (AEM) is Adobe's platform for managing web content and digital assets and delivering them to websites, apps and other channels. It combines page authoring, structured content and asset management, with workflows and permissions that govern how content gets published.",
    features: [
      {
        title: "AEM Sites",
        body: "Authors build and edit pages from reusable components and templates, preview them, and publish through approval workflows.",
      },
      {
        title: "AEM Assets",
        body: "A digital asset management system for storing, tagging, searching and distributing images, video and documents, with metadata and renditions for each channel.",
      },
      {
        title: "Content Fragments and headless delivery",
        body: "Content Fragments hold structured, channel-neutral content based on Content Fragment Models. Apps and front ends retrieve them through AEM's GraphQL API and other delivery APIs.",
      },
      {
        title: "Experience Fragments",
        body: "Groups of components with their layout, such as a promotional banner or a footer, that can be reused across pages and sites.",
      },
      {
        title: "Multi Site Manager and language copies",
        body: "Multi Site Manager rolls content out from a blueprint to live copies, while language copies and translation projects manage content for each language.",
      },
      {
        title: "AEM as a Cloud Service and Edge Delivery Services",
        body: "AEM as a Cloud Service is the current, cloud-native version of AEM, with code deployed through Cloud Manager. Edge Delivery Services, also part of AEM, is a newer way to build and deliver sites, with content authored in the Universal Editor or in documents such as Microsoft Word or Google Docs.",
      },
    ],
  },
  signals: [
    "Several websites or brands maintained separately, with content duplicated between them",
    "Simple page changes that need a developer or wait in a release queue",
    "Images and documents scattered across shared drives with no single source",
    "A new region, language or brand to launch on an existing AEM setup",
    "An AEM implementation that authors find hard to use or that has drifted from its original design",
    "Content that needs to reach apps or other channels, not just web pages",
  ],
  services: [
    {
      title: "Implementation and integration",
      body: "We set up Adobe Experience Manager to fit your sites and teams, and connect it to the systems that supply or use its content.",
      items: [
        "Review of requirements, current sites and content",
        "Site structure, editable templates and Core Components configuration",
        "Integration with other Adobe applications and enterprise systems",
        "Testing, documentation and handover",
      ],
      provenance: "verified",
    },
    {
      title: "Content and asset management",
      body: "We organize content and assets so authors can find, reuse and publish them without workarounds.",
      items: [
        "Folder structure, metadata schemas and tag setup in AEM Assets",
        "Content Fragment Models for structured, reusable content",
        "Authoring and approval workflows with user groups and permissions",
        "Training for authors and asset managers",
      ],
      provenance: "verified",
    },
    {
      title: "Personalization and targeting",
      body: "We prepare AEM content so different audiences can see different experiences, with variations that authors manage in AEM and your targeting tools deliver.",
      items: [
        "Mapping audiences to the content each one should see",
        "Content variations built as Experience Fragments and Content Fragments",
        "Adobe Target integration and export of fragments to Target as offers",
        "Reviews of what's shown with your testing and analytics teams",
      ],
      provenance: "verified",
    },
    {
      title: "Multi-site management",
      body: "We set up Multi Site Manager and language copies so regional, brand or language sites share a common base and still allow local changes.",
      items: [
        "Blueprint and live copy structure for related sites",
        "Rollout configurations that define what's inherited and what's local",
        "Language copies and translation workflows",
        "Guidance for local teams on inheritance and rollouts",
      ],
      provenance: "verified",
    },
    {
      title: "Content strategy",
      body: "We help you decide what content you need, how it should be structured, and who owns it, before it's built into templates and models.",
      items: [
        "Audit of existing content and assets: what to keep, merge or retire",
        "Content model and reuse plan across sites and channels",
        "Ownership, review steps and publishing standards",
        "Taxonomy and naming conventions that tags and metadata follow",
      ],
      provenance: "verified",
    },
    {
      title: "Custom development",
      body: "We build what standard AEM features don't cover, following Adobe's development practices so it stays maintainable.",
      items: [
        "Custom components and templates",
        "Back-end services, Sling Models and custom workflow steps",
        "Integrations through AEM APIs and headless delivery",
        "Code reviews and fixes, including issues flagged by Cloud Manager quality checks",
      ],
      provenance: "verified",
    },
  ],
  scenarios: [
    {
      title: "Bringing scattered assets into one library",
      context:
        "A consumer goods company keeps product images and documents across shared drives and agency folders, and its websites often show outdated versions.",
      approach:
        "Design a folder structure, metadata schema and tagging model in AEM Assets, migrate the current assets, and set up review and expiry workflows for marketing and product teams.",
      outcome: "Teams find approved assets in one place, and the websites draw from the same library.",
    },
    {
      title: "Reusing content beyond the website",
      context:
        "A financial services firm maintains the same product details in its website, its mobile app and printed materials, and updates often fall out of step.",
      approach:
        "Define Content Fragment Models for product information, move the content into Content Fragments, and connect the app to AEM through headless delivery while the website uses the same fragments.",
      outcome: "Product details are edited once and appear consistently on the website and in the app.",
    },
  ],
  related: [
    {
      slug: "target",
      why: "Experience Fragments and Content Fragments created in Experience Manager can be exported to Target as offers for testing and personalization.",
    },
    {
      slug: "analytics",
      why: "Analytics measures how visitors use AEM pages and content, so teams can see what works.",
    },
    {
      slug: "commerce",
      why: "Commerce runs the catalog and checkout while Experience Manager manages the content and assets around them.",
    },
  ],
  insights: ["maximizing-efficiency-with-adobe-experience-manager"],
  faqs: [
    {
      question: "Do you work on existing AEM sites?",
      answer:
        "Yes, often. Many engagements start with an assessment of the current setup, covering components, templates, content structure and authoring workflows, followed by fixes, custom development or ongoing improvements.",
    },
    {
      question: "How are AEM Sites and AEM Assets different?",
      answer:
        "AEM Sites is for building and publishing web pages from components and templates. AEM Assets is for storing, organizing and distributing digital assets such as images, video and documents. They are often used together, with pages drawing images and files from Assets.",
    },
    {
      question: "Can AEM handle several regional or language sites?",
      answer:
        "Yes. Multi Site Manager lets related sites inherit content from a shared blueprint while allowing local changes, and language copies support translation. We help design that structure and set up the rollout and translation workflows.",
    },
    {
      question: "Do you train content authors?",
      answer:
        "Yes. Training is part of how we hand over work, so authors and asset managers can create, update and publish content without relying on developers for routine changes.",
    },
    {
      question: "Can you help with a specific AEM feature or project type you don't list here?",
      answer:
        "Ask us and we'll tell you plainly whether we're a good fit. Our Adobe Experience Manager work covers implementation and integration, content and asset management, personalization, multi-site management, content strategy and custom development.",
    },
  ],
  cta: {
    title: "Make Adobe Experience Manager easier to run.",
    body: "Tell us about your sites, content and assets, and where publishing slows down. We'll recommend where to start.",
  },
};
