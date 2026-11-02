"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";

export default function MarketingError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[page] Render error", error.digest ?? "");
  }, [error]);

  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-h1">This page didn&apos;t load correctly.</h1>
        <p className="mt-6 max-w-[56ch] text-lead text-muted">Please try again. If the problem continues, our contact details are on the contact page.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
