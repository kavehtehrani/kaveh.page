"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { BlogFrontMatter } from "@/lib/mdx";
import { CONTENT_TYPES } from "@/data/constants";

interface KeyboardNavigationProps {
  next?: BlogFrontMatter | null;
  prev?: BlogFrontMatter | null;
  folderName?: string;
}

/**
 * Left/Right arrows move between adjacent posts.
 *
 * Tab, Enter and Escape are deliberately NOT handled here. A previous version
 * called preventDefault() on every Tab and only toggled a CSS class, which left
 * document.activeElement pinned to <body> and made every interactive control
 * unreachable by keyboard (WCAG 2.1.1). Native focus handling is correct and
 * already styled via :focus-visible.
 */
export function KeyboardNavigation({
  next,
  prev,
  folderName = CONTENT_TYPES.blog,
}: KeyboardNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Never intercept while typing, or when a modifier implies a browser shortcut.
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey
      ) {
        return;
      }

      if (e.key === "ArrowLeft" && prev) {
        e.preventDefault();
        router.push(`/${prev.folderName || folderName}/${prev.slug}`);
      } else if (e.key === "ArrowRight" && next) {
        e.preventDefault();
        router.push(`/${next.folderName || folderName}/${next.slug}`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev, router, folderName]);

  return null;
}
