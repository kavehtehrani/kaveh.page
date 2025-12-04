"use client";

import { useState, useMemo } from "react";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { PostListItem } from "@/components/PostListItem";
import { PostsSearch } from "@/components/PostsSearch";
import { siteConfig } from "@/data/site";
import { kebabCase } from "@/lib/client-utils";
import type { BlogFrontMatter } from "@/lib/mdx";

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

function TagClient({
  initialPosts,
  tag,
}: {
  initialPosts: BlogFrontMatter[];
  tag: string;
}) {
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = useMemo(() => {
    if (!searchValue) return initialPosts;

    return initialPosts.filter((post) => {
      const searchContent =
        post.title + " " + post.summary + " " + post.tags.join(" ");
      return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [initialPosts, searchValue]);

  // Capitalize first letter and convert space to dash
  const title = tag[0] + tag.split(" ").join("-").slice(1);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-4 pb-12 pt-2 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Tag: #{title}
        </h1>
        <PostsSearch onChange={setSearchValue} />
      </div>
      <ul className="space-y-10 py-12">
        {!filteredPosts.length && "No posts found."}
        {filteredPosts.map((post) => (
          <PostListItem key={post.slug} frontMatter={post} />
        ))}
      </ul>
    </div>
  );
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

