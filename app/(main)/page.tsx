import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { HomeClient } from "@/components/homepage/HomeClient";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function Home() {
  const posts = getAllFilesFrontMatter("blog");
  const tags = getAllTags("blog", "snippets");

  return <HomeClient initialPosts={posts} tags={tags} />;
}
