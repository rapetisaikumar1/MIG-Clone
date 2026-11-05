// Written from maplerecord.com (/blogs, /videos, /webinar, /events, /media), crawled 2026-11-03. Wording follows the official site.

export type MrResourceHub = {
  /** Picks the hub's icon on /maplerecord/resources. */
  kind: "videos" | "webinars" | "events" | "media";
  title: string;
  body: string;
  href: string;
};

/** Resource hubs on maplerecord.com. Their individual items are dated or unlinked, so we link to the hubs. */
export const mrResourceHubs: MrResourceHub[] = [
  { kind: "videos", title: "Videos", body: "Product demos, tutorials, customer success stories, and thought leadership content to help you master records management.", href: "https://maplerecord.com/videos/" },
  { kind: "webinars", title: "Webinars", body: "Live sessions and on-demand content covering records management, compliance, and digital transformation.", href: "https://maplerecord.com/webinar/" },
  { kind: "events", title: "Events", body: "Industry conferences, workshops, webinars, and exclusive events designed to help you master records management.", href: "https://maplerecord.com/events/" },
  { kind: "media", title: "Media & press", body: "The latest news, press releases, and media resources about MapleRecord.", href: "https://maplerecord.com/media/" },
];
