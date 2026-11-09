import type { AdobeProduct } from "@/lib/content/types";

/**
 * Verified on the old site: product scope, and the service types below (titles kept as listed).
 * Overview feature names checked against Experience League (Nov 2026): Experience Data Model (XDM),
 * sources, Data Prep, Web SDK, Edge Network, Identity Service, Real-Time Customer Profile, Query Service,
 * data usage labels, data governance policies and consent policies (consent policies are only available
 * with Adobe Healthcare Shield or Adobe Privacy & Security Shield), Federated Audience Composition.
 * Service items stay on the platform foundation (schemas, sources, identity, labels); audience and
 * destination work is described on the Real-Time CDP page so the two pages don't repeat each other.
 */
export const experiencePlatform: AdobeProduct = {
  slug: "experience-platform",
  name: "Adobe Experience Platform",
  shortName: "Experience Platform",
  area: "Customer data",
  legacyPaths: ["/adobe-experience-platform"],
  summary: "Unified customer profiles and cross-channel data activation, built on sound schemas, identity and governance.",
  description: "Adobe's foundation for bringing customer data together from across channels and standardizing it into real-time customer profiles that other Adobe applications use.",
  meta: {
    title: "Adobe Experience Platform Services",
    description:
      "Adobe Experience Platform implementation, integration, data strategy and training: XDM schemas, identity, data ingestion, governance and real-time profiles.",
  },
  hero: {
    title: "Build customer profiles your Adobe applications can rely on.",
    lead: "We implement and integrate Adobe Experience Platform, customize and optimize existing setups, plan the data strategy and governance behind it, and train your teams to run it.",
  },
  overview: {
    heading: "What Adobe Experience Platform does",
    intro:
      "Adobe Experience Platform collects customer data from many systems, maps it to standard schemas, and links it by identity into profiles that update in real time. Applications such as Real-Time CDP, Adobe Journey Optimizer and Customer Journey Analytics are built on it and work from the same data.",
    features: [
      {
        title: "Experience Data Model (XDM) schemas",
        body: "Incoming data is mapped to standardized XDM schemas, so data from different systems is described in a consistent, reusable way.",
      },
      {
        title: "Sources and data ingestion",
        body: "Source connectors bring in data from cloud storage, CRM, databases and other applications in batches or as streams. Data Prep maps and transforms fields on the way in.",
      },
      {
        title: "Web SDK and Edge Network",
        body: "The Web SDK sends website data in a single payload to a datastream on the Adobe Experience Platform Edge Network, which forwards it to each configured Adobe application.",
      },
      {
        title: "Identity Service",
        body: "Identity Service links the identifiers that belong to the same person, such as a device ID and a CRM ID, into an identity graph.",
      },
      {
        title: "Real-Time Customer Profile",
        body: "Profile data fragments from every source are merged into one view of each customer that updates as new data arrives.",
      },
      {
        title: "Query Service and data governance",
        body: "Query Service runs SQL against datasets to check quality and explore trends. Data usage labels and data governance policies restrict how labeled data can be used. Consent policies, available with Adobe Healthcare Shield or Adobe Privacy & Security Shield, also respect each customer's consent.",
      },
    ],
  },
  signals: [
    "You've licensed Experience Platform and need schemas and an identity strategy before ingesting data",
    "Profiles show duplicates or gaps because identities don't link as expected",
    "Customer data from CRM, commerce and web systems arrives in different shapes",
    "The platform went live, but few use cases run on it",
    "No one can say which fields are sensitive or which uses your policies allow",
    "Every change depends on an outside partner or one or two people on your team",
  ],
  services: [
    {
      title: "Implementation and integration",
      body: "We set up Experience Platform around the use cases you want to deliver first, and connect it to the systems that hold your customer data.",
      items: [
        "Use-case definition and solution architecture",
        "XDM schema and dataset design, including which datasets feed profiles",
        "Batch and streaming source connections from CRM, commerce and other systems",
        "Website and app data collection through the Web SDK, Tags and datastreams",
      ],
      provenance: "verified",
    },
    {
      title: "Customization and optimization",
      body: "For a platform that's already running, we adjust the configuration so profiles are more accurate and the platform supports more of what your teams need.",
      items: [
        "Review of schemas, identity configuration and data flows against your use cases",
        "Data Prep mappings and field transformations",
        "Query Service SQL for data validation and derived datasets",
        "Cleanup of unused datasets, schema fields and dataflows",
      ],
      provenance: "verified",
    },
    {
      title: "Data strategy and management",
      body: "We define with you which data belongs in the platform, configure how identities connect, and set up the rules that govern how that data is used.",
      items: [
        "Data inventory prioritized by use case",
        "Identity strategy, identity namespaces and identity graph linking rules",
        "Data usage labels on schemas and datasets, and the policies that enforce them",
        "Data quality checks and named owners for each source",
      ],
      provenance: "verified",
    },
    {
      title: "Training and support",
      body: "We train the people who will run the platform and support it as you add sources and use cases.",
      items: [
        "Role-based training for marketers, analysts and data engineers",
        "Runbooks and documentation for your configuration",
        "Monitoring of data flows and resolution of ingestion errors",
        "Configuration support as new sources and use cases are added",
      ],
      provenance: "verified",
    },
  ],
  scenarios: [
    {
      title: "Connecting online and in-store customer data",
      context:
        "A retailer keeps web behavior, store purchases and loyalty data in separate systems, and each team works from a different picture of the customer.",
      approach:
        "Model the data in XDM schemas, define an identity strategy that links loyalty IDs, email addresses and device IDs, and set up batch and streaming sources into Experience Platform.",
      outcome: "One real-time profile per customer that marketing and analytics teams can build audiences and reports on.",
    },
    {
      title: "Adding governance to a live implementation",
      context:
        "A financial services firm has been ingesting data into Experience Platform, but fields aren't labeled and no one is sure which data can be used for marketing.",
      approach:
        "Review schemas and datasets, apply data usage labels with the privacy and legal teams, enable governance and consent policies, and document which marketing actions each kind of data allows.",
      outcome: "Teams can see which data is approved for which use, and the platform flags activations that would violate policy.",
    },
  ],
  related: [
    {
      slug: "real-time-cdp",
      why: "Built on Experience Platform, it turns unified profiles into audiences and activates them to marketing and advertising destinations.",
    },
    {
      slug: "analytics",
      why: "Adobe Analytics data can be brought into Experience Platform through a source connector, so web and app behavior contributes to profiles.",
    },
    {
      slug: "target",
      why: "With Real-Time CDP, audiences built from Experience Platform profiles can be shared with Adobe Target for testing and personalization.",
    },
  ],
  insights: [
    "driving-customer-experience-excellence-with-adobe-experience-platform",
    "revolutionizing-customer-engagement-with-adobe-real-time-cdp",
    "data-governance-guide",
  ],
  faqs: [
    {
      question: "How does Experience Platform relate to Real-Time CDP?",
      answer:
        "Experience Platform is the foundation. It ingests data, standardizes it in XDM schemas and builds Real-Time Customer Profiles. Real-Time CDP is an application built on it that uses those profiles to build audiences and activate them to destinations. The two are often used together, and we deliver services for each.",
    },
    {
      question: "Can you work with an implementation that's already live?",
      answer:
        "Yes. We start with an assessment of your schemas, identity setup, data flows and governance, followed by fixes and optimization where they're needed.",
    },
    {
      question: "How do you handle consent and data governance?",
      answer:
        "We work with your privacy and legal teams to apply data usage labels to schemas and datasets and to enable the data governance policies that restrict how labeled data is used. If you license Adobe Healthcare Shield or Adobe Privacy & Security Shield, consent policies can also exclude profiles that lack the required consent. The configuration supports your compliance program but doesn't replace your own legal review. This is where our Adobe work connects with our Data Management services.",
    },
    {
      question: "Does Experience Platform replace our data warehouse?",
      answer:
        "Usually not. A data warehouse remains the place for broad reporting and analysis, while Experience Platform holds the data your Adobe applications need for real-time profiles and activation. Depending on your license, Adobe also offers ways to use warehouse data without copying it, such as Federated Audience Composition. Part of our data strategy work is deciding which data belongs in the platform and which can stay where it is.",
    },
    {
      question: "Do you provide training?",
      answer:
        "Yes. Training and support are part of our Experience Platform services, so your teams can operate the platform and extend it as you add sources and use cases.",
    },
    {
      question: "Do you also work with Journey Optimizer or Customer Journey Analytics?",
      answer:
        "Our Experience Platform services cover implementation and integration, customization and optimization, data strategy and management, and training and support for the platform itself. If you're planning work in other applications built on it, ask us and we'll tell you plainly whether we're a good fit.",
    },
  ],
  cta: {
    title: "Start with your customer data.",
    body: "Tell us what data you have, where it lives, and what you want your profiles to support. We'll scope a practical first step with you.",
  },
};
