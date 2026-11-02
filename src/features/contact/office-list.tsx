import { Phone } from "lucide-react";
import { company, formatAddress } from "@/config/site";
import { cn } from "@/lib/utils";

export function OfficeList({ tone = "light", className }: { tone?: "light" | "night"; className?: string }) {
  const night = tone === "night";
  return (
    <ul className={cn("grid gap-8 sm:grid-cols-3", className)}>
      {company.offices.map((office) => (
        <li key={office.id} className={cn("border-t pt-5", night ? "border-night-line" : "border-ink")}>
          <h3 className="text-lg font-semibold tracking-tight">{office.label}</h3>
          <address className={cn("mt-3 not-italic leading-relaxed", night ? "text-night-muted" : "text-muted")}>
            {formatAddress(office).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={`tel:${office.phone.e164}`}
            className={cn(
              "mt-3 inline-flex min-h-11 items-center gap-2 font-medium underline decoration-1 underline-offset-4",
              night ? "text-night-text decoration-night-line hover:decoration-night-text" : "text-ink decoration-line-strong hover:decoration-signal",
            )}
          >
            <Phone aria-hidden className="size-4" />
            {office.phone.display}
          </a>
        </li>
      ))}
    </ul>
  );
}
