// Renders the recreated MapleRecord product screens to WebP.
// 1) Start a dev server with the render route enabled:  MR_SCREENS_RENDER=1 npx next dev -p 3400
// 2) Run:  node scripts/render-mr-screens.mjs [--base http://localhost:3400] [id-prefix …]
//    e.g. `node scripts/render-mr-screens.mjs records-` renders only MR Records screens.
// Output: public/maplerecord/screens/<id>.webp at 2× (2560 × 1600).
import { readFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const baseIdx = args.indexOf("--base");
const base = baseIdx >= 0 ? args.splice(baseIdx, 2)[1] : "http://localhost:3400";
const prefixes = args;

const manifest = readFileSync(path.join(root, "src/content/maplerecord/screens.ts"), "utf8");
const ids = [...manifest.matchAll(/s\("([a-z0-9-]+)"/g)].map((m) => m[1]).filter((id) => !prefixes.length || prefixes.some((p) => id.startsWith(p)));
const outDir = path.join(root, "public/maplerecord/screens");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
// Pre-set consent so the cookie banner never appears in captures.
const consent = encodeURIComponent(JSON.stringify({ v: 1, at: new Date().toISOString(), choices: { analytics: false, marketing: false } }));
await context.addCookies([{ name: "mig_consent", value: consent, url: base }]);
const page = await context.newPage();
let failed = 0;
for (const id of ids) {
  const res = await page.goto(`${base}/mr-screens/${id}`, { waitUntil: "networkidle" });
  const el = page.locator(`[data-screen="${id}"]`);
  if (!res?.ok() || !(await el.count())) {
    console.error(`✗ ${id} (status ${res?.status()}, screen element ${(await el.count()) ? "found" : "missing"})`);
    failed++;
    continue;
  }
  // Hide the Next.js dev indicator so it never appears in captures.
  await page.addStyleTag({ content: "nextjs-portal{display:none!important}" });
  await page.evaluate(() => document.fonts.ready);
  const png = await el.screenshot({ type: "png" });
  const file = path.join(outDir, `${id}.webp`);
  const info = await sharp(png).webp({ quality: 82, effort: 6 }).toFile(file);
  console.log(`✓ ${id}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
await browser.close();
process.exit(failed ? 1 : 0);
