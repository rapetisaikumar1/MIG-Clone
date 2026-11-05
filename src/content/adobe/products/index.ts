import type { AdobeProduct } from "@/lib/content/types";
import { experiencePlatform } from "./experience-platform";
import { realTimeCdp } from "./real-time-cdp";
import { experienceManager } from "./experience-manager";
import { analytics } from "./analytics";
import { target } from "./target";
import { marketoEngage } from "./marketo-engage";
import { commerce } from "./commerce";

/** Display order used by menus, the hub page, the footer and the sitemap. */
export const adobeProducts: AdobeProduct[] = [
  experiencePlatform,
  realTimeCdp,
  experienceManager,
  analytics,
  target,
  marketoEngage,
  commerce,
];
