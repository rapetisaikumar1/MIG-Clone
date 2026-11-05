import Image from "next/image";
import { company } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Adobe Solution Partner statement. Renders nothing unless company.adobePartner.verified is true,
 * and never names a tier, certification count or specialization (none are confirmed — docs/HANDOFF.md).
 * `tone="night"` is for dark sections: the badge (dark artwork) sits on a light plate.
 */
export function AdobePartnerPanel({ className, tone = "light" }: { className?: string; tone?: "light" | "night" }) {
  const { verified, badge } = company.adobePartner;
  if (!verified) return null;
  const night = tone === "night";
  return (
    <div
      className={cn(
        "grid items-center gap-6 rounded-2xl border p-6 sm:grid-cols-[auto_1fr] sm:gap-8 sm:p-8",
        night ? "border-night-line" : "border-line bg-surface",
        className,
      )}
    >
      <div className={cn("justify-self-start", night && "rounded-xl bg-surface px-4 py-3")}>
        <Image src={badge.src} alt="Adobe Solution Partner" width={badge.width} height={badge.height} className="h-12 w-auto sm:h-14" />
      </div>
      <div>
        <p className="text-lg font-semibold tracking-tight">{company.name} is an Adobe Solution Partner.</p>
        <p className={cn("mt-1.5 max-w-[70ch] text-[0.9375rem]", night ? "text-night-muted" : "text-muted")}>
          We&apos;re an independent consultancy. Adobe, the Adobe logo and Adobe product names are either registered
          trademarks or trademarks of Adobe in the United States and/or other countries.
        </p>
      </div>
    </div>
  );
}
