import { moliPath, mapleRecordPath, pillarsNav, type PillarNavItem } from "@/config/navigation";
import { adobeProductPath, getAdobeProduct } from "@/lib/content/adobe";
import type { AdobeProductSlug } from "@/lib/content/types";

/**
 * The "End-to-end capability matrix" from the Maverick InnoGarage Capability Deck (October 2026),
 * rendered on /services. Capability names follow the deck; only spacing and sentence case were adjusted
 * (and "Maplerecord" is spelled as the product is everywhere else on the site). Provenance: verified (deck).
 */

export const matrixIntro = {
  title: "Seven practice pillars. One accountable partner.",
  lead: "From data foundations and cloud engineering to Adobe MarTech, experience design, CRM and compliant records management, MiG covers the full digital transformation lifecycle.",
};

type CapabilitySource = string | { label: string; adobe: AdobeProductSlug };

/** Deck capability lists, keyed by pillar number. Adobe items name the product page they link to. */
const capabilitySources: Record<string, CapabilitySource[]> = {
  "01": [
    "Data strategy & analytics",
    "Data governance & data management",
    "Modern data architecture & engineering",
    "Data science",
    "Data storytelling & visualization",
    "Integrated data solutions",
  ],
  "02": [
    "Cloud strategy & engineering (AWS, Azure)",
    "DevOps",
    "AI/ML enablement",
    "Mobile development",
    "Quality assurance engineering",
  ],
  "03": [
    { label: "Adobe Experience Platform (AEP)", adobe: "experience-platform" },
    "Adobe Experience Cloud",
    { label: "Real-Time CDP", adobe: "real-time-cdp" },
    { label: "Adobe Experience Manager (AEM)", adobe: "experience-manager" },
    { label: "Adobe Analytics", adobe: "analytics" },
    { label: "Marketo services", adobe: "marketo-engage" },
    { label: "Adobe Target", adobe: "target" },
    { label: "Adobe Commerce", adobe: "commerce" },
    { label: "Content management", adobe: "content-management" },
  ],
  "04": [
    "User research & insights",
    "Digital product & service design",
    "Design thinking",
    "Digital marketing, communications & media",
    "Experience assessments",
    "Content creation & management",
    "CX optimization",
  ],
  "05": [
    "Digital strategy & transformation",
    "Product vision & strategy",
    "User-centric design",
    "Product development & go-to-market",
    "Product organization transformation",
    "Agile transformation",
  ],
  "06": [
    "Customer experience & engagement",
    "Organizational design & alignment",
    "Process & business optimization",
    "Change enablement & insights",
    "Program & project management",
    "Microsoft Dynamics 365",
  ],
};

/** Pillar 07 is delivered through our two products rather than a service page. */
const productSources: Record<string, { label: string; href: string; kind: string; summary: string }[]> = {
  "07": [
    {
      label: "MapleRecord",
      href: mapleRecordPath,
      kind: "Public sector & enterprise records management",
      summary: "Records management software for government, municipalities and regulated organizations, with workflow automation and lifecycle governance.",
    },
    {
      label: "MOLI",
      href: moliPath,
      kind: "AI-driven record management system",
      summary: "Advanced search and retrieval, cloud integration across AWS and Azure, and design that supports GDPR, PDPA, PIPEDA and CCPA compliance.",
    },
  ],
};

export type MatrixCapability = { label: string; href?: string };
export type MatrixProduct = { label: string; href: string; kind: string; summary: string };

export type MatrixPillar = Pick<PillarNavItem, "number" | "label" | "href"> & {
  /** Anchor id on /services, e.g. "pillar-01". */
  id: string;
  capabilities: MatrixCapability[];
  /** Set for pillar 07: the products that deliver it (the pillar has no page of its own). */
  products?: MatrixProduct[];
};

/** Resolves an Adobe item to its product page, or leaves it unlinked if that page doesn't exist (yet). */
function resolve(source: CapabilitySource): MatrixCapability {
  if (typeof source === "string") return { label: source };
  const product = getAdobeProduct(source.adobe);
  return product ? { label: source.label, href: adobeProductPath(product.slug) } : { label: source.label };
}

/** The matrix in deck order, built on `pillarsNav` so names and URLs stay in step with the navigation. */
export function getCapabilityMatrix(): MatrixPillar[] {
  return pillarsNav.map(({ number, label, href }) => {
    const products = productSources[number];
    return {
      number,
      label,
      href,
      id: `pillar-${number}`,
      capabilities: (capabilitySources[number] ?? []).map(resolve),
      ...(products ? { products, capabilities: products.map((p) => ({ label: p.label, href: p.href })) } : {}),
    };
  });
}
