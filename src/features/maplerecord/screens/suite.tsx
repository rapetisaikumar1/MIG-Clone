import type { ReactNode } from "react";
import { FileText, Grid2x2, RectangleEllipsis, Shield, Workflow } from "lucide-react";
import { ScreenCanvas, TopBar, type Icon } from "./kit";

/*
 * Maple suite launcher ("App dashboard"). Reference: the real Maple app dashboard that opens each
 * licensed module. Layout kept as in the product; only the organization name is sample content.
 */

const apps: { name: string; body: string; icon: Icon }[] = [
  { name: "MR Admin", body: "Staff directory, products, licensing, and global roles.", icon: Shield },
  { name: "MR Records", body: "Classify, retain, and manage official records.", icon: Grid2x2 },
  { name: "MR Requests", body: "Freedom of information and request casework.", icon: FileText },
  { name: "MR Workflows", body: "Design and publish managed automation graphs.", icon: Workflow },
  { name: "MR Forms", body: "Build forms and collect submissions.", icon: RectangleEllipsis },
];

function AppCard({ name, body, icon: IconC }: { name: string; body: string; icon: Icon }) {
  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-white px-5 pb-5 pt-5">
      <span className="flex size-10 items-center justify-center rounded-lg bg-[#f4f4f5] text-[#18181b]">
        <IconC className="size-[19px]" strokeWidth={1.75} />
      </span>
      <p className="mt-4 text-[15px] font-semibold tracking-[-0.01em]">{name}</p>
      <p className="mt-1.5 text-[13px] leading-[1.5] text-[#71717a]">{body}</p>
    </div>
  );
}

function AppDashboard() {
  return (
    <ScreenCanvas id="suite-launcher">
      <div className="flex h-full flex-col">
        <TopBar product="Maple" search={null} initials="PS" />
        <div className="mx-auto w-full max-w-[920px] px-6 pt-12">
          <p className="text-[11.5px] uppercase tracking-[0.06em] text-[#71717a]">Maple</p>
          <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-[-0.02em]">App dashboard</h1>
          <p className="mt-2.5 max-w-[620px] text-[13.5px] leading-[1.55] text-[#71717a]">
            Open a product you are licensed for. Switch anytime from the header, or return here from the product menu.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-3.5">
            {apps.map((a) => (
              <AppCard key={a.name} {...a} />
            ))}
          </div>
          <div className="mt-7 flex items-center gap-3.5 border-t border-[#e4e4e7] pt-5">
            <span className="inline-flex h-9 items-center rounded-md border border-[#e4e4e7] bg-white px-3.5 text-[13px] font-medium shadow-[0_1px_1px_rgb(0_0_0/0.03)]">
              Profile &amp; account
            </span>
            <span className="text-[12.5px] text-[#71717a]">Manage your Maple profile, notifications, and security.</span>
          </div>
        </div>
      </div>
    </ScreenCanvas>
  );
}

export const suiteScreens: Record<string, () => ReactNode> = {
  "suite-launcher": AppDashboard,
};
