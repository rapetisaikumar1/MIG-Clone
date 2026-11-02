"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contactInterests, contactSchema, toFieldErrors, type ContactField, type ContactInterest, type FieldErrors } from "./schema";

type Status = "idle" | "pending" | "success" | "error";
type ServerError = "invalid" | "rate_limited" | "not_configured" | "provider_error" | "bad_request" | "spam" | "network";

const errorCopy: Record<ServerError, string> = {
  invalid: "Some details need attention. Please check the highlighted fields.",
  rate_limited: "We've received several messages from your connection in a short time. Please wait a few minutes and try again.",
  not_configured: "Online inquiries aren't connected in this environment yet, so your message was not sent. Please call one of our offices instead.",
  provider_error: "We couldn't send your message just now. Please try again shortly, or call one of our offices.",
  bad_request: "Your message couldn't be processed. Please refresh the page and try again.",
  spam: "Your message couldn't be sent. Please refresh the page and try again, or call one of our offices.",
  network: "We couldn't reach the server. Please check your connection and try again.",
};

const fieldOrder: ContactField[] = ["fullName", "email", "company", "phone", "interest", "message"];

const inputClass =
  "mt-2 block w-full rounded-xl border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/15 disabled:opacity-60";

export function ContactForm({ defaultInterest, deliveryConfigured }: { defaultInterest?: ContactInterest; deliveryConfigured: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const [attempted, setAttempted] = useState(false);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const id = useId();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function readForm() {
    const data = new FormData(formRef.current ?? undefined);
    return {
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      phone: String(data.get("phone") ?? ""),
      interest: String(data.get("interest") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      startedAt: startedAt.current || Date.now(),
    };
  }

  function revalidate() {
    if (!attempted) return;
    const result = contactSchema.safeParse(readForm());
    setErrors(result.success ? {} : toFieldErrors(result.error));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    setAttempted(true);
    setServerError(null);

    const payload = readForm();
    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      const next = toFieldErrors(result.error);
      setErrors(next);
      const first = fieldOrder.find((f) => next[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("pending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: ServerError; fieldErrors?: FieldErrors };
      if (response.ok && body.ok) {
        setStatus("success");
        return;
      }
      if (body.fieldErrors) setErrors(body.fieldErrors);
      setServerError(body.error ?? "provider_error");
      setStatus("error");
    } catch {
      setServerError("network");
      setStatus("error");
    }
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-ink bg-surface p-8 sm:p-10" role="status">
        <CheckCircle2 aria-hidden className="size-8 text-signal" />
        <h2 ref={successRef} tabIndex={-1} className="mt-5 text-h3 outline-none">
          Thank you. Your message has been sent.
        </h2>
        <p className="mt-3 max-w-[52ch] text-muted">
          Our email provider has accepted your inquiry and it is on its way to our team. We&apos;ll reply to the email address you
          provided. If your request is urgent, please call one of our offices.
        </p>
      </div>
    );
  }

  const pending = status === "pending";
  const errorCount = Object.keys(errors).length;

  const field = (name: ContactField) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
    onChange: revalidate,
    disabled: pending,
    className: cn(inputClass, errors[name] ? "border-signal" : "border-line-field"),
  });

  const label = (name: ContactField, text: string, optional = false) => (
    <label htmlFor={`${id}-${name}`} className="text-[0.9375rem] font-medium">
      {text}
      {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
    </label>
  );

  const fieldError = (name: ContactField) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-2 flex items-start gap-1.5 text-sm text-signal">
        <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={pending} aria-describedby={`${id}-required-note`}>
      {!deliveryConfigured ? (
        <div className="mb-8 flex gap-3 rounded-xl border border-line-strong bg-paper-deep p-4 text-sm" data-testid="delivery-not-configured">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-ink" />
          <p>
            <strong className="font-semibold">Preview notice:</strong> email delivery is not configured in this environment, so
            messages sent from this form will not reach Maverick InnoGarage. Please use the telephone numbers on this page.
          </p>
        </div>
      ) : null}

      {(serverError || (attempted && errorCount > 0)) && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mb-8 flex gap-3 rounded-xl border border-signal bg-surface p-4 text-sm outline-none">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0 text-signal" />
          <p>{serverError ? errorCopy[serverError] : `Please correct ${errorCount === 1 ? "1 field" : `${errorCount} fields`} below.`}</p>
        </div>
      )}

      <p id={`${id}-required-note`} className="mb-6 text-sm text-muted">
        All fields are required unless marked optional.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          {label("fullName", "Full name")}
          <input {...field("fullName")} type="text" autoComplete="name" required maxLength={100} />
          {fieldError("fullName")}
        </div>
        <div>
          {label("email", "Business email")}
          <input {...field("email")} type="email" autoComplete="email" inputMode="email" required maxLength={254} />
          {fieldError("email")}
        </div>
        <div>
          {label("company", "Company name")}
          <input {...field("company")} type="text" autoComplete="organization" required maxLength={120} />
          {fieldError("company")}
        </div>
        <div>
          {label("phone", "Telephone", true)}
          <input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" maxLength={30} />
          {fieldError("phone")}
        </div>
        <div className="sm:col-span-2">
          {label("interest", "Area of interest")}
          <select {...field("interest")} defaultValue={defaultInterest ?? ""} required className={cn(field("interest").className, "appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10")} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23111' stroke-width='1.5'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")" }}>
            <option value="" disabled>
              Select an area
            </option>
            {contactInterests.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
          </select>
          {fieldError("interest")}
        </div>
        <div className="sm:col-span-2">
          {label("message", "How can we help?")}
          <textarea {...field("message")} rows={6} required maxLength={4000} placeholder="A few sentences about your goals, systems, or timeline." />
          {fieldError("message")}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots that fill it are rejected. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[44ch] text-sm text-muted">
          We use these details only to respond to your inquiry. See our{" "}
          <Link href="/privacy" className="text-ink underline underline-offset-4">
            privacy notice
          </Link>
          .
        </p>
        <Button type="submit" disabled={pending} className="min-w-44">
          {pending ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin motion-reduce:animate-none" />
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </Button>
      </div>
    </form>
  );
}
