import { BlogTags } from "@/components/blog/BlogTags"
import { BlogMeta } from "@/components/blog/BlogMeta"
import { PageTitle } from "@/components/PageTitle"
import { SectionContainer } from "@/components/SectionContainer"
import { Link } from "@/components/Link"
import { siteConfig } from "@/data/site"
import type { BlogFrontMatter } from "@/components/PostListItem"

interface PostSimpleProps {
  frontMatter: BlogFrontMatter
  content: string
  next?: BlogFrontMatter | null
  prev?: BlogFrontMatter | null
}

export function PostSimple({ frontMatter, content, next, prev }: PostSimpleProps) {
  const { date, title, slug, tags, readingTime } = frontMatter
  const postUrl = `${siteConfig.url}/blog/${slug}`

  return (
    <SectionContainer>
      <article>
        <header className="py-6 xl:pb-16 xl:pt-16">
          <div className="space-y-4">
            <BlogTags tags={tags} />
            <PageTitle>{title}</PageTitle>
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
            <div
              className="prose prose-lg max-w-none pb-8 text-justify dark:prose-dark md:prose-xl"
              dangerouslySetInnerHTML={{ __html: content }}
            />
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
                    Previous Article
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                  </div>
                </div>
              )}
              {next && (
                <div>
                  <h2 className="text-xxs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Next Article
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </article>
    </SectionContainer>
  )
}

