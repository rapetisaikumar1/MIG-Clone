"use client";

import Link from "next/link";
import type { Ref } from "react";
import { Cookie } from "lucide-react";
import { cn } from "@/lib/utils";

/** Accept and reject share one style so rejecting is exactly as easy and as visible as accepting. */
export const choiceButton = cn(
  "inline-flex min-h-11 items-center justify-center rounded-full px-3 text-center text-sm font-medium leading-tight sm:px-4",
  "bg-ink text-paper transition-[background-color,transform] duration-200 ease-out hover:bg-ink-soft active:translate-y-px",
);

type ConsentBannerProps = {
  ref?: Ref<HTMLElement>;
  /** True while the preferences panel is open: the banner stays mounted (so focus can return to it) but is hidden. */
  concealed: boolean;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onManage: () => void;
};

/**
 * First-visit consent notice. Non-modal and fixed, so it never shifts the page: a bottom sheet on
 * phones (capped at half the viewport, scrolling if needed), a card in the bottom-left corner above.
 */
export function ConsentBanner({ ref, concealed, onAcceptAll, onRejectAll, onManage }: ConsentBannerProps) {
  return (
    <section
      ref={ref}
      role="region"
      aria-label="Cookie consent"
      aria-describedby="cookie-consent-text"
      data-cookie-banner=""
      className={cn(
        "fixed inset-x-0 bottom-0 z-[45] max-h-[50dvh] overflow-y-auto overscroll-contain",
        "rounded-t-2xl bg-surface px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-ink ring-1 ring-ink/10",
        "shadow-[0_-12px_40px_-12px_rgb(17_17_17/0.25)]",
        "sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100vw-3rem)] sm:max-w-[28rem] sm:rounded-2xl sm:p-6",
        "sm:shadow-[0_24px_60px_-20px_rgb(17_17_17/0.35),0_2px_6px_rgb(17_17_17/0.06)]",
        "motion-safe:transition-[opacity,translate] motion-safe:duration-500 motion-safe:ease-out-quint",
        "motion-safe:starting:translate-y-4 motion-safe:starting:opacity-0",
        concealed && "invisible",
      )}
    >
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-paper-deep text-ink">
          <Cookie className="size-4" strokeWidth={1.75} />
        </span>
        <p className="font-mono text-label uppercase text-muted">Cookies</p>
      </div>
      <h2 className="mt-3 text-lg leading-snug font-semibold tracking-[-0.012em]">Your privacy, your choice</h2>
      <p id="cookie-consent-text" className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        We use only essential cookies, to run the site and remember this choice. Optional analytics and marketing
        cookies stay off unless you allow them. See our{" "}
        <Link href="/privacy" className="font-medium text-ink underline decoration-line-field underline-offset-[3px] hover:decoration-signal">
          Privacy notice
        </Link>{" "}
        and{" "}
        <Link href="/cookies" className="font-medium text-ink underline decoration-line-field underline-offset-[3px] hover:decoration-signal">
          Cookie policy
        </Link>
        .
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className={choiceButton} onClick={onRejectAll}>
          Reject non-essential
        </button>
        <button type="button" className={choiceButton} onClick={onAcceptAll}>
          Accept all
        </button>
      </div>
      <button
        type="button"
        onClick={onManage}
        className="mt-1.5 inline-flex min-h-11 w-full items-center justify-center rounded-full text-sm font-medium text-ink underline decoration-line-field underline-offset-4 transition-colors hover:decoration-signal"
      >
        Manage preferences
      </button>
    </section>
  );
}
