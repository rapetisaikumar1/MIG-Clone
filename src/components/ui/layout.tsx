import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-12", className)} {...props} />;
}

type SectionTone = "paper" | "deep" | "surface" | "night";

const toneClasses: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  deep: "bg-paper-deep text-ink",
  surface: "bg-surface text-ink",
  night: "on-night bg-night text-night-text",
};

/**
 * Vertical rhythm: "default" for primary sections, "compact" for short supporting bands (benefit
 * strips, related links). Prefer `spacing="compact"` over overriding py-* in className — a partial
 * override such as "py-16 sm:py-20" silently keeps the default lg:py-32.
 */
const spacingClasses = {
  default: "py-20 sm:py-24 lg:py-32",
  compact: "py-16 sm:py-20 lg:py-24",
} as const;

export function Section({
  tone = "paper",
  spacing = "default",
  className,
  ...props
}: ComponentProps<"section"> & { tone?: SectionTone; spacing?: keyof typeof spacingClasses }) {
  return <section className={cn(spacingClasses[spacing], toneClasses[tone], className)} {...props} />;
}

/** The logo's red i-dot, reused as the site's recurring marker. */
export function Dot({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block size-2 shrink-0 rounded-full bg-logo-red", className)} />;
}

export function Eyebrow({ children, className, tone = "light" }: { children: ReactNode; className?: string; tone?: "light" | "night" }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 font-mono text-label uppercase",
        tone === "night" ? "text-night-muted" : "text-muted",
        className,
      )}
    >
      <Dot />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "night";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={cn("text-h2", eyebrow && "mt-5")}>
        {title}
      </h2>
      {intro ? (
        <p className={cn("mt-6 max-w-[62ch] text-lead", tone === "night" ? "text-night-muted" : "text-muted")}>{intro}</p>
      ) : null}
    </div>
  );
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line-strong/70 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks hypothetical scenarios so they are never mistaken for client work. */
export function IllustrativeLabel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-paper",
        className,
      )}
    >
      Illustrative use case
    </span>
  );
}
