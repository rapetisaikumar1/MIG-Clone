/**
 * Verified company identity. Every item here was checked against the live site
 * (maverickinnogarage.com/contact, footer) on 2026-11-02. Header, footer, contact page,
 * metadata and JSON-LD all read from this module — do not duplicate these values elsewhere.
 */
export type Office = {
  id: string;
  label: string;
  region: string;
  country: "US" | "CA";
  streetLines: string[];
  locality: string;
  regionCode: string;
  postalCode: string;
  phone: { display: string; e164: string };
};

const offices: [Office, ...Office[]] = [
  {
    id: "delaware",
    label: "Delaware, United States",
    region: "Delaware",
    country: "US",
    streetLines: ["8 The Green #20296"],
    locality: "Dover",
    regionCode: "DE",
    postalCode: "19901",
    phone: { display: "+1 (940) 945-6180", e164: "+19409456180" },
  },
  {
    id: "texas",
    label: "Texas, United States",
    region: "Texas",
    country: "US",
    streetLines: ["Suite-120 Office-C", "26875 US Highway 380"],
    locality: "Aubrey",
    regionCode: "TX",
    postalCode: "76227",
    phone: { display: "+1 (940) 945-6180", e164: "+19409456180" },
  },
  {
    id: "ontario",
    label: "Ontario, Canada",
    region: "Ontario",
    country: "CA",
    streetLines: ["105 Consumers Dr"],
    locality: "Whitby",
    regionCode: "ON",
    postalCode: "L1N 1C4",
    phone: { display: "+1 (647) 674-2623", e164: "+16476742623" },
  },
];

export const company = {
  name: "Maverick InnoGarage",
  shortName: "MiG",
  // Positioning per the owner directive of 2026-11-07: a software development and professional services
  // company. Four specializations in priority order (AI Governance, Adobe Services, Data Management,
  // Software Development), plus MapleRecord, MiG's own product. Use these strings verbatim for self-description.
  /** Canonical sentence: About lead, Organization JSON-LD `description`, README and long-form intros. */
  descriptor:
    "Maverick InnoGarage is a software development and professional services company specializing in AI governance, Adobe enterprise solutions, data management and enterprise software, and the maker of MapleRecord, our records management platform.",
  /** Short variant (≤ 160 characters): default and home meta description, OG and Twitter descriptions. */
  positioning:
    "Software development and professional services for AI governance, Adobe solutions, data management and enterprise software, from the makers of MapleRecord.",
  /** One-line footer blurb. */
  blurb: "Software development and professional services for responsible AI, Adobe solutions, enterprise data and records management.",
  thesis: "Trusted data supports responsible AI and effective digital experiences.",
  // No email address is published on the current site. Leave null until confirmed.
  email: null as string | null,
  offices,
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/maverick-innogarage/" },
    { label: "X", href: "https://x.com/Maverick_MIG" },
    { label: "Instagram", href: "https://www.instagram.com/maverickinnogarage/" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61557012232816" },
  ],
  /**
   * Adobe Solution Partner status, shown in the header at Maverick InnoGarage's request (2026-11-03).
   * The badge is Adobe's partner lockup with the Bronze tier line, as on MiG's original co-brand file
   * (shown with the tier at MiG's request, 2026-11-06). Set `verified: false` to hide it everywhere.
   */
  adobePartner: {
    verified: true,
    badge: { src: "/brand/adobe-solution-partner.svg", width: 258, height: 76, alt: "Adobe Solution Partner, Bronze" },
  },
} as const;

/** Main line shown in calls to action (Delaware and Texas share this number). */
export const primaryPhone = offices[0].phone;

export function formatAddress(office: Office) {
  return [...office.streetLines, `${office.locality}, ${office.regionCode} ${office.postalCode}`];
}

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Only production deployments may be indexed; previews and local builds send noindex. */
export const isIndexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.SITE_INDEXABLE === "true";
