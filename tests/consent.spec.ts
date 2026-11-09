import AxeBuilder from "@axe-core/playwright";
import { expect as baseExpect, test, type BrowserContext, type Locator, type Page } from "@playwright/test";

/**
 * Cookie consent: banner, preferences dialog, stored choice, and proof that nothing non-essential
 * loads. Starts every test as a first-time visitor (the shared config pre-sets a consent cookie).
 */
test.use({ storageState: { cookies: [], origins: [] } });

// The banner renders only after hydration, which can be slow on a cold dev server.
const expect = baseExpect.configure({ timeout: 15_000 });

const COOKIE = "mig_consent";
const wcagTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const banner = (page: Page) => page.getByRole("region", { name: "Cookie consent" });
const prefs = (page: Page) => page.getByRole("dialog", { name: "Cookie preferences" });
const sw = (page: Page, name: "Essential" | "Analytics" | "Marketing") => prefs(page).getByRole("switch", { name });
const footerSettings = (page: Page) => page.getByRole("contentinfo").getByRole("button", { name: "Cookie settings" });

type Stored = { v: number; at: string; choices: { analytics: boolean; marketing: boolean } };

async function consentCookie(context: BrowserContext) {
  return (await context.cookies()).find((c) => c.name === COOKIE);
}

async function storedConsent(context: BrowserContext): Promise<Stored | undefined> {
  const cookie = await consentCookie(context);
  return cookie ? (JSON.parse(decodeURIComponent(cookie.value)) as Stored) : undefined;
}

async function expectChoices(context: BrowserContext, choices: Stored["choices"]) {
  await expect.poll(async () => (await storedConsent(context))?.choices).toEqual(choices);
  const record = await storedConsent(context);
  expect(record?.v).toBe(1);
  expect(Number.isNaN(Date.parse(record?.at ?? ""))).toBe(false);
}

/** Waits until React has hydrated and client-only UI has had a chance to mount, so "absent" checks mean something. */
async function settle(page: Page) {
  await page.waitForLoadState("load");
  await page.waitForFunction(() => {
    const el = document.querySelector("main") ?? document.body.firstElementChild;
    return !!el && Object.keys(el).some((k) => k.startsWith("__react"));
  });
  await page.waitForTimeout(750);
}

async function expectNoBanner(page: Page) {
  await settle(page);
  await expect(banner(page)).toHaveCount(0);
}

async function setCookie(context: BrowserContext, value: string) {
  await context.addCookies([{ name: COOKIE, value, domain: "localhost", path: "/", sameSite: "Lax", expires: Math.floor(Date.now() / 1000) + 86_400 }]);
}

const encode = (v: unknown) => encodeURIComponent(JSON.stringify(v));

