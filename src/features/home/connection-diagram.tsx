import Link from "next/link";
import { connection } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * HTML/CSS diagram (not SVG) so labels reflow and stay readable at every width:
 * horizontal flow on large screens, vertical flow on small ones, with a feedback loop.
 */
export function ConnectionDiagram() {
  return (
    <figure className="mt-16">
      <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-0">
        {connection.map((c, i) => (
          <li key={c.step} className="relative flex flex-col lg:flex-row lg:items-stretch">
            <Link
              href={c.href}
              className={cn(
                "group relative flex-1 rounded-2xl border p-7 transition-colors sm:p-8",
                i === 1 ? "border-night-text/40 bg-night-text text-night" : "border-night-line bg-night-raised hover:border-night-muted",
              )}
            >
              <span className={cn("font-mono text-label uppercase", i === 1 ? "text-night/60" : "text-night-muted")}>
                {String(i + 1).padStart(2, "0")} · {c.step}
              </span>
              <span className="mt-6 flex items-center gap-3">
                <span aria-hidden className={cn("size-3 rounded-full", i === 1 ? "bg-logo-red" : "border border-night-muted")} />
                <span className="text-h3 font-semibold">{c.title}</span>
              </span>
              <span className={cn("mt-3 block text-[0.9375rem] leading-relaxed", i === 1 ? "text-night/75" : "text-night-muted")}>{c.body}</span>
            </Link>
            {i < connection.length - 1 ? (
              <span aria-hidden className="flex h-10 items-center justify-center lg:h-auto lg:w-12">
                <svg viewBox="0 0 48 24" className="h-6 w-12 rotate-90 text-night-muted lg:rotate-0">
                  <path d="M2 12 H42 M35 5 L43 12 L35 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <div aria-hidden className="mx-6 mt-4 hidden h-10 rounded-b-2xl border-x border-b border-dashed border-night-line lg:mr-6 lg:block" />
      <figcaption className="mt-6 flex items-start gap-3 text-[0.9375rem] text-night-muted lg:mt-3 lg:justify-center">
        <span aria-hidden className="mt-2 hidden h-px w-6 border-t border-dashed border-night-muted lg:block" />
        Monitoring what AI and experiences actually do feeds back into data quality and governance policy.
      </figcaption>
    </figure>
  );
}
