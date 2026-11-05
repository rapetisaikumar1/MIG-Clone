import { expect, test } from "@playwright/test";

type LdNode = { "@type": string };
/** JSON-LD types on the page; a script may hold one node or an array of nodes. */
const ldTypes = (blocks: string[]) => blocks.flatMap((b) => [JSON.parse(b) as LdNode | LdNode[]].flat()).map((d) => d["@type"]);

const products = ["experience-platform", "real-time-cdp", "experience-manager", "analytics", "target", "marketo-engage", "commerce"];

test.describe("Adobe application pages", () => {
  for (const slug of products) {
    test(`/adobe-services/${slug} has breadcrumbs, services, FAQ and valid structured data`, async ({ page }) => {
      await page.goto(`/adobe-services/${slug}`);
      const crumbs = page.getByRole("navigation", { name: "Breadcrumb" });
      await expect(crumbs.getByRole("link", { name: "Adobe Services" })).toHaveAttribute("href", "/adobe-services");
      await expect(page.locator("#services")).toBeVisible();
      await expect(page.locator("details").first()).toBeAttached();
      await expect(page.getByText("TODO", { exact: false })).toHaveCount(0);

      const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
      const types = ldTypes(blocks);
      expect(types).toEqual(expect.arrayContaining(["Organization", "BreadcrumbList", "Service", "FAQPage"]));

      // The primary CTA pre-selects this application on the contact form.
      await page.getByRole("main").getByRole("link", { name: /^Discuss your/ }).first().click();
      await expect(page).toHaveURL(new RegExp(`/contact\\?interest=adobe-services&product=${slug}`));
      await expect(page.locator(`input[type="checkbox"][value="${slug}"]`)).toBeChecked();
    });
  }

  test("unknown product slugs return 404", async ({ request }) => {
    expect((await request.get("/adobe-services/not-a-product")).status()).toBe(404);
  });
});

test("assessment CTA opens the form with Adobe Services selected and an editable prefilled message", async ({ page }) => {
  await page.goto("/adobe-services/assessment");
  await page.getByRole("main").getByRole("link", { name: "Request an assessment" }).first().click();
  await expect(page).toHaveURL(/\/contact\?interest=adobe-services&topic=assessment/);
  await expect(page.getByLabel("Area of interest")).toHaveValue("adobe-services");
  await expect(page.getByLabel("How can we help?")).toHaveValue(/Adobe platform assessment/);
});

test("service pages publish FAQ and breadcrumb structured data", async ({ page }) => {
  for (const path of ["/adobe-services", "/ai-governance", "/data-management"]) {
    await page.goto(path);
    const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = ldTypes(blocks);
    expect(types, path).toEqual(expect.arrayContaining(["BreadcrumbList", "Service", "FAQPage"]));
  }
});

test.describe("Adobe Services menu (desktop)", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("opens from the keyboard, lists every application, and closes on Escape", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    const toggle = nav.getByRole("button", { name: "Adobe Services menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    const panel = page.locator(`#${await toggle.getAttribute("aria-controls")}`);
    await expect(panel).toBeHidden();

    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    for (const slug of products) await expect(panel.locator(`a[href="/adobe-services/${slug}"]`)).toBeVisible();
    await expect(panel.locator('a[href="/adobe-services/assessment"]')).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(toggle).toBeFocused();

    await toggle.click();
    await panel.locator('a[href="/adobe-services/experience-manager"]').click();
    await expect(page).toHaveURL(/\/adobe-services\/experience-manager$/);
    await expect(panel).toBeHidden();
    await expect(nav.getByRole("link", { name: "Adobe Services", exact: true })).toHaveAttribute("aria-current", "page");
  });
});

test("mobile menu lists the Adobe applications", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await dialog.locator('a[href="/adobe-services/commerce"]').click();
  await expect(page).toHaveURL(/\/adobe-services\/commerce$/);
  await expect(dialog).toBeHidden();
});

test("footer links to every Adobe application", async ({ page }) => {
  await page.goto("/about");
  const footer = page.getByRole("contentinfo");
  for (const slug of products) await expect(footer.locator(`a[href="/adobe-services/${slug}"]`)).toHaveCount(1);
});

test("the Adobe Services hub links to every application page and the assessment", async ({ page }) => {
  await page.goto("/adobe-services");
  const main = page.getByRole("main");
  for (const slug of [...products, "assessment"]) expect(await main.locator(`a[href="/adobe-services/${slug}"]`).count(), slug).toBeGreaterThan(0);
});

test("sitemap lists the Adobe pages", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const slug of [...products, "assessment"]) expect(xml).toContain(`/adobe-services/${slug}</loc>`);
});

test("no page overflows horizontally on a small phone", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  for (const path of ["/", "/adobe-services", "/adobe-services/assessment", ...products.map((p) => `/adobe-services/${p}`), "/contact?product=analytics"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
