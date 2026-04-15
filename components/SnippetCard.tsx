import { Link } from "./Link";
import { DevIcon } from "./DevIcon";
import type { SnippetFrontMatter } from "@/lib/mdx";

export function SnippetCard({ snippet }: { snippet: SnippetFrontMatter }) {
  const { type, heading, summary, title, slug } = snippet;

  return (
    <div className="flex rounded-lg shadow-sm border border-gray-300 hover:border-gray-500 hover:shadow-md hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-400 dark:hover:bg-terminal-bg-light transition-all duration-200">
      <div className="p-3 lg:p-4">
        {type && <DevIcon type={type} />}
      </div>
      <div className="overflow-hidden p-3 md:p-4 lg:p-4">
        <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold leading-8 tracking-tight lg:text-2xl">
          <Link
            href={`/snippets/${slug}`}
            className="text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright hover:underline"
          >
            {heading}
          </Link>
        </h3>
        <p className="text-md mt-2 text-gray-700 dark:text-gray-400 lg:text-base">{summary}</p>
      </div>
    </div>
  );
}

