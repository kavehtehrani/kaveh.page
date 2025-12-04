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
    <li key={slug}>
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="flex flex-row whitespace-pre text-base font-medium leading-6 text-gray-500 dark:text-gray-400 xl:flex-col">
            <time dateTime={date}>{formatDate(date)}</time>
            <span className="flex xl:hidden">{`  •  `}</span>
            <span className="text-sm xl:mt-2">
              {String.fromCodePoint(0x2615).repeat(Math.ceil(readingTime.minutes / 5))}
              {`  `}
              {readingTime.text.replace("min", "mins")}
            </span>
          </dd>
        </dl>
        <div className="space-y-3 xl:col-span-3">
          <div>
            <h3 className="text-2xl font-bold leading-8 tracking-tight">
              <Link href={`/${folderName}/${slug}`} className="text-gray-900 dark:text-gray-100">
                {title}
              </Link>
            </h3>
            <div className="mt-1 flex flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
        </div>
      </article>
    </li>
  )
}

