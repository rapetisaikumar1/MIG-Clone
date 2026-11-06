import Image from "next/image";
import { company } from "@/config/site";

/**
 * Adobe Solution Partner lockup (Bronze), shown only while status is verified. The official artwork's
 * "BRONZE" line is about an eighth of its height, so on phones the badge takes whatever width the row
 * leaves beside the logo and menu button, up to 44px tall (the tablet size, so it never outweighs the
 * MiG logo), rather than a fixed small size; that keeps the tier legible at 375–390px without
 * overflowing at 360px.
 */
export function AdobePartnerBadge() {
  const { verified, badge } = company.adobePartner;
  if (!verified) return null;
  return (
    <div className="flex min-w-0 items-center gap-2.5 sm:gap-5 xl:gap-3.5">
      <span aria-hidden className="h-9 w-px shrink-0 bg-line-strong" />
      <Image
        src={badge.src}
        alt={badge.alt}
        width={badge.width}
        height={badge.height}
        preload
        className="h-[clamp(1.75rem,calc((100vw-13.75rem)/3.39),2.75rem)] w-auto sm:h-11 xl:h-10"
      />
    </div>
  );
}
