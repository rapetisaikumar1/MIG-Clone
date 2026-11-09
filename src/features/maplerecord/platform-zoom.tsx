"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Maximize2, X } from "lucide-react";
import type { MrImage } from "@/lib/content/types";

/**
 * Click-to-enlarge for a product screen. Without JavaScript it is a plain link to the full-size image; with
 * JavaScript it opens the screen at full resolution in a native modal <dialog> (Escape, the close button or a
 * click on the backdrop close it). The large image is only requested once the dialog is first opened. On
 * phones the screen is shown wider than the viewport, so it can be panned and read.
 */
export function MrZoomFrame({ image, label, children }: { image: MrImage; label: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [opened, setOpened] = useState(false);

  const open = (e: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, download) through to the image itself.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || !dialog.current?.showModal) return;
    e.preventDefault();
    setOpened(true);
    dialog.current.showModal();
  };

  return (
    <>
      <a
        href={image.src}
        onClick={open}
        aria-label={`Enlarge screen: ${label}`}
        aria-haspopup="dialog"
        className="group/zoom relative block cursor-zoom-in focus-visible:outline-offset-[-3px]"
      >
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 inline-flex h-8 items-center gap-1.5 rounded-full bg-ink/80 px-3 text-xs font-medium text-white shadow-sm ring-1 ring-white/10 transition-transform duration-200 group-hover/zoom:-translate-y-0.5"
        >
          <Maximize2 className="size-3.5" />
          Enlarge
        </span>
      </a>
      <dialog
        ref={dialog}
        aria-label={label}
        onClick={(e) => {
          // A click on the backdrop lands on the <dialog> element itself.
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-[92dvh] w-[96vw] max-w-none overflow-hidden rounded-2xl md:w-fit bg-surface p-0 text-ink shadow-[0_40px_120px_-24px_rgb(0_0_0/0.6)] ring-1 ring-ink/10 backdrop:bg-[rgb(17_17_17/0.78)]"
      >
        <div className="flex items-center gap-3 border-b border-line py-1.5 pl-5 pr-1.5">
          <p className="min-w-0 flex-1 truncate text-sm font-medium">{label}</p>
          <p className="hidden text-xs text-muted max-md:block">Scroll to pan</p>
          <form method="dialog">
            <button type="submit" className="inline-flex size-11 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-paper hover:text-ink" aria-label="Close">
              <X aria-hidden className="size-5" />
            </button>
          </form>
        </div>
        <div className="max-h-[calc(92dvh-3.625rem)] overflow-auto overscroll-contain">
          {opened ? (
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 768px) min(96vw, 148dvh), 56rem"
              // Phones: wider than the screen, to pan. From md: the whole screen, as large as the viewport allows.
              // bg-paper-deep: a warm placeholder (as in MrWindow) while the full-size screen loads, not a blank white sheet.
              className="block h-auto w-[56rem] max-w-none bg-paper-deep md:w-[min(96vw,calc((92dvh-3.625rem)*1.6))]"
            />
          ) : null}
        </div>
      </dialog>
    </>
  );
}
