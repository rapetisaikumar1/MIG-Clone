import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { MapleRecordGraphic } from "@/components/graphics/service-graphics";

/**
 * Sits directly after the capabilities list on /data-management. It has no bottom padding because the next section
 * (the delivery approach) is on the same paper background and supplies its own top padding.
 */
export function MapleRecordCallout() {
  return (
    <section className="bg-paper pt-16 sm:pt-20 lg:pt-24" aria-labelledby="maplerecord-callout-title">
      <Container>
        <div className="grid items-center gap-10 overflow-hidden rounded-3xl border border-ink bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            <Eyebrow>Our product · MapleRecord</Eyebrow>
            <h2 id="maplerecord-callout-title" className="mt-5 text-h2">
              AI-first hybrid records management.
            </h2>
            <p className="mt-6 max-w-[54ch] text-muted">
              MapleRecord manages electronic and physical records in one system, with smart retention, full audit trails
              and role-based access. Modules for information requests, workflows and forms run on the same platform. It
              puts the retention schedules and access rules described above into daily use.
            </p>
            <ArrowLink href="/maplerecord" className="mt-8">
              Explore MapleRecord
            </ArrowLink>
          </div>
          <MapleRecordGraphic />
        </div>
      </Container>
    </section>
  );
}
