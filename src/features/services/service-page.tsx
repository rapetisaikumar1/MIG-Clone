import type { ReactNode } from "react";
import type { ServiceContent } from "@/lib/content/types";
import { CtaBand } from "@/features/contact/cta-band";
import {
  ApproachSection,
  BenefitsSection,
  CapabilitiesSection,
  DeliverablesSection,
  FaqSection,
  PlatformMatrix,
  ProblemSection,
  RelatedServices,
  ServiceHero,
  UseCasesSection,
} from "./sections";

/**
 * Shared composition for the three specialization pages. `afterCapabilities` lets a page add
 * its own section (e.g. the MapleRecord callout) without forking the template.
 */
export function ServicePage({
  content,
  graphic,
  afterCapabilities,
}: {
  content: ServiceContent;
  graphic: ReactNode;
  afterCapabilities?: ReactNode;
}) {
  return (
    <>
      <ServiceHero content={content} graphic={graphic} />
      <ProblemSection content={content} />
      <CapabilitiesSection content={content} />
      {content.platforms ? <PlatformMatrix platforms={content.platforms} /> : null}
      {afterCapabilities}
      <ApproachSection content={content} />
      <DeliverablesSection content={content} />
      <UseCasesSection content={content} />
      <BenefitsSection content={content} />
      <FaqSection faqs={content.faqs} />
      <RelatedServices current={content.slug} />
      <CtaBand title={content.cta.title} body={content.cta.body} interest={content.interest} />
    </>
  );
}
