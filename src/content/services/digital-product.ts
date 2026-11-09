import type { ServiceContent } from "@/lib/content/types";

/**
 * Pillar 05 of the Maverick InnoGarage Capability Matrix (October 2026): "Digital & Product".
 * Source: the deck's pillar list (Digital Strategy & Transformation · Product Vision & Strategy · User-Centric Design ·
 * Product Development & Go-to-Market · Product Organization Transformation · Agile Transformation) and its "Experience
 * Design & Digital Product" slide: "We pair research-led experience design with product strategy and agile delivery, so
 * every digital product is useful, usable and ready for market." The six capability titles come from the deck
 * ("verified"); the items under each describe what that capability involves and need no further claims.
 *
 * Positioning: strategy work is the first stage of delivery (we define, build and ship), never advisory-only.
 * No clients, figures, framework certifications, team sizes or delivery models are stated.
 * The `digital-strategy` capability id is a link target: /digital-transformation-consulting redirects to it.
 */
export const digitalProduct: ServiceContent = {
  slug: "digital-product",
  interest: "digital-product",
  name: "Digital & Product",
  insightTheme: "Customer Experience",
  meta: {
    title: "Digital & Product",
    description:
      "Digital strategy, product vision, user-centric design, product development and agile delivery: digital products defined, built and taken to market.",
  },
  hero: {
    eyebrow: "Strategy · Product · Agile",
    title: "Turn digital strategy into products that ship.",
    lead: "We pair product strategy with user-centric design and agile delivery, then build and launch the product with you, so every digital product is useful, usable and ready for market.",
  },
  problem: {
    title: "Most digital strategies stall between the roadmap and the release.",
    body: [
      "A digital strategy gets approved, then breaks into projects. Roadmaps fill with feature requests instead of outcomes, design happens after the big decisions are made, and teams disband when each project closes. Months later, customers and staff are still waiting for something they can use.",
      "We keep strategy, design and delivery in one line of work. We define the product vision and the outcomes that matter with you, test ideas with real users, build and release in short iterations, and shape the teams and practices that keep the product improving after launch.",
    ],
    signals: [
      "A digital strategy that hasn't changed what teams build",
      "Roadmaps full of features with no measurable outcomes",
      "Products designed without input from the people who use them",
      "Releases that take months and still arrive late",
      "Teams organized around projects that end, not products that last",
      "Agile ceremonies in place, but delivery no faster",
    ],
  },
  audience: [
    { role: "Executives leading digital programs", need: "A strategy that turns into shipped products and measurable results." },
    { role: "Product leaders and product owners", need: "A clear vision, a prioritized roadmap and a team to deliver it." },
    { role: "Technology and delivery leaders", need: "Agile practices that ship reliably, release after release." },
    { role: "Marketing, sales and service leaders", need: "A launch plan that gets the product adopted." },
  ],
  capabilitiesIntro:
    "Our services are modular. We define the strategy and product direction with you, then design, build and launch the product, and shape the teams and practices that keep it improving.",
  capabilities: [
    {
      id: "digital-strategy",
      title: "Digital strategy and transformation",
      summary:
        "Digital strategies often stop at the slide deck. We identify where digital creates value for your organization, sequence the initiatives, then design, build and deliver them, so the strategy shows up in working products and services.",
      items: [
        "Digital maturity and opportunity assessment",
        "Digital strategy and a prioritized transformation roadmap",
        "Business cases and success measures for each initiative",
        "Delivery of priority initiatives by our design and engineering teams",
      ],
      provenance: "verified",
    },
    {
      id: "product-vision",
      title: "Product vision and strategy",
      summary:
        "Without a shared vision, roadmaps fill up with requests. We define who the product serves, the problem it solves and how success is measured, then turn that into a roadmap the team builds against.",
      items: [
        "Product vision, positioning and value proposition",
        "Target users, their needs and the jobs the product does",
        "Outcome-based roadmap and prioritization",
        "Product metrics and success measures",
      ],
      provenance: "verified",
    },
    {
      id: "user-centric-design",
      title: "User-centric design",
      summary:
        "Products designed around assumptions go unused. We bring real users into product decisions through research, prototyping and testing, so what we build is useful and usable.",
      items: [
        "User research to validate product ideas",
        "Prototypes tested with users before build",
        "Accessible interaction and interface design",
        "Research and design depth from our Experience Design practice",
      ],
      provenance: "verified",
    },
    {
      id: "product-development",
      title: "Product development and go-to-market",
      summary:
        "A well-built product still needs a launch plan. We build iteratively from a first viable release, and plan the launch with your marketing, sales and support teams so the product reaches the people it was built for.",
      items: [
        "Minimum viable product definition and build",
        "Iterative releases guided by user feedback and usage data",
        "Go-to-market planning: positioning, launch and adoption",
        "Cloud, mobile and QA from our Engineering & Technology practice",
      ],
      provenance: "verified",
    },
    {
      id: "product-organization",
      title: "Product organization transformation",
      summary:
        "Project teams disband when the project ends, and the knowledge goes with them. We help you move to lasting product teams with clear ownership, roles and decision rights, so products keep improving after launch.",
      items: [
        "Product operating model design",
        "Product owner and product manager roles",
        "Teams organized around products and customer journeys",
        "Enablement for product leaders and teams",
      ],
      provenance: "verified",
    },
    {
      id: "agile-transformation",
      title: "Agile transformation",
      summary:
        "Agile in name doesn't always mean faster delivery. We set up ways of working that fit your organization, apply them with your teams on live delivery work, and measure whether flow and quality improve.",
      items: [
        "Agile delivery assessment",
        "Scrum and Kanban practices adapted to each team",
        "Backlog, cadence and release management",
        "Delivery measures such as lead time and predictability",
      ],
      provenance: "verified",
    },
  ],
  approach: [
    {
      stage: "Understand & strategize",
      activities:
        "Explore business goals, users and constraints, review current products and delivery practices, and agree on the product vision and the outcomes to measure.",
      deliverable: "Product vision, prioritized roadmap and success measures",
    },
    {
      stage: "Implement & integrate",
      activities:
        "Design and test with users, build in short iterations, integrate with your platforms and data, and launch with a go-to-market plan.",
      deliverable: "A working product in market, connected to your systems",
    },
    {
      stage: "Optimize & grow",
      activities:
        "Track adoption and outcomes, refine the roadmap from what users do, and strengthen product teams and agile practices so improvement continues.",
      deliverable: "Usage reporting and an updated roadmap",
    },
  ],
  deliverables: [
    { title: "Digital opportunity assessment", description: "Where digital creates the most value, and which initiatives to deliver first." },
    { title: "Product vision and roadmap", description: "Who the product serves, the outcomes it targets and the releases that get there." },
    { title: "Tested prototypes", description: "Designs validated with real users before engineering effort is committed." },
    { title: "Working product releases", description: "A first viable release in users' hands, followed by regular, measured iterations." },
    { title: "Go-to-market plan", description: "Positioning, launch steps and adoption measures agreed with marketing, sales and support." },
    { title: "Product operating model", description: "Team structure, roles, decision rights and agile practices your teams can run." },
  ],
  useCases: [
    {
      title: "From approved strategy to a first release",
      context: "An insurer's digital strategy was approved two years ago, but customers still complete most service requests by phone.",
      approach:
        "Prioritize the customer journeys with the highest call volume, define a vision and success measures for self-service, test prototypes with policyholders, and release the first journey as a minimum viable product.",
      outcome: "A self-service journey in customers' hands, with completion and call volume tracked to decide what to build next.",
    },
    {
      title: "Launching a new digital product",
      context: "A manufacturer wants to give distributors an app for online ordering and order tracking, but has no product team.",
      approach:
        "Define the target users and value proposition, design and test with a group of distributors, build the app iteratively, and plan the launch with sales and support.",
      outcome: "A product launched with an adoption plan, and a roadmap shaped by how distributors actually use it.",
    },
    {
      title: "Moving from projects to product teams",
      context: "A public-sector agency funds digital services as one-off projects, so each service stalls once its project closes.",
      approach:
        "Organize lasting product teams around services, define product owner roles and decision rights, introduce agile practices on live work, and agree delivery and outcome measures.",
      outcome: "Services keep improving after launch, with clear ownership and a predictable release cadence.",
    },
  ],
  benefits: [
    { title: "Strategy that ships", description: "Every initiative ends in a working release, not a report." },
    { title: "Products people use", description: "Ideas are tested with users before they are built." },
    { title: "Predictable delivery", description: "Short iterations and clear measures show progress release by release." },
    { title: "Lasting capability", description: "Product teams and practices that keep improving the product after launch." },
  ],
  faqs: [
    {
      question: "Do you define the strategy, or also build the product?",
      answer:
        "Both. Strategy is the first stage of delivery: we define the vision, roadmap and success measures with you, then design, build, launch and improve the product with our design and engineering teams.",
    },
    {
      question: "Where do we start?",
      answer:
        "Usually with one product or customer journey that matters to the business. We review the current state, agree on the outcomes to measure and deliver a first release, then extend to more products or teams from there.",
    },
    {
      question: "What is a minimum viable product?",
      answer:
        "The smallest version of a product that gives real users value and lets you learn from how they use it. It is a first release, not a prototype: it is built to be used, measured and improved.",
    },
    {
      question: "Can you work alongside our existing teams?",
      answer:
        "Yes. We can work with your product owners, designers and engineers, and we plan the transfer of practices and knowledge so your teams can run and improve the product.",
    },
    {
      question: "Do you require a specific agile framework?",
      answer:
        "No. We use practices such as Scrum and Kanban where they fit, and adapt cadence, roles and ceremonies to your teams and governance requirements. The test is whether delivery gets faster and more predictable.",
    },
    {
      question: "How does this relate to your Experience Design services?",
      answer:
        "Experience Design covers user research, service design and customer experience across your organization. Digital & Product applies that design work to a specific product, together with product strategy, development, launch and the team practices that keep it improving.",
    },
  ],
  cta: {
    title: "Have a product to define, build or relaunch?",
    body: "Tell us about the product, its users and the outcomes that matter. We'll scope a practical first release with you.",
  },
};
