"use client";

import type { ComponentProps } from "react";
import { openCookieSettings } from "./store";

/** Reopens the cookie preferences panel. Used by the footer's "Cookie settings" link. */
export function CookieSettingsButton({ children = "Cookie settings", ...props }: Omit<ComponentProps<"button">, "onClick" | "type">) {
  return (
    <button type="button" onClick={openCookieSettings} {...props}>
      {children}
    </button>
  );
}
