import { BlogTags } from "@/components/blog/BlogTags";
import { BlogMeta } from "@/components/blog/BlogMeta";
import { PageTitle } from "@/components/PageTitle";
import { SectionContainer } from "@/components/SectionContainer";
import { MDXContent } from "@/components/MDXContent";
import { KeyboardNavigation } from "@/components/KeyboardNavigation";
import { PostNavigation } from "@/components/PostNavigation";
import { getDisplayTitle } from "@/lib/client-utils";
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
  const displayTitle = getDisplayTitle(frontMatter);

  return (
    <>
      <KeyboardNavigation next={next} prev={prev} folderName={folderName} />
      <SectionContainer>
        <article className="w-full">
          <header className="py-4 xl:pb-8 xl:pt-8 border-b border-gray-200 dark:border-[#404040]">
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
          <div className="pb-8 w-full">
            <div className="w-full">
              <div className="prose prose-sm max-w-none pb-8 dark:prose-dark md:prose-xl w-full">
                <MDXContent content={content} />
              </div>
              <footer>
                <div className="text-sm font-medium leading-5">
                  <h2 className="text-xs tracking-wide text-gray-500 dark:text-[#808080] uppercase">
                    Tags
                  </h2>
                  <div className="mb-2 py-1">
                    <BlogTags tags={tags} />
                  </div>
                </div>
              </footer>
            </div>
            <PostNavigation next={next} prev={prev} folderName={folderName} />
          </div>
        </article>
      </SectionContainer>
    </>
  );
}
