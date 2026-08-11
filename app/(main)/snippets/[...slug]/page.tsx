import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCachedFileBySlug,
  getAllSnippetsFrontMatter,
  type SnippetFrontMatter,
} from "@/lib/mdx";
import { PostSimple } from "@/layouts/PostSimple";
import { siteConfig } from "@/data/site";
import { CONTENT_TYPES, ROUTES } from "@/data/constants";
import {
  absoluteUrl,
  buildPageMetadata,
  joinSlug,
  resolveOgImage,
} from "@/lib/metadata";
import {
  ArticleStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";

export async function generateStaticParams() {
  return getAllSnippetsFrontMatter()
    .filter((s) => s.slug && s.slug !== "undefined" && s.slug.trim() !== "")
    .map((s) => ({ slug: s.slug.split("/") }));
}

/**
 * Resolves a snippet, returning null instead of throwing so callers can render
 * a proper 404 rather than a 500.
 */
async function loadSnippet(slugParts: string[] | undefined) {
  const slug = joinSlug(slugParts);
  if (!slug || slug === "undefined") return null;

  const snippet = await getCachedFileBySlug(CONTENT_TYPES.snippets, slug).catch(
    () => null
  );
  if (!snippet || snippet.frontMatter.folderName !== CONTENT_TYPES.snippets) {
    return null;
  }
  return { slug, frontMatter: snippet.frontMatter as SnippetFrontMatter, mdxSource: snippet.mdxSource };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const snippet = await loadSnippet((await params).slug);
  if (!snippet) return {};

  const { slug, frontMatter } = snippet;
  const title = frontMatter.heading || frontMatter.title;

  return buildPageMetadata({
    title,
    description: frontMatter.summary,
    path: `${ROUTES.snippets}/${slug}`,
    type: "article",
    ogEyebrow: "Snippet",
    keywords: frontMatter.tags,
    image: resolveOgImage(frontMatter.images),
    noIndex: Boolean(frontMatter.draft),
  });
}

export default async function SnippetPost({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const snippet = await loadSnippet((await params).slug);
  if (!snippet || snippet.frontMatter.draft) notFound();

  const { slug, frontMatter, mdxSource } = snippet;
  const title = frontMatter.heading || frontMatter.title;
  const url = absoluteUrl(`${ROUTES.snippets}/${slug}`);
  const publishedTime = new Date(frontMatter.date).toISOString();

  const allSnippets = getAllSnippetsFrontMatter();
  const index = allSnippets.findIndex((s) => s.slug === slug);
  const prev = allSnippets[index + 1] || null;
  const next = allSnippets[index - 1] || null;

  return (
    <>
      <ArticleStructuredData
        title={title}
        description={frontMatter.summary}
        url={url}
        publishedTime={publishedTime}
        modifiedTime={
          frontMatter.lastmod
            ? new Date(frontMatter.lastmod).toISOString()
            : publishedTime
        }
        authorName={siteConfig.author}
        authorUrl={siteConfig.url}
        image={resolveOgImage(frontMatter.images)}
        tags={frontMatter.tags}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Snippets", url: absoluteUrl(ROUTES.snippets) },
          { name: title, url },
        ]}
      />
      <PostSimple
        frontMatter={frontMatter}
        content={mdxSource}
        next={next}
        prev={prev}
      />
    </>
  );
}
