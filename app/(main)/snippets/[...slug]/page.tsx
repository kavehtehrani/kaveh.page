import { getFileBySlug, getAllSnippetsFrontMatter, type SnippetFrontMatter } from "@/lib/mdx";
import { PostSimple } from "@/layouts/PostSimple";
import { PageTitle } from "@/components/PageTitle";
import { siteConfig } from "@/data/site";

export async function generateStaticParams() {
  const snippets = getAllSnippetsFrontMatter();
  const validSnippets = snippets.filter(
    (snippet) => snippet.slug && snippet.slug !== "undefined" && snippet.slug.trim() !== ""
  );

  return validSnippets.map((snippet) => {
    const slugParts = snippet.slug.includes("/")
      ? snippet.slug.split("/")
      : [snippet.slug];
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

  if (!slug || slug === "undefined" || slug.trim() === "") {
    throw new Error("Invalid slug parameter for metadata");
  }

  const snippet = await getFileBySlug("snippets", slug);
  
  if (snippet.frontMatter.folderName !== "snippets") {
    throw new Error("Invalid snippet");
  }

  const snippetFrontMatter = snippet.frontMatter as SnippetFrontMatter;

  return {
    title: `${snippetFrontMatter.heading || snippetFrontMatter.title} - ${siteConfig.title}`,
    description: snippetFrontMatter.summary,
  };
}

export default async function SnippetPost({
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

  if (!slug || slug === "undefined" || slug.trim() === "") {
    throw new Error(`Invalid slug: ${slug}`);
  }

  const snippet = await getFileBySlug("snippets", slug);
  
  if (snippet.frontMatter.folderName !== "snippets") {
    throw new Error("Invalid snippet");
  }

  const snippetFrontMatter = snippet.frontMatter as SnippetFrontMatter;

  if (snippetFrontMatter.draft) {
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

  const allSnippets = getAllSnippetsFrontMatter();
  const snippetIndex = allSnippets.findIndex((s) => s.slug === slug);
  const prev = allSnippets[snippetIndex + 1] || null;
  const next = allSnippets[snippetIndex - 1] || null;

  return (
    <PostSimple
      frontMatter={snippetFrontMatter}
      content={snippet.mdxSource}
      next={next}
      prev={prev}
    />
  );
}

