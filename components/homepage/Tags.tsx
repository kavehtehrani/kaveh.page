import { Link } from "@/components/Link";
import { TagText } from "@/components/TagText";
import type { TagsCount } from "@/lib/tags";
import { kebabCase } from "@/lib/client-utils";

export function HomepageTags({ tags }: { tags: TagsCount }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-4 md:flex-row md:items-center md:justify-start md:space-x-6 md:divide-y-0">
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
        {Object.keys(tags).length === 0 && "No tags found."}
        {sortedTags.map((tag) => {
          return (
            <Link
              key={tag}
              href={`/tags/${kebabCase(tag)}`}
              className="flex rounded-lg border-2 text-center align-middle hover:border-primary-500 dark:hover:border-primary-400"
            >
              <div className="pl-2">
                <TagText text={tag} />
              </div>
              <div className="rounded-r-lg border-l bg-stone-100 px-2 font-semibold text-gray-600 dark:bg-stone-700 dark:text-gray-300">
                {tags[tag]}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

