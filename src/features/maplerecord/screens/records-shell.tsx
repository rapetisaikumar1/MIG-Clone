import {
  BarChart3,
  Building2,
  ClipboardList,
  Command,
  FileText,
  LayoutDashboard,
  Package,
  Settings2,
  ShieldCheck,
  CircleHelp,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AppFrame, Sidebar, SidebarHeader, TopBar, type Icon, type NavSection } from "./kit";

/** MR Records sidebar width on the 1280 canvas. Pinned here because the MR Records tables are sized against it. */
const RECORDS_SIDEBAR_WIDTH = 232;

/*
 * MR Records shells. Two real navigation contexts:
 *  - Organization (admin console): Overview, Records Management, Requests, Reports, Admin Console tree
 *  - Workspace (e.g. City Clerk Records): Dashboard, Files, Requests, Boxes, Cabinets, Reports, Settings
 *    (the Files browser collapses the workspace sidebar into an icon rail — see WorkspaceRailShell)
 */

export type OrgNavKey =
  | "overview"
  | "records"
  | "requests"
  | "reports"
  | "controlled-vocab"
  | "file-management"
  | "box-management"
  | "trigger-events"
  | "retention"
  | "series"
  | "templates"
  | "notifications"
  | "configurations"
  | "jobs"
  | "rag"
  | "users"
  | "roles"
  | "groups"
  | "audit"
  | "destruction"
  | "blockchain";

/** Organization-level navigation. `adminOpen` expands the Admin Console tree as in the real app. */
export function orgSections(active: OrgNavKey, adminOpen = true): NavSection[] {
  const a = (k: OrgNavKey) => active === k;
  const platform: NavSection = {
    label: "Platform",
    items: [
      { label: "Overview", icon: Building2, active: a("overview") },
      { label: "Records Management", icon: FileText, active: a("records") },
      { label: "Requests", icon: ClipboardList, active: a("requests") },
      { label: "Reports", icon: BarChart3, active: a("reports") },
      {
        label: "Admin Console",
        icon: ShieldCheck,
        chevron: adminOpen ? "down" : "right",
        children: adminOpen
          ? [
              {
                label: "General",
                chevron: "down",
                children: [
                  { label: "Controlled Vocab", active: a("controlled-vocab") },
                  { label: "File Management", active: a("file-management") },
                  { label: "Box Management", active: a("box-management") },
                ],
              },
              {
                label: "Records Management",
                chevron: "down",
                children: [
                  { label: "Trigger Events", active: a("trigger-events") },
                  { label: "Retention Schedule", active: a("retention") },
                  { label: "Record Series", active: a("series") },
                  { label: "Templates & Metadata", active: a("templates") },
                ],
              },
              { label: "Request Management", chevron: "right" },
              { label: "Notification Management", active: a("notifications") },
              { label: "Configurations", active: a("configurations") },
              { label: "Background Jobs", active: a("jobs") },
              { label: "RAG Indexing", active: a("rag") },
              { label: "Users & Roles", chevron: "right" },
              { label: "Audit Trail", active: a("audit") },
              { label: "Destruction Register", active: a("destruction") },
              { label: "Blockchain Verification", active: a("blockchain") },
            ]
          : undefined,
      },
    ],
  };
  return [platform];
}

export function OrgShell({ active, children, adminOpen, search, aside, mainClassName }: { active: OrgNavKey; children: ReactNode; adminOpen?: boolean; search?: string; aside?: ReactNode; mainClassName?: string }) {
  return (
    <AppFrame
      topBar={<TopBar product="MR Records" search={search} />}
      sidebar={<Sidebar width={RECORDS_SIDEBAR_WIDTH} header={<SidebarHeader name="City of Harbourview" sub="Organization" icon={Command} />} sections={orgSections(active, adminOpen)} />}
      aside={aside}
      mainClassName={mainClassName}
    >
      {children}
    </AppFrame>
  );
}

export type WorkspaceNavKey = "dashboard" | "files" | "requests" | "boxes" | "cabinets" | "reports" | "settings";

const workspaceNav: { key: WorkspaceNavKey; label: string; icon: Icon; chevron?: boolean }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "files", label: "Files", icon: FileText },
  { key: "requests", label: "Requests", icon: ClipboardList, chevron: true },
  { key: "boxes", label: "Boxes", icon: Package },
  { key: "cabinets", label: "Cabinets", icon: Package },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings2, chevron: true },
];

export function WorkspaceShell({
  active,
  children,
  workspace = "City Clerk Records",
  code = "CLERK",
  aside,
  mainClassName,
}: {
  active: WorkspaceNavKey;
  children: ReactNode;
  workspace?: string;
  code?: string;
  aside?: ReactNode;
  mainClassName?: string;
}) {
  return (
    <AppFrame
      topBar={<TopBar product="MR Records" />}
      sidebar={
        <Sidebar
          width={RECORDS_SIDEBAR_WIDTH}
          header={<SidebarHeader name={workspace} sub={code} icon={Building2} />}
          sections={[
            {
              label: "Workspace",
              items: workspaceNav.map((n) => ({ label: n.label, icon: n.icon, active: active === n.key, chevron: n.chevron ? ("right" as const) : undefined })),
            },
          ]}
        />
      }
      aside={aside}
      mainClassName={mainClassName}
    >
      {children}
    </AppFrame>
  );
}

/** Workspace context with the sidebar collapsed to an icon rail (the Files browser). */
export function WorkspaceRailShell({ active, children, mainClassName }: { active: WorkspaceNavKey; children: ReactNode; mainClassName?: string }) {
  return (
    <AppFrame
      topBar={<TopBar product="MR Records" />}
      sidebar={
        <aside className="flex w-12 shrink-0 flex-col items-center border-r border-[#e4e4e7] bg-[#fafafa]">
          <span className="flex h-[57px] w-full items-center justify-center border-b border-[#e4e4e7]">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#18181b] text-white">
              <Building2 className="size-4" strokeWidth={1.75} />
            </span>
          </span>
          <div className="mt-2 flex flex-col items-center gap-1">
            {workspaceNav.map((n) => (
              <span key={n.key} className={cn("flex size-8 items-center justify-center rounded-md text-[#27272a]", active === n.key && "bg-[#f0f0f1]")}>
                <n.icon className="size-[15px]" strokeWidth={1.75} />
              </span>
            ))}
          </div>
          <span className="mb-3 mt-auto">
            <CircleHelp className="size-[15px] text-[#3f3f46]" strokeWidth={1.75} />
          </span>
        </aside>
      }
      mainClassName={mainClassName}
    >
      {children}
    </AppFrame>
  );
}
