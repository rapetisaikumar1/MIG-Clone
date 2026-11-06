"use client";

import Link from "next/link";
import { Dialog, Switch } from "radix-ui";
import { ChevronDown, Lock, X } from "lucide-react";
import { consentCategories, type CategoryInfo, type ConsentChoices, type OptionalCategory } from "./config";
import { cn } from "@/lib/utils";

const outlineButton = cn(
  "inline-flex min-h-11 items-center justify-center rounded-full border border-ink/25 px-4 text-center text-sm font-medium leading-tight text-ink",
  "transition-[background-color,border-color,translate] duration-200 ease-out hover:border-ink hover:bg-ink/[0.03] active:translate-y-px",
);

type PreferencesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Switch state being edited (seeded from the stored choice each time the panel opens). */
  draft: ConsentChoices;
  onDraftChange: (draft: ConsentChoices) => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onCloseAutoFocus: (event: Event) => void;
};

/**
 * Per-category consent panel: a centered dialog on larger screens, a bottom sheet on phones. Radix
 * supplies the focus trap, Escape to close, scroll lock, and focus return to whatever opened it.
 */
export function PreferencesDialog({
  open,
  onOpenChange,
  draft,
  onDraftChange,
  onSave,
  onAcceptAll,
  onRejectAll,
  onCloseAutoFocus,
}: PreferencesDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay fixed inset-0 z-[60] bg-ink/40" />
        <Dialog.Content
          onCloseAutoFocus={onCloseAutoFocus}
          className={cn(
            "fixed inset-x-0 bottom-0 z-[60] flex max-h-[calc(100dvh-2.5rem)] flex-col overflow-hidden rounded-t-2xl bg-surface text-ink shadow-2xl outline-none ring-1 ring-ink/10",
            "sm:inset-0 sm:m-auto sm:h-fit sm:max-h-[min(46rem,calc(100dvh-3rem))] sm:w-[calc(100vw-3rem)] sm:max-w-[36rem] sm:rounded-2xl",
            "motion-safe:transition-[opacity,translate] motion-safe:duration-300 motion-safe:ease-out-quint",
            "motion-safe:starting:translate-y-6 motion-safe:starting:opacity-0",
          )}
        >
          <header className="flex items-start justify-between gap-4 border-b border-line px-5 pt-5 pb-4 sm:px-7 sm:pt-6">
            <div>
              <p className="font-mono text-label uppercase text-muted">Privacy</p>
              <Dialog.Title className="mt-1.5 text-xl leading-tight font-semibold tracking-[-0.018em]">Cookie preferences</Dialog.Title>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="-mt-1 -mr-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 hover:bg-ink/[0.03]"
            >
              <X aria-hidden className="size-5" />
            </Dialog.Close>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7">
            <Dialog.Description className="text-sm leading-relaxed text-ink-soft">
              Choose which optional cookies we may use. Essential cookies are always on. You can change your mind at any
              time from Cookie settings in the site footer. Details are in our{" "}
              <Link
                href="/cookies"
                onClick={() => onOpenChange(false)}
                className="font-medium text-ink underline decoration-line-field underline-offset-[3px] hover:decoration-signal"
              >
                Cookie policy
              </Link>
              .
            </Dialog.Description>

            <ul className="mt-5 divide-y divide-line rounded-xl border border-line">
              {consentCategories.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  checked={category.required || draft[category.id as OptionalCategory]}
                  onCheckedChange={(checked) => onDraftChange({ ...draft, [category.id]: checked })}
                />
              ))}
            </ul>
          </div>

          <footer className="flex flex-col-reverse gap-2 border-t border-line bg-paper/60 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:px-7 sm:pb-5">
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <button type="button" className={outlineButton} onClick={onRejectAll}>
                Reject non-essential
              </button>
              <button type="button" className={outlineButton} onClick={onAcceptAll}>
                Accept all
              </button>
            </div>
            <button
              type="button"
              onClick={onSave}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-paper transition-[background-color,translate] duration-200 ease-out hover:bg-ink-soft active:translate-y-px sm:ml-auto"
            >
              Save preferences
            </button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function CategoryRow({
  category,
  checked,
  onCheckedChange,
}: {
  category: CategoryInfo;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const switchId = `consent-switch-${category.id}`;
  const descriptionId = `consent-desc-${category.id}`;
  const unused = category.services.length === 0;

  return (
    <li className="px-4 py-4 sm:px-5">
      <div className="flex min-h-11 items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <label htmlFor={switchId} className="cursor-pointer text-base font-semibold tracking-[-0.01em]">
            {category.label}
          </label>
          {category.required ? (
            <span className="font-mono text-label uppercase text-muted">Always on</span>
          ) : unused ? (
            <span className="rounded-full bg-paper-deep px-2 py-0.5 text-xs font-medium text-muted">Not currently in use</span>
          ) : null}
        </div>
        <Switch.Root
          id={switchId}
          checked={checked}
          disabled={category.required}
          onCheckedChange={onCheckedChange}
          aria-describedby={descriptionId}
          className={cn(
            "group relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200",
            "bg-line-field data-[state=checked]:bg-signal",
            "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-signal",
            // The required category is locked on: a solid neutral fill with a lock, not a faded red that reads as an error.
            "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-ink-soft",
          )}
        >
          <Switch.Thumb className="flex size-6 items-center justify-center rounded-full bg-white text-ink-soft shadow-[0_1px_3px_rgb(17_17_17/0.3)] transition-transform duration-200 ease-out data-[state=checked]:translate-x-5">
            {category.required ? <Lock aria-hidden className="size-3" strokeWidth={2.25} /> : null}
          </Switch.Thumb>
        </Switch.Root>
      </div>
      <p id={descriptionId} className="mt-1 max-w-[52ch] text-sm leading-relaxed text-ink-soft">
        {category.description}
      </p>
      {category.cookies.length > 0 ? (
        <details className="group/details mt-2">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
            Cookies used ({category.cookies.length})
            <ChevronDown aria-hidden className="size-4 text-muted transition-transform duration-200 group-open/details:rotate-180" />
          </summary>
          <dl className="mt-1 space-y-3 border-l border-line pl-4">
            {category.cookies.map((cookie) => (
              <div key={cookie.name} className="text-sm leading-relaxed">
                <dt className="font-mono text-[0.8125rem] font-medium text-ink">{cookie.name}</dt>
                <dd className="text-ink-soft">{cookie.purpose}</dd>
                <dd className="mt-0.5 font-mono text-xs text-muted">
                  {cookie.provider} · {cookie.duration}
                </dd>
              </div>
            ))}
          </dl>
        </details>
      ) : null}
    </li>
  );
}
