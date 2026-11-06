// Generated from maplerecord.com, MapleRecord's product site (crawled 2026-11-03). MapleRecord is designed and
// built by Maverick InnoGarage.
// Edited for clarity and consistency (sentence case, American English, full sentences in challenge
// cards, de-duplicated headings and stat text, one copy-paste error fixed); no figures or capabilities
// were added. See docs/MAPLERECORD-SOURCES.md.
// 2026-11-07 (messaging guide §4, §5.5; register MR-07, MR-08): compliance is worded as supported, never
// guaranteed (claims that the product meets, guarantees or is built for a regulation were reworded, and the
// banking-grade encryption wording dropped); impact headings say "Potential impact" so the published figures
// don't read as client history;
// a few use cases that described adjacent products (CLM, ELN, CRM, fraud detection) now say what a
// records platform does. No figures, regulations or capabilities were added.
//
// `tagline` lists the page's focus areas, separated by " · " (shown as chips in the hero).
// Impact items with value "✓" are qualitative (the source showed "Improved"); the label carries the claim.
// `image` is a recreated MapleRecord product screen (screens.ts) chosen for each sector or team; it shows
// sample data, so the hero carries the sample-data note. The marketing illustrations from maplerecord.com
// were dropped here: they had figures baked in that contradicted the published figures on the same page.
import type { MrModuleSlug, MrSolution } from "@/lib/content/types";
import { mrScreens, type MrScreenKey } from "./screens";

