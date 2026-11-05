import { adobeProducts } from "@/content/adobe/products";
import type { AdobeProduct } from "./types";

export const adobeServicesPath = "/adobe-services";
export const adobeAssessmentPath = "/adobe-services/assessment";

export function getAdobeProducts(): AdobeProduct[] {
  return adobeProducts;
}

export function getAdobeProduct(slug: string): AdobeProduct | undefined {
  return adobeProducts.find((p) => p.slug === slug);
}

export function adobeProductPath(slug: AdobeProduct["slug"]) {
  return `${adobeServicesPath}/${slug}`;
}

export function isAdobeProductSlug(value: unknown): value is AdobeProduct["slug"] {
  return typeof value === "string" && adobeProducts.some((p) => p.slug === value);
}
