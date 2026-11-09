import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; title: string };

/**
 * Section links for the long legal pages (/privacy and /cookies). Lists only the page's own h2
 * headings. From lg it sits beside the text column and sticks while reading (`OnThisPage`); below
 * lg the same links sit in a collapsed disclosure above the text (`OnThisPageDisclosure`).
 */
export function OnThisPage({ items, className }: { items: TocItem[]; className?: string }) {
  return (
    <nav aria-labelledby="on-this-page-title" className={cn("sticky top-28", className)}>
      <h2 id="on-this-page-title" className="font-mono text-label uppercase text-muted">
        On this page
      </h2>
      <ul className="mt-4 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="-ml-px flex min-h-9 items-center border-l border-transparent py-1 pl-4 text-sm leading-snug text-muted transition-colors hover:border-ink hover:text-ink focus-visible:border-ink focus-visible:text-ink"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Phones and tablets: the section links in a collapsed "On this page" disclosure. */
export function OnThisPageDisclosure({ items, className }: { items: TocItem[]; className?: string }) {
  return (
    <details className={cn("group/toc rounded-2xl bg-surface ring-1 ring-line", className)}>
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 font-mono text-label uppercase text-ink-soft [&::-webkit-details-marker]:hidden">
        On this page
        <ChevronDown aria-hidden className="size-4 transition-transform duration-200 group-open/toc:rotate-180 motion-reduce:transition-none" />
      </summary>
      <nav aria-label="On this page" className="border-t border-line px-5 pb-3 pt-2">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="flex min-h-11 items-center text-sm leading-snug text-ink-soft hover:text-ink">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
