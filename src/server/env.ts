import "server-only";
import { z } from "zod";

/**
 * Server-only configuration. Everything here is optional so a preview without credentials still
 * builds and runs; features that need a value report themselves as "not configured" instead.
 */
const optional = z
  .string()
  .trim()
  .optional()
  .transform((v) => (v ? v : undefined));

const schema = z.object({
  RESEND_API_KEY: optional,
  CONTACT_TO_EMAIL: optional.pipe(z.email().optional()),
  CONTACT_FROM_EMAIL: optional,
  PREVIEW_SECRET: optional.pipe(z.string().min(16).optional()),
  // Test hook: point delivery at a local mock provider. Leave unset in real deployments.
  RESEND_API_URL: optional.pipe(z.url().optional()),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  // Log names only, never values.
  console.error("[env] Invalid server configuration:", parsed.error.issues.map((i) => i.path.join(".")).join(", "));
}

const env = parsed.success ? parsed.data : schema.parse({});

export type EmailDeliveryConfig = { apiKey: string; to: string; from: string; endpoint: string };

export function getEmailDeliveryConfig(): EmailDeliveryConfig | null {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) return null;
  return {
    apiKey: RESEND_API_KEY,
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL,
    endpoint: env.RESEND_API_URL ?? "https://api.resend.com/emails",
  };
}

export function isContactDeliveryConfigured() {
  return getEmailDeliveryConfig() !== null;
}

export function getPreviewSecret() {
  return env.PREVIEW_SECRET ?? null;
}
