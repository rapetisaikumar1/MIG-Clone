/** Marks the MapleRecord section so globals.css can tighten its #fragment offset (see `[data-mr-section]`). */
export default function MapleRecordLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-mr-section="" className="contents">
      {children}
    </div>
  );
}