export const mrSolutions: MrSolution[] = [
  {
    slug: "financial-services",
    label: "Financial Services",
    kind: "industry",
    officialUrl: "https://maplerecord.com/solution/financial-services/",
    title: "MapleRecord for financial services",
    description:
      "Modernize your financial institution with intelligent document management, automated workflows, and compliance support built for banking, wealth management, and insurance.",
    metaDescription: "Intelligent document management, automated workflows and compliance support for banking, wealth management and insurance.",
    tagline: "Loan and account records · KYC/AML workflows · Audit trails",
    image: mrScreens.recordsRetention,
    challenges: {
      heading: "Financial services challenges",
      intro:
        "Modern financial institutions face increasing regulatory pressure, data security requirements, and customer expectations for rapid service delivery.",
      items: [
        {
          title: "Regulatory compliance",
          body: "Institutions must meet SOX, FINRA, SEC, GDPR, and AML requirements while maintaining complete audit trails.",
        },
        {
          title: "Document overload",
          body: "Millions of loan documents, account records, transaction data, and compliance reports sit across multiple systems and locations.",
        },
        {
          title: "Operational efficiency",
          body: "Manual processing slows loan origination, account opening, KYC verification, and fraud investigation workflows.",
        },
      ],
    },
    modules: {
      heading: "How MapleRecord serves financial services",
      items: [
        {
          module: "mr-records",
          title: "Intelligent records management",
          body: "A secure repository for loan files, account records, transaction history, and compliance documentation, with automated retention policies.",
          bullets: [
            "Centralized loan and account document storage",
            "Automated classification and metadata tagging",
            "Regulatory retention schedule enforcement",
            "Encryption and role-based access controls",
          ],
        },
        {
          module: "mr-requests",
          title: "Request intake and management",
          body: "Streamline audit responses, regulatory inquiries, and internal document requests with automated search and fulfillment.",
          bullets: [
            "Rapid response to regulatory examinations",
            "Automated legal hold and eDiscovery support",
            "Customer account inquiry resolution",
            "Complete audit trail of all requests",
          ],
        },
        {
          module: "mr-workflows",
          title: "Workflow management",
          body: "Automate loan origination, account opening, KYC verification, compliance reviews, and approvals with no-code process orchestration.",
          bullets: [
            "Automated loan processing and approvals",
            "KYC/AML compliance workflow automation",
            "Real-time process monitoring dashboards",
            "Integration with core banking systems",
          ],
        },
      ],
    },
    impact: {
      heading: "Potential impact for financial institutions",
      items: [
        { value: "30–50%", label: "Faster response times", body: "For regulatory and audit requests." },
        { value: "60%", label: "Reduced manual effort", body: "Across compliance tasks." },
        { value: "100%", label: "Audit traceability", body: "Across records, requests, and workflows." },
      ],
    },
    useCases: {
      heading: "Financial services use cases",
      items: [
        {
          title: "Loan origination",
          body: "Automate document collection, verification, approval workflows, and record keeping for mortgage and commercial loans.",
        },
        {
          title: "Account opening",
          body: "Streamline KYC verification, identity checks, document capture, and approvals for new customer accounts.",
        },
        {
          title: "Regulatory reporting",
          body: "Collect the records behind SEC, FINRA, FDIC, and other regulatory reports, and route each report through review and approval.",
        },
        {
          title: "Audits & examinations",
          body: "Respond quickly to internal audits, regulatory exams, and third-party assessments with automated document retrieval.",
        },
        {
          title: "Claims processing",
          body: "Automate claims intake, document review, fraud review routing, and payment approval workflows for insurance carriers.",
        },
        {
          title: "Client onboarding",
          body: "Streamline client intake, suitability assessments, and account setup for wealth management and advisory firms.",
        },
      ],
    },
    security: {
      heading: "Built for financial services security",
      intro:
        "MapleRecord is designed to support the security and compliance requirements of banks, credit unions, insurance companies, and investment firms.",
      items: [
        "End-to-end encryption (256-bit AES)",
        "Multi-factor authentication (MFA)",
        "Role-based access controls (RBAC)",
        "Complete audit logging",
        "Data residency options",
      ],
    },
    cta: {
      title: "Ready to modernize your financial institution?",
      body: "See how MapleRecord can help your bank, credit union, or financial services firm modernize document management and workflow automation.",
    },
  },
  {
    slug: "insurance",
    label: "Insurance",
    kind: "industry",
    officialUrl: "https://maplerecord.com/solution/insurance/",
    title: "MapleRecord for insurance",
    description:
      "Accelerate claims processing, streamline policy administration, and support compliance with intelligent document management and automated workflows built for insurance carriers, brokers, and MGAs.",
    metaDescription: "Speed up claims, streamline policy administration and support compliance with document management and workflows for carriers, brokers and MGAs.",
    tagline: "Claims processing · Policy administration · Regulatory audits",
    image: mrScreens.requestsKanban,
    challenges: {
      heading: "Insurance industry challenges",
      intro:
        "Insurers face pressure to process claims faster, reduce operational costs, manage regulatory compliance, and deliver exceptional customer experiences.",
      items: [
        {
          title: "Claims cycle time",
          body: "Manual claims processing slows settlements, raises costs, and frustrates customers, especially when documentation is spread across multiple systems.",
        },
        {
          title: "Policy administration",
          body: "Policy documents, endorsements, renewals, and underwriting files are managed across distributed teams and legacy systems.",
        },
        {
          title: "Regulatory compliance",
          body: "Insurers must meet state insurance regulations, data privacy laws, and audit requirements while keeping every record traceable.",
        },
      ],
    },
    modules: {
      heading: "How MapleRecord serves insurance",
      items: [
        {
          module: "mr-records",
          title: "Intelligent records management",
          body: "A central repository for policy documents, claims files, underwriting records, and regulatory filings, with automated retention and disposition.",
          bullets: [
            "Unified storage for policies, claims, and underwriting files",
            "AI-powered document classification and indexing",
            "Automated retention based on policy type and state regulations",
            "Integration with core insurance platforms",
          ],
        },
        {
          module: "mr-requests",
          title: "Request intake and management",
          body: "Respond faster to claims documentation requests, policy inquiries, regulatory audits, and subpoenas with intelligent search and retrieval.",
          bullets: [
            "Fast response to claims adjuster document requests",
            "Automated handling of policyholder inquiries",
            "Regulatory audit and examination support",
            "Complete request tracking and audit trails",
          ],
        },
        {
          module: "mr-workflows",
          title: "Workflow management",
          body: "Automate claims processing, policy underwriting, new business, and renewals with AI-enabled workflow orchestration.",
          bullets: [
            "Claims review and approval workflow automation",
            "Underwriting review and approval workflows",
            "Policy renewal and endorsement processing",
            "Real-time workflow analytics and reporting",
          ],
        },
      ],
    },
    impact: {
      heading: "Potential impact for insurers",
      items: [
        { value: "30–50%", label: "Faster processing", body: "For claims and request processing." },
        { value: "60%", label: "Reduced manual work", body: "Across document handling." },
        { value: "100%", label: "Audit traceability", body: "Across policies, claims, and requests." },
        { value: "✓", label: "Improved customer satisfaction", body: "Through faster, more transparent responses." },
      ],
    },
    useCases: {
      heading: "Insurance use cases",
      items: [
        {
          title: "Claims processing",
          body: "Automate first notice of loss (FNOL) intake, claims assignment, document collection, adjuster workflows, and payment approval for faster settlements.",
        },
        {
          title: "Policy underwriting",
          body: "Streamline application review, risk assessment, document verification, and underwriting decision workflows.",
        },
        {
          title: "New business processing",
          body: "Accelerate policy issuance with automated document collection, verification, approval routing, and policy delivery.",
        },
        {
          title: "Renewals & endorsements",
          body: "Automate renewal processing, policy changes, endorsements, and customer communications with intelligent workflows.",
        },
        {
          title: "Regulatory compliance",
          body: "Support compliance with state insurance regulations, market conduct exams, and data privacy requirements.",
        },
        {
          title: "Fraud investigation",
          body: "Support fraud investigations with complete document trails, automated flagging, and special investigations unit (SIU) workflows.",
        },
      ],
    },
    security: {
      heading: "Built for insurance security",
      intro: "MapleRecord is designed to support the security and compliance requirements of insurance carriers, MGAs, brokers, and reinsurers.",
      items: [
        "Enterprise-grade security and data protection",
        "Supports regulatory requirements and audit readiness",
        "Scales across high-volume claims and policy operations",
        "One connected platform for records, requests, and workflows",
        "Designed for reliability and operational continuity",
      ],
    },
    cta: {
      title: "Ready to modernize your insurance operations?",
      body: "See how MapleRecord can help your carrier, brokerage, or MGA modernize claims processing, policy administration, and compliance.",
    },
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    kind: "industry",
    officialUrl: "https://maplerecord.com/solution/healthcare/",
    title: "MapleRecord for healthcare",
    description:
      "Simplify healthcare administration with secure patient record management, automated workflows, and document handling with controls that support HIPAA requirements, built for hospitals, clinics, and health systems.",
    metaDescription: "Patient record management, automated workflows and access controls that support HIPAA requirements, for hospitals, clinics and health systems.",
    tagline: "Patient record requests · Authorizations · HIPAA requirements",
    image: mrScreens.requestsTriage,
    challenges: {
      heading: "Healthcare industry challenges",
      intro:
        "Healthcare organizations face pressure to manage patient records securely, respond to medical record requests quickly, maintain HIPAA compliance, and reduce administrative burden.",
      items: [
        {
          title: "Record request delays",
          body: "Manual processing of patient record requests causes delays, raises costs, and frustrates patients, especially when documentation is spread across multiple systems.",
        },
        {
          title: "Administrative records",
          body: "Patient files, administrative documents, operational records, and clinical documentation are spread across distributed facilities and legacy systems.",
        },
        {
          title: "HIPAA compliance",
          body: "Providers must meet HIPAA privacy and security rules, state regulations, and audit requirements while protecting patient privacy and keeping every record traceable.",
        },
      ],
    },
    modules: {
      heading: "How MapleRecord serves healthcare",
      items: [
        {
          module: "mr-records",
          title: "Intelligent records management",
          body: "A central repository for administrative records, operational documentation, and patient-related files, with automated retention and security controls that support HIPAA requirements.",
          bullets: [
            "Unified storage for administrative and operational records",
            "AI-powered document classification and indexing",
            "Automated retention based on record type and regulations",
            "Integration with healthcare systems and EMRs",
          ],
        },
        {
          module: "mr-requests",
          title: "Request intake and management",
          body: "Respond faster to patient record requests, legal inquiries, regulatory audits, and subpoenas, with intelligent search and access controls that support HIPAA requirements.",
          bullets: [
            "Fast response to patient record requests",
            "Automated handling of authorization and release forms",
            "Regulatory audit and compliance support",
            "Complete request tracking and audit trails",
          ],
        },
        {
          module: "mr-workflows",
          title: "Workflow management",
          body: "Automate patient record requests, authorization processing, compliance workflows, and administrative tasks with AI-enabled workflow orchestration.",
          bullets: [
            "End-to-end patient record request automation",
            "Authorization verification and release workflows",
            "Compliance and audit preparation automation",
            "Real-time workflow analytics and reporting",
          ],
        },
      ],
    },
    impact: {
      heading: "Potential impact for healthcare organizations",
      items: [
        { value: "3×", label: "Faster fulfillment", body: "Through automated request handling." },
        { value: "60%", label: "Reduced admin work", body: "Across manual administrative tasks." },
        { value: "100%", label: "Audit traceability", body: "Complete audit trails for compliance." },
        { value: "✓", label: "Improved patient experience", body: "Through faster, more transparent responses." },
      ],
    },
    useCases: {
      heading: "Healthcare use cases",
      items: [
        {
          title: "Patient record requests",
          body: "Automate request intake, authorization verification, record retrieval, redaction, and delivery, with audit trails and access controls that support HIPAA requirements.",
        },
        {
          title: "Administrative records",
          body: "Centralize operational documents, policies, procedures, contracts, and administrative files with automated retention management.",
        },
        {
          title: "Legal & subpoena response",
          body: "Streamline legal holds, subpoena responses, litigation support, and eDiscovery with complete audit trails and chain of custody.",
        },
        {
          title: "Compliance & audits",
          body: "Automate compliance reporting, audit preparation, regulatory filings, and record retention with built-in governance controls.",
        },
        {
          title: "Authorization management",
          body: "Track and verify patient authorizations, release forms, and consent documentation with automated workflow routing.",
        },
        {
          title: "Inter-facility transfers",
          body: "Share records securely between facilities, providers, and care teams, with controls that support HIPAA requirements.",
        },
      ],
    },
    security: {
      heading: "Built for healthcare security",
      intro: "MapleRecord is designed to support the security and compliance requirements of hospitals, health systems, clinics, and healthcare providers.",
      items: [
        "Enterprise-grade security and data protection",
        "Supports HIPAA requirements and audit readiness",
        "Scales across multi-facility healthcare operations",
        "One connected platform for records, requests, and workflows",
        "Designed for reliability and operational continuity",
      ],
    },
    cta: {
      title: "Ready to simplify healthcare administration?",
      body: "See how MapleRecord can help your organization modernize records management, automate workflows, and support HIPAA requirements.",
    },
  },
  {
    slug: "education",
    label: "Education",
    kind: "industry",
    officialUrl: "https://maplerecord.com/solution/education/",
    title: "MapleRecord for education",
    description:
      "Modernize academic administration with secure student record management, automated workflows, and controls that support FERPA requirements, for K–12 schools, colleges, and universities.",
    metaDescription: "Secure student record management, automated workflows and controls that support FERPA requirements, for K–12 schools, colleges and universities.",
    tagline: "Transcript requests · Student records · FERPA requirements",
    image: mrScreens.formsDashboard,
    challenges: {
      heading: "Education industry challenges",
      intro:
        "Educational institutions face pressure to manage student records securely, respond to transcript requests quickly, and reduce administrative burden while maintaining regulatory compliance.",
      items: [
        {
          title: "Record request delays",
          body: "Manual processing of transcript and student record requests causes delays, raises costs, and frustrates students, especially when documentation is spread across multiple systems.",
        },
        {
          title: "Student records management",
          body: "Student files, academic records, enrollment documents, and administrative records are spread across distributed campuses and legacy systems.",
        },
        {
          title: "FERPA compliance",
          body: "Institutions must meet FERPA privacy rules, state regulations, and audit requirements while protecting student privacy and keeping every record traceable.",
        },
      ],
    },
    modules: {
      heading: "How MapleRecord serves education",
      items: [
        {
          module: "mr-records",
          title: "Intelligent records management",
          body: "A central repository for student records, academic transcripts, enrollment documents, and administrative files, with automated retention and security controls that support FERPA requirements.",
          bullets: [
            "Unified storage for student and administrative records",
            "AI-powered document classification and indexing",
            "Automated retention based on record type and regulations",
            "Integration with student information systems",
          ],
        },
        {
          module: "mr-requests",
          title: "Request intake and management",
          body: "Respond faster to transcript requests, student record inquiries, verification requests, and subpoenas with intelligent search and controlled retrieval.",
          bullets: [
            "Fast response to transcript and record requests",
            "Automated handling of verification and authorization forms",
            "Regulatory audit and compliance support",
            "Complete request tracking and audit trails",
          ],
        },
        {
          module: "mr-workflows",
          title: "Workflow management",
          body: "Automate transcript requests, enrollment processing, records transfers, and administrative tasks with AI-enabled workflow orchestration.",
          bullets: [
            "End-to-end transcript request automation",
            "Enrollment and registration workflows",
            "Student records transfer and verification",
            "Real-time workflow analytics and reporting",
          ],
        },
      ],
    },
    impact: {
      heading: "Potential impact for educational institutions",
      items: [
        { value: "3×", label: "Faster fulfillment", body: "For transcript and record requests." },
        { value: "60%", label: "Reduced admin work", body: "Across manual administrative tasks." },
        { value: "100%", label: "Audit traceability", body: "Complete audit trails for compliance." },
        { value: "✓", label: "Improved student experience", body: "Through faster, more transparent responses." },
      ],
    },
    useCases: {
      heading: "Education use cases",
      items: [
        {
          title: "Transcript requests",
          body: "Automate transcript request intake, verification, record retrieval, processing, and delivery, with audit trails and access controls that support FERPA requirements.",
        },
        {
          title: "Student records management",
          body: "Centralize academic records, enrollment documents, disciplinary files, and administrative documents with automated retention management.",
        },
        {
          title: "Enrollment processing",
          body: "Streamline admissions, registration, enrollment verification, and records transfer with automated workflow routing and approval.",
        },
        {
          title: "Compliance & audits",
          body: "Automate compliance reporting, audit preparation, regulatory filings, and record retention with built-in governance controls.",
        },
        {
          title: "Verification services",
          body: "Process degree verifications, employment verifications, background checks, and third-party authorization requests efficiently.",
        },
        {
          title: "Records transfer",
          body: "Share records securely between institutions, districts, and external parties, with controls that support FERPA requirements.",
        },
      ],
    },
    security: {
      heading: "Built for education security",
      intro: "MapleRecord is designed to support the security and compliance requirements of K–12 schools, colleges, universities, and school districts.",
      items: [
        "Enterprise-grade security and data protection",
        "Supports FERPA requirements and audit readiness",
        "Scales across multi-campus operations",
        "One connected platform for records, requests, and workflows",
        "Designed for reliability and operational continuity",
      ],
    },
    cta: {
      title: "Ready to modernize campus administration?",
      body: "See how MapleRecord can help your institution modernize student records management, automate workflows, and support FERPA requirements.",
    },
  },
  {
    slug: "manufacturing",
    label: "Manufacturing",
    kind: "industry",
    officialUrl: "https://maplerecord.com/solution/manufacturing/",
    title: "MapleRecord for manufacturing",
    description:
      "Streamline quality documentation, manage compliance records, and automate production workflows with intelligent document management built for manufacturers.",
    metaDescription: "Streamline quality documentation, manage compliance records and automate manufacturing workflows with intelligent document management.",
    tagline: "Quality records · ISO certification · Audit readiness",
    image: mrScreens.workflowsRuns,
    challenges: {
      heading: "Manufacturing industry challenges",
      intro:
        "Manufacturers face pressure to maintain quality documentation, meet regulatory requirements, manage supply chain records, and drive operational efficiency across production facilities.",
      items: [
        {
          title: "Quality documentation",
          body: "Manual handling of quality records, inspection reports, and test results causes delays and raises costs, especially when documentation is spread across multiple systems.",
        },
        {
          title: "Compliance records",
          body: "ISO certifications, safety documentation, environmental permits, and regulatory filings must be managed across distributed manufacturing sites.",
        },
        {
          title: "Audit preparedness",
          body: "Regulatory audits, customer inspections, and certification renewals demand complete traceability and documentation control.",
        },
      ],
    },
    modules: {
      heading: "How MapleRecord serves manufacturing",
      items: [
        {
          module: "mr-records",
          title: "Intelligent records management",
          body: "A central repository for quality records, technical documentation, compliance certificates, and operational files, with automated retention and version control.",
          bullets: [
            "Unified storage for quality and compliance documentation",
            "AI-powered document classification and indexing",
            "Automated retention based on document type and regulations",
            "Integration with ERP and manufacturing systems",
          ],
        },
        {
          module: "mr-requests",
          title: "Request intake and management",
          body: "Respond faster to quality documentation requests, customer audits, regulatory inquiries, and certification renewals with intelligent search and retrieval.",
          bullets: [
            "Fast response to quality and certification requests",
            "Automated handling of customer audit documentation",
            "Regulatory audit and compliance support",
            "Complete request tracking and audit trails",
          ],
        },
        {
          module: "mr-workflows",
          title: "Workflow management",
          body: "Automate quality approvals, document control, change management, and compliance reporting with AI-enabled workflow orchestration.",
          bullets: [
            "End-to-end quality document approval automation",
            "Engineering change order (ECO) workflows",
            "Non-conformance and CAPA process automation",
            "Real-time workflow analytics and reporting",
          ],
        },
      ],
    },
    impact: {
      heading: "Potential impact for manufacturers",
      items: [
        { value: "50%", label: "Faster documentation", body: "Reduction in quality document processing time." },
        { value: "60%", label: "Reduced admin work", body: "Across manual compliance tasks." },
        { value: "100%", label: "Audit traceability", body: "Complete audit trails for quality and compliance." },
        { value: "✓", label: "Improved audit readiness", body: "Through organized, accessible documentation." },
      ],
    },
    useCases: {
      heading: "Manufacturing use cases",
      items: [
        {
          title: "Quality management",
          body: "Centralize quality records, inspection reports, test results, and certifications, with automated workflows for non-conformance and corrective actions.",
        },
        {
          title: "ISO certification",
          body: "Keep the documentation behind ISO 9001, ISO 14001, and industry-specific certifications under document control, with version management and audit trails.",
        },
        {
          title: "Engineering documentation",
          body: "Manage technical drawings, specifications, bills of materials (BOMs), and engineering change orders with version control and approval workflows.",
        },
        {
          title: "Compliance & audits",
          body: "Streamline regulatory compliance, customer audits, and certification renewals with centralized documentation and automated reporting.",
        },
        {
          title: "Supplier quality",
          body: "Track supplier certifications, quality agreements, inspection reports, and performance documentation across your supply chain.",
        },
        {
          title: "Safety & environmental",
          body: "Manage safety data sheets, environmental permits, incident reports, and compliance documentation with automated retention.",
        },
      ],
    },
    security: {
      heading: "Built for manufacturing security",
      intro:
        "MapleRecord is designed to support the security and compliance requirements of manufacturers, from aerospace and automotive to pharmaceuticals and electronics.",
      items: [
        "Enterprise-grade security and data protection",
        "Supports regulatory requirements and audit readiness",
        "Scales across multi-site manufacturing operations",
        "One connected platform for records, requests, and workflows",
        "Designed for reliability and operational continuity",
      ],
    },
    cta: {
      title: "Ready to transform your manufacturing operations?",
      body: "See how MapleRecord can help you modernize quality documentation, automate compliance workflows, and stay audit-ready.",
    },
  },
  {
    slug: "state-local-government",
    label: "State & Local Government",
    kind: "industry",
    officialUrl: "https://maplerecord.com/solution/state-local/",
    title: "MapleRecord for state & local government",
    description:
      "Modernize public records management with secure document handling, automated FOIA processing, and workflows that support public records laws, built for state agencies, counties, municipalities, and public institutions.",
    metaDescription: "Secure document handling, automated FOIA processing and workflows that support public records laws, for state agencies, counties and municipalities.",
    tagline: "FOIA requests · Public records · Retention schedules",
    image: mrScreens.requestsRedaction,
    challenges: {
      heading: "Government sector challenges",
      intro:
        "State and local governments face pressure to respond to public records requests quickly, maintain transparency, comply with retention laws, and manage legacy documentation systems.",
      items: [
        {
          title: "FOIA request backlog",
          body: "Manual processing of Freedom of Information Act (FOIA) and public records requests causes delays, raises costs, and frustrates the public, especially when documentation is spread across departments.",
        },
        {
          title: "Records management",
          body: "Public records, administrative documents, permits, licenses, and legacy files are spread across distributed agencies and aging systems.",
        },
        {
          title: "Compliance & transparency",
          body: "Agencies must meet state and federal regulations, public records laws, retention schedules, and audit requirements while staying transparent and accountable.",
        },
      ],
    },
    modules: {
      heading: "How MapleRecord serves state and local government",
      items: [
        {
          module: "mr-records",
          title: "Intelligent records management",
          body: "A central repository for public records, administrative documents, permits, licenses, and historical files, with automated retention schedules and access controls.",
          bullets: [
            "Unified storage for public and administrative records",
            "AI-powered document classification and indexing",
            "Automated retention based on state retention schedules",
            "Integration with legacy government systems",
          ],
        },
        {
          module: "mr-requests",
          title: "Request intake and management",
          body: "Respond faster to FOIA requests, public records inquiries, subpoenas, and information requests with intelligent search and controlled retrieval.",
          bullets: [
            "Fast response to FOIA and public records requests",
            "Automated redaction and exemption handling",
            "Regulatory audit and compliance support",
            "Complete request tracking and audit trails",
          ],
        },
        {
          module: "mr-workflows",
          title: "Workflow management",
          body: "Automate permit processing, license renewals, records requests, and administrative tasks with AI-enabled workflow orchestration.",
          bullets: [
            "End-to-end FOIA request automation",
            "Permit and license processing workflows",
            "Inter-departmental routing and collaboration",
            "Real-time workflow analytics and reporting",
          ],
        },
      ],
    },
    impact: {
      heading: "Potential impact for government agencies",
      items: [
        { value: "70%", label: "Faster FOIA response", body: "Reduction in public records request fulfillment time." },
        { value: "55%", label: "Reduced admin costs", body: "Decrease in manual processing and administrative overhead." },
        { value: "100%", label: "Compliance traceability", body: "Complete audit trails for transparency and accountability." },
        { value: "✓", label: "Improved public trust", body: "Through transparent, timely responses." },
      ],
    },
    useCases: {
      heading: "Government use cases",
      items: [
        {
          title: "FOIA request processing",
          body: "Automate FOIA request intake, search, review, redaction, approval, and delivery, with complete audit trails.",
        },
        {
          title: "Public records management",
          body: "Centralize meeting minutes, ordinances, resolutions, contracts, and historical records with automated retention schedule management.",
        },
        {
          title: "Permits & licenses",
          body: "Streamline building permits, business licenses, zoning approvals, and inspections with automated workflow routing and tracking.",
        },
        {
          title: "Compliance & audits",
          body: "Automate compliance reporting, audit preparation, state reporting requirements, and record retention with built-in governance controls.",
        },
        {
          title: "Inter-agency collaboration",
          body: "Share documents securely between departments, agencies, and jurisdictions while maintaining proper access controls.",
        },
        {
          title: "Historical archives",
          body: "Digitize and preserve historical records, vital records, and legacy documents with long-term retention and public access capabilities.",
        },
      ],
    },
    security: {
      heading: "Built for government security",
      intro:
        "MapleRecord is designed to support the security and compliance requirements of state agencies, municipal governments, county offices, and public institutions.",
      items: [
        "Enterprise-grade security and data protection",
        "Supports public records law and FOIA requirements",
        "Scales across multi-agency government operations",
        "One connected platform for records, requests, and workflows",
        "Designed for transparency and public accountability",
      ],
    },
    cta: {
      title: "Ready to transform your public sector operations?",
      body: "See how MapleRecord can help your agency modernize public records management, automate FOIA processing, and support transparency and compliance.",
    },
  },
  {
    slug: "finance-accounting",
    label: "Finance & Accounting",
    kind: "department",
    officialUrl: "https://maplerecord.com/solution/finance-accounting/",
    title: "MapleRecord for finance & accounting",
    description:
      "Streamline financial document management, automate accounting workflows, and support regulatory compliance with intelligent solutions designed for finance and accounting departments.",
    metaDescription: "Streamline financial document management, automate accounting workflows and support regulatory compliance for finance and accounting departments.",
    tagline: "Accounts payable · Financial close · Audit readiness",
    image: mrScreens.recordsAudit,
    challenges: {
      heading: "Finance & accounting challenges",
      intro:
        "Finance and accounting teams manage vast amounts of financial documents while staying audit-ready, keeping versions controlled, and meeting regulatory deadlines.",
      items: [
        {
          title: "Manual document processing",
          body: "Processing invoices, receipts, expense reports, and financial statements by hand creates bottlenecks and delays the month-end close.",
        },
        {
          title: "Audit & compliance risk",
          body: "Maintaining audit trails, enforcing retention rules, and retrieving records quickly for audits and regulatory reviews is difficult.",
        },
        {
          title: "Data security concerns",
          body: "Sensitive financial data needs proper access controls and must stay compliant with SOX, GDPR, and other financial regulations.",
        },
      ],
    },
    workflow: {
      heading: "How a finance or audit request flows, end to end",
      steps: [
        {
          title: "A financial or audit request is initiated",
          body: "Information requests related to audits, vendors, or internal reviews are captured and tracked with defined timelines.",
        },
        {
          title: "Relevant financial records are retrieved securely",
          body: "Invoices, contracts, financial statements, and audit documents are accessed from a governed, centralized repository with full version history.",
        },
        {
          title: "Reviews and approvals are automated",
          body: "Approval workflows route documents through finance managers, compliance teams, and leadership based on predefined rules.",
        },
        {
          title: "An audit-ready outcome is delivered",
          body: "Requests are completed on time with secure delivery, full traceability, and audit-ready documentation.",
        },
      ],
    },
    impact: {
      heading: "Potential impact for finance teams",
      items: [
        { value: "75%", label: "Faster month-end close", body: "Reduction in time spent on financial close processes." },
        { value: "60%", label: "Reduced processing time", body: "Decrease in invoice and expense report processing time." },
        { value: "100%", label: "Audit readiness", body: "Complete audit trails and compliance documentation." },
        { value: "85%", label: "Improved accuracy", body: "Reduction in manual data entry errors." },
      ],
    },
    useCases: {
      heading: "Finance & accounting use cases",
      items: [
        {
          title: "Accounts payable automation",
          body: "Automate invoice receipt, data extraction, approval routing, payment processing, and vendor record updates with full audit trails.",
        },
        {
          title: "Expense management",
          body: "Streamline expense report submission, receipt validation, approval workflows, and reimbursement with policy compliance checks.",
        },
        {
          title: "Financial close management",
          body: "Accelerate month-end and year-end close with automated checklist management, document collection, and reconciliation workflows.",
        },
        {
          title: "Audit & compliance",
          body: "Prepare for audits with automated document gathering, audit trail generation, compliance reporting, and secure auditor access.",
        },
        {
          title: "Tax document management",
          body: "Organize tax documents, forms, filings, and supporting documentation with automated retention and retrieval.",
        },
        {
          title: "Contract & agreement tracking",
          body: "Manage vendor contracts, service agreements, and financial commitments with automated renewal alerts and compliance monitoring.",
        },
      ],
    },
    security: {
      heading: "Built for financial security",
      intro: "MapleRecord is designed to support the security and compliance requirements of finance and accounting departments across industries.",
      items: [
        "Complete audit trails that support SOX requirements",
        "Encryption and data protection",
        "Role-based access controls and segregation of duties",
        "Automated retention policies for tax and regulatory requirements",
        "Integration with ERP systems (SAP, Oracle, NetSuite, QuickBooks)",
      ],
    },
    cta: {
      title: "Ready to transform your finance operations?",
      body: "See how MapleRecord can help your finance team automate document processing, accelerate the financial close, and stay audit-ready.",
    },
  },
  {
    slug: "legal-compliance",
    label: "Legal & Compliance",
    kind: "department",
    officialUrl: "https://maplerecord.com/solution/legal-compliance/",
    title: "MapleRecord for legal & compliance",
    description:
      "Centralize legal document management, automate compliance workflows, and reduce risk with intelligent solutions designed for legal and compliance departments.",
    tagline: "Legal hold · eDiscovery · Retention and disposal",
    image: mrScreens.recordsLifecycle,
    challenges: {
      heading: "Legal & compliance challenges",
      intro:
        "Legal and compliance teams face mounting pressure to manage complex regulatory requirements, maintain retention policies, respond to legal requests, and reduce organizational risk.",
      items: [
        {
          title: "Slow legal responses",
          body: "Scattered documents and manual searches delay responses to litigation holds, discovery requests, and regulatory inquiries.",
        },
        {
          title: "Compliance risk exposure",
          body: "Tracking regulatory changes, enforcing policies and retention schedules, and demonstrating compliance to auditors is difficult.",
        },
        {
          title: "Document fragmentation",
          body: "Contracts, agreements, policies, and legal records are scattered across departments, systems, and locations without central governance.",
        },
      ],
    },
    workflow: {
      heading: "How a legal or compliance request flows, end to end",
      steps: [
        {
          title: "A legal or compliance request is received",
          body: "Litigation holds, discovery requests, regulatory inquiries, and internal compliance reviews are logged and tracked with defined deadlines.",
        },
        {
          title: "Relevant documents are identified and preserved",
          body: "Contracts, policies, communications, and records are located with intelligent search and placed on legal hold automatically, with preservation notices.",
        },
        {
          title: "Review and approval workflows run",
          body: "Documents route through legal counsel, compliance officers, and stakeholders for review, redaction, and approval based on matter type.",
        },
        {
          title: "A documented production is delivered",
          body: "Responsive documents are produced in the required formats with proper redactions, privilege logs, and complete chain-of-custody documentation.",
        },
      ],
    },
    impact: {
      heading: "Potential impact for legal teams",
      items: [
        { value: "80%", label: "Faster response times", body: "Reduction in time to respond to discovery and legal requests." },
        { value: "70%", label: "Lower legal costs", body: "Decrease in external legal and eDiscovery expenses." },
        { value: "100%", label: "Audit trail coverage", body: "Complete audit trails and regulatory documentation." },
        { value: "90%", label: "Risk reduction", body: "Improvement in compliance adherence and policy enforcement." },
      ],
    },
    useCases: {
      heading: "Legal & compliance use cases",
      items: [
        {
          title: "Contracts and agreements",
          body: "Centralize contracts and agreements, route them for review and approval, and track renewals with automated alerts for key dates and obligations.",
        },
        {
          title: "Legal hold & eDiscovery",
          body: "Implement litigation holds, preserve relevant documents, run defensible searches, and manage discovery production with complete audit trails.",
        },
        {
          title: "Regulatory compliance management",
          body: "Track regulatory requirements, maintain compliance documentation, automate policy updates, and generate regulatory reports for audits.",
        },
        {
          title: "Policy & procedure management",
          body: "Create and distribute corporate policies, procedures, and compliance guidelines with version control and acknowledgment tracking.",
        },
        {
          title: "Legal matter management",
          body: "Organize documents by matter and track case timelines and deadlines, with central visibility across every open matter.",
        },
        {
          title: "Records retention & disposal",
          body: "Automate retention schedules, dispose of expired records properly, keep defensible destruction records, and reduce storage costs.",
        },
      ],
    },
    security: {
      heading: "Built for legal security",
      intro:
        "MapleRecord is designed to support the security and compliance requirements of legal and compliance departments handling sensitive and privileged information.",
      items: [
        "Restricted access to privileged documents and ethical walls",
        "Legal hold management with defensible preservation",
        "Role-based access controls and need-to-know restrictions",
        "Automated retention and defensible deletion policies",
        "Integration with contract management and legal tech platforms",
      ],
    },
    cta: {
      title: "Ready to transform your legal operations?",
      body: "See how MapleRecord can help your legal and compliance team respond faster, reduce legal costs, and lower organizational risk.",
    },
  },
  {
    slug: "human-resources",
    label: "Human Resources",
    kind: "department",
    officialUrl: "https://maplerecord.com/solution/human-resource/",
    title: "MapleRecord for human resources",
    description:
      "Streamline employee records management, automate HR workflows, and support compliance with comprehensive document management built for modern HR departments.",
    metaDescription: "Streamline employee records management, automate HR workflows and support compliance with document management built for HR departments.",
    tagline: "Employee records · Verification requests · Onboarding",
    image: mrScreens.formsSubmissions,
    challenges: {
      heading: "Human resources challenges",
      intro:
        "HR teams manage employee files across multiple systems, respond to internal requests, comply with employment regulations, and protect sensitive employee information.",
      items: [
        {
          title: "Manual record retrieval",
          body: "Finding employment records, certifications, and performance documents means searching file cabinets, shared drives, and multiple systems.",
        },
        {
          title: "Compliance & data privacy risks",
          body: "Maintaining EEOC compliance, managing retention schedules, protecting PII, and answering verification and audit requests is difficult.",
        },
        {
          title: "Fragmented employee records",
          body: "Employee files are scattered across HR systems, payroll platforms, email, and physical storage, with no single source of truth or version control.",
        },
      ],
    },
    workflow: {
      heading: "How an HR request flows, end to end",
      steps: [
        {
          title: "An HR request or process is initiated",
          body: "Employee and internal requests such as onboarding, document access, or policy acknowledgments are captured and tracked with defined timelines.",
        },
        {
          title: "Relevant employee records are retrieved securely",
          body: "Personnel files, contracts, policies, and historical documents are accessed from a centralized, governed repository with full version history.",
        },
        {
          title: "Reviews and approvals are automated",
          body: "Workflow automation routes tasks through HR managers, legal, and leadership based on predefined rules and roles.",
        },
        {
          title: "A secure outcome is delivered",
          body: "Requests are completed on time with controlled access, secure delivery, and full audit traceability.",
        },
      ],
    },
    impact: {
      heading: "Potential impact for HR teams",
      items: [
        { value: "30–45%", label: "Faster request processing", body: "For employee requests." },
        { value: "60%", label: "Reduction in manual work", body: "Across HR administrative tasks." },
        { value: "100%", label: "Audit traceability", body: "Across employee records and workflows." },
        { value: "✓", label: "Improved data privacy and compliance", body: "Across employee records and requests." },
      ],
    },
    useCases: {
      heading: "Human resources use cases",
      items: [
        {
          title: "Employee records management",
          body: "Centralize complete employee files from hire to retire, including applications, onboarding paperwork, performance reviews, and exit documentation.",
        },
        {
          title: "Employment verification",
          body: "Automate responses to verification requests from lenders, background screeners, and government agencies, with proper authorization and audit trails.",
        },
        {
          title: "Onboarding & offboarding",
          body: "Streamline new hire paperwork, document signing, and offboarding checklists with automated workflows and status tracking.",
        },
        {
          title: "Compliance & audit support",
          body: "Maintain I-9s, EEOC reports, FMLA documentation, and other compliance records with proper retention and easy retrieval for audits and investigations.",
        },
        {
          title: "Training & certifications",
          body: "Track mandatory training, professional licenses, certifications, and continuing education with automated expiration alerts and renewals.",
        },
        {
          title: "Benefits administration",
          body: "Organize enrollment forms, beneficiary designations, leave requests, and benefits communications with secure employee self-service access.",
        },
      ],
    },
    security: {
      heading: "Built for HR security",
      intro: "MapleRecord is designed to support the security and privacy requirements of HR departments managing sensitive employee personal information.",
      items: [
        "PII and PHI protection with encryption at rest and in transit",
        "Role-based access controls for employee confidentiality",
        "Automated retention schedules for employment records",
        "EEOC, FLSA, FMLA, and labor law compliance support",
        "Integration with HRIS, payroll, and benefits platforms",
      ],
    },
    cta: {
      title: "Ready to transform your HR operations?",
      body: "See how MapleRecord can help your HR team streamline employee records management, fulfill requests faster, and support compliance.",
    },
  },
  {
    slug: "operations",
    label: "Operations",
    kind: "department",
    officialUrl: "https://maplerecord.com/solution/operations/",
    title: "MapleRecord for operations",
    description:
      "Optimize operational workflows, centralize process documentation, and support supply chain compliance with intelligent document management built for operations teams.",
    metaDescription: "Optimize operational workflows, centralize process documentation and support supply chain compliance with document management for operations teams.",
    tagline: "Vendor onboarding · SOPs · Quality records",
    image: mrScreens.workflowsList,
    challenges: {
      heading: "Operations challenges",
      intro:
        "Operations teams manage vendor documentation, standard operating procedures, quality certifications, and supply chain visibility across complex workflows.",
      items: [
        {
          title: "Slow vendor onboarding",
          body: "Collecting, verifying, and approving vendor documentation, including insurance certificates, compliance documents, and quality certifications, takes too long.",
        },
        {
          title: "Document fragmentation",
          body: "SOPs, work instructions, quality records, and operational documents are scattered across departments, systems, and locations without version control.",
        },
        {
          title: "Compliance & quality risks",
          body: "Tracking certifications, maintaining audit trails, supporting ISO quality requirements, and demonstrating quality control for regulatory inspections is difficult.",
        },
      ],
    },
    workflow: {
      heading: "How an operational request flows, end to end",
      steps: [
        {
          title: "An operational request or process is initiated",
          body: "Requests related to process changes, approvals, or documentation are captured and tracked with defined timelines.",
        },
        {
          title: "Relevant operational records are accessed securely",
          body: "SOPs, process documents, policies, and records are retrieved from a centralized, governed repository with full version history.",
        },
        {
          title: "Tasks and approvals are automated",
          body: "Workflow automation routes tasks across operations, compliance, and leadership teams based on predefined rules.",
        },
        {
          title: "Execution is completed with full visibility",
          body: "Requests are resolved on time with real-time tracking, controlled access, and audit-ready documentation.",
        },
      ],
    },
    impact: {
      heading: "Potential impact for operations teams",
      items: [
        { value: "70%", label: "Faster vendor onboarding", body: "Reduction in time to onboard and verify vendor documentation." },
        { value: "65%", label: "Process efficiency gains", body: "Decrease in time spent searching for operational documents." },
        { value: "100%", label: "Quality traceability", body: "Complete audit trails for ISO and regulatory compliance." },
        { value: "80%", label: "Supply chain visibility", body: "Improvement in vendor documentation and compliance tracking." },
      ],
    },
    useCases: {
      heading: "Operations use cases",
      items: [
        {
          title: "Vendor & supplier management",
          body: "Centralize vendor contracts, insurance certificates, quality certifications, and compliance documentation, with automated expiration tracking and alerts.",
        },
        {
          title: "Standard operating procedures",
          body: "Create and distribute SOPs, work instructions, and process documentation across facilities with version control and acknowledgment tracking.",
        },
        {
          title: "Quality management",
          body: "Maintain inspection records, quality control documentation, corrective action reports, and non-conformance tracking with ISO compliance support.",
        },
        {
          title: "Supply chain documentation",
          body: "Track purchase orders, shipping documents, bills of lading, customs documentation, and supply chain records with real-time visibility.",
        },
        {
          title: "Equipment & asset management",
          body: "Organize maintenance records, calibration certificates, equipment manuals, and asset documentation in one searchable, version-controlled repository.",
        },
        {
          title: "Safety & compliance",
          body: "Manage safety data sheets, training records, incident reports, and compliance documentation for OSHA and environmental regulations.",
        },
      ],
    },
    security: {
      heading: "Built for operational excellence",
      intro:
        "MapleRecord is designed for operations teams managing critical process documentation, vendor compliance, and quality control records.",
      items: [
        "ISO 9001, AS9100, and quality management system support",
        "Version control and change management for SOPs and procedures",
        "Automated certification and compliance tracking with alerts",
        "Complete audit trails for regulatory inspections and audits",
        "Integration with ERP, procurement, and supply chain systems",
      ],
    },
    cta: {
      title: "Ready to optimize your operations?",
      body: "See how MapleRecord can help your operations team streamline vendor management, improve process efficiency, and support quality compliance.",
    },
  },
  {
    slug: "research-development",
    label: "Research & Development",
    kind: "department",
    officialUrl: "https://maplerecord.com/solution/research-development/",
    title: "MapleRecord for R&D",
    description:
      "Accelerate innovation cycles, protect intellectual property, streamline regulatory submissions, and support research compliance with intelligent document management built for R&D teams.",
    metaDescription: "Protect intellectual property, streamline regulatory submissions and support research compliance with intelligent document management for R&D teams.",
    tagline: "Lab records · IP protection · Regulatory submissions",
    image: mrScreens.recordsFiles,
    challenges: {
      heading: "R&D challenges",
      intro:
        "Research and development teams manage experimental data, protect intellectual property, maintain lab notebooks, coordinate regulatory submissions, and stay compliant across multi-year research initiatives.",
      items: [
        {
          title: "Slow research documentation",
          body: "Organizing lab notebooks, experimental data, protocols, and findings across many projects and research teams takes time.",
        },
        {
          title: "IP & data fragmentation",
          body: "Patents, trade secrets, research data, and other intellectual property sit across departments, labs, and legacy systems without version control or proper security.",
        },
        {
          title: "Regulatory & compliance risks",
          body: "Maintaining FDA, EPA, or international regulatory compliance, managing clinical trial documentation, and preparing audit-ready submissions is difficult.",
        },
      ],
    },
    workflow: {
      heading: "How a research request flows, end to end",
      steps: [
        {
          title: "A research activity or request is initiated",
          body: "Research documentation requests, experiment approvals, and design changes are captured and tracked with defined timelines.",
        },
        {
          title: "Relevant research records are accessed securely",
          body: "Research files, design documents, test results, and reports are retrieved from a centralized, governed repository with full version history.",
        },
        {
          title: "Reviews and approvals are automated",
          body: "Workflow automation routes documents through reviewers, leads, compliance, and management teams based on predefined rules.",
        },
        {
          title: "Research outcomes are finalized with traceability",
          body: "Records are secured, versioned, and retained with full audit trails to support validation, audits, and future reference.",
        },
      ],
    },
    impact: {
      heading: "Potential impact for R&D teams",
      items: [
        { value: "60%", label: "Faster innovation cycles", body: "Reduction in time from research to regulatory submission." },
        { value: "75%", label: "Research efficiency gains", body: "Decrease in time spent searching for experimental data." },
        { value: "100%", label: "IP protection & traceability", body: "Complete audit trails for patents and regulatory compliance." },
        { value: "85%", label: "Regulatory submission speed", body: "Improvement in assembling submission packages." },
      ],
    },
    useCases: {
      heading: "Research & development use cases",
      items: [
        {
          title: "Lab notebook records",
          body: "Digitize and organize lab notebooks, experimental protocols, raw data, and observations as governed records, with timestamps and secure access controls.",
        },
        {
          title: "Intellectual property management",
          body: "Centralize patent applications, invention disclosures, trade secrets, and IP documentation with secure version control and confidentiality protection.",
        },
        {
          title: "Regulatory submissions",
          body: "Streamline FDA, EPA, EMA, and international regulatory submissions with organized documentation packages and compliance tracking.",
        },
        {
          title: "Clinical trial documentation",
          body: "Manage clinical study protocols, informed consent forms, case report forms, and trial master files with GCP compliance support.",
        },
        {
          title: "Research collaboration",
          body: "Share research data, protocols, and findings securely with internal teams, external partners, and academic collaborators.",
        },
        {
          title: "Quality & validation records",
          body: "Maintain validation protocols, test methods, quality control records, and technical documentation with complete audit trails.",
        },
      ],
    },
    security: {
      heading: "Built for research excellence",
      intro:
        "MapleRecord is designed for research teams managing sensitive experimental data, intellectual property, and regulatory submissions.",
      items: [
        "IP protection with encryption and access controls",
        "Complete audit trails for regulatory inspections and patent defense",
        "Integration with LIMS, ELN, and research management systems",
        "Scales across complex and distributed R&D environments",
      ],
    },
    cta: {
      title: "Ready to accelerate your research?",
      body: "See how MapleRecord can help your research team streamline innovation, protect intellectual property, and support regulatory compliance.",
    },
  },
  {
    slug: "customer-service",
    label: "Customer Service",
    kind: "department",
    officialUrl: "https://maplerecord.com/solution/customer-service/",
    title: "MapleRecord for customer service",
    description:
      "Deliver exceptional customer experiences, resolve cases faster, centralize customer documentation, and support service compliance with intelligent document management built for customer service teams.",
    metaDescription: "Streamline case resolution, centralize customer documentation and support service compliance with document management for customer service teams.",
    tagline: "Case resolution · Contracts and warranties · SLA tracking",
    image: mrScreens.requestsDashboard,
    challenges: {
      heading: "Customer service challenges",
      intro:
        "Customer service teams contend with fragmented customer records, slow information retrieval during calls, inconsistent service documentation, and the demands of service level agreements and regulations.",
      items: [
        {
          title: "Slow case resolution",
          body: "Agents lose time finding customer history, contracts, warranties, and support documentation while customers wait on hold or in chat.",
        },
        {
          title: "Document fragmentation",
          body: "Customer records, service tickets, communication logs, and support materials are scattered across CRM systems, email, and shared drives.",
        },
        {
          title: "Compliance & SLA risks",
          body: "Tracking service level agreements, keeping audit trails for customer interactions, and meeting regulatory requirements for sensitive customer data is difficult.",
        },
      ],
    },
    workflow: {
      heading: "How a customer request flows, end to end",
      steps: [
        {
          title: "A customer inquiry or request is received",
          body: "Customer requests are captured, categorized, and tracked with defined response timelines.",
        },
        {
          title: "Relevant customer records are accessed quickly",
          body: "Account details, previous interactions, and supporting documents are retrieved securely from a centralized repository.",
        },
        {
          title: "Tasks and approvals are automated",
          body: "Workflow automation routes requests to the right teams based on issue type and priority.",
        },
        {
          title: "A timely, accurate response is delivered",
          body: "Requests are resolved with secure communication, full traceability, and audit-ready documentation.",
        },
      ],
    },
    impact: {
      heading: "Potential impact for service teams",
      items: [
        { value: "50%", label: "Faster case resolution", body: "Reduction in average handling time for customer inquiries." },
        { value: "70%", label: "Faster document retrieval", body: "Decrease in time spent searching for customer records." },
        { value: "95%", label: "SLA compliance rate", body: "Improvement in meeting service level commitments." },
        { value: "40%", label: "Higher customer satisfaction", body: "Increase in CSAT scores through faster, better-informed service." },
      ],
    },
    useCases: {
      heading: "Customer service use cases",
      items: [
        {
          title: "Customer record management",
          body: "Centralize customer files, contracts, communication records, and case documents, so agents see the full history during service interactions.",
        },
        {
          title: "Contract & warranty access",
          body: "Retrieve service contracts, warranty information, terms and conditions, and entitlements quickly while assisting customers.",
        },
        {
          title: "Knowledge base management",
          body: "Organize troubleshooting guides, FAQs, product manuals, and best practices for consistent, accurate support across all channels.",
        },
        {
          title: "Case documentation & escalation",
          body: "Track case history, document resolutions, manage escalations, and keep complete audit trails for quality assurance and training.",
        },
        {
          title: "Returns & refund processing",
          body: "Streamline return authorizations, refund requests, and exchange documentation with automated workflows and approval routing.",
        },
        {
          title: "Compliance & quality assurance",
          body: "Monitor SLA performance, track regulatory compliance for customer data, and maintain quality standards with complete interaction records.",
        },
      ],
    },
    security: {
      heading: "Built for customer service excellence",
      intro:
        "MapleRecord is designed for customer service teams managing sensitive customer information, service agreements, and regulatory obligations.",
      items: [
        "Supports GDPR, CCPA, and customer data privacy requirements",
        "Role-based access controls for sensitive customer information",
        "Complete audit trails for customer interactions and case handling",
        "SLA monitoring and automated alerts for compliance tracking",
        "Integration with CRM, ticketing, and communication platforms",
      ],
    },
    cta: {
      title: "Ready to transform your customer service?",
      body: "See how MapleRecord can help your service team resolve cases faster, improve satisfaction scores, and support service compliance.",
    },
  },
];

