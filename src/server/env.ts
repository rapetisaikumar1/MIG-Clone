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
  // SMTP (company mailbox: Microsoft 365, Google Workspace, other mail servers). Preferred when set.
  SMTP_HOST: optional,
  SMTP_PORT: optional.transform((v) => (v === undefined ? undefined : Number(v))).pipe(z.number().int().min(1).max(65535).optional()),
  // "true" for implicit TLS (port 465). Leave unset/false for STARTTLS (port 587).
  SMTP_SECURE: optional,
  SMTP_USER: optional,
  SMTP_PASSWORD: optional,
  // Resend (https://resend.com) — alternative HTTP provider.
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

type Addresses = { to: string; from: string };
export type SmtpDeliveryConfig = Addresses & {
  provider: "smtp";
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  password?: string;
};
export type ResendDeliveryConfig = Addresses & { provider: "resend"; apiKey: string; endpoint: string };
export type EmailDeliveryConfig = SmtpDeliveryConfig | ResendDeliveryConfig;

/**
 * Delivery settings, or null when incomplete (the form then shows a contact fallback and the API
 * returns 503 instead of pretending to send). SMTP wins when SMTP_HOST is set; otherwise Resend.
 */
export function getEmailDeliveryConfig(): EmailDeliveryConfig | null {
  const { CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = env;
  if (!to || !from) return null;
  if (env.SMTP_HOST) {
    const secure = env.SMTP_SECURE === "true" || (env.SMTP_SECURE === undefined && env.SMTP_PORT === 465);
    // Username and password go together; a server without authentication needs neither.
    if (Boolean(env.SMTP_USER) !== Boolean(env.SMTP_PASSWORD)) return null;
    return {
      provider: "smtp",
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? (secure ? 465 : 587),
      secure,
      user: env.SMTP_USER,
      password: env.SMTP_PASSWORD,
      to,
      from,
    };
  }
  if (env.RESEND_API_KEY) {
    return { provider: "resend", apiKey: env.RESEND_API_KEY, endpoint: env.RESEND_API_URL ?? "https://api.resend.com/emails", to, from };
  }
  return null;
}

export function isContactDeliveryConfigured() {
  return getEmailDeliveryConfig() !== null;
}

export function getPreviewSecret() {
  return env.PREVIEW_SECRET ?? null;
}
