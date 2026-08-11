/**
 * Shared Tailwind class runs.
 *
 * These strings were previously pasted into six-plus components, and had drifted
 * into two different heading colours (terminal-orange vs gray-900). Defining them
 * once keeps the pages visually consistent and makes a restyle a one-line change.
 */

/** Large page heading used by the listing and index pages. */
export const PAGE_HEADING =
  "text-3xl font-extrabold leading-9 tracking-tight text-terminal-orange-dim dark:text-terminal-orange sm:text-4xl sm:leading-10 md:text-6xl md:leading-14";

/** Page heading with the underline rule used on filtered listings. */
export const PAGE_HEADING_RULED = `${PAGE_HEADING} border-b border-gray-300 dark:border-terminal-bg-lighter pb-2`;

/** Muted supporting copy under a page heading. */
export const PAGE_SUBTITLE =
  "text-lg leading-7 text-gray-500 dark:text-terminal-gray";

/** Standard inline link treatment. */
export const LINK_CLASS =
  "text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright hover:underline";

/** Wrapper for a searchable, divided content listing. */
export const LISTING_WRAPPER =
  "divide-y divide-gray-200 dark:divide-terminal-bg-lighter";
