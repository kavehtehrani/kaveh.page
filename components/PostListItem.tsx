import { formatDate } from "@/lib/utils"
import { Link } from "./Link"
import { Tag } from "./Tag"

export interface BlogFrontMatter {
  slug: string
  date: string
  title: string
  summary: string
  tags: string[]
  readingTime: {
    text: string
    minutes: number
  }
  folderName?: string
  fileName?: string
  draft?: boolean
  layout?: string
}

export function PostListItem({ frontMatter }: { frontMatter: BlogFrontMatter }) {
  const { slug, date, title, summary, tags, readingTime, folderName = "blog" } = frontMatter

  return (
    <li key={slug} className="py-4">
      <article>
        {/* Title and date/reading time - stacked on mobile, side by side on larger screens */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="text-2xl font-bold leading-8 tracking-tight">
            <Link href={`/${folderName}/${slug}`} className="text-gray-900 dark:text-gray-100">
              {title}
            </Link>
          </h3>
          <div className="flex items-baseline gap-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date)}</time>
            <span>•</span>
            <span>
              {String.fromCodePoint(0x2615).repeat(Math.ceil(readingTime.minutes / 5))}
              {` `}
              {readingTime.text.replace("min", "mins")}
            </span>
          </div>
        </div>
        {/* Summary */}
        <div className="mt-2 prose max-w-none text-gray-500 dark:text-gray-400">
          {summary}
        </div>
        {/* Tags on their own line */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </article>
    </li>
  )
}

