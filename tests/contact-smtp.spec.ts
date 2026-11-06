import { expect, test } from "@playwright/test";

/** Contact delivery through SMTP (company mailbox), against tests/mock-smtp-server.mjs. */
const lastMessage = async () => (await (await fetch("http://127.0.0.1:4011/last")).json()) as { from: string; to: string[]; data: string } | null;

/** Reads a header (unfolding continuation lines) and decodes RFC 2047 encoded words. */
function header(data: string, name: string) {
  const raw = data.split(/\r?\n\r?\n/)[0]!.replace(/\r?\n[ \t]+/g, " ");
  const line = raw.split(/\r?\n/).find((l) => l.toLowerCase().startsWith(`${name.toLowerCase()}:`));
  if (!line) return null;
  return line
    .slice(name.length + 1)
    .trim()
    .replace(/\?=\s+=\?/g, "?==?")
    .replace(/=\?utf-8\?([qb])\?([^?]*)\?=/gi, (_m, enc: string, text: string) => {
      if (enc.toLowerCase() === "b") return Buffer.from(text, "base64").toString("utf8");
      const bytes = text.replace(/_/g, " ").replace(/=([0-9a-f]{2})/gi, (_h, hex: string) => String.fromCharCode(parseInt(hex, 16)));
      return Buffer.from(bytes, "latin1").toString("utf8");
    });
}

async function fillForm(page: import("@playwright/test").Page, message: string) {
  await page.goto("/contact?interest=data-management");
  await expect(page.getByTestId("delivery-not-configured")).toHaveCount(0);
  await page.getByLabel("Full name").fill("Priya Shah");
  await page.getByLabel("Business email").fill("priya.shah@example.org");
  await page.getByLabel("Company name").fill("Harbourview <Records> & Co");
  await page.getByLabel("How can we help?").fill(message);
  await page.waitForTimeout(2600);
}

test.describe.configure({ mode: "serial" });

test("delivers an inquiry by SMTP with reply-to, subject and escaped content", async ({ page }) => {
  const marker = `smtp-check-${Date.now()}`;
  await fillForm(page, `We need help with our records retention program. ${marker}`);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("heading", { name: /Your message has been sent/ })).toBeVisible();

  const mail = await lastMessage();
  expect(mail).not.toBeNull();
  expect(mail!.from).toContain("web@example.test");
  expect(mail!.to.join(",")).toContain("inbox@example.test");
  expect(mail!.data).toContain(marker);
  expect(mail!.data).toMatch(/^Reply-To: priya\.shah@example\.org/m);
  expect(header(mail!.data, "Subject")).toBe("Website inquiry — Data Management — Harbourview <Records> & Co");
  // The company name is HTML-escaped in the HTML part.
  // Quoted-printable bodies wrap long lines with soft breaks ("=" + CRLF), so unfold them first.
  expect(mail!.data.replace(/=\r?\n/g, "")).toContain("Harbourview &lt;Records&gt; &amp; Co");
});

test("a rejected SMTP message shows an honest failure, never success", async ({ page }) => {
  await fillForm(page, "Please treat this as a delivery failure check. SIMULATE_PROVIDER_FAILURE");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("couldn't send your message");
  await expect(page.getByRole("heading", { name: /Your message has been sent/ })).toHaveCount(0);
});
