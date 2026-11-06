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

/** Everything the header, mobile sheet and footer need to link into the Adobe section. */
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

export const expertiseNav: NavItem[] = [
  { label: "AI Governance", href: "/ai-governance", description: "Oversight, accountability and review for AI use" },
  { label: "Adobe Services", href: adobeServicesPath, description: "Implementation and optimization of Adobe platforms" },
  { label: "Data Management", href: "/data-management", description: "Governance, integration, quality and lifecycle" },
];

export const primaryNav: NavItem[] = [
  ...expertiseNav,
  { label: "MapleRecord", href: mapleRecordPath },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

/**
 * Builds the small Adobe menu model from the product content. Call it only from Server
 * Components and pass the result down as props, so product copy never reaches the client bundle.
 */
export function getAdobeNav(): AdobeNav {
  return {
    overview: { label: "All Adobe services", href: adobeServicesPath },
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

/** MapleRecord menu model. Server-only, like `getAdobeNav`. */
export function getMapleRecordNav(): MapleRecordNav {
  return {
    overview: { label: "MapleRecord overview", href: mapleRecordPath },
    sections: [
      { label: "Overview", href: mapleRecordPath, description: "AI-first hybrid records management" },
      { label: "Platform", href: `${mapleRecordPath}/platform`, description: "Five integrated modules" },
      { label: "Solutions", href: `${mapleRecordPath}/solutions`, description: "By industry and department" },
      { label: "Resources", href: `${mapleRecordPath}/resources`, description: "Articles, videos and events" },
      { label: "About", href: `${mapleRecordPath}/about`, description: "Story, mission and values" },
      { label: "Contact", href: `${mapleRecordPath}/contact`, description: "Sales team and offices" },
    ],
    modules: getMrModules().map((m) => ({ label: m.name, href: `${mapleRecordPath}/platform/${m.slug}`, slug: m.slug })),
    demo: { label: "Request a demo", href: mrOfficial.demo },
  };
}

export type NavGroup = { heading: string; items: (NavItem & { srPrefix?: string })[] };

const companyNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "MapleRecord", href: "/maplerecord" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/** Footer link columns. Server-only, like `getAdobeNav`. */
export function getFooterNav(): NavGroup[] {
  const adobe = getAdobeNav();
  return [
    { heading: "Expertise", items: expertiseNav },
    {
      heading: "Adobe Services",
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
