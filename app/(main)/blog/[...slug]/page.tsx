import { getFileBySlug, getAllFilesFrontMatter } from "@/lib/mdx";
import { PostSimple } from "@/layouts/PostSimple";
import { PageTitle } from "@/components/PageTitle";
import { siteConfig } from "@/data/site";
import { formatSlug } from "@/lib/utils";

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
}) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug.join("/")
    : resolvedParams.slug;
  const post = await getFileBySlug("blog", slug);

  return {
    title: `${post.frontMatter.title} - ${siteConfig.title}`,
    description: post.frontMatter.summary,
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

  const post = await getFileBySlug("blog", slug);

  if (post.frontMatter.draft) {
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

  return (
    <PostSimple
      frontMatter={post.frontMatter}
      content={post.mdxSource}
      next={next}
      prev={prev}
    />
  );
}
