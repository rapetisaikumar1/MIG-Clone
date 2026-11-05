import { NextResponse, type NextRequest } from "next/server";
import { contactSchema, MIN_FILL_MS, toFieldErrors } from "@/features/contact/schema";
import { rateLimit } from "@/server/contact/rate-limit";
import { submitInquiry } from "@/server/contact/submit";

// Runtime endpoint: never pre-rendered or cached.
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16_000;

type ApiError = "invalid" | "rate_limited" | "not_configured" | "provider_error" | "bad_request" | "spam";

function fail(status: number, error: ApiError, extra: Record<string, unknown> = {}, headers?: HeadersInit) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers });
}

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

/** Exact media type check: "text/plain; x=application/json" must not pass. */
function isJson(request: NextRequest) {
  const type = request.headers.get("content-type")?.split(";")[0]?.trim().toLowerCase();
  return type === "application/json";
}

function sameOrigin(request: NextRequest) {
  // Browsers send Fetch Metadata; anything other than a same-origin (or user-initiated) request is refused.
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients; other checks still apply
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/**
 * Reads the body up to MAX_BODY_BYTES (counted in bytes, not characters) and stops reading beyond
 * that, so a chunked request without Content-Length can't make the server buffer an unbounded body.
 * Returns null when the limit is exceeded.
 */
async function readBody(request: NextRequest): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export async function POST(request: NextRequest) {
  if (!isJson(request) || !sameOrigin(request)) {
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
    const text = await readBody(request);
    if (text === null) return fail(413, "bad_request");
    raw = JSON.parse(text);
  } catch {
    return fail(400, "bad_request");
  }
  // The payload must be a JSON object; null, arrays and primitives are malformed requests, not spam.
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return fail(400, "bad_request");

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = toFieldErrors(parsed.error);
    // Honeypot or timing failures alone: respond like a generic rejection without detail.
    if (Object.keys(fieldErrors).length === 0) return fail(400, "spam");
    return fail(422, "invalid", { fieldErrors });
  }

  // Prefer the client-measured fill time: comparing startedAt with the server clock would reject
  // every visitor whose device clock runs ahead of the server's.
  const elapsedMs = parsed.data.fillMs ?? Date.now() - parsed.data.startedAt;
  if (parsed.data.website || elapsedMs < MIN_FILL_MS) {
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
