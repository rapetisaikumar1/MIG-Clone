import { Phone } from "lucide-react";
import { company, formatAddress } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * One entry per distinct telephone number, labelled with the offices that answer it
 * (Delaware and Texas share a line). Used wherever people need a number rather than an address.
 */
export function officePhones() {
  const lines = new Map<string, { regions: string[]; display: string; e164: string }>();
  for (const office of company.offices) {
    const line = lines.get(office.phone.e164);
    if (line) line.regions.push(office.region);
    else lines.set(office.phone.e164, { regions: [office.region], ...office.phone });
  }
  return [...lines.values()].map((line) => ({ ...line, label: line.regions.join(" and ") }));
}

/** Compact list of tel: links (label above number), for side panels and notices. */
export function PhoneLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-2", className)}>
      {officePhones().map((line) => (
        <li key={line.e164}>
          <a
            href={`tel:${line.e164}`}
            className="group flex min-h-11 items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-2.5 transition-colors hover:border-ink"
          >
            <Phone aria-hidden className="size-4 shrink-0 text-signal" />
            <span className="leading-tight">
              <span className="block text-sm text-muted">{line.label}</span>
              <span className="block font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-4 group-hover:decoration-signal">
                {line.display}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function OfficeList({ tone = "light", className }: { tone?: "light" | "night"; className?: string }) {
  const night = tone === "night";
  return (
    <ul className={cn("grid gap-x-8 gap-y-10 sm:grid-cols-3", className)}>
      {company.offices.map((office) => (
        // Flex column so each phone link sits on the same line, however many address lines precede it.
        <li key={office.id} className={cn("reveal flex flex-col border-t pt-5", night ? "border-night-line" : "border-ink")}>
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
              "mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-3 font-medium underline decoration-1 underline-offset-4",
              night ? "text-night-text decoration-night-line hover:decoration-night-text" : "text-ink decoration-line-strong hover:decoration-signal",
            )}
          >
            <Phone aria-hidden className={cn("size-4", night ? "text-night-muted" : "text-signal")} />
            {office.phone.display}
          </a>
        </li>
      ))}
    </ul>
  );
}
