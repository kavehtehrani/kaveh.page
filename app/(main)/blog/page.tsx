import { getAllFilesFrontMatter } from "@/lib/mdx";
import { BlogClient } from "@/components/blog/BlogClient";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `Blog - ${siteConfig.title}`,
  description: siteConfig.description,
};

export default async function BlogPage() {
  const posts = getAllFilesFrontMatter("blog");

  return <BlogClient posts={posts} />;
}
