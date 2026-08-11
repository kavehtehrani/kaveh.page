/**
 * Central constants. Nothing in this repo should hardcode these values inline —
 * import from here so a change lands in one place.
 */

import type { MetadataRoute } from "next";

/** Content collections that live under data/ and map 1:1 to a route segment. */
export const CONTENT_TYPES = {
  blog: "blog",
  snippets: "snippets",
} as const;

export type ContentType = (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];

/** Route paths, so no page hardcodes its own URL string. */
export const ROUTES = {
  home: "/",
  blog: "/blog",
  snippets: "/snippets",
  tags: "/tags",
  projects: "/projects",
  about: "/about",
  privacy: "/privacy",
  donate: "/donate",
  feed: "/feed.xml",
} as const;

/**
 * Fallback intrinsic size for MDX images that declare no dimensions.
 * Only a last resort — real dimensions are read at build time where possible.
 */
export const MDX_IMAGE_FALLBACK = { width: 800, height: 600 } as const;

/** Open Graph card dimensions, per the OG spec's recommended 1.91:1. */
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/** Longest title the OG card can render before it stops fitting. */
export const OG_TITLE_MAX_CHARS = 120;

/** How often the RSS feed and other cached routes revalidate, in seconds. */
export const FEED_REVALIDATE_SECONDS = 60 * 60; // 1 hour

/** Sitemap tuning, kept as one table instead of scattered literals. */
export const SITEMAP: Record<
  string,
  { changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>; priority: number }
> = {
  home: { changeFrequency: "daily", priority: 1 },
  blog: { changeFrequency: "daily", priority: 0.9 },
  snippets: { changeFrequency: "weekly", priority: 0.8 },
  tags: { changeFrequency: "weekly", priority: 0.7 },
  projects: { changeFrequency: "monthly", priority: 0.7 },
  about: { changeFrequency: "monthly", priority: 0.6 },
  donate: { changeFrequency: "monthly", priority: 0.5 },
  privacy: { changeFrequency: "yearly", priority: 0.3 },
  blogPost: { changeFrequency: "monthly", priority: 0.8 },
  snippetPost: { changeFrequency: "monthly", priority: 0.7 },
  tagPage: { changeFrequency: "weekly", priority: 0.6 },
};
