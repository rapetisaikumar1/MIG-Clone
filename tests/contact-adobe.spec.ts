import { expect, test, type APIRequestContext, type Page } from "@playwright/test";

// Each test gets its own client address so the per-IP rate limiter doesn't couple tests together.
let ipCounter = 10;
test.beforeEach(async ({ context }) => {
  ipCounter += 1;
  await context.setExtraHTTPHeaders({ "x-forwarded-for": `10.3.${Math.floor(Math.random() * 250)}.${ipCounter}` });
});

const valid = {
  fullName: "Test Person",
  email: "test.person@example.com",
  company: "Example Co",
  phone: "",
  interest: "adobe-services",
  message: "We would like to review our Adobe Experience Manager and Analytics setup.",
  website: "",
};

const applicationsGroup = (page: Page) => page.getByRole("group", { name: "Which Adobe applications are involved? (optional)" });

async function fillContactDetails(page: Page) {
  await page.getByLabel("Full name").fill(valid.fullName);
  await page.getByLabel("Business email").fill(valid.email);
  await page.getByLabel("Company name").fill(valid.company);
  await page.getByLabel("How can we help?").fill(valid.message);
}

test("product links preselect Adobe Services and pre-tick the product", async ({ page }) => {
  await page.goto("/contact?product=experience-manager");
  await expect(page.getByLabel("Area of interest")).toHaveValue("adobe-services");
  await expect(applicationsGroup(page)).toBeVisible();
  await expect(page.getByRole("checkbox", { name: "Adobe Experience Manager" })).toBeChecked();
  await expect(page.getByRole("checkbox", { name: "Adobe Analytics" })).not.toBeChecked();

  // Unknown slugs are ignored and don't change the interest.
  await page.goto("/contact?product=not-a-product");
  await expect(page.getByLabel("Area of interest")).toHaveValue("");
  await expect(applicationsGroup(page)).toHaveCount(0);

  // An explicit, valid interest wins over the product default.
  await page.goto("/contact?interest=data-management&product=analytics");
  await expect(page.getByLabel("Area of interest")).toHaveValue("data-management");
  await expect(applicationsGroup(page)).toHaveCount(0);
});

test("the Adobe applications fieldset only shows for Adobe Services", async ({ page }) => {
  await page.goto("/contact");
  await expect(applicationsGroup(page)).toHaveCount(0);
  const interest = page.getByLabel("Area of interest");
  await interest.selectOption("adobe-services");
  await expect(applicationsGroup(page)).toBeVisible();
  await expect(applicationsGroup(page).getByRole("checkbox")).toHaveCount(8);
  await page.getByRole("checkbox", { name: "Adobe Target" }).check();
  for (const other of ["ai-governance", "data-management", "general"]) {
    await interest.selectOption(other);
    await expect(applicationsGroup(page)).toHaveCount(0);
  }
  // Ticks are kept while the fieldset is hidden.
  await interest.selectOption("adobe-services");
  await expect(page.getByRole("checkbox", { name: "Adobe Target" })).toBeChecked();
});

test("hidden Adobe ticks are not submitted for another interest", async ({ page }) => {
  await page.goto("/contact?product=analytics");
  await fillContactDetails(page);
  await page.getByLabel("Area of interest").selectOption("general");
  await page.waitForTimeout(2600);
  const requestPromise = page.waitForRequest("**/api/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  expect((await requestPromise).postDataJSON().adobeApplications).toEqual([]);
  await expect(page.getByRole("heading", { name: "Thank you. Your message has been sent." })).toBeFocused();
});

test("an Adobe inquiry with applications is sent", async ({ page }) => {
  await page.goto("/contact?product=experience-manager");
  await fillContactDetails(page);
  await page.getByRole("checkbox", { name: "Adobe Analytics" }).check();
  await page.waitForTimeout(2600);
  const responsePromise = page.waitForResponse("**/api/contact");
  await page.getByRole("button", { name: "Send message" }).click();
  const response = await responsePromise;
  expect(response.status()).toBe(200);
  expect(response.request().postDataJSON().adobeApplications).toEqual(["experience-manager", "analytics"]);
  await expect(page.getByRole("heading", { name: "Thank you. Your message has been sent." })).toBeFocused();
});

test.describe("POST /api/contact with adobeApplications", () => {
  const post = (request: APIRequestContext, data: unknown, ip: string) =>
    request.post("/api/contact", { data, headers: { "x-forwarded-for": ip } });

  test("accepts known applications", async ({ request }) => {
    const res = await post(request, { ...valid, adobeApplications: ["target", "commerce"], startedAt: Date.now() - 10_000 }, "10.4.0.1");
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  test("rejects unknown, duplicate or too many applications as invalid", async ({ request }) => {
    const all = ["experience-platform", "real-time-cdp", "experience-manager", "analytics", "target", "marketo-engage", "commerce"];
    const cases: [string, unknown][] = [
      ["10.4.0.2", ["experience-manager", "photoshop"]],
      ["10.4.0.3", ["analytics", "analytics"]],
      ["10.4.0.4", [...all, "analytics"]],
      ["10.4.0.5", "analytics"],
    ];
    for (const [ip, adobeApplications] of cases) {
      const res = await post(request, { ...valid, adobeApplications, startedAt: Date.now() - 10_000 }, ip);
      expect(res.status()).toBe(422);
      const body = await res.json();
      expect(body.error).toBe("invalid");
      expect(Object.keys(body.fieldErrors)).toEqual(["adobeApplications"]);
    }
  });
});
