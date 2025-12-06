"use client";

import { useState, useMemo } from "react";
import { PostListItem } from "@/components/PostListItem";
import { PostsSearch } from "@/components/PostsSearch";
import type { BlogFrontMatter } from "@/lib/mdx";

export function BlogClient({ posts }: { posts: BlogFrontMatter[] }) {
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchValue) return posts;

    return posts.filter((post) => {
      const searchContent =
        post.title + " " + post.summary + " " + post.tags.join(" ");
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [posts, searchValue]);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Blog
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Use the search below to filter content.
        </p>
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
