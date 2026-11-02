import { timingSafeEqual } from "node:crypto";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { insights } from "@/content/insights";
import { getPreviewSecret } from "@/server/env";

/** Enables Draft Mode for reviewers: /api/draft?secret=<PREVIEW_SECRET>&slug=<insight-slug> */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const expected = getPreviewSecret();
  const provided = url.searchParams.get("secret") ?? "";
  if (!expected) return new Response("Draft Mode is not configured.", { status: 404 });

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return new Response("Invalid token.", { status: 401 });

  const slug = url.searchParams.get("slug");
  const target = slug && insights.some((i) => i.slug === slug) ? `/insights/${slug}` : "/insights";
  (await draftMode()).enable();
  redirect(target);
}
