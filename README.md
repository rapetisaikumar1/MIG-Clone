# Maverick InnoGarage — website

Corporate website for Maverick InnoGarage, focused on **AI Governance**, **Adobe Services** and **Data Management**.
It's a single Next.js App Router application: marketing pages are pre-rendered, and the contact endpoint runs on the server in the same deployment.

| | |
|---|---|
| Framework | Next.js 16.4.3 (App Router, Turbopack), React 19.3.1 |
| Language | TypeScript 6.0.3, `strict` + `noUncheckedIndexedAccess` |
| Styling | Tailwind CSS 4.3.3 with CSS custom-property tokens (`src/app/globals.css`) |
| UI | Radix UI (via `radix-ui`) for the mobile navigation dialog, `class-variance-authority` for shadcn-style variants, Lucide icons |
| Content | Typed TypeScript content + trusted MDX articles (`@next/mdx`) |
| Validation | Zod 4 (shared client/server contact schema) |
| Email | Resend REST API (server-only module, no SDK) |
| Tests | Playwright 1.64 + axe-core |
| Runtime | **Node.js 24 LTS** (`.nvmrc`), minimum 22.12 · **npm 10** (lockfile: `package-lock.json`) |

## Getting started

```bash
nvm use            # Node 24 (see .nvmrc)
npm ci
cp .env.example .env.local   # optional — the site runs without any variables
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `next typegen` (route types) + `tsc --noEmit` |
| `npm run lint` | ESLint (`eslint-config-next` core-web-vitals + TypeScript) |
| `npm run test:e2e` | Playwright suite. Run `npm run build` first; it starts its own servers and a mock email provider |
| `npm run check` | typecheck + lint + build |

The first Playwright run needs a browser: `npx playwright install chromium`.

## Project structure

```
src/
  app/
    layout.tsx                 Root: fonts, metadataBase, robots policy
    (marketing)/               Public routes sharing header/footer
      page.tsx                 Home
      ai-governance/ adobe-services/ data-management/   Specialization pages
      maplerecord/ industries/ about/ privacy/
      insights/ insights/[slug]/                       Article index + MDX articles
      contact/                 Inquiry form (dynamic: reads ?interest=)
    api/contact/route.ts       POST endpoint → validation → submission service
    api/draft/                 Draft Mode on/off for unpublished insights
    sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
  components/ui/               Primitives: Button/ButtonLink, Container, Section, Eyebrow, Tag…
  components/layout/           Header, mobile nav (client), footer, logo, JSON-LD
  components/graphics/         Original SVG illustrations (hero + per-service)
  features/services/           Service page template and sections
  features/insights/           Article card, theme filter (client), draft banner
  features/contact/            Form (client), shared Zod schema, office list, CTA band
  features/home/               Connection diagram
  content/                     Reviewed copy: services/*.ts, home.ts, industries.ts, insights/*.mdx + index.ts
  lib/content/                 Typed content access (getService, getInsights, getInsight…)
  server/                      server-only: env validation, Resend client, submission service, rate limit
  config/                      site.ts (company facts), navigation.ts, redirects.ts
public/brand/                  Original logo files, unchanged
tests/                         Playwright specs + mock email provider
docs/                          Migration map, content inventory, review handoff
```

## Architecture decisions

- **Server Components by default.** The only client components are the mobile menu, active-link highlighting, the insights theme filter, the contact form and the error boundary. All copy is in the initial HTML.
- **Rendering and caching.** Every marketing page, the industry page and the published articles are static, rebuilt on deploy (`○`/`●` in the build output). `/contact` renders per request because it reads `?interest=` and the server's delivery status. `/api/contact` is `force-dynamic`. Content comes from local files, so a deploy is how content refreshes. No ISR or time-based revalidation is needed yet.
- **One source of truth.** Company name, offices, phones and social links live only in `src/config/site.ts`. The header, footer, contact page, CTAs, JSON-LD and metadata all read from it. Legacy redirects live only in `src/config/redirects.ts`, which feeds both `next.config.ts` and the tests.
- **Content separated from layout.** Service pages share a `ServicePage` composition fed by a typed `ServiceContent` object. Each capability carries a `provenance` of `"verified"` (stated on the old site) or `"proposed"` (new copy needing sign-off). This field isn't rendered.
- **No unnecessary infrastructure.** There's no database, auth, global state or CMS. Pages read content through plain functions, not via internal HTTP calls.
- **Motion.** CSS and SVG only (`animateMotion` signal dots, `draw-in` strokes, sheet slide-in). Motion for React wasn't needed. Every animation is decorative and turns off under `prefers-reduced-motion`.

## Contact form

`ContactForm` (client validation for usability) → `POST /api/contact` → Zod validation → `submitInquiry()` → `sendWithResend()`.

- Checks content type, same-origin `Origin`, a 16 KB body limit, a honeypot field, a minimum fill time (2.5 s) and a per-IP rate limit (5 per 10 minutes).
- User content is HTML-escaped in the email body, and header values are stripped of CR/LF.
- Logs record outcome, interest area and provider reference, never names, emails or message text.
- The form shows success **only** when the provider returns 2xx. Otherwise the user sees a specific failure message.
- If `RESEND_API_KEY`, `CONTACT_TO_EMAIL` or `CONTACT_FROM_EMAIL` is missing, the form shows a visible "not configured" notice and the API returns `503 not_configured`.

### Abuse protection

The built-in rate limiter is in-memory, so it applies per server instance. On Vercel, add a **Firewall rate-limit rule** for `POST /api/contact` (for example 5 requests per 10 minutes per IP) for cross-instance enforcement. Alternatively, replace `src/server/contact/rate-limit.ts` with a shared store such as Upstash Redis. The limiter keys on `x-forwarded-for`, which Vercel sets. On self-hosted setups, make sure your proxy overwrites it.

## Environment variables

See `.env.example`. All variables are optional. Missing values degrade gracefully.

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build | Canonical origin. Falls back to Vercel's production/preview URL, then `http://localhost:3000` |
| `SITE_INDEXABLE` | build | Set `true` on non-Vercel production hosts to allow indexing. On Vercel, only `VERCEL_ENV=production` is indexable |
| `RESEND_API_KEY` | server | Resend API key |
| `CONTACT_TO_EMAIL` | server | Inbox for inquiries (**to be confirmed by MiG**: no address is published today) |
| `CONTACT_FROM_EMAIL` | server | Sender on a domain verified in Resend |
| `PREVIEW_SECRET` | server | ≥16 chars. Enables `/api/draft?secret=…&slug=…` |
| `RESEND_API_URL` | server | Test-only override used by Playwright's mock provider |

Set production and preview values separately in the host. Previews can omit email credentials to avoid sending real inquiries.

## Content workflow

- **Service, home and industry copy:** edit the typed objects in `src/content/`. TypeScript catches missing fields.
- **Articles:** add `src/content/insights/<slug>.mdx` and an entry in `src/content/insights/index.ts`. Use `status: "draft"` until approved. Drafts are excluded from listings, the sitemap and static generation, return 404 publicly, and render with `noindex` in Draft Mode.
- **Previewing drafts:** visit `/api/draft?secret=<PREVIEW_SECRET>&slug=<slug>`. A banner shows while Draft Mode is on, with an exit link.
- **Optional CMS:** if editors need to publish without a deploy, add Sanity behind `src/lib/content/*`. Keep the function signatures, fetch with `draftMode()` deciding the perspective, tag fetches, and call `revalidateTag` from a Sanity webhook route. Pages won't need to change.

## Deployment (Vercel)

1. Import the repository. The framework is detected automatically. Set the Node.js version to 24.x in Project Settings.
2. Add environment variables per environment (Production / Preview).
3. Every pull request gets a preview deployment. Previews send `noindex` and `Disallow: /`.
4. Promote to production by merging to the production branch.
5. **Rollback:** in Vercel → Deployments, choose a previous production deployment → *Promote to Production* (or `vercel rollback`).
6. **Domain cutover** to `maverickinnogarage.com` is a separate, deliberate step. Lower DNS TTL first, add the domain in Vercel, switch DNS, then confirm the legacy redirects (`docs/MIGRATION.md`) and submit the new sitemap in Search Console.

Other Node hosts work with `npm ci && npm run build && npm start` (set `SITE_INDEXABLE=true` in production). Do not use `output: "export"`: the contact endpoint needs a server.
