import { AdobeGraphic } from "@/components/graphics/service-graphics";
import { AdobeApplicationsSection, AdobeEngagementSection, AdobeGovernanceSection } from "@/features/adobe/hub-sections";
import { ServicePage } from "@/features/services/service-page";
import { adobeAssessmentPath } from "@/lib/content/adobe";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("adobe-services");

export const metadata = pageMetadata({ ...content.meta, path: "/adobe-services" });

/**
 * Reading order for a buyer: what we do (problem, capabilities) → for which applications →
 * governance and ways to engage → delivery approach and illustrative proof → FAQ.
 * The applications section replaces the shared platform matrix (the content has no `platforms`),
 * so each product appears once on the page.
 */
export default function AdobeServicesPage() {
  return (
    <ServicePage
      content={content}
      graphic={<AdobeGraphic />}
      heroSecondaryCta={{ label: "Request an assessment", href: adobeAssessmentPath }}
      afterCapabilities={<AdobeApplicationsSection />}
      afterPlatforms={
        <>
          <AdobeGovernanceSection />
          <AdobeEngagementSection />
        </>
      }
    />
  );
}
