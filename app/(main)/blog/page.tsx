import { getAllFilesFrontMatter } from "@/lib/mdx"
import { PostListItem } from "@/components/PostListItem"
import { siteConfig } from "@/data/site"

export const metadata = {
  title: `Blog - ${siteConfig.title}`,
  description: siteConfig.description,
}

export default async function BlogPage() {
  const posts = getAllFilesFrontMatter("blog")

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Blog
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {siteConfig.description}
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map((post) => (
          <PostListItem key={post.slug} frontMatter={post} />
        ))}
      </ul>
    </div>
  )
}

