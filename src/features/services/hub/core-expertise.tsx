import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLink } from "@/components/ui/button";
import { Container, Dot, Eyebrow, Section } from "@/components/ui/layout";
import { coreExpertiseNav, mapleRecordPath, moliPath, type NavItem } from "@/config/navigation";

/**
 * The four core areas we lead with (owner direction, 2026-11-10), shown on /services right after the hero and before
 * the seven-pillar matrix. Names and URLs come from `coreExpertiseNav`; descriptions and "covers" lists are condensed
 * from the Capability Matrix (Oct 2026): pillar 07 (records management, MapleRecord and MOLI), pillar 01 (data
 * governance, regulatory compliance, data quality & security), pillar 03 (the Adobe offerings), and the AI Governance
 * page, which builds on pillars 01 and 02. Compliance is "designed to support", never "compliant".
 */
type CoreArea = NavItem & {
  /** Anchor id on /services, e.g. "core-data-governance". */
  id: string;
  /** Where the area sits in the matrix below. */
  basis: string;
  summary: string;
  covers: string[];
  /** One closing line per card, so the four read alike: our products, the cloud, the pillars or the platform behind it. */
  via: { lead: string; items: { label: string; href?: string }[] };
  cta: string;
};

const details: Record<string, Omit<CoreArea, keyof NavItem | "id">> = {
  "/information-governance": {
    basis: "Pillar 07",
    summary:
      "Records management and lifecycle governance for government, municipalities and regulated organizations, delivered with our own products and designed to support GDPR, PDPA, PIPEDA and CCPA requirements.",
    covers: ["Records lifecycle governance and retention", "Workflow automation for records and requests", "Advanced search and retrieval across AWS and Azure"],
    via: {
      lead: "Delivered with",
      items: [
        { label: "MapleRecord", href: mapleRecordPath },
        { label: "MOLI", href: moliPath },
      ],
    },
    cta: "Explore information governance",
  },
  "/data-management": {
    basis: "Pillar 01",
    summary:
      "We turn fragmented enterprise data into governed, AI-ready assets, with clear ownership and controls, and run them on secure, automated cloud platforms on AWS and Azure.",
    covers: ["Data governance & data management", "Regulatory compliance, data quality & security", "Modern data architecture & engineering"],
    via: { lead: "Runs on", items: [{ label: "AWS" }, { label: "Azure" }] },
    cta: "Explore data governance",
  },
  "/ai-governance": {
    basis: "Pillars 01 & 02",
    summary:
      "Responsible AI put into practice: AI inventories, risk tiers, policies and oversight workflows with named owners, built on the data governance and AI/ML enablement work we already deliver.",
    covers: ["AI inventory and risk tiering", "Policies, accountability and oversight workflows", "Monitoring and compliance records"],
    via: {
      lead: "Builds on",
      items: [
        { label: "Data Governance", href: "/data-management" },
        { label: "AI/ML enablement", href: "/software-development#ai-ml" },
      ],
    },
    cta: "Explore AI governance",
  },
  "/adobe-services": {
    basis: "Pillar 03",
    summary:
      "Customer data, content, personalization, analytics, marketing automation and commerce. As an Adobe Solution Partner, we design, implement and optimize Adobe Experience Cloud end to end.",
    covers: ["Unified profiles and real-time audiences", "Enterprise content and omnichannel delivery", "Testing, analytics and marketing automation"],
    via: { lead: "Delivered on", items: [{ label: "Adobe Experience Cloud" }] },
    cta: "Explore MarTech",
  },
};

/** The four areas in `coreExpertiseNav` order, with their /services anchor ids. */
export function getCoreExpertise(): CoreArea[] {
  return coreExpertiseNav.map((nav) => ({
    ...nav,
    id: `core-${nav.label.toLowerCase().replaceAll(" ", "-")}`,
    ...details[nav.href]!,
  }));
}

const arrow =
  "shrink-0 text-muted transition-colors duration-200 group-hover:text-signal motion-safe:transition-[color,transform] motion-safe:group-hover:translate-x-0.5";

function CoreCard({ area }: { area: CoreArea }) {
  const titleId = `${area.id}-title`;
  return (
    <li id={area.id} aria-labelledby={titleId} className="reveal flex scroll-mt-28 flex-col rounded-2xl border border-line-strong bg-surface p-6 sm:p-8">
      <p className="flex items-center gap-2.5 font-mono text-label uppercase text-muted">
        <Dot />
        {area.basis}
      </p>
      <h3 id={titleId} className="mt-5 text-[clamp(1.5rem,1.3rem+0.8vw,2.125rem)] leading-[1.12] tracking-[-0.028em] text-balance">
        <Link href={area.href} className="group decoration-2 underline-offset-[6px] hover:underline">
          {area.label}
          <ArrowRight aria-hidden className={`ml-2 inline-block size-[0.8em] align-[-0.06em] ${arrow}`} />
        </Link>
      </h3>
      <p className="mt-4 text-ink-soft">{area.summary}</p>
      <ul aria-label={`${area.label} covers`} className="mt-6 border-t border-line">
        {area.covers.map((item) => (
          <li key={item} className="border-b border-line py-2.5 text-[0.9375rem] leading-snug text-ink">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-3 flex flex-wrap items-center gap-x-4 text-[0.9375rem] text-muted">
        <span>{area.via.lead}</span>
        {area.via.items.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex min-h-11 items-center font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-signal"
            >
              {item.label}
            </Link>
          ) : (
            <span key={item.label} className="inline-flex min-h-11 items-center font-medium text-ink">
              {item.label}
            </span>
          ),
        )}
      </p>
      <div className="mt-auto pt-6">
        <ArrowLink href={area.href}>{area.cta}</ArrowLink>
      </div>
    </li>
  );
}

/** "Core expertise" on /services: the four areas as cards, each linking to the page that delivers it. */
export function CoreExpertise({ id, areas }: { id: string; areas: CoreArea[] }) {
  const titleId = `${id}-title`;
  return (
    <Section tone="deep" id={id} aria-labelledby={titleId}>
      <Container>
        <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>Core expertise</Eyebrow>
            <h2 id={titleId} className="mt-5 text-h2 text-balance">
              Information, data and AI governance, and MarTech
            </h2>
          </div>
          <p className="max-w-[52ch] text-muted lg:col-span-5">
            The four areas we specialize in. Each can start on its own, and each draws on the practice pillars in the
            capability matrix below.
          </p>
        </div>
        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-6">
          {areas.map((area) => (
            <CoreCard key={area.id} area={area} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}
