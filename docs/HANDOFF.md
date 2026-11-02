# Review handoff

Items that need a decision, an asset, or configuration from Maverick InnoGarage before launch.

## Missing assets and information

1. **Inquiry email address.** None is published. Needed for `CONTACT_TO_EMAIL`, and optionally to display on the site (`company.email` in `src/config/site.ts`).
2. **Resend account and verified sending domain** (or approval of another provider). The swap would touch only `src/server/email/resend.ts`.
3. **MapleRecord product screenshots** and confirmation of whether to link to `maplerecord.com`.
4. **Team or leadership information**, if it should appear on About. None is shown now.
5. **Terms of service**, if required. Only a privacy notice exists.

## Claims requiring confirmation

| Claim | Status on new site |
|---|---|
| Adobe Solution Partner (Bronze, per old co-brand asset) | Hidden. Could not be confirmed in Adobe's public partner directory. Set `company.adobePartner.verified = true` and render `public/brand/mig-adobe-solution-partner.svg` once confirmed |
| "Over 7 years" experience, "certified experts" | Omitted |
| **All AI Governance service content** | **Proposed.** The old site has no AI governance offering. Confirm the scope you can deliver (every item is marked `provenance: "proposed"`) |
| Data Management → "Foundations for analytics, AI and experiences" | Proposed |
| Adobe → "Profile data governance and quality", "Integration testing", "Documentation and handover" items | Proposed extensions of verified services |
| Framework mentions (NIST AI RMF, ISO/IEC 42001, EU AI Act) in the AI Governance FAQ | Worded as "help you map / organize documentation", with no legal advice or certification. EU AI Act timelines were amended in 2026, so no dates are quoted. Have counsel review |
| Homepage commitment "We build and support MapleRecord" | Based on the old /maplerecord page. Confirm MapleRecord is MiG's own product |
| Privacy notice (`/privacy`) | Describes this implementation factually (no analytics cookies, email delivery provider, minimal logs). **Needs legal review**, including retention periods |

All use cases and the homepage scenario are labeled "Illustrative use case" on the page and describe no clients.

## Business decisions

- **Microsoft Dynamics 365** and **Digital Transformation Consulting** are outside the three specializations. They now redirect to Data Management integration and the About approach section. Decide whether to keep offering them.
- **Draft articles** in `src/content/insights/`: *Start AI Governance with an Inventory* and *Records Retention: From Schedule to System*. Both are new, unapproved and hidden. Change `status` to `"published"` and add a `published` date to release them.

## External configuration

- Vercel project with Node 24, environment variables per environment, and a Firewall rate-limit rule on `POST /api/contact`.
- DNS cutover and Search Console sitemap submission happen as a separate step after review.
- Optional: bot protection such as Turnstile if spam gets past the honeypot, timing and rate limits.

## Known technical notes

- ESLint is pinned to 9.39.5 because the plugins `eslint-config-next` 16.4 uses don't yet declare ESLint 10 support. ESLint 9 is now marked end-of-life on npm. Upgrade when they do.
- The system Node on the build machine was 20.18 (end-of-life). Verification ran on Node 24.22.2.
- Lighthouse mobile LCP is simulated at 2.7–2.9 s, while the observed LCP in the same runs was 0.1–0.9 s. The heading is the LCP element, and the simulation charges for the web-font download. Confirm with real-user data after launch.
