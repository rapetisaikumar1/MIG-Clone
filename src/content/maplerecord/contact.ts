// Written from maplerecord.com (/contact-us), crawled 2026-11-03. Wording follows the official site,
// edited for clarity. The demo fields are the ones MapleRecord's own form asks for. Office addresses
// are MapleRecord's, exactly as published on maplerecord.com/contact-us; Maverick InnoGarage's own office
// addresses (src/config/site.ts) appear in the site footer. The partner card describes Maverick InnoGarage as the
// company that designs and builds MapleRecord and offers professional services around it (messaging guide, 2026-11-07).
export const mrContact = {
  eyebrow: "Contact MapleRecord",
  title: "Connect with our sales team to transform your records management",
  body: "Contact MapleRecord’s sales team to explore how MapleRecord can transform your organization and to get answers to your questions.",
  email: "info@maplerecord.com",
  phone: { display: "+1 (940) 945-6180", e164: "+19409456180" },
  offices: [
    { label: "MapleRecord · Canada", city: "Cobourg, Ontario", lines: ["739 D'Arcy St", "Cobourg, ON K9A 0H6", "Canada"] },
    { label: "MapleRecord · USA", city: "Aubrey, Texas", lines: ["26875 US Highway 380", "Aubrey, TX 76227", "USA"] },
  ],
  officesNote: "Addresses as published on maplerecord.com/contact-us. Maverick InnoGarage’s office addresses are listed in the footer.",
  demo: {
    title: "Request a demo",
    body: "Demo requests use the form on maplerecord.com, MapleRecord’s product site. It asks for:",
    fields: ["Your name", "Business email", "Work phone", "Company", "Industry", "A short message"],
    action: "Open the demo form",
    note: "Opens maplerecord.com in a new tab.",
  },
  direct: {
    title: "Contact sales directly",
    body: "Email or call MapleRecord’s sales team with questions about the platform or your organization’s requirements.",
  },
  partner: {
    title: "Maverick InnoGarage, the company behind MapleRecord",
    body: "MapleRecord is designed and built by Maverick InnoGarage. For MapleRecord implementation and configuration, records management programs, retention schedules and data governance, you can also work with Maverick InnoGarage’s professional services team.",
    action: "Talk to an expert",
  },
};
