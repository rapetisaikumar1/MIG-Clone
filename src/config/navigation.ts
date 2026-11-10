import { mrOfficial } from "@/content/maplerecord/official";
import { adobeAssessmentPath, adobeProductPath, adobeServicesPath, getAdobeProducts } from "@/lib/content/adobe";
import { getMrModules } from "@/lib/content/maplerecord";
import type { MrModuleSlug } from "@/lib/content/types";

export type NavItem = { label: string; href: string; description?: string };

/** A serializable Adobe application link for menus (safe to pass to client components). */
export type AdobeNavItem = {
  /** Short menu label, e.g. "Experience Manager"; render with a visually hidden "Adobe " prefix. */
  label: string;
  href: string;
  /** Capability area, e.g. "Content". */
  area: string;
  /** One-line summary, omitted while the copy is still a placeholder. */
  summary?: string;
};

/** Everything the header, mobile sheet and footer need to link into the MarTech (Adobe Experience Cloud) section. */
export type AdobeNav = {
  overview: NavItem;
  products: AdobeNavItem[];
  assessment: NavItem;
};

/** Everything the header and mobile sheet need to link into the MapleRecord section. */
export type MapleRecordNav = {
  overview: NavItem;
  /** The section's pages, overview first. */
  sections: NavItem[];
  modules: (NavItem & { slug: MrModuleSlug })[];
  demo: NavItem;
};

export const mapleRecordPath = "/maplerecord";

export const servicesPath = "/services";
export const moliPath = "/moli";

/** One practice pillar of the 2026 Capability Matrix, in the deck's order. */
export type PillarNavItem = NavItem & {
  /** Two-digit pillar number from the Capability Matrix ("01"–"07"). */
  number: string;
  /** Extra destinations inside the pillar (products for pillar 07). */
  links?: NavItem[];
};

/**
 * The seven practice pillars of the Maverick InnoGarage Capability Matrix (October 2026), the primary
 * reference for what we offer. URL slugs predate the pillar names and are kept for SEO and legacy links.
 * Pillar 07 (the deck's "Records Management & Compliance") is presented as Information Governance & Records
 * (owner direction, 2026-11-10): a service page, delivered with our two products, MapleRecord and MOLI.
 * Pillar 03 leads with MarTech; Adobe Experience Cloud is the platform we deliver it on.
 */
export const pillarsNav: PillarNavItem[] = [
  {
    number: "01",
    label: "Data & Analytics",
    href: "/data-management",
    description: "Data strategy, governance, modern data architecture, data science and visualization",
  },
  {
    number: "02",
    label: "Engineering & Technology",
    href: "/software-development",
    description: "Cloud on AWS and Azure, DevOps, AI/ML enablement, mobile, QA and custom software",
  },
  {
    number: "03",
    label: "MarTech & Adobe Experience Cloud",
    href: adobeServicesPath,
    description: "Customer data, content, personalization, analytics, marketing automation and commerce on Adobe",
  },
  {
    number: "04",
    label: "Experience Design",
    href: "/experience-design",
    description: "User research, service design, design thinking, content and CX optimization",
  },
  {
    number: "05",
    label: "Digital & Product",
    href: "/digital-product",
    description: "Digital strategy, product vision, product development, go-to-market and agile delivery",
  },
  {
    number: "06",
    label: "Business Transformation & CRM",
    href: "/business-transformation",
    description: "Process optimization, change enablement, program management and Microsoft Dynamics 365",
  },
  {
    number: "07",
    label: "Information Governance & Records",
    href: "/information-governance",
    description: "Records lifecycle, retention and privacy compliance support, with MapleRecord and MOLI",
    links: [
      { label: "MapleRecord", href: mapleRecordPath, description: "Public sector and enterprise records management with workflow automation" },
      { label: "MOLI", href: moliPath, description: "AI-driven record management, designed to support global privacy compliance" },
    ],
  },
];

/** AI Governance: responsible AI and AI risk work, alongside data governance and AI/ML enablement. */
export const aiGovernanceNav: NavItem = {
  label: "AI Governance",
  href: "/ai-governance",
  description: "Responsible AI, AI risk management and compliance support",
};

/**
 * The four core areas we lead with (owner direction, 2026-11-10): Information Governance, Data Governance,
 * AI Governance and MarTech. Each points at the page that delivers it; Adobe is MarTech's platform, not the headline.
 */
export const coreExpertiseNav: NavItem[] = [
  {
    label: "Information Governance",
    href: "/information-governance",
    description: "Records lifecycle, retention and privacy compliance support, with MapleRecord and MOLI",
  },
  {
    label: "Data Governance",
    href: "/data-management",
    description: "Data ownership, quality, security and regulatory compliance, with analytics built on top",
  },
  aiGovernanceNav,
  {
    label: "MarTech",
    href: adobeServicesPath,
    description: "Customer data, content, personalization and marketing automation on Adobe Experience Cloud",
  },
];

const pillarItem = ({ label, href, description }: PillarNavItem): NavItem => ({ label, href, description });
const byHref = (href: string) => pillarsNav.find((p) => p.href === href)!;

