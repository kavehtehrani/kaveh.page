"use client";

import { usePathname } from "next/navigation";
import { navLinks } from "@/data/nav";
import { Link } from "./Link";

export function HeaderNavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden space-x-1 lg:block">
      {navLinks.map((link) => {
        const isActive =
          (pathname.startsWith(link.href) && link.href !== "/") ||
          (link.href === pathname && pathname === "/");
        return (
          <Link key={link.title} href={link.href}>
            <span
              className={`inline-block rounded-md px-2 py-1 text-terminal-orange-dim dark:text-terminal-orange border border-transparent sm:px-3 sm:py-2 ${
                isActive
                  ? "bg-gray-200 dark:bg-terminal-bg-light border-terminal-orange-dim dark:border-terminal-orange"
                  : "hover:bg-gray-200 dark:hover:bg-terminal-bg-light hover:border-gray-400 dark:hover:border-terminal-gray"
              }`}
            >
              {link.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
