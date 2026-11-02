import { expect, test, type Page } from "@playwright/test";

// Each test gets its own client address so the per-IP rate limiter doesn't couple tests together.
let ipCounter = 10;
test.use({ extraHTTPHeaders: { "x-forwarded-for": `10.0.0.${ipCounter}` } });
test.beforeEach(async ({ context }) => {
  ipCounter += 1;
  await context.setExtraHTTPHeaders({ "x-forwarded-for": `10.0.${Math.floor(Math.random() * 250)}.${ipCounter}` });
});

const valid = {
  fullName: "Test Person",
  email: "test.person@example.com",
  company: "Example Co",
  phone: "+1 (555) 010-0000",
  interest: "data-management",
  message: "We would like to talk about data governance for our customer data.",
  website: "",
};

async function fillValid(page: Page, message = valid.message) {
  await page.getByLabel("Full name").fill(valid.fullName);
  await page.getByLabel("Business email").fill(valid.email);
  await page.getByLabel("Company name").fill(valid.company);
  await page.getByLabel("Telephone (optional)").fill(valid.phone);
  await page.getByLabel("Area of interest").selectOption(valid.interest);
  await page.getByLabel("How can we help?").fill(message);
}

test("service CTAs preselect the area of interest", async ({ page }) => {
  await page.goto("/ai-governance");
  await page.getByRole("main").getByRole("link", { name: "Talk to an Expert" }).first().click();
  await expect(page).toHaveURL(/\/contact\?interest=ai-governance/);
  await expect(page.getByLabel("Area of interest")).toHaveValue("ai-governance");
  await page.goto("/contact?interest=not-a-real-option");
  await expect(page.getByLabel("Area of interest")).toHaveValue("");
});

test("client validation explains each problem accessibly", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByTestId("delivery-not-configured")).toHaveCount(0);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("Please correct 5 fields");
  const name = page.getByLabel("Full name");
  await expect(name).toBeFocused();
  await expect(name).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Your full name must be at least 2 characters.")).toBeVisible();
  await page.getByLabel("Business email").fill("not-an-email");
  await expect(page.getByText("Please enter a valid email address")).toBeVisible();
});

test("a valid inquiry shows success only after the provider accepts it", async ({ page }) => {
  await page.goto("/contact");
  await fillValid(page);
  await page.waitForTimeout(2600);
  const responsePromise = page.waitForResponse("**/api/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("button", { name: /Sending/ })).toBeDisabled();
  expect((await responsePromise).status()).toBe(200);
  await expect(page.getByRole("heading", { name: "Thank you. Your message has been sent." })).toBeFocused();
});

test("provider failures are reported honestly", async ({ page }) => {
  await page.goto("/contact");
  await fillValid(page, "Please SIMULATE_PROVIDER_FAILURE for this test message.");
  await page.waitForTimeout(2600);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("We couldn't send your message just now");
  await expect(page.getByRole("button", { name: "Send message" })).toBeEnabled();
});

test.describe("POST /api/contact", () => {
  const post = (request: import("@playwright/test").APIRequestContext, data: unknown, ip: string, headers: Record<string, string> = {}) =>
    request.post("/api/contact", { data, headers: { "x-forwarded-for": ip, ...headers } });

  test("rejects invalid input with field errors", async ({ request }) => {
    const res = await post(request, { ...valid, email: "bad", interest: "crypto", startedAt: Date.now() - 10_000 }, "10.1.0.1");
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(Object.keys(body.fieldErrors).sort()).toEqual(["email", "interest"]);
  });

  test("rejects honeypot and too-fast submissions", async ({ request }) => {
    expect((await post(request, { ...valid, website: "http://spam", startedAt: Date.now() - 10_000 }, "10.1.0.2")).status()).toBe(400);
    expect((await post(request, { ...valid, startedAt: Date.now() }, "10.1.0.3")).status()).toBe(400);
  });

  test("rejects non-JSON and cross-origin requests", async ({ request }) => {
    const form = await request.post("/api/contact", { form: { a: "b" }, headers: { "x-forwarded-for": "10.1.0.4" } });
    expect(form.status()).toBe(400);
    const cross = await post(request, { ...valid, startedAt: Date.now() - 10_000 }, "10.1.0.5", { origin: "https://evil.example" });
    expect(cross.status()).toBe(400);
  });

  test("rate limits repeated submissions from one client", async ({ request }) => {
    const statuses: number[] = [];
    for (let i = 0; i < 6; i++) statuses.push((await post(request, { email: "x" }, "10.1.0.6")).status());
    expect(statuses.slice(0, 5).every((s) => s === 422)).toBe(true);
    expect(statuses[5]).toBe(429);
  });
});
