import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock,
  CreditCard,
  Activity,
  EllipsisVertical,
  FileCheck,
  FileText,
  Filter,
  FolderOpen,
  Gavel,
  Globe,
  Inbox,
  LayoutGrid,
  LayoutList,
  ListChecks,
  Mail,
  MessageSquare,
  Minus,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Scale,
  ScrollText,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Timer,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AppFrame,
  Badge,
  Btn,
  Checkbox,
  ColumnsIcon,
  DataTable,
  Donut,
  IconRail,
  LegendRow,
  PageHeader,
  ScreenCanvas,
  SearchInput,
  Segmented,
  Select,
  Sidebar,
  TableFooter,
  TopBar,
  type Icon,
  type NavSection,
  type Tone,
} from "./kit";

/*
 * MR Requests screens (FOI / access-to-information casework). Reference: the real MR Requests UI —
 * operational overview, requests board, request triage, exemption management, document redaction.
 * All sample content is fictional ("City of Harbourview").
 */

/* ---------- Shells ---------- */

type NavKey = "dashboard" | "requests" | "appeals" | "files" | "templates" | "redaction" | "portal" | "reports" | "exemptions" | "audit" | "statutory" | "routine" | "privacy" | "payments" | "admin";

function sections(active?: NavKey): NavSection[] {
  const a = (k: NavKey) => active === k;
  return [
    {
      label: "Overview",
      items: [
        { label: "Dashboard", icon: LayoutGrid, active: a("dashboard") },
        { label: "Requests", icon: Inbox, active: a("requests"), count: 73 },
        { label: "Appeals", icon: Gavel, active: a("appeals"), count: 63 },
      ],
    },
    {
      label: "Management",
      items: [
        { label: "File Manager", icon: FolderOpen, active: a("files") },
        { label: "Email Templates", icon: Mail, active: a("templates") },
        { label: "Document Redaction", icon: Shield, active: a("redaction") },
        { label: "Public Portal", icon: Globe, locked: true },
        { label: "Reports", icon: BarChart3, active: a("reports") },
      ],
    },
    {
      label: "Compliance",
      items: [
        { label: "Exemption Management", icon: ShieldCheck, active: a("exemptions") },
        { label: "Audit Trail", icon: ScrollText, active: a("audit") },
        { label: "Statutory Compliance", icon: Scale, locked: true },
        { label: "Routine Disclosure", icon: FileCheck, locked: true },
        { label: "Privacy Impact", icon: ShieldAlert, locked: true },
      ],
    },
    { label: "Payments", items: [{ label: "Payments", icon: CreditCard, active: a("payments") }] },
    { label: "Administration", items: [{ label: "Admin Console", icon: Settings, active: a("admin") }] },
  ];
}

const topBar = <TopBar product="MR Requests" search="Search everything…" shortcut notifications={5} />;

function RequestsShell({ active, children, mainClassName }: { active: NavKey; children: ReactNode; mainClassName?: string }) {
  return (
    <AppFrame topBar={topBar} sidebar={<Sidebar sections={sections(active)} />} mainClassName={mainClassName}>
      {children}
    </AppFrame>
  );
}

const railIcons: Icon[] = [LayoutGrid, Inbox, Gavel, FolderOpen, Mail, Shield, Globe, BarChart3, ShieldCheck, ScrollText, Scale, FileCheck, ShieldAlert, CreditCard, Settings];

/** Detail screens: collapsed icon rail on the left, thin tool strip on the right edge. */
function DetailShell({ children }: { children: ReactNode }) {
  return (
    <AppFrame
      topBar={topBar}
      sidebar={<IconRail icons={railIcons} active={1} />}
      aside={
        <aside className="flex w-11 shrink-0 flex-col items-center gap-1 border-l border-[#e4e4e7] bg-white py-2">
          {[ListChecks, MessageSquare].map((IconC, i) => (
            <span key={i} className="flex size-8 items-center justify-center rounded-md text-[#3f3f46]">
              <IconC className="size-[15px]" strokeWidth={1.75} />
            </span>
          ))}
        </aside>
      }
    >
      {children}
    </AppFrame>
  );
}

/* ---------- Local pieces ---------- */

const C = { blue: "#3b82f6", amber: "#f59e0b", red: "#ef4444", gray: "#d4d4d8", green: "#22c55e", orange: "#f97316", violet: "#8b5cf6", slate: "#94a3b8" };

const tint: Record<string, string> = {
  blue: "bg-[#eff6ff] text-[#2563eb]",
  amber: "bg-[#fffbeb] text-[#d97706]",
  red: "bg-[#fef2f2] text-[#dc2626]",
  green: "bg-[#f0fdf4] text-[#16a34a]",
  orange: "bg-[#fff7ed] text-[#ea580c]",
  violet: "bg-[#f5f3ff] text-[#7c3aed]",
};

function Kpi({ label, value, icon: IconC, tone, valueClass, caption }: { label: string; value: string; icon: Icon; tone: string; valueClass?: string; caption: ReactNode }) {
  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
      <div className="flex items-start justify-between">
        <p className="text-[10.5px] font-medium uppercase tracking-[0.05em] text-[#71717a]">{label}</p>
        <span className={cn("flex size-7 items-center justify-center rounded-full", tint[tone])}>
          <IconC className="size-3.5" strokeWidth={1.9} />
        </span>
      </div>
      <p className={cn("-mt-1 text-[26px] font-semibold leading-none tracking-[-0.02em]", valueClass)}>{value}</p>
      <p className="mt-2 flex items-center gap-1 text-[11px] text-[#71717a]">{caption}</p>
    </div>
  );
}

