// Written from maplerecord.com (/blogs, /videos, /webinar, /events, /media), crawled 2026-11-03. Wording follows the official site
// (the Events line is trimmed so it doesn't repeat the Videos and Webinars cards). Claims check (2026-11-07,
// messaging guide §3): the Videos line no longer mentions "customer success stories", since case studies need owner
// confirmation and the hub's video items are unlinked (docs/MAPLERECORD-SOURCES.md).

export type MrResourceHub = {
  /** Picks the hub's icon on /maplerecord/resources. */
  kind: "videos" | "webinars" | "events" | "media";
  title: string;
  body: string;
  href: string;
};

/** Resource hubs on maplerecord.com. Their individual items are dated or unlinked, so we link to the hubs. */
export const mrResourceHubs: MrResourceHub[] = [
  { kind: "videos", title: "Videos", body: "Product demos, tutorials, and thought leadership content to help you master records management.", href: "https://maplerecord.com/videos/" },
  { kind: "webinars", title: "Webinars", body: "Live sessions and on-demand content covering records management, compliance, and digital transformation.", href: "https://maplerecord.com/webinar/" },
  { kind: "events", title: "Events", body: "Industry conferences, workshops, and exclusive events.", href: "https://maplerecord.com/events/" },
  { kind: "media", title: "Media & press", body: "The latest news, press releases, and media resources about MapleRecord.", href: "https://maplerecord.com/media/" },
];
