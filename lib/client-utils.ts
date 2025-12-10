// Client-safe utility functions (no Node.js dependencies like fs)

import type { BlogFrontMatter } from "@/components/PostListItem";
import type { SnippetFrontMatter } from "./mdx";

type FrontMatter = BlogFrontMatter | SnippetFrontMatter;

export function kebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)$/, "");
}

export function getDisplayTitle(item: FrontMatter): string {
  return "heading" in item && item.heading ? item.heading : item.title;
}
