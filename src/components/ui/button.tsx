import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium tracking-[-0.005em]",
    // `translate` (not `transform`) is what Tailwind's translate-* utilities set, so the press nudge eases too.
    "transition-[background-color,color,border-color,box-shadow,translate] duration-200 ease-out",
    "active:translate-y-px active:duration-75 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-signal text-white shadow-[0_1px_0_rgb(34_14_13/0.08)] hover:bg-signal-hover hover:shadow-[0_8px_18px_-10px_rgb(200_0_0/0.6)]",
        ink: "bg-ink text-paper hover:bg-ink-soft hover:shadow-[0_8px_18px_-10px_rgb(34_14_13/0.55)]",
        outline: "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink/[0.03]",
        "outline-night": "border border-night-text/30 text-night-text hover:border-night-text hover:bg-white/5",
        light: "bg-night-text text-night hover:bg-white",
      },
      size: {
        md: "",
        // Still a 44px touch target; only the padding and type are smaller.
        sm: "min-h-11 px-4.5 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & { arrow?: boolean };

export function ButtonLink({ className, variant, size, arrow, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow ? (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      ) : null}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/**
 * Inline text link with a trailing arrow, used for "Learn more"-style navigation. The label and the
 * arrow share one inline box, so when a long label wraps the arrow follows its last word instead of
 * standing apart at the far edge. For a plain-text label the last word and the arrow are kept
 * together, so the arrow never drops onto a line of its own (the text content stays the same).
 */
export function ArrowLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  const arrow = (
    <ArrowRight
      aria-hidden
      className="ml-2 inline-block size-4 align-[-0.125em] text-signal transition-transform duration-200 group-hover:translate-x-0.5"
    />
  );
  const split = typeof children === "string" ? children.trimEnd().lastIndexOf(" ") : -1;
  return (
    <Link
      className={cn(
        "group inline-flex min-h-11 items-center font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-signal",
        className,
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <span>
          {children.slice(0, split + 1)}
          <span className="whitespace-nowrap">
            {children.slice(split + 1).trimEnd()}
            {arrow}
          </span>
        </span>
      ) : (
        <span>
          {children}
          {arrow}
        </span>
      )}
    </Link>
  );
}
