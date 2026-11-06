import type { AdobeProduct } from "@/lib/content/types";

/**
 * Verified on the old site: product scope, and the service types below (their titles must stay
 * as listed). Activity types, Target Premium features (Recommendations, Auto-Target, Automated
 * Personalization), composers, A4T and the Real-Time CDP destination were checked against Adobe
 * Experience League, Nov 2026. Scenarios are hypothetical.
 */
export const target: AdobeProduct = {
  slug: "target",
  name: "Adobe Target",
  shortName: "Target",
  area: "Personalization",
  legacyPaths: ["/adobe-target"],
  summary: "Implementation, personalization strategy, and A/B and multivariate testing run as an ongoing program.",
  description: "Testing and personalization: A/B and multivariate tests, plus rule-based and AI-assisted targeting of content and offers.",
  meta: {
    title: "Adobe Target Services",
    description:
      "Adobe Target implementation, personalization strategy, A/B and multivariate testing, and program support, connected to Adobe Analytics and Real-Time CDP.",
  },
  hero: {
    title: "Turn testing and personalization into a steady program.",
    lead: "We implement Adobe Target, decide with you where personalization is worth the effort, design and analyze A/B and multivariate tests, and support the program after launch.",
  },
  overview: {
    heading: "What Adobe Target does",
    intro:
      "Adobe Target is Adobe's application for testing and personalization. Teams use it to compare experiences, deliver content to defined audiences, and use machine learning to choose the best experience for each visitor.",
    features: [
      {
        title: "A/B and multivariate tests",
        body: "A/B tests split traffic between two or more experiences to compare them. Multivariate tests compare combinations of offers across several page elements to find the best-performing combination.",
      },
      {
        title: "Experience Targeting",
        body: "Delivers specific content to a specific audience based on rules you define, such as location, referring channel or profile attributes.",
      },
      {
        title: "AI-driven activities",
        body: "Auto-Allocate shifts traffic toward the best-performing experience while a test runs. Auto-Target and Automated Personalization use machine learning to match experiences or offer combinations to individual visitors, and require Target Premium.",
      },
      {
        title: "Recommendations",
        body: "Suggests products, content or other items to visitors based on their behavior and your catalog. Recommendations requires a Target Premium license.",
      },
      {
        title: "Visual and form-based composers",
        body: "The Visual Experience Composer lets teams change page content in a visual editor, including on single-page applications. The Form-Based Experience Composer covers channels without a visual editor, such as apps, email and server-side delivery.",
      },
      {
        title: "Analytics and audience integrations",
        body: "Analytics for Target (A4T) uses Adobe Analytics as the reporting source for activities. Audiences from Real-Time CDP can be shared with Target for same-page and next-page personalization.",
      },
    ],
  },
  signals: [
    "Adobe Target is licensed but used for only a handful of tests a year",
    "Test ideas come from opinions rather than data or a shared backlog",
    "Teams dispute winners because Target and Adobe Analytics report different results",
    "Pages flicker or load slowly when an activity runs",
    "A move to Web SDK or a site rebuild means Target has to be re-implemented",
    "Personalization is planned, but audiences and content variations aren't ready",
  ],
  services: [
    {
      title: "Implementation and setup",
      body: "We deploy Adobe Target on your sites and apps so activities load reliably, track the right metrics, and connect to the rest of your Adobe applications.",
      items: [
        "Web SDK or at.js through Tags, with flicker handling",
        "Environments, properties and user permissions",
        "Audiences, profile attributes and conversion metrics",
        "A4T and Real-Time CDP connections, tested before launch",
      ],
      provenance: "verified",
    },
    {
      title: "Personalization strategy",
      body: "We identify with you where personalization can make a difference, which audiences matter and what content each one needs, before anything is built.",
      items: [
        "Audiences drawn from analytics, CRM and Real-Time CDP data",
        "A personalization roadmap prioritized against business goals",
        "Rule-based or AI-driven activity type for each use case",
        "Content and offer requirements for each experience",
      ],
      provenance: "verified",
    },
    {
      title: "A/B and multivariate testing",
      body: "We design, build and analyze tests that start from a clear hypothesis and a primary metric, with enough traffic to reach a reliable result.",
      items: [
        "Hypotheses and a backlog scored by impact, effort and traffic",
        "Sample size and test duration planning",
        "Builds in the Visual or Form-Based Experience Composer",
        "Results analysis and a documented next step for each test",
      ],
      provenance: "verified",
    },
    {
      title: "Ongoing support and management",
      body: "We run the program with your team after launch, so tests keep shipping, results get used and the implementation stays healthy.",
      items: [
        "Activity QA, launch and monitoring",
        "Regular results reviews and backlog updates",
        "A record of past tests and the decisions they led to",
        "Implementation maintenance as sites and libraries change",
      ],
      provenance: "verified",
    },
  ],
  scenarios: [
    {
      title: "Restarting a stalled testing program",
      context:
        "A travel company licenses Adobe Target but runs occasional tests chosen by whoever asks first, and the results are rarely acted on.",
      approach:
        "Review the implementation and past activities, set up A4T reporting, build a scored hypothesis backlog, and agree on a primary metric for each test before it launches.",
      outcome: "Tests run from a shared backlog, and each result ends in a recorded decision.",
    },
    {
      title: "Personalizing the website with shared audiences",
      context:
        "A telecommunications provider builds audiences in Real-Time CDP for email campaigns but shows every website visitor the same home page.",
      approach:
        "Share priority Real-Time CDP audiences with Target, build Experience Targeting activities for them, and hold back a control group to compare each personalized experience with the default.",
      outcome: "Web and email work from the same audience definitions, and each personalized experience is measured against a baseline.",
    },
  ],
  related: [
    {
      slug: "analytics",
      why: "With A4T, Adobe Analytics becomes the reporting source for Target activities, so tests are measured with the same metrics and segments as the rest of your reporting.",
    },
    {
      slug: "real-time-cdp",
      why: "Real-Time CDP audiences built from unified profiles can be shared with Target for same-page and next-page personalization.",
    },
    {
      slug: "experience-manager",
      why: "Experience Fragments and Content Fragments from Adobe Experience Manager can be exported to Target as offers, so personalized experiences reuse approved content.",
    },
  ],
  insights: ["enhancing-customer-experience-with-personalization-and-innovation", "revolutionizing-customer-engagement-with-adobe-real-time-cdp"],
  faqs: [
    {
      question: "How do we decide what to test first?",
      answer:
        "Start from your business goals and the pages or journeys where traffic is high and drop-off is visible. We score ideas by expected impact, effort and available traffic, and each test gets a written hypothesis and a primary metric before it's built.",
    },
    {
      question: "How are test results measured?",
      answer:
        "Each activity has a goal metric agreed before launch. Results can be reported in Target or, with Analytics for Target (A4T), in Adobe Analytics, where you can break them down by your existing segments. We check sample size and confidence before calling a winner.",
    },
    {
      question: "Which AI-driven activities need Target Premium?",
      answer:
        "Auto-Target, Automated Personalization and Recommendations require Target Premium. Auto-Allocate, which moves traffic toward the better-performing experience during an A/B test, doesn't. We check what your current license supports and whether an upgrade would pay off for your traffic and content.",
    },
    {
      question: "Can Target personalize apps and server-side experiences?",
      answer:
        "Yes. Beyond web pages, Target can deliver experiences to mobile apps and server-side applications through the Form-Based Experience Composer and Adobe's SDKs and APIs. We choose the approach during implementation, based on where your experiences are rendered.",
    },
    {
      question: "Can you take over a testing program another team started?",
      answer:
        "Yes. We review the implementation, active and past activities, and reporting, fix what's needed, and then keep the program running with your team.",
    },
  ],
  cta: {
    title: "Get more from Adobe Target.",
    body: "Tell us how you use Target today and what you want to improve, from a first test to a full program. We'll scope a practical first step with you.",
  },
};
