import { z } from "zod";
import type { AdobeProductSlug } from "@/lib/content/types";

/** Shared by the client form (usability) and the API route (enforcement). Contains no secrets. */
export const contactInterests = [
  { value: "ai-governance", label: "AI Governance" },
  { value: "adobe-services", label: "Adobe Services" },
  { value: "data-management", label: "Data Management" },
  { value: "general", label: "General Inquiry" },
] as const;

export type ContactInterest = (typeof contactInterests)[number]["value"];

const interestValues = contactInterests.map((i) => i.value) as [ContactInterest, ...ContactInterest[]];

export function isContactInterest(value: unknown): value is ContactInterest {
  return typeof value === "string" && (interestValues as string[]).includes(value);
}

/**
 * Adobe applications an inquiry can concern (optional, shown when the interest is Adobe Services).
 * Defined here rather than imported from src/content/adobe because this module ships to the client.
 * Leaving every box unticked means "not specified", so there is no separate "not sure" option.
 */
export const adobeApplications = [
  { value: "experience-platform", label: "Adobe Experience Platform" },
  { value: "real-time-cdp", label: "Real-Time CDP" },
  { value: "experience-manager", label: "Adobe Experience Manager" },
  { value: "analytics", label: "Adobe Analytics" },
  { value: "target", label: "Adobe Target" },
  { value: "marketo-engage", label: "Adobe Marketo Engage" },
  { value: "commerce", label: "Adobe Commerce" },
] as const;

export type AdobeApplication = (typeof adobeApplications)[number]["value"];

// Compile-time guard: type-checking fails if this list drifts from the product pages' AdobeProductSlug union.
type SameUnion<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
export const adobeApplicationsMatchProducts: SameUnion<AdobeApplication, AdobeProductSlug> = true;

const adobeApplicationValues = adobeApplications.map((a) => a.value) as [AdobeApplication, ...AdobeApplication[]];
export const MAX_ADOBE_APPLICATIONS = 7;

export function isAdobeApplication(value: unknown): value is AdobeApplication {
  return typeof value === "string" && (adobeApplicationValues as string[]).includes(value);
}

export function adobeApplicationLabel(value: AdobeApplication) {
  return adobeApplications.find((a) => a.value === value)?.label ?? value;
}

/** Minimum time between the form rendering and its submission; faster posts are treated as automated. */
export const MIN_FILL_MS = 2_500;

// Values must contain real characters, not only punctuation or invisible ones such as zero-width spaces.
const LETTER = /\p{L}/u;
const LETTER_OR_DIGIT = /[\p{L}\p{N}]/u;

const trimmed = (min: number, max: number, label: string, mustContain: RegExp = LETTER_OR_DIGIT) =>
  z
    .string({ error: `Please enter your ${label}.` })
    .trim()
    .min(min, min <= 1 ? `Please enter your ${label}.` : `Your ${label} must be at least ${min} characters.`)
    .max(max, `Your ${label} must be ${max} characters or fewer.`)
    .regex(mustContain, `Please enter your ${label}.`);

// Digits with common separators, an optional leading "+", and an optional extension ("x123", "ext. 123").
const PHONE = /^\+?[0-9 ()./-]{7,30}(?:\s*(?:x|ext\.?|extension)\s*[0-9]{1,6})?$/i;
const MIN_PHONE_DIGITS = 7;

export const contactSchema = z.object({
  fullName: trimmed(2, 100, "full name", LETTER),
  email: z
    .string({ error: "Please enter your business email." })
    .trim()
    .max(254, "Email must be 254 characters or fewer.")
    .pipe(z.email({ error: "Please enter a valid email address, like name@company.com." })),
  company: trimmed(1, 120, "company name"),
  phone: z
    .string()
    .trim()
    .max(30, "Telephone must be 30 characters or fewer.")
    .refine(
      (value) => value === "" || (PHONE.test(value) && (value.match(/[0-9]/g)?.length ?? 0) >= MIN_PHONE_DIGITS),
      "Please enter a valid telephone number, or leave it blank.",
    )
    .optional()
    .default(""),
  interest: z.enum(interestValues, { error: "Please choose an area of interest." }),
  message: trimmed(20, 4000, "message"),
  // Only meaningful when interest is "adobe-services"; the form omits it otherwise and the server ignores it.
  adobeApplications: z
    .array(z.enum(adobeApplicationValues, { error: "Please choose from the listed Adobe applications." }), {
      error: "Please choose from the listed Adobe applications.",
    })
    .max(MAX_ADOBE_APPLICATIONS, `Please choose up to ${MAX_ADOBE_APPLICATIONS} Adobe applications.`)
    .refine((values) => new Set(values).size === values.length, "Please choose each Adobe application only once.")
    .optional()
    .default([]),
  // Spam controls: a hidden field people never fill, and the time the form was rendered.
  website: z.string().max(0).optional().default(""),
  startedAt: z.number().int().positive(),
  // Milliseconds the visitor spent on the form, measured on their own clock. Preferred over
  // startedAt, which is compared with the server clock and so is distorted by device clock skew.
  fillMs: z.number().int().nonnegative().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactSubmission = z.output<typeof contactSchema>;
export type ContactField = "fullName" | "email" | "company" | "phone" | "interest" | "adobeApplications" | "message";
export type FieldErrors = Partial<Record<ContactField, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    // path[0] is the field; array-item issues (e.g. ["adobeApplications", 2]) map to their field too.
    const key = issue.path[0];
    if (typeof key === "string" && key !== "website" && key !== "startedAt" && key !== "fillMs" && !(key in out)) {
      out[key as ContactField] = issue.message;
    }
  }
  return out;
}
