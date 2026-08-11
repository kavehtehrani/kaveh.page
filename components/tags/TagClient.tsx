"use client";

import { PostBrowser } from "@/components/PostBrowser";
import type { BlogFrontMatter } from "@/lib/mdx";

export function TagClient({
  initialPosts,
  tag,
}: {
  initialPosts: BlogFrontMatter[];
  tag: string;
}) {
  // Capitalize first letter and convert space to dash
  const title = tag[0] + tag.split(" ").join("-").slice(1);

  return (
    <PostBrowser
      heading={`Tag: #${title}`}
      posts={initialPosts}
      listClassName="space-y-10 py-12"
    />
  );
}
