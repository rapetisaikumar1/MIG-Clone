"use client";

import Script, { type ScriptProps } from "next/script";
import type { ReactNode } from "react";
import type { OptionalCategory } from "./config";
import { useConsentFor } from "./hooks";

/**
 * Renders children only after the visitor consents to `category` — use it for embeds or widgets that
 * set non-essential cookies. Nothing renders on the server or before a decision.
 */
export function ConsentGate({ category, children, fallback = null }: { category: OptionalCategory; children: ReactNode; fallback?: ReactNode }) {
  return useConsentFor(category) ? children : fallback;
}

/**
 * next/script that is only injected after consent to `category`. If consent is granted later in the
 * session, the script loads then; withdrawing consent reloads the page (see saveConsent) so it stops.
 */
export function ConsentScript({ category, ...props }: ScriptProps & { category: OptionalCategory }) {
  return useConsentFor(category) ? <Script {...props} /> : null;
}
