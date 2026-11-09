/**
 * "Proven enterprise client impact" from the Capability Deck (October 2026).
 *
 * NOT PUBLISHED. The deck attributes these entries to "Data Affect client testimonials". The relationship
 * between Maverick InnoGarage and Data Affect, and permission to name these clients on the website, have not
 * been confirmed. Keep `published: false` (the home page then renders nothing) until the owner confirms both
 * in writing; when they do, set it to true and record who confirmed it and when in this comment.
 */
export type ClientImpactItem = { client: string; impact: string };

export const clientImpact: {
  published: boolean;
  source: string;
  items: ClientImpactItem[];
} = {
  published: false,
  source: "Data Affect client testimonials",
  items: [
    { client: "T-Mobile", impact: "Built a robust enterprise data governance framework, accelerating data-driven maturity." },
    { client: "Wells Fargo", impact: "Delivered high-quality CCPA and GDPR compliance engagements." },
    { client: "Walmart", impact: "Partnered on enterprise data management to maximize business value and operational efficiency." },
    { client: "NBC Universal", impact: "Led end-to-end technical design, product development, and on-time, cost-effective delivery." },
  ],
};
