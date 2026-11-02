import { ArrowLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { MapleRecordGraphic } from "@/components/graphics/service-graphics";

export function MapleRecordCallout() {
  return (
    <section className="bg-paper py-20 sm:py-24" aria-labelledby="maplerecord-callout-title">
      <Container>
        <div className="grid items-center gap-12 overflow-hidden rounded-3xl border border-ink bg-surface p-7 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
          <div>
            <Eyebrow>Our product · MapleRecord</Eyebrow>
            <h2 id="maplerecord-callout-title" className="mt-5 text-h2">
              Records management software for the public sector.
            </h2>
            <p className="mt-6 max-w-[54ch] text-muted">
              MapleRecord brings record series, retention schedules, workflow automation and role-based access together
              in one platform designed for governments and municipalities. It puts the lifecycle and records practices on
              this page into day-to-day operation.
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
