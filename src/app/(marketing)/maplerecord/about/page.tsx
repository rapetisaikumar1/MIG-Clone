import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { mrAbout } from "@/content/maplerecord/about";
import { MrIndustriesSection, MrPurposeSection, MrStorySection, MrValuesSection } from "@/features/maplerecord/company-sections";
import { MrCta, MrHero, MrStatsSection } from "@/features/maplerecord/mr-sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About MapleRecord",
  description: mrAbout.tagline,
  path: "/maplerecord/about",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "About" }];

export default function MrAboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, "/maplerecord/about")} />
      <MrHero
        crumbs={crumbs}
        eyebrow="Company"
        title={mrAbout.title}
        description={mrAbout.tagline}
        image={mrAbout.images.hero}
        photo
        officialUrl="https://maplerecord.com/about-us/"
      >
        <ButtonLink href="/maplerecord/platform" variant="outline-night">
          Explore the platform
        </ButtonLink>
      </MrHero>
      <MrPurposeSection />
      <MrStorySection />
      <MrValuesSection />
      <MrStatsSection eyebrow={mrAbout.numbersEyebrow} heading={mrAbout.numbersTitle} items={mrAbout.numbers} />
      <MrIndustriesSection />
      <MrCta title={mrAbout.cta.title} body={mrAbout.cta.body} />
    </>
  );
}
