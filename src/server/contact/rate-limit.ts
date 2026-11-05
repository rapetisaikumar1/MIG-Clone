import "server-only";

/**
 * Fixed-window limiter held in memory. It protects a single server instance only; on serverless
 * platforms each instance has its own window. For enforcement across instances, add a platform rule
 * (e.g. a Vercel Firewall rate-limit on POST /api/contact) or swap this for a shared store
 * such as Upstash Redis — see README "Abuse protection".
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 5000;
const MAX_KEY_LENGTH = 64; // an IPv6 address is at most 45 characters
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(rawKey: string, now = Date.now()) {
  // Keys come from request headers, so bound both their length and how many are held in memory.
  const key = rawKey.slice(0, MAX_KEY_LENGTH);
  if (hits.size >= MAX_KEYS && !hits.has(key)) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    // Still full: drop the oldest windows (Map iterates in insertion order).
    for (const k of hits.keys()) {
      if (hits.size < MAX_KEYS) break;
      hits.delete(k);
    }
  }
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  entry.count += 1;
  return { allowed: entry.count <= MAX_REQUESTS, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
}
