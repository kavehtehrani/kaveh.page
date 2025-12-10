"use client";

import { PostsSearch } from "@/components/PostsSearch";
import { PostList } from "@/components/PostList";
import { HomepageTags } from "@/components/homepage/Tags";
import { usePostFilter } from "@/lib/usePostFilter";
import type { BlogFrontMatter } from "@/lib/mdx";
import type { TagsCount } from "@/lib/tags";

export function HomeClient({
  initialPosts,
  tags,
}: {
  initialPosts: BlogFrontMatter[];
  tags: TagsCount;
}) {
  const { setSearchValue, filteredPosts } = usePostFilter(initialPosts);

  return (
    <div className="divide-y divide-gray-200 dark:divide-[#404040]">
      <div className="space-y-4 pb-12 pt-2 md:space-y-5">
        <p className="text-lg text-gray-500 dark:text-[#808080]">
          I write mostly about{" "}
          <span className="text-[#994400] dark:text-[#ffaa00]">
            finance, tech, and living nomadically.{" "}
          </span>
          <span>Use the tags or search below to filter content.</span>
        </p>
        <HomepageTags tags={tags} />
        <PostsSearch onChange={setSearchValue} />
      </div>
      <PostList posts={filteredPosts} />
    </div>
  );
}
