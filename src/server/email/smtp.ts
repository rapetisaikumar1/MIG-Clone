import "server-only";
import nodemailer from "nodemailer";
import type { SmtpDeliveryConfig } from "@/server/env";
import type { OutgoingEmail, SendResult } from "./resend";

/**
 * SMTP delivery for a company mailbox (Microsoft 365, Google Workspace, other mail servers).
 * Provider-specific code stays in this file. TLS is always required: implicit TLS on port 465,
 * otherwise STARTTLS is mandatory (requireTLS), so credentials are never sent in clear text.
 * The only exception is a relay on this machine (localhost), which never leaves the host.
 */
const LOOPBACK = new Set(["localhost", "127.0.0.1", "::1"]);

export async function sendWithSmtp(config: SmtpDeliveryConfig, email: OutgoingEmail): Promise<SendResult> {
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure && !LOOPBACK.has(config.host),
    auth: config.user && config.password ? { user: config.user, pass: config.password } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  try {
    const info = await transport.sendMail({
      from: config.from,
      to: config.to,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
    if (info.rejected.length > 0) return { ok: false, status: 550 };
    return { ok: true, id: info.messageId };
  } catch (error) {
    // SMTP reply codes (e.g. 535 bad credentials) when available; never log the message itself.
    const code = typeof error === "object" && error && "responseCode" in error ? Number(error.responseCode) : 0;
    return { ok: false, status: code || 502 };
  } finally {
    transport.close();
  }
}
