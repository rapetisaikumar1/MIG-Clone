import { aiGovernance } from "@/content/services/ai-governance";
import { adobeServices } from "@/content/services/adobe-services";
import { dataManagement } from "@/content/services/data-management";
import type { ServiceContent, ServiceSlug } from "./types";

const services: Record<ServiceSlug, ServiceContent> = {
  "ai-governance": aiGovernance,
  "adobe-services": adobeServices,
  "data-management": dataManagement,
};

export function getService(slug: ServiceSlug): ServiceContent {
  return services[slug];
}

export function getAllServices(): ServiceContent[] {
  return Object.values(services);
}
