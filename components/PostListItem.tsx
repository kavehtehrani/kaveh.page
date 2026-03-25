import { formatDate } from "@/lib/client-utils";
import { Link } from "./Link";
import { Tag } from "./Tag";

export interface BlogFrontMatter {
  slug: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];
  readingTime: {
    text: string;
    minutes: number;
  };
  folderName?: string;
  fileName?: string;
  draft?: boolean;
  layout?: string;
}

export function PostListItem({
  frontMatter,
}: {
  frontMatter: BlogFrontMatter;
}) {
  const {
    slug,
    date,
    title,
    summary,
    tags,
    readingTime,
    folderName = "blog",
  } = frontMatter;

  return (
    <li
      key={slug}
      className="py-4 px-4 border-b border-gray-200 dark:border-terminal-bg-lighter last:border-b-0 rounded-lg hover:bg-gray-50 dark:hover:bg-terminal-bg-light transition-colors"
    >
      <article>
        {/* Title and date/reading time - stacked on mobile, side by side on larger screens */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="text-2xl md:text-3xl font-bold leading-8 md:leading-9">
            <Link
              href={`/${folderName}/${slug}`}
              className="text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="flex items-baseline gap-2 whitespace-nowrap text-sm text-gray-500 dark:text-terminal-gray">
            <time dateTime={date}>{formatDate(date)}</time>
            <span className="text-gray-400 dark:text-terminal-bg-lighter">|</span>
            <span>
              {String.fromCodePoint(0x2615).repeat(
                Math.ceil(readingTime.minutes / 5)
              )}
              {` `}
              {readingTime.text.replace("min", "mins")}
            </span>
          </div>
        </div>
        {/* Summary */}
        <div className="mt-2 text-gray-600 dark:text-terminal-gray-light text-lg md:text-xl leading-7 md:leading-8">
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
  );
}
