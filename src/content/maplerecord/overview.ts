// Written from maplerecord.com (home, /about-us, /contact-us, /blogs, /videos, /webinar, /events, /media), crawled 2026-11-03.
// Wording follows the official site. Omitted on purpose (see docs/MAPLERECORD-SOURCES.md): dated events and
// webinars that have already passed, unlinked press and video items, and "Join thousands of teams", which
// conflicts with the About page's "5+ organizations".
import type { MrImage } from "@/lib/content/types";

const image = (name: string, width: number, height: number, alt: string): MrImage => ({ src: `/maplerecord/${name}.webp`, width, height, alt });

export const mrOfficial = {
  site: "https://maplerecord.com/",
  demo: "https://maplerecord.com/contact-us/#schedule-demo",
  contact: "https://maplerecord.com/contact-us/",
  terms: "https://maplerecord.com/terms/",
  privacy: "https://maplerecord.com/privacy-policy/",
};

export const mrHero = {
  eyebrow: "Manage your information ecosystem",
  title: "An AI-first hybrid records management system for electronic and physical records",
  tagline: "Secure records. Automate requests. Streamline operations.",
  image: image("hero-dashboard", 1400, 898, "MapleRecord records dashboard"),
};

export const mrPlatformIntro = {
  eyebrow: "Never miss a deadline.",
  body: "Eliminate legacy system risk by automating record handling into secure, compliant, audit-ready workflows.",
  title: "One unified platform. Four integrated modules.",
};

/** "How we help" tabs on the MapleRecord home page, linked to the matching solution pages. */
export const mrDepartments = [
  {
    name: "Finance",
    solution: "finance-accounting",
    points: [
      "Centralize financial records with automated retention and audit trails",
      "Speed up approvals, reconciliations, and compliance reporting by up to 40%",
      "Control access to invoices, contracts, and financial statements securely",
    ],
    image: image("dept-finance", 1024, 1023, "MapleRecord finance records view"),
  },
  {
    name: "Legal",
    solution: "legal-compliance",
    points: [
      "Maintain easily defensible records with lifecycle governance",
      "Simplify audits, eDiscovery, and regulatory reporting",
      "FOI/RTI and legal requests resolved 2-4x faster with secure redaction",
    ],
    image: image("dept-legal", 1024, 1024, "MapleRecord legal requests view"),
  },
  {
    name: "Human Resources",
    solution: "human-resources",
    points: [
      "Securely manage employee records from onboarding to exit, reducing manual effort by up to 40%",
      "Automate HR workflows such as policy acknowledgements and requests",
      "Ensure privacy, role-based access, and retention compliance",
    ],
    image: image("dept-hr", 1018, 1004, "MapleRecord HR workspace view"),
  },
  {
    name: "Operations",
    solution: "operations",
    points: [
      "Eliminate manual, paper-based processes with automated workflows, reducing processing time by 30-50%",
      "Improve process visibility, tracking, and accountability",
      "Standardise operational documentation across teams",
    ],
    image: image("dept-operations", 1024, 1023, "MapleRecord operations workflow view"),
  },
  {
    name: "Healthcare",
    solution: "healthcare",
    points: [
      "Manage administrative and patient-related records securely",
      "Ensure compliance with healthcare regulations and retention policies",
      "Enable up to 3x faster request handling with audit-ready records",
    ],
    image: image("dept-healthcare", 881, 940, "MapleRecord healthcare administration view"),
  },
  {
    name: "Research & Development",
    solution: "research-development",
    points: [
      "Protect sensitive research data with controlled access",
      "Maintain version control, traceability, and documentation governance",
      "Support collaboration while ensuring IP protection",
    ],
    image: image("dept-rnd", 952, 1001, "MapleRecord research workspace view"),
  },
  {
    name: "Customer Service",
    solution: "customer-service",
    points: [
      "Access complete, accurate records for faster issue resolution",
      "Automate request intake, routing, and response workflows",
      "Improve transparency, cut response times by up to 40%, and boost customer satisfaction",
    ],
    image: image("dept-customer-service", 985, 977, "MapleRecord customer service requests view"),
  },
] as const;

