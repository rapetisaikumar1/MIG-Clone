import { DataGraphic } from "@/components/graphics/service-graphics";
import { ServicePage } from "@/features/services/service-page";
import { MapleRecordCallout } from "@/features/services/maplerecord-callout";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("data-management");

export const metadata = pageMetadata({ ...content.meta, path: "/data-management" });

/** Capability Matrix pillar 01, Data & Analytics. The slug predates the pillar name and is kept for SEO. */
export default function DataManagementPage() {
  // The benefits strip restated the hero lead and capabilities, so this page leaves it out.
  return (
    <ServicePage
      content={content}
      graphic={<DataGraphic />}
      capabilityLinks={{
        MapleRecord: "/maplerecord",
        MOLI: "/moli",
        "AI governance": "/ai-governance",
        // Cloud platforms and AI/ML enablement belong to pillar 02; the bullets that mention them link there.
        "Engineering & Technology": "/software-development",
      }}
      showBenefits={false}
      afterCapabilities={<MapleRecordCallout />}
    />
  );
}
