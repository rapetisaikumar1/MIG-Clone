# MapleRecord section — sources and editorial notes

Every MapleRecord page in this site (`/maplerecord/**`) is built from the official website, **maplerecord.com**, crawled with a real browser on 2026-11-03. That crawl included the interactive tabs, menus and buttons that only appear after JavaScript runs.

## Pages crawled → where the content lives

| maplerecord.com | This site | Content file |
|---|---|---|
| `/` (hero, 4 module tabs, 7 department tabs, 4 pillars, 6 features, FAQ) | `/maplerecord` | `src/content/maplerecord/overview.ts`, `modules.ts` |
| `/platform/mr-records/`, `/mr-request/`, `/mr-workflow/`, `/mr-forms/` | `/maplerecord/platform/[module]` | `modules.ts` (generated) |
| `/solution/*` (6 industries, 6 departments) | `/maplerecord/solutions/[slug]` | `solutions.ts` (generated) |
| `/blogs/` and 3 blog posts | `/maplerecord/resources`, `/maplerecord/resources/[slug]` | `articles.ts` (generated) |
| `/about-us/` | `/maplerecord/about` | `about.ts` (`mrAbout`) |
| `/contact-us/` | `/maplerecord/contact` | `contact.ts` (`mrContact`) |
| `/videos/`, `/webinar/`, `/events/`, `/media/` | Linked from `/maplerecord/resources` | `resources.ts` (`mrResourceHubs`) |
| `/terms/`, `/privacy-policy/` | Linked from `/maplerecord/contact` | — |

`modules.ts`, `solutions.ts` and `articles.ts` were generated from the crawl and then reviewed. Images (33 product screenshots and photos) were converted to WebP under `public/maplerecord/`. The MapleRecord logo was taken from the site header, and only page-specific attributes were removed.

## Edits made to the source text

- Acronym casing restored where the site's CSS capitalization broke it: FOIA, HIPAA, FERPA, SLA, IP, ISO, HR, R&D, eDiscovery.
- Missing commas added to lists on the MR Requests and MR Workflows pages. Wording is unchanged.
- Typos fixed: "RComplete" → "Complete". "Human resource" → "Human resources".
- In blog posts, list lead-ins that were marked up as headings are shown as paragraphs.

## Deliberately not reproduced

| Item on maplerecord.com | Why |
|---|---|
| Financial Services stat with value "Risk", label duplicated from another stat, body "foperational and compliance risk…" | Broken on the source. The intended figure can't be inferred |
| Upcoming webinars (Jan–Feb 2026) and events (Feb–Mar 2026) with speakers and registration counts | Dates have passed, so showing them as "upcoming" would be wrong. We link to the hubs instead |
| Video cards, press coverage (TechCrunch, Financial Times, VentureBeat), awards | Their links point to `#`, so the claims can't be checked. Linked as hubs only |
| Video and webinar statistics (125K+ views, 50+ webinars, ratings) | Not tied to verifiable content |
| "Join thousands of teams already using MapleRecord" | Conflicts with the About page's "5+ Organizations" |
| "No credit card required • Cancel anytime" | Pricing terms aren't published anywhere else on the site |
| Blog author ("Author", "10+ years of experience…") | Placeholder on the source |

The statistics that are shown (for example "Up to 10× faster record retrieval" and "5+ Organizations") are MapleRecord's own published figures. They appear with the note "Figures as published by MapleRecord".

## Issues found on maplerecord.com (to report to MapleRecord)

- The home page "Learn more" button for MR Workflows goes to `/platform/mr-workflows`, which is a **404**. The menu correctly uses `/platform/mr-workflow/`.
- Footer social links (`/facebook/`, `/instagram/`, `/twitter/`, `/linkedin/`) and `/affiliate/` are **404**.
- Blog dates differ between the index (2024) and the article pages (2025). This site uses the article-page dates.
- MR Workflows' problem cards on the source pair headings and text incorrectly, and the first repeats MR Requests' text. **Corrected (QA pass, 2026-11-06):** cards re-paired as on the live page and the duplicate dropped. MR Forms reused the Workflows hero image on the source; the Forms page now uses MapleRecord's own form-builder image.
- Manufacturing's "Quality documentation" challenge shows Education's transcript text on the source. **Rewritten** using the page's own terms (quality records, inspection reports, test results).
- Financial Services listed "FOIA requests" (FOIA doesn't apply to private banks) — removed. Solution CTAs "Join leading … using MapleRecord" implied a customer base and were replaced with "See how MapleRecord can help…".
- QA pass also applied sentence case, American spelling (e.g. "Standardize"), consistent number formats (10×, 2–4×, 30–50%) and descriptive image alt text. No figures were added or changed.
- The page `<title>` is empty on every page.

## Calls to action

Every "Request a demo" button opens `https://maplerecord.com/contact-us/#schedule-demo` in a new tab, because that's where MapleRecord's own demo form lives. Visitors can also contact Maverick InnoGarage through `/contact?interest=data-management`.

## Refreshing the content

Re-crawl maplerecord.com and regenerate the three generated files when the official site changes. Then run `npm run test:e2e`: `tests/maplerecord.spec.ts` checks every MapleRecord page, link, image and tab.

## Redesign pass (2026-11-06)

The MapleRecord section was redesigned on its own design system (`src/features/maplerecord/mr-ui.tsx`: app-window frames, dark/light product stages, product badge, chips, link cards) with page-specific sections in `overview-sections.tsx`, `platform-sections.tsx`, `solution-sections.tsx`, `resource-sections.tsx` and `company-sections.tsx`. Copy edits in this pass were limited to clarity and consistency: sentence case, American English, removing hype words ("seamlessly", "empowers"), full sentences in place of fragments, solution h1s as "MapleRecord for …", and stat captions that no longer repeat their labels. No figures, claims or features were added. Published figures stay attributed ("Figures as published by MapleRecord"). Where a source stat read "Improved …" without a number, the value shows a check mark (✓) and the label carries the wording. MR Requests now shows its published 30–45% and 40–60% figures as stat values (previously only in body text). The About values cards gained short titles derived from their existing text. The `about-open.webp` stock photo is no longer used and was removed.
