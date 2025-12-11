"use client";

import { PostsSearch } from "@/components/PostsSearch";
import { PostList } from "@/components/PostList";
import { usePostFilter } from "@/lib/usePostFilter";
import type { BlogFrontMatter } from "@/lib/mdx";

export function BlogClient({ posts }: { posts: BlogFrontMatter[] }) {
  const { setSearchValue, filteredPosts } = usePostFilter(posts);

  return (
    <div className="divide-y divide-gray-200 dark:divide-[#404040]">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-[#cc6600] dark:text-[#ff8800] sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 border-b border-gray-300 dark:border-[#404040] pb-2">
          Blog
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-[#808080]">
          Use the search below to filter content.
        </p>
        <PostsSearch onChange={setSearchValue} />
      </div>
      <PostList posts={filteredPosts} />
    </div>
  );
}
