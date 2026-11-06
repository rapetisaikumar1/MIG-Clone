import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { company } from "@/config/site";

/**
 * Original Maverick InnoGarage lockups (served unchanged from /public/brand).
 * Both share a 9:4 aspect ratio; width drives size so the wordmark stays legible.
 * `imageClassName` sets a responsive width (e.g. "w-24 sm:w-28") in place of the fixed `width`.
 */
export function Logo({
  variant = "default",
  width = 124,
  preload = false,
  loading,
  className,
  imageClassName,
}: {
  variant?: "default" | "white";
  width?: number;
  preload?: boolean;
  /** "eager" for a logo that must be there the moment it scrolls into view (e.g. the footer). */
  loading?: "eager" | "lazy";
  className?: string;
  imageClassName?: string;
}) {
  const src = variant === "white" ? "/brand/mig-logo-white.svg" : "/brand/mig-logo.svg";
  return (
    <Link
      href="/"
      // Padded and rounded like the other header controls, so its focus ring matches theirs.
      className={cn("-mx-1.5 inline-flex shrink-0 rounded-xl px-1.5 py-1 focus-visible:outline-offset-0", className)}
      aria-label={`${company.name} — home`}
    >
      <Image
        src={src}
        alt={company.name}
        width={width}
        height={Math.round((width * 4) / 9)}
        preload={preload}
        loading={preload ? undefined : loading}
        className={imageClassName ? cn("h-auto", imageClassName) : undefined}
        style={imageClassName ? undefined : { width, height: "auto" }}
      />
    </Link>
  );
}
