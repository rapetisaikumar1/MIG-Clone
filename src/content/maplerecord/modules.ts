// Generated from maplerecord.com (crawled 2026-11-03). Source of truth: the official MapleRecord website.
// Light edits only: acronym casing, sentence-case headings, typos, list punctuation. See docs/MAPLERECORD-SOURCES.md.
// MR Workflows "why" cards: the crawl had shifted each heading onto the previous card's text; they are re-paired here
// as on the source, and the first card (which repeats MR Requests' intake text and has no heading) is omitted.
// MR Forms hero uses MapleRecord's MR Forms builder image; the source reuses the MR Workflows dashboard there.
// Editorial pass (2026-11-06): sentence case, "and" in titles, consistent step verbs, periods on body text, hype words
// trimmed ("seamlessly", "perfectly", "empowers"). Figures and claims are unchanged; stat bodies no longer repeat their label.
import type { MrModule, MrModuleSlug } from "@/lib/content/types";

export const mrModules: MrModule[] = [
  {
    slug: "mr-records",
    name: "MR Records",
    officialUrl: "https://maplerecord.com/platform/mr-records/",
    summary: "Your central hub for secure, structured, and searchable recordkeeping.",
    highlights: [
      "Smart retention",
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
      description: "Manage electronic documents and physical records in one AI-powered platform, with intelligent automation and complete lifecycle control.",
      trust: [
        "Secure",
        "Compliant",
        "Enterprise-ready"
      ],
      image: {
        src: "/maplerecord/records-app.webp",
        width: 1024,
        height: 990,
        alt: "MR Records application screen"
      }
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
          body: "Automatically categorize records on intake using AI-enabled metadata and smart tagging."
        },
        {
          title: "Govern and secure",
          body: "Apply retention policies and access controls to every record, with full audit visibility."
        },
        {
          title: "Find and respond",
          body: "Use AI search to locate records quickly and fulfill internal or public information requests."
        },
        {
          title: "Automate workflows",
          body: "Orchestrate workflows for approvals, compliance reviews, and cross-departmental requests without manual steps."
        }
      ],
      image: {
        src: "/maplerecord/records-flow.webp",
        width: 935,
        height: 1353,
        alt: "MR Records list of organization records grouped by record series"
      }
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
        body: "Automated compliance cuts the work audits require."
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
          "Real-time location tracking for physical files",
          "Intelligent metadata extraction with AI"
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
          "Complete audit trails for both formats"
        ]
      },
      {
        title: "Intelligent automation",
        items: [
          "AI-driven classification and indexing",
          "Automated workflow triggers",
          "Smart recommendations for lifecycle actions"
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
          body: "Enhance eDiscovery, legal holds, and regulatory reporting."
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
          body: "Maintain retention compliance and respond quickly to data requests."
        },
        {
          title: "Research & development",
          body: "Protect research assets and ensure version traceability."
        },
        {
          title: "Customer service",
          body: "Deliver faster, transparent responses with complete context."
        }
      ]
    },
    cta: {
      title: "Ready to unify your electronic and physical records?",
      body: "See how an AI-first hybrid platform brings all your records together, with intelligent automation, unified governance, and complete lifecycle management."
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
      description: "Capture, track, and fulfill information requests with intelligent workflows while meeting deadlines and ensuring accountability.",
      trust: [
        "Secure",
        "Compliant",
        "Enterprise-ready"
      ],
      image: {
        src: "/maplerecord/requests-app.webp",
        width: 1024,
        height: 991,
        alt: "MR Requests application screen"
      }
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
          body: "Without structured workflows, approvals, and audit trails, it becomes difficult to ensure accuracy, consistency, and accountability."
        }
      ]
    },
    how: {
      heading: "How MR Requests works",
      steps: [
        {
          title: "Centralize request intake",
          body: "Capture all public and internal requests in one place using custom request forms, email intake, and a dedicated requester portal."
        },
        {
          title: "Track deadlines automatically",
          body: "Monitor statutory and internal deadlines with automated tracking, alerts, and escalation rules to ensure every request stays on schedule."
        },
        {
          title: "Review, approve, and redact",
          body: "Route requests through approval workflows, apply secure redaction tools, and control access to sensitive information."
        },
        {
          title: "Respond and audit",
          body: "Deliver accurate responses, manage bulk disclosures, and maintain a complete audit trail for every request."
        }
      ],
      image: {
        src: "/maplerecord/requests-flow.webp",
        width: 965,
        height: 1210,
        alt: "Illustration of requests from forms and email routed through AI to a requester portal"
      }
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
        body: "Ensure every request meets compliance and service level requirements."
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
          "Ensure consistent, on-time responses"
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
          "Apply secure redaction tools to protect sensitive data",
          "Enforce role-based access and permissions",
          "Maintain a full request audit trail"
        ]
      },
      {
        title: "Compliance-ready framework",
        items: [
          "Align with regulatory and governance requirements",
          "Support reporting, audits, and reviews",
          "Ensure consistent, compliant request handling"
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
          body: "Respond to information requests while maintaining privacy and compliance."
        },
        {
          title: "Customer service",
          body: "Deliver transparent, timely responses with complete request context."
        }
      ]
    },
    cta: {
      title: "Ready to modernize your request management?",
      body: "Automate information requests with centralized intake, automated tracking, secure redaction, and compliance-ready workflows."
    }
  },
  {
    slug: "mr-workflows",
    name: "MR Workflows",
    officialUrl: "https://maplerecord.com/platform/mr-workflow/",
    summary: "No-code automation that connects your apps, teams, and data.",
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
      description: "Design, automate, and monitor business processes with a no-code workflow engine that scales securely across your organization.",
      trust: [
        "Secure",
        "Compliant",
        "Enterprise-ready"
      ],
      image: {
        src: "/maplerecord/workflows-app.webp",
        width: 1024,
        height: 987,
        alt: "MR Workflows application screen"
      }
    },
    why: {
      heading: "Manual processes slow you down",
      problems: [
        {
          title: "Complexity across systems",
          body: "Processes often span multiple applications and teams; traditional workflow tools struggle to integrate seamlessly."
        },
        {
          title: "Lack of visibility and accountability",
          body: "Without real-time monitoring and audit logs, it is hard to ensure process compliance or measure performance."
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
          body: "Set up cross-app triggers that connect to other MR products, ERP, CRM, databases, and downstream systems so workflows act across your entire ecosystem."
        },
        {
          title: "Route with logic",
          body: "Use conditional logic and dynamic routing to ensure tasks follow the right paths based on real-time data, roles, and outcomes."
        },
        {
          title: "Monitor in real time",
          body: "Track workflow execution as it happens. Monitor performance, bottlenecks, and outcomes with dashboards that provide visibility across processes."
        },
        {
          title: "Govern and audit",
          body: "Every workflow execution is logged for audit readiness. Version history, execution logs, and role-based access ensure secure governance."
        }
      ],
      image: {
        src: "/maplerecord/workflows-flow.webp",
        width: 1400,
        height: 933,
        alt: "MR Workflows visual builder connecting schedule, webhook, form submit and file upload triggers"
      }
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
        label: "Enterprise-ready compliance",
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
          "End-to-end data protection and policy enforcement"
        ]
      },
      {
        title: "Scalable and versioned orchestration",
        items: [
          "Designed for enterprise scale and reliability",
          "Versioned workflow history with rollback support",
          "Consistent performance under high volume"
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
      body: "Streamline your enterprise with AI-enabled workflows, secure governance, and real-time process visibility."
    }
  },
  {
    slug: "mr-forms",
    name: "MR Forms",
    officialUrl: "https://maplerecord.com/platform/mr-forms/",
    summary: "Create professional forms in seconds with AI-powered generation and direct records integration.",
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
      description: "Create professional forms in seconds with MapleRecord's AI-powered form builder, and connect data collection directly to your records management system.",
      trust: [
        "AI-powered",
        "Secure",
        "Mobile-ready"
      ],
      image: {
        src: "/maplerecord/module-forms.webp",
        width: 1024,
        height: 1536,
        alt: "MR Forms form builder: generate a form with AI, apply themes and branding, and connect it to MR Records"
      }
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
          body: "Describe what you need in plain English, and AI builds a complete form with the right fields, validations, and logic."
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
          body: "Submissions flow automatically into MapleRecord, with full audit trails and secure storage."
        }
      ],
      image: {
        src: "/maplerecord/forms-flow.webp",
        width: 989,
        height: 945,
        alt: "Illustration of an AI-routed process: new request, file approval, compliance review, task assignment and notification"
      }
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
        label: "Seamless data integration",
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
          "Export to Excel or PDF"
        ]
      },
      {
        title: "Security and compliance",
        items: [
          "End-to-end encryption",
          "HIPAA and GDPR compliance",
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
          body: "Run HIPAA-compliant patient intake, consent forms, and satisfaction surveys."
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
      body: "Modernize data collection with AI-powered form building, direct records integration, and enterprise-grade security."
    }
  }
];