export const mrPillars = [
  {
    eyebrow: "Smart data governance",
    title: "MapleRecord delivers intelligent information management",
    points: [
      "Find records up to 10x faster with metadata-driven search",
      "Organize everything with secure, custom workspaces",
      "Gain actionable process insights through built-in Analytics",
    ],
    image: image("pillar-governance", 1024, 1536, "MapleRecord retention, access and workflow settings"),
  },
  {
    eyebrow: "Zero-friction workflows",
    title: "Low-code workflow automation",
    points: [
      "Automate creation, review, and approvals",
      "Configure workflows quickly with low-code templates",
      "Reduce manual finance and invoice handling by 84%",
    ],
    image: image("pillar-workflows", 950, 887, "MapleRecord document upload with retention policy"),
  },
  {
    eyebrow: "Enterprise-grade security guaranteed",
    title: "Enterprise-grade security powered by context-based access",
    points: [
      "Maintain 100% version control with complete audit trails",
      "Enforce retention and compliance policies automatically",
      "Stay audit-ready with secure archiving",
    ],
    image: image("pillar-security", 844, 1170, "MapleRecord document version history and audit trail"),
  },
  {
    eyebrow: "Seamless integration",
    title: "Built to integrate. Designed to deploy anywhere.",
    points: [
      "Enable secure access across web, mobile, and desktop",
      "Integrate seamlessly with ERP/CRM systems in weeks, not months",
      "Deploy flexibly across cloud or on-premise infrastructure",
    ],
    image: image("pillar-integration", 1023, 1148, "MapleRecord integrations with ERP, CRM, cloud and on-premise systems"),
  },
] as const;

export const mrFeatures = {
  eyebrow: "Powerful features",
  title: "Everything you need to manage records",
  intro: "Built for teams of all sizes, from startups to enterprises",
  items: [
    { icon: "sparkles", title: "AI-powered insights", body: "Leverage advanced AI to automatically categorize, tag, and extract insights from your records." },
    { icon: "shield", title: "Enterprise security", body: "Bank-level encryption and compliance with industry standards to keep your data safe." },
    { icon: "zap", title: "Lightning fast", body: "Search and retrieve millions of records in milliseconds with our optimized infrastructure." },
    { icon: "database", title: "Unlimited storage", body: "Store as many records as you need without worrying about storage limits or costs." },
    { icon: "users", title: "Team collaboration", body: "Work together seamlessly with role-based access control and real-time updates." },
    { icon: "chart", title: "Advanced analytics", body: "Get actionable insights with powerful reporting and visualization tools." },
  ],
} as const;

export const mrFaqs = [
  {
    question: "Why do organizations choose MapleRecord?",
    answer: "Organizations choose MapleRecord to securely manage records, automate information requests, and streamline workflows in one integrated platform.",
  },
  {
    question: "Who is MapleRecord designed for?",
    answer: "MapleRecord is built for enterprises and public-sector organizations operating in regulated environments.",
  },
  {
    question: "How does MapleRecord support security and compliance?",
    answer: "MapleRecord supports enterprise-grade security, role-based access, audit trails, and retention controls.",
  },
  {
    question: "Can MapleRecord integrate with our existing systems?",
    answer: "Yes. MapleRecord integrates with ERP, CRM, and other enterprise systems without disrupting existing operations.",
  },
  {
    question: "How quickly can MapleRecord be deployed?",
    answer: "MapleRecord is designed for rapid deployment and can be configured in weeks, depending on organizational needs.",
  },
];

