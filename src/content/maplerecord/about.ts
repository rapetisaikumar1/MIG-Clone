// Written from maplerecord.com (/about-us), crawled 2026-11-03. Wording follows the official site.
// Edited for clarity only: value titles are short labels drawn from each value's own copy, mission and
// vision are split into a lead clause and the rest for display, and stat captions read as full sentences.
// No claims or figures were added. The story figure is a recreated product screen (screens.ts) with
// sample data; the module list reads "five modules" now that MR Admin is listed (owner-confirmed).
// Edited 2026-11-07 per the messaging guide: the story names Maverick InnoGarage as the company that designs and
// builds MapleRecord (owner-confirmed 2026-11-06), compliance is "supported" rather than guaranteed, and the CTA no
// longer implies a customer base. The figures below are MapleRecord's own published claims, pending owner substantiation.
// Consistency sweep (2026-11-07): the "Security first" value says "data protection" (not "end-to-end"), matching modules.ts.
import type { MrImage } from "@/lib/content/types";
import { mrScreens } from "./screens";

const image = (name: string, width: number, height: number, alt: string): MrImage => ({ src: `/maplerecord/${name}.webp`, width, height, alt });

export type MrAboutValueIcon = "shield" | "compliance" | "scale" | "ai";
export type MrAboutIndustryIcon = "finance" | "health" | "education" | "insurance" | "manufacturing" | "government";

export const mrAbout = {
  title: "About MapleRecord",
  tagline: "Transforming how organizations manage, share, and secure their critical documents through innovative records management solutions.",
  purpose: {
    eyebrow: "Mission and vision",
    title: "Why MapleRecord exists",
  },
  mission: {
    lead: "To help organizations gain control of their information ecosystem",
    rest: "by replacing fragmented systems and manual processes with secure, intelligent, and automated information management.",
  },
  vision: {
    lead: "To be the leading records management platform trusted by organizations worldwide,",
    rest: "setting the standard for secure, efficient, and intelligent document management.",
  },
  storyTitle: "Rethinking how organizations manage information",
  modulesTitle: "One platform, five modules",
  story: [
    "Maverick InnoGarage built MapleRecord to rethink how organizations manage information in a fast-changing digital world. As data volumes grow and regulations tighten, many teams still rely on fragmented tools and manual processes that slow them down.",
    "We built MapleRecord as an AI-driven platform that unifies records, requests, and workflows in one place. By simplifying how information is captured, governed, and shared, we help teams work faster and respond with confidence.",
    "Today, MapleRecord supports enterprises and public-sector organizations looking to modernize information management without added complexity. Our focus is on secure, scalable solutions that grow with our customers and keep teams focused on outcomes, not administration.",
    "MapleRecord is designed and built by Maverick InnoGarage, a software development and professional services company that also delivers AI governance, Adobe solutions and data management.",
  ],
  valuesTitle: "The principles behind the platform",
  values: [
    {
      icon: "shield",
      title: "Security first",
      body: "Enterprise-grade security, role-based access, and data protection are built into the platform.",
    },
    {
      icon: "compliance",
      title: "Compliance support built in",
      body: "Designed to support regulatory, retention, and audit requirements without adding operational burden.",
    },
    {
      icon: "scale",
      title: "Built to scale",
      body: "Built to handle high volumes of records, requests, and workflows across large, distributed organizations.",
    },
    {
      icon: "ai",
      title: "Practical AI",
      body: "AI is applied where it delivers real value (classification, discovery, routing, and insights) without unnecessary complexity.",
    },
  ] satisfies { icon: MrAboutValueIcon; title: string; body: string }[],
  numbersEyebrow: "MapleRecord by the numbers",
  numbersTitle: "Trusted by organizations to manage their critical documents and records",
  numbers: [
    { value: "5+", label: "Organizations", body: "Rely on MapleRecord for records management" },
    { value: "10M+", label: "Documents", body: "Managed securely on the platform" },
    { value: "99.9%", label: "Uptime", body: "A reliable platform you can count on" },
    { value: "24/7", label: "Support", body: "Help whenever you need it" },
  ],
  industriesTitle: "Solutions tailored to your sector",
  industries: [
    { name: "Financial services", body: "Banking, investment, and financial compliance solutions", solution: "financial-services", icon: "finance" },
    { name: "Healthcare", body: "Patient records management with access controls, audit trails and retention that support HIPAA requirements", solution: "healthcare", icon: "health" },
    { name: "Education", body: "Student records and academic document management", solution: "education", icon: "education" },
    { name: "Insurance", body: "Policy and claims document management", solution: "insurance", icon: "insurance" },
    { name: "Manufacturing", body: "Quality, compliance, and supply chain records", solution: "manufacturing", icon: "manufacturing" },
    { name: "Government", body: "Public-sector document and records management", solution: "state-local-government", icon: "government" },
  ] satisfies { name: string; body: string; solution: string; icon: MrAboutIndustryIcon }[],
  cta: {
    title: "See how MapleRecord can help your records management",
    body: "Discover how MapleRecord can help your organization streamline workflows, support compliance, and unlock the value in your documents.",
  },
  images: {
    hero: image("about-meeting", 1080, 608, "Four colleagues in business attire talking around a meeting table with a laptop"),
    /** Story figure: a recreated product screen (carries its own window label). */
    platform: mrScreens.requestsDashboard,
  },
};
