import "server-only";
import { adobeApplicationLabel, contactInterests, type ContactSubmission } from "@/features/contact/schema";
import { getEmailDeliveryConfig } from "@/server/env";
import { sendWithResend } from "@/server/email/resend";
import { sendWithSmtp } from "@/server/email/smtp";
import { escapeHtml, singleLine } from "./escape";

export type SubmitOutcome =
  | { status: "sent"; reference: string }
  | { status: "not_configured" }
  | { status: "provider_error" };

function interestLabel(value: ContactSubmission["interest"]) {
  return contactInterests.find((i) => i.value === value)?.label ?? value;
}

/** Adobe applications count only for Adobe inquiries; values sent with any other interest are ignored. */
function adobeApplicationsFor(input: ContactSubmission) {
  return input.interest === "adobe-services" ? input.adobeApplications : [];
}

function buildEmail(input: ContactSubmission) {
  const applications = adobeApplicationsFor(input);
  const rows: [string, string][] = [
    ["Name", input.fullName],
    ["Email", input.email],
    ["Company", input.company],
    ["Telephone", input.phone || "Not provided"],
    ["Area of interest", interestLabel(input.interest)],
  ];
  if (input.interest === "adobe-services") {
    rows.push(["Adobe applications", applications.length ? applications.map(adobeApplicationLabel).join(", ") : "Not specified"]);
  }
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#111;line-height:1.5">
<h2 style="margin:0 0 16px">New website inquiry</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#5d5a54;vertical-align:top">${k}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table>
<h3 style="margin:24px 0 8px">Message</h3>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(input.message)}</p>
</body></html>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${input.message}`;
  return {
    subject: singleLine(`Website inquiry — ${interestLabel(input.interest)} — ${input.company}`).slice(0, 200),
    html,
    text,
    replyTo: singleLine(input.email),
  };
}

/** Delivers a validated inquiry. Success is reported only when the provider accepts the message. */
export async function submitInquiry(input: ContactSubmission): Promise<SubmitOutcome> {
  const config = getEmailDeliveryConfig();
  if (!config) return { status: "not_configured" };
  // Non-personal context for logs: the interest area and how many Adobe applications were selected.
  const context = { interest: input.interest, adobeApplications: adobeApplicationsFor(input).length };
  try {
    const result = await (config.provider === "smtp" ? sendWithSmtp(config, buildEmail(input)) : sendWithResend(config, buildEmail(input)));
    if (!result.ok) {
      console.error("[contact] Provider rejected inquiry", { status: result.status, ...context });
      return { status: "provider_error" };
    }
    console.info("[contact] Inquiry accepted by provider", { reference: result.id, ...context });
    return { status: "sent", reference: result.id };
  } catch (error) {
    console.error("[contact] Provider request failed", { reason: error instanceof Error ? error.name : "unknown" });
    return { status: "provider_error" };
  }
}
