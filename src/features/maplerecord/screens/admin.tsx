import type { ReactNode } from "react";
import {
  Activity,
  Blocks,
  Building2,
  CalendarDays,
  ChevronDown,
  Code2,
  CreditCard,
  HardDrive,
  Image as ImageIcon,
  Info,
  Lock,
  Mail,
  RefreshCw,
  Save,
  Server,
  Settings,
  Shield,
  Tag,
  UserRound,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppFrame, Btn, ScreenCanvas, Segmented, Toggle, TopBar, type Icon } from "./kit";

/*
 * MR Admin screens. Reference: the real MR Admin console (Products, System status, Security,
 * API & Integrations, Backup & Recovery). The MR Admin sidebar has no header block and no
 * Help & Support footer, so it is built locally here instead of using the kit Sidebar.
 */

type AdminNavKey =
  | "users"
  | "products"
  | "roles"
  | "groups"
  | "organizations"
  | "plans"
  | "status"
  | "integrations"
  | "backup"
  | "security"
  | "notifications"
  | "billing"
  | "branding"
  | "settings";

const adminNav: { label: string; items: { key: AdminNavKey; label: string; icon: Icon }[] }[] = [
  { label: "Directory", items: [{ key: "users", label: "Users", icon: Users }] },
  {
    label: "Access",
    items: [
      { key: "products", label: "Products", icon: Blocks },
      { key: "roles", label: "Roles", icon: Shield },
      { key: "groups", label: "Groups", icon: UserRound },
    ],
  },
  {
    label: "Platform",
    items: [
      { key: "organizations", label: "Organizations", icon: Building2 },
      { key: "plans", label: "Plans", icon: Tag },
      { key: "status", label: "System status", icon: Activity },
      { key: "integrations", label: "API & Integrations", icon: Code2 },
      { key: "backup", label: "Backup & Recovery", icon: HardDrive },
      { key: "security", label: "Security", icon: Lock },
      { key: "notifications", label: "Notifications", icon: Mail },
    ],
  },
  { label: "Subscription", items: [{ key: "billing", label: "License & Billing", icon: CreditCard }] },
  {
    label: "Configure",
    items: [
      { key: "branding", label: "Branding", icon: ImageIcon },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  },
];

function AdminSidebar({ active }: { active: AdminNavKey }) {
  return (
    <aside className="flex w-[232px] shrink-0 flex-col border-r border-[#e4e4e7] bg-[#fafafa]">
      <nav className="flex-1 overflow-hidden px-2 py-2">
        {adminNav.map((s, i) => (
          <div key={s.label} className={i > 0 ? "mt-3" : undefined}>
            <p className="px-2 pb-1 pt-1 text-[11.5px] text-[#71717a]">{s.label}</p>
            <ul className="space-y-px">
              {s.items.map(({ key, label, icon: IconC }) => (
                <li key={key}>
                  <span className={cn("flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px]", key === active ? "bg-[#e9e9eb] font-medium text-[#09090b]" : "text-[#3f3f46]")}>
                    <IconC className="size-[15px] shrink-0" strokeWidth={1.75} />
                    <span className="truncate">{label}</span>
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

/** MR Admin shell. `layout` mirrors the real app: centered column for list pages, left column for settings pages. */
function AdminShell({ active, layout, children }: { active: AdminNavKey; layout: "center" | "left"; children: ReactNode }) {
  return (
    <AppFrame topBar={<TopBar product="MR Admin" search={null} />} sidebar={<AdminSidebar active={active} />}>
      <div className={cn("pt-3", layout === "center" ? "mx-auto max-w-[880px]" : "ml-2 max-w-[720px]")}>{children}</div>
    </AppFrame>
  );
}

function Title({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h1 className="text-[22px] font-semibold leading-tight tracking-[-0.01em]">{title}</h1>
        <p className="mt-1 text-[12.5px] text-[#71717a]">{subtitle}</p>
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

function SmallSelect({ value, width = 96 }: { value: string; width?: number }) {
  return (
    <span className="flex h-7 items-center justify-between rounded-md border border-[#e4e4e7] bg-white px-2 text-[12px] shadow-[0_1px_1px_rgb(0_0_0/0.03)]" style={{ width }}>
      {value}
      <ChevronDown className="size-3.5 text-[#71717a]" />
    </span>
  );
}

function SaveFooter({ status, label }: { status: string; label: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#e4e4e7] px-5 py-3">
      <span className="text-[12px] text-[#71717a]">{status}</span>
      <span className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#a1a1aa]/80 px-3 text-[12.5px] font-medium text-white">
        <Save className="size-3.5" strokeWidth={1.9} />
        {label}
      </span>
    </div>
  );
}

function SettingsCard({ title, subtitle, children, footer, titleExtra, icon: IconC }: { title: string; subtitle?: ReactNode; children: ReactNode; footer?: ReactNode; titleExtra?: ReactNode; icon?: Icon }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.03)]">
      <div className="px-5 pb-1 pt-4">
        <h3 className="flex items-center gap-2 text-[14px] font-semibold">
          {IconC ? <IconC className="size-4" strokeWidth={1.75} /> : null}
          {title}
          {titleExtra}
        </h3>
        {subtitle ? <p className="mt-1 text-[12px] text-[#71717a]">{subtitle}</p> : null}
      </div>
      <div className="px-5 pb-4 pt-3">{children}</div>
      {footer}
    </div>
  );
}

/* ---------- 1. Products ---------- */

function Products() {
  const products: [string, string, string][] = [
    ["MR Admin", "admin", "Users, products, licensing and global roles"],
    ["MR Records", "records", "Records management and retention"],
    ["MR Requests", "requests", "Information requests and FOI casework"],
    ["MR Workflows", "workflows", "Workflow automation and approvals"],
    ["MR Forms", "forms", "Form builder and submissions"],
  ];
  const cols = "2.1fr 0.8fr 0.75fr 0.65fr 1.8fr";
  return (
    <ScreenCanvas id="admin-products">
      <AdminShell active="products" layout="center">
        <Title title="Products" subtitle="Enable or disable Maple products, manage licenses, and control access via global roles." />
        <div className="mt-6 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
          <div className="grid h-10 items-center border-b border-[#e4e4e7] bg-[#fafafa] px-5 text-[12px] font-medium text-[#52525b]" style={{ gridTemplateColumns: cols }}>
            <span>Product</span>
            <span>Code</span>
            <span>License</span>
            <span>Enabled</span>
            <span className="text-right">Actions</span>
          </div>
          {products.map(([name, code, desc]) => (
            <div key={code} className="grid h-[66px] items-center border-b border-[#f0f0f1] px-5 last:border-b-0" style={{ gridTemplateColumns: cols }}>
              <span className="min-w-0 pr-4 leading-snug">
                <span className="block text-[13.5px] font-semibold text-[#18181b]">{name}</span>
                <span className="mt-0.5 block truncate text-[12px] text-[#71717a]">{desc}</span>
              </span>
              <span className="font-mono text-[12px] text-[#3f3f46]">{code}</span>
              <span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-[2px] text-[11px] font-medium text-[#15803d]">
                  <span className="size-1.5 rounded-full bg-[#22c55e]" />
                  Active
                </span>
              </span>
              <span className="flex items-center">
                <Toggle />
              </span>
              <span className="flex items-center justify-end gap-3.5">
                <Btn variant="outline" className="h-7 px-2.5 text-[12px]">
                  Add license
                </Btn>
                <span className="text-[12px] font-medium text-[#3f3f46]">Deactivate license</span>
              </span>
            </div>
          ))}
        </div>
      </AdminShell>
    </ScreenCanvas>
  );
}

/* ---------- 2. System status ---------- */

function ServiceCard({ name, desc, latency }: { name: string; desc: string; latency: number }) {
  return (
    <div className="rounded-xl border border-[#bbf7d0] bg-[#f3fcf7] px-3.5 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-[#d1fae5] bg-white text-[#047857]">
            <Server className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="truncate text-[13px] font-semibold text-[#18181b]">{name}</span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#bbf7d0] bg-white px-2 py-[1px] text-[11px] font-medium text-[#15803d]">
          <span className="size-1.5 rounded-full bg-[#22c55e]" />
          Up
        </span>
      </div>
      <p className="mt-1.5 truncate text-[12px] text-[#52525b]">{desc}</p>
      <p className="mt-1.5 flex gap-4 text-[11.5px] text-[#71717a]">
        <span>
          Latency <span className="font-medium text-[#18181b]">{latency} ms</span>
        </span>
        <span>
          HTTP <span className="font-medium text-[#18181b]">200</span>
        </span>
      </p>
    </div>
  );
}

function SystemStatus() {
  const services: [string, string, number][] = [
    ["Admin service", "Users, products and licensing", 12],
    ["Auth service", "Sign-in, 2FA and session tokens", 9],
    ["Records service", "Workspaces, records and retention", 18],
    ["Forms service", "Form schemas and submissions", 14],
    ["Workflow service", "Published workflows and runs", 16],
    ["FOI service", "Freedom of information casework", 13],
    ["Notification service", "Email and in-app notifications", 11],
  ];
  const infra: [string, string, number][] = [
    ["Redis", "Cache and task queue broker", 2],
    ["Blockchain (Ethereum)", "Private node for audit anchoring", 24],
  ];
  return (
    <ScreenCanvas id="admin-status">
      <AdminShell active="status" layout="center">
        <Title
          title="System status"
          subtitle="Health of backend services and the Maple launcher host. Product apps are checked through their launcher routes."
          actions={
            <Btn variant="outline" icon={RefreshCw}>
              Refresh
            </Btn>
          }
        />
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="flex items-center justify-between rounded-xl border border-[#e4e4e7] bg-white px-4 py-3 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
            <div>
              <p className="text-[12px] text-[#52525b]">Checked</p>
              <p className="mt-0.5 text-[22px] font-semibold leading-tight">9</p>
            </div>
            <Activity className="size-5 text-[#71717a]" strokeWidth={1.75} />
          </div>
          <div className="rounded-xl border border-[#bbf7d0] bg-[#f3fcf7] px-4 py-3">
            <p className="text-[12px] text-[#15803d]">Up</p>
            <p className="mt-0.5 text-[22px] font-semibold leading-tight text-[#166534]">9</p>
          </div>
          <div className="rounded-xl border border-[#fde2e2] bg-[#fffafa] px-4 py-3">
            <p className="text-[12px] text-[#b91c1c]">Down</p>
            <p className="mt-0.5 text-[22px] font-semibold leading-tight text-[#b91c1c]">0</p>
          </div>
        </div>
        <p className="mt-2 text-[11.5px] text-[#71717a]">Last check: 11/5/2026, 4:37:47 PM</p>
        <h2 className="mt-3.5 text-[14px] font-semibold">Services</h2>
        <p className="text-[12px] text-[#71717a]">Health endpoints for each MapleRecord service.</p>
        <div className="mt-2.5 grid grid-cols-3 gap-2.5">
          {services.map(([n, d, l]) => (
            <ServiceCard key={n} name={n} desc={d} latency={l} />
          ))}
        </div>
        <h2 className="mt-4 text-[14px] font-semibold">Infrastructure</h2>
        <p className="text-[12px] text-[#71717a]">Task queue broker and the private Ethereum node used for blockchain anchoring.</p>
        <div className="mt-2.5 grid grid-cols-3 gap-2.5">
          {infra.map(([n, d, l]) => (
            <ServiceCard key={n} name={n} desc={d} latency={l} />
          ))}
        </div>
      </AdminShell>
    </ScreenCanvas>
  );
}

/* ---------- 3. Security ---------- */

function RadioOption({ title, desc, selected }: { title: string; desc: string; selected?: boolean }) {
  return (
    <div className="flex gap-3 rounded-lg border border-[#e4e4e7] px-3.5 py-3">
      <span className={cn("mt-[2px] flex size-4 shrink-0 items-center justify-center rounded-full border", selected ? "border-[#2563eb]" : "border-[#a1a1aa]")}>
        {selected ? <span className="size-2 rounded-full bg-[#2563eb]" /> : null}
      </span>
      <span className="leading-snug">
        <span className="block text-[13px] font-medium">{title}</span>
        <span className="mt-0.5 block text-[12px] text-[#71717a]">{desc}</span>
      </span>
    </div>
  );
}

function Security() {
  return (
    <ScreenCanvas id="admin-security">
      <AdminShell active="security" layout="left">
        <Title title="Security" subtitle="Manage authentication, access control, email, and security monitoring" />
        <Segmented className="mt-5" items={["Email & provisioning", "Authentication", "Access Control", "Encryption & Data", "Monitoring & Logs", "Security Policies"]} />
        <div className="mt-4 space-y-4">
          <SettingsCard title="User provisioning" subtitle="Choose how new users are created across the application" footer={<SaveFooter status="All changes saved" label="Save mode" />}>
            <div className="space-y-2.5">
              <RadioOption selected title="Invitation email" desc="Create the user without a password and email an invite link to set one and activate the account." />
              <RadioOption title="Admin sets password" desc="Require a password when creating a user. The account is active immediately; no invitation email is sent." />
            </div>
          </SettingsCard>
          <SettingsCard title="Login 2FA policy" subtitle="Organization-wide policy for email OTP and authenticator apps at password sign-in" footer={<SaveFooter status="All changes saved" label="Save policy" />}>
            <div className="space-y-2.5">
              <RadioOption title="Per user" desc="Each person can enable email OTP or an authenticator app from Account → Security." />
              <RadioOption selected title="Required for everyone" desc="Every password sign-in must complete 2FA. Uses the authenticator app when enrolled, otherwise email OTP." />
              <RadioOption title="Disabled organization-wide" desc="Never require 2FA at login. Not recommended for production." />
            </div>
          </SettingsCard>
        </div>
      </AdminShell>
    </ScreenCanvas>
  );
}

/* ---------- 4. API & Integrations ---------- */

function Field({ label, value, placeholder, mono }: { label: string; value?: string; placeholder?: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[12px] font-medium">{label}</p>
      <span className={cn("mt-1.5 flex h-8 items-center rounded-md border border-[#e4e4e7] bg-white px-2.5 text-[12px] shadow-[0_1px_1px_rgb(0_0_0/0.03)]", value ? "text-[#18181b]" : "text-[#a1a1aa]", mono && "font-mono text-[11.5px]")}>
        {value ?? placeholder}
      </span>
    </div>
  );
}

function Integrations() {
  const tabs = ["Storage", "OpenAI", "DocuSign", "DiDit", "Stripe", "Microsoft Entra", "Blockchain", "Search", "SharePoint", "API Keys", "Documentation"];
  return (
    <ScreenCanvas id="admin-integrations">
      <AdminShell active="integrations" layout="left">
        <Title title="API & Integrations" subtitle="Configure third-party services, object storage, search indexing, and API access for the Maple suite" />
        <div className="mt-5 flex flex-wrap justify-center gap-y-0.5 rounded-lg bg-[#f4f4f5] p-[3px]">
          {tabs.map((t, i) => (
            <span key={t} className={cn("rounded-md px-3 py-1 text-[12px]", i === 0 ? "bg-white font-medium shadow-[0_1px_2px_rgb(0_0_0/0.08)]" : "text-[#52525b]")}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-2.5 rounded-lg border border-[#e4e4e7] bg-[#fafafa] px-3.5 py-3">
          <Info className="mt-[1px] size-4 shrink-0 text-[#52525b]" strokeWidth={1.75} />
          <div className="text-[12px] leading-relaxed">
            <p className="text-[13px] font-semibold">Object storage</p>
            <p className="text-[#52525b]">
              The suite-wide store for uploaded files, including Records documents and profile pictures. Choose a provider below. Leave the access and secret keys blank when saving to keep the stored values.
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <SettingsCard title="Provider" subtitle="Active backend for suite object storage.">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-medium">Storage provider</span>
              <SmallSelect value="Amazon S3" width={120} />
            </div>
            <p className="mt-2 text-[12px] text-[#71717a]">Uses the default AWS endpoint unless an endpoint URL is set.</p>
          </SettingsCard>
          <SettingsCard
            title="Amazon S3 credentials"
            titleExtra={<span className="rounded-full border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-[1px] text-[11px] font-medium text-[#15803d]">Ready</span>}
            subtitle="Access key configured · Secret key configured"
            footer={<SaveFooter status="No changes" label="Save storage settings" />}
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-3.5">
              <Field label="Access key" placeholder="•••••••• (leave blank to keep)" />
              <Field label="Secret key" placeholder="•••••••• (leave blank to keep)" />
              <Field label="Bucket name" value="harbourview-records-prod" />
              <Field label="Region" value="ca-central-1" />
              <div className="col-span-2">
                <Field label="Endpoint URL (optional)" placeholder="Leave empty for default AWS endpoint" />
                <p className="mt-1.5 text-[11.5px] text-[#71717a]">Only needed for S3-compatible providers such as MinIO or a private storage gateway.</p>
              </div>
            </div>
          </SettingsCard>
        </div>
      </AdminShell>
    </ScreenCanvas>
  );
}

/* ---------- 5. Backup & Recovery ---------- */

function BackupRow({ title, desc, control, note }: { title: string; desc?: string; control: ReactNode; note?: string }) {
  return (
    <div className="border-b border-[#f0f0f1] py-3.5 last:border-b-0">
      <div className="flex items-center justify-between gap-6">
        <div className="leading-snug">
          <p className="text-[13px] font-medium">{title}</p>
          {desc ? <p className="mt-0.5 text-[12px] text-[#71717a]">{desc}</p> : null}
        </div>
        {control}
      </div>
      {note ? <p className="mt-1.5 text-[12px] text-[#71717a]">{note}</p> : null}
    </div>
  );
}

function Backup() {
  return (
    <ScreenCanvas id="admin-backup">
      <AdminShell active="backup" layout="left">
        <Title title="Backup & Recovery" subtitle="Configure automatic backups and disaster recovery options" />
        <Segmented className="mt-5" items={["Automated Backups", "Manual Backups", "Recovery", "Storage"]} />
        <div className="mt-4">
          <SettingsCard icon={CalendarDays} title="Automated Backup Configuration" subtitle="Configure scheduled automatic backups for your system">
            <div className="-mt-1">
              <BackupRow title="Enable Automatic Backups" desc="Run a daily backup at the scheduled time" control={<Toggle />} />
              <BackupRow title="Backup Frequency" control={<SmallSelect value="Daily" width={128} />} />
              <BackupRow title="Backup Time (UTC)" control={<SmallSelect value="02:00" width={128} />} />
              <BackupRow title="Retention Period" control={<SmallSelect value="30 days" width={128} />} note="Old backups will be automatically deleted after this period" />
              <BackupRow title="Backup Encryption" desc="Encrypt backups with AES-256" control={<Toggle />} />
            </div>
          </SettingsCard>
        </div>
      </AdminShell>
    </ScreenCanvas>
  );
}

export const adminScreens: Record<string, () => ReactNode> = {
  "admin-products": Products,
  "admin-status": SystemStatus,
  "admin-security": Security,
  "admin-integrations": Integrations,
  "admin-backup": Backup,
};
