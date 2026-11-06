import type { ComponentType, ReactNode } from "react";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Building2,
  CircleHelp,
  Columns3,
  Grid2x2,
  PanelLeft,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * MapleRecord app-shell kit. Recreates the real MapleRecord product UI (top bar, organization switcher,
 * sidebar, page header, tables, badges, toggles, pagination) so product screens can be rendered as
 * crisp marketing visuals with curated sample content. Layout and styling deliberately mirror the
 * real application — change sample content, never the UI structure.
 *
 * Screens render at a fixed 1280 × 800 canvas (see ScreenCanvas) and are captured to WebP by
 * scripts/render-mr-screens.mjs. All sample data is fictional ("City of Harbourview").
 */

export type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

/* ---------- Canvas & shell ---------- */

export const SCREEN_WIDTH = 1280;
export const SCREEN_HEIGHT = 800;

/** Fixed-size canvas the renderer captures (data-screen marks the element to screenshot). */
export function ScreenCanvas({ id, children, height = SCREEN_HEIGHT }: { id: string; children: ReactNode; height?: number }) {
  return (
    <div
      data-screen={id}
      className="relative overflow-hidden bg-white font-sans text-[13px] leading-[1.45] text-[#18181b] antialiased"
      style={{ width: SCREEN_WIDTH, height }}
    >
      {children}
    </div>
  );
}

export type ProductName = "Maple" | "MR Records" | "MR Admin" | "MR Requests" | "MR Workflows" | "MR Forms";

export type NavItem = {
  label: string;
  icon?: Icon;
  active?: boolean;
  /** Right-aligned count (e.g. Requests 73). */
  count?: number;
  locked?: boolean;
  /** Chevron at the end (collapsed group). */
  chevron?: "right" | "down";
  /** Nested children rendered with the left guide line. */
  children?: NavItem[];
};
export type NavSection = { label?: string; items: NavItem[] };

