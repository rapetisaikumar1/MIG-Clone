"use client";

import { useEffect } from "react";
import { company, primaryPhone } from "@/config/site";

/**
 * Last-resort boundary for errors in the root layout. It replaces the whole document, so global
 * styles and fonts aren't available — the few styles it needs are inline, using the brand tokens.
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    const digest = error instanceof Error && "digest" in error ? String(error.digest) : "";
    console.error("[root] Render error", digest);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f6f4ef", color: "#111111", fontFamily: "ui-sans-serif, system-ui, sans-serif", lineHeight: 1.6 }}>
        <title>{`Something went wrong · ${company.name}`}</title>
        <main style={{ maxWidth: "40rem", margin: "0 auto", padding: "6rem 1.25rem" }}>
          <p style={{ fontFamily: "ui-monospace, monospace", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#5d5a54" }}>
            {company.name}
          </p>
          <h1 style={{ fontSize: "2.25rem", lineHeight: 1.1, letterSpacing: "-0.03em", margin: "1rem 0 0" }}>This page didn&apos;t load correctly.</h1>
          <p style={{ color: "#5d5a54", fontSize: "1.125rem", marginTop: "1.25rem" }}>
            It may be a temporary problem, so please try again. If it keeps happening, call us on{" "}
            <a href={`tel:${primaryPhone.e164}`} style={{ color: "#111111" }}>
              {primaryPhone.display}
            </a>
            .
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
            <button
              type="button"
              onClick={() => retry()}
              style={{ minHeight: "3rem", padding: "0 1.5rem", border: 0, borderRadius: "999px", background: "#d00000", color: "#ffffff", font: "inherit", fontWeight: 500, cursor: "pointer" }}
            >
              Try again
            </button>
            {/* A full page load, since client navigation depends on the layout that failed. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{ display: "inline-flex", alignItems: "center", minHeight: "3rem", padding: "0 1.5rem", border: "1px solid rgb(17 17 17 / 0.25)", borderRadius: "999px", color: "#111111", textDecoration: "none", fontWeight: 500 }}
            >
              Go to the homepage
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
