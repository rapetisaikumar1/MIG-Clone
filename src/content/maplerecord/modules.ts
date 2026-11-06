// Generated from maplerecord.com, MapleRecord's product site (crawled 2026-11-03). MapleRecord is designed and built by
// Maverick InnoGarage; MR Admin and the product screens come from the product itself.
// Light edits only: acronym casing, sentence-case headings, typos, list punctuation. See docs/MAPLERECORD-SOURCES.md.
// MR Workflows "why" cards: the crawl had shifted each heading onto the previous card's text; they are re-paired here
// as on the source, and the first card (which repeats MR Requests' intake text and has no heading) is omitted.
// MR Forms hero uses MapleRecord's MR Forms builder image; the source reuses the MR Workflows dashboard there.
// Editorial pass (2026-11-06): sentence case, "and" in titles, consistent step verbs, periods on body text, hype words
// trimmed ("seamlessly", "perfectly", "empowers"). Figures and claims are unchanged; stat bodies no longer repeat their label.
// Accuracy pass (2026-11-07, messaging guide §4 and §5.5): copy is checked against the recreated product screens. Steps,
// heroes and CTAs describe what the screens show; capabilities the screens do not show are kept as published but not
// inflated (register MR-11, owner question). Compliance is "supported", never guaranteed (MR-09). No figures were added.
// Review pass (2026-11-07): "Smart retention" → "Retention schedules" (what the screens show); "Compliance-ready
// framework" → "Compliance and governance support" (no readiness guarantee; the icon map key changed with it).
// Product screens (2026-11-06): hero and "how it works" images are recreated MapleRecord screens (screens.ts), and each
// module has a product tour whose captions describe only what the screen shows (its content is sample data).
// MR Admin (fifth module, confirmed by Maverick InnoGarage) has no page on maplerecord.com: its copy is written only from
// what the MR Admin product UI shows. It has no published figures, problem statements or department use cases.
// Platform pass (2026-11-06): the platform hero shows MR Admin's products table (it lists all five modules), so MR Admin's
// own hero is its system status screen and the products table moved into its tour; MR Workflows' tour adds the designer.
import { mrScreens } from "@/content/maplerecord/screens";
import type { MrModule, MrModuleSlug } from "@/lib/content/types";

