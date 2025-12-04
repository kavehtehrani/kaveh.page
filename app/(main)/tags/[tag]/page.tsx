import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { TagClient } from "@/components/tags/TagClient";
import { siteConfig } from "@/data/site";
import { kebabCase } from "@/lib/client-utils";

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
}) {
  const resolvedParams = await params;
  const tag = resolvedParams.tag;

  return {
    title: `${tag} - ${siteConfig.title}`,
    description: `${tag} tags - ${siteConfig.title}`,
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
      post.draft !== true &&
      post.tags.map((t) => kebabCase(t)).includes(tag)
  );

  return <TagClient initialPosts={filteredPosts} tag={tag} />;
}

