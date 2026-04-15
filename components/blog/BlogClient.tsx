"use client";

import { PostsSearch } from "@/components/PostsSearch";
import { PostList } from "@/components/PostList";
import { usePostFilter } from "@/lib/usePostFilter";
import type { BlogFrontMatter } from "@/lib/mdx";

export function BlogClient({ posts }: { posts: BlogFrontMatter[] }) {
  const { setSearchValue, filteredPosts } = usePostFilter(posts);

  return (
    <div className="divide-y divide-gray-200 dark:divide-terminal-bg-lighter">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 border-b border-gray-300 dark:border-terminal-bg-lighter pb-2">
          Blog
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-terminal-gray">
          Use the search below to filter content.
        </p>
        <PostsSearch onChange={setSearchValue} />
      </div>
      <PostList posts={filteredPosts} />
    </div>
  );
}
