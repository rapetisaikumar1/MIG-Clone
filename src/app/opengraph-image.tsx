import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ogImageAlt } from "@/lib/metadata";

export const alt = ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "brand", "mig-logo.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f6f4ef", padding: 72 }}>
        <img src={logoSrc} width={225} height={100} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 16, fontSize: 22, letterSpacing: 2, color: "#5d5a54", textTransform: "uppercase" }}>
            AI Governance · Adobe Services · Data Management · Software Development
          </div>
          <div style={{ marginTop: 24, fontSize: 68, lineHeight: 1.05, letterSpacing: -2, color: "#111111", fontWeight: 600, maxWidth: 980 }}>
            Responsible AI. Trusted data. Better digital experiences.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#ff0000" }} />
          <div style={{ fontSize: 22, color: "#111111" }}>Software development and professional services</div>
        </div>
      </div>
    ),
    size,
  );
}
