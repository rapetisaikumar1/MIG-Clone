import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui/layout";
import { buttonVariants } from "@/components/ui/button";
import { company } from "@/config/site";
import { Breadcrumbs } from "@/features/services/sections";
import { pageMetadata } from "@/lib/metadata";
import { OnThisPage, OnThisPageDisclosure, type TocItem } from "../privacy/on-this-page";
import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { CONSENT_COOKIE, CONSENT_MAX_AGE_DAYS, CONSENT_SYNC_KEY, consentCategories } from "@/features/consent/config";
import { CookiePolicyTable, getPolicyCookies } from "@/features/consent/cookie-policy-table";
import { CookieSettingsButton } from "@/features/consent/cookie-settings-button";

export const metadata = pageMetadata({
  title: "Cookie policy",
  description: "The cookies the Maverick InnoGarage website sets, why it sets them, how long they last, and how to change or withdraw your consent.",
  path: "/cookies",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "Cookie policy" }];

const code = "whitespace-nowrap font-mono text-[0.875em] text-ink";

/** Mirrors the h2 headings below (id and text); keep the two in step. */
const cookieSections: TocItem[] = [
  { id: "what-cookies-are", title: "What cookies are" },
  { id: "cookie-categories", title: "Cookie categories" },
  { id: "cookies-this-website-can-set", title: "Cookies this website can set" },
  { id: "how-we-store-your-choice", title: "How we store your choice" },
  { id: "changing-or-withdrawing-your-consent", title: "Changing or withdrawing your consent" },
  { id: "controlling-cookies-in-your-browser", title: "Controlling cookies in your browser" },
  { id: "questions", title: "Questions" },
];

/*
 * Generated from src/features/consent/config.ts (categories, cookies, services), so the lists here
 * follow the configuration. The prose around them describes src/features/consent/store.ts; keep it
 * in step when that changes (including the CONSENT_SYNC_KEY storage key from config.ts).
 * Status: factual draft that still needs legal review (docs/HANDOFF.md).
 */
export default function CookiePolicyPage() {
  const cookies = getPolicyCookies();
  const hasPrefixCookies = cookies.some((c) => c.prefix);
  return (
    <section className="pb-20 pt-10 sm:pb-24 lg:pt-14">
      <Container>
        <JsonLd data={breadcrumbJsonLd(crumbs, "/cookies")} />
        <Breadcrumbs items={crumbs} />
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="max-w-2xl lg:col-span-8 lg:max-w-3xl">
            <Eyebrow>Legal · Cookies</Eyebrow>
            <h1 className="mt-6 text-h1">Cookie policy</h1>
            <p className="mt-4 text-sm text-muted">Last updated: November 9, 2026</p>
            <OnThisPageDisclosure items={cookieSections} className="mt-8 lg:hidden" />
            <div className="prose-mig mt-10">
              <p>
                This policy explains which cookies the {company.name} ({company.shortName}) website sets, what they are for, and
                how you can control them. {company.descriptor}
              </p>
              <p>
                This policy covers this website only. It does not cover the MapleRecord or MOLI applications, or
                maplerecord.com, MapleRecord&apos;s product site.
              </p>

              <h2 id="what-cookies-are">What cookies are</h2>
              <p>
                Cookies are small text files that a website asks your browser to store. The site can read them on later visits,
                for example to remember a setting you chose. Cookies set by the site you are visiting are first-party cookies;
                cookies set by another company&apos;s service embedded in the page are third-party cookies.
              </p>

              <h2 id="cookie-categories">Cookie categories</h2>
              <p>
                We group cookies by what they do. Essential cookies are always on. Optional categories stay off unless you
                allow them.
              </p>
              {consentCategories.map((category) => {
                const inUse = category.services.length > 0 || category.cookies.length > 0;
                return (
                  <div key={category.id}>
                    <h3>{category.label}</h3>
                    <p className="mt-2 font-mono text-label uppercase text-muted">
                      <span className="whitespace-nowrap">{category.required ? "Always on" : "Off unless you allow it"}</span>
                      {inUse ? (
                        null
                      ) : (
                        <>
                          {" · "}
                          <span className="whitespace-nowrap">Not currently in use</span>
                        </>
                      )}
                    </p>
                    <p className="mt-3">{category.description}</p>
                  </div>
                );
              })}

              <h2 id="cookies-this-website-can-set">Cookies this website can set</h2>
              <p>
                This is the complete list. We don&apos;t set any analytics, advertising or third-party cookies today. If we add a
                service that sets cookies, it will appear here first.
              </p>
              <CookiePolicyTable />
              {hasPrefixCookies ? <p className="text-sm text-muted">* The name starts with this prefix.</p> : null}

              <h2 id="how-we-store-your-choice">How we store your choice</h2>
              <p>
                When you choose which cookies to allow, we save your choice in the essential <code className={code}>{CONSENT_COOKIE}</code>{" "}
                cookie on your device. It records which optional categories you allowed, the version of this policy you
                answered, and when you answered. It doesn&apos;t identify you, and we don&apos;t use it for anything else.
              </p>
              <p>
                We ask again after {CONSENT_MAX_AGE_DAYS} days, and sooner if we change the categories or add a service, so your
                choice covers the cookies actually in use. To keep other open tabs of this site in step when you
                change your choice, your browser&apos;s local storage also keeps a timestamp of the last change under{" "}
                <code className={code}>{CONSENT_SYNC_KEY}</code>. It contains nothing else.
              </p>

              <h2 id="changing-or-withdrawing-your-consent">Changing or withdrawing your consent</h2>
              <p>
                You can change or withdraw your choice at any time. Open the cookie settings here, or use &ldquo;Cookie
                settings&rdquo; at the bottom of every page. When you switch an optional
                category off, we delete the cookies listed for it.
              </p>
              <div>
                <CookieSettingsButton className={buttonVariants({ variant: "outline", size: "sm", className: "cursor-pointer" })}>
                  Open cookie settings
                </CookieSettingsButton>
              </div>

              <h2 id="controlling-cookies-in-your-browser">Controlling cookies in your browser</h2>
              <p>
                Most browsers let you see, block and delete cookies in their privacy or site settings, and many offer a private
                browsing mode that clears cookies when you close it. If you block or delete the{" "}
                <code className={code}>{CONSENT_COOKIE}</code> cookie, the site can&apos;t remember your choice and will ask you
                again.
              </p>

              <h2 id="questions">Questions</h2>
              <p>
                If you have a question about this policy, please get in touch through our <Link href="/contact">contact page</Link>. Our{" "}
                <Link href="/privacy">privacy notice</Link> explains how we handle the information you send us.
              </p>
            </div>
          </div>
          <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block xl:col-span-3 xl:col-start-10">
            <OnThisPage items={cookieSections} />
          </aside>
        </div>
      </Container>
    </section>
  );
}
