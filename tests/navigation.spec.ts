import { expect, test } from "@playwright/test";
import { legacyRedirects } from "../src/config/redirects";

const corePages = [
  "/",
  "/ai-governance",
  "/adobe-services",
  "/data-management",
  "/maplerecord",
  "/industries",
  "/insights",
  "/about",
  "/contact",
  "/privacy",
];

test.describe("core pages", () => {
  for (const path of corePages) {
    test(`${path} renders one h1, landmarks and metadata`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("header")).toBeVisible();
      await expect(page.locator("main#main")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
      await expect(page).toHaveTitle(/Maverick InnoGarage/);
      expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(new RegExp(`${path === "/" ? "/?$" : path}$`));
      expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
      const images = await page.locator("img:not([alt])").count();
      expect(images).toBe(0);
    });
  }
});

test("every internal link and fragment on core pages resolves", async ({ page, request }) => {
  test.setTimeout(120_000);
  const links = new Set<string>();
  for (const path of corePages) {
    await page.goto(path);
    const hrefs = await page.$$eval("a[href^='/']", (as) => as.map((a) => a.getAttribute("href") ?? ""));
    hrefs.forEach((h) => links.add(h));
  }
  const failures: string[] = [];
  for (const href of links) {
    if (href.startsWith("/api/")) continue;
    const [pathname, hash] = href.split("#");
    const res = await request.get(pathname || "/");
    if (res.status() >= 400) failures.push(`${href} → ${res.status()}`);
    if (hash) {
      const html = await res.text();
      if (!html.includes(`id="${hash}"`)) failures.push(`${href} → missing #${hash}`);
    }
  }
  expect(failures, failures.join("\n")).toEqual([]);
});

test("primary navigation reaches each section", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  for (const label of ["AI Governance", "Adobe Services", "Data Management", "Industries", "Insights", "About"]) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page.locator("h1")).toBeVisible();
    await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
  }
  await page.getByRole("banner").getByRole("link", { name: "Talk to an Expert" }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("mobile menu is keyboard accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Data Management" }).click();
  await expect(page).toHaveURL(/\/data-management$/);
  await expect(dialog).toBeHidden();
});

test.describe("legacy WordPress URLs", () => {
  for (const r of legacyRedirects) {
    test(`${r.source}/ → ${r.destination}`, async ({ request, baseURL }) => {
      // Old URLs end with a trailing slash; follow the chain and check where it lands.
      const res = await request.get(`${r.source}/`);
      expect(res.status()).toBe(200);
      const [path] = r.destination.split("#");
      expect(new URL(res.url()).pathname).toBe(new URL(path!, baseURL).pathname);
      const first = await request.get(r.source, { maxRedirects: 0 });
      expect(first.status()).toBe(308);
      expect(first.headers()["location"]).toBe(r.destination);
    });
  }
});

test("unknown URLs return a helpful 404", async ({ page }) => {
  const res = await page.goto("/this-page-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/couldn.t find that page/);
});

test.describe("draft insights", () => {
  const draft = "/insights/start-ai-governance-with-an-inventory";

  test("are hidden from public pages and the sitemap", async ({ page, request }) => {
    expect((await request.get(draft)).status()).toBe(404);
    await page.goto("/insights");
    await expect(page.getByText("Start AI Governance with an Inventory")).toHaveCount(0);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("start-ai-governance-with-an-inventory");
    expect(sitemap).not.toContain("records-retention-from-schedule-to-system");
    expect(sitemap).toContain("/insights/data-governance-guide");
  });

  test("are visible in Draft Mode with the preview secret, marked noindex", async ({ page, request }) => {
    expect((await request.get("/api/draft?secret=wrong-secret-value&slug=x")).status()).toBe(401);
    await page.goto(`/api/draft?secret=playwright-preview-secret&slug=start-ai-governance-with-an-inventory`);
    await expect(page).toHaveURL(new RegExp(`${draft}$`));
    await expect(page.getByText("Draft Mode is on.")).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await page.getByRole("link", { name: "Exit Draft Mode" }).click();
    expect((await page.goto(draft))?.status()).toBe(404);
  });
});

test("non-production builds are not indexable", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Disallow: \//);
});