async function axe(page: Page) {
  const results = await new AxeBuilder({ page }).exclude("nextjs-portal").withTags(wcagTags).analyze();
  const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`);
  expect(summary, summary.join("\n")).toEqual([]);
}

async function noHorizontalOverflow(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
}

async function withinViewportWidth(page: Page, locator: Locator) {
  const box = await locator.boundingBox();
  const width = page.viewportSize()!.width;
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width + 0.5);
}

/** Tabs forward until `target` has focus (bounded), returning whether it got there. */
async function tabTo(page: Page, target: Locator, max = 250) {
  for (let i = 0; i < max; i++) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((el) => el === document.activeElement)) return true;
  }
  return false;
}

/** Waits for entry transitions (the banner and dialog slide in) so measurements reflect the final layout. */
async function animationsDone(locator: Locator) {
  await locator.evaluate((el) => Promise.all(el.getAnimations({ subtree: true }).map((a) => a.finished.catch(() => undefined))));
}

const focusInside = (locator: Locator) => locator.evaluate((el) => el.contains(document.activeElement));

test.describe("first visit", () => {
  for (const path of ["/", "/maplerecord", "/maplerecord/platform/mr-records", "/adobe-services", "/contact", "/this-page-does-not-exist"]) {
    test(`banner shows on ${path}`, async ({ page, context }) => {
      await page.goto(path);
      const region = banner(page);
      await expect(region).toBeVisible();
      for (const name of ["Accept all", "Reject non-essential", "Manage preferences"]) {
        await expect(region.getByRole("button", { name })).toBeVisible();
      }
      await expect(region.getByRole("link", { name: "Privacy notice" })).toHaveAttribute("href", "/privacy");
      await expect(region.getByRole("link", { name: "Cookie policy" })).toHaveAttribute("href", "/cookies");
      expect(await consentCookie(context)).toBeUndefined();
    });
  }

  test("banner is not in the server HTML", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).not.toMatch(/aria-label="Cookie consent"/);
    expect(html).not.toContain("Reject non-essential");
    expect(html).not.toContain("Manage preferences");
  });
});

test.describe("decisions", () => {
  test("Accept all grants both categories and persists across reload and navigation", async ({ page, context }) => {
    await page.goto("/");
    await banner(page).getByRole("button", { name: "Accept all" }).click();
    await expect(banner(page)).toHaveCount(0);
    await expectChoices(context, { analytics: true, marketing: true });

    const cookie = (await consentCookie(context))!;
    expect(cookie.path).toBe("/");
    expect(cookie.sameSite).toBe("Lax");
    const days = (cookie.expires - Date.now() / 1000) / 86_400;
    expect(days).toBeGreaterThan(179);
    expect(days).toBeLessThan(181);

    await page.reload();
    await expectNoBanner(page);

    // Client-side navigation through a footer link.
    await page.getByRole("contentinfo").locator('a[href="/about"]').first().click();
    await expect(page).toHaveURL(/\/about$/);
    await expectNoBanner(page);

    // Full page load.
    await page.goto("/maplerecord");
    await expectNoBanner(page);
  });

  test("Reject non-essential denies both categories and persists across reload", async ({ page, context }) => {
    await page.goto("/contact");
    await banner(page).getByRole("button", { name: "Reject non-essential" }).click();
    await expect(banner(page)).toHaveCount(0);
    await expectChoices(context, { analytics: false, marketing: false });
    await page.reload();
    await expectNoBanner(page);
    await expectChoices(context, { analytics: false, marketing: false });
  });

  test("Manage preferences saves a custom choice, and the footer reopens it with saved state", async ({ page, context }) => {
    await page.goto("/");
    await banner(page).getByRole("button", { name: "Manage preferences" }).click();
    const dialog = prefs(page);
    await expect(dialog).toBeVisible();
    for (const name of ["Save preferences", "Accept all", "Reject non-essential", "Close"]) {
      await expect(dialog.getByRole("button", { name })).toBeVisible();
    }
    await expect(sw(page, "Essential")).toBeChecked();
    await expect(sw(page, "Essential")).toBeDisabled();
    // Nothing optional is pre-ticked.
    await expect(sw(page, "Analytics")).not.toBeChecked();
    await expect(sw(page, "Marketing")).not.toBeChecked();

    await sw(page, "Analytics").click();
    await expect(sw(page, "Analytics")).toBeChecked();
    await expect(sw(page, "Marketing")).not.toBeChecked();
    await dialog.getByRole("button", { name: "Save preferences" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(banner(page)).toHaveCount(0);
    await expectChoices(context, { analytics: true, marketing: false });

    await footerSettings(page).click();
    await expect(dialog).toBeVisible();
    await expect(sw(page, "Analytics")).toBeChecked();
    await expect(sw(page, "Marketing")).not.toBeChecked();
    await sw(page, "Analytics").click();
    await sw(page, "Marketing").click();
    await dialog.getByRole("button", { name: "Save preferences" }).click();
    await expect(dialog).toHaveCount(0);
    await expectChoices(context, { analytics: false, marketing: true });

    // Saved state survives a reload and shows in the reopened panel.
    await page.reload();
    await expectNoBanner(page);
    await footerSettings(page).click();
    await expect(sw(page, "Analytics")).not.toBeChecked();
    await expect(sw(page, "Marketing")).toBeChecked();
  });

  test("Accept all and Reject non-essential inside the dialog", async ({ page, context }) => {
    await page.goto("/");
    await banner(page).getByRole("button", { name: "Manage preferences" }).click();
    await prefs(page).getByRole("button", { name: "Accept all" }).click();
    await expect(prefs(page)).toHaveCount(0);
    await expect(banner(page)).toHaveCount(0);
    await expectChoices(context, { analytics: true, marketing: true });

    await footerSettings(page).click();
    await expect(sw(page, "Analytics")).toBeChecked();
    await expect(sw(page, "Marketing")).toBeChecked();
    await prefs(page).getByRole("button", { name: "Reject non-essential" }).click();
    await expect(prefs(page)).toHaveCount(0);
    await expectChoices(context, { analytics: false, marketing: false });
  });

  for (const how of ["Escape", "Close"] as const) {
    test(`dismissing the dialog with ${how} on a first visit saves nothing`, async ({ page, context }) => {
      await page.goto("/");
      await banner(page).getByRole("button", { name: "Manage preferences" }).click();
      await expect(prefs(page)).toBeVisible();
      await sw(page, "Analytics").click(); // an unsaved change must be discarded
      if (how === "Escape") await page.keyboard.press("Escape");
      else await prefs(page).getByRole("button", { name: "Close" }).click();
      await expect(prefs(page)).toHaveCount(0);
      await expect(banner(page)).toBeVisible();
      expect(await consentCookie(context)).toBeUndefined();

      // Reopening shows the defaults again, not the discarded toggle.
      await banner(page).getByRole("button", { name: "Manage preferences" }).click();
      await expect(sw(page, "Analytics")).not.toBeChecked();
    });
  }

  test("other open tabs pick up a decision", async ({ context }) => {
    const first = await context.newPage();
    const second = await context.newPage();
    await first.goto("/");
    await second.goto("/about");
    await expect(banner(first)).toBeVisible();
    await expect(banner(second)).toBeVisible();
    await banner(first).getByRole("button", { name: "Reject non-essential" }).click();
    await expect(banner(second)).toHaveCount(0);
  });
});

test.describe("stale or malformed stored choice", () => {
  const cases: Record<string, string> = {
    "older version (v: 0)": encode({ v: 0, at: new Date().toISOString(), choices: { analytics: true, marketing: true } }),
    "future version (v: 2)": encode({ v: 2, at: new Date().toISOString(), choices: { analytics: false, marketing: false } }),
    "garbage": "not-json%7B%7B",
    "missing choices": encode({ v: 1, at: new Date().toISOString() }),
    "non-boolean choice": encode({ v: 1, at: new Date().toISOString(), choices: { analytics: "yes", marketing: false } }),
  };
  for (const [label, value] of Object.entries(cases)) {
    test(`${label} shows the banner again`, async ({ page, context }) => {
      await setCookie(context, value);
      await page.goto("/");
      await expect(banner(page)).toBeVisible();
    });
  }

  test("a valid stored choice hides the banner", async ({ page, context }) => {
    await setCookie(context, encode({ v: 1, at: new Date().toISOString(), choices: { analytics: false, marketing: false } }));
    await page.goto("/");
    await expectNoBanner(page);
  });
});

test("nothing non-essential loads: only first-party requests and only the consent cookie after Accept all", async ({ page, context }) => {
  const foreign = new Set<string>();
  page.on("request", (req) => {
    const url = new URL(req.url());
    if (!["http:", "https:", "ws:", "wss:"].includes(url.protocol)) return;
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) foreign.add(url.origin);
  });

  await page.goto("/");
  await expect(banner(page)).toBeVisible();
  await banner(page).getByRole("button", { name: "Accept all" }).click();
  await expectChoices(context, { analytics: true, marketing: true });
  for (const path of ["/maplerecord", "/adobe-services", "/contact"]) {
    await page.goto(path);
    await settle(page);
  }

  const names = (await context.cookies()).map((c) => c.name);
  expect(names).toEqual([COOKIE]);
  const docCookies = await page.evaluate(() => document.cookie.split("; ").filter(Boolean).map((c) => c.split("=")[0]));
  expect(docCookies).toEqual([COOKIE]);
  expect([...foreign]).toEqual([]);
});

for (const viewport of [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
]) {
  test.describe(`layout at ${viewport.width}px`, () => {
    test.use({ viewport });

    test("banner fits the viewport and its buttons are reachable", async ({ page, context }) => {
      await page.goto("/");
      const region = banner(page);
      await expect(region).toBeVisible();
      await animationsDone(region);
      await noHorizontalOverflow(page);
      await withinViewportWidth(page, region);
      for (const name of ["Accept all", "Reject non-essential", "Manage preferences"]) {
        const button = region.getByRole("button", { name });
        await expect(button).toBeInViewport();
        await withinViewportWidth(page, button);
        const box = (await button.boundingBox())!;
        expect(box.height, `${name} touch target`).toBeGreaterThanOrEqual(24);
      }
      // The banner must not cover the whole screen.
      const box = (await region.boundingBox())!;
      expect(box.height).toBeLessThan(viewport.height * 0.6);
      await region.getByRole("button", { name: "Reject non-essential" }).click();
      await expectChoices(context, { analytics: false, marketing: false });
    });

    test("preferences dialog is usable", async ({ page, context }) => {
      await page.goto("/");
      await banner(page).getByRole("button", { name: "Manage preferences" }).click();
      const dialog = prefs(page);
      await expect(dialog).toBeVisible();
      await animationsDone(dialog);
      await noHorizontalOverflow(page);
      await withinViewportWidth(page, dialog);
      const dialogBox = (await dialog.boundingBox())!;
      expect(dialogBox.y).toBeGreaterThanOrEqual(0);
      expect(dialogBox.y + dialogBox.height).toBeLessThanOrEqual(viewport.height + 0.5);

      await sw(page, "Marketing").scrollIntoViewIfNeeded();
      await sw(page, "Marketing").click();
      const save = dialog.getByRole("button", { name: "Save preferences" });
      await save.scrollIntoViewIfNeeded();
      await expect(save).toBeInViewport();
      await expect(dialog.getByRole("button", { name: "Close" })).toBeInViewport();
      await save.click();
      await expect(dialog).toHaveCount(0);
      await expectChoices(context, { analytics: false, marketing: true });
    });
  });
}

test.describe("keyboard", () => {
  test("Tab reaches the banner buttons and Enter on Reject non-essential works", async ({ page, context }) => {
    // Tabs through every link on the home page one key press at a time, which is slow under parallel load.
    test.setTimeout(120_000);
    await page.goto("/");
    await expect(banner(page)).toBeVisible();
    await settle(page);
    const reject = banner(page).getByRole("button", { name: "Reject non-essential" });
    expect(await tabTo(page, banner(page).getByRole("button", { name: "Accept all" })), "Tab reaches Accept all").toBe(true);
    expect(await tabTo(page, reject), "Tab reaches Reject non-essential").toBe(true);
    await expect(reject).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(banner(page)).toHaveCount(0);
    await expectChoices(context, { analytics: false, marketing: false });
    // Focus isn't dropped onto <body> when the banner disappears.
    await expect(page.locator("main#main")).toBeFocused();
  });

  test("saving in the dialog opened from the banner leaves focus on the page", async ({ page, context }) => {
    await page.goto("/");
    await expect(banner(page)).toBeVisible();
    await settle(page);
    await banner(page).getByRole("button", { name: "Manage preferences" }).focus();
    await page.keyboard.press("Enter");
    await expect(prefs(page)).toBeVisible();
    await prefs(page).getByRole("button", { name: "Save preferences" }).focus();
    await page.keyboard.press("Enter");
    await expect(prefs(page)).toHaveCount(0);
    await expectChoices(context, { analytics: false, marketing: false });
    await expect.poll(() => page.evaluate(() => document.activeElement?.id)).toBe("main");
  });

  test("dialog traps focus and Escape returns focus to the banner trigger", async ({ page }) => {
    await page.goto("/");
    await expect(banner(page)).toBeVisible();
    await settle(page);
    const trigger = banner(page).getByRole("button", { name: "Manage preferences" });
    await trigger.focus();
    await page.keyboard.press("Enter");
    const dialog = prefs(page);
    await expect(dialog).toBeVisible();
    await expect.poll(() => focusInside(dialog), { message: "focus moves into the dialog" }).toBe(true);

    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Tab");
      expect(await focusInside(dialog), `focus stays in dialog after Tab ${i + 1}`).toBe(true);
    }
    for (let i = 0; i < 15; i++) {
      await page.keyboard.press("Shift+Tab");
      expect(await focusInside(dialog), `focus stays in dialog after Shift+Tab ${i + 1}`).toBe(true);
    }

    // Switches toggle from the keyboard.
    await sw(page, "Analytics").focus();
    await page.keyboard.press("Space");
    await expect(sw(page, "Analytics")).toBeChecked();

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("Escape returns focus to the footer Cookie settings button", async ({ page, context }) => {
    await setCookie(context, encode({ v: 1, at: new Date().toISOString(), choices: { analytics: false, marketing: false } }));
    await page.goto("/");
    await settle(page);
    const trigger = footerSettings(page);
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(prefs(page)).toBeVisible();
    await expect.poll(() => focusInside(prefs(page))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(prefs(page)).toHaveCount(0);
    await expect(trigger).toBeFocused();
    // Dismissing keeps the existing choice.
    await expectChoices(context, { analytics: false, marketing: false });
  });
});

for (const width of [390, 1280]) {
  test.describe(`axe WCAG 2.2 AA at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("with the banner visible", async ({ page }) => {
      await page.goto("/");
      await expect(banner(page)).toBeVisible();
      await animationsDone(banner(page));
      await axe(page);
    });

    test("with the preferences dialog open", async ({ page }) => {
      await page.goto("/");
      await banner(page).getByRole("button", { name: "Manage preferences" }).click();
      await expect(prefs(page)).toBeVisible();
      await animationsDone(prefs(page));
      await axe(page);
    });
  });
}
