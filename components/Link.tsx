import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";

export function Link({
  href,
  className = "text-[#cc6600] dark:text-[#ff8800] no-underline hover:text-[#994400] dark:hover:text-[#ffaa00] hover:underline",
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) return null;

  const isInternalLink = href.startsWith("/");
  const isAnchorLink = href.startsWith("#");

  if (isInternalLink) {
    return <NextLink className={className} href={href} {...rest} />;
  }

  if (isAnchorLink) {
    return <a href={href} className={className} {...rest} />;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={className}
      {...rest}
    />
  );
}
