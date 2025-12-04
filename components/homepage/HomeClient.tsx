"use client";

import { useState, useMemo } from "react";
import { PostListItem } from "@/components/PostListItem";
import { PostsSearch } from "@/components/PostsSearch";
import { HomepageTags } from "@/components/homepage/Tags";
import type { BlogFrontMatter } from "@/lib/mdx";
import type { TagsCount } from "@/lib/tags";

export function HomeClient({
  initialPosts,
  tags,
}: {
  initialPosts: BlogFrontMatter[];
  tags: TagsCount;
}) {
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchValue) return initialPosts;

    return initialPosts.filter((post) => {
      const searchContent =
        post.title + " " + post.summary + " " + post.tags.join(" ");
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [initialPosts, searchValue]);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-4 pb-12 pt-2 md:space-y-5">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          I write mostly about{" "}
          <span className="text-neutral-700 dark:text-neutral-300">
            finance, tech, and living nomadically.{" "}
          </span>
          <span>Use the tags or search below to filter content.</span>
        </p>
        <HomepageTags tags={tags} />
        <PostsSearch onChange={setSearchValue} />
      </div>
      <ul>
        {!filteredPosts.length && "No posts found."}
        {filteredPosts.map((post) => (
          <PostListItem key={post.slug} frontMatter={post} />
        ))}
      </ul>
    </div>
  );
}

