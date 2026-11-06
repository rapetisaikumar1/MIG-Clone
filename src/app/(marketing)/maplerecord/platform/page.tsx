import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { mrPlatformPage } from "@/content/maplerecord/modules";
import { mrPlatformIntro } from "@/content/maplerecord/overview";
import { MrCta, MrHero } from "@/features/maplerecord/mr-sections";
import { MrAdminBand, MrDarkChips, MrModuleGrid, mrModuleIcons, MrPlatformFlow } from "@/features/maplerecord/platform-sections";
import { getMrModules } from "@/lib/content/maplerecord";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "MapleRecord Platform",
  description: mrPlatformPage.metaDescription,
  path: "/maplerecord/platform",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Platform" }];

export default function PlatformPage() {
  const modules = getMrModules();
  const admin = modules.find((m) => m.slug === "mr-admin");
  const hero = mrPlatformPage.heroScreen;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, "/maplerecord/platform")} />
      <MrHero
        crumbs={crumbs}
        eyebrow="Platform"
        title={mrPlatformPage.title}
        description={mrPlatformIntro.body}
        image={hero}
        imageLabel={hero.label}
        meta={
          <MrDarkChips
            label="Modules"
            items={modules.map((m) => ({ label: m.name, href: `/maplerecord/platform/${m.slug}`, icon: mrModuleIcons[m.slug] }))}
          />
        }
      >
        <ButtonLink href="#modules" variant="outline-night">
          Compare the modules
        </ButtonLink>
      </MrHero>
      <MrModuleGrid modules={modules.filter((m) => m.slug !== "mr-admin")} />
      {admin ? <MrAdminBand module={admin} /> : null}
      <MrPlatformFlow />
      <MrCta title={mrPlatformPage.cta.title} body={mrPlatformPage.cta.body} />
    </>
  );
}