export const mrModules: MrModule[] = [
  {
    slug: "mr-records",
    name: "MR Records",
    officialUrl: "https://maplerecord.com/platform/mr-records/",
    summary: "Your central hub for secure, structured, and searchable recordkeeping.",
    highlights: [
      "Retention schedules",
      "Full audit trails",
      "Role-based access"
    ],
    tabImage: {
      src: "/maplerecord/module-records.webp",
      width: 939,
      height: 938,
      alt: "MR Records interface"
    },
    hero: {
      title: "An intelligent, secure, and scalable records management core",
      description: "Manage electronic documents and physical records in one platform, with record series, retention schedules, AI search and an audit trail for every record.",
      trust: [
        "Secure",
        "Compliance support",
        "Enterprise-ready"
      ],
      image: mrScreens.recordsLifecycle
    },
    why: {
      heading: "Fragmented records. Manual handling. Compliance and audit risk.",
      problems: [
        {
          title: "Disconnected electronic and physical records",
          body: "Records scattered across multiple platforms create inefficiencies and duplicate effort."
        },
        {
          title: "Compliance and security risks",
          body: "Meeting HIPAA and other regulatory requirements is complex and costly."
        },
        {
          title: "Slow access and retrieval",
          body: "Time-consuming manual processes delay service delivery, including patient care."
        }
      ]
    },
    how: {
      heading: "How MR Records works",
      steps: [
        {
          title: "Ingest and classify",
          body: "File records into record series with templates and metadata fields, so each record carries its classification and retention schedule from intake."
        },
        {
          title: "Govern and secure",
          body: "Apply retention schedules and access controls to every record, and log every action in the audit trail."
        },
        {
          title: "Find and respond",
          body: "Search in Simple, Advanced, Query or AI mode, and handle transfer, retrieval and lending requests for records."
        },
        {
          title: "Automate workflows",
          body: "Send approvals, such as destruction authorizations and archive retrievals, through MR Workflows instead of email and paper."
        }
      ],
      image: mrScreens.recordsRetention
    },
    tour: {
      intro: "A closer look at the screens records teams work in, from the file browser to the audit trail.",
      stops: [
        { screen: mrScreens.recordsFiles, title: "Browse files by folder", body: "The file browser pairs a folder tree with the contents of the selected folder. Each file shows its classification and retention status, with its size, who created it and when it last changed." },
        { screen: mrScreens.recordsSearch, title: "Search in four modes", body: "Search runs across workspaces in Simple, Advanced, Query and AI modes, and lists the matching records in a results table." },
        { screen: mrScreens.recordsBoxes, title: "Track physical storage boxes", body: "Physical records are kept in numbered boxes. The list shows each box’s type, how many files it holds, a capacity bar and its status." },
        { screen: mrScreens.recordsAudit, title: "Review the audit trail", body: "Each action is logged with a timestamp, the user, the action ID and type, and the device, operating system and browser it came from." },
      ],
    },
    impact: [
      {
        value: "10×",
        label: "Faster record retrieval",
        body: "Up to 10× faster retrieval with smart search."
      },
      {
        value: "60–75%",
        label: "Fewer manual tasks",
        body: "Reduction in manual, document-driven tasks."
      },
      {
        value: "50%",
        label: "Less audit-related effort",
        body: "Retention schedules and audit trails cut the work audits require."
      },
      {
        value: "30–50%",
        label: "Faster approval cycles",
        body: "Improvement in approval cycle times."
      },
      {
        value: undefined,
        label: "Audit-ready history",
        body: "A fully traceable history for every record."
      }
    ],
    capabilities: [
      {
        title: "AI-powered hybrid search",
        items: [
          "Unified search across electronic and physical records",
          "Location tracking for physical files",
          "AI-assisted metadata extraction"
        ]
      },
      {
        title: "Physical records management",
        items: [
          "Barcode and RFID tracking integration",
          "Check-in and check-out workflows",
          "Location management and tracking"
        ]
      },
      {
        title: "Unified governance and compliance",
        items: [
          "Hybrid retention policy management",
          "Automated disposition workflows",
          "Audit trails for electronic and physical records"
        ]
      },
      {
        title: "Intelligent automation",
        items: [
          "AI-driven classification and indexing",
          "Automated workflow triggers",
          "Recommendations for lifecycle actions"
        ]
      }
    ],
    audience: {
      intro: "MR Records supports a wide range of operational teams.",
      teams: [
        {
          title: "Finance & accounting",
          body: "Improve approvals, reconciliation visibility, and audit readiness."
        },
        {
          title: "Legal & compliance",
          body: "Support legal holds, eDiscovery, and regulatory reporting."
        },
        {
          title: "Human resources",
          body: "Manage personnel files securely and automate lifecycle tasks."
        },
        {
          title: "Operations",
          body: "Standardize documentation, reduce manual routing, and increase visibility."
        },
        {
          title: "Healthcare administration",
          body: "Apply retention schedules consistently and respond quickly to data requests."
        },
        {
          title: "Research & development",
          body: "Protect research assets and keep version history traceable."
        },
        {
          title: "Customer service",
          body: "Deliver faster, transparent responses with complete context."
        }
      ]
    },
    cta: {
      title: "Ready to unify your electronic and physical records?",
      body: "See how one hybrid platform brings your electronic and physical records together, with retention schedules, audit trails and lifecycle tracking through to disposition."
    }
  },
  {
    slug: "mr-requests",
    name: "MR Requests",
    officialUrl: "https://maplerecord.com/platform/mr-request/",
    summary: "A streamlined system for managing public and internal information requests.",
    highlights: [
      "Automated intake",
      "Secure redaction",
      "Public portal"
    ],
    tabImage: {
      src: "/maplerecord/module-requests.webp",
      width: 1024,
      height: 1536,
      alt: "MR Requests interface"
    },
    hero: {
      title: "AI-driven request management for timely and transparent responses",
      description: "Capture, triage, track and fulfill information requests in one system, with deadline tracking, redaction and an audit trail for every request.",
      trust: [
        "Secure",
        "Compliance support",
        "Enterprise-ready"
      ],
      image: mrScreens.requestsKanban
    },
    why: {
      heading: "Manage requests. Track deadlines. Respond with confidence.",
      problems: [
        {
          title: "Fragmented request intake",
          body: "Requests arrive through email, forms, portals, and offline channels. Without a single system, teams struggle to track ownership, status, and progress."
        },
        {
          title: "Missed deadlines and compliance risk",
          body: "Manual tracking increases the risk of missed statutory deadlines, delayed responses, and audit findings."
        },
        {
          title: "Limited transparency and control",
          body: "Without structured workflows, approvals, and audit trails, it becomes difficult to keep responses accurate, consistent, and accountable."
        }
      ]
    },
    how: {
      heading: "How MR Requests works",
      steps: [
        {
          title: "Centralize request intake",
          body: "Capture public and internal requests in one place using custom request forms, email intake, and a requester portal."
        },
        {
          title: "Track deadlines automatically",
          body: "Monitor statutory and internal deadlines with automated tracking, alerts, and escalation rules, so requests stay on schedule."
        },
        {
          title: "Review, approve, and redact",
          body: "Route requests through approval workflows, redact documents with AI suggestions and manual redactions, apply exemption codes, and control access to sensitive information."
        },
        {
          title: "Respond and audit",
          body: "Deliver accurate responses, manage bulk disclosures, and maintain a complete audit trail for every request."
        }
      ],
      image: mrScreens.requestsTriage
    },
    tour: {
      intro: "A closer look at the screens request coordinators work in, from the operational overview to redaction.",
      stops: [
        { screen: mrScreens.requestsDashboard, title: "See the operational overview", body: "The overview counts active, due-soon, overdue and closed requests, and shows request and appeal breakdowns, SLA risk and the pipeline by stage." },
        { screen: mrScreens.requestsRedaction, title: "Redact with a full history", body: "The redaction history logs every step on a document, from AI analysis and accepted suggestions to manual redactions, applied exemptions and the redacted copy." },
        { screen: mrScreens.requestsExemptions, title: "Manage exemption codes", body: "Exemption management lists each exemption code with its name, category and status." },
      ],
    },
    impact: [
      {
        value: "30–45%",
        label: "Faster, on-time responses",
        body: "Reduction in request response times through automated routing and deadline tracking."
      },
      {
        value: undefined,
        label: "Complete deadline visibility",
        body: "Track every request against its statutory and service-level deadlines."
      },
      {
        value: "40–60%",
        label: "Reduced manual effort",
        body: "Less manual effort in request intake, approvals, redaction, and follow-ups."
      },
      {
        value: undefined,
        label: "Audit-ready request history",
        body: "Maintain a full, defensible record of every request action and response."
      }
    ],
    capabilities: [
      {
        title: "Centralized request intake",
        items: [
          "Capture requests from email, forms, and portals",
          "Support custom request forms for different use cases",
          "Provide a public requester portal for transparency"
        ]
      },
      {
        title: "Automated deadline tracking",
        items: [
          "Track statutory and internal deadlines automatically",
          "Receive alerts, reminders, and escalations",
          "Keep responses consistent and on time"
        ]
      },
      {
        title: "Approval and workflow management",
        items: [
          "Route requests through configurable approval workflows",
          "Enable collaboration across departments",
          "Support bulk request and response handling"
        ]
      },
      {
        title: "Secure redaction and governance",
        items: [
          "AI-assisted and manual redaction of sensitive information",
          "Enforce role-based access and permissions",
          "Maintain a full request audit trail"
        ]
      },
      {
        title: "Compliance and governance support",
        items: [
          "Supports regulatory and governance requirements",
          "Support reporting, audits, and reviews",
          "Exemption codes managed in one place"
        ]
      },
      {
        title: "Multi-department coordination",
        items: [
          "Handle requests that need input from multiple departments",
          "Cross-departmental collaboration and review",
          "Third-party notification workflows"
        ]
      }
    ],
    audience: {
      intro: "MR Requests supports a wide range of operational teams.",
      teams: [
        {
          title: "Finance & accounting",
          body: "Respond efficiently to audit, vendor, and financial information requests."
        },
        {
          title: "Legal & compliance",
          body: "Manage public, regulatory, and legal requests with complete traceability."
        },
        {
          title: "Human resources",
          body: "Handle employee information requests securely and consistently."
        },
        {
          title: "Operations",
          body: "Coordinate cross-functional requests and improve process visibility."
        },
        {
          title: "Healthcare administration",
          body: "Respond to information requests while protecting patient privacy."
        },
        {
          title: "Customer service",
          body: "Deliver transparent, timely responses with complete request context."
        }
      ]
    },
    cta: {
      title: "Ready to modernize your request management?",
      body: "Handle information requests with centralized intake, deadline tracking, redaction, and an audit-ready history for every request."
    }
  },
  {
    slug: "mr-workflows",
    name: "MR Workflows",
    officialUrl: "https://maplerecord.com/platform/mr-workflow/",
    summary: "No-code automation that connects your MapleRecord modules, teams, and data.",
    highlights: [
      "Cross-app triggers",
      "Ready-made templates",
      "Live monitoring"
    ],
    tabImage: {
      src: "/maplerecord/module-workflows.webp",
      width: 856,
      height: 1272,
      alt: "MR Workflows interface"
    },
    hero: {
      title: "AI-driven workflow automation for enterprise efficiency",
      description: "Design, run and monitor approvals and business processes with a no-code designer, form, email and scheduled triggers, run history and audit logs.",
      trust: [
        "Secure",
        "Compliance support",
        "Enterprise-ready"
      ],
      image: mrScreens.workflowsCanvas
    },
    why: {
      heading: "Manual processes slow you down",
      problems: [
        {
          title: "Complexity across systems",
          body: "Processes often span multiple applications and teams; traditional workflow tools struggle to connect them."
        },
        {
          title: "Lack of visibility and accountability",
          body: "Without real-time monitoring and audit logs, it is hard to show process compliance or measure performance."
        }
      ]
    },
    how: {
      heading: "How MR Workflows works",
      steps: [
        {
          title: "Build without code",
          body: "Create process automation with a visual, no-code designer. Drag and drop workflow components to orchestrate tasks, approvals, and actions without developers."
        },
        {
          title: "Trigger across systems",
          body: "Start workflows when a form is submitted, an email arrives, on a schedule or interval, or manually. Cross-app triggers connect them to other MR products and downstream systems such as ERP and CRM."
        },
        {
          title: "Route with logic",
          body: "Use gateways, conditions and parallel approvals so tasks follow the right path based on data, roles, and outcomes."
        },
        {
          title: "Monitor in real time",
          body: "Track workflow runs as they happen. The dashboard and run history show successful, partial and failed runs and pending approvals."
        },
        {
          title: "Govern and audit",
          body: "Every workflow run is logged for audit readiness. Published revisions, run logs, and role-based access keep workflows under control."
        }
      ],
      image: mrScreens.workflowsRuns
    },
    tour: {
      intro: "A closer look at the screens process owners work in, from the dashboard to the designer and the workflow list.",
      stops: [
        { screen: mrScreens.workflowsDashboard, title: "Start from the dashboard", body: "The dashboard counts workflows and pending approvals, summarizes run outcomes and lists the latest runs, with quick links to common tasks." },
        { screen: mrScreens.workflowsCanvas, title: "Design on a canvas", body: "The designer shows a destruction authorization workflow as connected nodes: a form submission, two approvals, a gateway, an action, an email and an end. Triggers, approvals, gateways, actions, conditions and delays are added from the node palette." },
        { screen: mrScreens.workflowsList, title: "Manage published and draft workflows", body: "The workflow list shows whether each workflow is published or a draft, what triggers it, its revision and when it was last updated." },
      ],
    },
    impact: [
      {
        value: "30–50%",
        label: "Faster process completion",
        body: "Shorter process cycle times from automating routine tasks and approvals."
      },
      {
        value: "100%",
        label: "Improved operational visibility",
        body: "Real-time visibility into workflow execution, bottlenecks, and performance metrics."
      },
      {
        value: "60–75%",
        label: "Reduced manual intervention",
        body: "Fewer manual steps, using intelligent triggers and conditional logic."
      },
      {
        value: "100%",
        label: "Execution traceability",
        body: "Audit traceability for every execution, with logs and role-based access controls."
      }
    ],
    capabilities: [
      {
        title: "No-code workflow design",
        items: [
          "Visual drag-and-drop workflow builder",
          "Create complex logic without writing code",
          "Rapid workflow creation and deployment"
        ]
      },
      {
        title: "Intelligent routing and triggers",
        items: [
          "Conditional logic and dynamic routing",
          "Cross-app triggers across systems and platforms",
          "Parallel paths and exception handling"
        ]
      },
      {
        title: "Real-time monitoring and insights",
        items: [
          "Live execution dashboards",
          "Bottleneck and performance tracking",
          "Operational insights at a glance"
        ]
      },
      {
        title: "Enterprise governance and security",
        items: [
          "Audit-ready execution logs with timestamps",
          "Role-based access and controlled privileges",
          "Data protection and policy enforcement"
        ]
      },
      {
        title: "Scalable and versioned orchestration",
        items: [
          "Designed for enterprise scale and reliability",
          "Versioned workflow history with rollback support",
          "Built to handle high volumes of runs"
        ]
      }
    ],
    audience: {
      intro: "MR Workflows supports a wide range of operational teams.",
      teams: [
        {
          title: "Finance & accounting",
          body: "Automate approvals, reconciliations, and finance close processes."
        },
        {
          title: "Legal & compliance",
          body: "Standardize compliance checks, notifications, and regulatory workflows."
        },
        {
          title: "Human resources",
          body: "Automate onboarding, performance reviews, and HR tasks."
        },
        {
          title: "Operations",
          body: "Orchestrate cross-departmental tasks and operational handoffs."
        },
        {
          title: "Healthcare administration",
          body: "Automate clinical admin, records routing, and service tasks."
        },
        {
          title: "Customer service",
          body: "Drive faster customer responses with automated service workflows."
        }
      ]
    },
    cta: {
      title: "Ready to automate your processes?",
      body: "Automate approvals and routine processes with no-code workflows, governed revisions, and real-time visibility into every run."
    }
  },
  {
    slug: "mr-forms",
    name: "MR Forms",
    officialUrl: "https://maplerecord.com/platform/mr-forms/",
    summary: "Build forms with a drag-and-drop builder or AI generation, and send submissions straight into MapleRecord.",
    highlights: [
      "AI form generation",
      "Mobile-responsive design",
      "Direct record integration"
    ],
    tabImage: {
      src: "/maplerecord/module-forms.webp",
      width: 1024,
      height: 1536,
      alt: "MR Forms interface"
    },
    hero: {
      title: "Build smart forms with AI",
      description: "Build forms with a drag-and-drop builder, conditional logic and AI generation, and route each submission into MapleRecord with a tracking number.",
      trust: [
        "AI-powered",
        "Secure",
        "Mobile-ready"
      ],
      image: mrScreens.formsBuilder
    },
    why: {
      heading: "Manual form creation. Disconnected data. Slow deployment cycles.",
      problems: [
        {
          title: "Slow form development",
          body: "Building forms manually takes hours or days, delaying data collection initiatives."
        },
        {
          title: "Disconnected data systems",
          body: "Form data scattered across platforms creates integration challenges."
        },
        {
          title: "Compliance complexity",
          body: "Making sure forms meet regulatory requirements takes expertise and oversight."
        }
      ]
    },
    how: {
      heading: "How MR Forms works",
      steps: [
        {
          title: "Generate with AI",
          body: "Describe the form you need in plain English, and AI drafts its fields, validations, and logic for you to review."
        },
        {
          title: "Customize and brand",
          body: "Use the drag-and-drop editor to refine layouts, add conditional logic, and apply your brand's colors and styling."
        },
        {
          title: "Deploy anywhere",
          body: "Publish forms as a web link, embed them on websites, or integrate them into mobile apps. Every form is responsive."
        },
        {
          title: "Collect and integrate",
          body: "Submissions flow into MapleRecord with a tracking number, the form version, audit trails, and secure storage."
        }
      ],
      image: mrScreens.formsLogic
    },
    tour: {
      intro: "A closer look at the screens form owners work in, from a new form to its submissions.",
      stops: [
        { screen: mrScreens.formsChooser, title: "Choose what the form is for", body: "A new form starts with one choice: is it for Records, FOI or Workflow?" },
        { screen: mrScreens.formsSubmissions, title: "Track every submission", body: "The submissions archive lists each submission’s tracking number, form version, mode, status and routing, with its statutory deadline." },
        { screen: mrScreens.formsDashboard, title: "Follow activity on the dashboard", body: "The dashboard counts published forms, open requests, pending approvals and overdue items, charts recent submissions and breaks them down by status." },
      ],
    },
    impact: [
      {
        value: "90%",
        label: "Faster form creation",
        body: "Up to 90% faster, with AI-powered generation."
      },
      {
        value: "80%",
        label: "Less development time",
        body: "Reduction in form development and deployment cycles."
      },
      {
        value: "100%",
        label: "Mobile-responsive",
        body: "Forms that adapt to any device."
      },
      {
        value: "65%",
        label: "Higher completion rates",
        body: "Improvement in form completion rates with smart design."
      },
      {
        value: undefined,
        label: "Direct records integration",
        body: "Direct integration with MapleRecord's records management system."
      }
    ],
    capabilities: [
      {
        title: "Drag-and-drop builder",
        items: [
          "100+ field types and widgets",
          "Real-time preview and editing",
          "Custom themes and branding"
        ]
      },
      {
        title: "Conditional logic",
        items: [
          "Show and hide field rules",
          "Skip logic and branching",
          "Dynamic calculated fields"
        ]
      },
      {
        title: "Analytics and insights",
        items: [
          "Real-time submission dashboards",
          "Completion rate tracking",
          "Export to CSV, Excel or PDF"
        ]
      },
      {
        title: "Security and compliance",
        items: [
          "End-to-end encryption",
          "Supports HIPAA and GDPR requirements",
          "Role-based access control"
        ]
      }
    ],
    audience: {
      intro: "MR Forms supports a wide range of operational teams.",
      teams: [
        {
          title: "Human resources",
          body: "Streamline employee onboarding, time-off requests, and performance reviews with digital forms."
        },
        {
          title: "Healthcare administration",
          body: "Run patient intake, consent forms and satisfaction surveys with access controls and audit trails that support HIPAA requirements."
        },
        {
          title: "Legal & compliance",
          body: "Create intake forms, document requests, and compliance attestation workflows."
        },
        {
          title: "Operations",
          body: "Automate service requests, facility bookings, and vendor management forms."
        },
        {
          title: "Research & development",
          body: "Collect research data, project submissions, and experimental protocols securely."
        },
        {
          title: "Finance & accounting",
          body: "Create expense reports, purchase orders, and budget request forms."
        }
      ]
    },
    cta: {
      title: "Ready to build smarter forms?",
      body: "Collect information with forms that feed MapleRecord directly, with conditional logic, versioned forms, and role-based access."
    }
  },
  {
    slug: "mr-admin",
    name: "MR Admin",
    summary: "Suite administration for MapleRecord: users, products and licenses, security, integrations and backups in one console.",
    highlights: [
      "Shared staff directory",
      "Products and licensing",
      "Organization-wide security"
    ],
    tabImage: mrScreens.adminProducts,
    hero: {
      title: "One console to administer the MapleRecord suite",
      description: "Manage the staff directory, products and licenses, roles, security policies and integrations that every MapleRecord module shares.",
      trust: [
        "Shared staff directory",
        "Two-factor authentication policy",
        "AES-256 backup encryption"
      ],
      image: mrScreens.adminStatus
    },
    how: {
      heading: "How MR Admin works",
      steps: [
        {
          title: "Enable products",
          body: "Turn MapleRecord modules on or off for your organization and manage their licenses."
        },
        {
          title: "Add people once",
          body: "Keep one staff directory for every module. Invite users or set their password as an administrator, then assign global roles and groups."
        },
        {
          title: "Set security policy",
          body: "Apply an organization-wide two-factor authentication policy, access control, security policies, and audit logging with a log-retention period."
        },
        {
          title: "Connect services",
          body: "Configure object storage, OpenAI, DocuSign, DiDit, Stripe, Microsoft Entra, blockchain, search, and SharePoint, and manage API keys."
        },
        {
          title: "Monitor and back up",
          body: "Check the health of every MapleRecord service, and schedule daily backups with a retention period and AES-256 encryption."
        }
      ],
      image: mrScreens.adminSecurity
    },
    tour: {
      intro: "A closer look at the screens administrators work in, from products and licenses to integrations and backups.",
      stops: [
        { screen: mrScreens.adminProducts, title: "Enable products and licenses", body: "The products table lists each MapleRecord module, from MR Admin to MR Forms, with its code, license status and an Enabled switch, and actions to add or deactivate a license." },
        { screen: mrScreens.adminIntegrations, title: "Connect external services", body: "Integration settings are grouped in tabs, from object storage, OpenAI, DocuSign, DiDit and Stripe to Microsoft Entra, blockchain, search, SharePoint and API keys." },
        { screen: mrScreens.adminBackup, title: "Schedule backups", body: "Automated backups run on a daily schedule, with a retention period and AES-256 encryption for backup files." },
      ],
    },
    impact: [],
    capabilities: [
      {
        title: "Users and access",
        items: [
          "Staff directory shared by all modules",
          "Global roles and groups",
          "Invite users or set an initial password"
        ]
      },
      {
        title: "Products and licensing",
        items: [
          "Enable or disable each MapleRecord module",
          "Module licenses and billing",
          "Organizations and subscription plans"
        ]
      },
      {
        title: "Security settings",
        items: [
          "Organization-wide two-factor authentication policy",
          "Access control, encryption and data settings",
          "Monitoring, logs and security policies",
          "Audit logging with a log-retention period"
        ]
      },
      {
        title: "API and integrations",
        items: [
          "Object storage (S3), search and SharePoint",
          "OpenAI, DocuSign, DiDit and Stripe",
          "Microsoft Entra and blockchain",
          "API keys"
        ]
      },
      {
        title: "Backup and recovery",
        items: [
          "Scheduled daily backups",
          "Backup retention period",
          "AES-256 backup encryption"
        ]
      },
      {
        title: "System and suite settings",
        items: [
          "Health status of every MapleRecord service",
          "Notifications",
          "Organization logo, used on warehouse print labels",
          "Suite timezone and language"
        ]
      }
    ],
    cta: {
      title: "See MR Admin with the rest of the suite",
      body: "Schedule a demo with the MapleRecord team to see how MR Admin manages users, products, security, and integrations for every module."
    }
  }
];

