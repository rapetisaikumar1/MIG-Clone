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
