# Existing-site inventory (reviewed 2026-11-02)

Source: maverickinnogarage.com (WordPress + Elementor, Yoast sitemaps). All 35 sitemap URLs were fetched. `/privacy-policy`, `/terms*`, `/services`, `/industries`, `/insights` return 404 on the old site.

## Logo assets

| File (old site) | Use | Stored as |
|---|---|---|
| `2024/12/MIG_Logo-2-1.svg` (180×80, ink #111111, red dot #FF0000, wordmark #777777) | Primary lockup, light backgrounds | `public/brand/mig-logo.svg` |
| `2024/11/MIG_Logo_white.svg` (72×32, #EEEEEE / #666666 / #FF0000) | Dark backgrounds | `public/brand/mig-logo-white.svg` |
| `2024/11/logo.svg` (mark only) | Favicon source (centered, unmodified, in `src/app/icon.svg`) | `public/brand/mig-mark.svg` |
| `2024/12/MIG_Logo_D.svg` | Same lockup as primary at 72×32. Not needed | — |
| `2025/01/MiGxAdobe.svg` | "Adobe Solution Partner · Bronze" co-brand lockup. Its "Adobe Solution Partner" and "BRONZE" lettering, with the classic Adobe "A" mark, form the badge shown site-wide (header and partner panels) | `public/brand/mig-adobe-solution-partner.svg`, `public/brand/adobe-solution-partner.svg` |

## Contact details (verified)

Matches the brief exactly. The secondary form block on the old site writes Delaware as "8 The Green **St** #20296 Dover, DE, 19901." The primary contact section (used here) omits "St". **No email address is published anywhere on the site.**

Social: LinkedIn `/company/maverick-innogarage/`, Facebook `profile.php?id=61557012232816`, Instagram `/maverickinnogarage/`, X `@Maverick_MIG`.

## Verified company information

- Name: Maverick InnoGarage (MiG). Offices: Delaware, Texas, Ontario.
- Self-described values (About page): innovation, collaboration, continuous learning, work-life balance, inclusivity, community engagement.
- Stated approach: Understand & Strategize → Implement & Integrate → Optimize & Grow.
- **Claims not independently verifiable:** "Over 7 years" of experience, "Official Adobe Solution Partner" (Bronze per co-brand file), "certified experts", "diverse team". These are omitted from the new site.

## Adobe capabilities on the old site

Adobe Experience Platform, Real-Time CDP, Experience Manager, Content Management (AEM), Analytics, Target, Marketo, Commerce, Experience Cloud. Per-product service types are recorded in `src/content/services/adobe-services.ts`.

## Data services on the old site

Data Governance (quality, compliance, security, stewardship, lifecycle, metadata; strategy, policy, technology, training), Integrated Data Solutions (integration, quality, real-time access, scalable architecture, analytics, security), Records Management (nav only, no page).

Also listed, outside the new focus: Microsoft Dynamics 365, Digital Transformation Consulting, Customer Experience Optimization, Content Creation & Management.

## MapleRecord (verified from /maplerecord)

Records management software for government and municipalities: dynamic record series and retention schedules, workflow automation, standalone workspace management, role-based access control, unified platform, "fully customized". `maplerecord.com` serves a client-rendered app shell with no readable product content.

## Articles

| Old URL | Actual content | Decision |
|---|---|---|
| benefits-of-adobe-experience-cloud-for-your-business | "Unlocking the Power of Data: A Comprehensive Guide to Data Governance" | Retained as `/insights/data-governance-guide` |
| the-importance-of-effective-records-management-in-todays-digital-era | Identical copy of the guide above | Redirected. Draft replacement written |
| top-5-benefits-of-adobe-experience-cloud-for-your-business | "Embracing the Future: A Comprehensive Guide to Digital Transformation" | Retired |
| the-importance-of-data-governance-in-the-digital-age | As titled | Retained |
| maximizing-efficiency-with-adobe-experience-manager | As titled | Retained |
| revolutionizing-customer-engagement-with-adobe-real-time-cdp | As titled | Retained |
| driving-customer-experience-excellence-with-adobe-experience-platform | As titled | Retained |
| enhancing-customer-experience-with-personalization-and-innovation | As titled | Retained |
| enhancing-customer-experience-the-key-to-business-success | Generic CX, overlaps the above | Consolidated |

Edits made when porting: heading levels normalized, "certified experts" → "our team", legacy "Adobe Marketing Cloud" → "other Adobe applications", and the data governance "Case Study" relabeled and reworded as an explicitly hypothetical "illustrative scenario". Original publication dates kept. Authors appeared only as WordPress usernames ("vedant", "charmi"), so no author is shown.

## Content needing correction on the old site (fixed in the rebuild)

- Homepage "Adobe Real-Time CDP" card described Adobe Audience Manager.
- Three article URLs served the wrong article (see table).
- Spelling: "Experties", "Approch", "Flowless User Experience".
- Marketo page heading read "Our Adobe Experience Cloud Services". The AEM page's features heading read "Key Features of Adobe Experience Cloud".
- Duplicate feature headings ("Advanced Segmentation", "Personalization at Scale", "Automated Segmentation" twice).
- Footer legal links had no destination.
- The blog index listed two posts ("Unlocking the Power of Data", "Embracing the Future") without working links of their own.