/**
 * Every service page for the footer, mobile menu, 404 and "Connected expertise": the pages behind the four
 * core areas first (pillar 07, pillar 01, AI Governance, pillar 03), then the remaining pillars in deck order.
 */
export const servicesNav: NavItem[] = [
  pillarItem(byHref("/information-governance")),
  pillarItem(byHref("/data-management")),
  aiGovernanceNav,
  pillarItem(byHref(adobeServicesPath)),
  ...pillarsNav
    .filter((p) => !["/information-governance", "/data-management", adobeServicesPath].includes(p.href))
    .map(pillarItem),
];

/** Desktop header: a Services menu (core expertise and the pillars), the MarTech (Adobe) and MapleRecord menus, then company pages. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: servicesPath },
  { label: "MarTech", href: adobeServicesPath },
  { label: "MapleRecord", href: mapleRecordPath },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

/** Mobile sheet: the same items as the desktop header (the sheet expands Services into the pillars). */
export const mobileNav: NavItem[] = primaryNav;

/** Everything the header and mobile sheet need for the Services menu (plain data, safe to pass to client components). */
export type ServicesNav = {
  overview: NavItem;
  /** The four core areas, listed first in every services menu. */
  core: NavItem[];
  pillars: PillarNavItem[];
};

/** Services menu model, passed down as props like `getAdobeNav`. */
export function getServicesNav(): ServicesNav {
  return {
    overview: { label: "All services", href: servicesPath, description: "Our core expertise and the seven practice pillars" },
    core: coreExpertiseNav,
    pillars: pillarsNav,
  };
}

/**
 * Builds the small Adobe menu model from the product content. Call it only from Server
 * Components and pass the result down as props, so product copy never reaches the client bundle.
 */
export function getAdobeNav(): AdobeNav {
  return {
    // MarTech is the practice; Adobe Experience Cloud is the platform we deliver it on.
    overview: { label: "MarTech overview", href: adobeServicesPath, description: "How we design, implement and run MarTech on Adobe" },
    products: getAdobeProducts().map((p) => {
      const summary = p.summary.trim();
      return {
        label: p.shortName,
        href: adobeProductPath(p.slug),
        area: p.area,
        ...(summary && !/^todo\b/i.test(summary) ? { summary } : {}),
      };
    }),
    assessment: {
      label: "Adobe platform assessment",
      href: adobeAssessmentPath,
      description: "A structured review of how your Adobe applications are set up, connected and used, with prioritized next steps.",
    },
  };
}

/** Menu-length lines for the five modules, condensed from each module's published summary. */
const mrModuleBlurbs: Record<MrModuleSlug, string> = {
  "mr-records": "Secure, structured, searchable recordkeeping",
  "mr-requests": "Public and internal information requests",
  "mr-workflows": "No-code automation across modules",
  "mr-forms": "Drag-and-drop and AI-generated forms",
  "mr-admin": "Users, licenses, security and backups",
};

/** MapleRecord menu model. Server-only, like `getAdobeNav`. */
export function getMapleRecordNav(): MapleRecordNav {
  return {
    overview: { label: "MapleRecord overview", href: mapleRecordPath },
    sections: [
      { label: "Overview", href: mapleRecordPath, description: "Public sector and enterprise records management" },
      { label: "Platform", href: `${mapleRecordPath}/platform`, description: "Five integrated modules" },
      { label: "Solutions", href: `${mapleRecordPath}/solutions`, description: "By industry and department" },
      { label: "Resources", href: `${mapleRecordPath}/resources`, description: "Articles, videos and events" },
      { label: "About", href: `${mapleRecordPath}/about`, description: "Story, mission and values" },
      { label: "Contact", href: `${mapleRecordPath}/contact`, description: "Sales team and offices" },
    ],
    modules: getMrModules().map((m) => ({
      label: m.name,
      href: `${mapleRecordPath}/platform/${m.slug}`,
      slug: m.slug,
      description: mrModuleBlurbs[m.slug],
    })),
    demo: { label: "Request a demo", href: mrOfficial.demo },
  };
}

export type NavGroup = { heading: string; items: (NavItem & { srPrefix?: string })[] };

const companyNav: NavItem[] = [
  { label: "All services", href: servicesPath },
  { label: "MapleRecord", href: "/maplerecord" },
  { label: "MOLI", href: moliPath },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/** Footer link columns. Server-only, like `getAdobeNav`. */
export function getFooterNav(): NavGroup[] {
  const adobe = getAdobeNav();
  return [
    { heading: "Services", items: servicesNav },
    {
      // The MarTech practice's Adobe Experience Cloud applications; the practice page itself is under Services.
      heading: "MarTech on Adobe",
      // Short labels read as "Adobe Analytics", "Adobe platform assessment"… out of context.
      items: [
        ...adobe.products.map((p) => ({ label: p.label, href: p.href, srPrefix: "Adobe " })),
        { label: "Platform assessment", href: adobe.assessment.href, srPrefix: "Adobe " },
      ],
    },
    { heading: "Company", items: companyNav },
  ];
}

export const legalNav: NavItem[] = [
  { label: "Privacy notice", href: "/privacy" },
  { label: "Cookie policy", href: "/cookies" },
];

export const contactCta: NavItem = { label: "Talk to an Expert", href: "/contact" };
