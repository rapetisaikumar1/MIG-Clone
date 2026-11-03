import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mrArticles } from "../src/content/maplerecord/articles";
import { mrModules } from "../src/content/maplerecord/modules";
import { mrSolutions } from "../src/content/maplerecord/solutions";

const mrPages = [
  "/maplerecord",
  "/maplerecord/platform",
  ...mrModules.map((m) => `/maplerecord/platform/${m.slug}`),
  "/maplerecord/solutions",
  ...mrSolutions.map((s) => `/maplerecord/solutions/${s.slug}`),
  "/maplerecord/resources",
  ...mrArticles.map((a) => `/maplerecord/resources/${a.slug}`),
  "/maplerecord/about",
  "/maplerecord/contact",
];

test("Explore MapleRecord on the homepage opens the MapleRecord overview", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore MapleRecord" }).click();
  await expect(page).toHaveURL(/\/maplerecord$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Manage your information ecosystem");
  await expect(page.getByRole("navigation", { name: "MapleRecord" }).getByRole("link", { name: "Overview" })).toHaveAttribute("aria-current", "page");
});

test("other Explore MapleRecord entry points reach the overview", async ({ page }) => {
  for (const from of ["/data-management", "/industries"]) {
    await page.goto(from);
    await page.getByRole("main").getByRole("link", { name: /MapleRecord/ }).first().click();
    await expect(page).toHaveURL(/\/maplerecord$/);
  }
});

test("MapleRecord sub-navigation reaches every section", async ({ page }) => {
  await page.goto("/maplerecord");
  const nav = page.getByRole("navigation", { name: "MapleRecord" });
  for (const [label, path, h1] of [
    ["Platform", "/maplerecord/platform", /Four integrated modules/],
    ["Solutions", "/maplerecord/solutions", /by industry and department/],
    ["Resources", "/maplerecord/resources", /MapleRecord blog/],
    ["About", "/maplerecord/about", /About MapleRecord/],
    ["Contact", "/maplerecord/contact", /Connect with our sales team/],
    ["Overview", "/maplerecord", /Manage your information ecosystem/],
  ] as const) {
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(h1);
    await expect(nav.getByRole("link", { name: label, exact: true })).toHaveAttribute("aria-current", "page");
  }
});

test("module tabs switch panels by mouse and keyboard, and link to module pages", async ({ page }) => {
  await page.goto("/maplerecord");
  const tabs = page.getByRole("tablist", { name: "MapleRecord modules" });
  for (const m of mrModules) {
    await tabs.getByRole("tab", { name: m.name }).click();
    const panel = page.getByRole("tabpanel", { name: m.name });
    await expect(panel).toBeVisible();
    await expect(panel).toContainText(m.summary);
    for (const h of m.highlights) await expect(panel).toContainText(h);
    const img = panel.getByRole("img", { name: m.tabImage.alt });
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((i) => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth > 0)).toBe(true);
  }
  // Keyboard: arrow keys move between tabs (roving focus)
  await tabs.getByRole("tab", { name: "MR Records" }).click();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.getByRole("tab", { name: "MR Requests" })).toBeFocused();
  await expect(tabs.getByRole("tab", { name: "MR Requests" })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tabpanel", { name: "MR Requests" }).getByRole("link", { name: "Learn more about MR Requests" }).click();
  await expect(page).toHaveURL(/\/maplerecord\/platform\/mr-requests$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/request management/i);
});

test("department tabs show each department and link to its solution", async ({ page }) => {
  await page.goto("/maplerecord");
  const tabs = page.getByRole("tablist", { name: "Departments" });
  const names = ["Finance", "Legal", "Human Resources", "Operations", "Healthcare", "Research & Development", "Customer Service"];
  for (const n of names) {
    await tabs.getByRole("tab", { name: n, exact: true }).click();
    const panel = page.getByRole("tabpanel", { name: n, exact: true });
    await expect(panel).toBeVisible();
    const img = panel.getByRole("img");
    await expect.poll(() => img.evaluate((i) => (i as HTMLImageElement).complete && (i as HTMLImageElement).naturalWidth > 0)).toBe(true);
  }
  await tabs.getByRole("tab", { name: "Legal", exact: true }).click();
  await page.getByRole("tabpanel", { name: "Legal", exact: true }).getByRole("link", { name: /legal solution/ }).click();
  await expect(page).toHaveURL(/\/maplerecord\/solutions\/legal-compliance$/);
});

test("all tab panels are present in the server-rendered HTML", async ({ request }) => {
  const html = await (await request.get("/maplerecord")).text();
  for (const m of mrModules) expect(html).toContain(m.summary);
  expect(html).toContain("FOI/RTI and legal requests resolved 2-4x faster with secure redaction");
});

