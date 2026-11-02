import { AdobeGraphic } from "@/components/graphics/service-graphics";
import { ServicePage } from "@/features/services/service-page";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("adobe-services");

export const metadata = pageMetadata({ ...content.meta, path: "/adobe-services" });

export default function AdobeServicesPage() {
  return <ServicePage content={content} graphic={<AdobeGraphic />} />;
}
