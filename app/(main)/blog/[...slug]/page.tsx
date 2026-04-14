import {
  getFileBySlug,
  getAllFilesFrontMatter,
  getAuthorData,
  type BlogPost,
} from "@/lib/mdx";
import { PostSimple } from "@/layouts/PostSimple";
import { PageTitle } from "@/components/PageTitle";
import { siteConfig } from "@/data/site";
import {
  ArticleStructuredData,
  BreadcrumbStructuredData,
} from "@/components/StructuredData";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllFilesFrontMatter("blog");
  const validPosts = posts.filter(
    (post) => post.slug && post.slug !== "undefined" && post.slug.trim() !== ""
  );

  return validPosts.map((post) => {
    // post.slug is already formatted (no .mdx extension)
    // For catch-all routes, we need to return slug as an array
    const slugParts = post.slug.includes("/")
      ? post.slug.split("/")
      : [post.slug];
    return {
      slug: slugParts,
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug.join("/")
    : resolvedParams.slug;
  const post = (await getFileBySlug("blog", slug)) as BlogPost;
  const frontMatter = post.frontMatter;
  const author = await getAuthorData();

  const url = `${siteConfig.url}/blog/${slug}`;
  const publishedTime = new Date(frontMatter.date).toISOString();
  const modifiedTime = frontMatter.lastmod
    ? new Date(frontMatter.lastmod).toISOString()
    : publishedTime;

  // Handle images - support both string and array formats
  const images = frontMatter.images
    ? Array.isArray(frontMatter.images)
      ? frontMatter.images
      : [frontMatter.images]
    : [];

  // Use first image if available
  const ogImage =
    images.length > 0
      ? images[0].startsWith("http")
        ? images[0]
        : `${siteConfig.url}${images[0]}`
      : null;

  return {
    title: frontMatter.title,
    description: frontMatter.summary,
    keywords: frontMatter.tags,
    authors: [{ name: author.frontMatter.name || siteConfig.author }],
    creator: author.frontMatter.name || siteConfig.author,
    publisher: author.frontMatter.name || siteConfig.author,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: frontMatter.title,
      description: frontMatter.summary,
      publishedTime,
      modifiedTime,
      authors: [author.frontMatter.name || siteConfig.author],
      tags: frontMatter.tags,
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: frontMatter.title,
          },
        ],
      }),
      siteName: siteConfig.title,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: frontMatter.title,
      description: frontMatter.summary,
      creator:
        siteConfig.social.twitter?.replace("https://twitter.com/", "@") ||
        undefined,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: {
      index: !frontMatter.draft,
      follow: !frontMatter.draft,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;

  if (
    !resolvedParams?.slug ||
    (Array.isArray(resolvedParams.slug) && resolvedParams.slug.length === 0)
  ) {
    throw new Error("Invalid slug parameter");
  }

  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug.join("/")
    : resolvedParams.slug;

  if (!slug || slug === "undefined") {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const post = (await getFileBySlug("blog", slug)) as BlogPost;
  const frontMatter = post.frontMatter;

  if (frontMatter.draft) {
    return (
      <div className="mt-24 text-center">
        <PageTitle>
          Under Construction{" "}
          <span role="img" aria-label="roadwork sign">
            🚧
          </span>
        </PageTitle>
      </div>
    );
  }

  const allPosts = getAllFilesFrontMatter("blog");
  const postIndex = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[postIndex + 1] || null;
  const next = allPosts[postIndex - 1] || null;

  const author = await getAuthorData();
  const url = `${siteConfig.url}/blog/${slug}`;
  const publishedTime = new Date(frontMatter.date).toISOString();
  const modifiedTime = frontMatter.lastmod
    ? new Date(frontMatter.lastmod).toISOString()
    : publishedTime;

  // Handle images - support both string and array formats
  const images = frontMatter.images
    ? Array.isArray(frontMatter.images)
      ? frontMatter.images
      : [frontMatter.images]
    : [];

  const ogImage =
    images.length > 0
      ? images[0].startsWith("http")
        ? images[0]
        : `${siteConfig.url}${images[0]}`
      : undefined;

  return (
    <>
      <ArticleStructuredData
        title={frontMatter.title}
        description={frontMatter.summary}
        url={url}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
        authorName={author.frontMatter.name || siteConfig.author}
        authorUrl={siteConfig.url}
        image={ogImage}
        tags={frontMatter.tags}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
          { name: frontMatter.title, url },
        ]}
      />
      <PostSimple
        frontMatter={frontMatter}
        content={post.mdxSource}
        next={next}
        prev={prev}
      />
    </>
  );
}
