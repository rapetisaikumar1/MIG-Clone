import type { ReactNode } from "react";
import {
  AlarmClock,
  AlignLeft,
  ArrowRight,
  Calendar,
  CalendarClock,
  ChevronDown,
  CircleCheck,
  CircleDot,
  ClipboardList,
  Clock,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FilePen,
  FolderOpen,
  Gauge,
  Hash,
  Inbox,
  LayoutGrid,
  ListChecks,
  Mail,
  MapPin,
  MousePointerClick,
  PanelLeft,
  Phone,
  Plus,
  Receipt,
  Redo2,
  Rocket,
  Scale,
  ScrollText,
  Search,
  Share2,
  Shield,
  ShieldCheck,
  Signature,
  SquareCheck,
  SquareChevronDown,
  Star,
  Trash2,
  Type,
  Undo2,
  Upload,
  UserCheck,
  UserRound,
  Workflow,
  X,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge, Btn, Card, Checkbox, PageHeader, ScreenCanvas, SearchInput, Segmented, Select, StatTile, Toggle, TopBar, type Icon, type Tone } from "./kit";

/*
 * MR Forms screens: form builder, conditional logic, submissions archive, new-form chooser and
 * dashboard. Shell mirrors the real MR Forms app (no center search, sectioned sidebar without a
 * Help footer, engine footer strip pinned to the bottom of the main area). Sample data is fictional.
 */

/* ---------- Shell ---------- */

type FormsNav = "dashboard" | "forms" | "draft" | "submissions" | "roles" | "audit" | "trash";

const navSections: { label: string; items: { key: FormsNav; label: string; icon: Icon }[] }[] = [
  { label: "Overview", items: [{ key: "dashboard", label: "Dashboard", icon: LayoutGrid }] },
  {
    label: "Build",
    items: [
      { key: "forms", label: "Forms", icon: ClipboardList },
      { key: "draft", label: "Draft", icon: FilePen },
    ],
  },
  { label: "Operate", items: [{ key: "submissions", label: "Submissions", icon: Inbox }] },
  {
    label: "Govern",
    items: [
      { key: "roles", label: "Roles", icon: Shield },
      { key: "audit", label: "Audit Trail", icon: ScrollText },
      { key: "trash", label: "Trash", icon: Trash2 },
    ],
  },
];

