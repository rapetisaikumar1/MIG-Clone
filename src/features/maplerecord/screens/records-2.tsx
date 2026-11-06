import type { ReactNode } from "react";
import {
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock,
  Columns3,
  Download,
  FileCheck2,
  FileText,
  FolderOpen,
  FolderOutput,
  GripVertical,
  ListFilter,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, Btn, Checkbox, ColumnsButton, DataTable, PageHeader, ScreenCanvas, SearchInput, Segmented, Select, TableFooter, type Icon, type Tone } from "./kit";
import { OrgShell } from "./records-shell";

/*
 * MR Records screens, second set: Destruction Register, Audit Trail, Templates & Metadata,
 * Blockchain Verification and Requests & Approvals. Layout mirrors the real product; all sample
 * content is fictional (City of Harbourview).
 */

/* ---------- Local helpers ---------- */

/** Light gray secondary button (Search / Export CSV / Export PDF on the destruction register). */
function SoftBtn({ children, icon: IconC }: { children: ReactNode; icon?: Icon }) {
  return (
    <span className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md bg-[#f4f4f5] px-3 text-[12.5px] font-medium text-[#18181b]">
      {IconC ? <IconC className="size-3.5" strokeWidth={1.75} /> : null}
      {children}
    </span>
  );
}

/** Small outlined pill (field types, required flags). */
function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center whitespace-nowrap rounded-md border border-[#e4e4e7] bg-white px-1.5 py-[1px] text-[11px] font-medium text-[#18181b]", className)}>{children}</span>;
}

/* ---------- Destruction Register ---------- */

function DestructionRegister() {
  type Row = { cert: string; executed: string; title: string; medium: "Physical" | "Digital"; series: string; method: string; approved: string; executedBy: string; cert3?: boolean };
  const rows: Row[] = [
    { cert: "MR-BOX-FIN-0042-05Nov2026-D338", executed: "Nov 5, 2026, 10:42 AM", title: "AP Invoices 2017", medium: "Physical", series: "Accounts Payable", method: "Shred", approved: "Grace Thompson", executedBy: "Daniel Okafor", cert3: true },
    { cert: "MR-BOX-FIN-0041-05Nov2026-D337", executed: "Nov 5, 2026, 10:38 AM", title: "AP Invoices 2016", medium: "Physical", series: "Accounts Payable", method: "Shred", approved: "Grace Thompson", executedBy: "Daniel Okafor", cert3: true },
    { cert: "MR-NR-04Nov2026-D336", executed: "Nov 4, 2026, 03:15 PM", title: "Clerk II Shortlist", medium: "Digital", series: "Recruitment", method: "Purge", approved: "Sarah Novak", executedBy: "Mei Lin" },
    { cert: "MR-NR-04Nov2026-D335", executed: "Nov 4, 2026, 03:12 PM", title: "By-law Shortlist", medium: "Digital", series: "Recruitment", method: "Purge", approved: "Sarah Novak", executedBy: "Mei Lin" },
    { cert: "MR-BOX-HR-0007-30Oct2026-D334", executed: "Oct 30, 2026, 11:05 AM", title: "Leave Forms 2018", medium: "Physical", series: "Leave Records", method: "Dispose", approved: "Grace Thompson", executedBy: "Arjun Mehta", cert3: true },
    { cert: "MR-NR-29Oct2026-D333", executed: "Oct 29, 2026, 09:47 AM", title: "AR-2023-118 File", medium: "Digital", series: "Access Requests", method: "Purge", approved: "Priya Shah", executedBy: "Mei Lin" },
    { cert: "MR-NR-29Oct2026-D332", executed: "Oct 29, 2026, 09:44 AM", title: "AR-2023-104 File", medium: "Digital", series: "Access Requests", method: "Purge", approved: "Priya Shah", executedBy: "Mei Lin" },
    { cert: "MR-BOX-CLK-0013-22Oct2026-D331", executed: "Oct 22, 2026, 02:30 PM", title: "Mail Log 2019", medium: "Physical", series: "Correspondence", method: "Dispose", approved: "Grace Thompson", executedBy: "Daniel Okafor", cert3: true },
    { cert: "MR-BOX-PW-0021-15Oct2026-D330", executed: "Oct 15, 2026, 01:18 PM", title: "Road Repairs 2016", medium: "Physical", series: "Work Orders", method: "Shred", approved: "Grace Thompson", executedBy: "Arjun Mehta", cert3: true },
    { cert: "MR-NR-08Oct2026-D329", executed: "Oct 8, 2026, 04:02 PM", title: "Bookings 2022", medium: "Digital", series: "Facility Bookings", method: "Purge", approved: "Sarah Novak", executedBy: "Mei Lin" },
    { cert: "MR-BOX-FIN-0009-01Oct2026-D328", executed: "Oct 1, 2026, 10:20 AM", title: "Payroll 2017", medium: "Physical", series: "Payroll Registers", method: "Shred", approved: "Grace Thompson", executedBy: "Daniel Okafor", cert3: true },
  ];
  return (
    <ScreenCanvas id="records-destruction">
      <OrgShell active="destruction">
        <PageHeader title="Destruction Register" subtitle="Authorised destructions of digital and physical records. Exportable evidence for ISO 15489 disposition." />
        <div className="mt-5 flex items-center gap-2">
          <span className="flex h-8 w-[300px] items-center rounded-md bg-[#f4f4f5] px-2.5 text-[12px] text-[#71717a]">Search certificate, title, accession, series…</span>
          <Select value="All media" width={106} />
          <SoftBtn>Search</SoftBtn>
          <span className="ml-auto flex gap-2">
            <SoftBtn icon={FileText}>Export CSV</SoftBtn>
            <SoftBtn icon={FileText}>Export PDF</SoftBtn>
          </span>
        </div>
        <DataTable
          className="mt-3"
          checkbox={false}
          rowHeight={40}
          columns={[
            { label: "Certificate", width: 222 },
            { label: "Executed", width: 138 },
            { label: "Title", width: "1fr" },
            { label: "Medium", width: 68 },
            { label: "Series", width: 108 },
            { label: "Method", width: 60 },
            { label: "Approved by", width: 104 },
            { label: "Executed by", width: 92 },
            { label: "", width: 70 },
          ]}
          rows={rows.map((r) => [
            <span key="c" className="text-[11px] font-medium">{r.cert}</span>,
            <span key="e" className="text-[11px] text-[#3f3f46]">{r.executed}</span>,
            <span key="t" className="text-[11.5px]">{r.title}</span>,
            <Badge key="m">{r.medium}</Badge>,
            <span key="s" className="text-[11.5px] text-[#3f3f46]">{r.series}</span>,
            <span key="me" className="text-[11.5px] text-[#3f3f46]">{r.method}</span>,
            <span key="a" className="text-[11.5px] text-[#3f3f46]">{r.approved}</span>,
            <span key="x" className="text-[11.5px] text-[#3f3f46]">{r.executedBy}</span>,
            <span key="i" className="flex items-center gap-2.5 text-[#27272a]">
              <Download className="size-3.5 shrink-0" strokeWidth={1.9} />
              <Upload className="size-3.5 shrink-0" strokeWidth={1.9} />
              {r.cert3 ? <FileText className="size-3.5 shrink-0" strokeWidth={1.9} /> : null}
            </span>,
          ])}
        />
        <div className="mt-2.5 flex items-center justify-between text-[12px]">
          <span className="text-[#52525b]">11 entries</span>
          <span className="flex items-center gap-1.5">
            <span className="rounded-md bg-[#f4f4f5] px-2.5 py-1.5 text-[#a1a1aa]">Previous</span>
            <span className="px-1.5 text-[#3f3f46]">Page 1 of 1</span>
            <span className="rounded-md bg-[#f4f4f5] px-2.5 py-1.5 text-[#a1a1aa]">Next</span>
          </span>
        </div>
      </OrgShell>
    </ScreenCanvas>
  );
}

/* ---------- Audit Trail ---------- */

function AuditTrail() {
  const cols: { label: string; w: number }[] = [
    { label: "Timestamp (UTC)", w: 128 },
    { label: "Session ID", w: 72 },
    { label: "IP Address", w: 80 },
    { label: "Device", w: 94 },
    { label: "OS", w: 80 },
    { label: "Browser", w: 86 },
    { label: "User", w: 94 },
    { label: "User Email", w: 80 },
    { label: "Action ID", w: 80 },
    { label: "Action Type", w: 100 },
    { label: "Action Source", w: 96 },
    { label: "Source Name", w: 130 },
  ];
  // [time, session, ip, device, os, browser, user, actionId, type, source, sourceName]
  const rows: string[][] = [
    ["11/5/2026, 4:57:52 PM", "s-7f3a9c", "10.20.4.118", "Desktop/Laptop", "macOS 15.6", "Chrome 156.0", "Priya Shah", "ACT-001296", "ConfigUpdate", "global", "Retention Schedule"],
    ["11/5/2026, 4:41:09 PM", "s-7f3a9c", "10.20.4.118", "Desktop/Laptop", "macOS 15.6", "Chrome 156.0", "Priya Shah", "ACT-001295", "Approve", "workspace", "City Clerk Records"],
    ["11/5/2026, 3:26:44 PM", "s-2b81e0", "10.20.7.42", "Desktop/Laptop", "Windows 11", "Edge 155.0", "Daniel Okafor", "ACT-001294", "Transferred", "workspace", "Finance & Treasury"],
    ["11/5/2026, 3:25:58 PM", "s-2b81e0", "10.20.7.42", "Desktop/Laptop", "Windows 11", "Edge 155.0", "Daniel Okafor", "ACT-001293", "Assign", "workspace", "Finance & Treasury"],
    ["11/5/2026, 2:12:31 PM", "s-c49d17", "10.20.9.205", "Tablet", "iPadOS 19.1", "Safari 19.1", "Arjun Mehta", "ACT-001292", "BoxScan", "workspace", "Public Works"],
    ["11/5/2026, 11:48:03 AM", "s-91e6aa", "10.20.3.17", "Desktop/Laptop", "Windows 11", "Chrome 156.0", "Mei Lin", "ACT-001291", "Add", "workspace", "Human Resources"],
    ["11/5/2026, 11:47:40 AM", "s-91e6aa", "10.20.3.17", "Desktop/Laptop", "Windows 11", "Chrome 156.0", "Mei Lin", "ACT-001290", "MetadataUpdate", "workspace", "Human Resources"],
    ["11/5/2026, 10:42:16 AM", "s-5d0b3e", "10.20.7.42", "Desktop/Laptop", "Windows 11", "Edge 155.0", "Daniel Okafor", "ACT-001289", "Destroyed", "workspace", "Finance & Treasury"],
    ["11/5/2026, 9:30:27 AM", "s-e17c58", "10.20.5.91", "Desktop/Laptop", "macOS 15.6", "Safari 19.1", "Sarah Novak", "ACT-001288", "TransferApproved", "workspace", "Legal Services"],
    ["11/5/2026, 9:02:11 AM", "s-e17c58", "10.20.5.91", "Desktop/Laptop", "macOS 15.6", "Safari 19.1", "Sarah Novak", "ACT-001287", "Login", "global", "City of Harbourview"],
  ];
  const template = `36px 30px ${cols.map((c) => `${c.w}px`).join(" ")}`;
  return (
    <ScreenCanvas id="records-audit">
      <OrgShell active="audit">
        <PageHeader title="Audit Trail" subtitle="Comprehensive logging of all system activities" />
        <Segmented className="mt-3" items={["Active Logs", "Archived Logs"]} />
        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-8 flex-1 items-center gap-2 rounded-md bg-[#f4f4f5] px-2.5 text-[12px] text-[#71717a]">
            <Search className="size-3.5" strokeWidth={1.75} />
            Filter Logs
          </span>
          <Btn>Print</Btn>
        </div>
        <div className="mt-3 flex justify-end">
          <ColumnsButton />
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white">
          <div className="overflow-hidden">
            <div className="grid h-10 w-max items-center border-b border-[#e4e4e7] px-3 text-[11.5px] font-medium text-[#3f3f46]" style={{ gridTemplateColumns: template }}>
              <Checkbox />
              <span />
              {cols.map((c) => (
                <span key={c.label} className="flex items-center gap-1 whitespace-nowrap pr-3">
                  {c.label}
                  <ChevronDown className="size-3 text-[#a1a1aa]" />
                </span>
              ))}
            </div>
            {rows.map((r) => (
              <div key={r[7]} className="grid h-[38px] w-max items-center border-b border-[#f0f0f1] px-3 text-[11.5px]" style={{ gridTemplateColumns: template }}>
                <Checkbox />
                <ChevronRight className="size-3.5 text-[#71717a]" />
                <span className="whitespace-nowrap pr-3">{r[0]}</span>
                <span className="font-mono text-[11px] text-[#52525b]">{r[1]}</span>
                <span className="text-[11.5px] text-[#52525b]">{r[2]}</span>
                <span className="whitespace-nowrap">{r[3]}</span>
                <span className="whitespace-nowrap">{r[4]}</span>
                <span className="whitespace-nowrap">{r[5]}</span>
                <span className="whitespace-nowrap">{r[6]}</span>
                <span className="pr-3">
                  <span className="block h-[22px] rounded-sm bg-[linear-gradient(90deg,#ececee,#f6f6f7,#ececee)] blur-[0.6px]" />
                </span>
                <span>{r[7]}</span>
                <span className="whitespace-nowrap">{r[8]}</span>
                <span>{r[9]}</span>
                <span className="whitespace-nowrap">{r[10]}</span>
              </div>
            ))}
          </div>
          <div className="mx-0 h-[6px] bg-[#fafafa]">
            <div className="h-full w-[82%] rounded-full bg-[#d4d4d8]" />
          </div>
          <TableFooter summary="0 of 296 row(s) selected." page="Page 1 of 30" />
        </div>
      </OrgShell>
    </ScreenCanvas>
  );
}

/* ---------- Templates & Metadata ---------- */

function TemplatesMetadata() {
  const globals: [string, number][] = [
    ["General Document Capture", 10],
    ["Correspondence Pack", 11],
    ["Council & Committee Pack", 11],
    ["Physical Box Index Card", 12],
  ];
  const series: [string, number][] = [
    ["Council Minutes Metadata", 12],
    ["By-law & Resolution Metadata", 11],
    ["Contract Execution Metadata", 13],
    ["Accounts Payable Invoice Pack", 14],
    ["Building Permit Metadata", 12],
    ["Personnel File Metadata", 12],
    ["Access Request Case Metadata", 13],
    ["Communications Metadata", 11],
    ["Work Order Metadata", 10],
  ];
  const fields: [string, string, boolean, string][] = [
    ["Document Title Override", "Text", false, "Shown in search and browse when provided."],
    ["Business Owner", "Text", true, "Department accountable for the record."],
    ["Owner Email", "Email", false, "N/A"],
    ["Effective Date", "Date & Time", true, "Date the document takes effect."],
    ["Confidentiality Flag", "Single Select", true, "Public, Internal, Confidential or Restricted."],
    ["Keywords", "Multi Select", false, "Drawn from the controlled vocabulary."],
    ["Notes", "Text", false, "N/A"],
    ["Source System", "Single Select", false, "System of origin for imported records."],
    ["Retention Review Required", "Boolean", false, "Set true when a retention officer must review before disposition."],
    ["Page Count Estimate", "Number", false, "N/A"],
  ];
  const listRow = ([name, n]: [string, number], active = false) => (
    <div key={name} className={cn("flex h-[26px] items-center justify-between rounded-md px-2 text-[12.5px]", active ? "bg-[#f0f0f1] font-medium text-[#18181b]" : "text-[#52525b]")}>
      <span className="truncate">{name}</span>
      <span className="rounded-md border border-[#e4e4e7] bg-white px-1 text-[10px] text-[#3f3f46]">{n}</span>
    </div>
  );
  return (
    <ScreenCanvas id="records-templates">
      <OrgShell active="templates">
        <PageHeader
          title="Templates & Metadata"
          subtitle="Manage document templates and custom metadata fields"
          actions={
            <>
              <Btn variant="outline">Export</Btn>
              <Btn icon={Plus}>Add Template</Btn>
            </>
          }
        />
        <Segmented className="mt-4" items={["Templates", "Activity"]} />
        <div className="mt-3 flex gap-0">
          <div className="w-[232px] shrink-0 border-r border-[#e4e4e7] pr-2.5" style={{ height: 600 }}>
            <SearchInput placeholder="Search templates…" width={222} />
            <p className="mt-3 px-2 text-[11px] text-[#71717a]">Global Templates</p>
            <div className="mt-1 space-y-0.5">{globals.map((g, i) => listRow(g, i === 0))}</div>
            <div className="my-2.5 h-px bg-[#e4e4e7]" />
            <p className="px-2 text-[11px] text-[#71717a]">Record Series Templates</p>
            <div className="mt-1 space-y-0.5">{series.map((s) => listRow(s))}</div>
          </div>
          <div className="min-w-0 flex-1 pl-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[16px] font-semibold leading-tight">General Document Capture</h2>
                <p className="mt-1 text-[12px] text-[#71717a]">Global Template</p>
              </div>
              <Btn icon={Plus}>Add Metadata Field</Btn>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <SearchInput placeholder="Search metadata fields…" width={214} />
              <Btn variant="outline" icon={Columns3}>Columns</Btn>
            </div>
            <div className="mt-3 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white">
              {(() => {
                const t = "34px 24px 1.45fr 96px 84px 2fr 52px";
                return (
                  <>
                    <div className="grid h-9 items-center border-b border-[#e4e4e7] px-3 text-[12px] font-medium text-[#3f3f46]" style={{ gridTemplateColumns: t }}>
                      <Checkbox />
                      <span />
                      <span className="flex items-center gap-1">Field Name<ChevronDown className="size-3 text-[#a1a1aa]" /></span>
                      <span className="flex items-center gap-1">Field Type<ChevronDown className="size-3 text-[#a1a1aa]" /></span>
                      <span className="flex items-center gap-1">Required<ChevronDown className="size-3 text-[#a1a1aa]" /></span>
                      <span>Help Text</span>
                      <span className="text-right">Actions</span>
                    </div>
                    {fields.map(([name, type, req, help]) => (
                      <div key={name} className="grid h-[35px] items-center border-b border-[#f0f0f1] px-3 text-[12px]" style={{ gridTemplateColumns: t }}>
                        <Checkbox />
                        <GripVertical className="size-3.5 text-[#71717a]" />
                        <span className="truncate pr-3 font-medium">{name}</span>
                        <span><Pill>{type}</Pill></span>
                        <span><Pill className={req ? undefined : "text-[#52525b]"}>{req ? "Required" : "Optional"}</Pill></span>
                        <span className={cn("truncate pr-3 text-[11.5px]", help === "N/A" ? "text-[#52525b]" : "text-[#3f3f46]")}>{help}</span>
                        <MoreVertical className="ml-auto size-3.5 text-[#3f3f46]" />
                      </div>
                    ))}
                    <TableFooter summary="0 of 10 row(s) selected." page="Page 1 of 1" />
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </OrgShell>
    </ScreenCanvas>
  );
}

/* ---------- Blockchain Verification ---------- */

function StatLine({ label, value, className }: { label: string; value: ReactNode; className?: string }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-[#52525b]">{label}</span>
      <span className={cn("font-medium text-[#18181b]", className)}>{value}</span>
    </div>
  );
}

function BlockchainVerification() {
  return (
    <ScreenCanvas id="records-blockchain">
      <OrgShell active="blockchain">
        <PageHeader title="Blockchain Verification" subtitle="Verify audit trail integrity using blockchain technology" />
        <Segmented className="mt-4" items={["Network Status", "Verify Audit", "Chain Integrity", "Verification Report"]} />
        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-[14px] font-medium">Blockchain Network Status</h2>
          <Btn icon={RefreshCw}>Refresh</Btn>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-semibold">Connection Status</h3>
              <Badge tone="green">✓ Connected</Badge>
            </div>
            <div className="mt-3 space-y-2">
              <StatLine label="Network:" value="ethereum" />
              <StatLine label="Nodes:" value="4" />
              <StatLine label="Last Sync:" value="11/5/2026, 4:57:52 PM" />
            </div>
          </div>
          <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
            <h3 className="text-[13px] font-semibold">Blockchain Statistics</h3>
            <div className="mt-3 space-y-2">
              <StatLine label="Total Blocks:" value="1,563,266" />
              <StatLine label="Latest Block:" value="1,563,265" />
            </div>
          </div>
          <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
            <h3 className="text-[13px] font-semibold">Write Statistics</h3>
            <div className="mt-3 space-y-2">
              <StatLine label="Confirmed:" value="296" className="text-[#15803d]" />
              <StatLine label="Pending:" value="0" className="text-[#c2410c]" />
              <StatLine label="Failed:" value="0" className="text-[#dc2626]" />
            </div>
          </div>
        </div>
      </OrgShell>
    </ScreenCanvas>
  );
}

/* ---------- Requests & Approvals ---------- */

type ReqType = "Transfer" | "Official Record" | "Retrieval";
const reqTypeStyle: Record<ReqType, { icon: Icon; cls: string }> = {
  Transfer: { icon: ArrowLeftRight, cls: "border-[#d4d4d8] bg-white text-[#18181b]" },
  "Official Record": { icon: FileCheck2, cls: "border-[#f97316] bg-[#fff7ed] text-[#c2410c]" },
  Retrieval: { icon: FolderOutput, cls: "border-[#fdba74] bg-[#fff7ed] text-[#c2410c]" },
};
const reqStatusTone: Record<string, Tone> = { Completed: "green", Approved: "green", Pending: "amber", Rejected: "red" };

function ReqStat({ label, value, caption, icon: IconC }: { label: string; value: string; caption: string; icon: Icon }) {
  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-white px-3.5 py-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#52525b]">{label}</span>
        <IconC className="size-3.5" strokeWidth={1.9} />
      </div>
      <p className="mt-1.5 text-[20px] font-semibold leading-none">{value}</p>
      <p className="mt-1.5 text-[11px] text-[#71717a]">{caption}</p>
    </div>
  );
}

function RequestsApprovals() {
  // [type, number, requester, workspace, date, status, files, boxes]
  const rows: [ReqType, string, string, string, string, string, number, number][] = [
    ["Transfer", "TR00000247", "Arjun Mehta", "Public Works", "05-Nov-2026", "Pending", 18, 2],
    ["Retrieval", "RV00000246", "Sarah Novak", "Legal Services", "05-Nov-2026", "Pending", 3, 1],
    ["Official Record", "OR00000245", "Priya Shah", "City Clerk Records", "04-Nov-2026", "Approved", 1, 0],
    ["Transfer", "TR00000244", "Daniel Okafor", "Finance & Treasury", "04-Nov-2026", "Completed", 24, 3],
    ["Official Record", "OR00000243", "Mei Lin", "Human Resources", "03-Nov-2026", "Rejected", 2, 0],
    ["Retrieval", "RV00000242", "Grace Thompson", "Planning & Building", "03-Nov-2026", "Completed", 6, 1],
    ["Transfer", "TR00000241", "Priya Shah", "City Clerk Records", "02-Nov-2026", "Completed", 12, 1],
    ["Official Record", "OR00000240", "Daniel Okafor", "Finance & Treasury", "02-Nov-2026", "Approved", 1, 0],
    ["Retrieval", "RV00000239", "Sarah Novak", "Legal Services", "30-Oct-2026", "Completed", 2, 1],
    ["Transfer", "TR00000238", "Mei Lin", "Human Resources", "30-Oct-2026", "Completed", 9, 1],
  ];
  return (
    <ScreenCanvas id="records-requests">
      <OrgShell active="requests" adminOpen={false}>
        <PageHeader title="Requests & Approvals" subtitle="Review and approve requests from all workspaces across the organization." />
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          <div className="[&_svg]:text-[#52525b]"><ReqStat label="Total Requests" value="24" caption="All request types" icon={FolderOpen} /></div>
          <div className="[&_svg]:text-[#ea580c]"><ReqStat label="Pending" value="2" caption="Awaiting approval" icon={Clock} /></div>
          <div className="[&_svg]:text-[#16a34a]"><ReqStat label="Completed" value="21" caption="Approved & completed" icon={CircleCheck} /></div>
          <div className="[&_svg]:text-[#dc2626]"><ReqStat label="Rejected" value="1" caption="Declined requests" icon={CircleX} /></div>
        </div>
        <div className="mt-3.5 flex items-center gap-2">
          <span className="flex h-8 w-[232px] items-center gap-2 whitespace-nowrap rounded-md bg-[#f4f4f5] px-2.5 text-[12px] text-[#71717a]">
            <Search className="size-3.5" strokeWidth={1.75} />
            Search requests by record title…
          </span>
          <Btn variant="outline" icon={ListFilter}>Status</Btn>
          <span className="ml-auto"><ColumnsButton /></span>
        </div>
        <DataTable
          className="mt-3"
          checkbox={false}
          rowHeight={40}
          columns={[
            { label: "Type", sort: true, width: "1.25fr" },
            { label: "Request #", sort: true, width: "1fr" },
            { label: "Requested By", sort: true, width: "1.3fr" },
            { label: "Request Date", sort: true, width: "1.05fr" },
            { label: "Status", sort: true, width: "1fr" },
            { label: "File Count", sort: true, width: "0.75fr", align: "center" },
            { label: "Box Count", sort: true, width: "0.75fr", align: "center" },
            { label: "Actions", width: 56, align: "right" },
          ]}
          rows={rows.map(([type, num, who, ws, date, status, files, boxes]) => {
            const t = reqTypeStyle[type];
            return [
              <span key="t" className={cn("inline-flex items-center gap-1 rounded-full border px-1.5 py-[1px] text-[11px] font-medium", t.cls)}>
                <t.icon className="size-3" strokeWidth={1.9} />
                {type}
              </span>,
              <span key="n" className="font-medium">{num}</span>,
              <span key="w" className="block leading-tight">
                <span className="block text-[12px] font-medium">{who}</span>
                <span className="block text-[10.5px] text-[#71717a]">{ws}</span>
              </span>,
              <span key="d" className="text-[#3f3f46]">{date}</span>,
              <Badge key="s" tone={reqStatusTone[status] ?? "gray"}>{status}</Badge>,
              `${files} ${files === 1 ? "file" : "files"}`,
              `${boxes} ${boxes === 1 ? "box" : "boxes"}`,
              <MoreVertical key="a" className="ml-auto size-3.5 text-[#3f3f46]" />,
            ];
          })}
          footer={<TableFooter summary="24 row(s)" page="Page 1 of 3" />}
        />
      </OrgShell>
    </ScreenCanvas>
  );
}

/** More MR Records screens (second recreation set). */
export const records2Screens: Record<string, () => ReactNode> = {
  "records-destruction": DestructionRegister,
  "records-audit": AuditTrail,
  "records-templates": TemplatesMetadata,
  "records-blockchain": BlockchainVerification,
  "records-requests": RequestsApprovals,
};