test("every MapleRecord page renders, with working links, fragments and images", async ({ page, request }) => {
  test.setTimeout(180_000);
  const internal = new Set<string>();
  const external = new Map<string, { target: string | null; rel: string | null }>();
  for (const path of mrPages) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.locator("h1"), path).toHaveCount(1);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
    });
    await page.waitForLoadState("networkidle");
    // Images in inactive tab panels are hidden and lazy, so only visible images must have loaded here.
    const broken = await page.$$eval("main img", (imgs) =>
      imgs
        .filter((i) => (i as HTMLImageElement).offsetParent !== null)
        .filter((i) => !(i as HTMLImageElement).complete || (i as HTMLImageElement).naturalWidth === 0)
        .map((i) => (i as HTMLImageElement).src),
    );
    expect(broken, `${path} broken images`).toEqual([]);
    const missingAlt = await page.$$eval("main img:not([alt])", (imgs) => imgs.length);
    expect(missingAlt, path).toBe(0);
    for (const a of await page.$$eval("a[href]", (as) => as.map((a) => ({ href: a.getAttribute("href")!, target: a.getAttribute("target"), rel: a.getAttribute("rel") })))) {
      if (a.href.startsWith("/")) internal.add(a.href);
      else if (a.href.startsWith("http")) external.set(a.href, { target: a.target, rel: a.rel });
    }
  }
  const failures: string[] = [];
  for (const href of internal) {
    if (href.startsWith("/api/")) continue;
    const [pathname, hash] = href.split("#");
    const res = await request.get(pathname || "/");
    if (res.status() >= 400) failures.push(`${href} → ${res.status()}`);
    if (hash && !(await res.text()).includes(`id="${hash}"`)) failures.push(`${href} → missing #${hash}`);
  }
  expect(failures, failures.join("\n")).toEqual([]);
  // External links open in a new tab safely; MapleRecord links stay on the official domain.
  for (const [href, attrs] of external) {
    if (!href.includes("maplerecord.com")) continue;
    expect(new URL(href).hostname, href).toBe("maplerecord.com");
    expect(attrs.target, href).toBe("_blank");
    expect(attrs.rel, href).toContain("noopener");
  }
  expect([...external.keys()]).toContain("https://maplerecord.com/contact-us/#schedule-demo");
});

test("platform and solution pages show their full content", async ({ page }) => {
  const m = mrModules[0]!;
  await page.goto(`/maplerecord/platform/${m.slug}`);
  for (const s of m.how.steps) await expect(page.getByRole("heading", { name: s.title })).toBeVisible();
  for (const c of m.capabilities) await expect(page.getByRole("heading", { name: c.title })).toBeVisible();
  await page.getByRole("link", { name: "Explore capabilities" }).click();
  await expect(page).toHaveURL(/#capabilities$/);

  const s = mrSolutions.find((x) => x.slug === "state-local-government")!;
  await page.goto(`/maplerecord/solutions/${s.slug}`);
  for (const u of s.useCases.items) await expect(page.getByRole("heading", { name: u.title })).toBeVisible();
  await page.getByRole("link", { name: "Learn more about MR Records" }).click();
  await expect(page).toHaveURL(/\/maplerecord\/platform\/mr-records$/);
});

test("blog articles render in full and credit the official source", async ({ page }) => {
  const a = mrArticles.find((x) => x.slug === "roi-of-modern-records-management")!;
  await page.goto("/maplerecord/resources");
  await page.getByRole("link", { name: new RegExp(a.title) }).first().click();
  await expect(page).toHaveURL(new RegExp(`/maplerecord/resources/${a.slug}$`));
  const headings = a.blocks.filter((b) => b.type === "heading");
  for (const h of headings) if ("text" in h) await expect(page.getByRole("heading", { name: h.text, exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /Read on maplerecord.com/ })).toHaveAttribute("href", a.officialUrl);
});

test("contact page shows MapleRecord's published contact details", async ({ page }) => {
  await page.goto("/maplerecord/contact");
  await expect(page.getByRole("link", { name: "info@maplerecord.com" })).toHaveAttribute("href", "mailto:info@maplerecord.com");
  await expect(page.getByRole("link", { name: "+1 (940) 945-6180" }).first()).toHaveAttribute("href", "tel:+19409456180");
  await expect(page.getByText("739 D'Arcy St")).toBeVisible();
  await expect(page.getByText("26875 US Highway 380").first()).toBeVisible();
  await page.getByRole("main").getByRole("link", { name: "Talk to an expert", exact: true }).click();
  await expect(page).toHaveURL(/\/contact\?interest=data-management/);
  await expect(page.getByLabel("Area of interest")).toHaveValue("data-management");
});

test("unknown MapleRecord URLs return 404", async ({ request }) => {
  for (const p of ["/maplerecord/platform/mr-unknown", "/maplerecord/solutions/space", "/maplerecord/resources/nope"]) {
    expect((await request.get(p)).status(), p).toBe(404);
  }
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("sub-navigation and tabs work on a phone", async ({ page }) => {
    await page.goto("/maplerecord");
    const nav = page.getByRole("navigation", { name: "MapleRecord" });
    await nav.getByRole("link", { name: "Contact", exact: true }).click();
    await expect(page).toHaveURL(/\/maplerecord\/contact$/);
    await page.goto("/maplerecord");
    const tab = page.getByRole("tablist", { name: "Departments" }).getByRole("tab", { name: "Customer Service" });
    await tab.click();
    await expect(page.getByRole("tabpanel", { name: "Customer Service" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
  });

  test("site menu still links to MapleRecord", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "MapleRecord" }).click();
    await expect(page).toHaveURL(/\/maplerecord$/);
  });
});

for (const width of [390, 1280]) {
  test.describe(`axe WCAG 2.2 AA at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const path of ["/maplerecord", "/maplerecord/platform/mr-workflows", "/maplerecord/solutions/finance-accounting", "/maplerecord/solutions/insurance", "/maplerecord/resources/modern-records-management-enterprise-intelligence", "/maplerecord/about", "/maplerecord/contact"]) {
      test(path, async ({ page }) => {
        await page.goto(path);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`);
        expect(summary, summary.join("\n")).toEqual([]);
      });
    }
  });
}
