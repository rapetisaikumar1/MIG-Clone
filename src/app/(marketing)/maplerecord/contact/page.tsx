import { breadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { MrContactHero, MrContactHub, MrContactOffices } from "@/features/maplerecord/company-sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact MapleRecord",
  description: "Contact the MapleRecord sales team or request a demo. Offices in Cobourg, Ontario and Aubrey, Texas.",
  path: "/maplerecord/contact",
});

const crumbs = [{ label: "Home", href: "/" }, { label: "MapleRecord", href: "/maplerecord" }, { label: "Contact" }];

export default function MrContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, "/maplerecord/contact")} />
      <MrContactHero crumbs={crumbs} />
      <MrContactHub />
      <MrContactOffices />
    </>
  );
}
