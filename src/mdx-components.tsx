import Link from "next/link";
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    // Internal routes use client-side navigation.
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    // Only external web links open a new tab; fragments, mailto: and tel: behave normally.
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
