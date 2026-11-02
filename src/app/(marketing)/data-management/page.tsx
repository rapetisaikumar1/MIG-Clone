import { DataGraphic } from "@/components/graphics/service-graphics";
import { ServicePage } from "@/features/services/service-page";
import { MapleRecordCallout } from "@/features/services/maplerecord-callout";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";

const content = getService("data-management");

export const metadata = pageMetadata({ ...content.meta, path: "/data-management" });

export default function DataManagementPage() {
  return <ServicePage content={content} graphic={<DataGraphic />} afterCapabilities={<MapleRecordCallout />} />;
}
