import Image from "next/image";
import { company } from "@/config/site";

/** Adobe Solution Partner lockup (tier line removed by request), shown only while status is verified. */
export function AdobePartnerBadge() {
  const { verified, badge } = company.adobePartner;
  if (!verified) return null;
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <span aria-hidden className="h-9 w-px bg-line-strong" />
      <Image
        src={badge.src}
        alt="Adobe Solution Partner"
        width={badge.width}
        height={badge.height}
        preload
        className="h-[30px] w-auto sm:h-10"
      />
    </div>
  );
}
