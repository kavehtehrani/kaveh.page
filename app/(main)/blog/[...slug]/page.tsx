import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCachedFileBySlug,
  getCachedAuthorData,
  getAllFilesFrontMatter,
  type BlogPost,
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
  return getAllFilesFrontMatter(CONTENT_TYPES.blog)
    .filter((p) => p.slug && p.slug !== "undefined" && p.slug.trim() !== "")
    .map((p) => ({ slug: p.slug.split("/") }));
}

/**
 * Resolves a post, returning null instead of throwing so callers can render a
 * proper 404 rather than a 500.
 */
async function loadPost(slugParts: string[] | undefined) {
  const slug = joinSlug(slugParts);
  if (!slug || slug === "undefined") return null;

  const post = (await getCachedFileBySlug(CONTENT_TYPES.blog, slug).catch(
    () => null
  )) as BlogPost | null;
  if (!post) return null;

  return { slug, frontMatter: post.frontMatter, mdxSource: post.mdxSource };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const post = await loadPost((await params).slug);
  if (!post) return {};

  const { slug, frontMatter } = post;
  const author = await getCachedAuthorData();

  return buildPageMetadata({
    title: frontMatter.title,
    description: frontMatter.summary,
    path: `${ROUTES.blog}/${slug}`,
    type: "article",
    ogEyebrow: "Blog",
    keywords: frontMatter.tags,
    image: resolveOgImage(frontMatter.images),
    noIndex: Boolean(frontMatter.draft),
    authors: [author.frontMatter.name || siteConfig.author],
    publishedTime: new Date(frontMatter.date).toISOString(),
    modifiedTime: frontMatter.lastmod
      ? new Date(frontMatter.lastmod).toISOString()
      : undefined,
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const post = await loadPost((await params).slug);
  if (!post || post.frontMatter.draft) notFound();

  const { slug, frontMatter, mdxSource } = post;
  const author = await getCachedAuthorData();

  const url = absoluteUrl(`${ROUTES.blog}/${slug}`);
  const publishedTime = new Date(frontMatter.date).toISOString();

  const allPosts = getAllFilesFrontMatter(CONTENT_TYPES.blog);
  const index = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[index + 1] || null;
  const next = allPosts[index - 1] || null;

  return (
    <>
      <ArticleStructuredData
        title={frontMatter.title}
        description={frontMatter.summary}
        url={url}
        publishedTime={publishedTime}
        modifiedTime={
          frontMatter.lastmod
            ? new Date(frontMatter.lastmod).toISOString()
            : publishedTime
        }
        authorName={author.frontMatter.name || siteConfig.author}
        authorUrl={siteConfig.url}
        image={resolveOgImage(frontMatter.images)}
        tags={frontMatter.tags}
      />
      <BreadcrumbStructuredData
        items={[
          // The blog listing is the homepage, so this is a two-level trail.
          { name: "Blog", url: siteConfig.url },
          { name: frontMatter.title, url },
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
