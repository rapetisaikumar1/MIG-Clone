import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, toFieldErrors } from "@/features/contact/schema";
import { rateLimit } from "@/server/contact/rate-limit";
import { submitInquiry } from "@/server/contact/submit";

// Runtime endpoint: never pre-rendered or cached.
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16_000;
const MIN_FILL_MS = 2_500;

type ApiError = "invalid" | "rate_limited" | "not_configured" | "provider_error" | "bad_request" | "spam";

function fail(status: number, error: ApiError, extra: Record<string, unknown> = {}, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers });
}

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients; other checks still apply
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json") || !sameOrigin(request)) {
    return fail(400, "bad_request");
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return fail(413, "bad_request");
  }

  const limit = rateLimit(clientKey(request));
  if (!limit.allowed) {
    return fail(429, "rate_limited", {}, { "Retry-After": String(limit.retryAfterSeconds) });
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return fail(413, "bad_request");
    raw = JSON.parse(text);
  } catch {
    return fail(400, "bad_request");
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = toFieldErrors(parsed.error);
    // Honeypot or timing failures alone: respond like a generic rejection without detail.
    if (Object.keys(fieldErrors).length === 0) return fail(400, "spam");
    return fail(422, "invalid", { fieldErrors });
  }

  if (parsed.data.website || Date.now() - parsed.data.startedAt < MIN_FILL_MS) {
    console.warn("[contact] Submission rejected by spam checks");
    return fail(400, "spam");
  }

  const outcome = await submitInquiry(parsed.data);
  switch (outcome.status) {
    case "sent":
      return NextResponse.json({ ok: true });
    case "not_configured":
      return fail(503, "not_configured");
    case "provider_error":
      return fail(502, "provider_error");
  }
}