function CardTitle({ icon: IconC, tone, children, right }: { icon?: Icon; tone?: string; children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-[13px] font-semibold">
        {IconC ? (
          <span className={cn("flex size-6 items-center justify-center rounded-md", tone ? tint[tone] : "text-[#3f3f46]")}>
            <IconC className="size-3.5" strokeWidth={1.9} />
          </span>
        ) : null}
        {children}
      </h3>
      {right}
    </div>
  );
}

function DonutCard({ icon, tone, title, total, segments }: { icon: Icon; tone: string; title: string; total: number; segments: [string, number, string][] }) {
  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
      <CardTitle icon={icon} tone={tone}>{title}</CardTitle>
      <div className="mt-2.5 flex items-center gap-5">
        <Donut size={88} thickness={10} segments={segments.map(([, v, c]) => [v, c])} label={total} sub="Total" />
        <div className="flex-1 space-y-1.5">
          {segments.map(([l, v, c]) => (
            <LegendRow key={l} color={c} label={l} value={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 1. Dashboard ---------- */

function Dashboard() {
  const onHold: [string, string, string][] = [
    ["FOI-2026-09-22-0031", "Water main replacement tender evaluations — Ward 4", "Third-party notice issued"],
    ["FOI-2026-10-02-0038", "Bylaw enforcement complaints — Cedar Lane area", "Awaiting clarification"],
    ["FOI-2026-10-07-0041", "Harbourview arena roof repair consultant reports", "Fee deposit outstanding"],
    ["FOI-2026-10-14-0047", "Short-term rental licensing correspondence 2025", "Awaiting clarification"],
    ["FOI-2026-10-21-0055", "Parks department overtime records Q3 2026", "Fee deposit outstanding"],
    ["FOI-2026-10-29-0059", "Police services board closed-session minutes", "Consultation with board"],
  ];
  const volume: [string, number, number][] = [
    ["Jun", 14, 12],
    ["Jul", 18, 15],
    ["Aug", 16, 17],
    ["Sep", 21, 18],
    ["Oct", 19, 20],
    ["Nov", 9, 12],
  ];
  return (
    <ScreenCanvas id="requests-dashboard">
      <RequestsShell active="dashboard">
        <PageHeader title="Operational Overview" subtitle="05/11/2026 · Showing all active files" />
        <div className="mt-3 h-px bg-[#e4e4e7]" />

        <div className="mt-3 grid grid-cols-4 gap-3">
          <Kpi label="Active Requests" value="46" icon={Inbox} tone="blue" caption={<><TrendingDown className="size-3 text-[#16a34a]" /><span className="text-[#16a34a]">vs 51 last month</span></>} />
          <Kpi label="Due Soon" value="4" icon={Clock} tone="amber" valueClass="text-[#d97706]" caption={<><Minus className="size-3" />within 5 days</>} />
          <Kpi label="Overdue" value="3" icon={TriangleAlert} tone="red" valueClass="text-[#dc2626]" caption={<><TrendingDown className="size-3 text-[#dc2626]" /><span className="text-[#dc2626]">requires escalation</span></>} />
          <Kpi label="Closed (MTD)" value="12" icon={CircleCheck} tone="green" valueClass="text-[#16a34a]" caption={<><TrendingUp className="size-3 text-[#16a34a]" /><span className="text-[#16a34a]">vs 9 last month</span></>} />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <DonutCard icon={Inbox} tone="blue" title="Requests Overview" total={73} segments={[["Active", 46, C.blue], ["Due Soon", 4, C.amber], ["Overdue", 3, C.red], ["Closed", 20, C.gray]]} />
          <DonutCard icon={Scale} tone="violet" title="Appeals Overview" total={63} segments={[["Active", 41, C.blue], ["Oversight", 12, C.violet], ["Mediation", 8, C.amber], ["Overdue", 2, C.red]]} />
          <DonutCard icon={FileText} tone="orange" title="Intake Overview" total={5} segments={[["New Requests", 3, C.orange], ["New Appeals", 1, "#fdba74"], ["Pending Assign", 1, "#fed7aa"]]} />
        </div>

        <div className="mt-3 grid grid-cols-[1fr_248px] gap-3">
          <div className="min-w-0">
            <div className="grid grid-cols-[1fr_1.2fr] gap-3">
              {/* SLA & deadline risk */}
              <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
                <CardTitle icon={TriangleAlert} tone="amber">SLA &amp; Deadline Risk</CardTitle>
                <div className="mt-2.5 flex items-center gap-4">
                  <div className="flex-1 space-y-1.5">
                    {(
                      [
                        ["High Risk", "Past statutory deadline", 3, TriangleAlert, "red"],
                        ["Medium Risk", "Due within 5 days", 4, Clock, "amber"],
                        ["Low Risk", "On track", 46, CircleCheck, "green"],
                      ] as const
                    ).map(([l, s, v, IconC, t]) => (
                      <div key={l} className="flex items-center gap-2.5 rounded-lg border border-[#f0f0f1] px-2 py-1">
                        <span className={cn("flex size-6 items-center justify-center rounded-full", tint[t])}>
                          <IconC className="size-3" strokeWidth={2} />
                        </span>
                        <span className="flex-1 leading-tight">
                          <span className="block text-[11.5px] font-medium">{l}</span>
                          <span className="block text-[10px] text-[#71717a]">{s}</span>
                        </span>
                        <span className={cn("text-[14px] font-semibold", t === "red" && "text-[#dc2626]", t === "amber" && "text-[#d97706]", t === "green" && "text-[#16a34a]")}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <Donut size={80} thickness={9} segments={[[3, C.red], [4, C.amber], [46, "#bbf7d0"]]} label={7} sub="at risk" />
                </div>
              </div>
              {/* Pipeline */}
              <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
                <CardTitle icon={Activity} tone="blue">Pipeline Overview</CardTitle>
                <div className="mt-2.5 flex items-center gap-5">
                  <Donut size={92} thickness={10} segments={[[11, C.blue], [17, C.violet], [12, C.amber], [6, C.green]]} label={46} sub="Total" />
                  <div className="flex-1 space-y-2">
                    {(
                      [
                        ["Triage", "11 (24%)", C.blue],
                        ["Redaction", "17 (37%)", C.violet],
                        ["Disclosure Review", "12 (26%)", C.amber],
                        ["Delivery", "6 (13%)", C.green],
                      ] as const
                    ).map(([l, v, c]) => (
                      <LegendRow key={l} color={c} label={l} value={v} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 flex items-center gap-1 text-[11.5px] font-medium text-[#2563eb]">
                  View full pipeline <ArrowRight className="size-3" />
                </p>
              </div>
            </div>

            {/* On hold */}
            <div className="mt-3 rounded-xl border border-[#e4e4e7] bg-white">
              <div className="flex items-center justify-between px-4 pb-2 pt-3">
                <CardTitle icon={Clock} tone="orange">On Hold Requests</CardTitle>
                <span className="rounded-full bg-[#f4f4f5] px-2 py-0.5 text-[11px] font-medium text-[#3f3f46]">6 Items</span>
              </div>
              {onHold.map(([id, title, reason]) => (
                <div key={id} className="flex items-center gap-3 border-t border-[#f0f0f1] px-4 py-2">
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] font-medium">{title}</span>
                    <span className="mt-0.5 block text-[11px] text-[#71717a]">
                      <span className="font-mono text-[10.5px]">{id}</span> · {reason}
                    </span>
                  </span>
                  <Badge tone="orange">On Hold</Badge>
                  <ChevronRight className="size-3.5 text-[#a1a1aa]" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {/* Appeal stages */}
            <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-[10.5px] font-medium uppercase tracking-[0.05em] text-[#71717a]">Appeal Stages</p>
                <span className="text-[11.5px] font-medium text-[#2563eb]">View all</span>
              </div>
              <div className="mt-1.5 flex justify-center">
                <Donut size={86} thickness={10} segments={[[4, C.blue], [7, C.violet], [5, C.amber], [3, C.gray]]} label={19} sub="Total" />
              </div>
              <div className="mt-2 space-y-1">
                {(
                  [
                    ["Intake", 4, "21%", C.blue],
                    ["Oversight", 7, "37%", C.violet],
                    ["Mediation", 5, "26%", C.amber],
                    ["Closed", 3, "16%", C.gray],
                  ] as const
                ).map(([l, v, p, c]) => (
                  <div key={l} className="flex items-center gap-2 text-[12px]">
                    <span className="size-2 rounded-full" style={{ background: c }} />
                    <span className="flex-1 text-[#3f3f46]">{l}</span>
                    <span className="font-medium">{v}</span>
                    <span className="w-8 text-right text-[11px] text-[#71717a]">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Monthly volume */}
            <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
              <div className="flex items-center justify-between">
              <p className="text-[10.5px] font-medium uppercase tracking-[0.05em] text-[#71717a]">Monthly Volume</p>
              <div className="flex items-center gap-2.5 text-[10px] text-[#71717a]">
                <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-[#d4d4d8]" />Filed</span>
                <span className="flex items-center gap-1"><span className="size-2 rounded-sm bg-[#22c55e]" />Closed</span>
              </div>
              </div>
              <div className="mt-2 flex h-[76px] items-end justify-between border-b border-[#e4e4e7] px-1">
                {volume.map(([m, f, c]) => (
                  <div key={m} className="flex items-end gap-[3px]">
                    <span className="w-2.5 rounded-t-[3px] bg-[#d4d4d8]" style={{ height: f * 3.3 }} />
                    <span className="w-2.5 rounded-t-[3px] bg-[#22c55e]" style={{ height: c * 3.3 }} />
                  </div>
                ))}
              </div>
              <div className="mt-1 flex justify-between px-1 text-[10px] text-[#71717a]">
                {volume.map(([m]) => (
                  <span key={m} className="w-[23px] text-center">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RequestsShell>
    </ScreenCanvas>
  );
}

/* ---------- 2. Kanban ---------- */

type Priority = "Critical" | "High" | "Medium" | "Low";
const priorityTone: Record<Priority, Tone> = { Critical: "red", High: "orange", Medium: "blue", Low: "gray" };
const priorityBorder: Partial<Record<Priority, string>> = { Critical: "border-l-[#ef4444]", High: "border-l-[#f97316]" };
type KCard = [id: string, title: string, requester: string, date: string, assignee: string, priority?: Priority];

function KanbanCard({ card }: { card: KCard }) {
  const [id, title, requester, date, assignee, priority] = card;
  return (
    <div className={cn("rounded-lg border border-[#e4e4e7] bg-white px-2 py-2 shadow-[0_1px_2px_rgb(0_0_0/0.04)]", priority && priorityBorder[priority] && cn("border-l-[3px]", priorityBorder[priority]))}>
      <div className="flex items-center justify-between gap-1">
        <span className="min-w-0 truncate font-mono text-[9px] tracking-[-0.02em] text-[#71717a]">{id}</span>
        {priority ? <Badge tone={priorityTone[priority]} className="shrink-0 px-1 py-0 text-[9.5px]">{priority}</Badge> : null}
      </div>
      <p className="mt-1 line-clamp-2 text-[11.5px] font-semibold leading-[1.35]">{title}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#52525b]">
        <span className="flex size-4 items-center justify-center rounded-full bg-[#f4f4f5] text-[8.5px] font-semibold text-[#3f3f46]">{requester[0]}</span>
        <span className="truncate">{requester}</span>
      </p>
      <div className="mt-1.5 flex items-center justify-between border-t border-[#f4f4f5] pt-1.5 text-[10.5px] text-[#71717a]">
        <span className="shrink-0 whitespace-nowrap">{date}</span>
        <span className="ml-2 flex min-w-0 items-center gap-0.5">
          <ArrowRight className="size-2.5 shrink-0" />
          <span className="truncate">{assignee}</span>
        </span>
      </div>
    </div>
  );
}

function RequestsKanban() {
  const columns: { label: string; count: number; dot: string; head: string; cards: KCard[] }[] = [
    {
      label: "Pending",
      count: 13,
      dot: C.violet,
      head: "bg-[#f5f3ff] text-[#6d28d9]",
      cards: [
        ["FOI-2026-11-04-0073", "Harbourview transit fare review briefing notes", "Lena Fischer", "Nov 4, 2026", "Unassigned"],
        ["FOI-2026-11-03-0071", "Snow-clearing contractor invoices 2025/26", "Tom Reyes", "Nov 3, 2026", "Unassigned", "Medium"],
        ["FOI-2026-11-02-0070", "Library branch hours consultation results", "Ana Costa", "Nov 2, 2026", "Unassigned", "Low"],
        ["FOI-2026-11-01-0068", "Noise exemption permits — waterfront festival", "Marcus Bell", "Nov 1, 2026", "Unassigned"],
      ],
    },
    {
      label: "Open",
      count: 13,
      dot: C.blue,
      head: "bg-[#eff6ff] text-[#1d4ed8]",
      cards: [
        ["FOI-2026-10-30-0066", "Council meeting audio recordings, March 2026", "Helen Park", "Oct 30, 2026", "Mei Lin", "Medium"],
        ["FOI-2026-10-29-0064", "Winter road maintenance schedules 2026/27", "Omar Haddad", "Oct 29, 2026", "Daniel Okafor"],
        ["FOI-2026-10-28-0063", "Tree removal permits — Elm Street corridor", "Julia Moreau", "Oct 28, 2026", "Grace Thompson", "Low"],
        ["FOI-2026-10-27-0061", "Recreation centre accessibility audit 2025", "Sam Whitfield", "Oct 27, 2026", "Mei Lin"],
      ],
    },
    {
      label: "In Progress",
      count: 21,
      dot: C.amber,
      head: "bg-[#fffbeb] text-[#b45309]",
      cards: [
        ["FOI-2026-10-18-0062", "Drinking-water sample results — Harbourview system", "Rachel Kim", "Oct 18, 2026", "Priya Shah", "High"],
        ["FOI-2026-10-18-0053", "Building permit inspections — downtown", "David Laurent", "Oct 18, 2026", "Arjun Mehta", "Medium"],
        ["FOI-2026-10-16-0051", "Fire services staffing plan Q1–Q2 2026", "Nadia Petrov", "Oct 16, 2026", "Sarah Novak", "Critical"],
        ["FOI-2026-10-15-0049", "Waterfront redevelopment contracts", "Ben Carter", "Oct 15, 2026", "Daniel Okafor"],
      ],
    },
    {
      label: "On Hold",
      count: 6,
      dot: C.orange,
      head: "bg-[#fff7ed] text-[#c2410c]",
      cards: [
        ["FOI-2026-10-29-0059", "Police services board closed-session minutes", "Chris Doyle", "Oct 29, 2026", "Sarah Novak", "High"],
        ["FOI-2026-10-21-0055", "Parks department overtime records Q3 2026", "Irene Walsh", "Oct 21, 2026", "Arjun Mehta"],
        ["FOI-2026-10-14-0047", "Short-term rental licensing emails", "Victor Lam", "Oct 14, 2026", "Mei Lin", "Low"],
        ["FOI-2026-10-07-0041", "Harbourview arena roof repair consultant reports", "Paula Grant", "Oct 7, 2026", "Grace Thompson"],
      ],
    },
    {
      label: "Resolved",
      count: 10,
      dot: C.green,
      head: "bg-[#f0fdf4] text-[#15803d]",
      cards: [
        ["FOI-2026-10-02-0037", "Sidewalk repair complaints — Ward 2", "Kevin Shaw", "Oct 2, 2026", "Daniel Okafor"],
        ["FOI-2026-09-29-0035", "Council expense reports — Q2 2026", "Laura Chen", "Sep 29, 2026", "Priya Shah", "Medium"],
        ["FOI-2026-09-24-0032", "Stormwater pond inspection reports 2025", "Diego Santos", "Sep 24, 2026", "Arjun Mehta"],
        ["FOI-2026-09-19-0029", "Parking enforcement ticket volumes by street", "Fiona Hale", "Sep 19, 2026", "Mei Lin", "Low"],
      ],
    },
    {
      label: "Closed",
      count: 10,
      dot: "#71717a",
      head: "bg-[#f4f4f5] text-[#3f3f46]",
      cards: [
        ["FOI-2026-09-12-0024", "Animal control service call logs 2025", "Peter Nolan", "Sep 12, 2026", "Grace Thompson"],
        ["FOI-2026-09-08-0021", "Transit shelter advertising agreement", "Ruth Adler", "Sep 8, 2026", "Sarah Novak"],
        ["FOI-2026-09-03-0018", "Community grant recipients 2026", "Hugo Martin", "Sep 3, 2026", "Priya Shah"],
        ["FOI-2026-08-28-0015", "Pool water quality testing logs", "Ivy Brooks", "Aug 28, 2026", "Mei Lin"],
      ],
    },
  ];
  return (
    <ScreenCanvas id="requests-kanban">
      <RequestsShell active="requests">
        <PageHeader
          title="Requests"
          subtitle="Manage and track all FOI requests"
          actions={
            <>
              <span className="flex size-8 items-center justify-center rounded-md border border-[#e4e4e7] bg-white">
                <RefreshCw className="size-3.5" strokeWidth={1.9} />
              </span>
              <Btn variant="outline">
                Actions <ChevronDown className="size-3.5 text-[#71717a]" />
              </Btn>
              <Btn icon={Plus}>New Request</Btn>
            </>
          }
        />
        <div className="mt-4 rounded-xl border border-[#e4e4e7] bg-white p-3">
          <div className="flex items-center gap-2">
            <SearchInput placeholder="Search requests, requesters, assignees…" className="flex-1" width={undefined} />
            <Select value="All Statuses" width={150} />
            <Select value="All Priorities" width={150} />
            <Select value="All Categories" width={150} />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[12px] text-[#52525b]">
              <Filter className="size-3.5" strokeWidth={1.75} />
              <span><span className="font-medium text-[#18181b]">73</span> of 73 requests</span>
            </span>
            <div className="inline-flex rounded-lg bg-[#f4f4f5] p-[3px] text-[12px]">
              <span className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[#52525b]">
                <LayoutList className="size-3.5" strokeWidth={1.75} />
                Table
              </span>
              <span className="flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 font-medium shadow-[0_1px_2px_rgb(0_0_0/0.08)]">
                <LayoutGrid className="size-3.5" strokeWidth={1.75} />
                Kanban
              </span>
            </div>
          </div>
        </div>
        <div className="-mr-6 mt-3 flex gap-2">
          {columns.map((col) => (
            <div key={col.label} className="w-[188px] shrink-0 rounded-xl border border-[#e4e4e7] bg-[#fafafa]">
              <div className={cn("flex items-center gap-1.5 rounded-t-xl border-b border-[#e4e4e7] px-2.5 py-2", col.head)}>
                <span className="size-2 rounded-full" style={{ background: col.dot }} />
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.05em]">{col.label}</span>
                <span className="ml-auto rounded-full bg-white/80 px-1.5 text-[10.5px] font-medium ring-1 ring-inset ring-black/5">{col.count}</span>
              </div>
              <div className="space-y-2 p-1.5">
                {col.cards.map((c) => (
                  <KanbanCard key={c[0]} card={c} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </RequestsShell>
    </ScreenCanvas>
  );
}

/* ---------- 3. Triage ---------- */

function RequestTriage() {
  const checklist: [string, boolean, boolean][] = [
    ["Refund Required", false, false],
    ["Request description is clear", true, true],
    ["Scope is identifiable", true, true],
    ["Date range is clear", true, true],
    ["Contact details are usable", true, true],
    ["Required supporting documents are available", true, false],
    ["Identity / authority verified where required", true, false],
    ["Submission requirements are satisfied", true, false],
  ];
  const tabs: [string, number?][] = [["Detail"], ["Triage"], ["Documents", 2], ["History"], ["Release"], ["Artifact"]];
  return (
    <ScreenCanvas id="requests-triage">
      <DetailShell>
        <div className="mt-3 flex items-start justify-between gap-6">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 items-center justify-center rounded-md border border-[#e4e4e7]">
              <ArrowLeft className="size-4 text-[#3f3f46]" strokeWidth={1.75} />
            </span>
            <div>
              <h1 className="text-[20px] font-semibold leading-tight tracking-[-0.01em]">
                <span className="text-[#71717a]">Request</span> <span className="text-[#a1a1aa]">/</span> <span className="font-mono text-[18px]">FOI-2026-10-18-0062</span>
              </h1>
              <p className="mt-1 flex items-center gap-2 text-[12.5px] text-[#52525b]">
                Drinking-water sample results — Harbourview system
                <Badge tone="amber">In Progress</Badge>
                <Badge tone="amber">Due in 4 days</Badge>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 items-center gap-1.5 rounded-md border border-[#fde68a] bg-[#fffbeb] px-2.5 text-[12px] font-medium text-[#b45309]">
              <Timer className="size-3.5" strokeWidth={1.9} />
              4d 6h 12m <span className="font-normal text-[#d97706]">· Due Nov 10</span>
            </span>
            <span className="flex size-8 items-center justify-center rounded-md border border-[#e4e4e7]">
              <MoreHorizontal className="size-4" />
            </span>
          </div>
        </div>

        <div className="mt-4 inline-flex rounded-lg bg-[#f4f4f5] p-[3px]">
          {tabs.map(([t, n], i) => (
            <span key={t} className={cn("flex items-center gap-1.5 rounded-md px-3 py-1 text-[12px]", i === 1 ? "bg-white font-medium shadow-[0_1px_2px_rgb(0_0_0/0.08)]" : "text-[#52525b]")}>
              {t}
              {n ? <span className="rounded-full bg-[#e4e4e7] px-1.5 text-[10px] font-medium text-[#3f3f46]">{n}</span> : null}
            </span>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold">Triage Progress</span>
            <span className="rounded-full bg-[#f4f4f5] px-2 py-0.5 text-[11px] font-medium">57%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f4f4f5]">
            <div className="h-full rounded-full bg-[#18181b]" style={{ width: "57%" }} />
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[220px_1fr] items-start gap-3">
          <div className="rounded-xl border border-[#e4e4e7] bg-white p-2">
            {(
              [
                ["Validation", "Check completeness"],
                ["Fee Assessment", "Estimate search & prep fees"],
                ["Payment Status", "Deposit and balance"],
              ] as const
            ).map(([s, d], i) => (
              <div key={s} className={cn("flex items-center gap-2.5 rounded-lg px-2.5 py-2", i === 0 && "bg-[#f4f4f5]")}>
                <span className={cn("flex size-6 items-center justify-center rounded-full text-[11px] font-semibold", i === 0 ? "bg-[#18181b] text-white" : "border border-[#d4d4d8] text-[#71717a]")}>{i + 1}</span>
                <span className="leading-tight">
                  <span className={cn("block text-[12.5px]", i === 0 ? "font-semibold" : "text-[#3f3f46]")}>{s}</span>
                  <span className="block text-[10.5px] text-[#71717a]">{d}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[#e4e4e7] bg-white px-5 py-4">
            <h2 className="text-[15px] font-semibold">Step 1: Validation</h2>
            <p className="mt-0.5 text-[12px] text-[#71717a]">Review completeness before moving forward.</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 rounded-lg border-2 border-[#18181b] px-3 py-2.5">
                <CircleCheck className="mt-0.5 size-4" strokeWidth={1.9} />
                <span className="leading-tight">
                  <span className="block text-[12.5px] font-semibold">Validate Request</span>
                  <span className="mt-0.5 block text-[11.5px] text-[#71717a]">Complete the checklist.</span>
                </span>
              </div>
              <div className="flex items-start gap-2.5 rounded-lg border border-[#e4e4e7] px-3 py-2.5">
                <MessageSquare className="mt-0.5 size-4 text-[#71717a]" strokeWidth={1.9} />
                <span className="leading-tight">
                  <span className="block text-[12.5px] font-semibold">Clarification Required</span>
                  <span className="mt-0.5 block text-[11.5px] text-[#71717a]">Request missing information.</span>
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-[13px] font-semibold">Validation Checklist</span>
              <span className="text-[11.5px] text-[#71717a]">
                <span className="font-medium text-[#18181b]">4 / 7</span> required
              </span>
            </div>
            <div className="mt-2 divide-y divide-[#f0f0f1] rounded-lg border border-[#e4e4e7]">
              {checklist.map(([label, req, done]) => (
                <div key={label} className="flex h-[30px] items-center gap-2.5 px-3 text-[12.5px]">
                  {done ? (
                    <span className="flex size-3.5 items-center justify-center rounded-[4px] bg-[#18181b]">
                      <svg viewBox="0 0 12 12" className="size-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2.5 6.2 5 8.5l4.5-5" />
                      </svg>
                    </span>
                  ) : (
                    <Checkbox />
                  )}
                  <span className={cn(done ? "text-[#18181b]" : "text-[#3f3f46]")}>
                    {label}
                    {req ? <span className="ml-0.5 text-[#dc2626]">*</span> : null}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1 text-[12px] font-medium text-[#3f3f46]">
              <ChevronDown className="size-3.5" />
              Internal notes (optional)
            </p>
            <div className="mt-1.5 rounded-md border border-[#e4e4e7] px-3 py-2 text-[12px] leading-relaxed text-[#3f3f46]">
              Requester confirmed scope by phone on Oct 21: lead and bacteriological results for the Harbourview distribution system, Jan–Sep 2026. Residential sampling addresses will need review under s.14.
            </div>
          </div>
        </div>
      </DetailShell>
    </ScreenCanvas>
  );
}

/* ---------- 4. Exemptions ---------- */

function Exemptions() {
  const rows: [string, string, string, string, string][] = [
    ["ADV-01", "Advice or recommendations", "Advice or recommendations of an officer, employee or consultant of the institution.", "Advice & Deliberation", "Oct 14, 2026"],
    ["CAB-01", "Draft by-laws and closed meetings", "Records revealing draft by-laws or the substance of closed-meeting deliberations.", "Council Confidences", "Oct 14, 2026"],
    ["CC-01", "Council in-camera reports", "Reports prepared for an in-camera council or committee session.", "Council Confidences", "Sep 30, 2026"],
    ["IG-01", "Relations with other governments", "Information received in confidence from another level of government or its agencies.", "Intergovernmental", "Sep 30, 2026"],
    ["LE-01", "Law enforcement", "Disclosure could interfere with an investigation or law enforcement matter.", "Law Enforcement", "Sep 22, 2026"],
    ["MFIPPA s.10", "Third-party information", "Commercial, financial or technical information supplied in confidence.", "Third Party", "Sep 22, 2026"],
    ["MFIPPA s.11", "Economic and other interests", "Disclosure could prejudice the municipality's economic interests.", "Economic Interests", "Sep 18, 2026"],
    ["MFIPPA s.12", "Solicitor-client privilege", "Records subject to solicitor-client or litigation privilege.", "Legal Privilege", "Sep 18, 2026"],
    ["MFIPPA s.13", "Danger to safety or health", "Disclosure could reasonably be expected to seriously threaten safety or health.", "Health & Safety", "Sep 10, 2026"],
    ["MFIPPA s.14", "Personal privacy", "Personal information about an identifiable individual other than the requester.", "Personal Privacy", "Sep 10, 2026"],
  ];
  return (
    <ScreenCanvas id="requests-exemptions">
      <RequestsShell active="exemptions">
        <PageHeader title="Exemption Management" subtitle="Manage FOI exemption types and categories." />
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Segmented items={["Exemptions", "Categories"]} />
            <span className="flex items-center gap-2 text-[12px]">
              <span className="rounded-md border border-[#e4e4e7] px-2 py-1 text-[#3f3f46]">
                Total: <span className="font-semibold text-[#18181b]">66</span>
              </span>
              <span className="flex items-center gap-1 rounded-md border border-[#e4e4e7] px-2 py-1 text-[#3f3f46]">
                <CircleCheck className="size-3.5 text-[#16a34a]" strokeWidth={1.9} />
                Active: <span className="font-semibold text-[#18181b]">62</span>
              </span>
              <span className="flex items-center gap-1 rounded-md border border-[#e4e4e7] px-2 py-1 text-[#3f3f46]">
                <CircleX className="size-3.5 text-[#a1a1aa]" strokeWidth={1.9} />
                Inactive: <span className="font-semibold text-[#18181b]">4</span>
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Btn variant="outline">Export</Btn>
            <Btn icon={Plus}>New Exemption Type</Btn>
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-[#e4e4e7] bg-white p-3">
          <div className="flex items-center gap-2">
            <SearchInput placeholder="Search exemption types…" className="flex-1" width={undefined} />
            <Select value="All Categories" width={170} />
            <Select value="All" width={110} />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[12px] text-[#52525b]">
              <Filter className="size-3.5" strokeWidth={1.75} />
              <span><span className="font-medium text-[#18181b]">66</span> of 66 exemption types</span>
            </span>
            <ColumnsIcon />
          </div>
        </div>
        <DataTable
          className="mt-3"
          rowHeight={40}
          columns={[
            { label: "Code", sort: true, width: "108px" },
            { label: "Name", sort: true, width: "2.6fr" },
            { label: "Category", sort: true, width: "1.15fr" },
            { label: "Status", width: "72px" },
            { label: "Last Modified", sort: true, width: "102px" },
            { label: "", width: "28px", align: "right" },
          ]}
          rows={rows.map(([code, name, desc, cat, date]) => [
            <span key="c" className="font-mono text-[11.5px]">{code}</span>,
            <span key="n" className="block min-w-0 leading-[1.25]">
              <span className="block truncate font-semibold">{name}</span>
              <span className="block truncate text-[11px] text-[#71717a]">{desc}</span>
            </span>,
            <span key="k" className="rounded-md border border-[#e4e4e7] px-1.5 py-[1px] text-[11px] font-medium text-[#3f3f46]">{cat}</span>,
            <span key="s" className="rounded-full bg-[#18181b] px-2 py-[2px] text-[10.5px] font-medium text-white">Active</span>,
            <span key="d" className="text-[#52525b]">{date}</span>,
            <EllipsisVertical key="a" className="ml-auto size-4 text-[#71717a]" />,
          ])}
          footer={<TableFooter summary="0 of 66 row(s) selected." page="Page 1 of 7" compact />}
        />
      </RequestsShell>
    </ScreenCanvas>
  );
}

/* ---------- 5. Redaction ---------- */

const actionTone: Record<string, Tone> = { "Status Change": "orange", Edit: "amber", Create: "green", Upload: "blue" };

function Redaction() {
  const doc = "Harbourview_Water_Sampling_2026.pdf";
  const rows: [string, string, string, string, string, string][] = [
    ["11:38 AM", "Status changed", "ACT-00483", "Status Change", "Priya Shah", "In Review → Ready for Review"],
    ["11:36 AM", "Exemption index generated", "ACT-00482", "Create", "Priya Shah", "Index of exemptions · 79 redactions · MFIPPA s.14"],
    ["11:35 AM", "Redacted copy generated", "ACT-00481", "Create", "Priya Shah", "Redacted PDF v2 · 18 pages · burn-in applied"],
    ["11:21 AM", "Exemption applied", "ACT-00480", "Edit", "Priya Shah", "MFIPPA s.14 applied to 79 redactions"],
    ["11:09 AM", "Manual redaction added", "ACT-00479", "Edit", "Priya Shah", "Page 12 · resident name and civic address"],
    ["10:58 AM", "AI suggestions accepted", "ACT-00478", "Edit", "Priya Shah", "78 of 78 suggestions accepted"],
    ["10:47 AM", "AI analysis completed", "ACT-00477", "Status Change", "System", "78 suggestions across 4 pages"],
    ["10:44 AM", "AI analysis started", "ACT-00476", "Status Change", "Daniel Okafor", "Personal information and third-party models"],
    ["10:41 AM", "Imported from request", "ACT-00475", "Upload", "Daniel Okafor", "Imported from FOI-2026-10-18-0062 · 18 pages"],
    ["10:40 AM", "Redaction created", "ACT-00474", "Create", "Daniel Okafor", "Redaction RED-052 created for FOI-2026-10-18-0062"],
  ];
  return (
    <ScreenCanvas id="requests-redaction">
      <RequestsShell active="redaction">
        <PageHeader
          title="Document Redaction"
          subtitle="Manage and track document redactions for FOI requests"
          actions={
            <>
              <Btn variant="outline">Export</Btn>
              <Btn icon={Plus}>
                New Redaction <ChevronDown className="size-3.5 opacity-70" />
              </Btn>
            </>
          }
        />
        <Segmented className="mt-4" items={["Overview", "History", "Settings"]} active={1} />
        <div className="mt-3 rounded-xl border border-[#e4e4e7] bg-white p-3">
          <div className="flex items-center gap-2">
            <SearchInput placeholder="Search activities…" className="flex-1" width={undefined} />
            <Select value="all" width={130} />
            <Select value="All" width={130} />
          </div>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[12px] text-[#52525b]">
              <Activity className="size-3.5" strokeWidth={1.75} />
              <span><span className="font-medium text-[#18181b]">10</span> of 10 activities</span>
            </span>
            <Btn variant="outline" className="h-7 text-[12px]">Export CSV</Btn>
          </div>
        </div>
        <DataTable
          className="mt-3"
          rowHeight={47}
          columns={[
            { label: "Timestamp", sort: true, width: "156px" },
            { label: "Action", width: "1.45fr" },
            { label: "Type", width: "110px" },
            { label: "Document", width: "1.1fr" },
            { label: "User", width: "108px" },
            { label: "Details", width: "1.15fr" },
            { label: "", width: "24px", align: "right" },
          ]}
          rows={rows.map(([time, action, id, type, user, details]) => [
            <span key="t" className="flex items-center gap-1.5 text-[11.5px] text-[#3f3f46]">
              <Clock className="size-3.5 shrink-0 text-[#a1a1aa]" strokeWidth={1.75} />
              Nov 3, 2026, {time}
            </span>,
            <span key="a" className="block min-w-0 leading-tight">
              <span className="block truncate font-semibold">{action}</span>
              <span className="mt-0.5 block text-[10.5px] text-[#71717a]">ID: {id}</span>
            </span>,
            <Badge key="y" tone={actionTone[type]}>{type}</Badge>,
            <span key="d" className="flex min-w-0 items-center gap-1.5">
              <FileText className="size-3.5 shrink-0 text-[#71717a]" strokeWidth={1.75} />
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[12px]">{doc}</span>
                <span className="block text-[10.5px] text-[#71717a]">RED-052</span>
              </span>
            </span>,
            <span key="u" className="flex items-center gap-1.5 text-[12px]">
              <User className="size-3.5 shrink-0 text-[#71717a]" strokeWidth={1.75} />
              <span className="truncate">{user}</span>
            </span>,
            <span key="x" className="block truncate text-[12px] text-[#52525b]">{details}</span>,
            <MoreHorizontal key="m" className="ml-auto size-4 text-[#71717a]" />,
          ])}
          footer={<TableFooter summary="0 of 10 row(s) selected." page="Page 1 of 1" compact />}
        />
      </RequestsShell>
    </ScreenCanvas>
  );
}

/** requests screens: id → component. */
export const requestsScreens: Record<string, () => ReactNode> = {
  "requests-dashboard": Dashboard,
  "requests-kanban": RequestsKanban,
  "requests-triage": RequestTriage,
  "requests-exemptions": Exemptions,
  "requests-redaction": Redaction,
};
