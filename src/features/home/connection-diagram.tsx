import Link from "next/link";
import { IllustrativeLabel } from "@/components/ui/layout";
import { connectionScenario } from "@/content/home";

/**
 * HTML/CSS diagram (not SVG) so labels reflow and stay readable at every width:
 * horizontal flow on large screens, vertical flow on small ones, with a feedback loop.
 * It walks one illustrative scenario through the three layers shown in the hero visual,
 * so the connection is shown concretely rather than restated in the abstract.
 *
 * The three cards get equal treatment (no step numbers, no fixed "selected" card); the card under the
 * pointer or holding focus lifts slightly and fills its marker with the logo red.
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
          <li key={s.layer} className="reveal relative flex flex-col">
            <div className="card-lift group relative flex-1 rounded-2xl border border-night-line bg-night-raised p-7 transition-colors duration-200 hover:border-night-muted focus-within:border-night-muted sm:p-8 lg:p-7 xl:p-8">
              <span className="font-mono text-label uppercase text-night-muted">{s.layer}</span>
              {/* The marker centers on the first line, so a pillar name that wraps keeps it beside the first word. */}
              <span className="mt-6 flex items-start gap-3 text-h3">
                <span
                  aria-hidden
                  className="mt-[calc((1lh-0.75rem)/2)] size-3 shrink-0 rounded-full border border-night-muted transition-colors duration-200 group-focus-within:border-logo-red group-focus-within:bg-logo-red group-hover:border-logo-red group-hover:bg-logo-red"
                />
                {/* Stretched link: the whole card is clickable, but its accessible name stays short. */}
                <Link
                  href={s.href}
                  className="font-semibold decoration-1 underline-offset-4 after:absolute after:inset-0 after:rounded-2xl group-hover:underline"
                >
                  {s.area}
                </Link>
              </span>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-night-muted">{s.body}</p>
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
      {/* Feedback loop: from the last card back up into the first, with an arrowhead at its end. */}
      <div aria-hidden className="relative mx-6 mt-4 hidden h-10 rounded-b-2xl border-x border-b border-dashed border-night-muted/60 lg:block">
        <svg viewBox="0 0 12 8" className="absolute -left-[6.5px] -top-[7px] h-2 w-3 text-night-muted">
          <path d="M1 7 L6 1 L11 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <figcaption className="mt-6 flex items-start gap-3 text-[0.9375rem] text-night-muted lg:mt-3 lg:justify-center">
        <span aria-hidden className="mt-2 hidden h-px w-6 border-t border-dashed border-night-muted lg:block" />
        {feedback}
      </figcaption>
    </figure>
  );
}
