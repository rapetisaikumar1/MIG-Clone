import { MrSubnav } from "@/features/maplerecord/mr-subnav";

export default function MapleRecordLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MrSubnav />
      {children}
    </>
  );
}
