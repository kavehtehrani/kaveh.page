import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";

export function Link({
  href,
  className = "text-terminal-orange-dim dark:text-terminal-orange no-underline hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright hover:underline",
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
