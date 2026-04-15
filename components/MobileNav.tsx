"use client";

import { useEffect, useRef } from "react";
import { navLinks } from "@/data/nav";
import { Link } from "./Link";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed right-2 top-14 z-50 w-56 rounded-md border border-gray-300 dark:border-terminal-bg-lighter bg-white dark:bg-terminal-bg shadow-lg"
    >
      <nav className="py-1">
        {navLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-terminal-orange hover:bg-gray-100 dark:hover:bg-terminal-bg-lighter transition-colors"
            onClick={onClose}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
