"use client";

import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { BlogTags } from "@/components/blog/BlogTags";
import { BlogMeta } from "@/components/blog/BlogMeta";
import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/SectionContainer";
import { Link } from "@/components/Link";
import type { BlogFrontMatter } from "@/components/PostListItem";
import type { SnippetFrontMatter } from "@/lib/mdx";

type FrontMatter = BlogFrontMatter | SnippetFrontMatter;

interface PostSimpleProps {
  frontMatter: FrontMatter;
  content: string;
  next?: FrontMatter | null;
  prev?: FrontMatter | null;
}

export function PostSimple({
  frontMatter,
  content,
  next,
  prev,
}: PostSimpleProps) {
  const { date, tags, readingTime, folderName = "blog" } = frontMatter;
  // Use heading for snippets, title for blog posts
  const displayTitle =
    "heading" in frontMatter && frontMatter.heading
      ? frontMatter.heading
      : frontMatter.title;
  // const postUrl = `${siteConfig.url}/${folderName}/${frontMatter.slug}` // Reserved for future social sharing

  const MDXContent = useMemo(() => getMDXComponent(content), [content]);

  return (
    <SectionContainer>
      <article>
        <header className="py-6 xl:pb-16 xl:pt-16">
          <div className="space-y-4">
            <BlogTags tags={tags} />
            <PageTitle>{displayTitle}</PageTitle>
            <dl>
              <div>
                <dt className="sr-only">Published on</dt>
                <BlogMeta date={date} readingTime={readingTime} />
              </div>
            </dl>
          </div>
        </header>
        <div className="pb-8" style={{ gridTemplateRows: "auto 1fr" }}>
          <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose prose-lg max-w-none pb-8 text-justify dark:prose-dark md:prose-xl">
              <MDXContent />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              {/* Social buttons can be added here later */}
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2">
                <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Tags
                </h2>
                <div className="mb-2 py-1">
                  <BlogTags tags={tags} />
                </div>
              </div>
            </footer>
          </div>
          {(next || prev) && (
            <div className="block justify-between space-y-4 md:flex md:space-y-0">
              {prev && (
                <div>
                  <h2 className="text-xxs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Previous {folderName === "snippets" ? "Snippet" : "Article"}
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link
                      href={`/${prev.folderName || folderName}/${prev.slug}`}
                    >
                      {"heading" in prev && prev.heading
                        ? prev.heading
                        : prev.title}
                    </Link>
                  </div>
                </div>
              )}
              {next && (
                <div>
                  <h2 className="text-xxs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Next {folderName === "snippets" ? "Snippet" : "Article"}
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link
                      href={`/${next.folderName || folderName}/${next.slug}`}
                    >
                      {"heading" in next && next.heading
                        ? next.heading
                        : next.title}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </SectionContainer>
  );
}
