import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";
import { Container } from "@/components/ui/layout";
import { mrHero, mrOfficial } from "@/content/maplerecord/overview";
import type { MrScreen } from "@/content/maplerecord/screens";
import { LeafMark, MrBadge, mrModuleIcons } from "@/features/maplerecord/mr-ui";
import { getMrModules } from "@/lib/content/maplerecord";
import { cn } from "@/lib/utils";
import styles from "./overview-hero.module.css";

/*
 * MapleRecord overview hero: centred headline block, then a product composition built around the Maple
 * App dashboard (the owner's choice of hero screen). Smaller MR windows show the modules at work: MR
 * Workflows in front from md, MR Records behind from lg; phones show the App dashboard alone. The backdrop (grid,
 * workflow connectors with travelling signals, drifting record cards, a red aurora) is decorative,
 * CSS/SVG only, and static under prefers-reduced-motion. No JavaScript.
 */

/**
 * The App dashboard is cropped to its content (the screen's own header bar is replaced by the window's
 * title bar): all five module cards from sm, the first two columns on phones so the card titles stay
 * legible. Crop boxes are in the 1280 × 800 canvas units of the screen (see overview-hero.module.css).
 * Each `sizes` entry is the window width times the crop's enlargement (1280 / crop width).
 */
const mainSizes = [
  "(min-width: 1248px) 63rem", // 72rem × 64% × 1.368
  "(min-width: 1024px) calc((100vw - 6rem) * 0.876)",
  "(min-width: 768px) calc((100vw - 4rem) * 0.92 * 1.368)",
  "(min-width: 640px) calc((100vw - 4rem) * 1.368)",
  "calc((100vw - 2.5rem) * 2.12)",
].join(", ");

/** Secondary windows: 40% of the composition (MR Workflows from md, MR Records from lg; hidden below, so never fetched). */
const sideSizes = "(min-width: 1248px) 29rem, (min-width: 1024px) calc((100vw - 6rem) * 0.4), (min-width: 768px) calc((100vw - 4rem) * 0.4), 1px";

/** Two more screens that show modules doing work. Neither appears elsewhere on the overview. */
const behind: MrScreen = mrHero.side.behind;
const front: MrScreen = mrHero.side.front;

/** Title row matching MrWindow's caption bar: leaf mark + the screen's name. */
function TitleBar({ label }: { label: string }) {
  return (
    <div aria-hidden className="flex h-8 items-center gap-2 border-b border-line/70 bg-paper px-3 sm:h-9 sm:px-4">
      <LeafMark className="size-3 shrink-0" />
      <span className="truncate text-[0.6875rem] font-medium leading-none tracking-[-0.005em] text-muted sm:text-[0.75rem]">{label}</span>
    </div>
  );
}

