export type NavItem = { label: string; href: string; description?: string };

export const expertiseNav: NavItem[] = [
  { label: "AI Governance", href: "/ai-governance", description: "Oversight, accountability and review for AI use" },
  { label: "Adobe Services", href: "/adobe-services", description: "Implementation and optimization of Adobe platforms" },
  { label: "Data Management", href: "/data-management", description: "Governance, integration, quality and lifecycle" },
];

export const primaryNav: NavItem[] = [
  ...expertiseNav,
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  { heading: "Expertise", items: expertiseNav },
  {
    heading: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "MapleRecord", href: "/maplerecord" },
      { label: "Industries", href: "/industries" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [{ label: "Privacy notice", href: "/privacy" }];

export const contactCta: NavItem = { label: "Talk to an Expert", href: "/contact" };
