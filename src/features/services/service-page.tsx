import type { ReactNode } from "react";
import type { AdobePlatform, ServiceContent } from "@/lib/content/types";
import { breadcrumbJsonLd, faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
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
 * Shared composition for the three specialization pages. Optional slots let a page add its own
 * sections (e.g. the MapleRecord callout, the Adobe hub sections) without forking the template:
 *
 * hero → afterHero → problem → capabilities → afterCapabilities → platforms → afterPlatforms →
 * approach → deliverables → use cases → benefits → beforeFaq → FAQ → related → CTA
 */
export function ServicePage({
  content,
  graphic,
  heroSecondaryCta,
  platformHref,
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
  afterHero?: ReactNode;
  afterCapabilities?: ReactNode;
  afterPlatforms?: ReactNode;
  beforeFaq?: ReactNode;
}) {
  const path = `/${content.slug}`;
  const crumbs = [{ label: "Home", href: "/" }, { label: content.name }];
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
      <CapabilitiesSection content={content} />
      {afterCapabilities}
      {content.platforms ? <PlatformMatrix platforms={content.platforms} platformHref={platformHref} /> : null}
      {afterPlatforms}
      <ApproachSection content={content} />
      <DeliverablesSection content={content} />
      <UseCasesSection content={content} />
      <BenefitsSection content={content} />
      {beforeFaq}
      <FaqSection faqs={content.faqs} />
      <RelatedServices current={content.slug} />
      <CtaBand title={content.cta.title} body={content.cta.body} interest={content.interest} />
    </>
  );
}
