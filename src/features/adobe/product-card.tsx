import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AdobeProduct } from "@/lib/content/types";
import { adobeProductPath } from "@/lib/content/adobe";
import { cn } from "@/lib/utils";

/**
 * Linked card for one Adobe application. Whole card is the link target; heading level is configurable.
 * `card-lift` (globals.css, motion-safe) lifts it on hover and focus-within.
 */
export function AdobeProductCard({
  product,
  note,
  headingLevel = "h3",
  className,
}: {
  product: Pick<AdobeProduct, "slug" | "name" | "area" | "summary">;
  /** Optional override for the body line (e.g. why it relates to the current page). */
  note?: string;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <article
      className={cn(
        "card-lift group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink focus-within:border-ink has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-signal sm:p-7",
        className,
      )}
    >
      <p className="font-mono text-label uppercase text-muted">{product.area}</p>
      <Heading className="mt-3 text-lg font-semibold leading-snug tracking-tight">
        <Link href={adobeProductPath(product.slug)} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none">
          {product.name}
        </Link>
      </Heading>
      <p className="mt-2 text-[0.9375rem] text-muted">{note ?? product.summary}</p>
      <span aria-hidden className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-ink">
        Explore
        <ArrowRight className="size-4 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </article>
  );
}
