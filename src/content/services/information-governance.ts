import type { ServiceContent } from "@/lib/content/types";

/**
 * Information Governance & Records: pillar 07 of the Capability Matrix (Capability Deck, October 2026; the deck's
 * "Flagship Records Management & Compliance"), presented as Information Governance (owner direction, 2026-11-10). It is
 * delivered with our two products, MapleRecord and MOLI; the products band in
 * src/app/(marketing)/information-governance/ introduces both and links the adjacent core areas.
 *
 * Sources: the deck's pillar 07 (MapleRecord: "customized records management software for government, municipalities
 * and regulated organizations, with workflow automation, a seamless user experience and lifecycle governance"; MOLI:
 * AI-driven record management system, advanced search and retrieval, cloud integration across AWS and Azure, GDPR,
 * PDPA, PIPEDA and CCPA), the MapleRecord pages (src/content/maplerecord/overview.ts and modules.ts: record series,
 * retention schedules, disposition, physical storage, MR Requests intake, deadlines and redaction, workflows, forms,
 * MR Admin security, ERP/CRM integration, cloud or on-premises deployment), src/content/moli.ts, and the records
 * capability on /data-management (#records).
 *
 * Not claimed: records migration or digitization services, figures, clients, certifications. Compliance is always
 * "designed to support". Implementation, integration, training and support follow the MapleRecord FAQ "Who builds
 * and implements MapleRecord?", which is owner-stated (provenance: proposed) until confirmed.
 *
 * Capability ids are stable anchors (/information-governance#records-lifecycle etc.); don't rename them.
 */
