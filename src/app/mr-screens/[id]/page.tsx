import { notFound } from "next/navigation";
import { screenComponents } from "@/features/maplerecord/screens";

/**
 * Render target for scripts/render-mr-screens.mjs. Disabled unless MR_SCREENS_RENDER=1, so it
 * returns 404 in every normal build and deployment. Not linked, not in the sitemap.
 */
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function MrScreenPage({ params }: PageProps<"/mr-screens/[id]">) {
  if (process.env.MR_SCREENS_RENDER !== "1") notFound();
  const Screen = screenComponents[(await params).id];
  if (!Screen) notFound();
  return (
    <div style={{ padding: 0, margin: 0, background: "#fff" }}>
      <Screen />
    </div>
  );
}
