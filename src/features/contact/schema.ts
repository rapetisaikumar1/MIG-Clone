import { z } from "zod";

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

const trimmed = (min: number, max: number, label: string) =>
  z
    .string({ error: `Please enter your ${label}.` })
    .trim()
    .min(min, min <= 1 ? `Please enter your ${label}.` : `Your ${label} must be at least ${min} characters.`)
    .max(max, `Your ${label} must be ${max} characters or fewer.`);

export const contactSchema = z.object({
  fullName: trimmed(2, 100, "full name"),
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
    .regex(/^$|^\+?[0-9 ()./-]{7,30}$/, "Please enter a valid telephone number, or leave it blank.")
    .optional()
    .default(""),
  interest: z.enum(interestValues, { error: "Please choose an area of interest." }),
  message: trimmed(20, 4000, "message"),
  // Spam controls: a hidden field people never fill, and the time the form was rendered.
  website: z.string().max(0).optional().default(""),
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactSubmission = z.output<typeof contactSchema>;
export type ContactField = "fullName" | "email" | "company" | "phone" | "interest" | "message";
export type FieldErrors = Partial<Record<ContactField, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && key !== "website" && key !== "startedAt" && !(key in out)) {
      out[key as ContactField] = issue.message;
    }
  }
  return out;
}
