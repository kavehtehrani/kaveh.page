import { ROUTES } from "@/data/constants";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { BlogClient } from "@/components/blog/BlogClient";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: `Blog posts about ${siteConfig.description.toLowerCase()}`,
  path: ROUTES.blog,
});

export default async function BlogPage() {
  const posts = getAllFilesFrontMatter("blog");

  return <BlogClient posts={posts} />;
}