/** One-line summaries for the solutions directory cards (condensed from each page's description). */
export const mrSolutionSummaries: Record<string, string> = {
  "financial-services": "Loan files, KYC workflows and audit-ready records for banks, credit unions and investment firms.",
  insurance: "Faster claims, simpler policy administration and audit-ready records for carriers, brokers and MGAs.",
  healthcare: "Patient record requests and administrative records, with controls that support HIPAA requirements, for hospitals and clinics.",
  education: "Transcript requests and student records, with controls that support FERPA requirements, for K–12 schools and colleges.",
  manufacturing: "Quality documentation, ISO certification records and audit readiness across production sites.",
  "state-local-government": "FOIA processing, public records and retention schedules for agencies, counties and municipalities.",
  "finance-accounting": "Invoices, expenses and the month-end close, with audit trails ready for every review.",
  "legal-compliance": "Legal holds, eDiscovery, contracts and retention schedules under one governed system.",
  "human-resources": "Employee files from hire to retire, verification requests and HR workflows, kept private.",
  operations: "Vendor onboarding, SOPs and quality records with version control and certification tracking.",
  "research-development": "Lab records, intellectual property and regulatory submissions, versioned and access-controlled.",
  "customer-service": "Customer records, contracts and case history at hand for faster, traceable resolutions.",
};

