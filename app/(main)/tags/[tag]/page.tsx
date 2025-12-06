import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { TagClient } from "@/components/tags/TagClient";
import { siteConfig } from "@/data/site";
import { kebabCase } from "@/lib/client-utils";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const tags = getAllTags("blog", "snippets");
  return Object.keys(tags).map((tag) => ({
    tag: kebabCase(tag),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.tag;
  const url = `${siteConfig.url}/tags/${tag}`;

  // Get posts count for better description
  const allPosts = getAllFilesFrontMatter("blog", "snippets");
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
  );
  const count = filteredPosts.length;

  return {
    title: `${tag} - ${siteConfig.title}`,
    description: `Posts tagged with ${tag}${
      count > 0 ? ` (${count} ${count === 1 ? "post" : "posts"})` : ""
    } - ${siteConfig.title}`,
    keywords: [tag, ...filteredPosts.flatMap((p) => p.tags)],
    alternates: {
      canonical: url,
    },
    openGraph: {
      url,
      title: `${tag} - ${siteConfig.title}`,
      description: `Posts tagged with ${tag}${
        count > 0 ? ` (${count} ${count === 1 ? "post" : "posts"})` : ""
      }`,
    },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const resolvedParams = await params;
  const tag = resolvedParams.tag;

  const allPosts = getAllFilesFrontMatter("blog", "snippets");
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
  );

  return <TagClient initialPosts={filteredPosts} tag={tag} />;
}