function FormsSidebar({ active }: { active: FormsNav }) {
  return (
    <aside className="flex w-[232px] shrink-0 flex-col border-r border-[#e4e4e7] bg-[#fafafa]">
      <nav className="flex-1 px-2 py-2">
        {navSections.map((s, i) => (
          <div key={s.label} className={i > 0 ? "mt-3" : undefined}>
            <p className="px-2 pb-1 pt-1 text-[11.5px] text-[#71717a]">{s.label}</p>
            <ul className="space-y-px">
              {s.items.map(({ key, label, icon: IconC }) => (
                <li key={key}>
                  <span className={cn("flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px]", key === active ? "bg-[#f0f0f1] font-medium text-[#18181b]" : "text-[#27272a]")}>
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

function EngineFooter() {
  return (
    <div className="flex h-8 shrink-0 items-center gap-1.5 border-t border-[#e4e4e7] bg-white px-6 text-[11px] text-[#71717a]">
      {/* eslint-disable-next-line @next/next/no-img-element -- static render canvas */}
      <img src="/maplerecord/maplerecord-leaf.svg" alt="" className="h-3 w-auto" />
      <span>
        One shared form engine · two modes · forms saved as versioned JSON schemas · <i>What&apos;s Best for Canada Is Built in Canada</i>
      </span>
    </div>
  );
}

function FormsShell({ active, children, className, panelIcon = true }: { active: FormsNav; children: ReactNode; className?: string; panelIcon?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <TopBar product="MR Forms" search={null} />
      <div className="flex min-h-0 flex-1">
        <FormsSidebar active={active} />
        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className={cn("min-h-0 flex-1 overflow-hidden px-6 pt-3", className)}>
            {panelIcon ? <PanelLeft className="size-4 text-[#3f3f46]" strokeWidth={1.75} /> : null}
            {children}
          </div>
          <EngineFooter />
        </main>
      </div>
    </div>
  );
}

/* ---------- Editor header (Build / Logic / Settings) ---------- */

function IconBtn({ icon: IconC }: { icon: Icon }) {
  return (
    <span className="flex size-6 items-center justify-center rounded-md text-[#3f3f46]">
      <IconC className="size-[15px]" strokeWidth={1.75} />
    </span>
  );
}

function EditorHeader({ tab }: { tab: number }) {
  const small = "h-7 gap-1 px-2 text-[11.5px] [&>svg]:size-3.5";
  return (
    <div className="flex items-center justify-between gap-2 border-b border-[#f0f0f1] pb-2.5">
      <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap">
        <PanelLeft className="size-4 shrink-0 text-[#3f3f46]" strokeWidth={1.75} />
        <span className="mx-1 h-4 w-px bg-[#e4e4e7]" />
        <span className="text-[12px] text-[#71717a]">
          MR Forms › Forms › <span className="font-semibold text-[#18181b]">Public Records Request</span>
        </span>
        <span className="ml-0.5 rounded-full bg-[#18181b] px-1.5 py-[1px] text-[10px] font-medium text-white">FOI · Public</span>
        <span className="rounded-full border border-[#d4d4d8] px-1.5 text-[10px] font-medium text-[#3f3f46]">v3 live</span>
        <span className="text-[11px] text-[#71717a]">✓ Up to date</span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <IconBtn icon={Undo2} />
        <IconBtn icon={Redo2} />
        <div className="mx-0.5 inline-flex rounded-lg bg-[#f4f4f5] p-[3px]">
          {["Build", "Logic (3)", "Settings"].map((t, i) => (
            <span key={t} className={cn("rounded-md px-2 py-[3px] text-[11.5px]", i === tab ? "bg-white font-medium shadow-[0_1px_2px_rgb(0_0_0/0.08)]" : "text-[#52525b]")}>
              {t}
            </span>
          ))}
        </div>
        <Btn variant="outline" icon={Eye} className={small}>Preview</Btn>
        <Btn variant="outline" icon={ExternalLink} className="size-7 justify-center px-0 [&>svg]:size-3.5" />
        <Btn variant="outline" icon={Share2} className={small}>Share</Btn>
        <Btn variant="outline" icon={Download} className="size-7 justify-center px-0 [&>svg]:size-3.5" />
        <Btn icon={Rocket} className={small}>Publish</Btn>
      </div>
    </div>
  );
}

/* ---------- 1. Builder ---------- */

const palette: { group: string; items: [string, Icon][] }[] = [
  {
    group: "Basic",
    items: [
      ["Short Text", Type],
      ["Long Text", AlignLeft],
      ["Full Name", UserRound],
      ["Address", MapPin],
      ["Email", Mail],
      ["Phone", Phone],
      ["Number", Hash],
      ["Date", Calendar],
      ["Time", Clock],
    ],
  },
  {
    group: "Choices",
    items: [
      ["Dropdown", SquareChevronDown],
      ["Single Choice", CircleDot],
      ["Multiple Choice", ListChecks],
      ["Checkbox (agree)", SquareCheck],
      ["Star Rating", Star],
      ["Opinion Scale", Gauge],
    ],
  },
  {
    group: "Special",
    items: [
      ["File Upload", Upload],
      ["Signature", Signature],
      ["Terms & Conditions", FileCheck],
      ["Payment", CreditCard],
      ["Fee breakdown", Receipt],
      ["Spam protection", ShieldCheck],
      ["Appointment", CalendarClock],
    ],
  },
];

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded border border-[#e4e4e7] bg-[#fafafa] px-1.5 py-[0px] font-mono text-[10px] font-normal text-[#52525b]">{children}</span>;
}

function FieldLabel({ label, chip, required = true }: { label: string; chip?: ReactNode; required?: boolean }) {
  return (
    <div className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-semibold">
      <span>
        {label}
        {required ? <span className="ml-0.5 text-[#dc2626]">*</span> : null}
      </span>
      {chip}
    </div>
  );
}

function InputBox({ placeholder, className }: { placeholder?: string; className?: string }) {
  return <div className={cn("flex h-9 items-center rounded-md border border-[#e4e4e7] bg-[#f9f9fa] px-3 text-[12px] text-[#a1a1aa]", className)}>{placeholder}</div>;
}

function Field({ label, map, rules, children, className, required }: { label: string; map?: string; rules?: string; children: ReactNode; className?: string; required?: boolean }) {
  return (
    <div className={cn("rounded-lg px-2 py-2", className)}>
      <FieldLabel
        label={label}
        required={required}
        chip={
          <>
            {map ? <Chip>→ {map}</Chip> : null}
            {rules ? (
              <span className="rounded border border-[#ddd6fe] bg-[#f5f3ff] px-1.5 text-[10px] font-medium text-[#6d28d9]">{rules}</span>
            ) : null}
          </>
        }
      />
      {children}
    </div>
  );
}

function FormsBuilder() {
  return (
    <ScreenCanvas id="forms-builder">
      <FormsShell active="forms" panelIcon={false} className="flex flex-col px-4">
        <EditorHeader tab={0} />
        <div className="mt-3 flex min-h-0 flex-1 gap-2.5">
          {/* Palette */}
          <div className="w-[204px] shrink-0 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white px-2.5 pt-2.5">
            <span className="flex h-8 items-center gap-2 rounded-md border border-[#e4e4e7] px-2.5 text-[12px] text-[#a1a1aa]">
              <Search className="size-3.5" strokeWidth={1.75} />
              Search fields…
            </span>
            {palette.map((g) => (
              <div key={g.group} className="mt-2.5">
                <p className="px-1.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#a1a1aa]">{g.group}</p>
                {g.items.map(([label, IconC]) => (
                  <div key={label} className="flex h-[25px] items-center gap-2 rounded-md px-1.5 text-[12.5px] text-[#27272a]">
                    <IconC className="size-[14px] text-[#52525b]" strokeWidth={1.75} />
                    {label}
                    <Plus className="ml-auto size-3.5 text-[#a1a1aa]" strokeWidth={1.75} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Canvas */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-0.5 whitespace-nowrap">
              <span className="rounded-full bg-[#18181b] px-3 py-1 text-[12px] font-medium text-white">1. About you</span>
              <span className="rounded-full px-3 py-1 text-[12px] text-[#52525b]">2. Your request</span>
              <span className="rounded-full px-3 py-1 text-[12px] text-[#52525b]">3. Review &amp; declarations</span>
              <span className="flex items-center gap-1 rounded-full px-2 py-1 text-[12px] text-[#71717a]">
                <Plus className="size-3.5" /> Add page
              </span>
              <span className="ml-auto flex items-center gap-1.5">
                <span className="flex h-7 w-[96px] items-center rounded-md border border-[#e4e4e7] px-2 text-[12px]">About you</span>
                <span className="flex size-7 items-center justify-center rounded-md text-[#dc2626]">
                  <Trash2 className="size-3.5" strokeWidth={1.75} />
                </span>
              </span>
            </div>
            <div className="mt-2.5 min-h-0 flex-1 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white px-5 pt-5">
              <h2 className="text-[19px] font-semibold tracking-[-0.01em]">Public Records Request</h2>
              <p className="mt-1 max-w-[460px] text-[12.5px] text-[#71717a]">
                Ask the City for copies of public records. You will get a tracking number and the legal response clock starts immediately.
              </p>
              <div className="-mx-2 mt-3 grid grid-cols-2 gap-x-2 gap-y-0.5">
                <Field label="First name" map="first_name">
                  <InputBox />
                </Field>
                <Field label="Last name" map="last_name">
                  <InputBox />
                </Field>
                <Field label="Email" map="email">
                  <InputBox placeholder="name@example.com" />
                </Field>
                <Field label="Request title" map="title">
                  <InputBox />
                </Field>
                <Field label="Description" map="description" className="col-span-2">
                  <InputBox className="h-[68px] items-start pt-2" placeholder="Describe the records you are looking for, including dates and departments if known." />
                </Field>
                <Field label="Subject matter" map="subject_matter">
                  <div className="flex h-9 items-center justify-between rounded-md border border-[#e4e4e7] bg-[#f9f9fa] px-3 text-[12px] text-[#a1a1aa]">
                    Select a subject
                    <ChevronDown className="size-3.5" />
                  </div>
                </Field>
                <Field label="Phone number" rules="1 rule">
                  <div className="flex gap-1.5">
                    <span className="flex h-9 w-[84px] items-center justify-between rounded-md border border-[#e4e4e7] bg-[#f9f9fa] px-2 text-[12px]">
                      🇨🇦 +1
                      <ChevronDown className="size-3.5 text-[#a1a1aa]" />
                    </span>
                    <InputBox className="flex-1" placeholder="XXX XXX XXXX" />
                  </div>
                </Field>
                <Field label="Preferred contact method" rules="1 rule" className="col-span-2">
                  <div className="flex items-center gap-6 pt-0.5 text-[12.5px]">
                    <span className="flex items-center gap-2">
                      <span className="flex size-4 items-center justify-center rounded-full border border-[#18181b]">
                        <span className="size-2 rounded-full bg-[#18181b]" />
                      </span>
                      Email
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="size-4 rounded-full border border-[#d4d4d8]" />
                      Phone
                    </span>
                  </div>
                </Field>
                <Field label="Mailing address" className="col-span-2" required={false}>
                  <InputBox placeholder="Street address, city, province, postal code" />
                </Field>
              </div>
            </div>
          </div>

          {/* Inspector */}
          <div className="w-[210px] shrink-0 rounded-xl border border-[#e4e4e7] bg-white px-4 pt-4">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#f4f4f5]">
              <MousePointerClick className="size-4 text-[#52525b]" strokeWidth={1.75} />
            </span>
            <p className="mt-3 text-[13.5px] font-semibold">No field selected</p>
            <p className="mt-1 text-[12px] leading-[1.5] text-[#71717a]">
              Click any field on the canvas to edit its label, options, validation, mapping, lookups and hidden-data policy here.
            </p>
          </div>
        </div>
      </FormsShell>
    </ScreenCanvas>
  );
}

/* ---------- 2. Logic ---------- */

function RuleCard({
  n,
  summary,
  action,
  target,
  match,
  conditions,
}: {
  n: number;
  summary: ReactNode;
  action: string;
  target: string;
  match: string;
  conditions: [string, string, string][];
}) {
  return (
    <div className="rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[10.5px] font-bold uppercase tracking-[0.08em]">Rule {n}</p>
          <p className="mt-0.5 text-[12px] leading-[1.45] text-[#71717a]">{summary}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Toggle />
          <Btn variant="outline" icon={Copy} className="ml-1.5 h-7 px-2.5 text-[12px]">Duplicate</Btn>
          <Btn variant="danger" icon={Trash2} className="h-7 px-2 text-[12px]">Delete</Btn>
        </div>
      </div>
      <div className="mt-2.5 flex gap-2">
        <Select value={action} width={180} className="h-7" />
        <Select value={target} width={220} className="h-7" />
      </div>
      <div className="mt-2.5 rounded-lg border border-dashed border-[#d4d4d8] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em]">When</span>
          <Select value={match} width={190} className="h-7" />
          <span className="text-[12px] text-[#a1a1aa]">(no conditions = always)</span>
        </div>
        <div className="mt-2 space-y-1.5">
          {conditions.map(([field, op, value]) => (
            <div key={value} className="flex items-center gap-2">
              <Select value={field} width={200} className="h-7" />
              <Select value={op} width={96} className="h-7" />
              <span className="flex h-7 flex-1 items-center rounded-md border border-[#e4e4e7] px-2.5 text-[12px]">{value}</span>
              <span className="flex size-7 items-center justify-center text-[#dc2626]">
                <X className="size-4" strokeWidth={1.75} />
              </span>
            </div>
          ))}
        </div>
        <Btn variant="outline" icon={Plus} className="mt-2 h-7 px-2.5 text-[12px]">Add condition</Btn>
      </div>
    </div>
  );
}

function FormsLogic() {
  return (
    <ScreenCanvas id="forms-logic">
      <FormsShell active="forms" panelIcon={false} className="px-4">
        <EditorHeader tab={1} />
        <div className="mx-auto mt-4 w-[770px]">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[18px] font-semibold tracking-[-0.01em]">Conditional logic</h2>
              <p className="mt-1 text-[12.5px] text-[#71717a]">The form changes itself while the person fills it. Rules run top-to-bottom; when rules clash, the later rule wins.</p>
            </div>
            <Btn icon={Plus}>Add rule</Btn>
          </div>
          <div className="mt-3.5 space-y-3">
            <RuleCard
              n={1}
              summary={<>Show a field — Payment WHEN &quot;Request Type&quot; is &quot;General&quot; OR &quot;Request Type&quot; is &quot;Commercial&quot;</>}
              action="Show a field"
              target="Payment (p.2)"
              match="ANY condition matches"
              conditions={[
                ["Request Type", "is", "General"],
                ["Request Type", "is", "Commercial"],
              ]}
            />
            <RuleCard
              n={2}
              summary={<>Hide a field — Payment WHEN &quot;Request Type&quot; is &quot;Personal information&quot;</>}
              action="Hide a field"
              target="Payment (p.2)"
              match="ALL conditions match"
              conditions={[["Request Type", "is", "Personal information"]]}
            />
            <RuleCard
              n={3}
              summary={<>Require a field — Phone number WHEN &quot;Preferred contact method&quot; is &quot;Phone&quot;</>}
              action="Require a field"
              target="Phone number (p.1)"
              match="ALL conditions match"
              conditions={[["Preferred contact method", "is", "Phone"]]}
            />
          </div>
        </div>
      </FormsShell>
    </ScreenCanvas>
  );
}

/* ---------- 3. Submissions ---------- */

const statusTone: Record<string, Tone> = { Received: "gray", "In progress": "amber", Approved: "green", "Pending approval": "violet" };

function ModePill({ mode }: { mode: "public" | "internal" }) {
  return mode === "public" ? (
    <span className="rounded-full bg-[#18181b] px-2 py-[1px] text-[11px] font-medium text-white">public</span>
  ) : (
    <span className="rounded-full border border-[#d4d4d8] px-2 py-[0px] text-[11px] font-medium text-[#3f3f46]">internal</span>
  );
}

function FormsSubmissions() {
  const rows: [string, string, string, "public" | "internal", string, string, string, string, boolean?][] = [
    ["REQ-2026-0042", "Public Records Request", "v3", "public", "Received", "Nov 5, 2026, 4:12 PM", "City Clerk Team", "Dec 7, 2026"],
    ["TRK-0012", "Seasonal Staff Onboarding", "v2", "internal", "Pending approval", "Nov 5, 2026, 2:47 PM", "Human Resources", "Nov 12, 2026"],
    ["REQ-2026-0041", "Personal Information Request", "v2", "public", "Received", "Nov 5, 2026, 11:08 AM", "Privacy Office", "Dec 7, 2026"],
    ["TRK-0011", "Building Inspection Report", "v4", "internal", "Approved", "Nov 4, 2026, 3:30 PM", "Facilities", "Nov 11, 2026"],
    ["REQ-2026-0040", "Event Permit Application", "v1", "public", "In progress", "Nov 4, 2026, 9:52 AM", "City Clerk Team", "Nov 18, 2026"],
    ["REQ-2026-0039", "Public Records Request", "v3", "public", "In progress", "Nov 3, 2026, 1:15 PM", "City Clerk Team", "Dec 3, 2026"],
    ["TRK-0010", "Seasonal Staff Onboarding", "v2", "internal", "Approved", "Nov 2, 2026, 10:40 AM", "Human Resources", "Nov 9, 2026"],
    ["REQ-2026-0038", "Personal Information Request", "v2", "public", "Pending approval", "Oct 30, 2026, 3:05 PM", "Privacy Office", "Nov 30, 2026"],
    ["REQ-2026-0037", "Public Records Request", "v3", "public", "Approved", "Oct 28, 2026, 9:21 AM", "City Clerk Team", "Nov 27, 2026"],
    ["REQ-2026-0031", "Event Permit Application", "v1", "public", "In progress", "Oct 23, 2026, 8:55 AM", "City Clerk Team", "Nov 5, 2026", true],
  ];
  const template = "32px 128px 1.55fr 78px 130px 1.15fr 1fr 104px";
  return (
    <ScreenCanvas id="forms-submissions">
      <FormsShell active="submissions">
        <PageHeader title="Submissions" subtitle="Every filled form, FOIA and RMS, in one archive. Never a monthly cap." actions={<Btn variant="outline" icon={Download}>Export CSV</Btn>} />
        <div className="mt-4 grid grid-cols-4 gap-3">
          <StatTile upper label="Open" value="12" icon={Inbox} />
          <StatTile upper label="Pending approval" value="3" icon={UserCheck} />
          <StatTile upper label="Overdue" value="1" icon={AlarmClock} valueClass="text-[#dc2626]" />
          <StatTile upper label="Completed / Approved" value="38" icon={CircleCheck} />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Segmented items={["All (54)", "Needs action (15)", "Closed (39)"]} />
          <SearchInput placeholder="Search tracking #, form, person…" width={232} />
          <Select value="All modes" />
          <Select value="All statuses" />
          <Select value="All forms" />
          <div className="ml-auto inline-flex overflow-hidden rounded-md border border-[#e4e4e7] text-[12px]">
            <span className="bg-[#18181b] px-2.5 py-[6px] font-medium text-white">Table</span>
            <span className="px-2.5 py-[6px] text-[#52525b]">Inbox</span>
          </div>
        </div>
        <div className="mt-3 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white">
          <div className="grid h-10 items-center border-b border-[#e4e4e7] px-3 text-[12px] font-medium text-[#3f3f46]" style={{ gridTemplateColumns: template }}>
            <Checkbox />
            {["Tracking #", "Form", "Mode", "Status", "Submitted", "Routed to", "Deadline"].map((h) => (
              <span key={h} className="pr-3">{h}</span>
            ))}
          </div>
          {rows.map(([id, form, ver, mode, status, at, team, due, overdue]) => (
            <div key={id} className="grid h-[39px] items-center border-b border-[#f0f0f1] px-3 text-[12.5px]" style={{ gridTemplateColumns: template }}>
              <Checkbox />
              <span className="pr-3 font-semibold">{id}</span>
              <span className="truncate pr-3">
                {form} <span className="text-[#a1a1aa]">{ver}</span>
              </span>
              <span>
                <ModePill mode={mode} />
              </span>
              <span>
                <Badge tone={statusTone[status]}>{status}</Badge>
              </span>
              <span className="truncate pr-3 text-[#52525b]">{at}</span>
              <span className="truncate pr-3">{team}</span>
              <span className={cn(overdue ? "font-medium text-[#dc2626]" : "text-[#3f3f46]")}>{due}</span>
            </div>
          ))}
          <div className="flex h-11 items-center justify-between px-4 text-[12px] text-[#52525b]">
            <span>54 result(s) · page 1 of 6</span>
            <span className="flex gap-2">
              <Btn variant="outline" className="h-7 px-2.5 text-[12px] text-[#a1a1aa]">Previous</Btn>
              <Btn variant="outline" className="h-7 px-2.5 text-[12px]">Next</Btn>
            </span>
          </div>
        </div>
      </FormsShell>
    </ScreenCanvas>
  );
}

/* ---------- 4. Chooser ---------- */

function FormsChooser() {
  const cards: { icon: Icon; title: string; desc: string; bullets: string[] }[] = [
    {
      icon: FolderOpen,
      title: "Records",
      desc: "Collect or file information in Maple Records.",
      bullets: ["Incident and inspection templates", "File uploads can go to a Records folder", "Staff or public fill"],
    },
    {
      icon: Scale,
      title: "FOI",
      desc: "Take in freedom-of-information requests, appeals, and complaints.",
      bullets: ["Starts with first name, last name, email, title, description, and subject matter", "Those FOI codes stay fixed so the request can be created", "Fields can be moved"],
    },
    {
      icon: Workflow,
      title: "Workflow",
      desc: "Collect answers as part of a Maple Workflow.",
      bullets: ["Staff request templates", "Fits a step people complete in a process", "Submissions stay with the form"],
    },
  ];
  return (
    <ScreenCanvas id="forms-chooser">
      <FormsShell active="forms">
        <div className="mx-auto mt-[90px] w-[900px] text-center">
          <h1 className="text-[32px] font-bold tracking-[-0.02em]">What is this form for?</h1>
          <p className="mt-2 text-[14px] text-[#71717a]">Choose the Maple product this form belongs to. Templates and a blank form come next.</p>
        </div>
        <div className="mx-auto mt-10 grid w-[900px] grid-cols-3 gap-5">
          {cards.map(({ icon: IconC, title, desc, bullets }) => (
            <div key={title} className="flex h-[392px] flex-col rounded-2xl border-2 border-[#18181b] bg-white p-6">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#f4f4f5]">
                <IconC className="size-[22px] text-[#27272a]" strokeWidth={1.75} />
              </span>
              <h2 className="mt-5 text-[19px] font-semibold tracking-[-0.01em]">{title}</h2>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-[#3f3f46]">{desc}</p>
              <div className="mt-4 space-y-2">
                {bullets.map((b) => (
                  <p key={b} className="text-[12.5px] leading-[1.5] text-[#71717a]">{b}</p>
                ))}
              </div>
              <span className="mt-auto flex items-center gap-1.5 text-[13.5px] font-semibold">
                Continue <ArrowRight className="size-4" strokeWidth={2} />
              </span>
            </div>
          ))}
        </div>
      </FormsShell>
    </ScreenCanvas>
  );
}

/* ---------- 5. Dashboard ---------- */

function KpiCard({ label, value, caption, icon: IconC, valueClass }: { label: string; value: string; caption: string; icon: Icon; valueClass?: string }) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-[#e4e4e7] bg-white px-4 py-3.5">
      <div>
        <p className="text-[10.5px] font-medium uppercase tracking-[0.04em] text-[#71717a]">{label}</p>
        <p className={cn("mt-1.5 text-[26px] font-semibold leading-none tracking-[-0.02em]", valueClass)}>{value}</p>
        <p className="mt-2 text-[11.5px] text-[#71717a]">{caption}</p>
      </div>
      <span className="flex size-9 items-center justify-center rounded-lg bg-[#f4f4f5] text-[#3f3f46]">
        <IconC className="size-4" strokeWidth={1.75} />
      </span>
    </div>
  );
}

function FormsDashboard() {
  const days: [string, number][] = [
    ["Oct 23", 5],
    ["Oct 24", 1],
    ["Oct 25", 0],
    ["Oct 26", 6],
    ["Oct 27", 4],
    ["Oct 28", 7],
    ["Oct 29", 5],
    ["Oct 30", 4],
    ["Oct 31", 1],
    ["Nov 1", 0],
    ["Nov 2", 6],
    ["Nov 3", 5],
    ["Nov 4", 3],
    ["Nov 5", 7],
  ];
  const chartH = 168;
  const status: [string, number][] = [
    ["Received", 5],
    ["In progress", 7],
    ["Pending approval", 3],
    ["Approved", 38],
    ["Rejected", 1],
  ];
  const perf: [string, number, number][] = [
    ["Public Records Request", 128, 23],
    ["Personal Information Request", 64, 11],
    ["Event Permit Application", 92, 9],
    ["Seasonal Staff Onboarding", 21, 6],
    ["Building Inspection Report", 17, 5],
  ];
  return (
    <ScreenCanvas id="forms-dashboard">
      <FormsShell active="dashboard">
        <PageHeader
          title="Dashboard"
          subtitle="Everything moving through the form engine, at a glance."
          actions={
            <>
              <Btn variant="outline" icon={Inbox}>Open submissions</Btn>
              <Btn icon={Plus}>Build a form</Btn>
            </>
          }
        />
        <div className="mt-4 grid grid-cols-4 gap-3">
          <KpiCard label="Published forms" value="14" caption="21 total, 7 draft" icon={ClipboardList} />
          <KpiCard label="Open requests" value="12" caption="Received or in progress" icon={Inbox} />
          <KpiCard label="Pending approval" value="3" caption="Supervisor queue" icon={UserCheck} />
          <KpiCard label="Overdue" value="1" caption="Past statutory deadline" icon={AlarmClock} valueClass="text-[#dc2626]" />
        </div>
        <div className="mt-3 grid grid-cols-[1fr_300px] gap-3">
          <Card className="px-5 pb-4 pt-4">
            <h3 className="text-[13.5px] font-semibold">Submissions — last 14 days</h3>
            <p className="mt-0.5 text-[12px] text-[#71717a]">54 submission(s).</p>
            <div className="mt-4 flex gap-2">
              <div className="relative w-4 text-right text-[10.5px] text-[#a1a1aa]" style={{ height: chartH }}>
                {[8, 6, 4, 2, 0].map((v) => (
                  <span key={v} className="absolute right-0 -translate-y-1/2" style={{ top: chartH - (v / 8) * chartH }}>
                    {v}
                  </span>
                ))}
              </div>
              <div className="flex-1">
                <div className="relative" style={{ height: chartH }}>
                  {[8, 6, 4, 2, 0].map((v) => (
                    <span key={v} className={cn("absolute inset-x-0 border-t", v === 0 ? "border-[#d4d4d8]" : "border-dashed border-[#ececee]")} style={{ top: chartH - (v / 8) * chartH }} />
                  ))}
                  <div className="absolute inset-0 flex items-end justify-around px-1">
                    {days.map(([d, v]) => (
                      <span key={d} className="w-[26px] rounded-t-[3px] bg-[#3f3f46]" style={{ height: (v / 8) * chartH }} />
                    ))}
                  </div>
                </div>
                <div className="mt-1.5 flex justify-around px-1 text-[10px] text-[#a1a1aa]">
                  {days.map(([d]) => (
                    <span key={d} className="w-[26px] whitespace-nowrap text-center">{d.replace(" ", " ")}</span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card className="px-5 pb-4 pt-4">
            <h3 className="text-[13.5px] font-semibold">By status</h3>
            <p className="mt-0.5 text-[12px] text-[#71717a]">54 total submissions</p>
            <div className="mt-4 space-y-3.5">
              {status.map(([label, v]) => (
                <div key={label}>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-[#3f3f46]">{label}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-[#f4f4f5]">
                    <div className="h-full rounded-full bg-[#3f3f46]" style={{ width: `${Math.max((v / 54) * 100, 2)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="mt-3 px-5 pt-4">
          <h3 className="text-[13.5px] font-semibold">Form performance</h3>
          <p className="mt-0.5 text-[12px] text-[#71717a]">Views, submissions and conversion per published form</p>
          <div className="mt-2">
            {perf.map(([name, views, subs]) => (
              <div key={name} className="flex h-10 items-center justify-between border-b border-[#f0f0f1] text-[12.5px] last:border-b-0">
                <span className="font-semibold">{name}</span>
                <span className="text-[#52525b]">
                  {views} views · {subs} submissions · {Math.round((subs / views) * 100)}% conversion
                </span>
              </div>
            ))}
          </div>
        </Card>
      </FormsShell>
    </ScreenCanvas>
  );
}

export const formsScreens: Record<string, () => ReactNode> = {
  "forms-builder": FormsBuilder,
  "forms-logic": FormsLogic,
  "forms-submissions": FormsSubmissions,
  "forms-chooser": FormsChooser,
  "forms-dashboard": FormsDashboard,
};
