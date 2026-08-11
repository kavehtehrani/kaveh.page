"use client";

import { PostBrowser } from "@/components/PostBrowser";
import { HomepageTags } from "@/components/homepage/Tags";
import { siteConfig } from "@/data/site";
import type { BlogFrontMatter } from "@/lib/mdx";
import type { TagsCount } from "@/lib/tags";

export function HomeClient({
  initialPosts,
  tags,
}: {
  initialPosts: BlogFrontMatter[];
  tags: TagsCount;
}) {
  return (
    <PostBrowser
      heading={siteConfig.title}
      posts={initialPosts}
      intro={
        <>
          I write mostly about{" "}
          <span className="text-terminal-orange-dark dark:text-terminal-orange-bright">
            finance, tech, and living nomadically.{" "}
          </span>
          <span>Use the tags or search below to filter content.</span>
        </>
      }
    >
      <HomepageTags tags={tags} />
    </PostBrowser>
  );
}
