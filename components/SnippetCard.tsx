import { Link } from "./Link";
import type { SnippetFrontMatter } from "@/lib/mdx";

export function SnippetCard({ snippet }: { snippet: SnippetFrontMatter }) {
  const { type, heading, summary, title, slug } = snippet;

  return (
    <Link href={`/snippets/${slug}`} title={title}>
      <div className="mb-4 flex cursor-pointer rounded border border-gray-300 hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400 lg:mb-0">
        <div className="flex items-center justify-center p-3 lg:p-4">
          {type && (
            <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300 lg:h-14 lg:w-14 xl:h-24 xl:w-24">
              {type}
            </div>
          )}
        </div>
        <div className="overflow-hidden p-3 md:p-4 lg:p-4">
          <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold leading-8 tracking-tight lg:text-2xl">
            {heading}
          </h3>
          <p className="text-md mt-2 text-gray-700 dark:text-gray-400 lg:text-base">{summary}</p>
        </div>
      </div>
    </Link>
  );
}

