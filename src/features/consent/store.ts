/**
 * Client-side consent store. Reads and writes the consent cookie, notifies subscribers (React via
 * useSyncExternalStore, and non-React code via the `mig:consent-change` window event), syncs other
 * open tabs, and deletes an optional category's cookies when its consent is withdrawn.
 * Browser-only: every function is safe to import on the server but does nothing there.
 */
import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE_DAYS,
  CONSENT_SYNC_KEY,
  CONSENT_VERSION,
  consentCategories,
  type ConsentCategory,
  type ConsentChoices,
  type ConsentRecord,
  type OptionalCategory,
} from "./config";

export const CONSENT_CHANGE_EVENT = "mig:consent-change";
export const OPEN_SETTINGS_EVENT = "mig:open-cookie-settings";
const SYNC_KEY = CONSENT_SYNC_KEY;

const isBrowser = () => typeof document !== "undefined";

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
  return match ? match.slice(name.length + 1) : null;
}

function isValidRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const r = value as Partial<ConsentRecord>;
  return (
    r.v === CONSENT_VERSION &&
    typeof r.at === "string" &&
    !!r.choices &&
    typeof r.choices.analytics === "boolean" &&
    typeof r.choices.marketing === "boolean"
  );
}

/** Parses the stored record; returns null when missing, malformed, or from an older policy version. */
export function parseConsent(raw: string | null | undefined): ConsentRecord | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    return isValidRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

let cachedRaw: string | null | undefined;
let cachedRecord: ConsentRecord | null = null;

/** Current consent, or null if the visitor hasn't decided (or their choice is outdated). Stable identity between changes. */
export function getConsent(): ConsentRecord | null {
  const raw = readCookie(CONSENT_COOKIE);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedRecord = parseConsent(raw);
  }
  return cachedRecord;
}

/** Server snapshot: always "unknown", so nothing consent-dependent renders in static HTML. */
export function getServerConsent(): ConsentRecord | null {
  return null;
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  return getConsent()?.choices[category] === true;
}

const listeners = new Set<() => void>();

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === SYNC_KEY) listener();
  };
  if (isBrowser()) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (isBrowser()) window.removeEventListener("storage", onStorage);
  };
}

function emit(record: ConsentRecord | null) {
  listeners.forEach((l) => l());
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: record }));
  try {
    // Lets other open tabs pick up the change (the storage event fires only in other tabs).
    localStorage.setItem(SYNC_KEY, String(Date.now()));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); the cookie is the source of truth.
  }
}

function cookieAttributes(maxAgeSeconds: number) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  return `; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
}

/** Deletes a cookie on this host and parent domains, since third-party scripts often set them on the registrable domain. */
function deleteCookie(name: string) {
  const parts = location.hostname.split(".");
  const domains = [""];
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; Domain=.${parts.slice(i).join(".")}`);
  for (const domain of domains) document.cookie = `${name}=; Path=/; Max-Age=0${domain}`;
}

/** Removes cookies belonging to categories the visitor has not (or no longer) consented to. */
function purgeDeniedCookies(choices: ConsentChoices) {
  const existing = document.cookie.split("; ").map((c) => c.split("=")[0] ?? "").filter(Boolean);
  for (const category of consentCategories) {
    if (category.required || choices[category.id as OptionalCategory]) continue;
    for (const cookie of category.cookies) {
      for (const name of existing) {
        if (cookie.prefix ? name.startsWith(cookie.name) : name === cookie.name) deleteCookie(name);
      }
    }
  }
}

/** Saves a decision, removes cookies for denied categories, and notifies subscribers. */
export function saveConsent(choices: ConsentChoices): ConsentRecord {
  const record: ConsentRecord = { v: CONSENT_VERSION, at: new Date().toISOString(), choices: { ...choices } };
  const previous = getConsent();
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}${cookieAttributes(CONSENT_MAX_AGE_DAYS * 24 * 60 * 60)}`;
  purgeDeniedCookies(record.choices);
  emit(record);
  // Scripts that already ran can't be unloaded: if consent for a category with live services was
  // withdrawn, reload so the page starts again without them.
  const withdrewLiveCategory = consentCategories.some(
    (c) => !c.required && c.services.length > 0 && previous?.choices[c.id as OptionalCategory] && !choices[c.id as OptionalCategory],
  );
  if (withdrewLiveCategory) window.location.reload();
  return record;
}

/** Forgets the decision (the banner shows again). */
export function clearConsent() {
  document.cookie = `${CONSENT_COOKIE}=${cookieAttributes(0)}`;
  emit(null);
}

/** Opens the cookie preferences panel from anywhere (e.g. the footer link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
