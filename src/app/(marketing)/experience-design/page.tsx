import { ExperienceDesignGraphic } from "@/components/graphics/pillars/experience-design";
import { ServicePage } from "@/features/services/service-page";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/metadata";
import { ConnectedPractices } from "./connected-practices";

const content = getService("experience-design");

export const metadata = pageMetadata({ ...content.meta, path: "/experience-design" });

/**
 * The connected-practices band after the capabilities links the two practices this work most often runs with:
 * Digital & Product (the deck pairs the two on one slide) and Adobe Experience Cloud, where designed journeys and
 * content are implemented.
 */
export default function ExperienceDesignPage() {
  return (
    <ServicePage
      content={content}
      graphic={<ExperienceDesignGraphic />}
      // As on the other pillar pages, the benefits strip would restate the problem section and the capabilities.
      showBenefits={false}
      afterCapabilities={<ConnectedPractices />}
    />
  );
}
