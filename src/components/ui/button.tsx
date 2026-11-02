import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.9375rem] font-medium tracking-[-0.005em]",
    "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary: "bg-signal text-white hover:bg-signal-hover",
        ink: "bg-ink text-paper hover:bg-ink-soft",
        outline: "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink/[0.03]",
        "outline-night": "border border-night-text/30 text-night-text hover:border-night-text hover:bg-white/5",
        light: "bg-night-text text-night hover:bg-white",
      },
      size: {
        md: "",
        sm: "min-h-10 px-4.5 text-sm",
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

/** Inline text link with a trailing arrow, used for "Learn more"-style navigation. */
export function ArrowLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-signal",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 text-signal transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  );
}
