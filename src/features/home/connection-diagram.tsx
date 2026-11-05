import Link from "next/link";
import { IllustrativeLabel } from "@/components/ui/layout";
import { connectionScenario } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * HTML/CSS diagram (not SVG) so labels reflow and stay readable at every width:
 * horizontal flow on large screens, vertical flow on small ones, with a feedback loop.
 * It walks one illustrative scenario through the three layers shown in the hero visual,
 * so the connection is shown concretely rather than restated in the abstract.
 */
export function ConnectionDiagram() {
  const { title, steps, feedback } = connectionScenario;
  return (
    <figure className="mt-16" aria-labelledby="connect-scenario-title">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <IllustrativeLabel className="bg-night-text text-night" />
        <h3 id="connect-scenario-title" className="text-lg font-semibold tracking-tight">
          {title}
        </h3>
      </div>
      <ol className="relative mt-8 grid gap-4 lg:grid-cols-3 lg:gap-12">
        {steps.map((s, i) => (
          <li key={s.layer} className="relative flex flex-col">
            <div
              className={cn(
                "group relative flex-1 rounded-2xl border p-7 transition-colors sm:p-8 lg:p-7 xl:p-8",
                i === 1
                  ? "border-night-text/40 bg-night-text text-night"
                  : "border-night-line bg-night-raised has-[a:hover]:border-night-muted",
              )}
            >
              <span className={cn("font-mono text-label uppercase", i === 1 ? "text-night/70" : "text-night-muted")}>
                {String(i + 1).padStart(2, "0")} · {s.layer}
              </span>
              <span className="mt-6 flex items-center gap-3">
                <span aria-hidden className={cn("size-3 shrink-0 rounded-full", i === 1 ? "bg-logo-red" : "border border-night-muted")} />
                {/* Stretched link: the whole card is clickable, but its accessible name stays short. */}
                <Link
                  href={s.href}
                  className={cn(
                    "text-h3 font-semibold after:absolute after:inset-0 after:rounded-2xl group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4",
                    i === 1 && "focus-visible:outline-night",
                  )}
                >
                  {s.area}
                </Link>
              </span>
              <p className={cn("mt-3 text-[0.9375rem] leading-relaxed", i === 1 ? "text-night/80" : "text-night-muted")}>{s.body}</p>
            </div>
            {i < steps.length - 1 ? (
              // Equal-width cards: on large screens the arrow sits in the grid gap instead of taking column width.
              <span
                aria-hidden
                className="flex h-10 items-center justify-center lg:absolute lg:left-full lg:top-1/2 lg:h-6 lg:w-12 lg:-translate-y-1/2"
              >
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
        {feedback}
      </figcaption>
    </figure>
  );
}