/**
 * "How the modules work together" on /maplerecord/platform, in lifecycle order (collect → respond → automate →
 * store and govern), with MR Admin as the layer underneath. Each line restates what the module pages say (Forms'
 * submissions flowing into MapleRecord, Requests' intake from email, forms and portals, Workflows' cross-app
 * triggers to other MR products).
 */
export const mrPlatformFlow = {
  eyebrow: "Connected platform",
  heading: "How the modules work together",
  intro: "Each module handles one stage of the records lifecycle, from collecting information to keeping it as a governed record. MR Admin sits underneath all four.",
  steps: [
    {
      module: "mr-forms",
      role: "Collect",
      body: "Build forms with drag-and-drop fields and conditional logic. Submissions flow into MapleRecord with a tracking number and an audit trail.",
    },
    {
      module: "mr-requests",
      role: "Respond",
      body: "Capture public and internal requests from email, forms and portals, track deadlines, and respond with secure redaction.",
    },
    {
      module: "mr-workflows",
      role: "Automate",
      body: "Route approvals and reviews with no-code workflows and cross-app triggers that connect to other MR products.",
    },
    {
      module: "mr-records",
      role: "Store and govern",
      body: "Manage electronic and physical records with retention policies, access controls, and full audit trails.",
    },
  ] satisfies { module: MrModuleSlug; role: string; body: string }[],
  base: {
    module: "mr-admin",
    role: "Underneath all four",
    body: "One staff directory, products and licenses, security policies, integrations, and backups for every module.",
  } satisfies { module: MrModuleSlug; role: string; body: string },
};

