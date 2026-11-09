import type { AdobeProduct } from "@/lib/content/types";

/**
 * Verified: the offering itself and its three service themes come from the Capability Matrix (Oct 2026),
 * "09 Adobe Content Management — Streamlined content creation, governance, and omnichannel publishing",
 * and the old site's /adobe-content-management page (which now redirects here).
 * Adobe does not sell a product called "Adobe Content Management": in Adobe Experience Cloud, content is
 * managed in Adobe Experience Manager (AEM Sites and AEM Assets). This page says so plainly, and covers the
 * day-to-day content operation; platform implementation and custom development stay on experience-manager.ts.
 * Adobe feature names checked against Experience League (Universal Editor, Content Fragments, Launches,
 * workflows, Content Hub, Adobe Asset Link, language copies), Nov 2026. Scenarios are hypothetical.
 * Scope split with experience-manager.ts: keep scenarios, signals and FAQs distinct between the two pages.
 */
export const contentManagement: AdobeProduct = {
  slug: "content-management",
  name: "Adobe Content Management",
  shortName: "Content Management",
  area: "Content",
  legacyPaths: ["/adobe-content-management"],
  summary: "Streamlined content creation, governance and omnichannel publishing across AEM Sites and AEM Assets.",
  description:
    "How content is created, governed and published in Adobe Experience Cloud, using Adobe Experience Manager Sites and Assets.",
  meta: {
    title: "Adobe Content Management Services",
    description:
      "Content creation, governance and omnichannel publishing in Adobe Experience Manager: authoring workflows, content models, metadata and approvals for every channel.",
  },
  hero: {
    title: "Create, govern and publish content once, for every channel.",
    lead: "We set up how your teams create, review and publish content in Adobe Experience Manager, with content models, workflows, metadata and permissions that keep it accurate, on brand and ready for every channel.",
  },
  overview: {
    heading: "How content management works in Adobe",
    intro:
      "Adobe doesn't sell a separate content management product. In Adobe Experience Cloud, content is managed in Adobe Experience Manager: AEM Sites for pages and structured content, AEM Assets for images, video and documents. Content management is how those tools are set up and used every day, from creation to approval to publishing.",
    features: [
      {
        title: "Authoring in AEM Sites",
        body: "Authors build pages from components and templates in the page editor, or edit pages and headless content visually in the Universal Editor.",
      },
      {
        title: "Content Fragments for structured content",
        body: "Content Fragments hold channel-neutral content based on Content Fragment Models, so the same text and data can be reused on websites, in apps and in other channels through AEM's delivery APIs.",
      },
      {
        title: "AEM Assets and Adobe Asset Link",
        body: "AEM Assets stores, tags and distributes images, video and documents. Adobe Asset Link lets designers open and save AEM assets directly from Creative Cloud apps such as Photoshop, Illustrator and InDesign.",
      },
      {
        title: "Workflows, permissions and launches",
        body: "Workflows route content for review and approval, user groups and permissions control who can edit and publish, and launches let teams prepare future changes to pages without affecting the live site.",
      },
      {
        title: "Metadata, tags and Content Hub",
        body: "Metadata schemas and tags make content and assets findable. Content Hub, part of AEM Assets, gives wider teams a portal to find and use brand-approved assets.",
      },
      {
        title: "Language copies and multi-site rollout",
        body: "Language copies and translation projects manage content for each language, and Multi Site Manager rolls shared content out to regional or brand sites.",
      },
    ],
  },
  signals: [
    "Content requests that queue behind a small group of specialists",
    "No agreed review and approval path, so outdated or off-brand content gets published",
    "The same content maintained separately for the website, the app and campaigns",
    "Assets that are hard to find, poorly tagged or used after they should have expired",
    "Regional and language teams that can't publish without central help",
    "AEM in place, but authors work around it instead of with it",
  ],
  services: [
    {
      title: "Content creation and authoring",
      body: "We make it straightforward for your teams to create content in Adobe Experience Manager, with the components, templates and models they need and no developer in the loop for routine work.",
      items: [
        "Review of who creates which content, and where it slows down",
        "Templates, components and Content Fragment Models matched to your content types",
        "Authoring set up in the page editor or Universal Editor",
        "Creative Cloud connection through Adobe Asset Link",
        "Author guides and training",
      ],
      provenance: "verified",
    },
    {
      title: "Content governance",
      body: "We define and configure the rules that keep content accurate, on brand and in line with your policies, from ownership to approval to expiry.",
      items: [
        "Content ownership, roles and permissions",
        "Review and approval workflows",
        "Metadata schemas, taxonomy and tagging standards",
        "Asset expiry and retirement of outdated content",
        "Audit of existing content: what to keep, merge or retire",
      ],
      provenance: "verified",
    },
    {
      title: "Omnichannel publishing",
      body: "We structure content so it's written once and published to websites, apps, campaigns and regional sites from the same source.",
      items: [
        "Content models for reuse across channels",
        "Headless delivery of Content Fragments to apps and front ends",
        "Translation and rollout routines for language and regional sites",
        "Brand-approved asset distribution through Content Hub",
        "Publishing schedules and launches for planned changes",
      ],
      provenance: "verified",
    },
  ],
  scenarios: [
    {
      title: "Clearing a content request queue",
      context:
        "A healthcare provider's web team handles every content change for dozens of departments, and requests wait weeks to be published.",
      approach:
        "Define content types and templates for department pages, set up a review and approval workflow with clear owners, and train department authors to create and submit their own updates.",
      outcome: "Departments update their own content, and the web team reviews instead of rebuilding every request.",
    },
    {
      title: "One source for product content",
      context:
        "A manufacturer keeps product descriptions in its website, its dealer app and its campaign emails, and they often disagree.",
      approach:
        "Model product content as Content Fragments, agree who owns and approves each field, and publish the fragments to the website and the app through headless delivery.",
      outcome: "Product content is approved once and appears the same everywhere it's published.",
    },
  ],
  related: [
    {
      slug: "experience-manager",
      why: "Adobe Experience Manager is the platform behind Adobe content management. Its page covers implementation, integration and custom development.",
    },
    {
      slug: "target",
      why: "Content Fragments and Experience Fragments governed in AEM can be exported to Target as offers for testing and personalization.",
    },
    {
      slug: "analytics",
      why: "Analytics shows how published content performs, so teams know what to update, reuse or retire.",
    },
  ],
  insights: ["maximizing-efficiency-with-adobe-experience-manager"],
  faqs: [
    {
      question: "Is Adobe Content Management a separate Adobe product?",
      answer:
        "No. Adobe Content Management is how we describe our content work in Adobe Experience Cloud. The tools are Adobe Experience Manager Sites and AEM Assets, so if you already license AEM, you already have them.",
    },
    {
      question: "How is this different from your Adobe Experience Manager services?",
      answer:
        "Our Experience Manager services cover the platform: implementation, integration, multi-site setup and custom development. Content management covers how your teams use it every day: how content is created, reviewed, approved and published. Many projects include both.",
    },
    {
      question: "Can you improve content governance on an existing AEM setup?",
      answer:
        "Yes. We review how content is owned, approved and published today, then set up the roles, workflows, metadata and expiry rules that are missing, without rebuilding what already works.",
    },
    {
      question: "Do you train content authors?",
      answer:
        "Yes. Training is part of how we hand over work, so authors, approvers and asset managers can create and publish content without relying on developers for routine changes.",
    },
  ],
  cta: {
    title: "Make content easier to create, govern and publish.",
    body: "Tell us how your teams create and publish content today, and where it slows down. We'll scope a practical first step with you.",
  },
};