export const mrAbout = {
  title: "About MapleRecord",
  tagline: "Transforming how organizations manage, share, and secure their critical documents through innovative records management solutions.",
  mission: "To help organizations gain control of their information ecosystem by replacing fragmented systems and manual processes with secure, intelligent, and automated information management.",
  vision: "To be the leading records management platform trusted by organizations worldwide, setting the standard for secure, efficient, and intelligent document management.",
  story: [
    "MapleRecord was founded to rethink how organizations manage information in a fast-changing digital world. As data volumes grow and regulations tighten, many teams still rely on fragmented tools and manual processes that slow them down.",
    "We built MapleRecord as an AI-driven platform that unifies records, requests, and workflows in one place. By simplifying how information is captured, governed, and shared, we help teams work faster and respond with confidence.",
    "Today, MapleRecord supports enterprises and public-sector organizations looking to modernize information management without added complexity. Our focus is on secure, scalable solutions that grow with our customers and keep teams focused on outcomes—not administration.",
  ],
  valuesIntro: "Our core values guide everything we do, from product development to customer relationships.",
  values: [
    { icon: "shield", body: "Enterprise-grade security, role-based access, and end-to-end data protection are built into the platform." },
    { icon: "award", body: "Designed to support regulatory, retention, and audit requirements without adding operational burden." },
    { icon: "trend", body: "Built to handle high volumes of records, requests, and workflows across large, distributed organizations." },
    { icon: "zap", body: "AI is applied where it delivers real value—classification, discovery, routing, and insights—without unnecessary complexity." },
  ],
  numbers: [
    { value: "5+", label: "Organizations", body: "Trust MapleRecord for their records management" },
    { value: "10M+", label: "Documents", body: "Managed securely on our platform" },
    { value: "99.9%", label: "Uptime", body: "Reliable platform you can count on" },
    { value: "24/7", label: "Support", body: "Always here when you need us" },
  ],
  industries: [
    { name: "Financial services", body: "Banking, investment, and financial compliance solutions", solution: "financial-services" },
    { name: "Healthcare", body: "HIPAA-compliant patient records management", solution: "healthcare" },
    { name: "Education", body: "Student records and academic document management", solution: "education" },
    { name: "Insurance", body: "Policy and claims document management", solution: "insurance" },
    { name: "Manufacturing", body: "Quality, compliance, and supply chain records", solution: "manufacturing" },
    { name: "Government", body: "Public sector document and records management", solution: "state-local-government" },
  ],
  images: {
    hero: image("about-open", 1080, 720, "Sign reading Open — business as new normal"),
    story: image("about-meeting", 1080, 608, "Team meeting around a laptop"),
  },
};

export const mrContact = {
  title: "Connect with our sales team to transform your records management",
  body: "Ready to elevate your records management? Contact us today to explore how our solutions can transform your organization. Our sales team is here to help you get the answers to all your queries!",
  email: "info@maplerecord.com",
  phone: { display: "+1 (940) 945-6180", e164: "+19409456180" },
  offices: [
    { label: "Canada Office", lines: ["739 D'Arcy St", "Cobourg, ON K9A 0H6", "Canada"] },
    { label: "USA Office", lines: ["26875 US Highway 380", "Aubrey, TX 76227", "USA"] },
  ],
};

/** Resource hubs on maplerecord.com. Their individual items are dated or unlinked, so we link to the hubs. */
export const mrResourceHubs = [
  { title: "Videos", body: "Watch product demos, tutorials, customer success stories, and thought leadership content to master records management.", href: "https://maplerecord.com/videos/" },
  { title: "Webinars", body: "Live sessions and on-demand content covering records management, compliance, and digital transformation.", href: "https://maplerecord.com/webinar/" },
  { title: "Events", body: "Industry conferences, workshops, webinars, and exclusive events designed to help you master records management.", href: "https://maplerecord.com/events/" },
  { title: "Media & press", body: "The latest news, press releases, and media resources about MapleRecord.", href: "https://maplerecord.com/media/" },
];
