"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { BlogFrontMatter } from "./PostListItem";

interface KeyboardNavigationProps {
  next?: BlogFrontMatter | null;
  prev?: BlogFrontMatter | null;
  folderName?: string;
}

export function KeyboardNavigation({
  next,
  prev,
  folderName = "blog",
}: KeyboardNavigationProps) {
  const router = useRouter();
  const currentLinkIndex = useRef<number>(-1);

  useEffect(() => {
    const getLinks = (): NodeListOf<HTMLAnchorElement> => {
      return document.querySelectorAll<HTMLAnchorElement>(
        'a[href]:not([href^="#"]):not([href^="javascript:"])'
      );
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with input fields, textareas, or contenteditable elements
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Arrow key navigation for prev/next posts (only when Alt is NOT pressed)
      // Alt+Arrow should work as browser navigation (back/forward in history)
      if (!e.altKey) {
        if (e.key === "ArrowLeft" && prev) {
          e.preventDefault();
          router.push(`/${prev.folderName || folderName}/${prev.slug}`);
        } else if (e.key === "ArrowRight" && next) {
          e.preventDefault();
          router.push(`/${next.folderName || folderName}/${next.slug}`);
        }
      }

      // Tab navigation for links
      if (e.key === "Tab") {
        e.preventDefault();
        const links = getLinks();

        if (links.length === 0) return;

        // Remove previous focus indicator
        if (currentLinkIndex.current >= 0 && links[currentLinkIndex.current]) {
          links[currentLinkIndex.current].classList.remove("keyboard-focus");
        }

        if (e.shiftKey) {
          // Shift+Tab: navigate backwards
          currentLinkIndex.current =
            currentLinkIndex.current <= 0
              ? links.length - 1
              : currentLinkIndex.current - 1;
        } else {
          // Tab: navigate forwards
          currentLinkIndex.current =
            currentLinkIndex.current >= links.length - 1
              ? 0
              : currentLinkIndex.current + 1;
        }

        // Add focus indicator and scroll into view
        if (links[currentLinkIndex.current]) {
          links[currentLinkIndex.current].classList.add("keyboard-focus");
          links[currentLinkIndex.current].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }

      // Enter to activate focused link
      if (e.key === "Enter" && currentLinkIndex.current >= 0) {
        const links = getLinks();
        if (links[currentLinkIndex.current]) {
          links[currentLinkIndex.current].click();
        }
      }

      // Escape to clear focus
      if (e.key === "Escape") {
        if (currentLinkIndex.current >= 0) {
          const links = getLinks();
          if (links[currentLinkIndex.current]) {
            links[currentLinkIndex.current].classList.remove("keyboard-focus");
          }
          currentLinkIndex.current = -1;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [next, prev, router, folderName]);

  return null;
}
