import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/layout";
import { company } from "@/config/site";
import { Breadcrumbs } from "@/features/services/sections";
import { pageMetadata } from "@/lib/metadata";
import { OnThisPage, type TocItem } from "./on-this-page";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS } from "@/features/consent/config";
import { CookieSettingsButton } from "@/features/consent/cookie-settings-button";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description: "How the Maverick InnoGarage website handles information submitted through its contact form, and what it does not collect.",
  path: "/privacy",
});

/** Mirrors the h2 headings below (id and text); keep the two in step. */
const privacySections: TocItem[] = [
  { id: "information-you-send-us", title: "Information you send us" },
  { id: "links-that-prefill-the-form", title: "Links that prefill the form" },
  { id: "how-your-message-reaches-us", title: "How your message reaches us" },
  { id: "protecting-the-form-from-abuse", title: "Protecting the form from abuse" },
  { id: "cookies-and-analytics", title: "Cookies and analytics" },
  { id: "links-to-other-sites", title: "Links to other sites" },
  { id: "your-choices", title: "Your choices" },
];

/*
 * Describes the actual implementation; keep it in step with the code when it changes:
 * - fields: src/features/contact/schema.ts (contactSchema)
 * - delivery and logging: src/server/contact/submit.ts, src/server/email/resend.ts
 * - abuse controls: src/app/api/contact/route.ts, src/server/contact/rate-limit.ts
 * - prefill query parameters: src/app/(marketing)/contact/page.tsx, src/features/contact/links.ts
 * - cookies and consent categories: src/features/consent/config.ts (also drives /cookies)
 * Status: factual draft that still needs legal review (docs/HANDOFF.md), including retention periods.
 */
export default function PrivacyPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 lg:pt-14">
      <Container>
        <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Privacy notice" }], "/privacy")} />
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy notice" }]} />
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="max-w-3xl lg:col-span-8">
            <Eyebrow>Legal · Privacy</Eyebrow>
            <h1 className="mt-6 text-h1">Website privacy notice</h1>
            <p className="mt-4 text-sm text-muted">Last updated: November 6, 2026</p>
            <div className="prose-mig mt-10">
              <p>
                This notice explains how the {company.name} ({company.shortName}) website handles the information you share with
                us. {company.descriptor}
              </p>
              <p>
                This notice covers this website only. It does not cover the MapleRecord application or the software and services we
                deliver for clients.
              </p>

              <h2 id="information-you-send-us">Information you send us</h2>
              <p>When you use our contact form, we collect:</p>
              <ul>
                <li>your name, business email and company name</li>
                <li>your telephone number, if you choose to give it</li>
                <li>the area of interest you select</li>
                <li>for Adobe inquiries, the Adobe applications involved, if you choose to tick any</li>
                <li>your message</li>
              </ul>
              <p>
                We use this information only to respond to your inquiry and to continue any conversation that follows. Please
                don&apos;t include sensitive personal information in your message.
              </p>

              <h2 id="links-that-prefill-the-form">Links that prefill the form</h2>
              <p>
                Some links on this site open the contact form with an area of interest, an Adobe application or a starting message
                already filled in, using values in the page address (for example <code className="whitespace-nowrap font-mono text-[0.875em] text-ink">?interest=adobe-services</code>). These
                values only prefill the form. You can change them, and nothing is sent until you submit the form.
              </p>

              <h2 id="how-your-message-reaches-us">How your message reaches us</h2>
              <p>
                Form submissions are checked on our server and delivered to our team by email through a third-party email delivery
                provider. Replies come from our team to the email address you gave. We don&apos;t sell your information or use it
                for advertising.
              </p>

              <h2 id="protecting-the-form-from-abuse">Protecting the form from abuse</h2>
              <p>
                To limit repeated or automated submissions, our server temporarily keeps the network (IP) address of each request
                to the form in memory, and the form includes a hidden field and a timing check that help detect automated
                submissions. These checks don&apos;t store the IP address in our logs or in a database.
              </p>

              <h2 id="cookies-and-analytics">Cookies and analytics</h2>
              <p>
                This website doesn&apos;t use advertising or analytics cookies, analytics scripts or third-party trackers, and its
                fonts are served from this site rather than a third-party font service. It sets one essential cookie,{" "}
                <code className="whitespace-nowrap font-mono text-[0.875em] text-ink">{CONSENT_COOKIE}</code>, which remembers your
                cookie choices for {CONSENT_MAX_AGE_DAYS} days. Our editors use a technical cookie to preview unpublished pages;
                visitors don&apos;t receive it.
              </p>
              <p>
                Our cookie settings also include optional Analytics and Marketing categories. They are off unless you allow them,
                and nothing in either category is in use today. Our <Link href="/cookies">cookie policy</Link> lists every cookie
                this site can set, and you can change your choice at any time.
              </p>
              <div>
                <CookieSettingsButton className={buttonVariants({ variant: "outline", size: "sm", className: "cursor-pointer" })}>
                  Open cookie settings
                </CookieSettingsButton>
              </div>
              <p>
                Our hosting provider may keep standard technical logs (for example IP address and request time) to operate and
                protect the site. Our own server logs record whether a form submission was delivered, the area of interest, and how
                many Adobe applications were selected. They don&apos;t record your name, contact details or message.
              </p>

              <h2 id="links-to-other-sites">Links to other sites</h2>
              <p>
                Links to our social media profiles and to the MapleRecord website take you to sites with their own privacy
                policies. MapleRecord demo requests use the form on maplerecord.com, which its own privacy policy covers.
              </p>

              <h2 id="your-choices">Your choices</h2>
              <p>
                To ask about the information we hold about you, or to have it corrected or deleted, please get in touch. Our{" "}
                <Link href="/contact">contact page</Link> lists a telephone number for each of our offices.
              </p>
            </div>
          </div>
          <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block xl:col-span-3 xl:col-start-10">
            <OnThisPage items={privacySections} />
          </aside>
        </div>
      </Container>
    </section>
  );
}