/** Platform index (/maplerecord/platform) copy that is specific to that page. */
export const mrPlatformPage = {
  title: "One unified platform. Five integrated modules.",
  description:
    "MapleRecord, our records management platform, is built from five modules. Four cover the records lifecycle: collect information, respond to requests, automate processes, and store and govern records. The fifth, MR Admin, manages the staff directory and the security, integration and backup settings they all share.",
  metaDescription: "The MapleRecord platform: five integrated modules, MR Records, MR Requests, MR Workflows, MR Forms and MR Admin, for electronic and physical records.",
  /** Hero screen: MR Admin's products table, which lists all five modules with their licenses. */
  heroScreen: mrScreens.adminProducts,
  /**
   * The products table fills only the top half of that screen; shown whole, the hero reads as mostly blank.
   * Zoom in on the table (MrFocus: x/y in %, around which the screen is scaled), leaving out the sidebar.
   */
  heroFocus: { x: 89, y: 0, zoom: 1.32 },
  showcase: {
    eyebrow: "Modules",
    title: "Start with the module you need",
    intro: "Use one lifecycle module on its own or combine several on the same platform. MR Admin, the fifth module, administers them all.",
  },
  /** "Administered from MR Admin" band: MR Admin's role, as shown in its product UI. */
  admin: {
    eyebrow: "Module 05 · Suite administration",
    title: "Administered from MR Admin",
    body: "Every module shares one staff directory and one set of security, integration, and backup settings. Administrators manage them in MR Admin.",
    areas: [
      "Staff directory and global roles",
      "Products and licenses",
      "Two-factor authentication policy",
      "API and integrations",
      "Daily encrypted backups",
      "System status",
    ],
  },
  cta: {
    title: "See the platform in action",
    body: "Schedule a personalized demo with the MapleRecord team to see how the five modules fit your records management.",
  },
};

