import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import { company, isIndexable, siteUrl } from "@/config/site";
import { siteTitle } from "@/lib/metadata";
import { CookieConsent } from "@/features/consent/cookie-consent";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
// The Capability Matrix deck's typeface, for display headings only (body, navigation and UI stay in Geist).
const poppins = Poppins({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-poppins", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: `%s · ${company.name}` },
  description: company.positioning,
  applicationName: company.name,
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f4f3f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-scroll-behavior lets Next.js turn off the CSS smooth scrolling during route changes,
    // so a new page starts at the top instead of animating there.
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${poppins.variable}`} data-scroll-behavior="smooth">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
