/**
 * Cookie consent configuration — the single source of truth for categories, the cookies each one
 * sets, and the services that load under it. The cookie policy page, the preferences panel and the
 * consent store all read from here.
 *
 * Reviewed 2026-11-06: this site sets no analytics, advertising or third-party cookies, loads no
 * third-party scripts, and self-hosts its fonts. Only essential cookies exist today. The optional
 * categories are wired end to end (gating, storage, withdrawal clean-up) so that any service added
 * later is blocked until the visitor consents. To add one, list it under its category's `services`
 * and `cookies`, load it with <ConsentScript category="…"> or <ConsentGate category="…">, and bump
 * CONSENT_VERSION so returning visitors are asked again.
 */

/** Bump when categories or services change materially; stored choices from older versions are discarded. */
export const CONSENT_VERSION = 1;

/** First-party cookie that stores the visitor's choice (essential). */
export const CONSENT_COOKIE = "mig_consent";

/** localStorage key used only to tell other open tabs that the choice changed (holds a timestamp). */
export const CONSENT_SYNC_KEY = "mig_consent_sync";

/** How long a choice is remembered before the visitor is asked again (days). */
export const CONSENT_MAX_AGE_DAYS = 180;

export type OptionalCategory = "analytics" | "marketing";
export type ConsentCategory = "necessary" | OptionalCategory;

export type CookieInfo = {
  name: string;
  /** Who sets it ("Maverick InnoGarage" for first-party cookies). */
  provider: string;
  purpose: string;
  duration: string;
  /** Prefix match (e.g. "_ga" matches "_ga_ABC123"). Used for clean-up when consent is withdrawn. */
  prefix?: boolean;
};

export type CategoryInfo = {
  id: ConsentCategory;
  label: string;
  description: string;
  /** Essential categories can't be switched off. */
  required: boolean;
  /** Services that load under this category. Empty means nothing in this category is in use today. */
  services: { name: string; provider: string }[];
  cookies: CookieInfo[];
};

export const consentCategories: CategoryInfo[] = [
  {
    id: "necessary",
    label: "Essential",
    description:
      "Needed for the site to work and to remember your cookie choice. They don't track you and can't be switched off.",
    required: true,
    services: [{ name: "Website", provider: "Maverick InnoGarage" }],
    cookies: [
      {
        name: CONSENT_COOKIE,
        provider: "Maverick InnoGarage",
        purpose: "Remembers your cookie choices so we don't ask on every visit.",
        duration: `${CONSENT_MAX_AGE_DAYS} days`,
      },
      {
        name: "__prerender_bypass",
        provider: "Maverick InnoGarage",
        purpose: "Set only for our editors when they preview unpublished articles. Visitors never receive it.",
        duration: "Session",
      },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Would help us understand how visitors use the site so we can improve it. We don't use any analytics tools today, so nothing loads in this category.",
    required: false,
    services: [],
    cookies: [],
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Would be used to measure campaigns or show relevant content on other sites. We don't use any marketing or advertising tools today, so nothing loads in this category.",
    required: false,
    services: [],
    cookies: [],
  },
];

export const optionalCategories = consentCategories.filter((c): c is CategoryInfo & { id: OptionalCategory } => !c.required);

export type ConsentChoices = Record<OptionalCategory, boolean>;

/** Stored consent record (serialized into CONSENT_COOKIE). */
export type ConsentRecord = {
  v: number;
  /** ISO timestamp of the decision. */
  at: string;
  choices: ConsentChoices;
};

export const allGranted: ConsentChoices = { analytics: true, marketing: true };
export const allDenied: ConsentChoices = { analytics: false, marketing: false };
