import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/layout";
import { company } from "@/config/site";
import { Breadcrumbs } from "@/features/services/sections";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description: "How the Maverick InnoGarage website handles information submitted through its contact form, and what it does not collect.",
  path: "/privacy",
});

/*
 * Describes the actual implementation; keep it in step with the code when it changes:
 * - fields: src/features/contact/schema.ts (contactSchema)
 * - delivery and logging: src/server/contact/submit.ts, src/server/email/resend.ts
 * - abuse controls: src/app/api/contact/route.ts, src/server/contact/rate-limit.ts
 * - prefill query parameters: src/app/(marketing)/contact/page.tsx, src/features/contact/links.ts
 * Status: factual draft that still needs legal review (docs/HANDOFF.md), including retention periods.
 */
export default function PrivacyPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-24 lg:pt-14">
      <Container>
        <JsonLd data={breadcrumbJsonLd([{ label: "Home", href: "/" }, { label: "Privacy notice" }], "/privacy")} />
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy notice" }]} />
        <div className="mt-12 max-w-3xl">
          <Eyebrow>Privacy</Eyebrow>
          <h1 className="mt-6 text-h1">Website privacy notice</h1>
          <p className="mt-4 text-sm text-muted">Last updated: November 6, 2026</p>
          <div className="prose-mig mt-10">
            <p>
              This notice explains how the {company.name} ({company.shortName}) website handles the information you share with
              us. It covers this website only. It does not cover the MapleRecord application or the work we do for clients.
            </p>

            <h2>Information you send us</h2>
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

            <h2>Links that prefill the form</h2>
            <p>
              Some links on this site open the contact form with an area of interest, an Adobe application or a starting message
              already filled in, using values in the page address (for example <code className="whitespace-nowrap font-mono text-[0.875em] text-ink">?interest=adobe-services</code>). These
              values only prefill the form. You can change them, and nothing is sent until you submit the form.
            </p>

            <h2>How your message reaches us</h2>
            <p>
              Form submissions are checked on our server and delivered to our team by email through a third-party email delivery
              provider. Replies come from our team to the email address you gave. We don&apos;t sell your information or use it
              for advertising.
            </p>

            <h2>Protecting the form from abuse</h2>
            <p>
              To limit repeated or automated submissions, our server temporarily keeps the network (IP) address of each request
              to the form in memory, and the form includes a hidden field and a timing check that help detect automated
              submissions. These checks don&apos;t store the IP address in our logs or in a database.
            </p>

            <h2>Cookies and analytics</h2>
            <p>
              This website doesn&apos;t use advertising or analytics cookies, analytics scripts or third-party trackers, and its
              fonts are served from this site rather than a third-party font service. Our editors use a technical cookie to
              preview unpublished pages; visitors don&apos;t receive it.
            </p>
            <p>
              Our hosting provider may keep standard technical logs (for example IP address and request time) to operate and
              protect the site. Our own server logs record whether a form submission was delivered, the area of interest, and how
              many Adobe applications were selected. They don&apos;t record your name, contact details or message.
            </p>

            <h2>Links to other sites</h2>
            <p>
              Links to our social media profiles and to the MapleRecord website take you to sites with their own privacy
              policies. MapleRecord demo requests use the form on maplerecord.com, which its own privacy policy covers.
            </p>

            <h2>Your choices</h2>
            <p>
              To ask about the information we hold about you, or to have it corrected or deleted, call one of the telephone
              numbers on our <Link href="/contact">contact page</Link> or send us a message using the contact form.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
