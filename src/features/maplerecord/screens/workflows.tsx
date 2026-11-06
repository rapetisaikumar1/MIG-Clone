import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleStop,
  Clock,
  Eye,
  FileCheck2,
  FileInput,
  GitBranch,
  GripVertical,
  History,
  Inbox,
  LayoutGrid,
  ListFilter,
  Mail,
  Maximize,
  PanelLeft,
  Play,
  Plus,
  Redo2,
  RefreshCw,
  Scan,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  SquareCheck,
  Timer,
  TriangleAlert,
  Undo2,
  Upload,
  Workflow,
  ZoomIn,
  ZoomOut,
  CircleAlert,
  Hand,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, Btn, Checkbox, PageHeader, ScreenCanvas, TopBar, type Icon, type Tone } from "./kit";

/*
 * MR Workflows screens: Dashboard, workflow designer canvas, Workflows list, Run history.
 * Shell mirrors the real MR Workflows app: product top bar without center search, a plain sidebar
 * (no header block, no Help footer) grouped into Overview / Manage / Compliance / Configure.
 * All sample content is fictional (City of Harbourview).
 */

/* ---------- Shell ---------- */

type WfNav = "dashboard" | "workflows" | "approvals" | "runs" | "audit" | "reports" | "roles" | "settings";

const NAV: { label: string; items: [WfNav, string, Icon][] }[] = [
  { label: "Overview", items: [["dashboard", "Dashboard", LayoutGrid]] },
  {
    label: "Manage",
    items: [
      ["workflows", "Workflows", Workflow],
      ["approvals", "Approvals", SquareCheck],
      ["runs", "Run history", History],
    ],
  },
  {
    label: "Compliance",
    items: [
      ["audit", "Audit Trail", ShieldCheck],
      ["reports", "Reports", BarChart3],
    ],
  },
  {
    label: "Configure",
    items: [
      ["roles", "Roles", Shield],
      ["settings", "Settings", Settings],
    ],
  },
];

