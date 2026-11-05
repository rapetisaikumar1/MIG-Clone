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
| Adobe Solution Partner | **Shown in the site header** at the owner's request (2026-11-03), without a tier name. It could not be confirmed in Adobe's public partner directory. The tier line was removed from Adobe's lockup, so check this against Adobe's partner badge guidelines. Set `company.adobePartner.verified = false` to remove it |
| "Over 7 years" experience, "certified experts" | Omitted |
| **All AI Governance service content** | **Proposed.** The old site has no AI governance offering. Confirm the scope you can deliver (every item is marked `provenance: "proposed"`) |
| Data Management → "Data ready for Adobe, analytics, and AI" | Proposed (consent and usage rules before activation, profile quality, AI data approvals) |
| Data Management → data **migration** | **Removed (QA pass, 2026-11-06).** The old /integrated-data-solutions page never offered migration; the capability is now "Data integration" with verified items only. Re-add only if MiG confirms it |
| Adobe → "Profile data governance and quality", "Integration testing", "Documentation and handover" items | Proposed extensions of verified services |
| **Adobe application pages** (`/adobe-services/<product>`, `src/content/adobe/products/*.ts`) | Service **titles** are the verified service types from each old product page and must stay as listed. Explanations, feature overviews, signals, FAQs and illustrative scenarios are **proposed** new copy. Product descriptions were checked against Adobe Experience League (Nov 2026). Confirm the depth of delivery for each application |
| **Adobe platform assessment** (`/adobe-services/assessment`) | Based on the verified Assess stage (current-state assessment with prioritized opportunities). The scope, process, inputs and outputs are **proposed**. No price, duration or "free" claim is made. Confirm you offer it as a standalone first engagement, and who delivers it |
| Adobe hub → "Ways to engage" and "Data governance inside Adobe" sections | **Proposed.** Confirm the engagement models you actually offer and the governance work you deliver inside Adobe applications |
| Adobe Solution Partner panel (hub, product pages, home Adobe section) | Rendered only while `company.adobePartner.verified` is `true` (same switch as the header badge). The partner tier is **deliberately not shown**. Same caveats as the header badge above |
| Home → "Adobe Experience Cloud, implemented and connected" section | Lists the seven applications from the old site and links to the assessment. Intro copy is proposed |
| Contact form → "Adobe applications involved" field | New optional field, shown when the interest is Adobe Services and included in the inquiry email. Make sure the owners of the `CONTACT_TO_EMAIL` inbox know it exists and how to route Adobe inquiries |
| Framework mentions (NIST AI RMF, ISO/IEC 42001, EU AI Act) in the AI Governance FAQ | Worded as "help you map / organize documentation", with no legal advice or certification. EU AI Act timelines were amended in 2026, so no dates are quoted. Have counsel review |
| MapleRecord ownership | **Confirmed by Maverick InnoGarage (2026-11-06): Maverick InnoGarage owns MapleRecord.** The MiG pages call it "our product"; the MapleRecord section now says "MapleRecord is a Maverick InnoGarage product" (closing CTA, overview note, Contact, About story), and the Organization JSON-LD lists MapleRecord as a brand. Note: maplerecord.com's footer names "MapleRecord Inc." — if that is a MiG entity, no change is needed; otherwise align the legal name on maplerecord.com |
| MapleRecord claims reproduced from maplerecord.com | Published figures stay attributed ("as published by MapleRecord"). Confirm before launch: "Unlimited storage", "Bank-level encryption", "256-bit AES", "HIPAA and GDPR compliance", "Data residency options", "24/7 support", "99.9% uptime", Customer Service "95% SLA compliance" (the source also calls it "95% improvement") |
| MapleRecord solution pages | QA pass: Manufacturing "Quality documentation" challenge rewritten (the source shows Education's text by mistake); FOIA removed from Financial Services; "Join leading banks/… using MapleRecord" CTAs replaced with "See how MapleRecord can help…" (implied a customer base). Confirm these edits |
| AI Governance → Adobe angle | QA pass added "Governing AI features in marketing platforms" (illustrative) and "Because we also implement Adobe applications, we can check configuration as well as policy". Proposed, like the rest of the page |
| Adobe product pages → newly named tools and settings | QA pass made "How we help" items concrete (e.g. Experience Platform Debugger, identity graph linking rules, profile expirations, Experience Fragment export to Target, Cloud Manager quality gates, App Builder, Live Search tuning, Munchkin, SPF/DKIM). All sit under the verified service titles but are proposed copy — confirm MiG's depth in each |
| Adobe platform assessment → process details | "Cost and timeline are confirmed before work starts", "read-only access where possible", and a readout plus current-state map in every assessment. Proposed |
| About page | Principles reduced to four; "Work-life balance" value restored from the old site with new wording; the unverified "named MiG for…" story removed |
| Industries | Adobe rows now name specific applications (e.g. Marketo Engage for healthcare, Commerce B2B for manufacturing). Typical applications, not client claims — confirm they reflect MiG's focus |
| Contact page | "Never a hard sell" (tone); Delaware and Texas share one phone number in `src/config/site.ts` — confirm |
| Insights articles | The six 2024 articles were corrected for 2026 Adobe product facts and naming (original dates kept; there is no "Updated" date field). Two display titles changed (slugs unchanged): "A Comprehensive Guide to Data Governance", "Improving Customer Engagement with Adobe Real-Time CDP". "Continuous improvement" softened to "we review and recommend" — confirm it's an ongoing service |
| Privacy notice (`/privacy`) | Describes this implementation factually (no analytics cookies, email delivery provider, minimal logs). **Needs legal review**, including retention periods |

All use cases and the homepage scenario are labeled "Illustrative use case" on the page and describe no clients.

## Business decisions

- **Microsoft Dynamics 365** and **Digital Transformation Consulting** are outside the three specializations. They now redirect to Data Management integration and the About approach section. Decide whether to keep offering them.
- **Further Adobe applications.** Adobe partners commonly feature applications that MiG doesn't list today: Adobe Journey Optimizer, Customer Journey Analytics, Adobe Workfront, AEM Assets and AEM Forms as separate offers, AEM as a Cloud Service migration, Edge Delivery Services, and Adobe GenStudio for Performance Marketing. **Add a page only if MiG confirms delivery capability** for it (new file in `src/content/adobe/products/`, slug added to `AdobeProductSlug`).
- **Real-Time CDP / AEM versions.** Product pages don't claim AEM 6.5 → Cloud Service migration or Edge Delivery Services builds. Add an FAQ about AEM versions once MiG confirms.
- **MapleRecord inquiries** use the Data Management interest on the contact form. Add a dedicated "MapleRecord" interest if inquiries should be routed separately.
- **Freshness.** All published articles date from December 2024, so "Recent articles" on the home page looks dated. Publishing the drafts (below) would help.
- **Draft articles** in `src/content/insights/`: *Start AI Governance with an Inventory* and *Records Retention: From Schedule to System*. Both are new, unapproved and hidden. Change `status` to `"published"` and add a `published` date to release them.

## External configuration

- Vercel project with Node 24, environment variables per environment, and a Firewall rate-limit rule on `POST /api/contact`.
- DNS cutover and Search Console sitemap submission happen as a separate step after review.
- Optional: bot protection such as Turnstile if spam gets past the honeypot, timing and rate limits.

## Missing assets (QA pass)

- MapleRecord **Insurance** and **Financial Services** pages share one hero image (as on maplerecord.com). A distinct image is needed.

## Known technical notes

- ESLint is pinned to 9.39.5 because the plugins `eslint-config-next` 16.4 uses don't yet declare ESLint 10 support. ESLint 9 is now marked end-of-life on npm. Upgrade when they do.
- The system Node on the build machine was 20.18 (end-of-life). Verification ran on Node 24.22.2.
- Lighthouse mobile LCP is simulated at 2.7–2.9 s, while the observed LCP in the same runs was 0.1–0.9 s. The heading is the LCP element, and the simulation charges for the web-font download. Confirm with real-user data after launch.
