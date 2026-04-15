"use client";

import { PostsSearch } from "@/components/PostsSearch";
import { PostList } from "@/components/PostList";
import { usePostFilter } from "@/lib/usePostFilter";
import type { BlogFrontMatter } from "@/lib/mdx";

export function TagClient({
  initialPosts,
  tag,
}: {
  initialPosts: BlogFrontMatter[];
  tag: string;
}) {
  const { setSearchValue, filteredPosts } = usePostFilter(initialPosts);

  // Capitalize first letter and convert space to dash
  const title = tag[0] + tag.split(" ").join("-").slice(1);

  return (
    <div className="divide-y divide-gray-200 dark:divide-terminal-bg-lighter">
      <div className="space-y-4 pb-12 pt-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 border-b border-gray-300 dark:border-terminal-bg-lighter pb-2">
          Tag: #{title}
        </h1>
        <PostsSearch onChange={setSearchValue} />
      </div>
      <PostList posts={filteredPosts} className="space-y-10 py-12" />
    </div>
  );
}
