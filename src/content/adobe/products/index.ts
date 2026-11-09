import type { AdobeProduct } from "@/lib/content/types";
import { experiencePlatform } from "./experience-platform";
import { realTimeCdp } from "./real-time-cdp";
import { experienceManager } from "./experience-manager";
import { analytics } from "./analytics";
import { target } from "./target";
import { marketoEngage } from "./marketo-engage";
import { commerce } from "./commerce";
import { contentManagement } from "./content-management";

/**
 * Display order used by menus, the hub page, the footer and the sitemap: the Capability Matrix order
 * (Oct 2026), minus "Adobe Experience Cloud", which is the umbrella and is presented by the hub itself.
 */
export const adobeProducts: AdobeProduct[] = [
  experiencePlatform,
  realTimeCdp,
  experienceManager,
  analytics,
  marketoEngage,
  target,
  commerce,
  contentManagement,
];
