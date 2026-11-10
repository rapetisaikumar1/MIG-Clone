import { EngineeringGraphic } from "@/components/graphics/pillars/engineering";
import { ServicePage } from "@/features/services/service-page";
import { MapleRecordCallout } from "@/features/services/maplerecord-callout";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("software-development");

/** Pillar 02 of the Capability Matrix, Engineering & Technology. The slug predates the pillar name and is kept for SEO. */
export const metadata = pageMetadata({ ...content.meta, path: "/software-development" });

export default function EngineeringPage() {
  // As on /data-management and /ai-governance, the benefits strip would restate the hero lead and capabilities.
  // The MapleRecord callout is the proof point: a product we engineered ourselves (it replaces a capability card that
  // repeated the same facts directly above it). The callout already says
  // "designed and built by Maverick InnoGarage", so the closing sentence ties it to this page instead of repeating that.
  return (
    <ServicePage
      content={content}
      graphic={<EngineeringGraphic />}
      capabilityLinks={{ "AI Governance": "/ai-governance" }}
      showBenefits={false}
      afterCapabilities={<MapleRecordCallout context="We build it with the same engineering practices we bring to client work." />}
    />
  );
}
