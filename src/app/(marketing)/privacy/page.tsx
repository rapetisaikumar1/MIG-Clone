import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/layout";
import { company } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description: "How the Maverick InnoGarage website handles information submitted through its contact form.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>Privacy</Eyebrow>
          <h1 className="mt-6 text-h1">Website privacy notice</h1>
          <p className="mt-4 text-sm text-muted">Last updated: November 3, 2026</p>
          <div className="prose-mig mt-10">
            <p>
              This notice explains how the {company.name} website handles the information you share with us. It covers this
              website only.
            </p>
            <h2>Information you send us</h2>
            <p>
              When you use the contact form, we collect your name, business email, company name, optional telephone number, area
              of interest, and your message. We use this information only to respond to your inquiry and to continue any
              conversation that follows.
            </p>
            <h2>How your message reaches us</h2>
            <p>
              Form submissions are validated on our server and delivered to our team by email through a third-party email
              delivery provider. We don&apos;t sell your information or use it for advertising.
            </p>
            <h2>Cookies and analytics</h2>
            <p>
              This website does not use advertising or analytics cookies. Our hosting provider may keep standard technical logs
              (for example IP address and request time) to operate and protect the site. Our own server logs record whether a
              form submission succeeded, not the content of your message.
            </p>
            <h2>Your choices</h2>
            <p>
              To ask about the information we hold about you, or to have it corrected or deleted, contact us using the telephone
              numbers on our <Link href="/contact">contact page</Link>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
