import type { AdobeProduct } from "@/lib/content/types";

/**
 * Verified on the old site: product scope, and the service types below (titles unchanged).
 * Product feature names checked against Adobe Experience League (Marketo Engage docs and glossary,
 * engagement program streams, CRM sync, Revenue Cycle Analytics, Target Account Management, Experience
 * Platform Marketo Engage source connector and destination) in November 2026.
 * Everything else is new copy; scenarios are hypothetical.
 */
export const marketoEngage: AdobeProduct = {
  slug: "marketo-engage",
  name: "Adobe Marketo Engage",
  shortName: "Marketo Engage",
  area: "Marketing automation",
  legacyPaths: ["/adobe-marketo-services"],
  summary: "Setup, Salesforce or Dynamics sync, nurture and scoring programs, and reporting for marketing operations.",
  description: "Marketing automation for lead management, nurturing and cross-channel engagement programs, widely used in B2B marketing.",
  meta: {
    title: "Adobe Marketo Engage Services",
    description:
      "Adobe Marketo Engage implementation, Salesforce and Microsoft Dynamics integration, nurture and scoring programs, reporting, and cleanup of existing instances.",
  },
  hero: {
    title: "A clear lead flow, from first form fill to sales follow-up.",
    lead: "We implement Adobe Marketo Engage and connect it to your CRM, build the programs behind nurturing, scoring and routing, set up reporting, and clean up instances that have grown hard to manage.",
  },
  overview: {
    heading: "What Marketo Engage does",
    intro:
      "Adobe describes Marketo Engage as marketing automation software for streamlining, automating and measuring marketing workflows. Work is organized into programs, each holding the lists, assets and campaigns for one marketing initiative. Add-ons such as Target Account Management extend it for account-based marketing.",
    features: [
      {
        title: "Person management and scoring",
        body: "Person records hold demographic data and activity history. Smart lists segment people dynamically by filters, and scoring models assign points for fit and behavior.",
      },
      {
        title: "Smart campaigns",
        body: "Smart campaigns perform the actions you specify for the people who meet the criteria you set, either in batches on a schedule or when a trigger such as a form fill occurs.",
      },
      {
        title: "Engagement programs",
        body: "Engagement programs deliver content in streams on a cadence you set, so people receive nurture content over time. Transition rules move people between streams as their interests change.",
      },
      {
        title: "Email, landing pages and forms",
        body: "Editors for emails, Marketo-hosted landing pages and forms, with tokens that let teams reuse values and templates across programs.",
      },
      {
        title: "Native CRM sync",
        body: "Marketo Engage integrates natively with Salesforce and Microsoft Dynamics, syncing people, activity and campaign membership with the CRM your sales team uses.",
      },
      {
        title: "Reporting and analysis",
        body: "Program, email and person reports show performance. Revenue Cycle Analytics, where included in your subscription, adds tools such as Program Analyzer. Adobe Marketo Measure is a separate product for attribution.",
      },
    ],
  },
  signals: [
    "An instance cluttered with old programs, unused fields and inconsistent naming",
    "Leads reaching sales without an agreed definition of when they're ready",
    "Salesforce or Dynamics sync errors, or field mappings no one fully understands",
    "Nurture programs that were built once and never revisited",
    "Reports that can't show which programs contribute to pipeline",
    "A new Marketo Engage subscription that needs a sound setup from the start",
  ],
  services: [
    {
      title: "Implementation and integration",
      body: "We set up Marketo Engage on a sound foundation and connect it to your CRM, your website and the other systems that feed or use its data.",
      items: [
        "Users, roles, fields, and SPF and DKIM authentication",
        "Salesforce or Microsoft Dynamics sync setup and field mapping",
        "Munchkin website tracking and Marketo forms on your site",
        "Program templates, folder structure and naming conventions",
      ],
      provenance: "verified",
    },
    {
      title: "Campaign management and automation",
      body: "We build and run the programs and smart campaigns behind your lead flow, from the first form fill to the handoff to sales.",
      items: [
        "Engagement programs with streams for each audience or stage",
        "Smart campaigns for routing, lifecycle and sales alerts",
        "Email, landing page and form builds",
        "Fit and behavior scoring agreed with sales",
      ],
      provenance: "verified",
    },
    {
      title: "Reporting and analytics",
      body: "We set up reporting so you can see how programs perform and how people move from inquiry to opportunity.",
      items: [
        "Consistent program channels, statuses and period costs",
        "Program, email and landing page performance reports",
        "Lifecycle stage and funnel reporting",
        "Recurring reports for marketing and sales leaders",
      ],
      provenance: "verified",
    },
    {
      title: "Customization and optimization",
      body: "We improve instances that are already running, so they're easier to maintain and perform better.",
      items: [
        "Cleanup of unused programs, fields and lists",
        "Database hygiene and deduplication",
        "Tokens and templates that standardize new builds",
        "Reviews of scoring, routing and nurture performance",
      ],
      provenance: "verified",
    },
  ],
  scenarios: [
    {
      title: "Restoring order to a mature instance",
      context:
        "A B2B software company has used Marketo Engage for years. Programs were built by different teams with different naming, several scoring campaigns overlap, and sales has stopped trusting the leads it receives.",
      approach:
        "Review the instance, retire unused programs and fields, agree a single definition of a sales-ready lead with sales, rebuild scoring and lifecycle campaigns around it, and correct the Salesforce field mappings.",
      outcome:
        "Sales and marketing work from one definition of a qualified lead, and new programs are built from shared templates and naming conventions.",
    },
    {
      title: "Nurturing early inquiries alongside Dynamics",
      context:
        "An industrial equipment maker with a direct sales team is adopting Marketo Engage alongside Microsoft Dynamics 365. Today every inquiry goes straight to sales, including people who are only researching.",
      approach:
        "Set up the Dynamics sync, build engagement programs with content for each audience, score fit and behavior, route people to sales when they show buying intent, and set up program reporting.",
      outcome:
        "Early inquiries receive relevant content over time, sales follows up when interest is real, and the team can see which programs contribute to opportunities.",
    },
  ],
  related: [
    {
      slug: "real-time-cdp",
      why: "Audiences built in Real-Time CDP can be activated to Marketo Engage through its destination, so campaigns use unified profile data.",
    },
    {
      slug: "experience-platform",
      why: "A source connector brings Marketo Engage data into Experience Platform, so marketing activity becomes part of the wider customer profile.",
    },
  ],
  insights: ["enhancing-customer-experience-with-personalization-and-innovation"],
  faqs: [
    {
      question: "Can you clean up an existing Marketo Engage instance?",
      answer:
        "Yes. We start with a review of programs, fields, smart campaigns and CRM sync settings, then agree with you what to fix first, so cleanup doesn't break campaigns that are still running.",
    },
    {
      question: "Do you integrate Marketo Engage with our CRM?",
      answer:
        "Yes. Marketo Engage syncs natively with Salesforce and Microsoft Dynamics. We set up the sync and field mappings for new instances and resolve sync errors and mapping problems in existing ones.",
    },
    {
      question: "How do you approach lead scoring?",
      answer:
        "We start with what sales considers a ready lead, build a model that combines fit and behavior, and review it with sales once real data comes in. Scoring only works if both teams agree on it.",
    },
    {
      question: "Why use engagement programs instead of a series of scheduled emails?",
      answer:
        "An engagement program sends the next piece of content on a cadence you set, skips content a person has already received, and moves people between streams as their interests change. Adding or reordering content doesn't mean rebuilding the whole sequence, so nurture stays current with less effort.",
    },
    {
      question: "Can Marketo Engage work with other Adobe applications?",
      answer:
        "Yes. Real-Time CDP can send audiences to Marketo Engage, and Experience Platform can take in Marketo Engage data. We assess whether those connections suit your goals before anything is built.",
    },
  ],
  cta: {
    title: "Get more from Marketo Engage.",
    body: "Tell us how your instance and CRM are set up today and where lead flow breaks down. We'll scope a practical first step with you.",
  },
};
