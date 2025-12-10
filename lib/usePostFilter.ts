import { useState, useMemo } from "react";
import type { BlogFrontMatter } from "@/components/PostListItem";

export function usePostFilter(posts: BlogFrontMatter[]) {
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchValue) return posts;

    return posts.filter((post) => {
      const searchContent =
        post.title + " " + post.summary + " " + post.tags.join(" ");
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [posts, searchValue]);

  return {
    searchValue,
    setSearchValue,
    filteredPosts,
  };
}
