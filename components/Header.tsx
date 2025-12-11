"use client";

import Image from "next/image";
import { siteConfig } from "@/data/site";
import { Link } from "./Link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { HeaderNavLinks } from "./HeaderNavLinks";

interface HeaderProps {
  onToggleNav: () => void;
  onToggleSub: () => void;
}

export function Header({ onToggleNav, onToggleSub }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full overflow-x-hidden bg-white/75 dark:bg-[#1a1a1a]/75 backdrop-blur border-b border-gray-300 dark:border-[#404040] py-2">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            aria-label="Kaveh's Blog"
            className="text-[#cc6600] dark:text-[#ff8800] hover:text-[#994400] dark:hover:text-[#ffaa00]"
          >
            <div className="flex items-center justify-between">
              <div className="mr-3 flex items-center justify-center">
                <Image
                  src="/static/images/logo.png"
                  alt="Kaveh's Blog logo"
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </Link>
          <div className="ml-3">
            <p className="text-sm text-gray-500 dark:text-[#808080]">
              Personal blog
            </p>
            <Link
              href="/about"
              className="text-[#cc6600] dark:text-[#ff8800] hover:text-[#994400] dark:hover:text-[#ffaa00] hover:underline"
            >
              {siteConfig.author}
            </Link>
          </div>
        </div>
        <div className="flex items-center text-sm leading-5">
          <HeaderNavLinks />
          <button
            className="ml-2 cursor-pointer text-[#cc6600] dark:text-[#ff8800] hover:text-[#994400] dark:hover:text-[#ffaa00] border border-transparent hover:border-gray-400 dark:hover:border-[#808080] px-2 py-1"
            aria-label="Toggle Menu"
            onClick={onToggleSub}
          >
            <span className="hidden md:inline">✉️ Subscribe </span>
            <span className="md:hidden">✉️</span>
          </button>
          <ThemeSwitcher />
          <button
            className="ml-2 mr-1 h-8 w-8 border border-gray-300 dark:border-[#404040] hover:border-[#cc6600] dark:hover:border-[#ff8800] lg:hidden text-[#cc6600] dark:text-[#ff8800]"
            type="button"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-[#cc6600] dark:text-[#ff8800]"
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
  );
}
