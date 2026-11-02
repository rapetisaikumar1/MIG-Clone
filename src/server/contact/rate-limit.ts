import "server-only";

/**
 * Fixed-window limiter held in memory. It protects a single server instance only; on serverless
 * platforms each instance has its own window. For enforcement across instances, add a platform rule
 * (e.g. a Vercel Firewall rate-limit on POST /api/contact) or swap this for a shared store
 * such as Upstash Redis — see README "Abuse protection".
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, now = Date.now()) {
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }
  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  entry.count += 1;
  return { allowed: entry.count <= MAX_REQUESTS, retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000) };
}
