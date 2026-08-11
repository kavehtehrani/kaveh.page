import { notFound } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { ROUTES } from "@/data/constants";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { TagClient } from "@/components/tags/TagClient";
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

  // Get posts count for better description
  const allPosts = getAllFilesFrontMatter("blog", "snippets");
  const filteredPosts = allPosts.filter(
    (post) =>
      post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
  );
  const count = filteredPosts.length;

  // Bare title: the root layout's template appends the site name. Including it
  // here too rendered "bitcoin - Kaveh's Blog | Kaveh's Blog".
  return buildPageMetadata({
    title: tag,
    description: `Posts tagged with ${tag}${
      count > 0 ? ` (${count} ${count === 1 ? "post" : "posts"})` : ""
    }`,
    path: `${ROUTES.tags}/${tag}`,
    keywords: [tag, ...new Set(filteredPosts.flatMap((p) => p.tags))],
  });
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

  // An unknown tag previously rendered an empty list with HTTP 200 — a soft 404.
  if (filteredPosts.length === 0) notFound();

  return <TagClient initialPosts={filteredPosts} tag={tag} />;
}
