import { cn } from "@/lib/utils";

export type TocItem = { id: string; title: string };

/**
 * Section links for the long legal pages (/privacy and /cookies). Lists only the page's own h2
 * headings. Shown from lg, where the text column leaves room beside it; it sticks while reading.
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
              className="-ml-px flex min-h-9 items-center border-l border-transparent py-1 pl-4 text-sm leading-snug text-muted transition-colors hover:border-ink hover:text-ink"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
