import { Link } from "@/components/Link";
import { getDisplayTitle } from "@/lib/client-utils";
import type { BlogFrontMatter } from "@/components/PostListItem";
import type { SnippetFrontMatter } from "@/lib/mdx";

type FrontMatter = BlogFrontMatter | SnippetFrontMatter;

interface PostNavigationProps {
  next?: FrontMatter | null;
  prev?: FrontMatter | null;
  folderName?: string;
}

export function PostNavigation({
  next,
  prev,
  folderName = "blog",
}: PostNavigationProps) {
  if (!next && !prev) return null;

  return (
    <div className="block justify-between space-y-4 md:flex md:space-y-0 border-t border-gray-200 dark:border-terminal-bg-lighter pt-4 mt-4">
      {prev && (
        <div>
          <h2 className="text-xxs tracking-wide text-gray-500 dark:text-terminal-gray uppercase">
            Previous {folderName === "snippets" ? "Snippet" : "Article"}
          </h2>
          <div className="text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright transition-colors duration-150">
            <Link href={`/${prev.folderName || folderName}/${prev.slug}`}>
              {getDisplayTitle(prev)}
            </Link>
          </div>
        </div>
      )}
      {next && (
        <div>
          <h2 className="text-xxs tracking-wide text-gray-500 dark:text-terminal-gray uppercase">
            Next {folderName === "snippets" ? "Snippet" : "Article"}
          </h2>
          <div className="text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright transition-colors duration-150">
            <Link href={`/${next.folderName || folderName}/${next.slug}`}>
              {getDisplayTitle(next)}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
