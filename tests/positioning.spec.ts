import { expect, test, type APIRequestContext } from "@playwright/test";

/**
 * Business positioning (owner directive, 2026-11-07; Capability Matrix, October 2026): Maverick InnoGarage
 * delivers software, platforms, engineering and professional services across seven practice pillars, and is
 * not a consultancy. These checks keep that from regressing.
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

test("the home page presents the seven Capability Matrix pillars", async ({ page }) => {
  await page.goto("/");
  const main = page.getByRole("main");
  for (const href of ["/information-governance", "/data-management", "/ai-governance", "/adobe-services", "/software-development", "/experience-design", "/digital-product", "/business-transformation", "/maplerecord", "/moli"]) {
    await expect(main.locator(`a[href="${href}"]`).first()).toBeAttached();
  }
});

test("every service page is linked from the footer", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  for (const href of ["/information-governance", "/data-management", "/ai-governance", "/adobe-services", "/software-development", "/experience-design", "/digital-product", "/business-transformation"]) {
    await expect(footer.locator(`a[href="${href}"]`)).toHaveCount(1);
  }
});

test("the site leads with the four core areas: information, data and AI governance, and MarTech", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  await nav.getByRole("button", { name: "Services menu", exact: true }).click();
  for (const href of ["/information-governance", "/data-management", "/ai-governance", "/adobe-services"]) {
    await expect(nav.locator(`a[href="${href}"]`).first()).toBeVisible();
  }
  // Adobe is MarTech's platform, not the headline of the business.
  await expect(page.locator("h1")).not.toContainText(/adobe/i);
});
