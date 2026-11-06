import type { MrImage } from "@/lib/content/types";

/**
 * Recreated MapleRecord product screens. Each is a React recreation of a real MapleRecord screen
 * (src/features/maplerecord/screens/*) with curated, fictional sample content ("City of Harbourview"),
 * captured to WebP by `npm run render:mr-screens`. The UI layout matches the real product; only the
 * sample content differs.
 */
export type MrProductKey = "admin" | "records" | "requests" | "workflows" | "forms";

export type MrScreen = MrImage & {
  id: string;
  product: MrProductKey;
  /** App-window title-bar label, e.g. "MR Records · Retention schedule". */
  label: string;
};

/** Canvas is 1280 × 800 CSS px, captured at 2× (see scripts/render-mr-screens.mjs). */
const W = 2560;
const H = 1600;

const s = (id: string, product: MrProductKey, label: string, alt: string): MrScreen => ({
  id,
  product,
  label,
  alt,
  src: `/maplerecord/screens/${id}.webp`,
  width: W,
  height: H,
});

export const mrScreens = {
  // MR Records
  recordsDashboard: s("records-dashboard", "records", "MR Records · Workspace overview", "MR Records workspace overview with record totals, storage, pending items, a twelve-month activity chart, today's tasks and recent activity"),
  recordsLifecycle: s("records-lifecycle", "records", "MR Records · Records management", "MR Records records list by record series with the lifecycle panel showing record type, retention clock and the current Official Record stage"),
  recordsFiles: s("records-files", "records", "MR Records · Files", "MR Records file browser with a folder tree and a Contracts folder listing classified official records, their retention status and record series"),
  recordsSeries: s("records-series", "records", "MR Records · Record series", "MR Records record series table with codes, departments, confidentiality, class, retention schedule and trigger event"),
  recordsRetention: s("records-retention", "records", "MR Records · Retention schedule", "MR Records retention schedule list with cycle, active period and disposition instruction for each schedule"),
  recordsBoxes: s("records-boxes", "records", "MR Records · Boxes", "MR Records physical storage boxes with box numbers, box type, file counts, capacity bars and status"),
  recordsDestruction: s("records-destruction", "records", "MR Records · Destruction register", "MR Records destruction register listing authorized destructions with certificate numbers, medium, series, method and approvers"),
  recordsAudit: s("records-audit", "records", "MR Records · Audit trail", "MR Records audit trail table with timestamp, device, operating system, browser, user, action ID and action type"),
  recordsSearch: s("records-search", "records", "MR Records · Search", "MR Records search across workspaces with Simple, Advanced, Query and AI modes and a results table"),
  recordsTemplates: s("records-templates", "records", "MR Records · Templates & metadata", "MR Records templates and metadata screen with global and record series templates and their metadata fields"),
  recordsBlockchain: s("records-blockchain", "records", "MR Records · Blockchain verification", "MR Records blockchain verification network status with connection, block statistics and write statistics"),
  recordsRequests: s("records-requests", "records", "MR Records · Requests & approvals", "MR Records requests and approvals across workspaces with totals, pending, completed and rejected counts and a table of transfer, retrieval and official record requests"),
  // MR Requests
  requestsDashboard: s("requests-dashboard", "requests", "MR Requests · Operational overview", "MR Requests operational overview with active, due-soon, overdue and closed counts, request and appeal donuts, SLA risk and pipeline stages"),
  requestsKanban: s("requests-kanban", "requests", "MR Requests · Requests", "MR Requests board of information requests grouped into Pending, Open, In progress, On hold and Resolved columns"),
  requestsTriage: s("requests-triage", "requests", "MR Requests · Request triage", "An MR Requests request in triage with the validation checklist, fee assessment and payment steps and a due-date countdown"),
  requestsExemptions: s("requests-exemptions", "requests", "MR Requests · Exemption management", "MR Requests exemption management listing exemption codes, names, categories and status"),
  requestsRedaction: s("requests-redaction", "requests", "MR Requests · Document redaction", "MR Requests document redaction history with AI analysis, manual redactions and status changes per document"),
  // MR Workflows
  workflowsDashboard: s("workflows-dashboard", "workflows", "MR Workflows · Dashboard", "MR Workflows dashboard with workflow counts, pending approvals, run outcomes, latest runs and quick links"),
  workflowsCanvas: s("workflows-canvas", "workflows", "MR Workflows · Workflow designer", "MR Workflows designer canvas for a destruction authorization workflow with trigger, approval, assignment and end nodes"),
  workflowsList: s("workflows-list", "workflows", "MR Workflows · Workflows", "MR Workflows list of published and draft workflows with trigger type, revision and last update"),
  workflowsRuns: s("workflows-runs", "workflows", "MR Workflows · Run history", "MR Workflows run history with total, successful, partial and failed runs and the fetched and filed counts per run"),
  // MR Forms
  formsBuilder: s("forms-builder", "forms", "MR Forms · Form builder", "MR Forms builder editing a public records request form with a field palette, multi-page canvas and field mappings"),
  formsLogic: s("forms-logic", "forms", "MR Forms · Conditional logic", "MR Forms conditional logic rules that show or hide a payment field based on the request type"),
  formsSubmissions: s("forms-submissions", "forms", "MR Forms · Submissions", "MR Forms submissions archive with tracking numbers, form versions, mode, status, routing and statutory deadlines"),
  formsChooser: s("forms-chooser", "forms", "MR Forms · New form", "MR Forms new-form chooser asking whether the form is for Records, FOI or Workflow"),
  formsDashboard: s("forms-dashboard", "forms", "MR Forms · Dashboard", "MR Forms dashboard with published forms, open requests, pending approvals, overdue items and a submissions chart"),
  // MR Admin
  adminProducts: s("admin-products", "admin", "MR Admin · Products", "MR Admin products table to enable MapleRecord modules and manage their licenses"),
  adminStatus: s("admin-status", "admin", "MR Admin · System status", "MR Admin system status with service health cards for each MapleRecord service, latency and infrastructure"),
  adminSecurity: s("admin-security", "admin", "MR Admin · Security", "MR Admin security settings for user provisioning and the organization-wide two-factor authentication policy"),
  adminIntegrations: s("admin-integrations", "admin", "MR Admin · API & integrations", "MR Admin API and integrations settings with object storage, OpenAI, DocuSign, Stripe, Microsoft Entra, blockchain, search and SharePoint tabs"),
  adminBackup: s("admin-backup", "admin", "MR Admin · Backup & recovery", "MR Admin automated backup configuration with daily schedule, retention period and AES-256 backup encryption"),
} satisfies Record<string, MrScreen>;

export type MrScreenKey = keyof typeof mrScreens;
