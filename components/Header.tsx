"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import { navLinks } from "@/data/nav"
import { siteConfig } from "@/data/site"
import { Link } from "./Link"
import { ThemeSwitcher } from "./ThemeSwitcher"

interface HeaderProps {
  onToggleNav: () => void
  onToggleSub: () => void
}

export function Header({ onToggleNav, onToggleSub }: HeaderProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 overflow-x-hidden bg-white/75 py-3 backdrop-blur dark:bg-gray-900/75 supports-backdrop-blur:bg-white/95">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <div className="flex items-center justify-center">
          <Link href="/" aria-label="Kaveh's Blog">
            <div className="flex items-center justify-between">
              <div className="mr-3 flex items-center justify-center">
                <Image
                  src="/static/images/logo.png"
                  alt="Kaveh's Blog logo"
                  width={45}
                  height={45}
                  className="rounded-full"
                />
              </div>
            </div>
          </Link>
          <div className="ml-3">
            <p className="text-sm">Personal blog</p>
            <Link
              href="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {siteConfig.author}
            </Link>
          </div>
        </div>
        <div className="flex items-center text-base leading-5">
          <div className="hidden space-x-1 lg:block">
            {navLinks.map((link) => {
              const isActive =
                (pathname.startsWith(link.href) && link.href !== "/") ||
                (link.href === pathname && pathname === "/")
              return (
                <Link key={link.title} href={link.href}>
                  <span
                    className={`inline-block rounded px-2 py-1 font-medium text-gray-900 dark:text-gray-100 sm:px-3 sm:py-2 ${
                      isActive
                        ? "bg-gray-200 dark:bg-gray-700"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {link.title}
                  </span>
                </Link>
              )
            })}
          </div>
          <button
            className="ml-2"
            aria-label="Toggle Menu"
            onClick={onToggleSub}
          >
            <span className="hidden md:inline">✉️ Subscribe </span>
            <span className="md:hidden">✉️</span>
          </button>
          <ThemeSwitcher />
          <button
            className="ml-2 mr-1 h-8 w-8 rounded lg:hidden"
            type="button"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

