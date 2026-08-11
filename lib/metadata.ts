import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { OG_IMAGE_SIZE } from "@/data/constants";

/**
 * Absolute URL for a site-relative path. Root stays without a trailing slash so
 * canonicals match the form already indexed.
 */
export function absoluteUrl(path: string): string {
  const url = new URL(path, siteConfig.url);
  return url.pathname === "/" && !url.search ? siteConfig.url : url.toString();
}

/** "@handle" derived from the configured profile URL, in one place. */
export const twitterHandle: string | undefined = siteConfig.social.twitter
  ? `@${siteConfig.social.twitter.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, "")}`
  : undefined;

/**
 * Normalises a front-matter `images` value (string, array, or absent) into a
 * single absolute Open Graph image URL. Previously copy-pasted in three places
 * with two different empty-value conventions.
 */
export function resolveOgImage(images?: string | string[]): string | undefined {
  const list = images ? (Array.isArray(images) ? images : [images]) : [];
  const first = list[0];
  if (!first) return undefined;
  return first.startsWith("http") ? first : absoluteUrl(first);
}

/** URL of the generated Open Graph card for a given title. */
export function ogCardUrl(title: string, eyebrow?: string): string {
  const params = new URLSearchParams({ title });
  if (eyebrow) params.set("eyebrow", eyebrow);
  return absoluteUrl(`/og?${params.toString()}`);
}

/** Joins a catch-all route param into a slug string. */
export function joinSlug(slug: string | string[] | undefined): string {
  if (!slug) return "";
  return Array.isArray(slug) ? slug.join("/") : slug;
}

type PageMetadataInput = {
  /** Bare title. The root layout's template appends the site name — don't repeat it. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/projects". */
  path: string;
  /** Defaults to "website"; pass "article" or "profile" where appropriate. */
  type?: "website" | "article" | "profile";
  image?: string;
  /** Set for pages that should stay out of the index (maintenance, etc.). */
  noIndex?: boolean;
  keywords?: string[];
  /** Small label above the title on the generated Open Graph card. */
  ogEyebrow?: string;
  /** Article-only Open Graph fields. */
  authors?: string[];
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * The single source of truth for page metadata. Every route uses this so a
 * canonical or Open Graph block can never be silently omitted again.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  noIndex = false,
  keywords,
  ogEyebrow,
  authors,
  publishedTime,
  modifiedTime,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? ogCardUrl(title, ogEyebrow);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    ...(authors?.length ? { authors: authors.map((name) => ({ name })) } : {}),
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: siteConfig.title,
      // Open Graph has no title template, so the site name is added explicitly.
      title: `${title} - ${siteConfig.title}`,
      description,
      images: [{ ...OG_IMAGE_SIZE, url: ogImage, alt: title }],
      ...(type === "article"
        ? {
            ...(authors?.length ? { authors } : {}),
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(keywords?.length ? { tags: keywords } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${siteConfig.title}`,
      description,
      creator: twitterHandle,
      images: [ogImage],
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
