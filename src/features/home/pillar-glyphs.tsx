import { BuildGlyph, JourneyGlyph, LifecycleGlyph } from "@/components/graphics/service-graphics";
import { cn } from "@/lib/utils";

type GlyphProps = { className?: string };

/*
 * Small line glyphs for the seven practice pillars on the home page. Pillars 01–03 reuse the service glyphs;
 * 04–07 are drawn here in the same language: 96×64 box, 1.5px ink strokes, hollow nodes on the card surface,
 * one solid ink shape and the logo's red dot (which grows while the card, `group/glyph`, is hovered or focused).
 */

const glyphDot =
  "fill-logo-red origin-center [transform-box:fill-box] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover/glyph:scale-[1.4] motion-safe:group-focus-within/glyph:scale-[1.4]";
const hollow = "fill-surface stroke-ink";

/** 04 Experience Design: a lens on what people see and do. */
function ExperienceGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden className={cn("h-16 w-24", className)}>
      <path d="M4 32 C18 12 50 12 64 32 C50 52 18 52 4 32 Z" className={hollow} strokeWidth="1.5" />
      <circle cx="34" cy="32" r="11" className="fill-ink" />
      <circle cx="34" cy="32" r="4" className={glyphDot} />
      <path d="M72 20 H90 M72 32 H86 M72 44 H90" className="stroke-ink" strokeWidth="1.5" />
    </svg>
  );
}

/** 05 Digital & Product: an idea built up in increments and taken to market. */
function ProductGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden className={cn("h-16 w-24", className)}>
      <path d="M4 56 H72" className="stroke-ink" strokeWidth="1.5" />
      <rect x="8" y="42" width="14" height="14" rx="2" className={hollow} strokeWidth="1.5" />
      <rect x="28" y="32" width="14" height="24" rx="2" className={hollow} strokeWidth="1.5" />
      <rect x="48" y="20" width="14" height="36" rx="2" className="fill-ink" />
      <path d="M62 20 L82 10" fill="none" className="stroke-ink" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="86" cy="8" r="5" className={glyphDot} />
    </svg>
  );
}

/** 06 Business Transformation & CRM: one rigid block realigned into connected teams. */
function TransformGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden className={cn("h-16 w-24", className)}>
      <rect x="4" y="20" width="24" height="24" rx="3" className="fill-ink" />
      <path d="M28 32 H44 M39 27 L44 32 L39 37" fill="none" className="stroke-ink" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M58 22 H76 M58 42 H76 M58 22 V42 M76 22 V42" className="stroke-ink" strokeWidth="1.5" />
      <circle cx="58" cy="22" r="5" className={hollow} strokeWidth="1.5" />
      <circle cx="76" cy="22" r="5" className={hollow} strokeWidth="1.5" />
      <circle cx="58" cy="42" r="5" className={hollow} strokeWidth="1.5" />
      <circle cx="76" cy="42" r="5" className={glyphDot} />
    </svg>
  );
}

/** 07 Records Management & Compliance: a stack of records, found and governed. */
function RecordsGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden className={cn("h-16 w-24", className)}>
      <rect x="4" y="16" width="32" height="40" rx="3" className={hollow} strokeWidth="1.5" />
      <rect x="12" y="8" width="32" height="40" rx="3" className={hollow} strokeWidth="1.5" />
      <path d="M19 20 H37 M19 28 H37 M19 36 H30" className="stroke-ink" strokeWidth="1.5" />
      <path d="M44 34 H58" className="stroke-ink" strokeWidth="1.5" />
      <circle cx="70" cy="34" r="12" className="fill-ink" />
      <circle cx="70" cy="34" r="4" className={glyphDot} />
    </svg>
  );
}

/** Glyph per pillar number in `pillarsNav`. */
export const pillarGlyphs: Record<string, (props: GlyphProps) => React.JSX.Element> = {
  "01": LifecycleGlyph,
  "02": BuildGlyph,
  "03": JourneyGlyph,
  "04": ExperienceGlyph,
  "05": ProductGlyph,
  "06": TransformGlyph,
  "07": RecordsGlyph,
};
