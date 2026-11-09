import type { ReactNode } from "react";
import type { AdobePlatform, ServiceContent } from "@/lib/content/types";
import { breadcrumbJsonLd, faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { insights } from "@/content/insights";
import { CtaBand } from "@/features/contact/cta-band";
import {
  ApproachSection,
  BenefitsSection,
  CapabilitiesSection,
  DeliverablesSection,
  FaqSection,
  type HeroCta,
  PlatformMatrix,
  ProblemSection,
  RelatedServices,
  ServiceHero,
  UseCasesSection,
} from "./sections";

/**
 * Shared composition for the service pages (the Capability Matrix practice pillars and AI Governance). Optional slots let a page add its own
 * sections (e.g. the MapleRecord callout, the Adobe hub sections) without forking the template:
 *
 * hero → afterHero → problem → capabilities → afterCapabilities → platforms → afterPlatforms →
 * approach → deliverables → use cases → (benefits) → beforeFaq → FAQ → related (+ further reading) → CTA
 */
export function ServicePage({
  content,
  graphic,
  heroSecondaryCta,
  platformHref,
  capabilityLinks,
  showBenefits = true,
  afterHero,
  afterCapabilities,
  afterPlatforms,
  beforeFaq,
}: {
  content: ServiceContent;
  graphic: ReactNode;
  /** Replaces the hero's default "What's included" link. */
  heroSecondaryCta?: HeroCta;
  /** Links each platform-matrix row to its own page. */
  platformHref?: (platform: AdobePlatform) => string | undefined;
  /** Terms in capability bullets to link, e.g. { MapleRecord: "/maplerecord" }. */
  capabilityLinks?: Record<string, string>;
  /** The benefits strip; pages whose hero, problem section and FAQ already carry those points can drop it. */
  showBenefits?: boolean;
  afterHero?: ReactNode;
  afterCapabilities?: ReactNode;
  afterPlatforms?: ReactNode;
  beforeFaq?: ReactNode;
}) {
  const path = `/${content.slug}`;
  const crumbs = [{ label: "Home", href: "/" }, { label: content.name }];
  // Published articles on this page's theme (`insightTheme`, else the page name); none → no reading list.
  const theme = content.insightTheme ?? content.name;
  const reading = insights
    .filter((i) => i.status === "published" && i.theme === theme)
    .map((i) => ({ title: i.title, href: `/insights/${i.slug}` }));
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs, path),
          serviceJsonLd({ name: content.name, description: content.meta.description, path, serviceType: content.name }),
          faqJsonLd(content.faqs),
        ]}
      />
      <ServiceHero content={content} graphic={graphic} secondaryCta={heroSecondaryCta} />
      {afterHero}
      <ProblemSection content={content} />
      <CapabilitiesSection content={content} termLinks={capabilityLinks} />
      {afterCapabilities}
      {content.platforms ? <PlatformMatrix platforms={content.platforms} platformHref={platformHref} /> : null}
      {afterPlatforms}
      <ApproachSection content={content} />
      <DeliverablesSection content={content} />
      <UseCasesSection content={content} />
      {showBenefits ? <BenefitsSection content={content} /> : null}
      {beforeFaq}
      <FaqSection faqs={content.faqs} />
      <RelatedServices current={content.slug} reading={reading} />
      <CtaBand title={content.cta.title} body={content.cta.body} interest={content.interest} />
    </>
  );
}
