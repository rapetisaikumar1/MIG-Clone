import { SoftwareGraphic } from "@/components/graphics/service-graphics";
import { ServicePage } from "@/features/services/service-page";
import { MapleRecordCallout } from "@/features/services/maplerecord-callout";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("software-development");

export const metadata = pageMetadata({ ...content.meta, path: "/software-development" });

export default function SoftwareDevelopmentPage() {
  // As on /data-management and /ai-governance, the benefits strip would restate the hero lead and capabilities.
  // The MapleRecord callout is the proof point: software we designed and built ourselves. The callout already says
  // "designed and built by Maverick InnoGarage", so the closing sentence ties it to this page instead of repeating
  // that (wording from the guide's §5.4 positioning line: "from the team that builds and runs MapleRecord").
  return (
    <ServicePage
      content={content}
      graphic={<SoftwareGraphic />}
      capabilityLinks={{ MapleRecord: "/maplerecord" }}
      showBenefits={false}
      afterCapabilities={<MapleRecordCallout context="MapleRecord is software we designed and built ourselves." />}
    />
  );
}
