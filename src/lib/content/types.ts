import type { ContactInterest } from "@/features/contact/schema";

/**
 * "verified"  — capability stated on the existing maverickinnogarage.com site.
 * "proposed"  — new positioning written for the redesign; needs business confirmation (docs/HANDOFF.md).
 * Not rendered to visitors; it exists so reviewers can see what still needs sign-off.
 */
export type Provenance = "verified" | "proposed";

/**
 * Service pages, one per practice pillar of the 2026 Capability Matrix (plus AI Governance).
 * URL slugs predate the pillar names and are kept for SEO: /data-management is "Data & Analytics",
 * /software-development is "Engineering & Technology".
 */
export type ServiceSlug =
  | "data-management"
  | "software-development"
  | "adobe-services"
  | "experience-design"
  | "digital-product"
  | "business-transformation"
  | "information-governance"
  | "ai-governance";

export type Capability = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  provenance: Provenance;
  platforms?: string[];
};

/** The three delivery stages from the Capability Matrix ("From vision to victory"). */
export type ApproachStageName = "Understand & strategize" | "Implement & integrate" | "Optimize & grow";

export type ApproachStage = {
  stage: ApproachStageName;
  activities: string;
  deliverable: string;
};

export type UseCase = { title: string; context: string; approach: string; outcome: string };

export type AdobePlatform = {
  id: string;
  name: string;
  area: string;
  /** Neutral product description, checked against Adobe Experience League documentation (Nov 2026). */
  description: string;
  /** Service types listed for this product on the existing site. */
  services: string[];
};

export type ServiceContent = {
  slug: ServiceSlug;
  interest: ContactInterest;
  name: string;
  /** The insights theme for this page's "Further reading" list, when it differs from `name` (e.g. "MarTech"). */
  insightTheme?: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string };
  problem: { title: string; body: string[]; signals: string[] };
  audience: { role: string; need: string }[];
  capabilitiesIntro: string;
  capabilities: Capability[];
  platforms?: AdobePlatform[];
  approach: ApproachStage[];
  deliverables: { title: string; description: string }[];
  useCases: UseCase[];
  benefits: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; body: string };
};

/* ---------- MapleRecord (source of truth: maplerecord.com) ---------- */

export type MrImage = { src: string; width: number; height: number; alt: string };
export type MrModuleSlug = "mr-records" | "mr-requests" | "mr-workflows" | "mr-forms" | "mr-admin";
type TitledText = { title: string; body: string };
/** A recreated MapleRecord product screen (see src/content/maplerecord/screens.ts) with its app-window label. */
export type MrScreenImage = MrImage & { label: string };
/** One stop in a module's product tour: the screen, and a factual caption of what it shows. */
export type MrTourStop = { screen: MrScreenImage; title: string; body: string };

export type MrModule = {
  slug: MrModuleSlug;
  name: string;
  /** The module's page on maplerecord.com; absent when the module has no public page (MR Admin). */
  officialUrl?: string;
  summary: string;
  highlights: string[];
  tabImage: MrImage;
  hero: { title: string; description: string; trust: string[]; image: MrScreenImage };
  /** Problems the module addresses (absent for MR Admin, which has no published copy). */
  why?: { heading: string; problems: TitledText[] };
  how: { heading: string; steps: TitledText[]; image: MrScreenImage };
  /** Product tour on the module page: 2–4 recreated screens with captions. */
  tour: { intro: string; stops: MrTourStop[] };
  /** Figures as published by MapleRecord; `value` is absent for qualitative items. Empty when none are published. */
  impact: { value?: string; label: string; body: string }[];
  capabilities: { title: string; items: string[] }[];
  /** Department use cases (absent for MR Admin). */
  audience?: { intro: string; teams: TitledText[] };
  cta: { title: string; body: string };
};

export type MrSolution = {
  slug: string;
  label: string;
  kind: "industry" | "department";
  officialUrl: string;
  title: string;
  description: string;
  /** Shorter meta description (≤ 160 characters) when `description` runs long; the hero keeps `description`. */
  metaDescription?: string;
  tagline: string;
  image: MrImage;
  challenges: { heading: string; intro: string; items: TitledText[] };
  modules?: { heading: string; items: { title: string; body: string; bullets: string[]; module: MrModuleSlug }[] };
  workflow?: { heading: string; steps: TitledText[] };
  impact: { heading: string; items: { value: string; label: string; body: string }[] };
  useCases: { heading: string; items: TitledText[] };
  security: { heading: string; intro: string; items: string[] };
  cta: { title: string; body: string };
};

export type MrArticleBlock =
  | { type: "paragraph"; text: string }
  /** `level` defaults to 2; 3 marks a subsection of the preceding level-2 heading. */
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[] };

export type MrArticle = {
  slug: string;
  title: string;
  category: string;
  /** Shorter `<title>` when `title` would run past ~60 characters with the site suffix; the page h1 keeps `title`. */
  metaTitle?: string;
  published: string;
  officialUrl: string;
  image: MrImage;
  blocks: MrArticleBlock[];
};

/* ---------- Adobe application pages (/adobe-services/[product]) ---------- */

export type AdobeProductSlug =
  | "experience-platform"
  | "real-time-cdp"
  | "experience-manager"
  | "analytics"
  | "target"
  | "marketo-engage"
  | "commerce"
  | "content-management";

export type AdobeProduct = {
  slug: AdobeProductSlug;
  /** Adobe's current product name, e.g. "Adobe Experience Manager". */
  name: string;
  /** Short label for menus and cards, e.g. "Experience Manager". */
  shortName: string;
  /** Capability area, e.g. "Content". Matches the hub page's platform matrix. */
  area: string;
  /** Old WordPress URLs for this product; they redirect to this page. */
  legacyPaths: string[];
  /** One sentence (≤ 120 chars) for menus, cards and the footer. */
  summary: string;
  /** Neutral description of what the Adobe product is (checked against Adobe docs). */
  description: string;
  meta: { title: string; description: string };
  hero: { title: string; lead: string };
  /** What the application does: neutral facts about Adobe's product, never claims about MiG. */
  overview: { heading: string; intro: string; features: { title: string; body: string }[] };
  /** Situations that typically prompt a project (4–6). */
  signals: string[];
  /**
   * How we help. Titles MUST be the verified service types for this product from the old site
   * (see `services` in the seed); bodies/items explain what that service involves.
   */
  services: { title: string; body: string; items: string[]; provenance: Provenance }[];
  /** Two hypothetical scenarios; rendered with the "Illustrative use case" label. */
  scenarios: UseCase[];
  /** Other Adobe applications on this site that this one commonly works with. */
  related: { slug: AdobeProductSlug; why: string }[];
  /** Slugs of PUBLISHED insights in src/content/insights/index.ts relevant to this product. */
  insights: string[];
  faqs: { question: string; answer: string }[];
  cta: { title: string; body: string };
};
