"use client";

import type { ReactNode } from "react";
import { PostsSearch } from "@/components/PostsSearch";
import { PostList } from "@/components/PostList";
import { usePostFilter } from "@/lib/usePostFilter";
import type { BlogFrontMatter } from "@/lib/mdx";
import {
  LISTING_WRAPPER,
  PAGE_HEADING_RULED,
  PAGE_SUBTITLE,
} from "@/lib/styles";

interface PostBrowserProps {
  heading: ReactNode;
  posts: BlogFrontMatter[];
  intro?: ReactNode;
  /** Extra controls rendered between the intro and the search box. */
  children?: ReactNode;
  listClassName?: string;
}

/**
 * Searchable post listing.
 *
 * Replaces HomeClient, BlogClient and TagClient, which were the same
 * search-and-filter component three times over with different headings.
 */
export function PostBrowser({
  heading,
  posts,
  intro,
  children,
  listClassName,
}: PostBrowserProps) {
  const { setSearchValue, filteredPosts } = usePostFilter(posts);

  return (
    <div className={LISTING_WRAPPER}>
      <div className="space-y-4 pb-12 pt-2 md:space-y-5">
        <h1 className={PAGE_HEADING_RULED}>{heading}</h1>
        {intro ? <p className={PAGE_SUBTITLE}>{intro}</p> : null}
        {children}
        <PostsSearch onChange={setSearchValue} />
      </div>
      <PostList posts={filteredPosts} className={listClassName} />
    </div>
  );
}
