import type { AdobeProduct } from "@/lib/content/types";

/**
 * Service types (titles) are verified from the old /adobe-commerce page; "Platform migration" means
 * migrating to Adobe Commerce. Product facts follow Adobe Experience League naming as of November 2026
 * (deployment options including Adobe Commerce as a Cloud Service, Commerce Storefront on Edge Delivery
 * Services, Live Search, Product Recommendations and Catalog Service, B2B for Adobe Commerce, GraphQL
 * and REST APIs, App Builder). Scenarios are hypothetical.
 */
export const commerce: AdobeProduct = {
  slug: "commerce",
  name: "Adobe Commerce",
  shortName: "Commerce",
  area: "Commerce",
  legacyPaths: ["/adobe-commerce"],
  summary: "Strategy, implementation, migration and ongoing support for B2C and B2B stores on Adobe Commerce.",
  description: "A commerce platform, formerly Magento Commerce, for B2C and B2B online stores, with catalog management and extensibility.",
  meta: {
    title: "Adobe Commerce Services",
    description:
      "Adobe Commerce services: e-commerce strategy, implementation and customization, migration to Adobe Commerce, and ongoing support for B2C and B2B stores.",
  },
  hero: {
    title: "Run an online store that grows with your catalog and customers.",
    lead: "We plan the right Adobe Commerce setup, build and integrate the store, migrate you from your current platform, and keep improving it after launch.",
  },
  overview: {
    heading: "What Adobe Commerce does",
    intro:
      "Adobe Commerce is Adobe's platform for building and running online stores. Formerly known as Magento Commerce, it supports consumer and business buyers, multiple brands and regions, and extension through APIs and developer tools.",
    features: [
      {
        title: "B2C and B2B commerce",
        body: "Consumer and business storefronts can run on a single Commerce instance. B2B features include company accounts, shared catalogs with custom pricing, quotes, requisition lists and purchase order approvals.",
      },
      {
        title: "Catalog and multi-store management",
        body: "Products, categories, pricing and inventory are managed from one Admin, with websites, stores and store views for different brands, regions and languages.",
      },
      {
        title: "Deployment options",
        body: "Adobe Commerce as a Cloud Service is a SaaS offering that Adobe hosts and updates. Adobe Commerce on cloud infrastructure is a managed platform as a service, and Adobe Commerce can also be hosted on-premises.",
      },
      {
        title: "APIs and extensibility",
        body: "GraphQL and REST APIs cover catalog, cart, checkout, customers and orders. Adobe Developer App Builder, API Mesh, events and webhooks support integrations and custom extensions, with availability varying by deployment.",
      },
      {
        title: "Search, recommendations and catalog services",
        body: "Live Search and Product Recommendations add AI-assisted product search and behavior-based recommendations. Catalog Service gives storefronts fast, read-only access to product data through GraphQL.",
      },
      {
        title: "Relationship to Magento Open Source",
        body: "Magento Open Source is the free, open-source edition built on the same core application. Adobe Commerce adds B2B and other commercial features, Adobe's commerce services and Adobe-hosted deployment options.",
      },
    ],
  },
  signals: [
    "Your current platform can't support a new brand, region or B2B buyers",
    "You're planning a move to Adobe Commerce from another platform or from Magento Open Source",
    "Customizations and extensions have made every upgrade slow and risky",
    "Product, pricing or order data doesn't flow cleanly between the store and your ERP",
    "Shoppers struggle to find products, or slow pages and checkout lose orders",
    "You're weighing Adobe Commerce as a Cloud Service against your current deployment",
  ],
  services: [
    {
      title: "E-commerce strategy",
      body: "We define with you what the store needs to do for your customers and your business, then shape the Adobe Commerce setup around it.",
      items: [
        "Requirements for consumer and business buyers",
        "Choice of deployment option and storefront approach",
        "Store structure for each brand, region and language",
        "Integration roadmap and data ownership by system",
      ],
      provenance: "verified",
    },
    {
      title: "Implementation and customization",
      body: "We configure and build your Adobe Commerce store, add custom features where the platform needs to fit your processes, and connect it to the systems around it.",
      items: [
        "Catalog, pricing, tax, shipping and checkout configuration",
        "Custom extensions, App Builder apps and storefronts",
        "Integrations with ERP, CRM, payment and fulfillment systems",
        "Integration and performance testing before launch",
      ],
      provenance: "verified",
    },
    {
      title: "Platform migration",
      body: "We move your store to Adobe Commerce from another platform or from Magento Open Source, with a plan for data, features and launch.",
      items: [
        "Assessment of the current platform, data and customizations",
        "Migration of products, customers and order history",
        "Rebuilding or replacing required features and extensions",
        "URL redirects, cutover planning and post-launch checks",
      ],
      provenance: "verified",
    },
    {
      title: "Ongoing support and optimization",
      body: "After launch, we keep your store healthy and keep improving it based on how customers use it.",
      items: [
        "Upgrades, security patches and extension updates",
        "Page speed and checkout improvements",
        "Live Search, recommendation and merchandising tuning",
        "Issue resolution and a prioritized enhancement backlog",
      ],
      provenance: "verified",
    },
  ],
  scenarios: [
    {
      title: "Adding a brand and region on one platform",
      context: "A specialty retailer has outgrown its e-commerce platform and needs to launch a second brand and sell in a new region.",
      approach:
        "Assess the current store, plan websites and store views in Adobe Commerce, migrate catalog and customer data, and map redirects from old URLs before cutover.",
      outcome: "Both brands run from one Adobe Commerce instance, with separate storefronts and shared catalog management.",
    },
    {
      title: "Adding B2B buying to a consumer store",
      context: "A building-supplies distributor sells to consumers online but takes trade orders by email and phone.",
      approach:
        "Set up company accounts, shared catalogs with trade pricing and quotes, and connect pricing, inventory and orders to the ERP.",
      outcome: "Trade customers order online at their own prices, and the sales team spends less time re-keying orders.",
    },
  ],
  related: [
    {
      slug: "experience-manager",
      why: "Experience Manager manages the content and product assets that a Commerce storefront presents.",
    },
    {
      slug: "real-time-cdp",
      why: "Real-Time CDP turns storefront behavior and order data into audiences for marketing and personalization.",
    },
    {
      slug: "analytics",
      why: "Adobe Analytics measures how shoppers find, browse and buy, so you can see what to improve in the store.",
    },
  ],
  insights: ["enhancing-customer-experience-with-personalization-and-innovation"],
  faqs: [
    {
      question: "Which Adobe Commerce deployment option should we choose?",
      answer:
        "With Adobe Commerce as a Cloud Service, Adobe runs and updates the platform, and you extend it through APIs and App Builder rather than by changing core code. On cloud infrastructure, Adobe provides the hosting while you manage code and upgrades. On-premises gives you full control and full responsibility for hosting. The right choice depends on how much you customize, your team's skills and how you want to handle upgrades.",
    },
    {
      question: "Can we move from Magento Open Source to Adobe Commerce?",
      answer:
        "Yes. On-premises and cloud infrastructure deployments share Magento Open Source's core application, so much of your catalog, customer data and custom code carries over, though extensions still need checking. A move to Adobe Commerce as a Cloud Service involves more change, because customizations move out of the core into APIs and App Builder.",
    },
    {
      question: "Can you migrate us from a different e-commerce platform?",
      answer:
        "Yes. We start by reviewing your current platform, data and customizations, then plan how products, customers, orders, URLs and features move across, and which features to rebuild, replace or retire.",
    },
    {
      question: "Do you work with B2B commerce?",
      answer:
        "Yes. We include B2B requirements such as company accounts, shared catalogs, quotes and purchase approvals in strategy, implementation and migration work, whether B2B buyers use their own storefront or share one with consumers.",
    },
    {
      question: "Can you connect Adobe Commerce to our ERP?",
      answer:
        "Yes. ERP, CRM, payment and fulfillment integrations are part of implementation. We first agree which system owns products, prices, inventory and orders, then build the integration with Commerce's APIs and events or the middleware you already use.",
    },
  ],
  cta: {
    title: "Plan your next step on Adobe Commerce.",
    body: "Tell us about your store, the platform you run today and what you want to change. We'll scope a practical first step with you.",
  },
};
