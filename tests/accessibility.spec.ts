import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/information-governance", "/ai-governance", "/adobe-services", "/adobe-services/assessment", "/adobe-services/experience-platform", "/adobe-services/real-time-cdp", "/adobe-services/experience-manager", "/adobe-services/analytics", "/adobe-services/target", "/adobe-services/marketo-engage", "/adobe-services/commerce", "/data-management", "/maplerecord", "/industries", "/insights", "/insights/data-governance-guide", "/about", "/contact", "/privacy"];

for (const width of [390, 1280]) {
  test.describe(`axe WCAG 2.2 AA at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const path of pages) {
      test(path, async ({ page }) => {
        await page.goto(path);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`);
        expect(summary, summary.join("\n")).toEqual([]);
      });
    }
  });
}

test("contact form errors pass axe after a failed submit", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  const results = await new AxeBuilder({ page }).include("form").withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
