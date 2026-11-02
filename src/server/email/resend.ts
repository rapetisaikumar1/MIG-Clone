import "server-only";
import type { EmailDeliveryConfig } from "@/server/env";

/** Minimal Resend REST client. Provider-specific code stays in this file. */
export type OutgoingEmail = { subject: string; html: string; text: string; replyTo: string };

export type SendResult = { ok: true; id: string } | { ok: false; status: number };

export async function sendWithResend(config: EmailDeliveryConfig, email: OutgoingEmail): Promise<SendResult> {
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) return { ok: false, status: response.status };
  const body = (await response.json().catch(() => ({}))) as { id?: string };
  return { ok: true, id: body.id ?? "unknown" };
}
