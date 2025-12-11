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
    <div className="divide-y divide-gray-200 dark:divide-[#404040]">
      <div className="space-y-4 pb-12 pt-2 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-[#cc6600] dark:text-[#ff8800] sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 border-b border-gray-300 dark:border-[#404040] pb-2">
          Tag: #{title}
        </h1>
        <PostsSearch onChange={setSearchValue} />
      </div>
      <PostList posts={filteredPosts} className="space-y-10 py-12" />
    </div>
  );
}