/** The global top bar: product switcher, organization switcher, search, notifications, avatar. */
export function TopBar({
  product,
  org = "City of Harbourview",
  search = "Search records…",
  shortcut,
  notifications,
  initials = "PS",
}: {
  product: ProductName;
  org?: string;
  /** Placeholder for the center search box; pass null to hide it (MR Admin / Workflows / Forms). */
  search?: string | null;
  shortcut?: boolean;
  notifications?: number;
  initials?: string;
}) {
  return (
    <div className="flex h-10 shrink-0 items-center border-b border-[#e4e4e7] bg-white px-3">
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-2 px-1.5 text-[13px] font-medium text-[#18181b]">
          <Grid2x2 className="size-[15px]" strokeWidth={1.75} />
          {product}
        </span>
        <span className="flex h-7 items-center gap-1.5 rounded-md border border-[#e4e4e7] px-2 text-[11.5px] font-medium">
          <Building2 className="size-3.5 text-[#71717a]" strokeWidth={1.75} />
          {org}
          <ChevronsUpDown className="size-3 text-[#a1a1aa]" />
        </span>
      </div>
      {search !== null ? (
        <div className="absolute left-1/2 flex h-7 w-[400px] -translate-x-1/2 items-center gap-2 rounded-md bg-[#f4f4f5] px-2.5 text-[12px] text-[#71717a]">
          <Search className="size-3.5" strokeWidth={1.75} />
          {search}
          {shortcut ? <span className="ml-auto rounded border border-[#e4e4e7] bg-white px-1 text-[10px]">⌘ K</span> : null}
        </div>
      ) : null}
      <div className="ml-auto flex items-center gap-3">
        {notifications ? (
          <span className="relative">
            <Bell className="size-4 text-[#3f3f46]" strokeWidth={1.75} />
            <span className="absolute -right-1.5 -top-1.5 flex size-3.5 items-center justify-center rounded-full bg-[#dc2626] text-[8px] font-semibold text-white">
              {notifications}
            </span>
          </span>
        ) : null}
        <span className="h-5 w-px bg-[#e4e4e7]" />
        <span className="flex size-7 items-center justify-center rounded-full border border-[#e4e4e7] bg-[#fafafa] text-[10px] font-semibold">{initials}</span>
      </div>
    </div>
  );
}

/** Workspace / organization switcher block at the top of the MR Records sidebar. */
export function SidebarHeader({ name, sub, icon: IconC = Building2, dark = false }: { name: string; sub: string; icon?: Icon; dark?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-[#e4e4e7] px-3 py-3">
      <span className={cn("flex size-8 items-center justify-center rounded-lg", dark ? "bg-[#18181b] text-white" : "bg-[#18181b] text-white")}>
        <IconC className="size-4" strokeWidth={1.75} />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-[13px] font-semibold">{name}</span>
        <span className="block truncate text-[11px] text-[#71717a]">{sub}</span>
      </span>
      <ChevronsUpDown className="size-3.5 text-[#71717a]" />
    </div>
  );
}

/** Product-branded sidebar header (MR Requests admin console: maple leaf + product name). */
export function SidebarBrand({ product }: { product: string }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-[#e4e4e7] px-4 py-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element -- static render canvas */}
      <img src="/maplerecord/maplerecord-leaf.svg" alt="" className="h-4 w-auto" />
      <span className="text-[14px] font-semibold">{product}</span>
    </div>
  );
}

function NavRow({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const IconC = item.icon;
  return (
    <li>
      <span
        className={cn(
          "flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px]",
          item.active ? "bg-[#f0f0f1] font-medium text-[#18181b]" : "text-[#27272a]",
          item.locked && "text-[#71717a]",
          // Nested rows (Admin Console tree) are tighter so the fully expanded tree fits above the footer, as in the real app.
          depth > 0 && "h-6",
        )}
      >
        {IconC ? <IconC className="size-[15px] shrink-0" strokeWidth={1.75} /> : null}
        <span className="truncate">{item.label}</span>
        {item.count !== undefined ? <span className="ml-auto text-[11.5px] text-[#52525b]">{item.count}</span> : null}
        {item.locked ? (
          <svg viewBox="0 0 24 24" className="ml-auto size-3.5 text-[#a1a1aa]" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        ) : null}
        {item.chevron === "right" ? <ChevronRight className="ml-auto size-3.5 text-[#71717a]" /> : null}
        {item.chevron === "down" ? <ChevronDown className="ml-auto size-3.5 text-[#71717a]" /> : null}
      </span>
      {item.children ? (
        <ul className="ml-4 border-l border-[#e4e4e7] pl-2">
          {item.children.map((c) => (
            <NavRow key={c.label} item={c} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/** Left sidebar: optional header block, labelled sections, Help & Support footer. */
export function Sidebar({ header, sections, width = 232 }: { header?: ReactNode; sections: NavSection[]; width?: number }) {
  return (
    <aside className="flex shrink-0 flex-col border-r border-[#e4e4e7] bg-[#fafafa]" style={{ width }}>
      {header}
      <nav className="flex-1 overflow-hidden px-2 py-2">
        {sections.map((s, i) => (
          <div key={s.label ?? i} className={i > 0 ? "mt-3" : undefined}>
            {s.label ? <p className="px-2 pb-1 pt-1 text-[11.5px] text-[#71717a]">{s.label}</p> : null}
            <ul className="space-y-px">
              {s.items.map((item) => (
                <NavRow key={item.label} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="flex h-10 items-center gap-2 border-t border-[#e4e4e7] px-4 text-[12.5px]">
        <CircleHelp className="size-[15px]" strokeWidth={1.75} />
        Help &amp; Support
      </div>
    </aside>
  );
}

/** Collapsed icon rail (used by detail screens such as an MR Requests request or appeal). */
export function IconRail({ icons, active }: { icons: Icon[]; active?: number }) {
  return (
    <aside className="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-[#e4e4e7] bg-[#fafafa] py-2">
      {icons.map((IconC, i) => (
        <span key={i} className={cn("flex size-8 items-center justify-center rounded-md text-[#3f3f46]", active === i && "bg-[#f0f0f1]")}>
          <IconC className="size-[15px]" strokeWidth={1.75} />
        </span>
      ))}
      <span className="mt-auto">
        <CircleHelp className="size-[15px] text-[#3f3f46]" strokeWidth={1.75} />
      </span>
    </aside>
  );
}

/** Full application frame: top bar + sidebar + scroll-clipped main area with the panel toggle. */
export function AppFrame({
  topBar,
  sidebar,
  children,
  aside,
  mainClassName,
}: {
  topBar: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
  /** Optional right-hand panel (detail drawers, icon strips). */
  aside?: ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className="flex h-full flex-col">
      {topBar}
      <div className="flex min-h-0 flex-1">
        {sidebar}
        <main className={cn("relative min-w-0 flex-1 overflow-hidden px-6 pt-3", mainClassName)}>
          <PanelLeft className="size-4 text-[#3f3f46]" strokeWidth={1.75} />
          {children}
        </main>
        {aside}
      </div>
    </div>
  );
}

/* ---------- Page elements ---------- */

export function PageHeader({ title, subtitle, actions, back }: { title: ReactNode; subtitle?: ReactNode; actions?: ReactNode; back?: boolean }) {
  return (
    <div className="mt-3 flex items-start justify-between gap-6">
      <div className="flex items-start gap-3">
        {back ? <ChevronLeft className="mt-2 size-4 text-[#3f3f46]" /> : null}
        <div>
          <h1 className="text-[22px] font-semibold leading-tight tracking-[-0.01em]">{title}</h1>
          {subtitle ? <p className="mt-1 text-[12.5px] text-[#71717a]">{subtitle}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Btn({ children, variant = "primary", icon: IconC, className }: { children?: ReactNode; variant?: "primary" | "outline" | "ghost" | "danger"; icon?: Icon; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-md px-3 text-[12.5px] font-medium",
        variant === "primary" && "bg-[#18181b] text-white",
        variant === "outline" && "border border-[#e4e4e7] bg-white text-[#18181b] shadow-[0_1px_1px_rgb(0_0_0/0.03)]",
        variant === "ghost" && "text-[#18181b]",
        variant === "danger" && "text-[#dc2626]",
        className,
      )}
    >
      {IconC ? <IconC className="size-3.5" strokeWidth={1.9} /> : null}
      {children}
    </span>
  );
}

export function SearchInput({ placeholder, width = 300, className }: { placeholder: string; width?: number; className?: string }) {
  return (
    <span className={cn("flex h-8 items-center gap-2 rounded-md bg-[#f4f4f5] px-2.5 text-[12px] text-[#71717a]", className)} style={{ width }}>
      <Search className="size-3.5" strokeWidth={1.75} />
      {placeholder}
    </span>
  );
}

export function Select({ value, width, className }: { value: string; width?: number; className?: string }) {
  return (
    <span
      className={cn("flex h-8 items-center justify-between gap-2 rounded-md border border-[#e4e4e7] bg-white px-2.5 text-[12px]", className)}
      style={width ? { width } : undefined}
    >
      {value}
      <ChevronDown className="size-3.5 text-[#71717a]" />
    </span>
  );
}

/** Segmented tabs (Series | Activity, Network Status | Verify Audit …). */
export function Segmented({ items, active = 0, className }: { items: string[]; active?: number; className?: string }) {
  return (
    <div className={cn("inline-flex rounded-lg bg-[#f4f4f5] p-[3px]", className)}>
      {items.map((t, i) => (
        <span key={t} className={cn("rounded-md px-2.5 py-1 text-[12px]", i === active ? "bg-white font-medium shadow-[0_1px_2px_rgb(0_0_0/0.08)]" : "text-[#52525b]")}>
          {t}
        </span>
      ))}
    </div>
  );
}

export function ColumnsButton() {
  return <Btn variant="outline" icon={SlidersHorizontal}>Columns</Btn>;
}

export function ColumnsIcon() {
  return (
    <span className="flex size-8 items-center justify-center rounded-md border border-[#e4e4e7] bg-white">
      <Columns3 className="size-3.5" strokeWidth={1.75} />
    </span>
  );
}

export type Tone = "green" | "red" | "amber" | "blue" | "violet" | "gray" | "dark" | "orange";

const toneClass: Record<Tone, string> = {
  green: "bg-[#ecfdf3] text-[#15803d] ring-[#bbf7d0]",
  red: "bg-[#fef2f2] text-[#dc2626] ring-[#fecaca]",
  amber: "bg-[#fffbeb] text-[#b45309] ring-[#fde68a]",
  blue: "bg-[#eff6ff] text-[#1d4ed8] ring-[#bfdbfe]",
  violet: "bg-[#f5f3ff] text-[#6d28d9] ring-[#ddd6fe]",
  orange: "bg-[#fff7ed] text-[#c2410c] ring-[#fed7aa]",
  gray: "bg-[#f4f4f5] text-[#3f3f46] ring-[#e4e4e7]",
  dark: "bg-[#18181b] text-white ring-[#18181b]",
};

/** Standard status pill for every module (e.g. Published = green, Draft = gray, Overdue = red). */
export function Badge({ children, tone = "gray", className, dot }: { children: ReactNode; tone?: Tone; className?: string; dot?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-[1px] text-[11px] font-medium ring-1 ring-inset", toneClass[tone], className)}>
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

export function Toggle({ on = true, muted }: { on?: boolean; muted?: boolean }) {
  return (
    <span className={cn("relative inline-flex h-[18px] w-8 shrink-0 items-center rounded-full", on ? (muted ? "bg-[#a1a1aa]" : "bg-[#18181b]") : "bg-[#e4e4e7]")}>
      <span className={cn("absolute size-3.5 rounded-full bg-white shadow", on ? "left-[16px]" : "left-[2px]")} />
    </span>
  );
}

export function Checkbox({ checked }: { checked?: boolean }) {
  return <span className={cn("inline-block size-3.5 rounded-[4px] border", checked ? "border-[#18181b] bg-[#18181b]" : "border-[#d4d4d8] bg-white")} />;
}

export function Avatar({ initials, className }: { initials: string; className?: string }) {
  return <span className={cn("inline-flex size-5 items-center justify-center rounded-full border border-[#e4e4e7] bg-[#fafafa] text-[9px] font-semibold", className)}>{initials}</span>;
}

export function Card({ children, className, title, action }: { children?: ReactNode; className?: string; title?: ReactNode; action?: ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-[#e4e4e7] bg-white", className)}>
      {title ? (
        <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
          <h3 className="text-[13.5px] font-semibold">{title}</h3>
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/**
 * KPI tile: label, big value, caption, icon in a tinted square.
 * `upper` + `caption` is the standard MR Requests / Workflows / Forms dashboard KPI style — use it rather than local KPI copies.
 */
export function StatTile({
  label,
  value,
  caption,
  icon: IconC,
  tone = "gray",
  upper,
  valueClass,
}: {
  label: string;
  value: ReactNode;
  caption?: ReactNode;
  icon?: Icon;
  tone?: Tone;
  /** Uppercase mini label (MR Requests / Workflows / Forms dashboards). */
  upper?: boolean;
  valueClass?: string;
}) {
  return (
    <div className="flex items-start justify-between rounded-xl border border-[#e4e4e7] bg-white px-4 py-3.5">
      <div>
        <p className={cn(upper ? "text-[11px] font-medium uppercase tracking-[0.04em] text-[#71717a]" : "text-[12.5px] text-[#52525b]")}>{label}</p>
        <p className={cn("mt-1.5 text-[24px] font-semibold leading-none tracking-[-0.02em]", valueClass)}>{value}</p>
        {caption ? <p className="mt-2 text-[11.5px] text-[#71717a]">{caption}</p> : null}
      </div>
      {IconC ? (
        <span className={cn("flex size-8 items-center justify-center rounded-lg ring-1 ring-inset", toneClass[tone])}>
          <IconC className="size-4" strokeWidth={1.75} />
        </span>
      ) : null}
    </div>
  );
}

/* ---------- Tables ---------- */

export type Column = { label: ReactNode; width?: number | string; align?: "left" | "right" | "center"; sort?: boolean };

/**
 * Data table in the MR style: optional checkbox column, header row, rows, footer with pagination.
 * Every cell has 12px right padding, so a trailing icon-only column (row actions) needs width >= 28.
 */
export function DataTable({
  columns,
  rows,
  checkbox = true,
  footer,
  rowHeight = 44,
  className,
}: {
  columns: Column[];
  rows: ReactNode[][];
  checkbox?: boolean;
  footer?: ReactNode;
  rowHeight?: number;
  className?: string;
}) {
  const template = [checkbox ? "36px" : null, ...columns.map((c) => (typeof c.width === "number" ? `${c.width}px` : c.width ?? "1fr"))].filter(Boolean).join(" ");
  return (
    <div className={cn("overflow-hidden rounded-xl border border-[#e4e4e7] bg-white", className)}>
      <div className="grid items-center border-b border-[#e4e4e7] px-3 text-[12px] font-medium text-[#3f3f46]" style={{ gridTemplateColumns: template, height: 40 }}>
        {checkbox ? <Checkbox /> : null}
        {columns.map((c, i) => (
          <span key={i} className={cn("flex items-center gap-1 truncate pr-3", c.align === "right" && "justify-end", c.align === "center" && "justify-center")}>
            {c.label}
            {c.sort ? <ChevronDown className="size-3 text-[#a1a1aa]" /> : null}
          </span>
        ))}
      </div>
      {rows.map((r, ri) => (
        <div key={ri} className="grid items-center border-b border-[#f0f0f1] px-3 text-[12.5px] last:border-b-0" style={{ gridTemplateColumns: template, height: rowHeight }}>
          {checkbox ? <Checkbox /> : null}
          {r.map((cell, ci) => (
            <span key={ci} className={cn("min-w-0 truncate pr-3", columns[ci]?.align === "right" && "text-right", columns[ci]?.align === "center" && "text-center")}>
              {cell}
            </span>
          ))}
        </div>
      ))}
      {footer}
    </div>
  );
}

/** "0 of 21 row(s) selected. … Rows per page [10] Page 1 of 3 « ‹ › »" */
export function TableFooter({ summary, page, rowsPerPage = 10, compact }: { summary: string; page: string; rowsPerPage?: number; compact?: boolean }) {
  return (
    <div className="flex h-12 items-center justify-between border-t border-[#e4e4e7] px-4 text-[12px] text-[#52525b]">
      <span>{summary}</span>
      <span className="flex items-center gap-3">
        <span>Rows per page</span>
        <Select value={String(rowsPerPage)} width={58} />
        <span className="text-[#18181b]">{page}</span>
        <span className="flex gap-1">
          {(compact ? [ChevronLeft, ChevronRight] : [ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight]).map((IconC, i) => (
            <span key={i} className="flex size-6 items-center justify-center rounded-md border border-[#e4e4e7] text-[#a1a1aa]">
              <IconC className="size-3" />
            </span>
          ))}
        </span>
      </span>
    </div>
  );
}

/** Mini donut used on dashboards; segments are [value, color]. */
export function Donut({ segments, size = 84, thickness = 9, label, sub }: { segments: [number, string][]; size?: number; thickness?: number; label?: ReactNode; sub?: ReactNode }) {
  const total = segments.reduce((a, [v]) => a + v, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const starts = segments.map((_, i) => segments.slice(0, i).reduce((a, [v]) => a + (v / total) * c, 0));
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {segments.map(([v, color], i) => {
          const len = (v / total) * c;
          return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={thickness} strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-(starts[i] ?? 0)} />;
        })}
      </svg>
      <span className="absolute text-center leading-none">
        <span className="block text-[18px] font-semibold">{label}</span>
        {sub ? <span className="mt-1 block text-[9.5px] text-[#71717a]">{sub}</span> : null}
      </span>
    </span>
  );
}

/** Legend row used next to donuts: colored dot, label, value. */
export function LegendRow({ color, label, value }: { color: string; label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 text-[12px]">
      <span className="flex items-center gap-2 whitespace-nowrap text-[#3f3f46]">
        <span className="size-2 shrink-0 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
