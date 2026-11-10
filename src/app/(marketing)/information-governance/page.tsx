import { InformationGovernanceGraphic } from "@/components/graphics/pillars/information-governance";
import { ServicePage } from "@/features/services/service-page";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";
import { ProductsBand } from "./products-band";

const content = getService("information-governance");

export const metadata = pageMetadata({ ...content.meta, path: "/information-governance" });

/**
 * Capability Matrix pillar 07 (the deck's "Flagship Records Management & Compliance"), presented as Information
 * Governance & Records and delivered with our products, MapleRecord and MOLI. The products band after the
 * capabilities introduces both and links the adjacent core areas (Data Governance, AI Governance).
 */
export default function InformationGovernancePage() {
  // The benefits strip restated the hero lead and capabilities, so this page leaves it out (as on /data-management).
  return (
    <ServicePage
      content={content}
      graphic={<InformationGovernanceGraphic />}
      showBenefits={false}
      capabilityLinks={{ MapleRecord: "/maplerecord", MOLI: "/moli", "Data Governance": "/data-management" }}
      afterCapabilities={<ProductsBand />}
    />
  );
}
