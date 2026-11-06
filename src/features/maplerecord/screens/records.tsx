import type { ReactNode } from "react";
import {
  Activity,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock,
  Database,
  EllipsisVertical,
  FileCheck2,
  FileText,
  Folder,
  Gavel,
  History,
  Info,
  MoreHorizontal,
  Package,
  Plus,
  Printer,
  RefreshCw,
  ScanBarcode,
  Search,
  Share2,
  Star,
  Trash2,
  TriangleAlert,
  Upload,
  User,
  Users,
  Workflow,
  X,
  Check,
  CalendarClock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Badge,
  Btn,
  Card,
  Checkbox,
  ColumnsButton,
  DataTable,
  PageHeader,
  ScreenCanvas,
  SearchInput,
  Segmented,
  StatTile,
  TableFooter,
  type Icon,
  type Tone,
} from "./kit";
import { OrgShell, WorkspaceRailShell, WorkspaceShell } from "./records-shell";

/* MR Records screens. Reference: the real MR Records UI (Retention Schedule, Record Series, …). */

/* ---------- Local helpers (gaps in the shared kit) ---------- */

/** Light-gray filled secondary button (Export, File into box, Print Labels …). */
function SecondaryBtn({ children, icon }: { children: ReactNode; icon?: Icon }) {
  return (
    <Btn variant="ghost" icon={icon} className="bg-[#f4f4f5]">
      {children}
    </Btn>
  );
}

/** Horizontal scrollbar shown under wide tables. */
function HScroll({ width = "72%" }: { width?: string }) {
  return (
    <div className="h-[6px] border-t border-[#f0f0f1] bg-white px-px">
      <div className="h-full rounded-full bg-[#d4d4d8]" style={{ width }} />
    </div>
  );
}

/** Record-type chip in file tables: OF = Official Record, WR = Working, NR = Non record. */
function TypeChip({ type }: { type: "OF" | "WR" | "NR" }) {
  return (
    <span
      className={cn(
        "inline-flex h-[18px] items-center rounded-[5px] border px-1 text-[9.5px] font-semibold",
        type === "OF" ? "border-[#bbf7d0] bg-[#f0fdf4] text-[#15803d]" : "border-[#e4e4e7] bg-[#fafafa] text-[#52525b]",
      )}
    >
      {type}
    </span>
  );
}

function IconSquare({ icon: IconC, tone }: { icon: Icon; tone: "gray" | "orange" | "green" | "red" | "amber" | "blue" }) {
  const t = {
    gray: "bg-[#f4f4f5] text-[#3f3f46]",
    orange: "bg-[#fff7ed] text-[#ea580c]",
    green: "bg-[#ecfdf3] text-[#16a34a]",
    red: "bg-[#fef2f2] text-[#dc2626]",
    amber: "bg-[#fffbeb] text-[#d97706]",
    blue: "bg-[#eff6ff] text-[#2563eb]",
  }[tone];
  return (
    <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", t)}>
      <IconC className="size-4" strokeWidth={1.75} />
    </span>
  );
}

/* ---------- Retention schedule (pilot) ---------- */

const disposition: Record<string, Tone> = { Archive: "green", "Archive Select": "violet", Dispose: "red", "Secure Shredding": "red", Permanent: "blue", Transfer: "amber" };

function RetentionSchedule() {
  const rows: [string, string, string, string][] = [
    ["Council Minutes – Permanent", "Calendar Year", "Permanent", "Permanent"],
    ["Bylaws & Resolutions – Permanent", "Calendar Year", "Permanent", "Permanent"],
    ["Financial Records – 7 Year", "Fiscal Year", "7 Year", "Secure Shredding"],
    ["Payroll Registers – Current + 7", "Calendar Year", "7 Year", "Secure Shredding"],
    ["Personnel Files – Separation + 7", "Calendar Year", "7 Year", "Dispose"],
    ["Building Permits – Completion + 25", "Calendar Year", "25 Year", "Archive Select"],
    ["Contracts – Expiry + 6", "Calendar Year", "6 Year", "Dispose"],
    ["FOI Request Files – Close + 2", "Calendar Year", "2 Year", "Dispose"],
    ["Land Title & Property – Permanent", "Calendar Year", "Permanent", "Archive"],
    ["Communications – 2 Year", "Calendar Year", "2 Year", "Dispose"],
  ];
  return (
    <ScreenCanvas id="records-retention">
      <OrgShell active="retention">
        <PageHeader
          title="Retention Schedule"
          subtitle="Manage retention schedules and activity logs"
          actions={
            <>
              <SecondaryBtn>Export</SecondaryBtn>
              <Btn icon={Plus}>Add Schedule</Btn>
            </>
          }
        />
        <Segmented className="mt-4" items={["Schedule", "Activity"]} />
        <div className="mt-4 flex items-center justify-between">
          <SearchInput placeholder="Search…" />
          <ColumnsButton />
        </div>
        <DataTable
          className="mt-3"
          rowHeight={42}
          columns={[{ label: "Name", sort: true, width: "2.2fr" }, { label: "Cycle", sort: true }, { label: "Active", sort: true, width: "0.8fr" }, { label: "Disposition Instruction", sort: true, width: "1.3fr" }, { label: "Actions", align: "right", width: 70 }]}
          rows={rows.map(([name, cycle, active, d]) => [
            <span key="n" className="font-medium">{name}</span>,
            cycle,
            active,
            <Badge key="d" tone={disposition[d] ?? "gray"}>{d}</Badge>,
            <MoreHorizontal key="a" className="ml-auto size-4 text-[#3f3f46]" />,
          ])}
          footer={<TableFooter summary="0 of 32 row(s) selected." page="Page 1 of 4" />}
        />
      </OrgShell>
    </ScreenCanvas>
  );
}

