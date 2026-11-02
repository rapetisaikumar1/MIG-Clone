export function DraftBanner() {
  return (
    <div className="bg-signal text-white">
      <div className="mx-auto flex max-w-[78rem] flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm sm:px-8 lg:px-12">
        <p>
          <strong>Draft Mode is on.</strong> Unpublished insights are visible to you only and are excluded from indexing.
        </p>
        {/* Route handler link — must be a full navigation, not a client-side transition */}
        <a href="/api/draft/disable" className="font-medium underline underline-offset-4">
          Exit Draft Mode
        </a>
      </div>
    </div>
  );
}