export const informationGovernance: ServiceContent = {
  slug: "information-governance",
  interest: "records-management",
  name: "Information Governance",
  // The two published data governance articles are the closest reading; there is no records theme yet.
  insightTheme: "Data & Analytics",
  meta: {
    title: "Information Governance & Records Management",
    description:
      "Records lifecycle, retention, information requests, audit trails and privacy compliance support, delivered with our own products, MapleRecord and MOLI.",
  },
  hero: {
    eyebrow: "Records · Retention · Privacy",
    title: "Govern every record from capture to defensible disposition.",
    lead: "We put records and information governance into daily use with our own products, MapleRecord and MOLI: retention schedules applied to electronic and physical records, information requests tracked to their deadlines, an audit trail for every action, and controls designed to support GDPR, PDPA, PIPEDA and CCPA.",
  },
  problem: {
    title: "A retention schedule on paper doesn't govern the records people keep.",
    body: [
      "Records sit in shared drives, email, business systems and storage boxes, each with its own copies and its own habits. Few organizations can say with confidence what they hold, who can see it, or when it may be destroyed.",
      "Information requests then mean manual searches against statutory deadlines, and audits mean reconstructing decisions after the fact. We put lifecycle rules into the system people work in, so classification, retention, access and disposition happen as part of the work, with a record of each step.",
    ],
    signals: [
      "Electronic and physical records managed in separate places",
      "Retention schedules that exist only as documents",
      "Records kept indefinitely because no one can approve disposal",
      "Information requests tracked in inboxes and spreadsheets",
      "Audits that depend on piecing together who did what",
      "No clear view of where personal information is held",
    ],
  },
  audience: [
    {
      role: "Government agencies and municipalities",
      need: "Records, archives and public records requests handled consistently, with an audit trail for every decision.",
    },
    {
      role: "Regulated organizations",
      need: "Retention, access and privacy rules applied in the system, with evidence that they are followed.",
    },
    {
      role: "Records and information managers",
      need: "One file plan and retention schedule applied across electronic and physical records.",
    },
    {
      role: "Privacy, legal and compliance teams",
      need: "Records they can find and trust for legal holds, information requests and privacy obligations.",
    },
  ],
  capabilitiesIntro:
    "We deliver information governance as software and services together. We configure our own products, MapleRecord and MOLI, around your records program, integrate them with the systems you run, train your teams and support them once live. Take the capabilities you need now and add the rest as the program grows.",
  capabilities: [
    {
      id: "records-lifecycle",
      title: "Records lifecycle and retention",
      summary:
        "Retention schedules on paper don't change daily work. We set up record series, classification and retention in MapleRecord, so each record carries its rules from capture to disposition.",
      items: [
        "Record series, templates and metadata that classify records at intake",
        "Retention schedules with active periods, trigger events and disposition instructions",
        "Automated disposition workflows, with approvals",
        "A destruction register of authorized destructions",
      ],
      platforms: ["MR Records", "MR Workflows"],
      provenance: "verified",
    },
    {
      id: "hybrid-records",
      title: "Electronic and physical records",
      summary:
        "When paper and digital records live apart, every search has two answers. We bring them into one system under one set of rules.",
      items: [
        "Electronic documents and physical records in one platform",
        "Physical storage boxes, with location tracking for files",
        "Barcode and RFID tracking integration",
        "Unified search across electronic and physical records",
      ],
      platforms: ["MR Records"],
      provenance: "verified",
    },
    {
      id: "information-requests",
      title: "Information requests",
      summary:
        "Requests arrive by email, forms, portals and in person, and deadlines slip when they are tracked by hand. We set up one place to capture, track, review and answer them.",
      items: [
        "Intake from request forms, email and a public requester portal",
        "Statutory and internal deadline tracking, with alerts and escalation",
        "AI-assisted and manual redaction, with exemption codes",
        "A full audit trail for every request and response",
      ],
      platforms: ["MR Requests", "MR Forms"],
      provenance: "verified",
    },
    {
      id: "workflow-automation",
      title: "Workflow automation",
      summary:
        "Approvals by email leave no record and stall when someone is away. We configure no-code workflows for the reviews and approvals your records program depends on.",
      items: [
        "No-code workflows for creation, review and approval",
        "Destruction authorization routed to the right approvers",
        "Digital forms whose submissions are filed into MapleRecord",
        "Run history for every workflow",
      ],
      platforms: ["MR Workflows", "MR Forms"],
      provenance: "verified",
    },
    {
      id: "access-audit",
      title: "Access control and audit trails",
      summary:
        "Audits go slowly when evidence has to be reconstructed. We set role-based access and security policies across the suite, and every action is logged as it happens.",
      items: [
        "Role-based access and security policies, including two-factor authentication",
        "Audit trails of user actions on records and requests",
        "Version control and secure archiving",
        "Support for legal holds, eDiscovery and regulatory reporting",
      ],
      platforms: ["MR Admin", "MR Records"],
      provenance: "verified",
    },
    {
      id: "privacy-compliance",
      title: "Privacy compliance support",
      summary:
        "Privacy obligations depend on knowing where personal information is and who can reach it. We configure access, redaction and retention controls designed to support GDPR, PDPA, PIPEDA and CCPA.",
      items: [
        "Role-based access to records that hold personal information",
        "Redaction of sensitive information before release",
        "Retention rules that limit how long information is kept",
        "Classification and security rules shared with our Data Governance work",
      ],
      platforms: ["MOLI", "MR Requests"],
      provenance: "verified",
    },
    {
      id: "ai-search",
      title: "AI-driven search and retrieval",
      summary:
        "Records only help when people can find them. MOLI, our AI-driven record management system, and MapleRecord's AI search help teams find what they need across their collections.",
      items: [
        "AI-powered search and retrieval across record collections with MOLI",
        "Simple, advanced, query and AI search modes in MR Records",
        "AI-driven classification and indexing",
        "Cloud integration across AWS and Azure",
      ],
      platforms: ["MOLI", "MR Records"],
      provenance: "verified",
    },
    {
      id: "implementation",
      title: "Implementation, integration and support",
      summary:
        "Software alone doesn't change how records are kept. We configure MapleRecord and MOLI for your program, connect them to the systems you already run, and stay with your teams after go-live.",
      items: [
        "Configuration of record series, schedules, access and workflows for your program",
        "Integration with ERP, CRM and other enterprise systems",
        "Deployment on cloud, including AWS and Azure, or on-premises infrastructure",
        "Training for records teams and administrators, and ongoing support",
      ],
      provenance: "proposed",
    },
  ],
  approach: [
    {
      stage: "Understand & strategize",
      activities:
        "Review the records you hold, where they live, your retention schedules, request volumes and privacy obligations, and agree the record series, rules and priorities the program must cover.",
      deliverable: "Records and information assessment and a prioritized implementation plan",
    },
    {
      stage: "Implement & integrate",
      activities:
        "Configure MapleRecord and MOLI for your program, from record series, retention and access to request handling and workflows. Integrate them with your existing systems, pilot with one team and train your people, with minimal disruption.",
      deliverable: "A configured records system, integrated and in use",
    },
    {
      stage: "Optimize & grow",
      activities:
        "Monitor adoption, request deadlines and disposition, extend the program to more departments and record types, and refine the rules as obligations change.",
      deliverable: "Usage and compliance reporting and an expansion roadmap",
    },
  ],
  deliverables: [
    { title: "Records and information assessment", description: "What records you hold, where they are, the rules that apply and the gaps to close first." },
    { title: "File plan and retention schedule", description: "Record series, retention periods, trigger events and disposition instructions, configured in MapleRecord." },
    { title: "Configured MapleRecord modules", description: "The modules your teams need, from MR Records and MR Requests to MR Workflows, MR Forms and MR Admin, set up for your program." },
    { title: "Access model and audit trail", description: "Roles, permissions and security policies, with every action logged for audits and reviews." },
    { title: "Request handling process", description: "Intake forms, deadlines, approval routes and exemption codes for public and internal information requests." },
    { title: "Trained teams and ongoing support", description: "Training for records staff and administrators, and support once the system is live." },
  ],
  useCases: [
    {
      title: "Public records requests on deadline",
      context: "A municipality receives public records requests by email, web form and in person, and tracks statutory deadlines in a spreadsheet.",
      approach:
        "Configure MR Requests with a public requester portal and intake forms, deadline tracking with escalation, approval routes and exemption codes, and AI-assisted redaction before release.",
      outcome: "Every request is logged in one place, deadlines are visible before they are missed, and each response has an audit trail.",
    },
    {
      title: "One retention schedule for paper and digital",
      context: "A regulated organization keeps electronic records in shared drives and physical files in offsite boxes, each under different retention practices.",
      approach:
        "Agree record series and a retention schedule, configure them in MR Records for electronic and physical records, track boxes and file locations, and route disposition through an approval workflow.",
      outcome: "Records follow one schedule, and each destruction is authorized and entered in the destruction register.",
    },
    {
      title: "Finding records for a privacy request",
      context: "An enterprise team must locate the records it holds about one individual across several collections.",
      approach:
        "Use MOLI's AI-powered search and retrieval across the collections, limit who can see the results with role-based access, and apply retention rules so information isn't kept longer than needed.",
      outcome: "The team responds from records it can find and trust, with controls designed to support its privacy obligations.",
    },
  ],
  benefits: [
    { title: "Rules in daily use", description: "Classification, retention and disposition applied in the system, not left in a policy document." },
    { title: "Requests on time", description: "Every information request tracked against its deadline, with an audit trail." },
    { title: "Evidence on hand", description: "Audit trails and a destruction register that show what happened and who approved it." },
    { title: "Less kept, less risk", description: "Records disposed of on a documented decision instead of kept indefinitely." },
  ],
  faqs: [
    {
      question: "What does information governance cover?",
      answer:
        "Information governance is how an organization manages its records and information across their lifecycle: how they are captured and classified, who can access them, how long they are kept and how they are disposed of. Our work covers records management for electronic and physical records, information requests, workflow automation, access control and audit trails, privacy compliance support, and AI-driven search and retrieval.",
    },
    {
      question: "Is this software or a service?",
      answer:
        "Both. MapleRecord and MOLI are designed and built by Maverick InnoGarage, and our team implements them: we configure them for your records program, integrate them with your systems, train your people and provide ongoing support.",
    },
    {
      question: "How are MapleRecord and MOLI different?",
      answer:
        "MapleRecord is a configurable records management suite for public sector and enterprise organizations, with five modules (MR Records, MR Requests, MR Workflows, MR Forms and MR Admin) and workflow automation. MOLI is an AI-first record management system centered on search and retrieval and privacy compliance support. We recommend one or both depending on your records and environment.",
    },
    {
      question: "Will this make us compliant with GDPR, PDPA, PIPEDA or CCPA?",
      answer:
        "No system can make an organization compliant on its own. MapleRecord and MOLI are designed to support these obligations; how you configure, operate and govern them, along with your own policies and legal advice, determines compliance.",
    },
    {
      question: "Can it work with our existing systems?",
      answer:
        "Yes. MapleRecord integrates with ERP, CRM and other enterprise systems and can be deployed on cloud or on-premises infrastructure. MOLI is built for cloud integration across AWS and Azure.",
    },
    {
      question: "How quickly can MapleRecord be deployed?",
      answer: "MapleRecord is designed for rapid deployment and can be configured in weeks, depending on organizational needs.",
    },
    {
      question: "How does information governance relate to data governance and AI governance?",
      answer:
        "They share foundations. Data governance sets ownership, quality and security rules for the data in your systems. Information governance applies lifecycle, retention and access rules to your records. AI governance puts oversight around the AI that uses both. Many programs draw on all three, and we deliver each.",
    },
  ],
  cta: {
    title: "Bring your records under one set of rules.",
    body: "Tell us about your records, your request volumes and the obligations you work under. We'll show you where MapleRecord and MOLI fit and scope a practical first step with you.",
  },
};
