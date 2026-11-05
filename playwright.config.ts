import { defineConfig, devices } from "@playwright/test";

/**
 * Runs against a production build (`npm run build` first).
 * - "configured": contact delivery points at a local mock provider (tests/mock-email-provider.mjs)
 * - "unconfigured": no delivery credentials, to verify the honest "not configured" path
 */
const configuredEnv = {
  RESEND_API_KEY: "test-key",
  CONTACT_TO_EMAIL: "inbox@example.test",
  CONTACT_FROM_EMAIL: "Website <web@example.test>",
  RESEND_API_URL: "http://127.0.0.1:4010/emails",
  PREVIEW_SECRET: "playwright-preview-secret",
};

/**
 * Every project starts as a returning visitor who already made a cookie choice (both optional
 * categories off), so the consent banner never overlaps the pages under test. tests/consent.spec.ts
 * opts out with an empty storageState to exercise the first-visit flow.
 */
const returningVisitor = {
  cookies: [
    {
      name: "mig_consent",
      value: encodeURIComponent(JSON.stringify({ v: 1, at: new Date().toISOString(), choices: { analytics: false, marketing: false } })),
      domain: "localhost",
      path: "/",
      expires: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
      httpOnly: false,
      secure: false,
      sameSite: "Lax" as const,
    },
  ],
  origins: [],
};

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: [["list"]],
  use: { trace: "retain-on-failure", storageState: returningVisitor },
  projects: [
    {
      name: "configured",
      testIgnore: /unconfigured\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3200" },
    },
    {
      name: "unconfigured",
      testMatch: /unconfigured\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3201" },
    },
  ],
  webServer: [
    { command: "node tests/mock-email-provider.mjs", url: "http://127.0.0.1:4010", reuseExistingServer: false },
    { command: "npx next start -p 3200", url: "http://localhost:3200", env: configuredEnv, reuseExistingServer: false, timeout: 60_000 },
    { command: "npx next start -p 3201", url: "http://localhost:3201", env: { PREVIEW_SECRET: "" }, reuseExistingServer: false, timeout: 60_000 },
  ],
});