function WfSidebar({ active }: { active: WfNav }) {
  return (
    <aside className="flex w-[232px] shrink-0 flex-col border-r border-[#e4e4e7] bg-[#fafafa]">
      <nav className="px-2 py-2">
        {NAV.map((s, i) => (
          <div key={s.label} className={i > 0 ? "mt-3" : undefined}>
            <p className="px-2 pb-1 pt-1 text-[11.5px] text-[#71717a]">{s.label}</p>
            <ul className="space-y-px">
              {s.items.map(([key, label, IconC]) => (
                <li key={key}>
                  <span className={cn("flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px]", key === active ? "bg-[#ececee] font-medium text-[#18181b]" : "text-[#27272a]")}>
                    <IconC className="size-[15px] shrink-0" strokeWidth={1.75} />
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function WfFrame({ active, children, bare }: { active: WfNav; children: ReactNode; bare?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <TopBar product="MR Workflows" search={null} />
      <div className="flex min-h-0 flex-1">
        <WfSidebar active={active} />
        {bare ? (
          <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">{children}</main>
        ) : (
          <main className="relative min-w-0 flex-1 overflow-hidden px-6 pt-3">
            <PanelLeft className="size-4 text-[#3f3f46]" strokeWidth={1.75} />
            {children}
          </main>
        )}
      </div>
    </div>
  );
}

/* ---------- Local building blocks ---------- */

function Kpi({ label, value, caption, icon: IconC, valueClass }: { label: string; value: ReactNode; caption?: ReactNode; icon: Icon; valueClass?: string }) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-[#71717a]">{label}</p>
        <p className={cn("mt-2 text-[26px] font-semibold leading-none tracking-[-0.02em]", valueClass)}>{value}</p>
        {caption ? <p className="mt-2 truncate text-[11.5px] text-[#71717a]">{caption}</p> : null}
      </div>
      <IconC className="size-4 shrink-0 text-[#71717a]" strokeWidth={1.75} />
    </div>
  );
}

function Panel({ title, link, children, className }: { title: string; link?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-[#e4e4e7] bg-white", className)}>
      <div className="flex items-center justify-between px-4 pb-1.5 pt-3.5">
        <h3 className="text-[13.5px] font-semibold">{title}</h3>
        {link ? (
          <span className="flex items-center gap-1 text-[12px] font-medium text-[#52525b]">
            {link}
            <ArrowRight className="size-3.5" strokeWidth={1.75} />
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/** One status palette for runs on every screen: Running is blue, amber is reserved for Partial. */
const runTone: Record<string, Tone> = { Success: "green", Running: "blue", Partial: "amber", Failed: "red" };
const RUN_COLOR = { success: "#16a34a", running: "#2563eb", partial: "#d97706" };

/* ---------- 1. Dashboard ---------- */

function Dashboard() {
  const outcomes: [string, number, string][] = [
    ["Succeeded", 24, RUN_COLOR.success],
    ["In progress / waiting", 1, RUN_COLOR.running],
    ["Partial", 1, RUN_COLOR.partial],
  ];
  const total = 26;
  const approvals: [string, string, string][] = [
    ["Destruction Authorization — 2019 Financial Records", "Records Manager", "Nov 9"],
    ["Legal Hold Placement — Harbour Road Expropriation", "Legal Services", "Nov 10"],
    ["Release Hold — Tender HV-2021-114 Files", "Records Manager", "Nov 12"],
  ];
  const runs: [string, string, string, string][] = [
    ["Harbourview — Destruction Authorization", "Running", "Form Submit", "Nov 6, 09:14"],
    ["Clerk Email Intake", "Success", "Email Received", "Nov 6, 08:12"],
    ["Harbourview — Retrieval from Archives", "Success", "Form Submit", "Nov 5, 15:47"],
  ];
  return (
    <ScreenCanvas id="workflows-dashboard">
      <WfFrame active="dashboard">
        <PageHeader
          title="Dashboard"
          subtitle="Overview of published workflows, run health, and Approver tasks waiting for a decision."
          actions={
            <>
              <Btn variant="outline" icon={RefreshCw}>Refresh</Btn>
              <Btn>Open workflows</Btn>
            </>
          }
        />
        <div className="mt-4 grid grid-cols-4 gap-3">
          <Kpi label="Workflows" value="14" caption="12 published · 2 draft" icon={Workflow} />
          <Kpi label="Pending approvals" value="3" caption="Awaiting a decision" icon={Inbox} />
          <Kpi label="Recent runs" value="26" caption="24 ok · 1 partial · 1 running" icon={History} />
          <Kpi label="Needs attention" value="3" caption="3 approvals · 0 failed runs" icon={CircleAlert} />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          <Panel title="Run outcomes" link="Run history" className="col-span-2">
            <div className="space-y-[11px] px-4 pb-3.5 pt-2">
              {outcomes.map(([label, n, color]) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="text-[#3f3f46]">{label}</span>
                    <span className="font-semibold tabular-nums">{n}</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#f4f4f5]">
                    <div className="h-full rounded-full" style={{ width: `${Math.max((n / total) * 100, 1.5)}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Quick links" link="All workflows">
            <div className="px-2 pb-2">
              {(
                [
                  [Inbox, "Approvals inbox", "3 pending"],
                  [History, "Run history", "0 failed"],
                  [Workflow, "Manage workflows", "12 published"],
                ] as [Icon, string, string][]
              ).map(([IconC, t, c]) => (
                <div key={t} className="flex items-center gap-3 rounded-md px-2 py-[5px]">
                  <span className="flex size-8 items-center justify-center rounded-md border border-[#e4e4e7] bg-[#fafafa]">
                    <IconC className="size-4 text-[#3f3f46]" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-[12.5px] font-medium">{t}</span>
                    <span className="block text-[11.5px] text-[#71717a]">{c}</span>
                  </span>
                  <ChevronRight className="size-4 text-[#a1a1aa]" strokeWidth={1.75} />
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <Panel title="Pending approvals" link="Open inbox">
            <div className="px-4 pb-1.5">
              {approvals.map(([t, role, due]) => (
                <div key={t} className="flex h-[48px] items-center gap-3 border-b border-[#f0f0f1] last:border-b-0">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f5f3ff] text-[#6d28d9]">
                    <SquareCheck className="size-3.5" strokeWidth={1.9} />
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] font-medium">{t}</span>
                    <span className="mt-0.5 block text-[11.5px] text-[#71717a]">
                      {role} · due {due}
                    </span>
                  </span>
                  <Badge tone="violet">Waiting</Badge>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Latest runs" link="View all">
            <div className="px-4 pb-1.5">
              {runs.map(([name, status, trigger, ts], i) => (
                <div key={i} className="flex h-[48px] items-center gap-3 border-b border-[#f0f0f1] last:border-b-0">
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block truncate text-[12.5px] font-medium">{name}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-[11.5px] text-[#71717a]">
                      <Badge tone={runTone[status]}>{status}</Badge>
                      {trigger}
                    </span>
                  </span>
                  <span className="shrink-0 text-[11.5px] tabular-nums text-[#71717a]">{ts}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel title="Recently updated workflows" link="Manage" className="mt-3">
          <div className="px-4 pb-1.5">
            {(
              [
                ["Council Agenda Package Approval", "request", "Draft", "Nov 5, 16:42 · Priya Shah"],
                ["Harbourview — Legal Hold Placement", "request", "Published", "Nov 3, 11:28 · Daniel Okafor"],
              ] as [string, string, string, string][]
            ).map(([n, trig, st, upd]) => (
              <div key={n} className="flex h-[46px] items-center gap-3 border-b border-[#f0f0f1] last:border-b-0">
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-[12.5px] font-medium">{n}</span>
                  <span className="mt-0.5 block text-[11.5px] text-[#71717a]">{trig}</span>
                </span>
                <StatusPill status={st} />
                <span className="w-[200px] text-right text-[11.5px] text-[#71717a]">{upd}</span>
              </div>
            ))}
          </div>
        </Panel>
      </WfFrame>
    </ScreenCanvas>
  );
}

/** Workflow status uses the same badge style as run statuses: Published green, Draft neutral. */
function StatusPill({ status }: { status: string }) {
  return <Badge tone={status === "Published" ? "green" : "gray"}>{status}</Badge>;
}

/* ---------- 2. Designer canvas ---------- */

type FlowNode = { id: string; x: number; y: number; title: string; chip: string; icon: Icon; handles: ("l" | "r" | "t" | "b")[] };

/* Palette 288px wide leaves a 760px canvas: three 208px columns with 46px connector gaps. */
const PALETTE_W = 288;
const NODE_W = 208;
const NODE_H = 68;
const COL = [22, 276, 530] as const;
const ROW = [80, 252, 424] as const;

const nodes: FlowNode[] = [
  { id: "start", x: COL[0], y: ROW[0], title: "Submitted", chip: "Form Submit", icon: Play, handles: ["r"] },
  { id: "rm", x: COL[1], y: ROW[0], title: "Records Manager", chip: "Approval", icon: ShieldCheck, handles: ["l", "r"] },
  { id: "legal", x: COL[2], y: ROW[0], title: "Legal Review", chip: "Approval", icon: Shield, handles: ["l", "b"] },
  { id: "gw", x: COL[0], y: ROW[1], title: "Approved?", chip: "Gateway", icon: GitBranch, handles: ["t", "r", "b"] },
  { id: "cert", x: COL[1], y: ROW[1], title: "Issue certificate", chip: "Action", icon: FileCheck2, handles: ["l", "r"] },
  { id: "done", x: COL[2], y: ROW[1], title: "Done", chip: "End", icon: CircleStop, handles: ["l", "b"] },
  { id: "notify", x: COL[1], y: ROW[2], title: "Notify requester", chip: "Send email", icon: Mail, handles: ["l", "r"] },
];

function FlowNodeCard({ n, selected }: { n: FlowNode; selected?: boolean }) {
  const IconC = n.icon;
  const handlePos: Record<string, string> = {
    l: "left-[-5px] top-1/2 -translate-y-1/2",
    r: "right-[-5px] top-1/2 -translate-y-1/2",
    t: "top-[-5px] left-1/2 -translate-x-1/2",
    b: "bottom-[-5px] left-1/2 -translate-x-1/2",
  };
  return (
    <div
      className={cn(
        "absolute flex items-center gap-2.5 rounded-xl border bg-white pl-3 pr-3 shadow-[0_1px_3px_rgb(0_0_0/0.06)]",
        selected ? "border-[#3b82f6] ring-2 ring-[#bfdbfe]" : "border-[#e4e4e7]",
      )}
      style={{ left: n.x, top: n.y, width: NODE_W, height: NODE_H }}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb] ring-1 ring-inset ring-[#bfdbfe]">
        <IconC className="size-4" strokeWidth={1.9} />
      </span>
      <span className="min-w-0 leading-[17px]">
        <span className="block whitespace-nowrap text-[13.5px] font-semibold text-[#18181b]">{n.title}</span>
        <span className="mt-1 inline-block rounded-[5px] bg-[#eff6ff] px-1.5 py-[1px] text-[10.5px] font-medium leading-[15px] text-[#1d4ed8]">{n.chip}</span>
      </span>
      {n.handles.map((h) => (
        <span key={h} className={cn("absolute size-[9px] rounded-full border-[1.5px] border-[#a1a1aa] bg-white", handlePos[h])} />
      ))}
    </div>
  );
}

/** Orthogonal "smoothstep" connector through the given points, with rounded corners. */
function stepPath(points: [number, number][], r = 10) {
  const [first, ...rest] = points;
  if (!first) return "";
  let d = `M${first[0]} ${first[1]}`;
  let prev = first;
  rest.forEach((pt, i) => {
    const next = rest[i + 1];
    if (!next) {
      d += ` L${pt[0]} ${pt[1]}`;
      return;
    }
    const [x, y] = pt;
    const inX = Math.sign(x - prev[0]);
    const inY = Math.sign(y - prev[1]);
    const outX = Math.sign(next[0] - x);
    const outY = Math.sign(next[1] - y);
    d += ` L${x - inX * r} ${y - inY * r} Q${x} ${y} ${x + outX * r} ${y + outY * r}`;
    prev = pt;
  });
  return d;
}

function Canvas() {
  const mid = (i: 0 | 1 | 2) => ROW[i] + NODE_H / 2;
  const right = (c: 0 | 1 | 2) => COL[c] + NODE_W;
  const cx = (c: 0 | 1 | 2) => COL[c] + NODE_W / 2;
  const bottom = (i: 0 | 1 | 2) => ROW[i] + NODE_H;
  const gray = "#a1a1aa";
  const green = "#16a34a";
  const violet = "#8b5cf6";
  const between01 = (bottom(0) + ROW[1]) / 2;
  const edges: [string, string][] = [
    [`M${right(0) + 5} ${mid(0)} L${COL[1] - 7} ${mid(0)}`, gray],
    [`M${right(1) + 5} ${mid(0)} L${COL[2] - 7} ${mid(0)}`, gray],
    [stepPath([[cx(2), bottom(0) + 5], [cx(2), between01], [cx(0), between01], [cx(0), ROW[1] - 7]]), gray],
    [`M${right(0) + 5} ${mid(1)} L${COL[1] - 7} ${mid(1)}`, green],
    [`M${right(1) + 5} ${mid(1)} L${COL[2] - 7} ${mid(1)}`, gray],
    [stepPath([[cx(0), bottom(1) + 5], [cx(0), mid(2)], [COL[1] - 7, mid(2)]], 14), violet],
    [stepPath([[right(1) + 5, mid(2)], [cx(2), mid(2)], [cx(2), bottom(1) + 7]], 14), gray],
  ];
  const marker = (color: string) => (color === violet ? "wf-arrow-v" : color === green ? "wf-arrow-g" : "wf-arrow");

  const groups: [string, boolean][] = [
    ["Triggers", true],
    ["Approvals", true],
    ["Gateways", false],
    ["End", false],
    ["Actions", false],
    ["Conditions", false],
    ["Delays", false],
  ];
  const approvalItems: [Icon, string, string][] = [
    [ShieldCheck, "Approval", "Assign a decision to a role or person"],
    [Users, "Parallel approval", "All assigned approvers must sign off"],
  ];
  const triggerItems: [Icon, string, string][] = [
    [Play, "Form Submit", "Start when a request form is sent"],
    [Mail, "Email Received", "Start from a monitored mailbox"],
    [Clock, "Schedule", "Run on a calendar schedule"],
    [Timer, "Interval", "Poll a folder every few minutes"],
    [Hand, "Manual", "Start from the Test Run button"],
  ];

  return (
    <ScreenCanvas id="workflows-canvas">
      <WfFrame active="workflows" bare>
        {/* Designer header */}
        <div className="flex items-start justify-between gap-3 border-b border-[#e4e4e7] px-4 pb-3 pt-3">
          <div className="flex min-w-0 items-start gap-3">
            <PanelLeft className="mt-0.5 size-4 shrink-0 text-[#3f3f46]" strokeWidth={1.75} />
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-[11.5px] text-[#71717a]">
                Workflows
                <ChevronRight className="size-3 text-[#a1a1aa]" strokeWidth={1.75} />
                <span className="text-[#3f3f46]">Destruction Authorization</span>
              </p>
              <div className="mt-1 flex items-center gap-2">
                <h1 className="whitespace-nowrap text-[15.5px] font-semibold tracking-[-0.01em]">Harbourview — Destruction Authorization</h1>
                <Badge tone="green" dot>
                  Published · rev 2
                </Badge>
              </div>
              <p className="mt-1 whitespace-nowrap text-[11.5px] text-[#71717a]">Save a draft, then Publish when triggers should use this revision.</p>
            </div>
          </div>
          <div className="mt-2.5 flex shrink-0 items-center gap-1.5 [&>span]:h-7 [&>span]:gap-1.5 [&>span]:px-2 [&>span]:text-[11.5px]">
            <Btn variant="outline" icon={Eye}>View published</Btn>
            <Btn variant="outline" className="!text-[#a1a1aa] !shadow-none">Revert to published</Btn>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-[#e4e4e7] bg-white font-medium">
              <Checkbox />
              Auto save
            </span>
            <Btn variant="outline">Save</Btn>
            <Btn variant="outline" icon={Upload}>Publish</Btn>
            <Btn icon={Play}>Test Run</Btn>
          </div>
        </div>

        <div className="flex min-h-0 flex-1">
          {/* Nodes palette */}
          <aside className="shrink-0 overflow-hidden border-r border-[#e4e4e7] bg-white px-4 pt-3" style={{ width: PALETTE_W }}>
            <div className="flex items-center justify-between">
              <h2 className="text-[13.5px] font-semibold">Nodes</h2>
              <ListFilter className="size-4 text-[#52525b]" strokeWidth={1.75} />
            </div>
            <span className="mt-2.5 flex h-8 items-center gap-2 rounded-md border border-[#e4e4e7] px-2.5 text-[12px] text-[#a1a1aa]">
              <Search className="size-3.5" strokeWidth={1.75} />
              Search nodes…
            </span>
            <div className="mt-2">
              {groups.map(([g, open]) => (
                <div key={g}>
                  <div className="flex h-8 items-center gap-1.5 text-[12.5px] font-medium text-[#3f3f46]">
                    {open ? <ChevronDown className="size-3.5 text-[#71717a]" /> : <ChevronRight className="size-3.5 text-[#71717a]" />}
                    {g}
                  </div>
                  {open ? (
                    <div className="mb-1.5 space-y-1.5">
                      {(g === "Triggers" ? triggerItems : approvalItems).map(([IconC, t, d]) => (
                        <div key={t} className="flex items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white py-[7px] pl-1.5 pr-2">
                          <GripVertical className="size-3.5 shrink-0 text-[#d4d4d8]" strokeWidth={1.75} />
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                            <IconC className="size-3.5" strokeWidth={1.9} />
                          </span>
                          <span className="min-w-0 leading-tight">
                            <span className="block text-[12px] font-medium">{t}</span>
                            <span className="block truncate text-[11px] text-[#71717a]">{d}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </aside>

          {/* Canvas */}
          <div
            className="relative min-w-0 flex-1 overflow-hidden bg-[#fafafa]"
            style={{ backgroundImage: "radial-gradient(#d4d4d8 1px, transparent 1px)", backgroundSize: "16px 16px" }}
          >
            <svg className="absolute inset-0 h-full w-full" fill="none">
              <defs>
                {([["wf-arrow", gray], ["wf-arrow-g", green], ["wf-arrow-v", violet]] as const).map(([id, color]) => (
                  <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
                    <path d="M0 0 L10 5 L0 10 z" fill={color} />
                  </marker>
                ))}
              </defs>
              {edges.map(([d, color], i) => (
                <path key={i} d={d} stroke={color} strokeWidth={1.5} markerEnd={`url(#${marker(color)})`} />
              ))}
            </svg>
            {/* Gateway branch labels */}
            <span
              className="absolute -translate-x-1/2 rounded-[5px] border border-[#bbf7d0] bg-[#ecfdf3] px-1.5 text-[10.5px] font-medium leading-[16px] text-[#15803d]"
              style={{ left: (right(0) + COL[1]) / 2, top: mid(1) - 25 }}
            >
              Yes
            </span>
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[5px] border border-[#ddd6fe] bg-[#f5f3ff] px-1.5 text-[10.5px] font-medium leading-[16px] text-[#6d28d9]"
              style={{ left: cx(0), top: (bottom(1) + mid(2)) / 2 }}
            >
              No
            </span>
            {nodes.map((n) => (
              <FlowNodeCard key={n.id} n={n} selected={n.id === "rm"} />
            ))}

            {/* Floating toolbar */}
            <div className="absolute right-3 top-3 flex h-8 items-center gap-0.5 rounded-lg border border-[#e4e4e7] bg-white px-1 text-[#3f3f46] shadow-[0_1px_3px_rgb(0_0_0/0.06)]">
              {[Undo2, Redo2].map((IconC, i) => (
                <span key={i} className="flex size-7 items-center justify-center">
                  <IconC className="size-3.5" strokeWidth={1.75} />
                </span>
              ))}
              <span className="mx-1 h-4 w-px bg-[#e4e4e7]" />
              <span className="px-1.5 text-[11.5px] font-medium tabular-nums">100%</span>
              <span className="mx-1 h-4 w-px bg-[#e4e4e7]" />
              {[ZoomOut, ZoomIn, Scan, Maximize].map((IconC, i) => (
                <span key={i} className="flex size-7 items-center justify-center">
                  <IconC className="size-3.5" strokeWidth={1.75} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </WfFrame>
    </ScreenCanvas>
  );
}

/* ---------- 3. Workflows list ---------- */

type WfRow = { name: string; trigger: string; status: "Published" | "Draft"; rev?: string; published?: string; updated: string; by: string };

const SYS = "29-Oct-2026 07:19";
const workflowRows: WfRow[] = [
  { name: "Council Agenda Package Approval", trigger: "request", status: "Draft", updated: "05-Nov-2026 16:42", by: "Priya Shah" },
  { name: "Harbourview — Legal Hold Placement", trigger: "request", status: "Published", rev: "Revision 3", published: "03-Nov-2026 11:28 · Daniel Okafor", updated: "03-Nov-2026 11:28", by: "Daniel Okafor" },
  { name: "Clerk Email Intake", trigger: "email", status: "Published", rev: "Revision 4", published: "02-Nov-2026 09:02 · Mei Lin", updated: "02-Nov-2026 09:02", by: "Mei Lin" },
  { name: "Scanned Mail Folder Sweep", trigger: "schedule", status: "Draft", updated: "31-Oct-2026 15:20", by: "Daniel Okafor" },
  { name: "Harbourview — Box Relocation", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "Harbourview — File Lending Return", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "Harbourview — Destruction Authorization", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "Harbourview — Reactivation", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "Harbourview — Release Hold", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "Harbourview — Retrieval from Archives", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "Harbourview — Inactive Transfer to Archives", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "Harbourview — Make Official (by-law / minutes)", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "Harbourview — Records Series Change", trigger: "request", status: "Published", rev: "Revision 2", published: `${SYS} · System`, updated: SYS, by: "System" },
  { name: "MFIPPA Search Assist", trigger: "manual", status: "Published", rev: "Revision 1", published: "21-Oct-2026 13:44 · Sarah Novak", updated: "21-Oct-2026 13:44", by: "Sarah Novak" },
];

function PlainTable({ columns, template, rows, rowHeight = 50 }: { columns: string[]; template: string; rows: ReactNode[][]; rowHeight?: number }) {
  return (
    <div>
      <div className="grid h-9 items-center border-b border-[#e4e4e7] text-[12px] font-medium text-[#71717a]" style={{ gridTemplateColumns: template }}>
        {columns.map((c) => (
          <span key={c} className="truncate pr-3">{c}</span>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid items-center border-b border-[#f0f0f1] text-[12.5px]" style={{ gridTemplateColumns: template, height: rowHeight }}>
          {r.map((cell, ci) => (
            <span key={ci} className="min-w-0 truncate pr-3">{cell}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

function TwoLine({ top, bottom, bold, mono }: { top: ReactNode; bottom?: ReactNode; bold?: boolean; mono?: boolean }) {
  return (
    <span className="block min-w-0 leading-tight">
      <span className={cn("block truncate", bold && "font-semibold text-[#18181b]", mono && "font-mono text-[11.5px]")}>{top}</span>
      {bottom ? <span className="mt-0.5 block truncate text-[11.5px] text-[#71717a]">{bottom}</span> : null}
    </span>
  );
}

function WorkflowsList() {
  return (
    <ScreenCanvas id="workflows-list">
      <WfFrame active="workflows">
        <PageHeader
          title="Workflows"
          subtitle="Create and publish generic canvases. Products like Records attach a published workflow to a request type on Approver Flow."
          actions={<Btn icon={Plus}>New workflow</Btn>}
        />
        <div className="mt-5">
          <PlainTable
            columns={["Name", "Status", "Published", "Updated"]}
            template="2.3fr 0.8fr 1.5fr 1.1fr"
            rowHeight={48}
            rows={workflowRows.map((w) => [
              <TwoLine key="n" top={w.name} bottom={w.trigger} bold />,
              <StatusPill key="s" status={w.status} />,
              w.rev ? <TwoLine key="p" top={w.rev} bottom={w.published} /> : <span key="p" className="text-[#a1a1aa]">Never published</span>,
              <TwoLine key="u" top={w.updated} bottom={w.by} />,
            ])}
          />
        </div>
      </WfFrame>
    </ScreenCanvas>
  );
}

/* ---------- 4. Run history ---------- */

function RunHistory() {
  const intake = "Clerk Email Intake";
  const rows: [string, string, string, string, string, string, string][] = [
    ["06-Nov-2026 09:14", "Harbourview — Destruction Authorization", "Form Submit", "REQ-2026-00431", "Running", "—", "—"],
    ["06-Nov-2026 08:12", intake, "Email Received", "run-2026-11-06-0812", "Success", "6 / 6 / 0", "City Clerk Records / Correspondence"],
    ["05-Nov-2026 15:47", "Harbourview — Retrieval from Archives", "Form Submit", "REQ-2026-00428", "Success", "—", "—"],
    ["05-Nov-2026 08:10", intake, "Email Received", "run-2026-11-05-0810", "Partial", "12 / 5 / 7", "City Clerk Records / Contracts"],
    ["04-Nov-2026 16:05", "Harbourview — File Lending Return", "Form Submit", "REQ-2026-00425", "Success", "—", "—"],
    ["04-Nov-2026 08:12", intake, "Email Received", "run-2026-11-04-0812", "Success", "5 / 5 / 0", "City Clerk Records / Contracts"],
    ["03-Nov-2026 14:22", "Harbourview — Box Relocation", "Form Submit", "REQ-2026-00419", "Success", "—", "—"],
    ["03-Nov-2026 08:11", intake, "Email Received", "run-2026-11-03-0811", "Success", "9 / 9 / 0", "City Clerk Records / Correspondence"],
    ["02-Nov-2026 11:36", "Harbourview — Reactivation", "Form Submit", "REQ-2026-00414", "Success", "—", "—"],
    ["02-Nov-2026 08:12", intake, "Email Received", "run-2026-11-02-0812", "Success", "7 / 7 / 0", "City Clerk Records / Contracts"],
    ["01-Nov-2026 08:10", intake, "Email Received", "run-2026-11-01-0810", "Success", "4 / 4 / 0", "City Clerk Records / Correspondence"],
  ];
  return (
    <ScreenCanvas id="workflows-runs">
      <WfFrame active="runs">
        <PageHeader
          title="Run history"
          subtitle="Executions from published triggers (Form Submit, Email Received, Schedule, Interval → Records folder). Empty idle ticks are not listed."
          actions={<Btn variant="outline" icon={RefreshCw}>Refresh</Btn>}
        />
        <div className="mt-5 grid grid-cols-5 gap-3">
          <Kpi label="Total runs" value="26" icon={History} />
          <Kpi label="Success" value="24" icon={CircleCheck} valueClass="text-[#16a34a]" />
          <Kpi label="Partial" value="1" icon={TriangleAlert} valueClass="text-[#d97706]" />
          <Kpi label="Failed" value="0" icon={CircleAlert} />
          <Kpi label="Fetched / Filed" value="148 / 141" icon={FileInput} />
        </div>
        <div className="mt-5">
          <PlainTable
            columns={["Started", "Workflow", "Source", "Status", "Fetched / Filed / Errors", "Destination"]}
            template="136px 268px 144px 76px 148px 1fr"
            rowHeight={46}
            rows={rows.map(([started, wf, trig, src, st, counts, dest]) => [
              <span key="t" className="tabular-nums text-[#3f3f46]">{started}</span>,
              <TwoLine key="w" top={wf} bottom={trig} bold />,
              <span key="s" className="font-mono text-[11.5px] text-[#3f3f46]">{src}</span>,
              <Badge key="b" tone={runTone[st] ?? "gray"}>{st}</Badge>,
              <span key="c" className={cn("tabular-nums", counts === "—" ? "text-[#a1a1aa]" : "text-[#18181b]")}>{counts}</span>,
              <span key="d" className={dest === "—" ? "text-[#a1a1aa]" : "text-[#3f3f46]"}>{dest}</span>,
            ])}
          />
        </div>
      </WfFrame>
    </ScreenCanvas>
  );
}

/** workflows screens: id → component. */
export const workflowsScreens: Record<string, () => ReactNode> = {
  "workflows-dashboard": Dashboard,
  "workflows-canvas": Canvas,
  "workflows-list": WorkflowsList,
  "workflows-runs": RunHistory,
};
