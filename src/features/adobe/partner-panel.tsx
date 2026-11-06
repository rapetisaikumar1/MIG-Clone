import Image from "next/image";
import { company } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Adobe Solution Partner statement. Renders nothing unless company.adobePartner.verified is true.
 * The badge carries the Bronze tier from MiG's co-brand file; the copy names no certification counts or
 * specializations (none are confirmed — docs/HANDOFF.md). The second line states what we deliver on Adobe
 * (messaging guide §7); it never claims "official", "certified" or "not affiliated with Adobe".
 *
 * Borderless inline treatment (a hairline above, no card) so it reads as a statement rather than a feature
 * block; the trademark notice is legal small print and sits underneath as a caption.
 * `tone="night"` is for dark sections: the badge (dark artwork) sits on a light plate.
 */
export function AdobePartnerPanel({ className, tone = "light" }: { className?: string; tone?: "light" | "night" }) {
  const { verified, badge } = company.adobePartner;
  if (!verified) return null;
  const night = tone === "night";
  return (
    <div className={cn("border-t pt-8", night ? "border-night-line" : "border-line-strong", className)}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
        <div className={cn("shrink-0 self-start sm:self-center", night && "rounded-xl bg-surface px-4 py-3")}>
          <Image src={badge.src} alt={badge.alt} width={badge.width} height={badge.height} className="h-12 w-auto sm:h-14" />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-semibold tracking-tight">{company.name} is an Adobe Solution Partner.</p>
          <p className={cn("mt-1 text-[0.9375rem]", night ? "text-night-muted" : "text-muted")}>
            We implement, integrate and support Adobe Experience Cloud applications.
          </p>
        </div>
      </div>
      <p className={cn("mt-6 max-w-[90ch] text-xs leading-relaxed", night ? "text-night-muted" : "text-muted")}>
        Adobe, the Adobe logo and Adobe product names are either registered trademarks or trademarks of Adobe in the United States
        and/or other countries.
      </p>
    </div>
  );
}
