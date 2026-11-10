# Review handoff

Items that need a decision, an asset, or configuration from Maverick InnoGarage before launch.

## Missing assets and information

1. **Inquiry email address.** None is published. Needed for `CONTACT_TO_EMAIL`, and optionally to display on the site (`company.email` in `src/config/site.ts`).
2. **Company mailbox SMTP details** for the contact form: host, port, mailbox username, password (or app password), and the From address. See "Sending through the company mailbox (SMTP)" in the README. Resend remains supported as an alternative.
3. **MapleRecord product screenshots** and confirmation of whether to link to `maplerecord.com`.
4. **Team or leadership information**, if it should appear on About. None is shown now.
5. **Terms of service**, if required. Only a privacy notice and a cookie policy exist.

## Claims requiring confirmation

| Claim | Status on new site |
|---|---|
| Adobe Solution Partner | **Shown in the site header** at the owner's request (2026-11-03), as Adobe's partner lockup with the **Bronze** tier line (restored at the owner's request, 2026-11-06; the tier comes from MiG's original co-brand file). It could not be confirmed in Adobe's public partner directory. The badge is redrawn as vector artwork (`public/brand/adobe-solution-partner.svg`), so check it against the official badge in Adobe's partner portal and swap in that file if it differs. Set `company.adobePartner.verified = false` to remove it |
| "Over 7 years" experience, "certified experts" | Omitted |
| **All AI Governance service content** | **Proposed.** The old site has no AI governance offering. Confirm the scope you can deliver (every item is marked `provenance: "proposed"`) |
| Data Management → "Data ready for Adobe, analytics, and AI" | Proposed (consent and usage rules before activation, profile quality, AI data approvals) |
| Data Management → data **migration** | **Removed (QA pass, 2026-11-06).** The old /integrated-data-solutions page never offered migration; the capability is now "Data integration" with verified items only. Re-add only if MiG confirms it |
| Adobe → "Profile data governance and quality", "Integration testing", "Documentation and handover" items | Proposed extensions of verified services |
| **Adobe application pages** (`/adobe-services/<product>`, `src/content/adobe/products/*.ts`) | Service **titles** are the verified service types from each old product page and must stay as listed. Explanations, feature overviews, signals, FAQs and illustrative scenarios are **proposed** new copy. Product descriptions were checked against Adobe Experience League (Nov 2026). Confirm the depth of delivery for each application |
| **Adobe platform assessment** (`/adobe-services/assessment`) | Based on the verified Assess stage (current-state assessment with prioritized opportunities). The scope, process, inputs and outputs are **proposed**. No price, duration or "free" claim is made. Confirm you offer it as a standalone first engagement, and who delivers it |
| Adobe hub → "Ways to engage" and "Data governance inside Adobe" sections | **Proposed.** Confirm the engagement models you actually offer and the governance work you deliver inside Adobe applications |
| Adobe Solution Partner panel (hub, product pages, home Adobe section) | Rendered only while `company.adobePartner.verified` is `true` (same switch as the header badge). The badge shows the Bronze tier; the panel copy doesn't repeat it. Same caveats as the header badge above |
| Home → "Adobe Experience Cloud, implemented and connected" section | Lists the seven applications from the old site and links to the assessment. Intro copy is proposed |
| Contact form → "Adobe applications involved" field | New optional field, shown when the interest is Adobe Services and included in the inquiry email. Make sure the owners of the `CONTACT_TO_EMAIL` inbox know it exists and how to route Adobe inquiries |
| Framework mentions (NIST AI RMF, ISO/IEC 42001, EU AI Act) in the AI Governance FAQ | Worded as "help you map / organize documentation", with no legal advice or certification. EU AI Act timelines were amended in 2026, so no dates are quoted. Have counsel review |
| MapleRecord ownership | **Confirmed by Maverick InnoGarage (2026-11-06): Maverick InnoGarage owns MapleRecord.** The MiG pages call it "our product"; the MapleRecord section now says "MapleRecord is a Maverick InnoGarage product" (closing CTA, overview note, Contact, About story), and the Organization JSON-LD lists MapleRecord as a brand. Note: maplerecord.com's footer names "MapleRecord Inc." — if that is a MiG entity, no change is needed; otherwise align the legal name on maplerecord.com |
| MapleRecord product screens and MR Admin page | All product visuals are recreations of the real MapleRecord UI (supplied 2026-11-06) with fictional "City of Harbourview" sample data, labelled "Product screens show sample data." MR Admin was added as the fifth module; its page describes only what the real Admin UI shows (no figures). Confirm the screens may be shown publicly and that the MR Admin description is accurate |
| MapleRecord claims reproduced from maplerecord.com | Published figures stay attributed ("as published by MapleRecord"). Confirm before launch: "Unlimited storage", "Bank-level encryption", "256-bit AES", "HIPAA and GDPR compliance", "Data residency options", "24/7 support", "99.9% uptime", Customer Service "95% SLA compliance" (the source also calls it "95% improvement") |
| MapleRecord solution pages | QA pass: Manufacturing "Quality documentation" challenge rewritten (the source shows Education's text by mistake); FOIA removed from Financial Services; "Join leading banks/… using MapleRecord" CTAs replaced with "See how MapleRecord can help…" (implied a customer base). Confirm these edits |
| AI Governance → Adobe angle | QA pass added "Governing AI features in marketing platforms" (illustrative) and "Because we also implement Adobe applications, we can check configuration as well as policy". Proposed, like the rest of the page |
| Adobe product pages → newly named tools and settings | QA pass made "How we help" items concrete (e.g. Experience Platform Debugger, identity graph linking rules, profile expirations, Experience Fragment export to Target, Cloud Manager quality gates, App Builder, Live Search tuning, Munchkin, SPF/DKIM). All sit under the verified service titles but are proposed copy — confirm MiG's depth in each |
| Adobe platform assessment → process details | "Cost and timeline are confirmed before work starts", "read-only access where possible", and a readout plus current-state map in every assessment. Proposed |
| About page | Principles reduced to four; "Work-life balance" value restored from the old site with new wording; the unverified "named MiG for…" story removed |
| Industries | Adobe rows now name specific applications (e.g. Marketo Engage for healthcare, Commerce B2B for manufacturing). Typical applications, not client claims — confirm they reflect MiG's focus |
| Contact page | "Never a hard sell" (tone); Delaware and Texas share one phone number in `src/config/site.ts` — confirm |
| Insights articles | The six 2024 articles were corrected for 2026 Adobe product facts and naming (original dates kept; there is no "Updated" date field). Two display titles changed (slugs unchanged): "A Comprehensive Guide to Data Governance", "Improving Customer Engagement with Adobe Real-Time CDP". "Continuous improvement" softened to "we review and recommend" — confirm it's an ongoing service |
| Privacy notice (`/privacy`) | Describes this implementation factually (no analytics cookies, essential `mig_consent` cookie, email delivery provider, minimal logs). **Needs legal review**, including retention periods |
| **Cookie policy** (`/cookies`, added 2026-11-06) | Generated from `src/features/consent/config.ts` and factual about today's setup: only the essential `mig_consent` consent cookie (180 days) and the editor-only Draft Mode cookie `__prerender_bypass`. It makes no legal guarantees. **Needs legal review**, including whether the consent model and wording suit the jurisdictions MiG targets (e.g. Canada, US states) |

All use cases and the homepage scenario are labeled "Illustrative use case" on the page and describe no clients.

## Business decisions

- **Microsoft Dynamics 365** and **Digital Transformation** are back as services (Capability Matrix pillars 06 and 05, 2026-11-09). Their legacy URLs now redirect to `/business-transformation#dynamics-365` and `/digital-product#digital-strategy`.
- **Further Adobe applications.** Adobe partners commonly feature applications that MiG doesn't list today: Adobe Journey Optimizer, Customer Journey Analytics, Adobe Workfront, AEM Assets and AEM Forms as separate offers, AEM as a Cloud Service migration, Edge Delivery Services, and Adobe GenStudio for Performance Marketing. **Add a page only if MiG confirms delivery capability** for it (new file in `src/content/adobe/products/`, slug added to `AdobeProductSlug`).
- **Real-Time CDP / AEM versions.** Product pages don't claim AEM 6.5 → Cloud Service migration or Edge Delivery Services builds. Add an FAQ about AEM versions once MiG confirms.
- **MapleRecord inquiries** use the Data Management interest on the contact form. Add a dedicated "MapleRecord" interest if inquiries should be routed separately.
- **Freshness.** All published articles date from December 2024, so "Recent articles" on the home page looks dated. Publishing the drafts (below) would help.
- **Draft articles** in `src/content/insights/`: *Start AI Governance with an Inventory* and *Records Retention: From Schedule to System*. Both are new, unapproved and hidden. Change `status` to `"published"` and add a `published` date to release them.

- **Optional cookie categories.** The consent banner and settings offer **Analytics** and **Marketing** categories, off by default, but neither has any service today, so both say "Not currently in use". Decide whether to keep showing them until a tool is adopted. Adding one means listing it in `src/features/consent/config.ts`, loading it with `ConsentScript`/`ConsentGate`, bumping `CONSENT_VERSION`, and updating `/cookies` and `/privacy` (see README, "Cookie consent").

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

## Business positioning (2026-11-07)

The site now presents Maverick InnoGarage as a **software development and professional services company**, not a consultancy, in this order: AI Governance, Adobe Services, Data Management, Software Development (new page `/software-development`), and MapleRecord. The wording rules are kept in the positioning tests (`tests/positioning.spec.ts`). These need the owner's confirmation before launch:

1. **Software Development scope.** Do we deliver custom applications and workflow automation for clients beyond MapleRecord, and post-launch support? (Capabilities are `provenance: "proposed"` in `src/content/services/software-development.ts`.)
2. **AI Governance capabilities.** All are still `proposed`. Can they be presented as delivered services?
3. **Delivery model.** The site uses four stages (Assess, Design, Implement, Improve); the original site described three (Understand & Strategize, Implement & Integrate, Optimize & Grow).
4. **Adobe Analytics service title.** Approve "Data strategy and measurement planning" (was the verified "Data strategy and consultation").
5. **MapleRecord figures** (84%, 10x, 2–4x, 30–50%, 40%; About: 5+ organizations, 10M+ documents, 99.9% uptime, 24/7 support) need substantiation.
6. **MapleRecord services.** Confirm "configuration, integration with your systems, training and ongoing support".
7. **One team.** About says one team works across all specializations. Is that accurate?
8. **Desktop header.** Software Development is not in the desktop header (no room for an eighth item). Adding it needs a "Services" menu.

## Capability Matrix alignment (2026-11-09)

The site now follows the **Maverick InnoGarage Capability Matrix (Capability Deck, October 2026)** as the primary reference: seven practice pillars, the three-stage delivery approach ("From vision to victory"), eight industries and four offices. Structure:

| Pillar | Page |
|---|---|
| 01 Data & Analytics | `/data-management` (URL kept) |
| 02 Engineering & Technology | `/software-development` (URL kept) |
| 03 Adobe Experience Cloud & MarTech | `/adobe-services` + 8 application pages (new: `/adobe-services/content-management`) |
| 04 Experience Design | `/experience-design` (new) |
| 05 Digital & Product | `/digital-product` (new) |
| 06 Business Transformation & CRM | `/business-transformation` (new) |
| 07 Records Management & Compliance | `/maplerecord` and `/moli` (new) |
| Hub | `/services` (new) |

AI Governance (`/ai-governance`) is kept, positioned as the responsible-AI extension of pillars 01 and 02. **The deck does not list AI governance** — decide whether to keep it.

### Claims requiring confirmation (new)

| Claim | Status |
|---|---|
| **Client impact** (T-Mobile, Wells Fargo, Walmart, NBC Universal) | **Hidden.** The deck attributes these to "Data Affect client testimonials". Confirm MiG's relationship to Data Affect and written permission to name each client, then set `published: true` in `src/content/client-impact.ts` |
| "12+ years" of delivery | Shown (home proof strip, About). The old site said "over 7 years" — confirm which is correct, and whether it includes predecessor entities |
| "Official Adobe Solution Partner" | Deck wording; the badge shows Bronze. Same caveats as the header badge |
| Virginia office (Ashburn, VA) | Added from the deck; no phone number is published for it |
| **MOLI** | Every claim comes from the deck. Confirm: product name and capitalization, availability, the depth of AWS/Azure integration, "designed to support" GDPR, PDPA (read as Singapore's law), PIPEDA and CCPA (CCPA is in the deck title but not in MOLI's own capability line) |
| Engineering & Technology details | Bullets under the deck capabilities (e.g. landing zones and infrastructure as code, performance and load testing, testing across devices) expand on the deck — confirm depth. Only AWS and Azure are named |
| Microsoft Dynamics 365 | Named apps (Sales, Customer Service, Customer Insights – Journeys) are generic; no Microsoft partnership is claimed |
| Experience Design / Digital & Product | Accessibility reviews against WCAG, an in-house design team, Scrum/Kanban practice — confirm |
| Adobe wording | Commerce says "order handling" (not "order orchestration": Adobe's order management product was retired). Analytics says "journey analysis" (Customer Journey Analytics is a separate product). Adobe Content Management is described as delivered with AEM Sites and Assets, since Adobe has no separate product of that name |
| Data & Analytics | Data science, predictive modeling and visualization bullets are general descriptions of the deck items |
| Industries | Each industry's focus line is from the deck; healthcare says "HIPAA-aware" with no compliance claim. Applications per pillar are typical needs, not client work |
| All use cases | Labelled "Illustrative use case"; none describe clients |

## Final verification round (2026-11-09)

Every page was reviewed in a browser at desktop, tablet and mobile, fixed and re-verified (screenshots: `qa-out/before/` and `qa-out/after/`, one folder per page). New items needing confirmation:

| Item | Status |
|---|---|
| Home hero | New headline "One partner for data, AI, Adobe and cloud.", eyebrow "Adobe Solution Partner · 12+ years of delivery", capability map linking AI Governance, Adobe Experience Cloud, Data & Analytics and Engineering & Technology. Confirm the wording |
| AI Governance prominence | Now a featured band on `/services` and a card on `/about`; all nine capabilities are still `provenance: "proposed"` |
| Custom applications and workflow automation | Marked `verified` on `/software-development` on the basis of the owner naming enterprise technology solutions as core; confirm it is sold to clients beyond MapleRecord |
| Adobe facts updated | Analytics: 1.4 API end of life (Aug 31, 2026) and legacy Report Builder retirement noted, with a migration service item. AEP article: Attribution AI removed (not sold to new customers); AI Assistant / Agent Orchestrator added. AEM article: 6.5 LTS mentioned. Confirm MiG delivers the 1.4 → 2.0 API migration |
| Virginia office | No phone published; the site routes callers to the main line (Delaware and Texas). Confirm |
| MapleRecord figures | Unchanged and attributed to maplerecord.com. Inconsistencies to resolve: Legal "90% risk reduction" vs body "improvement in compliance adherence"; Customer service "95% SLA compliance" (rate or improvement?); About stats (5+ organizations, 99.9% uptime, 24/7 support) read like commitments |
| MapleRecord capabilities not shown in screens | Barcode/RFID, 100+ field types, rollback, end-to-end encryption, data residency, named integrations (SAP, Oracle, NetSuite, EMRs, SIS, LIMS/ELN) — from maplerecord.com, unverified |
| MapleRecord wording | Workflow automation is now consistently "no-code" (overview previously said "low-code") |
| Privacy notice and cookie policy | Updated for accuracy (email provider wording, MOLI scope, mobile "On this page"); still need legal review |

## Positioning: governance and MarTech (2026-11-10)

Owner direction: lead with **Information Governance, Data Governance, AI Governance and MarTech**; Adobe is the platform we deliver MarTech on, not the headline. Changes:

- New page `/information-governance` (Capability Matrix pillar 07, deck "Records Management & Compliance", now labeled "Information Governance & Records"), delivered with MapleRecord and MOLI.
- `coreExpertiseNav` in `src/config/navigation.ts` (the four areas); Services menu, footer, 404, home, `/services` and About lead with them. Header item "Adobe Services" is now "MarTech" (same URL, `/adobe-services`); pillar 03 is labeled "MarTech & Adobe Experience Cloud"; the insights theme "Adobe" is now "MarTech".
- Home hero: "Information, data and AI governance. MarTech built on it."

Needs owner confirmation: the new headlines (home, `/services` "Governance and MarTech. One accountable partner.", `/adobe-services` "Governed customer data. Connected customer journeys.", `/information-governance` "Govern every record from capture to defensible disposition."); calling AI Governance one of four core areas (not a deck pillar); the "Information Governance" label for pillar 07; Information Governance "implementation and support" capability (proposed) and the "configured in weeks" FAQ (from MapleRecord's published FAQ); the summary lines on the core-expertise cards; MR Admin integrations named in the product screens (OpenAI, DocuSign, DiDit, Stripe, Microsoft Entra, SharePoint).
