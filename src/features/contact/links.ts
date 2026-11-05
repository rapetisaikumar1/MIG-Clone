import type { ContactInterest } from "./schema";

/** Named entry points that prefill the message box (the visitor can edit or replace it). */
export const contactTopics = {
  assessment: {
    interest: "adobe-services",
    message: "We'd like to request an Adobe platform assessment.\n\nApplications and goals: ",
  },
} as const satisfies Record<string, { interest: ContactInterest; message: string }>;

export type ContactTopic = keyof typeof contactTopics;

export function isContactTopic(value: unknown): value is ContactTopic {
  return typeof value === "string" && Object.hasOwn(contactTopics, value);
}

/**
 * Service-specific CTAs open the form with the matching area of interest selected.
 * `product` (an Adobe product slug) pre-ticks that application in the form's optional Adobe field.
 */
export function contactHref(interest?: ContactInterest, options: { product?: string; topic?: ContactTopic } = {}) {
  const params = new URLSearchParams();
  if (interest && interest !== "general") params.set("interest", interest);
  if (options.product) params.set("product", options.product);
  if (options.topic) params.set("topic", options.topic);
  const query = params.toString();
  return `/contact${query ? `?${query}` : ""}#inquiry`;
}
