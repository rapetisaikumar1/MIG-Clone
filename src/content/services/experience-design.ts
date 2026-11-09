import type { ServiceContent } from "@/lib/content/types";

/**
 * Pillar 04 of the Maverick InnoGarage Capability Matrix (Capability Deck, October 2026): Experience Design.
 * Capability titles are the deck's seven items, so they are "verified"; the summaries and bullets describe what each
 * involves in practice. The hero title and lead are the deck's lines for the "Experience Design & Digital Product"
 * slide. The old site had no experience design page, so nothing here comes from it.
 *
 * Capability ids are stable anchors (/experience-design#user-research, #cx-optimization…) that other pages may link to.
 */
export const experienceDesign: ServiceContent = {
  slug: "experience-design",
  interest: "experience-design",
  name: "Experience Design",
  // The "Further reading" list shows the Customer Experience articles.
  insightTheme: "Customer Experience",
  meta: {
    title: "Experience Design",
    description:
      "User research, product and service design, design thinking, content and CX optimization, so digital products are useful, usable and ready for market.",
  },
  hero: {
    eyebrow: "Research · Design · Content · CX",
    title: "Human-centric design. Products that ship.",
    lead: "We pair research-led experience design with product strategy and agile delivery, so every digital product is useful, usable and ready for market.",
  },
  problem: {
    title: "Most experience problems are decided before anyone designs a screen.",
    body: [
      "Products are often specified from internal assumptions: what stakeholders believe customers want, how the organization divides the journey, how the last system worked. Customers then meet forms that ask for the same details twice, content written for the organization instead of for them, and channels that don't know about each other.",
      "A new interface on its own rarely fixes that. We start with research into what people need, design the product and the service around it, test with real users before engineering builds it, and keep measuring after launch, so the experience improves on evidence instead of opinion.",
    ],
    signals: [
      "Features ship, but adoption and task completion stay low",
      "Customer feedback contradicts what internal teams assumed",
      "Journeys break where one channel or department hands off to another",
      "Content is inconsistent, out of date or hard to find",
      "Design debates are settled by opinion, not evidence",
    ],
  },
  audience: [
    { role: "Product owners and digital leaders", need: "Evidence of what users need before budget is committed to a build." },
    { role: "Customer experience and service teams", need: "Journeys that hold together across channels, departments and handoffs." },
    { role: "Marketing and communications leaders", need: "Content and campaigns that are consistent, easy to find and measured." },
    { role: "Public-sector service owners", need: "Digital services residents can complete the first time, on any device." },
  ],
  capabilitiesIntro:
    "Seven connected capabilities, from research and design thinking to content and CX optimization. We deliver them as part of a product build or on their own, and hand over the research and design assets your teams keep using.",
  capabilities: [
    {
      id: "user-research",
      title: "User research and insights",
      summary:
        "Teams build on assumptions when nobody has asked the people who use the product. We plan and run research with them and turn what we learn into insights the team can act on.",
      items: [
        "Research plans and participant criteria",
        "Interviews, contextual inquiry and surveys",
        "Usability testing of current and new designs",
        "Personas, journey insights and findings reports",
      ],
      provenance: "verified",
    },
    {
      id: "product-service-design",
      title: "Digital product and service design",
      summary:
        "A polished screen can't fix a broken service behind it. We design the product and the service together, from journeys and information architecture to interfaces and the steps staff follow.",
      items: [
        "Customer journeys and service blueprints",
        "Information architecture and user flows",
        "Wireframes, prototypes and interface design",
        "Design systems and specifications for engineering",
      ],
      provenance: "verified",
    },
    {
      id: "design-thinking",
      title: "Design thinking",
      summary:
        "Teams often agree on a solution before they agree on the problem. We run structured workshops and design sprints that align stakeholders on the real problem, generate options and test them quickly.",
      items: [
        "Problem framing and opportunity mapping",
        "Co-design workshops with stakeholders and users",
        "Design sprints and rapid prototyping",
        "Concept testing and prioritization",
      ],
      provenance: "verified",
    },
    {
      id: "digital-marketing",
      title: "Digital marketing, communications and media",
      summary:
        "Campaigns and channels drift apart when each team runs its own. We plan and produce digital marketing and communications that carry one message across channels, and measure what works.",
      items: [
        "Channel and communications planning",
        "Campaign creative and landing pages",
        "Email, social and media content",
        "Campaign measurement and reporting",
      ],
      platforms: ["Marketo Engage"],
      provenance: "verified",
    },
    {
      id: "experience-assessments",
      title: "Experience assessments",
      summary:
        "It's hard to improve an experience nobody has measured. We review your website, app or service against usability principles, accessibility guidelines, analytics and customer feedback, then rank the fixes.",
      items: [
        "Heuristic and usability reviews",
        "Accessibility reviews against WCAG guidelines",
        "Journey analytics and customer feedback review",
        "Prioritized improvement roadmap",
      ],
      provenance: "verified",
    },
    {
      id: "content-creation",
      title: "Content creation and management",
      summary:
        "Content written for the organization doesn't help the customer. We plan, write and structure content for each channel, and set up the workflow and governance that keep it accurate.",
      items: [
        "Content strategy and audits",
        "UX writing and editorial content",
        "Content models and taxonomy",
        "Publishing workflow and governance",
      ],
      platforms: ["Experience Manager"],
      provenance: "verified",
    },
    {
      id: "cx-optimization",
      title: "Customer experience (CX) optimization",
      summary:
        "Launch is where the learning starts. We measure how customers use the experience, test changes, and improve journeys over time based on analytics, feedback and experiments.",
      items: [
        "CX metrics and journey analytics",
        "Customer feedback programs",
        "A/B and multivariate testing",
        "Personalization roadmaps",
      ],
      platforms: ["Analytics", "Target"],
      provenance: "verified",
    },
  ],
  approach: [
    {
      stage: "Understand & strategize",
      activities:
        "Research users, assess the current experience and its data, and agree with stakeholders on the problem, the audience and how success will be measured.",
      deliverable: "Research insights, experience assessment and success measures",
    },
    {
      stage: "Implement & integrate",
      activities:
        "Design journeys, flows and interfaces, test prototypes with users, and work alongside engineering in agile sprints to build, integrate and launch.",
      deliverable: "Tested designs, design system and a launched product",
    },
    {
      stage: "Optimize & grow",
      activities:
        "Measure adoption and CX metrics, test improvements, keep content current, and feed what we learn back into the product backlog.",
      deliverable: "CX measures, test results and an improvement backlog",
    },
  ],
  deliverables: [
    { title: "Research insights", description: "What users need and where they struggle, with the evidence behind each finding." },
    { title: "Experience assessment", description: "Usability, accessibility and journey issues, ranked by impact and effort." },
    { title: "Journey maps and service blueprints", description: "How the experience works today and how it should work, across channels and teams." },
    { title: "Prototypes and interface designs", description: "Tested designs and specifications your engineers can build from." },
    { title: "Design system", description: "Reusable components, patterns and guidelines that keep the product consistent as it grows." },
    { title: "Content and CX measurement plan", description: "Content standards and governance, plus the metrics and tests that show whether the experience is improving." },
  ],
  useCases: [
    {
      title: "An online application residents can finish",
      context: "A regional agency's online grant application is often abandoned, and many applicants phone for help instead.",
      approach:
        "Interview applicants and front-line staff, map the end-to-end service, redesign the form flow and guidance content, and usability-test prototypes before the build.",
      outcome: "More applications completed online, fewer support calls, and a service that staff can explain and support.",
    },
    {
      title: "One onboarding journey across app and branch",
      context: "A bank's account-opening journey loses applicants between the mobile app and the identity checks in the branch.",
      approach:
        "Run a design thinking workshop with product, compliance and operations, prototype one connected journey, test it with customers, then refine it in agile sprints with engineering.",
      outcome: "An onboarding journey that keeps the required checks without asking customers to repeat steps.",
    },
    {
      title: "Evidence-led retail optimization",
      context: "A retailer has redesigned its site, but conversion has not improved and teams disagree on why.",
      approach:
        "Assess the experience against analytics and customer feedback, rank the fixes, and run A/B tests in Adobe Target on the journeys that matter most.",
      outcome: "Changes are made on evidence, and the team has a repeatable way to test and improve.",
    },
  ],
  benefits: [
    { title: "Less rework", description: "Testing with users before the build catches problems while they are cheap to fix." },
    { title: "Higher adoption", description: "Products designed around real tasks are easier to learn and use." },
    { title: "Consistent experiences", description: "Shared journeys, design systems and content standards keep channels aligned." },
    { title: "Decisions on evidence", description: "Research, analytics and testing replace opinion in design decisions." },
  ],
  faqs: [
    {
      question: "What is experience design?",
      answer:
        "Experience design shapes how people find, use and feel about a product or service. It covers research into what users need, the design of journeys, interfaces and content, and measurement after launch, so the whole experience works and not only individual screens.",
    },
    {
      question: "Do you only design, or do you also build?",
      answer:
        "Both. Our designers work alongside our product and engineering teams, so research and design flow straight into agile delivery. If your own developers or another partner will build the product, we provide specifications and a design system they can build from.",
    },
    {
      question: "How much user research do we need?",
      answer:
        "Enough to answer the decisions in front of you. A small number of interviews or usability sessions often surfaces the most serious issues; broader research makes sense before a new product, a new market or a large investment. We scope research to the decision, not to a fixed template.",
    },
    {
      question: "Can you assess our existing website or app?",
      answer:
        "Yes. An experience assessment reviews usability, accessibility, content and journey analytics, and gives you a prioritized list of fixes. It's a practical starting point when you want improvements without a full redesign.",
    },
    {
      question: "How does experience design work with Adobe Experience Cloud?",
      answer:
        "Adobe applications deliver content, personalization and testing, and they work best when the journeys and content behind them are designed first. We design those journeys and that content, then implement and optimize them in Adobe Experience Manager, Adobe Target and Adobe Analytics through our Adobe services.",
    },
    {
      question: "How does this relate to your Digital & Product services?",
      answer:
        "Experience Design focuses on the people who use the product: research, product and service design, content and CX. Digital & Product covers digital strategy, product vision, product development, go-to-market and agile transformation. Most product work draws on both.",
    },
  ],
  cta: {
    title: "Design the experience before you build it.",
    body: "Tell us about the product, service or journey you want to improve. We'll suggest a practical first step, from a focused assessment to research with your users.",
  },
};
