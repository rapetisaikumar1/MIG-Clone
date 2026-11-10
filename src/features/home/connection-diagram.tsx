import Link from "next/link";
import { IllustrativeLabel } from "@/components/ui/layout";
import { connectionScenario } from "@/content/home";

/**
 * HTML/CSS diagram (not SVG) so labels reflow and stay readable at every width:
 * horizontal flow on wide screens (xl, four columns), vertical flow below it, with a feedback loop.
 * It walks one illustrative scenario through the four core areas (information → data → AI → MarTech),
 * so the connection is shown concretely rather than restated in the abstract. From md to xl each card lays out
 * its name beside its text, so the vertical flow doesn't leave long, sparse cards.
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
      <ol className="relative mt-8 grid gap-4 xl:grid-cols-4 xl:gap-10">
        {steps.map((s, i) => (
          <li key={s.layer} className="reveal relative flex flex-col">
            <div className="card-lift group relative flex-1 rounded-2xl border border-night-line bg-night-raised p-7 transition-colors duration-200 hover:border-night-muted focus-within:border-night-muted sm:p-8 md:max-xl:grid md:max-xl:grid-cols-[15rem_1fr] md:max-xl:gap-x-10 xl:p-7">
              <div>
              <span className="font-mono text-label uppercase text-night-muted">{s.layer}</span>
              {/* The marker centers on the first line, so a name that wraps keeps it beside the first word. */}
              <span className="mt-6 flex items-start gap-3 text-h3 md:max-xl:mt-3">
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
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-night-muted md:max-xl:mt-0 md:max-xl:self-center">{s.body}</p>
            </div>
            {i < steps.length - 1 ? (
              // Equal-width cards: on wide screens the arrow sits in the grid gap instead of taking column width.
              <span
                aria-hidden
                className="flex h-10 items-center justify-center xl:absolute xl:left-full xl:top-1/2 xl:h-6 xl:w-10 xl:-translate-y-1/2"
              >
                <svg viewBox="0 0 48 24" className="h-6 w-12 rotate-90 text-night-muted xl:w-10 xl:rotate-0">
                  <path d="M2 12 H42 M35 5 L43 12 L35 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {/* Feedback loop: from the last card back up into the first, with an arrowhead at its end. */}
      <div aria-hidden className="relative mx-6 mt-4 hidden h-10 rounded-b-2xl border-x border-b border-dashed border-night-muted/60 xl:block">
        <svg viewBox="0 0 12 8" className="absolute -left-[6.5px] -top-[7px] h-2 w-3 text-night-muted">
          <path d="M1 7 L6 1 L11 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
      <figcaption className="mt-6 flex items-start gap-3 text-[0.9375rem] text-night-muted xl:mt-3 xl:justify-center">
        <span aria-hidden className="mt-2 hidden h-px w-6 border-t border-dashed border-night-muted xl:block" />
        {feedback}
      </figcaption>
    </figure>
  );
}
