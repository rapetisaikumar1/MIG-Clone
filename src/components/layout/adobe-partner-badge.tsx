import Image from "next/image";
import { company } from "@/config/site";

/** Adobe Solution Partner lockup (Bronze), shown only while status is verified. */
export function AdobePartnerBadge() {
  const { verified, badge } = company.adobePartner;
  if (!verified) return null;
  return (
    <div className="flex items-center gap-2 min-[360px]:gap-3 sm:gap-5 xl:gap-3.5">
      <span aria-hidden className="h-9 w-px bg-line-strong" />
      <Image
        src={badge.src}
        alt={badge.alt}
        width={badge.width}
        height={badge.height}
        preload
        className="h-[28px] w-auto min-[360px]:h-8 sm:h-11 xl:h-10"
      />
    </div>
  );
}
