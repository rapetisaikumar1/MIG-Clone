import { AdobeGraphic } from "@/components/graphics/service-graphics";
import { AdobeApplicationsSection, AdobeGovernanceSection, AdobeWaysToWorkSection } from "@/features/adobe/hub-sections";
import { ServicePage } from "@/features/services/service-page";
import { adobeAssessmentPath } from "@/lib/content/adobe";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("adobe-services");

export const metadata = pageMetadata({ ...content.meta, path: "/adobe-services" });

/**
 * Reading order for a buyer: what we deliver (problem, capabilities) → for which applications →
 * governance and ways to work with us → delivery approach and illustrative proof → FAQ.
 * The applications section replaces the shared platform matrix (the content has no `platforms`),
 * so each product appears once on the page, and its cards carry a one-line summary rather than repeating
 * the service lists that "Services and capabilities" and the product pages already give.
 */
export default function AdobeServicesPage() {
  return (
    <ServicePage
      content={content}
      graphic={<AdobeGraphic />}
      heroSecondaryCta={{ label: "Request an assessment", href: adobeAssessmentPath }}
      // "Intended benefits" restated the hero lead and the problem section's signals line for line.
      showBenefits={false}
      afterCapabilities={<AdobeApplicationsSection />}
      afterPlatforms={
        <>
          <AdobeGovernanceSection />
          <AdobeWaysToWorkSection />
        </>
      }
    />
  );
}
