import { JsonLd, breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { adobeAssessment as content } from "@/content/adobe/assessment";
import {
  AssessmentDeliverables,
  AssessmentHero,
  RequirementsSection,
  ReviewSection,
  SituationsSection,
  StepsSection,
} from "@/features/adobe/assessment-sections";
import { CtaBand } from "@/features/contact/cta-band";
import { FaqSection } from "@/features/services/sections";
import { adobeAssessmentPath, adobeServicesPath, getAdobeProducts } from "@/lib/content/adobe";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ ...content.meta, path: adobeAssessmentPath });

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Adobe Services", href: adobeServicesPath },
  { label: "Platform assessment" },
];

export default function AdobeAssessmentPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(breadcrumbs, adobeAssessmentPath),
          serviceJsonLd({
            name: content.name,
            description: content.meta.description,
            path: adobeAssessmentPath,
            serviceType: "Adobe platform assessment",
          }),
          faqJsonLd(content.faqs),
        ]}
      />
      <AssessmentHero content={content} breadcrumbs={breadcrumbs} />
      <SituationsSection content={content} />
      <ReviewSection content={content} products={getAdobeProducts()} />
      <StepsSection content={content} />
      <AssessmentDeliverables content={content} />
      <RequirementsSection content={content} />
      <FaqSection faqs={content.faqs} title="Questions about the assessment" />
      <CtaBand title={content.cta.title} body={content.cta.body} interest="adobe-services" topic="assessment" ctaLabel="Request an assessment" />
    </>
  );
}
