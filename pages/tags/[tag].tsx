import { PageSeo } from '~/components/SEO'
import fs from 'fs'
import path from 'path'
import { siteMetadata } from '~/data/siteMetadata'
import { BlogListLayout } from '~/layouts/BlogListLayout'
import { generateRss } from '~/libs/generate-rss'
import { getAllFilesFrontMatter } from '~/libs/mdx'
import { getAllTags } from '~/libs/tags'
import type { BlogFrontMatter } from '~/types'
import { kebabCase } from '~/utils/kebab-case'

export function getStaticPaths() {
  let tags = getAllTags('blog', 'snippets')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
  let allPosts = getAllFilesFrontMatter('blog', 'snippets')
  let filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  let root = process.cwd()
  let rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
  let rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)

  return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function Tag({ posts, tag }: { posts: BlogFrontMatter[]; tag: string }) {
  // Capitalize first letter and convert space to dash
  let title = tag[0] + tag.split(' ').join('-').slice(1)
  return (
    <>
      <PageSeo
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.title}`}
      />
      <BlogListLayout posts={posts} title={`Tag: #${title}`} />
    </>
  )
}
