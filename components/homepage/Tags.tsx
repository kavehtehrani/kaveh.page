import { Link } from "@/components/Link";
import { TagText } from "@/components/TagText";
import type { TagsCount } from "@/lib/tags";
import { kebabCase } from "@/lib/client-utils";

export function HomepageTags({ tags }: { tags: TagsCount }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-terminal-bg-lighter md:mt-4 md:flex-row md:items-center md:justify-start md:space-x-6 md:divide-y-0">
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
        {Object.keys(tags).length === 0 && (
          <span className="text-gray-500 dark:text-terminal-gray">
            No tags found.
          </span>
        )}
        {sortedTags.map((tag) => {
          return (
            <Link
              key={tag}
              href={`/tags/${kebabCase(tag)}`}
              className="flex border-2 border-gray-300 dark:border-terminal-bg-lighter text-center align-middle hover:border-terminal-orange-dim dark:hover:border-terminal-orange"
            >
              <div className="pl-2">
                <TagText text={tag} />
              </div>
              <div className="border-l border-gray-300 dark:border-terminal-bg-lighter bg-gray-100 dark:bg-terminal-bg-light px-2 font-semibold text-terminal-orange-dim dark:text-terminal-orange">
                {tags[tag]}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
