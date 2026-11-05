// Written from maplerecord.com (/contact-us), crawled 2026-11-03. Wording follows the official site,
// edited for clarity. The demo form fields are the ones MapleRecord's own form asks for.
export const mrContact = {
  eyebrow: "Contact MapleRecord",
  title: "Connect with our sales team to transform your records management",
  body: "Contact MapleRecord’s sales team to explore how MapleRecord can transform your organization and to get answers to your questions.",
  email: "info@maplerecord.com",
  phone: { display: "+1 (940) 945-6180", e164: "+19409456180" },
  offices: [
    { label: "Canada office", city: "Cobourg, Ontario", lines: ["739 D'Arcy St", "Cobourg, ON K9A 0H6", "Canada"] },
    { label: "USA office", city: "Aubrey, Texas", lines: ["26875 US Highway 380", "Aubrey, TX 76227", "USA"] },
  ],
  demo: {
    title: "Request a demo",
    body: "Demo requests go through MapleRecord’s own form on maplerecord.com. The form asks for:",
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
    body: "MapleRecord is a Maverick InnoGarage product. For records management programs, retention schedules and data governance around MapleRecord, you can also work with Maverick InnoGarage's consulting team.",
    action: "Talk to an expert",
  },
};