/*
 * Presentation data for the solution pages (product screens and flow labels). These only choose which
 * recreated screen or module illustrates a point the page's sourced copy already makes; no new claims.
 */

/** Industry pages: the screen each module card shows (one per module, none repeating the hero screen). */
export const mrSolutionModuleScreens: Record<string, Partial<Record<MrModuleSlug, MrScreenKey>>> = {
  "financial-services": { "mr-records": "recordsAudit", "mr-requests": "requestsKanban", "mr-workflows": "workflowsRuns" },
  insurance: { "mr-records": "recordsLifecycle", "mr-requests": "requestsTriage", "mr-workflows": "workflowsList" },
  healthcare: { "mr-records": "recordsAudit", "mr-requests": "requestsRedaction", "mr-workflows": "workflowsRuns" },
  education: { "mr-records": "recordsSearch", "mr-requests": "requestsKanban", "mr-workflows": "workflowsList" },
  manufacturing: { "mr-records": "recordsFiles", "mr-requests": "requestsDashboard", "mr-workflows": "workflowsList" },
  "state-local-government": { "mr-records": "recordsRetention", "mr-requests": "requestsKanban", "mr-workflows": "workflowsCanvas" },
};

/**
 * Department pages: the module that carries each workflow step (intake, records, approvals, delivery) and
 * a short node label for the flow diagram, condensed from that step's own title and body.
 */
