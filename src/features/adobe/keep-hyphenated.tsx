import type { ReactNode } from "react";

/**
 * Text would otherwise break names at their hyphen ("Real-" / "Time CDP", "Consent-" / "aware").
 * Wraps each hyphenated word in a no-wrap span; plain strings pass through unchanged.
 * Meant for headings and short labels; body copy may break at hyphens as usual.
 */
export function keepHyphenatedWords(text: string): ReactNode {
  const parts = text.split(/(\S+-\S+)/);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
