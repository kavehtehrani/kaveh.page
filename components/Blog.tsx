import Tags from '~/components/homepage/Tags'
import { BlogListLayout } from '~/layouts/BlogListLayout'
import type { BlogFrontMatter, TagsCount } from '~/types'

const Blog = ({ posts, tags }: { posts: BlogFrontMatter[]; tags: TagsCount }) => {
  return (
    <>
      <p className="text-lg text-gray-500 dark:text-gray-400">
        I write mostly about{' '}
        <span className="text-neutral-700 dark:text-neutral-300">
          finance, tech, and living nomadically.{' '}
        </span>
        <span>Use the tags or search below to filter content.</span>
      </p>
      <Tags tags={tags} />
      <BlogListLayout posts={posts} title="" />
    </>
  )
}

export default Blog
