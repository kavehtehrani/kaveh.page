import { getAllFilesFrontMatter } from "@/lib/mdx";
import { BlogClient } from "@/components/blog/BlogClient";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: `Blog posts about ${siteConfig.description.toLowerCase()}`,
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    url: `${siteConfig.url}/blog`,
    title: `Blog - ${siteConfig.title}`,
    description: `Blog posts about ${siteConfig.description.toLowerCase()}`,
  },
};

export default async function BlogPage() {
  const posts = getAllFilesFrontMatter("blog");

  return <BlogClient posts={posts} />;
}
