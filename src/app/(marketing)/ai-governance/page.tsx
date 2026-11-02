import { AiGovernanceGraphic } from "@/components/graphics/service-graphics";
import { ServicePage } from "@/features/services/service-page";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("ai-governance");

export const metadata = pageMetadata({ ...content.meta, path: "/ai-governance" });

export default function AiGovernancePage() {
  return <ServicePage content={content} graphic={<AiGovernanceGraphic />} />;
}
