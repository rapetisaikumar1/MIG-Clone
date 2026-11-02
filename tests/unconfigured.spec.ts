import { expect, test } from "@playwright/test";

test("without delivery credentials the form says so and never claims success", async ({ page, request }) => {
  await page.goto("/contact?interest=adobe-services");
  await expect(page.getByTestId("delivery-not-configured")).toBeVisible();
  await page.getByLabel("Full name").fill("Test Person");
  await page.getByLabel("Business email").fill("test@example.com");
  await page.getByLabel("Company name").fill("Example Co");
  await page.getByLabel("How can we help?").fill("Checking the not-configured path of the contact form.");
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("aren't connected in this environment");
  await expect(page.getByText("Your message has been sent")).toHaveCount(0);

  const res = await request.post("/api/contact", {
    headers: { "x-forwarded-for": "10.2.0.1" },
    data: {
      fullName: "Test Person",
      email: "test@example.com",
      company: "Example Co",
      interest: "general",
      message: "Checking the not-configured API response.",
      startedAt: Date.now() - 10_000,
    },
  });
  expect(res.status()).toBe(503);
  expect((await res.json()).error).toBe("not_configured");
});

test("Draft Mode is unavailable without a preview secret", async ({ request }) => {
  expect((await request.get("/api/draft?secret=anything-at-all-here&slug=x")).status()).toBe(404);
});