export const mrSolutionFlows: Record<string, { modules: MrModuleSlug[]; nodes: string[] }> = {
  "finance-accounting": {
    modules: ["mr-requests", "mr-records", "mr-workflows", "mr-requests"],
    nodes: ["Audit or vendor request logged", "Invoices and statements retrieved", "Finance and compliance sign-off", "Audit-ready delivery"],
  },
  "legal-compliance": {
    modules: ["mr-requests", "mr-records", "mr-workflows", "mr-requests"],
    nodes: ["Hold or discovery request logged", "Documents found and preserved", "Counsel review and redaction", "Production with chain of custody"],
  },
  "human-resources": {
    modules: ["mr-forms", "mr-records", "mr-workflows", "mr-requests"],
    nodes: ["Onboarding or access request", "Personnel file retrieved", "HR, legal and leadership approval", "Secure, traceable delivery"],
  },
  operations: {
    modules: ["mr-requests", "mr-records", "mr-workflows", "mr-requests"],
    nodes: ["Process change requested", "SOPs and records retrieved", "Tasks routed across teams", "Resolved with real-time tracking"],
  },
  "research-development": {
    modules: ["mr-requests", "mr-records", "mr-workflows", "mr-records"],
    nodes: ["Experiment approval requested", "Research files retrieved", "Reviewer and lead sign-off", "Versioned, retained record"],
  },
  "customer-service": {
    modules: ["mr-requests", "mr-records", "mr-workflows", "mr-requests"],
    nodes: ["Customer inquiry received", "Account history retrieved", "Routed by issue and priority", "Traceable response delivered"],
  },
};

/** A pointer under the use cases where a sibling page tells the same story in more depth. */
export const mrSolutionPointers: Record<string, { lead: string; slug: string; label: string }> = {
  "financial-services": { lead: "Insurance carrier, broker or MGA?", slug: "insurance", label: "See MapleRecord for insurance" },
};
