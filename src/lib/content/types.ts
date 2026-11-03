import type { ContactInterest } from "@/features/contact/schema";

/**
 * "verified"  — capability stated on the existing maverickinnogarage.com site.
 * "proposed"  — new positioning written for the redesign; needs business confirmation (docs/HANDOFF.md).
 * Not rendered to visitors; it exists so reviewers can see what still needs sign-off.
 */
export type Provenance = "verified" | "proposed";

export type ServiceSlug = "ai-governance" | "adobe-services" | "data-management";

export type Capability = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  provenance: Provenance;
  platforms?: string[];
};

export type ApproachStage = {
  stage: "Assess" | "Design" | "Implement" | "Improve";
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
export type MrModuleSlug = "mr-records" | "mr-requests" | "mr-workflows" | "mr-forms";
type TitledText = { title: string; body: string };

export type MrModule = {
  slug: MrModuleSlug;
  name: string;
  officialUrl: string;
  summary: string;
  highlights: string[];
  tabImage: MrImage;
  hero: { title: string; description: string; trust: string[]; image: MrImage };
  why: { heading: string; problems: TitledText[] };
  how: { heading: string; steps: TitledText[]; image: MrImage };
  /** Figures as published by MapleRecord; `value` is absent for qualitative items. */
  impact: { value?: string; label: string; body: string }[];
  capabilities: { title: string; items: string[] }[];
  audience: { intro: string; teams: TitledText[] };
  cta: { title: string; body: string };
};

export type MrSolution = {
  slug: string;
  label: string;
  kind: "industry" | "department";
  officialUrl: string;
  title: string;
  description: string;
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

export type MrArticleBlock = { type: "heading" | "paragraph"; text: string } | { type: "list"; items: string[] };

export type MrArticle = {
  slug: string;
  title: string;
  category: string;
  published: string;
  officialUrl: string;
  image: MrImage;
  blocks: MrArticleBlock[];
};
