import type { AdobeProduct } from "@/lib/content/types";

/**
 * Product scope and the four service types below are verified from the old site's /adobe-analytics
 * page (their titles must stay as listed). Product feature names were checked against Adobe
 * Experience League documentation (Analysis Workspace, segment containers, attribution, report suites
 * and virtual report suites, Web SDK, datastreams and Tags, Analytics for Target, and the Customer
 * Journey Analytics comparison), Nov 2026. The 1.4 API shutdown (Aug 2026) and legacy Report Builder
 * retirement (June 2026) are from the Adobe Analytics release notes. Scenarios are hypothetical.
 */
export const analytics: AdobeProduct = {
  slug: "analytics",
  name: "Adobe Analytics",
  shortName: "Analytics",
  area: "Analytics",
  legacyPaths: ["/adobe-analytics"],
  summary: "Deep audience intelligence, attribution modeling and journey analysis, from tracking design to dashboards.",
  description: "Collects and analyzes behavioral data from websites, apps and other digital channels, with segmentation, reporting and attribution.",
  meta: {
    title: "Adobe Analytics Services",
    description:
      "Adobe Analytics implementation, Web SDK migration, Analysis Workspace dashboards, data strategy and ongoing support, so teams trust the numbers they report.",
  },
  hero: {
    title: "Digital measurement your teams can trust and act on.",
    lead: "We plan and implement Adobe Analytics tracking, build Analysis Workspace dashboards around real decisions, and keep the data accurate as your sites and apps change.",
  },
  overview: {
    heading: "What Adobe Analytics does",
    intro:
      "Adobe Analytics collects behavioral data from websites, apps and other digital channels and gives analysts tools to segment it, attribute results and share findings. Its value depends on how well the data is collected and organized.",
    features: [
      {
        title: "Analysis Workspace",
        body: "A browser-based, drag-and-drop environment for building projects with freeform tables and visualizations, then sharing them or scheduling them as PDF or CSV files.",
      },
      {
        title: "Segments and calculated metrics",
        body: "Segments isolate subsets of data using nested Visitor, Visit and Hit containers, including sequential conditions. Calculated metrics combine existing metrics into the measures a business uses.",
      },
      {
        title: "Attribution",
        body: "Analysts choose how dimension items receive credit for success events, apply attribution models to metrics and breakdowns, and compare models in the Attribution panel.",
      },
      {
        title: "Report suites",
        body: "Data is collected into report suites, each with its own variables and settings. Virtual report suites create filtered views of that data for specific teams or uses.",
      },
      {
        title: "Web SDK data collection",
        body: "Adobe recommends the Adobe Experience Platform Web SDK for new implementations, deployed through Tags or as a JavaScript library. Data travels through the Edge Network to the report suites set in a datastream.",
      },
      {
        title: "Integration with Adobe Target",
        body: "Analytics for Target (A4T) makes Adobe Analytics the reporting source for Target activities, so tests are measured against the same metrics and segments as the rest of your reporting.",
      },
    ],
  },
  signals: [
    "Marketing, product and finance teams report different numbers for the same campaign or period",
    "Tracking has drifted as the site or app changed, and no one owns the measurement plan",
    "A move from AppMeasurement or the Analytics extension to Web SDK is on the roadmap",
    "Variables, segments and projects have piled up, and no one knows which are still in use",
    "Integrations or workbooks still rely on the retired 1.4 API or the legacy Report Builder",
    "Stakeholders ask for spreadsheets instead of opening Analysis Workspace",
  ],
  services: [
    {
      title: "Implementation",
      body: "We design what to collect and implement it cleanly, whether that's a new setup or a re-implementation of tracking that no longer matches your site or app.",
      items: [
        "Measurement plan and solution design reference (SDR)",
        "Data layer specification your developers can build against",
        "Web SDK and Tags setup, or migration from AppMeasurement",
        "QA with Adobe Experience Platform Debugger at every release",
      ],
      provenance: "verified",
    },
    {
      title: "Custom dashboards",
      body: "We build Analysis Workspace projects around the decisions each audience makes, from weekly executive reviews to day-to-day channel reporting.",
      items: [
        "Requirements gathered by audience and decision",
        "Analysis Workspace projects curated for each audience",
        "Shared segments and calculated metrics, defined once",
        "Scheduled PDF or CSV delivery and alerts for unusual changes",
      ],
      provenance: "verified",
    },
    {
      title: "Data strategy and measurement planning",
      body: "We define with you what to measure and why, and plan how Adobe Analytics fits with the rest of your data and Adobe applications.",
      items: [
        "KPI framework mapped to business questions",
        "Report suite, virtual report suite and variable architecture",
        "Marketing channel rules and attribution approach",
        "Governance for naming, ownership and user access",
      ],
      provenance: "verified",
    },
    {
      title: "Ongoing support and optimization",
      body: "We keep the implementation accurate as your sites, apps and campaigns change, and train your teams to get more out of it.",
      items: [
        "Regular checks and tracking updates as pages and campaigns change",
        "Migration of 1.4 API integrations to the 2.0 API",
        "Clean-up of unused variables, segments and projects",
        "Training for analysts and report consumers",
      ],
      provenance: "verified",
    },
  ],
  scenarios: [
    {
      title: "Moving tracking to Web SDK",
      context:
        "A financial services company runs an older AppMeasurement implementation that few people understand, and it plans to adopt more Adobe applications.",
      approach:
        "Document the current variables and reports, write a solution design reference, rebuild collection with Web SDK in Tags, and compare old and new data in a test report suite before switching over.",
      outcome:
        "The company has a documented implementation on Adobe's current collection method, ready to share data with other Adobe applications.",
    },
    {
      title: "Dashboards people actually open",
      context:
        "A hotel group's leadership asks analysts for weekly spreadsheets because existing reports are hard to read and define bookings and revenue differently.",
      approach:
        "Interview each audience about the decisions they make, agree on shared metric definitions, and build Analysis Workspace projects with curated components and scheduled delivery.",
      outcome:
        "Leaders review the same dashboards each week, and analysts spend their time on analysis rather than assembling reports.",
    },
  ],
  related: [
    {
      slug: "target",
      why: "With Analytics for Target, tests and personalization are measured against the same metrics and segments as the rest of your reporting.",
    },
    {
      slug: "experience-platform",
      why: "Web SDK and the Edge Network collect data once for Adobe Analytics and other Adobe applications.",
    },
    {
      slug: "experience-manager",
      why: "Content and page performance on Adobe Experience Manager sites is commonly measured in Adobe Analytics.",
    },
  ],
  insights: [
    "the-importance-of-data-governance-in-the-digital-age",
    "driving-customer-experience-excellence-with-adobe-experience-platform",
  ],
  faqs: [
    {
      question: "What does an Adobe Analytics assessment cover?",
      answer:
        "The assessment compares what's collected with what the business needs to know, reviews report suite and variable settings, processing rules, marketing channels and shared segments, and checks which projects people actually use. You get a prioritized list of fixes, and we then implement them with you.",
    },
    {
      question: "Will we lose historical data if we re-implement?",
      answer:
        "No. Data already in your report suites stays there. A re-implementation changes how data is collected from the switch-over date, so we map old variables to new ones, compare both in a test report suite first, and note any breaks in trend for report users.",
    },
    {
      question: "Do we need to move to Web SDK?",
      answer:
        "Adobe recommends Web SDK for new implementations, but an existing AppMeasurement setup can keep working. We weigh the effort with you against what it enables, such as collecting data once for several Adobe applications, and implement Web SDK when the move is worth it.",
    },
    {
      question: "What's the difference between Adobe Analytics and Customer Journey Analytics?",
      answer:
        "Customer Journey Analytics is a separate Adobe product built on Adobe Experience Platform. It analyzes datasets from many channels through connections and data views, where Adobe Analytics organizes data in report suites. If you're weighing a move, we can review your current implementation and data so the decision rests on what you actually collect.",
    },
    {
      question: "Can you build dashboards for executives as well as analysts?",
      answer:
        "Yes. We design separate Analysis Workspace projects for each audience, built from the same shared segments and calculated metrics so the numbers match across them.",
    },
  ],
  cta: {
    title: "Get reporting your teams agree on.",
    body: "Tell us how you use Adobe Analytics today and where the numbers fall short. We'll scope a practical first step with you.",
  },
};
