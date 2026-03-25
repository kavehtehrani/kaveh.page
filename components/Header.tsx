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
    <header className="sticky top-0 z-40 w-full overflow-x-hidden bg-white/75 dark:bg-terminal-bg/75 backdrop-blur border-b border-gray-300 dark:border-terminal-bg-lighter py-2">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <div className="flex items-center justify-center">
          <Link
            href="/"
            aria-label="Kaveh's Blog"
            className="text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright"
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
            <p className="text-sm text-gray-500 dark:text-terminal-gray">
              Personal blog
            </p>
            <Link
              href="/about"
              className="text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright hover:underline"
            >
              {siteConfig.author}
            </Link>
          </div>
        </div>
        <div className="flex items-center text-sm leading-5">
          <HeaderNavLinks />
          <button
            className="ml-2 cursor-pointer text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright border border-transparent hover:border-gray-400 dark:hover:border-terminal-gray rounded-md transition-colors duration-150 px-2 py-1"
            aria-label="Toggle Menu"
            onClick={onToggleSub}
          >
            <span className="hidden md:inline">✉️ Subscribe </span>
            <span className="md:hidden">✉️</span>
          </button>
          <ThemeSwitcher />
          <button
            className="ml-2 mr-1 h-8 w-8 rounded-md border border-gray-300 dark:border-terminal-bg-lighter hover:border-terminal-orange-dim dark:hover:border-terminal-orange transition-colors duration-150 lg:hidden text-terminal-orange-dim dark:text-terminal-orange"
            type="button"
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-terminal-orange-dim dark:text-terminal-orange"
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
