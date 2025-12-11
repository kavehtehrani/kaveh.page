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
              className={`inline-block px-2 py-1 text-[#cc6600] dark:text-[#ff8800] border border-transparent sm:px-3 sm:py-2 ${
                isActive
                  ? "bg-gray-200 dark:bg-[#2d2d2d] border-[#cc6600] dark:border-[#ff8800]"
                  : "hover:bg-gray-200 dark:hover:bg-[#2d2d2d] hover:border-gray-400 dark:hover:border-[#808080]"
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