function SideWindow({ screen, decorative, className }: { screen: MrScreen; decorative?: boolean; className?: string }) {
  return (
    <figure aria-hidden={decorative || undefined} className={cn("overflow-hidden rounded-xl bg-surface ring-1 ring-white/10", className)}>
      <TitleBar label={screen.label} />
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={screen.src} alt={decorative ? "" : screen.alt} fill sizes={sideSizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}

/*
 * Decorative record cards and record rows that drift in two depth layers. Positions are in % of the side
 * frame the workflow connectors are drawn in (the same box at every width), and sit in the gaps between
 * the connector edges and nodes, so a card never lands on a line or node. `lgOnly` shapes sit nearest the
 * centre and would show behind the headline text on tablets.
 */
type Drift = { kind: "doc" | "row"; side: "left" | "right"; x: string; y: string; dur: number; delay: number; wide?: boolean; lgOnly?: boolean };
const drifts: Drift[] = [
  { kind: "row", side: "left", x: "40%", y: "4%", dur: 17, delay: -12 },
  { kind: "doc", side: "left", x: "6%", y: "29%", dur: 19, delay: -4 },
  { kind: "row", side: "left", x: "4%", y: "99%", dur: 15, delay: -9, wide: true },
  { kind: "doc", side: "right", x: "64%", y: "22%", dur: 21, delay: -7 },
  { kind: "doc", side: "right", x: "28%", y: "45%", dur: 24, delay: -11, lgOnly: true },
  { kind: "row", side: "right", x: "48%", y: "95%", dur: 18, delay: -6 },
];

type DriftStyle = CSSProperties & Record<"--drift-dur" | "--drift-delay", string>;

function RecordDoc() {
  return (
    <span className={styles.doc}>
      <span className={styles.docHead} />
      <span className={styles.docLine} style={{ width: "78%" }} />
      <span className={styles.docLine} style={{ width: "62%" }} />
      <span className={styles.docLine} style={{ width: "70%" }} />
      <span className={styles.docTag} />
    </span>
  );
}

function RecordRow({ wide }: { wide?: boolean }) {
  return (
    <span className={cn(styles.row, wide && styles.rowWide)}>
      <span className={styles.rowBox} />
      <span className={styles.rowLine} />
      <span className={styles.rowTag} />
    </span>
  );
}

/*
 * Workflow connectors (orthogonal edges between small nodes, like the MR Workflows designer) on each
 * side of the headline. Signals travel along the edges with SMIL <animateMotion>; that group is removed
 * under reduced motion (motion-reduce:hidden) and static dots take its place.
 */
const leftEdges = [
  "M 40 96 H 150 Q 162 96 162 108 V 214 Q 162 226 174 226 H 300",
  "M 162 226 V 352 Q 162 364 150 364 H 70",
  "M 300 226 Q 312 226 312 238 V 470 Q 312 482 300 482 H 210",
];
const rightEdges = [
  "M 380 70 H 262 Q 250 70 250 82 V 178 Q 250 190 238 190 H 96",
  "M 250 190 V 322 Q 250 334 262 334 H 360",
  "M 96 190 Q 84 190 84 202 V 430 Q 84 442 96 442 H 200",
];
const leftNodes: [number, number][] = [[40, 96], [300, 226], [70, 364], [210, 482]];
const rightNodes: [number, number][] = [[380, 70], [96, 190], [360, 334], [200, 442]];

function Circuit({ side }: { side: "left" | "right" }) {
  const edges = side === "left" ? leftEdges : rightEdges;
  const nodes = side === "left" ? leftNodes : rightNodes;
  return (
    <svg viewBox="0 0 420 540" className={styles.circuit} fill="none">
      {edges.map((d, i) => (
        <path key={d} d={d} pathLength={1} className={styles.edge} style={{ "--edge-delay": `${0.5 + i * 0.25}s` } as CSSProperties} />
      ))}
      {nodes.map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x - 13} ${y - 13})`}>
          <rect width="26" height="26" rx="7" className={styles.node} />
          <path d="M 8 11 H 18 M 8 15 H 15" className={styles.nodeGlyph} />
        </g>
      ))}
      {/* Travelling signals (motion allowed) */}
      <g className="motion-reduce:hidden">
        {edges.map((d, i) => (
          <circle key={d} r="2.25" opacity="0" className={styles.signal}>
            <animateMotion dur={`${7 + i * 1.6}s`} begin={`${i * 1.9}s`} repeatCount="indefinite" path={d} keyPoints="0;1;1" keyTimes="0;0.6;1" calcMode="linear" />
            <animate attributeName="opacity" dur={`${7 + i * 1.6}s`} begin={`${i * 1.9}s`} repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.06;0.56;0.66;1" />
          </circle>
        ))}
      </g>
      {/* Resting signals (reduced motion) */}
      <g className="motion-safe:hidden">
        {edges.map((d, i) => {
          const [x, y] = nodes[(i + 1) % nodes.length]!;
          return <circle key={d} cx={x} cy={y - 13} r="2.25" className={styles.signal} />;
        })}
      </g>
    </svg>
  );
}

/** One side frame on one depth layer: its connectors plus the record shapes drifting in its gaps. */
function SideFrame({ side, depth }: { side: "left" | "right"; depth: "far" | "near" }) {
  return (
    <div className={cn(styles.frame, side === "left" ? styles.frameLeft : styles.frameRight)}>
      <Circuit side={side} />
      {drifts
        .filter((d) => d.side === side)
        .map((d) => (
          <span
            key={`${d.x}${d.y}`}
            className={cn(styles.drift, depth === "far" && styles.far, d.lgOnly && styles.lgOnly)}
            style={{ left: d.x, top: d.y, "--drift-dur": `${d.dur}s`, "--drift-delay": `${d.delay}s` } as DriftStyle}
          >
            {d.kind === "doc" ? <RecordDoc /> : <RecordRow wide={d.wide} />}
          </span>
        ))}
    </div>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className={styles.backdrop}>
      <div className={styles.grid} />
      <div className={styles.auroraRed} />
      <div className={styles.auroraWarm} />
      <div className={styles.decor}>
        {/* Each side keeps its connectors and record shapes on one depth layer, so they never slide over each other. */}
        <div className={styles.depthFar}>
          <SideFrame side="left" depth="far" />
        </div>
        <div className={styles.depthNear}>
          <SideFrame side="right" depth="near" />
        </div>
      </div>
    </div>
  );
}

/**
 * The tagline as one quiet line: from sm its three sentences in mono caps, split by small red dots; on
 * phones the plain sentence, which wraps cleanly. Screen readers get the sentence once.
 */
function Tagline({ text }: { text: string }) {
  const parts = text.split(/(?<=\.)\s+/);
  return (
    <p className="mt-5 text-night-muted">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="text-[0.9375rem] sm:hidden">
        {text}
      </span>
      <span aria-hidden className="hidden flex-wrap items-center justify-center gap-x-3 font-mono text-label uppercase sm:flex">
        {parts.map((part, i) => (
          <span key={part} className="inline-flex items-center gap-3">
            {i > 0 ? <span className="size-1 rounded-full bg-logo-red" /> : null}
            {part.replace(/\.$/, "")}
          </span>
        ))}
      </span>
    </p>
  );
}

export function OverviewHero() {
  const modules = getMrModules();
  return (
    <section
      className="on-night relative isolate overflow-clip border-b border-night-line bg-night text-night-text"
      aria-labelledby="mr-overview-title"
    >
      <Backdrop />
      <Container className="relative pb-14 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        {/* Headline block: one centred column, read top to bottom. */}
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <MrBadge tone="dark">MapleRecord</MrBadge>
          <h1 id="mr-overview-title" className={cn("mt-6 sm:mt-7", styles.title)}>
            {mrHero.headline}
          </h1>
          <p className={cn("mt-5 max-w-[44ch] text-lead sm:mt-6", styles.lead)}>{mrHero.lead}</p>
          <Tagline text={mrHero.tagline} />
          {/* Ownership line (register MR-03): MapleRecord is Maverick InnoGarage's own product. */}
          <p className="mt-3 text-sm text-night-muted">{mrHero.maker}</p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
            <ExternalLink href={mrOfficial.demo} variant="primary">
              Request a demo
            </ExternalLink>
            <ButtonLink href="#platform" variant="outline-night">
              Explore the platform
            </ButtonLink>
          </div>
        </div>

        {/*
          Product composition. The layers share one grid cell, so the box is as tall as its tallest layer
          (no shift while they animate in). md: the App dashboard plus MR Workflows in front; lg: MR Records
          behind it as well.
        */}
        <div className={cn("relative mt-12 grid sm:mt-14 lg:mt-16", styles.stage)}>
          <div className={cn("hidden lg:block", styles.behindSlot)}>
            <div className={styles.floatSlow}>
              <SideWindow screen={behind} decorative className={cn(styles.rise, styles.riseLate, styles.sideShadow)} />
            </div>
          </div>

          <div className={styles.mainSlot}>
            <div className={cn("rounded-[1.25rem] bg-white/[0.06] p-1.5 ring-1 ring-white/12 sm:p-2", styles.rise, styles.mainShadow)}>
              <figure className="overflow-hidden rounded-[0.875rem] bg-surface ring-1 ring-black/5">
                <TitleBar label={mrHero.screen.label} />
                <div className={styles.crop}>
                  <Image
                    src={mrHero.screen.src}
                    alt={mrHero.screen.alt}
                    width={mrHero.screen.width}
                    height={mrHero.screen.height}
                    sizes={mainSizes}
                    preload
                    className={styles.cropImage}
                  />
                </div>
              </figure>
            </div>
          </div>

          <div className={cn("hidden md:block", styles.frontSlot)}>
            <div className={styles.floatFast}>
              <SideWindow screen={front} className={cn(styles.rise, styles.riseLater, styles.frontShadow)} />
            </div>
          </div>
        </div>

        {/* The five modules, as links to their pages. */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12 lg:mt-14">
          <p id="mr-hero-modules" className="font-mono text-label uppercase text-night-muted">
            Five integrated modules
          </p>
          <ul aria-labelledby="mr-hero-modules" className={styles.moduleList}>
            {modules.map((m) => {
              const ModuleIcon = mrModuleIcons[m.slug];
              return (
                <li key={m.slug} className="shrink-0 snap-start">
                  <Link
                    href={`/maplerecord/platform/${m.slug}`}
                    className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-white/[0.04] pl-3 pr-4 text-sm font-medium text-night-text ring-1 ring-white/15 transition-[background-color,box-shadow] duration-200 hover:bg-white/[0.09] hover:ring-white/40"
                  >
                    <ModuleIcon aria-hidden className="size-4 text-night-muted transition-colors group-hover:text-night-text" />
                    {m.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