/* ---------- Workspace dashboard (reference #6) ---------- */

/** Smooth (Catmull-Rom → cubic Bézier) path through the points. */
function smoothPath(pts: [number, number][]) {
  const at = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))] ?? [0, 0];
  let d = `M${at(0)[0]},${at(0)[1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]?.toFixed(1)},${c1[1]?.toFixed(1)} ${c2[0]?.toFixed(1)},${c2[1]?.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}

function ActivityChart() {
  const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const values = [42, 57, 51, 68, 61, 79, 73, 48, 55, 86, 97, 38];
  const W = 626;
  const H = 224;
  const left = 30;
  const right = 8;
  const top = 8;
  const bottom = 24;
  const max = 120;
  const x = (i: number) => left + (i * (W - left - right)) / (months.length - 1);
  const y = (v: number) => top + (1 - v / max) * (H - top - bottom);
  const pts = values.map((v, i) => [x(i), y(v)] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L${x(11)},${y(0)} L${x(0)},${y(0)} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 block h-auto w-full">
      <defs>
        <linearGradient id="mr-activity-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#18181b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#18181b" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 30, 60, 90, 120].map((t) => (
        <g key={t}>
          <line x1={left} x2={W - right} y1={y(t)} y2={y(t)} stroke="#e4e4e7" strokeDasharray="3 3" />
          <text x={left - 8} y={y(t) + 3.5} textAnchor="end" fontSize="10.5" fill="#71717a">
            {t}
          </text>
        </g>
      ))}
      <path d={area} fill="url(#mr-activity-fill)" />
      <path d={line} fill="none" stroke="#18181b" strokeWidth="1.75" />
      {months.map((m, i) => (
        <text key={m} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10.5" fill="#71717a">
          {m}
        </text>
      ))}
    </svg>
  );
}

function MiniTile({ icon, tone, label, value }: { icon: Icon; tone: "gray" | "orange" | "green"; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#e4e4e7] bg-white px-3 py-2.5">
      <IconSquare icon={icon} tone={tone} />
      <div className="leading-tight">
        <p className="text-[11px] text-[#52525b]">{label}</p>
        <p className="mt-0.5 text-[15px] font-semibold">{value}</p>
      </div>
    </div>
  );
}

function ListRow({ icon, tone, title, sub, meta, badge }: { icon: Icon; tone: "gray" | "orange" | "green" | "red" | "amber" | "blue"; title: string; sub: string; meta?: string; badge?: string }) {
  return (
    <div className="flex items-start gap-3">
      <IconSquare icon={icon} tone={tone} />
      <div className="min-w-0 flex-1 leading-tight">
        <p className="truncate text-[12.5px] font-medium">{title}</p>
        <p className="mt-0.5 truncate text-[11.5px] text-[#52525b]">{sub}</p>
        {meta ? <p className="mt-0.5 text-[11px] text-[#71717a]">{meta}</p> : null}
      </div>
      {badge ? <span className="shrink-0 rounded-md border border-[#e4e4e7] px-1.5 py-[1px] text-[11px] font-medium">{badge}</span> : null}
    </div>
  );
}

function RecordsDashboard() {
  return (
    <ScreenCanvas id="records-dashboard">
      <WorkspaceShell active="dashboard">
        <PageHeader title="City Clerk Records overview" subtitle="A live snapshot of records, storage, and activity." actions={<Btn variant="outline" icon={RefreshCw}>Refresh</Btn>} />
        <div className="mt-4 grid grid-cols-4 gap-3">
          <StatTile label="Total Records" value="4,826" caption="+38 this month" icon={Folder} />
          <StatTile label="Storage Used" value="18.6 GB" caption="Total file storage" icon={Database} />
          <StatTile label="Shared Files" value="57" caption="Shared with 9 people" icon={Share2} />
          <StatTile label="This Week" value="24" caption="New records added" icon={Upload} />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          <MiniTile icon={Clock} tone="orange" label="Pending" value="7" />
          <MiniTile icon={Users} tone="gray" label="Team" value="12" />
          <MiniTile icon={FileText} tone="gray" label="Record Types" value="3" />
          <MiniTile icon={CircleCheck} tone="green" label="Active Loans" value="4" />
        </div>
        <div className="mt-3 grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-3">
          <Card title="Records Activity" action={<span className="text-[11.5px] text-[#71717a]">Last 12 months</span>} className="px-0">
            <div className="px-4 pb-3">
              <ActivityChart />
            </div>
          </Card>
          <div className="flex flex-col gap-3">
            <Card title="Today's Tasks" className="flex-1">
              <div className="space-y-3 px-4 pb-3.5">
                <ListRow icon={CalendarClock} tone="orange" title="Approve transfer TR-0418" sub="Planning & Dev · due 3:00 PM" badge="Request" />
                <ListRow icon={Package} tone="gray" title="Retrieve box CLERK-0007" sub="For Daniel Okafor · Legal" badge="Retrieval" />
              </div>
            </Card>
            <Card title="Alerts & Notifications" className="flex-1">
              <div className="space-y-3 px-4 pb-3.5">
                <ListRow icon={TriangleAlert} tone="amber" title="14 records eligible for disposition" sub="Contracts – Expiry + 6 · review by 30-Nov" />
                <ListRow icon={Gavel} tone="red" title="Legal hold applied" sub="Harbourfront Park Landscaping Contract" />
              </div>
            </Card>
          </div>
        </div>
        <Card className="mt-3" title="Recent Activity" action={<span className="flex items-center gap-1 text-[12px] text-[#3f3f46]">View all <ChevronRight className="size-3.5" /></span>}>
          <div className="divide-y divide-[#f0f0f1] px-4">
            <div className="pb-2.5 pt-1">
              <ListRow icon={FileCheck2} tone="green" title="Completed" sub="Transfer Request – Completed (TR-2026-0412) · Mei Lin" meta="2 hours ago" badge="Request" />
            </div>
            <div className="py-2.5">
              <ListRow icon={FileText} tone="gray" title="Transferred" sub="Council Minutes – Regular Meeting 21-Oct-2026 · Priya Shah" meta="5 hours ago" badge="Document" />
            </div>
            <div className="py-2.5">
              <ListRow icon={FileText} tone="gray" title="Declared Official" sub="Waste Collection Services Agreement 2026–2031 · Arjun Mehta" meta="Yesterday" badge="Document" />
            </div>
            <div className="py-2.5">
              <ListRow icon={FileCheck2} tone="green" title="In Progress" sub="Retrieval Request – In Progress (RR-2026-0093) · Daniel Okafor" meta="Yesterday" badge="Request" />
            </div>
          </div>
        </Card>
      </WorkspaceShell>
    </ScreenCanvas>
  );
}

/* ---------- Organization records + Lifecycle panel (reference #24) ---------- */

type Step = { title: string; sub: string; state: "done" | "now" | "todo" };

function StepList({ steps }: { steps: Step[] }) {
  return (
    <div>
      {steps.map((s, i) => (
        <div key={s.title} className="flex gap-2.5">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "flex size-[18px] shrink-0 items-center justify-center rounded-full",
                s.state === "done" && "border border-[#a1a1aa] bg-[#e4e4e7] text-[#3f3f46]",
                s.state === "now" && "bg-[#18181b]",
                s.state === "todo" && "bg-[#f0f0f1]",
              )}
            >
              {s.state === "done" ? <Check className="size-2.5" strokeWidth={2} /> : null}
              {s.state === "now" ? <span className="size-1.5 rounded-full bg-white" /> : null}
            </span>
            {i < steps.length - 1 ? <span className="my-0.5 w-px flex-1 bg-[#d4d4d8]" /> : null}
          </div>
          <div className={cn("pb-2.5 leading-tight", s.state === "todo" && "text-[#a1a1aa]")}>
            <p className="text-[12.5px] font-medium">
              {s.title}
              {s.state === "now" ? <span className="ml-1.5 text-[9.5px] font-semibold">NOW</span> : null}
            </p>
            <p className={cn("mt-0.5 whitespace-nowrap text-[10.5px]", s.state === "todo" ? "text-[#a1a1aa]" : "text-[#71717a]")}>{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LifecyclePanel() {
  return (
    <div className="flex w-[262px] shrink-0 flex-col border-l border-[#e4e4e7] bg-white">
      <div className="flex h-11 items-center justify-between border-b border-[#e4e4e7] px-4">
        <span className="text-[13.5px] font-semibold">Lifecycle</span>
        <X className="size-4 text-[#52525b]" strokeWidth={1.75} />
      </div>
      <div className="px-4 pt-3">
        <div className="rounded-lg border border-[#e4e4e7] bg-[#fafafa] px-3 py-2">
          <p className="text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#71717a]">You are here</p>
          <p className="mt-0.5 text-[13px] font-semibold">Official Record · Active</p>
        </div>
        <p className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#71717a]">Record type</p>
        <StepList
          steps={[
            { title: "Non record", sub: "Every upload starts here", state: "done" },
            { title: "Working record", sub: "Optional — can be skipped", state: "done" },
            { title: "Official Record", sub: "Approved Official Record request", state: "now" },
          ]}
        />
        <p className="mb-2 mt-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#71717a]">Retention clock</p>
        <StepList
          steps={[
            { title: "Awaiting trigger", sub: "Trigger 30-Sep-2026", state: "done" },
            { title: "Active", sub: "Clock running · Contracts – Expiry + 6", state: "now" },
            { title: "Inactive", sub: "Inactive band — Reactive can restart Active", state: "todo" },
            { title: "Eligible", sub: "Ready for destroy or archive", state: "todo" },
            { title: "Destroy or Archive", sub: "Disposition completed", state: "todo" },
          ]}
        />
        <p className="mb-2 mt-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#71717a]">While official</p>
        <div className="flex flex-wrap gap-1.5">
          {["Hold", "Reactive", "Transfer", "Lending", "Retrieval"].map((c) => (
            <span key={c} className="rounded-full border border-[#e4e4e7] bg-[#fafafa] px-2 py-[1px] text-[10.5px] text-[#52525b]">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelStrip({ icons, active }: { icons: Icon[]; active: number }) {
  return (
    <div className="flex w-[42px] shrink-0 flex-col border-l border-[#e4e4e7] bg-white">
      {icons.map((IconC, i) => (
        <span key={i} className={cn("flex h-[42px] items-center justify-center border-b border-[#f0f0f1] text-[#52525b]", i === active && "bg-[#f4f4f5] text-[#18181b]")}>
          <IconC className="size-4" strokeWidth={1.6} />
        </span>
      ))}
    </div>
  );
}

function SeriesTree() {
  const series = [
    "Accounts Payable Invoices",
    "Building Permits",
    "Bylaws & Resolutions",
    "Council Minutes",
    "Development Applications",
    "Election Records",
    "Emergency Management Plans",
    "Fleet Vehicle Maintenance",
    "FOI / MFIPPA Requests",
    "Land Title & Property",
    "Leave Records",
    "Licensing & Permits",
    "Payroll Registers",
    "Personnel Files",
    "Planning Studies",
    "Road Maintenance Logs",
  ];
  return (
    <div className="w-[168px] shrink-0 border-r border-[#e4e4e7] pl-4 pr-2 pt-4">
      <p className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#52525b]">Record series</p>
      <ul className="mt-3 space-y-[3px] text-[12.5px] text-[#27272a]">
        <li className="flex h-6 items-center gap-1.5">
          <ChevronDown className="size-3.5 shrink-0 text-[#71717a]" />
          <Folder className="size-3.5 shrink-0" strokeWidth={1.6} />
          <span className="truncate">Vendor Contracts</span>
        </li>
        <li className="ml-[9px] space-y-[3px] border-l border-[#e4e4e7] pl-2.5">
          {["Non records", "Working records", "Active Records", "Destroy"].map((f) => (
            <span key={f} className={cn("flex h-6 items-center gap-1.5 rounded-md px-1.5", f === "Active Records" && "bg-[#f0f0f1] font-medium")}>
              <Folder className="size-3.5 shrink-0 text-[#52525b]" strokeWidth={1.6} />
              <span className="truncate">{f}</span>
            </span>
          ))}
        </li>
        {series.map((s) => (
          <li key={s} className="flex h-6 items-center gap-1.5">
            <ChevronRight className="size-3.5 shrink-0 text-[#71717a]" />
            <Folder className="size-3.5 shrink-0" strokeWidth={1.6} />
            <span className="truncate">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RecordsLifecycle() {
  const rows: [string, string, string, string][] = [
    ["Winter Maintenance Contract", "2.4 MB", "02-Nov-2026", "Priya Shah"],
    ["Waste Collection Agreement", "3.8 MB", "02-Nov-2026", "Arjun Mehta"],
    ["IT Managed Services Renewal", "1.1 MB", "30-Oct-2026", "Mei Lin"],
    ["Library Renovation Contract", "6.2 MB", "30-Oct-2026", "Daniel Okafor"],
    ["LED Street Lighting Retrofit", "2.9 MB", "30-Oct-2026", "Grace Thompson"],
    ["Fleet Fuel Supply Agreement", "0.8 MB", "29-Oct-2026", "Arjun Mehta"],
    ["Harbourfront Landscaping", "1.7 MB", "29-Oct-2026", "Sarah Novak"],
    ["Transit Shelter Licence", "0.9 MB", "28-Oct-2026", "Mei Lin"],
    ["Community Centre Janitorial", "1.2 MB", "27-Oct-2026", "Grace Thompson"],
    ["Legal Services Retainer 2026", "0.4 MB", "27-Oct-2026", "Sarah Novak"],
  ];
  return (
    <ScreenCanvas id="records-lifecycle">
      <OrgShell active="records" adminOpen={false}>
        <div className="absolute inset-0 top-10 flex">
          <SeriesTree />
          <div className="min-w-0 flex-1 px-5 pt-4">
            <h1 className="text-[22px] font-semibold leading-tight tracking-[-0.01em]">Organization Records</h1>
            <div className="mt-4 flex items-center justify-between">
              <SearchInput placeholder="Search…" width={250} />
              <ColumnsButton />
            </div>
            <DataTable
              className="mt-3"
              rowHeight={42}
              columns={[
                { label: "Name", sort: true, width: 268 },
                { label: "Classification", sort: true, width: 106 },
                { label: "Size", sort: true, width: 62 },
                { label: "Modified", sort: true, width: 96 },
                { label: "Created By", sort: true, width: 120 },
              ]}
              rows={rows.map(([name, size, modified, by]) => [
                <span key="n" className="flex min-w-0 items-center gap-2">
                  <Star className="size-3.5 shrink-0 text-[#a1a1aa]" strokeWidth={1.75} />
                  <TypeChip type="OF" />
                  <FileText className="size-3.5 shrink-0 text-[#52525b]" strokeWidth={1.75} />
                  <span className="truncate">{name}</span>
                </span>,
                <Badge key="c" tone="green" className="text-[9.5px] tracking-[0.04em]">CLASSIFIED</Badge>,
                size,
                modified,
                by,
              ])}
              footer={
                <>
                  <HScroll width="58%" />
                  <TableFooter summary="0 of 15 row(s) selected." page="Page 1 of 2" />
                </>
              }
            />
          </div>
          <LifecyclePanel />
          <PanelStrip icons={[Info, FileCheck2, Activity, History, Workflow]} active={4} />
        </div>
      </OrgShell>
    </ScreenCanvas>
  );
}

/* ---------- Workspace files browser (reference #5) ---------- */

type TreeNode = { name: string; count?: number; open?: boolean; closed?: boolean; selected?: boolean; children?: TreeNode[] };

function TreeRows({ nodes, depth }: { nodes: TreeNode[]; depth: number }) {
  return (
    <>
      {nodes.map((n) => (
        <div key={n.name}>
          <div className={cn("flex h-[26px] items-center gap-1.5 rounded-md pr-2 text-[12.5px] text-[#27272a]", n.selected && "bg-[#f0f0f1] font-medium")} style={{ paddingLeft: 6 + depth * 12 }}>
            {n.open ? <ChevronDown className="size-3.5 shrink-0 text-[#71717a]" /> : n.closed ? <ChevronRight className="size-3.5 shrink-0 text-[#71717a]" /> : <span className="w-3.5 shrink-0" />}
            <Folder className="size-[15px] shrink-0" strokeWidth={1.6} />
            <span className="truncate">{n.name}</span>
            {n.count !== undefined ? <span className="ml-auto text-[11px] text-[#52525b]">{n.count}</span> : null}
          </div>
          {n.children ? <TreeRows nodes={n.children} depth={depth + 1} /> : null}
        </div>
      ))}
    </>
  );
}

function RecordsFiles() {
  const tree: TreeNode[] = [
    {
      name: "All Files",
      count: 131,
      open: true,
      children: [
        { name: "Non Records", count: 4, closed: true },
        { name: "Working Records", count: 6, closed: true },
        {
          name: "Active Records",
          count: 21,
          open: true,
          children: [
            { name: "Contracts", count: 12, open: true, selected: true },
            { name: "Council & Governance", count: 9, closed: true },
          ],
        },
        { name: "Destroy", count: 3, closed: true },
        { name: "By-law Enforcement Cases", count: 14, closed: true },
        { name: "Council Agendas 2026", count: 18, closed: true },
        { name: "Elections 2026", count: 7, closed: true },
        { name: "FOI Requests 2026", count: 23, closed: true },
        { name: "Invoices", count: 11, closed: true },
        { name: "Licensing", count: 9, closed: true },
        { name: "Marriage Licences 2026" },
        { name: "Personnel Records" },
        { name: "Archive Transfers" },
      ],
    },
  ];
  const rows: [string, string, string, string, string, string][] = [
    ["Winter Maintenance Contract", "Active", "2.41 MB", "2 days ago", "Priya Shah", "3 weeks ago"],
    ["Waste Collection Agreement 2026–2031", "Active", "3.84 MB", "2 days ago", "Arjun Mehta", "3 weeks ago"],
    ["IT Managed Services Renewal", "Active", "1.12 MB", "1 week ago", "Mei Lin", "1 month ago"],
    ["Library Renovation Contract", "Active", "6.20 MB", "1 week ago", "Daniel Okafor", "1 month ago"],
    ["Street Lighting LED Retrofit Contract", "Active", "2.93 MB", "1 week ago", "Grace Thompson", "1 month ago"],
    ["Harbourfront Park Landscaping", "On Hold", "1.68 MB", "1 week ago", "Sarah Novak", "1 month ago"],
    ["Fleet Fuel Supply Agreement", "Active", "842 KB", "1 week ago", "Arjun Mehta", "2 months ago"],
    ["Transit Shelter Advertising Licence", "Active", "961 KB", "2 weeks ago", "Mei Lin", "2 months ago"],
    ["Community Centre Janitorial Services", "Active", "1.24 MB", "2 weeks ago", "Grace Thompson", "2 months ago"],
    ["Legal Services Retainer — 2026", "Active", "456 KB", "2 weeks ago", "Sarah Novak", "3 months ago"],
    ["Water Meter Supply Agreement", "Active", "2.07 MB", "3 weeks ago", "Daniel Okafor", "3 months ago"],
    ["Road Resurfacing Contract 2026-14", "Active", "4.55 MB", "3 weeks ago", "Priya Shah", "4 months ago"],
  ];
  return (
    <ScreenCanvas id="records-files">
      <WorkspaceRailShell active="files">
        <div className="absolute inset-0 top-10 flex">
          <div className="flex w-[252px] shrink-0 flex-col border-r border-[#e4e4e7] px-3 pt-3">
            <div className="space-y-0.5 text-[12.5px] text-[#3f3f46]">
              {([
                [Clock, "Recent"],
                [Users, "Shared"],
                [Star, "Favourites"],
                [User, "Personal"],
              ] as [Icon, string][]).map(([IconC, label]) => (
                <span key={label} className="flex h-[26px] items-center gap-2 px-1.5">
                  <IconC className="size-3.5 text-[#71717a]" strokeWidth={1.75} />
                  {label}
                </span>
              ))}
            </div>
            <div className="mt-2 border-t border-[#e4e4e7] pt-3">
              <p className="px-1.5 pb-1.5 text-[10.5px] font-medium uppercase tracking-[0.06em] text-[#52525b]">City Clerk Records</p>
              <TreeRows nodes={tree} depth={0} />
            </div>
            <div className="mt-auto flex h-10 items-center gap-2 border-t border-[#e4e4e7] px-1.5 text-[12.5px] text-[#3f3f46]">
              <Trash2 className="size-3.5 text-[#71717a]" strokeWidth={1.75} />
              Recycle Bin
              <span className="ml-auto text-[11px] text-[#52525b]">13</span>
            </div>
          </div>
          <div className="min-w-0 flex-1 px-6 pt-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[22px] font-semibold leading-tight tracking-[-0.01em]">Contracts</h1>
                <p className="mt-1 flex items-center gap-1 text-[12px] text-[#52525b]">
                  All Files <ChevronRight className="size-3" /> Active Records <ChevronRight className="size-3" /> <span className="text-[#18181b]">Contracts</span>
                </p>
              </div>
              <Btn icon={Plus}>Add New</Btn>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <SearchInput placeholder="Search files…" width={330} />
              <ColumnsButton />
            </div>
            <DataTable
              className="mt-3"
              rowHeight={38}
              columns={[
                { label: "", width: 22 },
                { label: "", width: 44 },
                { label: "Name", width: 276 },
                { label: "Classification", width: 98 },
                { label: "Retention Status", width: 112 },
                { label: "Size", width: 68 },
                { label: "Modified", width: 86 },
                { label: "Created By", width: 108 },
                { label: "Created", width: 92 },
                { label: "Tags", width: 48 },
                { label: "Record Series", width: 160 },
                { label: "Template", width: 200 },
              ]}
              rows={rows.map(([name, status, size, modified, by, created]) => [
                <Star key="s" className="size-3.5 text-[#a1a1aa]" strokeWidth={1.75} />,
                <TypeChip key="t" type="OF" />,
                <span key="n" className="flex min-w-0 items-center gap-2 font-medium">
                  <FileText className="size-3.5 shrink-0 text-[#52525b]" strokeWidth={1.75} />
                  <span className="truncate">{name}</span>
                </span>,
                <Badge key="c" tone="green">Classified</Badge>,
                <Badge key="r" tone={status === "Active" ? "green" : "amber"}>{status}</Badge>,
                size,
                <span key="m" className="text-[#3f3f46]">{modified}</span>,
                by,
                <span key="cr" className="text-[#3f3f46]">{created}</span>,
                "—",
                <span key="rs" className="text-[#3f3f46]">Contracts &amp; Agreements</span>,
                <span key="tp" className="text-[#3f3f46]">Contract Execution Metadata</span>,
              ])}
              footer={<HScroll width="80%" />}
            />
            <div className="[&>div]:border-t-0 [&>div]:px-2">
              <TableFooter summary="0 of 12 row(s) selected." page="Page 1 of 1" rowsPerPage={20} />
            </div>
          </div>
        </div>
      </WorkspaceRailShell>
    </ScreenCanvas>
  );
}

/* ---------- Record series (reference #14) ---------- */

const confidentiality: Record<string, Tone> = { Confidential: "orange", Internal: "blue", Restricted: "red", "Highly Restricted": "red", Public: "green" };

function RecordSeries() {
  const rows: [string, string, string, string, string, string, string, string, string][] = [
    ["Accounts Payable Invoices", "FIN", "Finance & Taxation", "Confidential", "Financial", "Financial Records – 7 Year", "Record Creation", "Alphabetical", "FIN Department"],
    ["Accounts Receivable Ledgers", "FIN", "Finance & Taxation", "Internal", "Financial", "Financial Records – 7 Year", "Record Creation", "Alphabetical", "FIN Department"],
    ["Animal Licensing", "BLS", "By-law & Licensing", "Internal", "Regulatory", "Licences – Expiry + 2", "Licence Expiry", "Numerical", "BLS Department"],
    ["Audit Working Papers", "FIN", "Finance & Taxation", "Restricted", "Financial", "Financial Records – 10 Year", "Fiscal Year End", "Alphabetical", "FIN Department"],
    ["Bank Reconciliations", "FIN", "Finance & Taxation", "Confidential", "Financial", "Financial Records – 7 Year", "Record Creation", "Chronological", "FIN Department"],
    ["Benefits Enrollment Files", "HR", "Human Resources", "Highly Restricted", "Personnel", "Personnel Files – Separation + 7", "Employee Separation", "Alphabetical", "HR Department"],
    ["Building Permits", "PLN", "Planning & Building", "Public", "Regulatory", "Building Permits – Completion + 25", "Project Completion", "Numerical", "PLN Department"],
    ["Bylaws & Resolutions", "GOV", "Council & Governance", "Public", "Vital", "Bylaws & Resolutions – Permanent", "Record Creation", "Numerical", "CLK Department"],
    ["Capital Project Files", "ENG", "Engineering & Public Works", "Internal", "Operational", "Capital Projects – Close + 10", "Project Closure", "Numerical", "ENG Department"],
    ["Council Minutes", "GOV", "Council & Governance", "Public", "Vital", "Council Minutes – Permanent", "Record Creation", "Chronological", "CLK Department"],
  ];
  return (
    <ScreenCanvas id="records-series">
      <OrgShell active="series">
        <PageHeader
          title="Record Series"
          subtitle="Manage record series and their classifications"
          actions={
            <>
              <SecondaryBtn>Export</SecondaryBtn>
              <Btn icon={Plus}>Add Series</Btn>
            </>
          }
        />
        <Segmented className="mt-4" items={["Series", "Activity"]} />
        <div className="mt-4 flex items-center justify-between">
          <SearchInput placeholder="Search series by name…" />
          <ColumnsButton />
        </div>
        <DataTable
          className="mt-3"
          rowHeight={42}
          columns={[
            { label: "Name", sort: true, width: 186 },
            { label: "Code", sort: true, width: 58 },
            { label: "DIR", sort: true, width: 166 },
            { label: "Confidentiality", sort: true, width: 124 },
            { label: "Class", sort: true, width: 86 },
            { label: "Retention Schedule", width: 226 },
            { label: "Trigger Event", width: 132 },
            { label: "Arrangement", width: 104 },
            { label: "Sub Arrangement", width: 120 },
            { label: "Originator", width: 130 },
          ]}
          rows={rows.map(([name, code, dir, conf, cls, sched, trigger, arr, orig]) => [
            name,
            code,
            dir,
            <Badge key="c" tone={confidentiality[conf] ?? "gray"}>{conf}</Badge>,
            cls,
            sched,
            trigger,
            arr,
            "Date Ranges",
            orig,
          ])}
          footer={
            <>
              <HScroll width="70%" />
              <TableFooter summary="0 of 72 row(s) selected." page="Page 1 of 8" />
            </>
          }
        />
      </OrgShell>
    </ScreenCanvas>
  );
}

/* ---------- Workspace boxes (reference #3) ---------- */

function Capacity({ used, total }: { used: number; total: number }) {
  const pct = Math.round((used / total) * 100);
  return (
    <span className="flex items-center gap-3">
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#f0f0f1]">
        <span className={cn("block h-full rounded-full", pct >= 100 ? "bg-[#d97706]" : "bg-[#18181b]")} style={{ width: `${pct}%` }} />
      </span>
      <span className="w-[86px] shrink-0 text-right tabular-nums text-[#3f3f46]">
        {used.toLocaleString("en-US")} / {total.toLocaleString("en-US")}
      </span>
    </span>
  );
}

const boxStatus: Record<string, Tone> = { Empty: "gray", "In Use": "blue", Full: "amber" };

function RecordsBoxes() {
  const rows: [string, string, number, number][] = [
    ["BOX-CLERK-D-2026-2032-0012", "Standard Records Box", 0, 250],
    ["BOX-CLERK-D-2026-2032-0011", "Standard Records Box", 38, 250],
    ["BOX-CLERK-D-2026-2032-0010", "Legal Size Box", 412, 2000],
    ["BOX-CLERK-D-2025-2031-0009", "Standard Records Box", 250, 250],
    ["BOX-CLERK-D-2025-2031-0008", "Standard Records Box", 236, 250],
    ["BOX-CLERK-D-2025-2031-0007", "Legal Size Box", 2000, 2000],
    ["BOX-CLERK-D-2024-2030-0006", "Standard Records Box", 250, 250],
    ["BOX-CLERK-D-2024-2030-0005", "Legal Size Box", 1184, 2000],
    ["BOX-CLERK-D-2024-2030-0004", "Standard Records Box", 250, 250],
    ["BOX-CLERK-D-2023-2029-0003", "Standard Records Box", 117, 250],
  ];
  return (
    <ScreenCanvas id="records-boxes">
      <WorkspaceShell active="boxes">
        <PageHeader
          title="Boxes"
          subtitle="Manage physical storage boxes for CLERK"
          actions={
            <>
              <SecondaryBtn icon={ScanBarcode}>File into box</SecondaryBtn>
              <SecondaryBtn icon={ScanBarcode}>Assign to cabinet</SecondaryBtn>
              <SecondaryBtn icon={Printer}>Print Labels</SecondaryBtn>
              <Btn icon={Package}>Add Box</Btn>
            </>
          }
        />
        <div className="mt-5 flex items-center justify-between">
          <SearchInput placeholder="Search by box number…" />
          <ColumnsButton />
        </div>
        <DataTable
          className="mt-3"
          rowHeight={44}
          columns={[
            { label: "Box No.", sort: true, width: "1.45fr" },
            { label: "Box Type", sort: true, width: "1fr" },
            { label: "No. of Files", sort: true, width: "0.7fr" },
            { label: "Capacity", sort: true, width: "1.35fr" },
            { label: "Status", sort: true, width: "0.6fr" },
            { label: "Actions", align: "right", width: 64 },
          ]}
          rows={rows.map(([no, type, used, total]) => {
            const status = used === 0 ? "Empty" : used >= total ? "Full" : "In Use";
            return [
              no,
              type,
              used.toLocaleString("en-US"),
              <Capacity key="c" used={used} total={total} />,
              <Badge key="s" tone={boxStatus[status]}>{status}</Badge>,
              <EllipsisVertical key="a" className="ml-auto size-4 text-[#3f3f46]" />,
            ];
          })}
          footer={<TableFooter summary="0 of 24 row(s) selected." page="Page 1 of 3" />}
        />
      </WorkspaceShell>
    </ScreenCanvas>
  );
}

/* ---------- Search (reference #20) ---------- */

function RecordsSearch() {
  const rows: [string, string, string, string, string, string, string][] = [
    ["Harbourfront Park Landscaping", "Official Record", "Contracts & Agreements", "Active", "14-Oct-2026", "City Clerk Records", "Sarah Novak"],
    ["Harbourfront Revitalization Plan", "Official Record", "Council Minutes", "Active", "21-Oct-2026", "City Clerk Records", "Priya Shah"],
    ["By-law 2026-118 Zoning Amendment", "Official Record", "Bylaws & Resolutions", "Active", "29-Sep-2026", "City Clerk Records", "Mei Lin"],
    ["Harbourfront Seawall Inspection", "Official Record", "Capital Project Files", "Active", "08-Oct-2026", "Engineering & Public Works", "Arjun Mehta"],
    ["Harbourfront Marina Operator Lease", "Official Record", "Contracts & Agreements", "Active", "03-Sep-2026", "Legal Services", "Sarah Novak"],
    ["Harbourfront Festival Event Permit", "Official Record", "Licensing & Permits", "Inactive", "12-Aug-2026", "By-law & Licensing", "Grace Thompson"],
    ["Harbourfront Parking Study v3", "Working Record", "Planning Studies", "Active", "30-Oct-2026", "Planning & Development", "Daniel Okafor"],
    ["Harbourfront Consultation Notes", "Non Record", "Planning Studies", "Active", "02-Nov-2026", "Planning & Development", "Daniel Okafor"],
  ];
  return (
    <ScreenCanvas id="records-search">
      <OrgShell active="rag" adminOpen={false}>
        <PageHeader
          back
          title="Search"
          subtitle="8 results found"
          actions={
            <Btn variant="outline">
              Action <ChevronDown className="size-3.5" />
            </Btn>
          }
        />
        <div className="mt-4 flex gap-2">
          {["Simple", "Advanced", "Query", "AI"].map((t, i) => (
            <span key={t} className={cn("flex h-8 items-center rounded-md px-2.5 text-[12.5px] font-medium", i === 0 ? "bg-[#18181b] text-white" : "border border-[#e4e4e7] bg-white")}>
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[12.5px] font-medium">Search records</p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="flex h-8 flex-1 items-center gap-2 rounded-md bg-[#f4f4f5] px-2.5 text-[12.5px]">
            <Search className="size-3.5 text-[#71717a]" strokeWidth={1.75} />
            harbourfront
          </span>
          <Btn>Search</Btn>
          <Btn variant="ghost">Clear</Btn>
        </div>
        <label className="mt-3 flex items-center gap-2 text-[12.5px]">
          <Checkbox />
          Include requests
        </label>
        <div className="mt-2 flex justify-end">
          <ColumnsButton />
        </div>
        <DataTable
          className="mt-3"
          checkbox={false}
          rowHeight={40}
          columns={[
            { label: "Document Name", width: "2.1fr" },
            { label: "Record Type", width: "0.95fr" },
            { label: "Record Series", width: "1.4fr" },
            { label: "Status", width: "0.6fr" },
            { label: "Created Date", width: "0.85fr" },
            { label: "Workspace", width: "1.3fr" },
            { label: "Created By", width: "0.9fr" },
          ]}
          rows={rows.map(([name, type, series, status, date, ws, by]) => [
            <span key="n" className="flex min-w-0 items-center gap-2 font-medium">
              <FileText className="size-3.5 shrink-0 text-[#71717a]" strokeWidth={1.75} />
              <span className="truncate">{name}</span>
            </span>,
            <span key="t" className="text-[#3f3f46]">{type}</span>,
            <span key="s" className="text-[#3f3f46]">{series}</span>,
            <span key="st" className="text-[#3f3f46]">{status}</span>,
            <span key="d" className="text-[#3f3f46]">{date}</span>,
            <span key="w" className="text-[#3f3f46]">{ws}</span>,
            <span key="b" className="text-[#3f3f46]">{by}</span>,
          ])}
          footer={<TableFooter summary="8 row(s)" page="Page 1 of 1" rowsPerPage={20} />}
        />
      </OrgShell>
    </ScreenCanvas>
  );
}

export const recordsScreens: Record<string, () => ReactNode> = {
  "records-retention": RetentionSchedule,
  "records-dashboard": RecordsDashboard,
  "records-lifecycle": RecordsLifecycle,
  "records-files": RecordsFiles,
  "records-series": RecordSeries,
  "records-boxes": RecordsBoxes,
  "records-search": RecordsSearch,
};
