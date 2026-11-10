import { servicesNav, servicesPath } from "@/config/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, IllustrativeLabel, Section, SectionHeading, Tag } from "@/components/ui/layout";
import type { AdobePlatform, ApproachStage, Capability, ServiceContent, UseCase } from "@/lib/content/types";
import { contactHref } from "@/features/contact/links";
import { keepHyphenatedWords } from "@/features/adobe/keep-hyphenated";
import { adobeProductPath, getAdobeProducts } from "@/lib/content/adobe";
import { cn } from "@/lib/utils";

/**
 * Keeps card grids balanced for any item count (3–9 in practice): picks the column count that divides
 * the items evenly, otherwise the one that leaves the fullest last row, and widens the last item to
 * close the gap instead of leaving an empty cell.
 */
function balancedGrid(count: number, max: 3 | 4) {
  if (count <= max) return { cols: Math.max(count, 1), lastSpan: 1 };
  const options = max === 4 ? [4, 3] : [3, 2];
  const exact = options.find((c) => count % c === 0);
  const cols = exact ?? options.reduce((a, b) => (count % b > count % a ? b : a));
  return { cols, lastSpan: exact ? 1 : cols - ((count - 1) % cols) };
}
const LG_COLS: Record<number, string> = { 1: "", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" };
const LG_SPAN: Record<number, string> = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" };

/** Class for item `index` of `count` in a grid that is 2 columns from sm and balanced at lg. */
function balancedItem(index: number, count: number, max: 3 | 4, sm = true) {
  if (index !== count - 1) return undefined;
  const { lastSpan } = balancedGrid(count, max);
  return cn(sm && count % 2 === 1 && count > 1 && "sm:col-span-2", (lastSpan > 1 || (sm && count % 2 === 1)) && LG_SPAN[lastSpan]);
}

/**
 * Visible breadcrumb trails are switched off site-wide (owner request, 2026-11-09). Pages still pass their trail
 * here and emit the matching BreadcrumbList JSON-LD, so the hierarchy stays available to search engines.
 */
export const Breadcrumbs: (props: { items: { label: string; href?: string }[] }) => null = () => null;

export type HeroCta = { label: string; href: string };

export function ServiceHero({
  content,
  graphic,
  secondaryCta = { label: "What's included", href: "#capabilities" },
}: {
  content: ServiceContent;
  graphic: ReactNode;
  /** Replaces the default "What's included" link (e.g. Adobe offers "Request an assessment"). */
  secondaryCta?: HeroCta;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pb-16 pt-10 sm:pb-20 lg:pb-24 lg:pt-14">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: content.name }]} />
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {/* Multi-term eyebrows can wrap on phones: keep the dot on the first line and each separator with the
                term before it, so a wrapped line never starts with "·". */}
            <Eyebrow className="items-start [&>span:first-child]:mt-[0.2rem]">
              <span>{content.hero.eyebrow.replaceAll(" · ", " · ")}</span>
            </Eyebrow>
            <h1 className="mt-6 text-h1">{content.hero.title}</h1>
            <p className="mt-7 max-w-[60ch] text-lead text-muted">{content.hero.lead}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={contactHref(content.interest)} arrow>
                Talk to an Expert
              </ButtonLink>
              <ButtonLink href={secondaryCta.href} variant="outline">
                {secondaryCta.label}
              </ButtonLink>
            </div>
          </div>
          {/* Below lg the graphic stacks under the CTAs; capping its width keeps the hero to about one screen. */}
          <div className="w-full max-lg:mx-auto max-lg:max-w-lg lg:col-span-5">
            <div className="rounded-2xl border border-line bg-surface/70 p-4 sm:p-6 lg:p-8">{graphic}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProblemSection({ content }: { content: ServiceContent }) {
  return (
    <Section aria-labelledby="problem-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>The challenge</Eyebrow>
            <h2 id="problem-title" className="mt-5 text-h2">
              {/* Keeps hyphenated words whole on phones ("off-the-shelf" broke as "off-the-" / "shelf"). */}
              {keepHyphenatedWords(content.problem.title)}
            </h2>
            <div className="mt-8 space-y-5 text-[1.0625rem] text-ink-soft">
              {content.problem.body.map((p) => (
                <p key={p.slice(0, 24)} className="max-w-[62ch]">
                  {p}
                </p>
              ))}
            </div>
          </div>
          <aside className="self-start rounded-2xl bg-paper-deep p-7 sm:p-9 lg:col-span-5" aria-labelledby="signals-title">
            <h3 id="signals-title" className="font-mono text-label uppercase text-muted">
              Signs you may recognize
            </h3>
            <ul className="mt-6 space-y-4">
              {content.problem.signals.map((s) => (
                <li key={s} className="flex gap-3.5 text-[1rem] leading-snug">
                  <Dot className="mt-[0.45rem]" />
                  {s}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-20 border-t border-ink pt-10">
          <h3 id="audience-title" className="flex items-center gap-2.5 font-mono text-label uppercase text-muted">
            <Dot />
            Who this is for
          </h3>
          {/* Each item is a two-row subgrid (role, need) so descriptions start on one line across columns. */}
          <ul
            className={cn(
              "mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2",
              LG_COLS[balancedGrid(content.audience.length, 4).cols],
            )}
          >
            {content.audience.map((a, i) => (
              <li
                key={a.role}
                className={cn("sm:row-span-2 sm:grid sm:grid-rows-subgrid sm:gap-y-0", balancedItem(i, content.audience.length, 4))}
              >
                <p className="text-h3 font-semibold">{a.role}</p>
                <p className="mt-2 max-w-[48ch] text-muted">{a.need}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/** Adobe product names and short names ("Adobe Experience Platform", "Real-Time CDP") → product page. */
const adobeTagHrefs = new Map(
  getAdobeProducts().flatMap((p) => [
    [p.name, adobeProductPath(p.slug)],
    [p.shortName, adobeProductPath(p.slug)],
  ]),
);

/** Links the first occurrence of each term in `text` (e.g. a product name) to its page. */
function withTermLinks(text: string, termLinks?: Record<string, string>): ReactNode {
  if (!termLinks) return text;
  const entry = Object.entries(termLinks).find(([term]) => text.includes(term));
  if (!entry) return text;
  const [term, href] = entry;
  const at = text.indexOf(term);
  return (
    <>
      {text.slice(0, at)}
      <Link href={href} className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-signal">
        {term}
      </Link>
      {text.slice(at + term.length)}
    </>
  );
}

/**
 * The grid is 2 columns from sm and 3 from lg. Items are subgrids spanning four shared rows (title,
 * summary, list, tags), so summaries and lists start at the same height across a row however the
 * titles wrap. When the last item would sit alone on its row, it spans the row at that breakpoint and
 * lays its content out side by side instead of leaving an orphan. Services are modular, so items
 * are unnumbered.
 */
function CapabilityItem({
  capability,
  index,
  count,
  termLinks,
}: {
  capability: Capability;
  index: number;
  count: number;
  termLinks?: Record<string, string>;
}) {
  const isLast = index === count - 1;
  const wideSm = isLast && count % 2 === 1;
  const wideLg = isLast && count % 3 === 1;
  // With two items on the last desktop row, the grid switches to 6 tracks: every item spans 2, the last two span 3,
  // so that row is filled by two wider items instead of leaving an empty third cell.
  const lgSpan = count % 3 === 2 ? (index >= count - 2 ? "lg:col-span-3" : "lg:col-span-2") : undefined;
  // Wrappers dissolve (display: contents) wherever the item is a subgrid, so their children sit on the shared rows.
  const wrapper = cn(!wideSm && "sm:contents", wideSm && !wideLg && "lg:contents", !wideSm && wideLg && "lg:block");
  return (
    <li
      id={capability.id}
      className={cn(
        "reveal flex flex-col border-t border-line-strong pt-6",
        !wideSm && "sm:row-span-4 sm:grid sm:grid-rows-subgrid sm:gap-y-0",
        wideSm && "sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-x-10",
        wideSm && !wideLg && "lg:col-span-1 lg:row-span-4 lg:grid-cols-1 lg:grid-rows-subgrid lg:gap-y-0",
        wideLg && "lg:col-span-3 lg:row-span-1 lg:grid lg:grid-cols-12 lg:grid-rows-none lg:gap-x-10",
        lgSpan,
      )}
    >
      <div className={cn(wrapper, wideLg && "lg:col-span-5")}>
        <h3 className="text-h3">{capability.title}</h3>
        <p className="mt-3 max-w-[48ch] text-muted">{capability.summary}</p>
      </div>
      <div className={cn("flex flex-1 flex-col", wrapper, wideLg && "lg:col-span-7")}>
        <ul
          className={cn(
            "mt-5 grid content-start gap-y-2 text-[0.9375rem] text-ink-soft",
            wideSm && "sm:mt-0",
            wideSm && !wideLg && "lg:mt-5",
            wideLg && "lg:mt-0 lg:grid-cols-2 lg:gap-x-8",
          )}
        >
          {capability.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="mt-[0.7rem] h-px w-3 shrink-0 bg-ink" />
              <span>{withTermLinks(item, termLinks)}</span>
            </li>
          ))}
        </ul>
        {capability.platforms ? (
          <ul
            className={cn(
              "mt-auto flex flex-wrap content-start gap-2 pt-6",
              // On a full-width last item the list runs in two columns; a rule above the tags spans both, so the tags
              // read as belonging to the whole item rather than to the first column.
              wideLg && "lg:mt-6 lg:border-t lg:border-line lg:pt-5",
            )}
            aria-label={`Platforms for ${capability.title}`}
          >
            {capability.platforms.map((p) => {
              const href = adobeTagHrefs.get(p);
              return (
                <li key={p} className="flex">
                  {href ? (
                    // The ::before layer extends the hit area to 44px tall without enlarging the chip.
                    <Link
                      href={href}
                      className="group relative rounded-full before:absolute before:inset-x-0 before:-inset-y-2.5 before:content-['']"
                    >
                      <Tag className="transition-colors group-hover:border-ink group-hover:text-ink">{p}</Tag>
                    </Link>
                  ) : (
                    <Tag>{p}</Tag>
                  )}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

export function CapabilitiesSection({
  content,
  termLinks,
}: {
  content: ServiceContent;
  /** Terms in capability bullets to link, e.g. { MapleRecord: "/maplerecord" }. */
  termLinks?: Record<string, string>;
}) {
  const count = content.capabilities.length;
  return (
    <Section tone="surface" id="capabilities" aria-labelledby="capabilities-title">
      <Container>
        <SectionHeading
          id="capabilities-title"
          eyebrow="What we deliver"
          title="Services and capabilities"
          intro={content.capabilitiesIntro}
          className="reveal"
        />
        <ul className={cn("mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-14", count % 3 === 2 ? "lg:grid-cols-6" : "lg:grid-cols-3")}>
          {content.capabilities.map((c, i) => (
            <CapabilityItem key={c.id} capability={c} index={i} count={count} termLinks={termLinks} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function PlatformMatrix({
  platforms,
  platformHref,
}: {
  platforms: AdobePlatform[];
  /** Optional link to a page about each platform; rows without one render as plain text. */
  platformHref?: (platform: AdobePlatform) => string | undefined;
}) {
  return (
    <Section tone="night" aria-labelledby="platforms-title">
      <Container>
        <SectionHeading
          tone="night"
          id="platforms-title"
          eyebrow="Adobe applications"
          title="The platforms we implement and optimize"
          intro="What each application does, and the services we provide for it."
        />
        <ul className="mt-14 divide-y divide-night-line border-y border-night-line">
          {platforms.map((p) => {
            const href = platformHref?.(p);
            return (
              <li key={p.id} id={p.id} className="grid gap-5 py-9 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <p className="font-mono text-label uppercase text-night-muted">{p.area}</p>
                  <h3 className="mt-3 text-h3">
                    {href ? (
                      <Link href={href} className="inline-block decoration-1 underline-offset-[6px] hover:underline hover:decoration-signal">
                        {p.name}
                      </Link>
                    ) : (
                      p.name
                    )}
                  </h3>
                </div>
                <p className="text-night-muted lg:col-span-4">{p.description}</p>
                <div className="lg:col-span-4">
                  <ul className="flex flex-wrap content-start gap-2" aria-label={`Services for ${p.name}`}>
                    {p.services.map((s) => (
                      <li key={s} className="rounded-full border border-night-line px-3 py-1.5 text-sm text-night-text">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {href ? (
                    <ArrowLink href={href} className="mt-4 text-night-text decoration-night-line hover:decoration-signal">
                      Explore {p.name}
                    </ArrowLink>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-3xl text-sm text-night-muted">
          Adobe, Adobe Experience Platform, Experience Manager, Marketo Engage and the other product names above are
          trademarks of Adobe Inc.
        </p>
      </Container>
    </Section>
  );
}

const STEP_COLS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
  5: "md:grid-cols-2 lg:grid-cols-5",
  6: "md:grid-cols-2 lg:grid-cols-3",
};

/**
 * Numbered stages. From md each step is a subgrid spanning shared rows (number, title, activities and,
 * unless hidden, deliverable), so titles and deliverable rules line up across columns however long the
 * text is. A hairline joins the stage markers: across the row at lg, and down the left edge below md,
 * where the steps stack as a timeline.
 */
export function ApproachSteps({
  stages,
  tone = "light",
  showDeliverable = true,
}: {
  stages: ApproachStage[];
  tone?: "light" | "night";
  /** Set false where a separate deliverables section already lists each stage's output. */
  showDeliverable?: boolean;
}) {
  const night = tone === "night";
  const count = stages.length;
  const rule = night ? "bg-night-line" : "bg-line-strong";
  return (
    <ol className={cn("relative mt-14 grid gap-10 lg:gap-x-8", STEP_COLS[count] ?? STEP_COLS[4])}>
      {stages.map((s, i) => (
        <li
          key={s.stage}
          className={cn(
            "reveal relative max-md:pl-16 md:grid md:grid-rows-subgrid md:gap-y-0",
            showDeliverable ? "md:row-span-4" : "md:row-span-3",
          )}
        >
          {i < count - 1 ? (
            // Runs from below this marker, through the gap, to the top of the next one.
            <span aria-hidden className={cn("absolute -bottom-10 left-[1.375rem] top-11 w-px md:hidden", rule)} />
          ) : null}
          {count <= 5 ? (
            // lg connecting line, drawn per stage (through the column gap) so it rises with the stage's reveal and
            // never sits off-centre from the markers mid-scroll.
            <span
              aria-hidden
              className={cn("absolute left-0 top-[1.375rem] hidden h-px lg:block", i < count - 1 ? "-right-8" : "right-0", rule)}
            />
          ) : null}
          <span
            className={cn(
              "relative z-10 inline-flex size-11 items-center justify-center rounded-full font-mono text-sm max-md:absolute max-md:left-0 max-md:top-0",
              i === 0 ? "bg-signal text-white" : night ? "bg-night-raised text-night-text ring-1 ring-night-line" : "bg-surface text-ink ring-1 ring-line-strong",
            )}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="text-h3 max-md:flex max-md:min-h-11 max-md:items-center md:mt-6">{s.stage}</h3>
          <p className={cn("mt-3 max-w-[48ch] max-md:mt-2", night ? "text-night-muted" : "text-muted")}>{s.activities}</p>
          {showDeliverable ? (
            <div className={cn("mt-6 border-t pt-4 max-md:mt-5", night ? "border-night-line" : "border-line")}>
              <p className={cn("font-mono text-label uppercase", night ? "text-night-muted" : "text-muted")}>Deliverable</p>
              <p className="mt-2 font-medium leading-snug">{s.deliverable}</p>
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];

export function ApproachSection({ content }: { content: ServiceContent }) {
  const count = content.approach.length;
  return (
    <Section aria-labelledby="approach-title">
      <Container>
        <SectionHeading
          id="approach-title"
          eyebrow="From vision to victory"
          title={`${COUNT_WORDS[count] ?? count} stages, one accountable team`}
          intro="Each stage ends with something tangible you can review, use and build on. What you keep is listed under What you receive, further down this page."
          className="reveal"
        />
        {/* The deliverables section that follows lists each stage's outputs in full, so the steps omit them. */}
        <ApproachSteps stages={content.approach} showDeliverable={false} />
      </Container>
    </Section>
  );
}

export function DeliverablesSection({ content }: { content: ServiceContent }) {
  const count = content.deliverables.length;
  return (
    <Section tone="deep" aria-labelledby="deliverables-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="deliverables-title"
              eyebrow="Deliverables"
              title="What you receive"
              intro="Practical outputs your teams can use, run and maintain."
              className="reveal lg:sticky lg:top-28"
            />
          </div>
          {/* One divided list on phones; separate cards from sm. */}
          <ul className="grid divide-y divide-line rounded-2xl border border-line bg-surface sm:grid-cols-2 sm:gap-4 sm:divide-y-0 sm:rounded-none sm:border-0 sm:bg-transparent lg:col-span-8">
            {content.deliverables.map((d, i) => (
              <li
                key={d.title}
                className={cn(
                  "reveal flex gap-4 p-6 sm:rounded-2xl sm:border sm:border-line sm:bg-surface",
                  i === count - 1 && count % 2 === 1 && "sm:col-span-2",
                )}
              >
                <svg aria-hidden viewBox="0 0 20 24" className="mt-0.5 h-6 w-5 shrink-0 text-line-strong">
                  <path d="M1 1 H13 L19 7 V23 H1 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M13 1 V7 H19" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <div>
                  <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">{d.title}</h3>
                  <p className="mt-2 text-[0.9375rem] text-muted">{d.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function UseCaseCard({ useCase, className }: { useCase: UseCase; className?: string }) {
  const rows: [string, string][] = [
    ["Situation", useCase.context],
    ["Approach", useCase.approach],
    ["Intended outcome", useCase.outcome],
  ];
  return (
    // From md the card is a subgrid over five shared rows (label, title, three terms), so each term starts at the
    // same height across a row of cards however the titles and texts wrap.
    <li
      className={cn(
        "flex flex-col rounded-2xl border border-line bg-paper p-6 sm:p-7 md:row-span-5 md:grid md:grid-rows-subgrid md:gap-y-0",
        className,
      )}
    >
      {/* Outline variant: the label stays for accuracy without being the darkest thing on the card. */}
      <IllustrativeLabel className="self-start justify-self-start border border-line-strong bg-transparent text-muted" />
      <h3 className="mt-6 text-h3">{useCase.title}</h3>
      <dl className="mt-6 max-md:space-y-5 md:contents">
        {rows.map(([term, text], i) => (
          <div key={term} className={cn(i === 0 ? "md:mt-6" : "md:mt-5")}>
            <dt className="font-mono text-label uppercase text-muted">{term}</dt>
            <dd className="mt-1.5 text-[0.9375rem] text-ink-soft">{text}</dd>
          </div>
        ))}
      </dl>
    </li>
  );
}

export function UseCasesSection({ content }: { content: ServiceContent }) {
  const count = content.useCases.length;
  return (
    // Surface tone keeps it distinct from the paper FAQ that follows on pages without a benefits strip.
    <Section tone="surface" aria-labelledby="usecases-title">
      <Container>
        <SectionHeading
          id="usecases-title"
          eyebrow="Practical applications"
          title="How this work applies in practice"
          intro="These are illustrative scenarios that show typical situations and approaches. They are not descriptions of specific client projects."
          className="reveal"
        />
        {count > 1 ? (
          <p aria-hidden className="mt-10 flex items-center gap-2 font-mono text-label uppercase text-muted md:hidden">
            Swipe for more scenarios
            <ArrowRight className="size-3.5 text-signal" />
          </p>
        ) : null}
        {/*
          Below md the scenarios sit in a horizontal snap row (the next card peeks in as the cue), which
          keeps three long cards from adding several screens of scrolling. The row is focusable so
          keyboard users can scroll it with the arrow keys.
        */}
        <ul
          aria-labelledby="usecases-title"
          tabIndex={0}
          className={cn(
            "reveal mt-14 grid gap-6 max-md:mt-4 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:pb-4 max-sm:gap-4",
            // Bleed to the screen edges (matching Container's gutter) so cards scroll edge to edge.
            "max-sm:-mx-5 max-sm:scroll-px-5 max-sm:px-5 sm:max-md:-mx-8 sm:max-md:scroll-px-8 sm:max-md:px-8",
            "max-md:[scrollbar-width:thin] max-md:focus-visible:outline-offset-[-2px]",
            LG_COLS[balancedGrid(count, 3).cols],
          )}
        >
          {content.useCases.map((u, i) => (
            <UseCaseCard
              key={u.title}
              useCase={u}
              className={cn("max-md:w-[85%] max-md:shrink-0 max-md:snap-start", balancedItem(i, count, 3, false))}
            />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/** Supporting strip of intended benefits. Optional on the service pages (see ServicePage `showBenefits`). */
export function BenefitsSection({ content }: { content: ServiceContent }) {
  return (
    <Section tone="surface" spacing="compact" aria-labelledby="benefits-title">
      <Container>
        <h2 id="benefits-title" className="reveal flex items-center gap-2.5 font-mono text-label uppercase text-muted">
          <Dot />
          Intended benefits
        </h2>
        <ul
          className={cn(
            "mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2",
            LG_COLS[balancedGrid(content.benefits.length, 4).cols],
          )}
        >
          {content.benefits.map((b, i) => (
            <li key={b.title} className={cn("bg-surface p-7", balancedItem(i, content.benefits.length, 4))}>
              <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.01em]">{b.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{b.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * Answers open with a short height transition where the browser supports ::details-content and
 * interpolate-size (progressive; others open instantly). Questions stay visible at all times.
 */
export function FaqSection({ faqs, title = "Frequently asked questions" }: { faqs: ServiceContent["faqs"]; title?: string }) {
  return (
    <Section aria-labelledby="faq-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" eyebrow="FAQ" title={title} className="reveal lg:sticky lg:top-28" />
          </div>
          <div className="lg:col-span-8">
            <ul className="border-t border-ink">
              {faqs.map((f) => (
                <li key={f.question} className="border-b border-line">
                  <details
                    className={cn(
                      "group [interpolate-size:allow-keywords]",
                      "details-content:h-0 details-content:overflow-clip open:details-content:h-auto",
                      "motion-safe:details-content:transition-[height,content-visibility] motion-safe:details-content:transition-discrete motion-safe:details-content:duration-200 motion-safe:details-content:ease-out",
                    )}
                  >
                    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium tracking-tight marker:hidden [&::-webkit-details-marker]:hidden">
                      {f.question}
                      <span
                        aria-hidden
                        className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:border-ink group-open:border-ink group-open:bg-ink"
                      >
                        <span className="absolute h-px w-3 bg-ink group-open:bg-paper" />
                        <span className="absolute h-3 w-px bg-ink transition-transform duration-200 group-open:scale-y-0 motion-reduce:transition-none" />
                      </span>
                    </summary>
                    <p className="max-w-[64ch] pb-6 pr-12 text-ink-soft">{f.answer}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export type ReadingLink = { title: string; href: string };

export function RelatedServices({ current, reading }: { current: ServiceContent["slug"]; reading?: ReadingLink[] }) {
  // Every other service page (core expertise first, then the remaining pillars), then an "All services" card:
  // seven related pages plus the hub make an even 4 × 2 from lg and 2 × 4 on tablets.
  const related = servicesNav
    .filter((s) => s.href.slice(1) !== current)
    .map((s) => ({ href: s.href, name: s.label, line: s.description ?? "" }));
  const all = [...related, { href: servicesPath, name: "All services", line: "Core expertise and all seven practice pillars, in one place." }];
  return (
    <Section tone="deep" spacing="compact" aria-labelledby="related-title">
      <Container>
        <SectionHeading id="related-title" eyebrow="Connected expertise" title="Explore related services" className="reveal" />
        {/*
          Eight cards: one column on phones, 2 × 4 on tablets and small laptops, 4 × 2 from xl. At lg (1024–1279px) four
          columns left about 130px for each name, too narrow for words such as "Transformation" beside the arrow, so the
          4 × 2 grid starts at xl. md:auto-rows-fr keeps every card in the grid the same height; the arrow sits beside the
          name, so a short description doesn't leave an empty band at the bottom of the card.
        */}
        <ul className="mt-10 grid gap-4 md:auto-rows-fr md:grid-cols-2 xl:grid-cols-4">
          {all.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="card-lift group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-ink sm:p-7"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-[1.1875rem] font-semibold leading-snug tracking-[-0.012em] sm:text-[1.3125rem]">
                    {s.name}
                  </span>
                  <span
                    aria-hidden
                    className="-mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-signal transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-white"
                  >
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </span>
                <span className="mt-3 block max-w-[40ch] text-[0.9375rem] leading-relaxed text-muted">{s.line}</span>
              </Link>
            </li>
          ))}
        </ul>
        {reading?.length ? (
          <div className="mt-12 border-t border-line-strong pt-8 sm:flex sm:items-baseline sm:gap-10">
            <h3 className="shrink-0 font-mono text-label uppercase text-muted">Further reading</h3>
            <ul className="mt-3 flex flex-col gap-x-10 sm:mt-0 lg:flex-row lg:flex-wrap">
              {reading.map((r) => (
                <li key={r.href}>
                  {/* Block with an inline arrow, so a title that wraps on phones keeps the arrow after its last word
                      (as a flex row, the wrapped text filled the line and pushed the arrow to the far edge). */}
                  <ArrowLink href={r.href} className="block py-2 [&>svg]:ml-2 [&>svg]:inline [&>svg]:align-[-0.125em]">
                    {r.title}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
