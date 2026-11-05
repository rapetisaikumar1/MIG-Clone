"use client";

import { useEffect } from "react";
import { primaryPhone } from "@/config/site";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";

export default function MarketingError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Server errors arrive as Error instances with a digest; client throws may be any value.
    const digest = error instanceof Error && "digest" in error ? String(error.digest) : "";
    console.error("[page] Render error", digest);
  }, [error]);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-h1">This page didn&apos;t load correctly.</h1>
        <p className="mt-6 max-w-[56ch] text-lead text-muted">
          It may be a temporary problem, so please try again. If it keeps happening, contact us or call{" "}
          <a href={`tel:${primaryPhone.e164}`} className="whitespace-nowrap font-medium text-ink underline underline-offset-4">
            {primaryPhone.display}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button onClick={() => retry()}>Try again</Button>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
