import type { ContactInterest } from "./schema";

/** Service-specific CTAs open the form with the matching area of interest selected. */
export function contactHref(interest?: ContactInterest) {
  return interest && interest !== "general" ? `/contact?interest=${interest}#inquiry` : "/contact#inquiry";
}
