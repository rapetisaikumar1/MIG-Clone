import { aiGovernance } from "@/content/services/ai-governance";
import { adobeServices } from "@/content/services/adobe-services";
import { businessTransformation } from "@/content/services/business-transformation";
import { dataManagement } from "@/content/services/data-management";
import { digitalProduct } from "@/content/services/digital-product";
import { experienceDesign } from "@/content/services/experience-design";
import { softwareDevelopment } from "@/content/services/software-development";
import type { ServiceContent, ServiceSlug } from "./types";

/** In Capability Matrix pillar order (01–06), then AI Governance. */
const services: Record<ServiceSlug, ServiceContent> = {
  "data-management": dataManagement,
  "software-development": softwareDevelopment,
  "adobe-services": adobeServices,
  "experience-design": experienceDesign,
  "digital-product": digitalProduct,
  "business-transformation": businessTransformation,
  "ai-governance": aiGovernance,
};

export function getService(slug: ServiceSlug): ServiceContent {
  return services[slug];
}

export function getAllServices(): ServiceContent[] {
  return Object.values(services);
}
