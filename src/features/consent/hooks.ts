"use client";

import { useSyncExternalStore } from "react";
import type { ConsentCategory } from "./config";
import { getConsent, getServerConsent, subscribeConsent } from "./store";

/** The visitor's stored decision, or null if undecided. Always null during SSR and hydration. */
export function useConsent() {
  return useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
}

/** True once the visitor has consented to `category` ("necessary" is always true). */
export function useConsentFor(category: ConsentCategory) {
  const record = useConsent();
  return category === "necessary" || record?.choices[category] === true;
}

/** False during SSR/hydration, true in the browser — for UI that must not render in static HTML. */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

const noopSubscribe = () => () => {};
