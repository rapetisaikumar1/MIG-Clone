import { expect, test, type APIRequestContext } from "@playwright/test";
import { legacyRedirects } from "../src/config/redirects";

/**
 * Site-wide SEO and stability regression checks, driven by the sitemap so new routes are covered automatically.
 * Failures are collected per page and reported together, so one run lists every problem.
 */

const TITLE_SUFFIX = " · Maverick InnoGarage";

type LdNode = { "@type"?: string; "@context"?: string; [key: string]: unknown };
type ListItem = { position: number; name: string; item: string };
type Question = { name: string; acceptedAnswer?: { text?: string } };

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
}

const normalize = (s: string) => s.replace(/\s+/g, " ").trim();

test("sitemap lists each route once and every listed URL returns 200", async ({ request }) => {
  test.setTimeout(180_000);
  const paths = await sitemapPaths(request);
  // 16 static routes + 7 Adobe applications + 4 MapleRecord modules + 12 solutions + 3 resources = 42, plus published insights.
  expect(paths.length).toBeGreaterThan(42);
  expect(paths.length, "duplicate sitemap URLs").toBe(new Set(paths).size);
  const failures: string[] = [];
  for (const path of paths) {
    const res = await request.get(path, { maxRedirects: 0 });
    if (res.status() !== 200) failures.push(`${path} → ${res.status()}`);
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("every sitemap page has unique metadata, one h1, canonical, social tags and valid structured data", async ({ page, request }) => {
  test.setTimeout(480_000);
  const paths = await sitemapPaths(request);
  const failures: string[] = [];
  const titles = new Map<string, string>();
  const descriptions = new Map<string, string>();

  for (const path of paths) {
    const fail = (msg: string) => failures.push(`${path}: ${msg}`);
    const res = await page.goto(path);
    if (res?.status() !== 200) {
      fail(`status ${res?.status()}`);
      continue;
    }
    const read = () =>
      page.evaluate(() => {
        const meta = (sel: string) => document.querySelector(sel)?.getAttribute("content") ?? null;
        const crumbNav = document.querySelector('nav[aria-label="Breadcrumb"]');
        return {
          title: document.title,
          description: meta('meta[name="description"]'),
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
          ogTitle: meta('meta[property="og:title"]'),
          ogUrl: meta('meta[property="og:url"]'),
          ogImage: meta('meta[property="og:image"]'),
          twitterCard: meta('meta[name="twitter:card"]'),
          h1: document.querySelectorAll("h1").length,
          ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent ?? ""),
          crumbs: crumbNav
            ? [...crumbNav.querySelectorAll("li")].map((li) => ({
                label: (li.querySelector("a, [aria-current]")?.textContent ?? "").trim(),
                href: li.querySelector("a")?.getAttribute("href") ?? null,
              }))
            : null,
          summaries: [...document.querySelectorAll("main details summary")].map((s) => s.textContent ?? ""),
        };
      });
    // A dev-server Fast Refresh reload can destroy the context mid-read; read again once it settles.
    const d = await read().catch(async () => {
      await page.waitForLoadState("load");
      return read();
    });

    // Titles and descriptions
    if (path !== "/" && !d.title.endsWith(TITLE_SUFFIX)) fail(`title lacks suffix: "${d.title}"`);
    if (titles.has(d.title)) fail(`title "${d.title}" duplicates ${titles.get(d.title)}`);
    titles.set(d.title, path);
    if (!d.description) fail("no meta description");
    else {
      // Guard rails only: the editorial target is 70–160 characters.
      if (d.description.length < 50 || d.description.length > 220) fail(`description is ${d.description.length} chars`);
      if (descriptions.has(d.description)) fail(`description duplicates ${descriptions.get(d.description)}`);
      descriptions.set(d.description, path);
    }
    if (d.h1 !== 1) fail(`${d.h1} h1 elements`);

    // Canonical and social tags
    if (!d.canonical || new URL(d.canonical).pathname !== path) fail(`canonical ${d.canonical}`);
    if (d.ogUrl !== d.canonical) fail(`og:url ${d.ogUrl} != canonical`);
    if (d.ogTitle !== d.title) fail(`og:title "${d.ogTitle}" != title "${d.title}"`);
    if (!d.ogImage) fail("no og:image");
    if (d.twitterCard !== "summary_large_image") fail(`twitter:card ${d.twitterCard}`);

    // Structured data
    const nodes: LdNode[] = [];
    for (const block of d.ld) {
      try {
        nodes.push(...[JSON.parse(block) as LdNode | LdNode[]].flat());
      } catch (e) {
        fail(`JSON-LD does not parse: ${(e as Error).message}`);
      }
    }
    for (const n of nodes) if (n["@context"] !== "https://schema.org" || !n["@type"]) fail("JSON-LD node without @context/@type");
    const types = nodes.map((n) => n["@type"]);
    if (!types.includes("Organization")) fail("no Organization JSON-LD");
    for (const t of ["BreadcrumbList", "FAQPage", "Organization"]) if (types.filter((x) => x === t).length > 1) fail(`more than one ${t}`);

    const breadcrumb = nodes.find((n) => n["@type"] === "BreadcrumbList");
    if (breadcrumb) {
      // Visible breadcrumb trails are switched off site-wide (2026-11-09); check the list's own consistency.
      const items = breadcrumb.itemListElement as ListItem[];
      if (d.crumbs) fail("visible breadcrumb trail is shown");
      if (items[0]?.name !== "Home") fail("BreadcrumbList does not start at Home");
      items.forEach((item, i) => {
        if (item.position !== i + 1) fail(`breadcrumb position ${item.position} at index ${i}`);
        if (!item.item) fail(`breadcrumb ${i + 1} has no URL`);
      });
      if (items.length && new URL(items[items.length - 1]!.item).pathname !== path) fail(`last breadcrumb is not ${path}`);
    }

    const faq = nodes.find((n) => n["@type"] === "FAQPage");
    if (faq) {
      const questions = faq.mainEntity as Question[];
      const summaries = d.summaries.map(normalize);
      const hidden = questions.filter((q) => !summaries.includes(normalize(q.name))).map((q) => q.name);
      if (hidden.length) fail(`FAQPage questions not visible on the page: ${hidden.join(" | ")}`);
      if (questions.some((q) => !q.acceptedAnswer?.text)) fail("FAQPage question without an answer");
    }

    for (const service of nodes.filter((n) => n["@type"] === "Service")) {
      for (const key of ["name", "description", "url", "provider", "serviceType"]) if (!service[key]) fail(`Service missing ${key}`);
      if (typeof service.url === "string" && new URL(service.url).pathname !== path) fail(`Service url ${service.url}`);
    }
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("the shared Open Graph image renders as a PNG", async ({ request }) => {
  const res = await request.get("/opengraph-image");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("image/png");
});

test.describe("unknown slugs under dynamic routes return 404", () => {
  for (const path of ["/insights/not-an-article", "/adobe-services/not-a-product", "/maplerecord/platform/not-a-module", "/maplerecord/solutions/not-a-solution", "/maplerecord/resources/not-an-article"]) {
    test(path, async ({ request }) => {
      expect((await request.get(path)).status()).toBe(404);
    });
  }
});

test("legacy redirects resolve in a single hop with no chains or loops", () => {
  const sources = new Set(legacyRedirects.map((r) => r.source));
  expect(sources.size, "duplicate redirect sources").toBe(legacyRedirects.length);
  for (const r of legacyRedirects) {
    const [pathname] = r.destination.split("#");
    expect(sources.has(pathname!), `${r.source} → ${r.destination} points at another redirect`).toBe(false);
  }
});

test.describe("key pages load without console errors, failed requests or broken images", () => {
  const keyPages = [
    "/",
    "/adobe-services",
    "/adobe-services/experience-platform",
    "/adobe-services/assessment",
    "/ai-governance",
    "/data-management",
    "/contact",
    "/insights",
    "/insights/data-governance-guide",
    "/maplerecord",
    "/maplerecord/platform/mr-records",
    "/maplerecord/solutions/healthcare",
    "/maplerecord/resources/roi-of-modern-records-management",
  ];
  for (const path of keyPages) {
    test(path, async ({ page, baseURL }) => {
      const errors: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(`console: ${m.text()}`);
      });
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
      page.on("response", (r) => {
        if (r.url().startsWith(baseURL!) && r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
      });
      await page.goto(path, { waitUntil: "networkidle" });
      // Scroll so lazy images load and their requests are checked too.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 800) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 30));
        }
      });
      await page.waitForLoadState("networkidle");
      const broken = await page.$$eval("img", (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
      expect(broken, "images that failed to load").toEqual([]);
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});
