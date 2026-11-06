import { expect, test, type APIRequestContext } from "@playwright/test";

/**
 * Business positioning (owner directive, 2026-11-07): Maverick InnoGarage is a software development and
 * professional services company, not a consultancy. These checks keep that from regressing.
 */

async function sitemapPaths(request: APIRequestContext) {
  const xml = await (await request.get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]!).pathname);
}

// Self-descriptions that must never appear. Legitimate uses elsewhere (client examples such as
// "a financial services firm", "legal advisers", MapleRecord customer segments) don't match these.
const banned = /\b(independent consultancy|a consultancy|focused consultancy|consulting firm|consulting team|consulting services|our consultants)\b/i;

test("no page describes Maverick InnoGarage as a consultancy (text, title, meta or structured data)", async ({ request }) => {
  test.setTimeout(120_000);
  const failures: string[] = [];
  for (const path of await sitemapPaths(request)) {
    const html = await (await request.get(path)).text();
    const match = html.match(banned);
    if (match) failures.push(`${path}: "${match[0]}"`);
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("the company is described as a software development and professional services company", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /software development and professional services/i);
  await page.goto("/");
  await expect(page.getByRole("main")).toContainText(/software development and professional services company/i);
});

test("Software Development is linked site-wide but not added to the desktop header", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/software-development");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await expect(nav.locator('a[href="/software-development"]')).toHaveCount(0);
  await expect(page.getByRole("main").locator('a[href="/software-development"]').first()).toBeVisible();
  await expect(page.getByRole("contentinfo").locator('a[href="/software-development"]')).toHaveCount(1);
});
