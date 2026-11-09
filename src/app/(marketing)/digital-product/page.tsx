import { DigitalProductGraphic } from "@/components/graphics/pillars/digital-product";
import { ServicePage } from "@/features/services/service-page";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("digital-product");

export const metadata = pageMetadata({ ...content.meta, path: "/digital-product" });

export default function DigitalProductPage() {
  // The benefits strip restated the hero and problem section, so this page leaves it out (as Data & Analytics does).
  return (
    <ServicePage
      content={content}
      graphic={<DigitalProductGraphic />}
      capabilityLinks={{ "Experience Design": "/experience-design", "Engineering & Technology": "/software-development" }}
      showBenefits={false}
    />
  );
}
