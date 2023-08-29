import { PageSeo } from '~/components/SEO'
import { siteMetadata } from '~/data/siteMetadata'
import { getAllFilesFrontMatter } from '~/libs/mdx'
import type { BlogFrontMatter, TagsCount } from '~/types'
import Blog from '~/components/Blog'
import { getAllTags } from '~/libs/tags'

export function getStaticProps() {
  let posts = getAllFilesFrontMatter('blog')

  // display tags from everywhere but only show blog posts on front page
  let tags = getAllTags('blog', 'snippets')

  return { props: { posts, tags } }
}

export default function Home({ posts, tags }: { posts: BlogFrontMatter[]; tags: TagsCount }) {
  return (
    <>
      <PageSeo title={siteMetadata.title} description={siteMetadata.description} />
      <div id="blog" className="mt-8 mb-6 border-b-2 border-gray-500">
        <Blog posts={posts} tags={tags} />
      </div>
    </>
  )
}
