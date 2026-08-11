"use client";

import { PostBrowser } from "@/components/PostBrowser";
import type { BlogFrontMatter } from "@/lib/mdx";

export function BlogClient({ posts }: { posts: BlogFrontMatter[] }) {
  return (
    <PostBrowser
      heading="Blog"
      posts={posts}
      intro="Use the search below to filter content."
    />
  );
}
