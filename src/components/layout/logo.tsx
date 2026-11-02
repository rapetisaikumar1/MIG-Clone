import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { company } from "@/config/site";

/**
 * Original Maverick InnoGarage lockups (served unchanged from /public/brand).
 * Both share a 9:4 aspect ratio; width drives size so the wordmark stays legible.
 */
export function Logo({
  variant = "default",
  width = 124,
  preload = false,
  className,
}: {
  variant?: "default" | "white";
  width?: number;
  preload?: boolean;
  className?: string;
}) {
  const src = variant === "white" ? "/brand/mig-logo-white.svg" : "/brand/mig-logo.svg";
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 rounded-sm py-1", className)}
      aria-label={`${company.name} — home`}
    >
      <Image
        src={src}
        alt={company.name}
        width={width}
        height={Math.round((width * 4) / 9)}
        preload={preload}
        style={{ width, height: "auto" }}
      />
    </Link>
  );
}
