import type { AdobeProduct } from "@/lib/content/types";

/**
 * Verified on the old site: product scope, and the service types below (titles unchanged).
 * Product facts in `overview` and `faqs` were checked against Adobe Experience League (Nov 2026):
 * Real-Time CDP overview (B2C, B2B and B2P editions, each in Prime and Ultimate packages), Segmentation
 * Service (Audience Builder, Audience Composition, batch/streaming/edge segmentation), Destinations,
 * automatic policy enforcement, consent policies (Healthcare Shield / Privacy & Security Shield only),
 * identity graph linking rules, and Experience Event / pseudonymous profile expirations.
 * Service items focus on profiles, audiences and activation; schema, source and labeling work is on the
 * Experience Platform page so the two pages don't repeat each other.
 */
export const realTimeCdp: AdobeProduct = {
  slug: "real-time-cdp",
  name: "Adobe Real-Time Customer Data Platform",
  shortName: "Real-Time CDP",
  area: "Customer data",
  legacyPaths: ["/adobe-real-time-cdp"],
  summary: "Real-time B2B and B2C audience segmentation and privacy-safe activation, set up and run with your teams.",
  description: "An application built on Adobe Experience Platform for building audiences from unified profiles and activating them to marketing, advertising and personalization destinations.",
  meta: {
    title: "Adobe Real-Time CDP Services",
    description:
      "Adobe Real-Time CDP setup, data strategy, personalization and training. Build governed audiences from unified profiles and activate them across channels.",
  },
  hero: {
    title: "Turn unified customer profiles into audiences your channels can use.",
    lead: "We implement and set up Adobe Real-Time CDP, shape the data strategy and management behind it, put its audiences to work in personalization and campaign optimization, and train and support the teams who run it.",
  },
  overview: {
    heading: "What Real-Time CDP does",
    intro:
      "Adobe Real-Time Customer Data Platform is an application built on Adobe Experience Platform. It combines known and anonymous data from multiple sources into customer profiles, builds audiences from those profiles, and activates them to other channels, with governance and privacy controls applied along the way.",
    features: [
      {
        title: "Built on Adobe Experience Platform",
        body: "Real-Time CDP uses Experience Platform's foundations: data ingested from sources, standardized with Experience Data Model (XDM) schemas, and linked across systems by Identity Service.",
      },
      {
        title: "Real-Time Customer Profile",
        body: "Data from many sources is merged into one profile per person, covering known and anonymous identifiers, and the profile updates as new data arrives.",
      },
      {
        title: "Audiences and segmentation",
        body: "Audiences are built in Audience Builder or Audience Composition and evaluated by batch, streaming or edge segmentation. Edge segmentation supports same-page and next-page personalization.",
      },
      {
        title: "Destinations and activation",
        body: "A self-service catalog of pre-built integrations sends audiences or data to advertising, email marketing, CRM, cloud storage and personalization destinations, including other Adobe Experience Cloud applications.",
      },
      {
        title: "Data governance and consent enforcement",
        body: "Data usage labels, the marketing actions set on each destination, and data usage policies are checked when an audience is activated, and an activation that violates a policy is blocked. Consent policies, available with Adobe Healthcare Shield or Adobe Privacy & Security Shield, exclude profiles that lack the required consent.",
      },
      {
        title: "B2C, B2B and B2P editions",
        body: "Real-Time CDP comes in B2C, B2B and B2P editions, each in Prime and Ultimate packages. B2C is built for consumer data, B2B for lead and account data, and B2P brings consumer and business data together for the same person.",
      },
    ],
  },
  signals: [
    "Real-Time CDP is licensed, but audiences still come from spreadsheets and one-off exports",
    "The same customer appears as several profiles, or profiles merge when they shouldn't",
    "Audiences reach email, advertising or web personalization too late to be useful",
    "No one is sure which consent and data use rules apply when audiences are activated",
    "Destinations set up at launch that no one now maintains or trusts",
    "Marketers who depend on technical teams to build or change audiences",
  ],
  services: [
    {
      title: "Implementation and setup",
      body: "We configure Real-Time CDP around the use cases you need first, from the data coming in to the audiences going out.",
      items: [
        "Use case prioritization, checked against the edition and package you license",
        "Profile-enabled datasets and merge policies",
        "Audiences for the first use cases in Audience Builder or Audience Composition",
        "Destination connections, field mapping and activation testing",
      ],
      provenance: "verified",
    },
    {
      title: "Data strategy and management",
      body: "We decide with you which data feeds profiles, how identities link, and how audiences and destinations are governed, so profiles stay accurate and usable as your data changes.",
      items: [
        "Identity strategy across known and anonymous data, including identity graph linking rules",
        "Marketing actions on each destination, matched to your data usage policies",
        "Experience Event and pseudonymous profile expirations that keep the profile store lean",
        "Audience naming, ownership and retirement of audiences no one uses",
      ],
      provenance: "verified",
    },
    {
      title: "Personalization and campaign optimization",
      body: "We turn audiences into targeted experiences and campaigns with your marketing teams, then refine them based on what the results show.",
      items: [
        "Audience design for campaigns and personalization",
        "Activation to Adobe Target, email and advertising destinations",
        "Edge and streaming audiences for same-page and next-page personalization",
        "Refinement of audience definitions based on campaign results",
      ],
      provenance: "verified",
    },
    {
      title: "Training and support",
      body: "We train your teams to build audiences and manage destinations themselves, and we support the platform after go-live.",
      items: [
        "Role-based training for marketers and data teams",
        "Runbooks and documentation for your configuration",
        "Ongoing support and troubleshooting",
        "Periodic reviews of audiences, destinations and policies",
      ],
      provenance: "verified",
    },
  ],
  scenarios: [
    {
      title: "Moving audience building out of spreadsheets",
      context:
        "A consumer brand licenses Real-Time CDP, but marketers still export lists from separate systems and upload them to email and advertising tools by hand.",
      approach:
        "Connect the CRM, web and loyalty data sources, define an identity strategy and merge policies, build the priority audiences in Real-Time CDP, and activate them to the brand's existing email and advertising destinations.",
      outcome: "Marketers build and refresh audiences in one place, and channels receive them without manual uploads.",
    },
    {
      title: "Activating audiences within consent rules",
      context:
        "A financial services firm wants to use profile data in paid media but isn't confident about which data its policies allow it to share with advertising platforms.",
      approach:
        "Map the firm's data use and consent rules to data usage labels and policies, assign marketing actions to each destination, and test activations against those policies before launch.",
      outcome:
        "Audiences reach advertising destinations only with data the firm's policies allow, and the rules are documented for the teams who maintain them.",
    },
  ],
  related: [
    {
      slug: "experience-platform",
      why: "Real-Time CDP runs on Experience Platform, so its schemas, identities and data ingestion determine how reliable your profiles and audiences are.",
    },
    {
      slug: "target",
      why: "Real-Time CDP audiences can be shared with Adobe Target to personalize web and app experiences.",
    },
    {
      slug: "marketo-engage",
      why: "Real-Time CDP can send audiences to Marketo Engage, where many B2B teams run nurture and lead management programs.",
    },
  ],
  insights: [
    "revolutionizing-customer-engagement-with-adobe-real-time-cdp",
    "driving-customer-experience-excellence-with-adobe-experience-platform",
    "data-governance-guide",
  ],
  faqs: [
    {
      question: "What is the difference between Real-Time CDP and Adobe Experience Platform?",
      answer:
        "Experience Platform is the foundation. It ingests data, standardizes it with schemas, and builds customer profiles. Real-Time CDP is an application built on it that adds the tools to build audiences from those profiles and activate them to destinations. Most Real-Time CDP work touches both, and we provide services for each.",
    },
    {
      question: "How is consent enforced when audiences are activated?",
      answer:
        "At activation, Experience Platform checks the data usage labels on the audience's data, the marketing action set on the destination, and your policies, and it blocks an activation that would violate them. With Adobe Healthcare Shield or Privacy & Security Shield, consent policies also exclude profiles that lack the required consent. We translate your own consent and data use rules into that configuration with your privacy team. It supports compliance but doesn't replace your legal or privacy review.",
    },
    {
      question: "Can you improve a setup that's already live?",
      answer:
        "Yes. We start with an assessment of your current sources, identity settings, audiences and destinations, then fix what's holding the setup back and extend it to new use cases.",
    },
    {
      question: "Which Real-Time CDP edition do we need?",
      answer:
        "Adobe offers B2C, B2B and B2P editions, each in Prime and Ultimate packages, and it sets licensing and pricing, so confirm your entitlements with your Adobe account team. B2C fits consumer marketing, B2B fits lead and account marketing, and B2P covers both for the same person. When we plan an implementation, we check that your priority use cases fit the edition and package you license.",
    },
    {
      question: "Does Real-Time CDP replace our email or advertising platforms?",
      answer:
        "No. Real-Time CDP builds audiences and sends them to the platforms that deliver messages and ads, such as email service providers, advertising platforms and Adobe Target, through destinations. Your channel tools stay in place and receive audiences without manual list uploads.",
    },
    {
      question: "Do you also work with Journey Optimizer or Customer Journey Analytics?",
      answer:
        "Our Real-Time CDP services cover implementation and setup, data strategy and management, personalization and campaign optimization, and training and support. Our Adobe services also cover Experience Platform, Experience Manager, Analytics, Marketo Engage, Target, Commerce and content management. For other applications built on Experience Platform, ask us and we'll tell you plainly whether we're a good fit.",
    },
  ],
  cta: {
    title: "Put your customer profiles to work.",
    body: "Tell us how you use Real-Time CDP today and which audiences matter most. We'll scope a practical first step with you.",
  },
};
