import { ROUTES } from "@/data/constants";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { HomeClient } from "@/components/homepage/HomeClient";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's "%s | <site>" template, which
  // would otherwise render the homepage as "Kaveh's Blog | Kaveh's Blog".
  ...buildPageMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: ROUTES.home,
  }),
  title: { absolute: siteConfig.title },
};

export default function Home() {
  const posts = getAllFilesFrontMatter("blog");
  const tags = getAllTags("blog", "snippets");

  return <HomeClient initialPosts={posts} tags={tags} />;
}
