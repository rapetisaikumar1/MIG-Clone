# URL migration map

The source list is `src/config/redirects.ts`. All redirects are permanent (308) and are covered by `tests/navigation.spec.ts`. Legacy URLs had trailing slashes: `/about/` → `/about` is handled automatically by Next.js and then follows the rule below (two hops at most).

## Retained (same path)

| Old URL | New URL |
|---|---|
| `/` | `/` |
| `/about/` | `/about` |
| `/contact/` | `/contact` |
| `/maplerecord/` | `/maplerecord` |

## New pages

`/ai-governance`, `/adobe-services`, `/data-management`, `/industries`, `/insights`, `/privacy`

Adobe application pages (one per product in `src/content/adobe/products/`; each product's `legacyPaths` lists the old URLs that redirect to it):
`/adobe-services/experience-platform`, `/adobe-services/real-time-cdp`, `/adobe-services/experience-manager`, `/adobe-services/analytics`, `/adobe-services/target`, `/adobe-services/marketo-engage`, `/adobe-services/commerce`

`/adobe-services/assessment`: Adobe platform assessment landing page (no legacy equivalent).

All of these are in the sitemap (priority 0.8).

## Consolidated or redirected

| Old URL | New URL | Note |
|---|---|---|
| `/blog/` | `/insights` | Renamed |
| `/feed/`, `/comments/feed/` | `/insights` | WordPress feeds retired |
| `/adobe-experience-cloud/` | `/adobe-services` | Consolidated |
| `/adobe-experience-platform/` | `/adobe-services/experience-platform` | Renamed (dedicated page) |
| `/adobe-real-time-cdp/` | `/adobe-services/real-time-cdp` | Renamed (dedicated page) |
| `/adobe-experience-manager/` | `/adobe-services/experience-manager` | Renamed (dedicated page) |
| `/adobe-content-management/` | `/adobe-services/experience-manager` | Merged into Experience Manager |
| `/adobe-analytics/` | `/adobe-services/analytics` | Renamed (dedicated page) |
| `/adobe-target/` | `/adobe-services/target` | Renamed (dedicated page) |
| `/adobe-marketo-services/` | `/adobe-services/marketo-engage` | Renamed (dedicated page) |
| `/adobe-commerce/` | `/adobe-services/commerce` | Renamed (dedicated page) |
| `/data-governance/` | `/data-management#governance` | Consolidated |
| `/integrated-data-solutions/` | `/data-management#integration` | Consolidated |
| `/microsoft-dynamics-365/` | `/data-management#integration` | **Retired, pending decision** (see HANDOFF) |
| `/digital-transformation-consulting/` | `/about#approach` | Retired |
| `/healthcare-pharmaceutical/` | `/industries#healthcare-pharmaceutical` | Consolidated |
| `/retail-cpg/` | `/industries#retail-cpg` | Consolidated |
| `/manufacturing-distribution/` | `/industries#manufacturing-distribution` | Consolidated |
| `/telecommunications/` | `/industries#telecommunications` | Consolidated |
| `/government-public-sector/` | `/industries#government-public-sector` | Consolidated |
| `/media-entertainment/` | `/industries#media-entertainment` | Consolidated |
| `/financial-sector/` | `/industries#financial-sector` | Consolidated |
| `/software-technology/` | `/industries#software-technology` | Consolidated |
| `/the-importance-of-data-governance-in-the-digital-age/` | `/insights/the-importance-of-data-governance-in-the-digital-age` | Moved |
| `/maximizing-efficiency-with-adobe-experience-manager/` | `/insights/maximizing-efficiency-with-adobe-experience-manager` | Moved |
| `/revolutionizing-customer-engagement-with-adobe-real-time-cdp/` | `/insights/revolutionizing-customer-engagement-with-adobe-real-time-cdp` | Moved |
| `/driving-customer-experience-excellence-with-adobe-experience-platform/` | `/insights/driving-customer-experience-excellence-with-adobe-experience-platform` | Moved |
| `/enhancing-customer-experience-with-personalization-and-innovation/` | `/insights/enhancing-customer-experience-with-personalization-and-innovation` | Moved |
| `/enhancing-customer-experience-the-key-to-business-success/` | `/insights/enhancing-customer-experience-with-personalization-and-innovation` | Consolidated (overlapping topic) |
| `/benefits-of-adobe-experience-cloud-for-your-business/` | `/insights/data-governance-guide` | URL actually served the data governance guide |
| `/the-importance-of-effective-records-management-in-todays-digital-era/` | `/insights/data-governance-guide` | Served an identical copy of the same guide |
| `/top-5-benefits-of-adobe-experience-cloud-for-your-business/` | `/insights` | Served a generic digital transformation article. Retired |

## Not migrated

- `/wp-content/uploads/*` images aren't referenced by the new site. Only the logo files were carried over, into `/public/brand/`.
- The old "Terms of Services" and "Privacy Policies" footer links had no destination. A new `/privacy` notice exists. There is no terms page.