/**
 * Focus regions for product screens shown at small sizes (product tour, "How it operates", module cards). Each
 * screen is 2560 × 1600; a region is its left edge `x`, top edge `y` and width `w`, as fractions of the screen,
 * so the window shows that part enlarged (mostly: the page content without the app's navigation sidebar).
 * `phone` is the region for the 4:3 detail shown below 640px. Screens without an entry are shown whole.
 */
export type MrFocusRegion = { x: number; y: number; w: number };
export type MrScreenFocus = MrFocusRegion & { phone?: MrFocusRegion };

const content = (y = 0.06, w = 0.8, phone: MrFocusRegion = { x: 0.185, y: 0.06, w: 0.48 }): MrScreenFocus => ({ x: 0.185, y, w, phone });

export const mrScreenFocus: Record<string, MrScreenFocus> = {
  // MR Records
  [mrScreens.recordsFiles.src]: { x: 0.045, y: 0.08, w: 0.72, phone: { x: 0.045, y: 0.12, w: 0.4 } },
  [mrScreens.recordsSearch.src]: { x: 0.185, y: 0.06, w: 0.8, phone: { x: 0.185, y: 0.1, w: 0.45 } },
  [mrScreens.recordsBoxes.src]: { x: 0.185, y: 0.06, w: 0.8, phone: { x: 0.185, y: 0.09, w: 0.45 } },
  [mrScreens.recordsAudit.src]: { x: 0.185, y: 0.09, w: 0.8, phone: { x: 0.185, y: 0.09, w: 0.48 } },
  [mrScreens.recordsRetention.src]: content(0.06),
  [mrScreens.recordsLifecycle.src]: content(0.04, 0.8, { x: 0.15, y: 0.06, w: 0.48 }),
  // MR Requests
  [mrScreens.requestsDashboard.src]: content(0.06, 0.8, { x: 0.185, y: 0.1, w: 0.45 }),
  [mrScreens.requestsRedaction.src]: content(0.1, 0.78, { x: 0.185, y: 0.2, w: 0.45 }),
  [mrScreens.requestsExemptions.src]: content(0.06, 0.8, { x: 0.185, y: 0.15, w: 0.48 }),
  [mrScreens.requestsTriage.src]: { x: 0.05, y: 0.08, w: 0.9, phone: { x: 0.06, y: 0.2, w: 0.48 } },
  [mrScreens.requestsKanban.src]: content(0.06, 0.8, { x: 0.185, y: 0.1, w: 0.48 }),
  // MR Workflows
  [mrScreens.workflowsDashboard.src]: content(0.06, 0.8, { x: 0.185, y: 0.06, w: 0.48 }),
  [mrScreens.workflowsList.src]: content(0.05, 0.8, { x: 0.185, y: 0.1, w: 0.48 }),
  [mrScreens.workflowsCanvas.src]: { x: 0.4, y: 0.17, w: 0.6, phone: { x: 0.42, y: 0.22, w: 0.46 } },
  [mrScreens.workflowsRuns.src]: content(0.06, 0.8, { x: 0.185, y: 0.1, w: 0.48 }),
  // MR Forms
  [mrScreens.formsChooser.src]: { x: 0.17, y: 0.1, w: 0.8, phone: { x: 0.185, y: 0.06, w: 0.62 } },
  [mrScreens.formsSubmissions.src]: content(0.06, 0.8, { x: 0.185, y: 0.2, w: 0.48 }),
  [mrScreens.formsDashboard.src]: content(0.06, 0.8, { x: 0.185, y: 0.06, w: 0.48 }),
  [mrScreens.formsLogic.src]: content(0.06, 0.8, { x: 0.185, y: 0.14, w: 0.48 }),
  [mrScreens.formsBuilder.src]: { x: 0.185, y: 0.06, w: 0.62, phone: { x: 0.185, y: 0.1, w: 0.4 } },
  // MR Admin
  [mrScreens.adminProducts.src]: { x: 0.22, y: 0.04, w: 0.76, phone: { x: 0.22, y: 0.1, w: 0.45 } },
  [mrScreens.adminStatus.src]: { x: 0.22, y: 0.07, w: 0.78, phone: { x: 0.22, y: 0.31, w: 0.48 } },
  [mrScreens.adminIntegrations.src]: content(0.06, 0.6, { x: 0.185, y: 0.06, w: 0.46 }),
  [mrScreens.adminBackup.src]: content(0.06, 0.62, { x: 0.185, y: 0.09, w: 0.48 }),
  [mrScreens.adminSecurity.src]: content(0.05, 0.6, { x: 0.185, y: 0.06, w: 0.48 }),
};
