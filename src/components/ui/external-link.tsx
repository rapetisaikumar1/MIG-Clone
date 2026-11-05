import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";
import type { VariantProps } from "class-variance-authority";

/** "opens maplerecord.com in a new tab" — names the destination host when the href is absolute. */
function defaultNewTabLabel(href: string | undefined) {
  try {
    const host = new URL(href ?? "").hostname.replace(/^www\./, "");
    return host ? `opens ${host} in a new tab` : "opens in a new tab";
  } catch {
    return "opens in a new tab";
  }
}

/** Link to another site: opens in a new tab and says so to assistive technology. */
export function ExternalLink({
  href,
  children,
  className,
  variant,
  size,
  newTabLabel,
  ...props
}: ComponentProps<"a"> & VariantProps<typeof buttonVariants> & { newTabLabel?: string }) {
  const label = newTabLabel ?? defaultNewTabLabel(href);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        variant
          ? buttonVariants({ variant, size })
          : "inline-flex min-h-11 items-center gap-1.5 font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-signal",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight aria-hidden className="size-4 shrink-0" />
      <span className="sr-only"> ({label})</span>
    </a>
  );
}