/** App-window title-bar labels for the "How it works" screenshots (kept short so they fit on phones). */
export const mrModuleHowLabels: Record<MrModuleSlug, string> = {
  "mr-records": "Record list",
  "mr-requests": "Intake flow",
  "mr-workflows": "Automation",
  "mr-forms": "AI routing",
};

/**
 * "How the modules work together" on /maplerecord/platform. Each line restates what the module pages
 * above say (Workflows' cross-app triggers to other MR products, Forms' submissions flowing into MapleRecord).
 */
export const mrPlatformFlow = {
  eyebrow: "Connected platform",
  heading: "How the modules work together",
  intro: "Each module handles one part of the records lifecycle, and all four run on one platform.",
  steps: [
    {
      module: "mr-records",
      role: "Store and govern",
      body: "Manage electronic and physical records with retention policies, access controls, and full audit trails.",
    },
    {
      module: "mr-requests",
      role: "Respond",
      body: "Capture public and internal information requests, track deadlines, and respond with secure redaction.",
    },
    {
      module: "mr-workflows",
      role: "Automate",
      body: "Route approvals and reviews with no-code workflows and cross-app triggers that connect to other MR products.",
    },
    {
      module: "mr-forms",
      role: "Collect",
      body: "Build forms with AI. Submissions flow into MapleRecord with full audit trails and secure storage.",
    },
  ] satisfies { module: MrModuleSlug; role: string; body: string }[],
};
