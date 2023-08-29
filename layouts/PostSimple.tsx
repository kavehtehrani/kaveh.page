import React from 'react'
import { BlogMeta } from '~/components/blog/BlogMeta'
import { BlogTags } from '~/components/blog/BlogTags'
// import { Comments } from '~/components/comments'
import { PageTitle } from '~/components/PageTitle'
import { ScrollTopButton } from '~/components/ScrollTopButton'
import { SectionContainer } from '~/components/SectionContainer'
import { BlogSeo } from '~/components/SEO'
import { SocialButtons } from '~/components/SocialButtons'
import { siteMetadata } from '~/data/siteMetadata'
import type { PostSimpleLayoutProps } from '~/types'
import { Link } from '~/components/Link'

export function PostSimple(props: PostSimpleLayoutProps) {
  let { frontMatter, type, children, authorDetails, commentConfig, next, prev } = props
  let { date, title, slug, fileName, tags, readingTime } = frontMatter
  let postUrl = `${siteMetadata.siteUrl}/${type}/${slug}`

  return (
    <SectionContainer>
      <BlogSeo
        url={`${siteMetadata.siteUrl}/${type}/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      <ScrollTopButton />
      <article>
        <header className="py-6 xl:pb-16 xl:pt-16">
          <div className="space-y-4">
            <BlogTags tags={tags} />
            <PageTitle>{title}</PageTitle>
            <dl>
              <div>
                <dt className="sr-only">Published on</dt>
                <BlogMeta date={date} slug={slug} readingTime={readingTime} />
              </div>
            </dl>
          </div>
        </header>
        <div className="pb-8" style={{ gridTemplateRows: 'auto 1fr' }}>
          <div className="xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose prose-lg text-justify max-w-none pb-8 dark:prose-dark md:prose-xl">
              {children}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700">
              <SocialButtons postUrl={postUrl} title={title} fileName={fileName} />
              {/*TODO: insert comment ability*/}
              {/*<Comments frontMatter={frontMatter} config={commentConfig} />*/}
            </div>
            <footer>
              <div className="text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2">
                <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  Tags
                </h2>
                <div className="py-1 mb-2">
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
                    <Link href={`/${prev.folderName}/${prev.slug}`}>{prev.title}</Link>
                  </div>
                </div>
              )}
              {next && (
                <div>
                  <h2 className="text-xxs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                    Next Article
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/${next.folderName}/${next.slug}`}>{next.title}</Link>
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

export default PostSimple
