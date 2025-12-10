import { Link } from "@/components/Link";
import { TagText } from "@/components/TagText";
import type { TagsCount } from "@/lib/tags";
import { kebabCase } from "@/lib/client-utils";

export function HomepageTags({ tags }: { tags: TagsCount }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-[#404040] md:mt-4 md:flex-row md:items-center md:justify-start md:space-x-6 md:divide-y-0">
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
        {Object.keys(tags).length === 0 && (
          <span className="text-gray-500 dark:text-[#808080]">
            No tags found.
          </span>
        )}
        {sortedTags.map((tag) => {
          return (
            <Link
              key={tag}
              href={`/tags/${kebabCase(tag)}`}
              className="flex border-2 border-gray-300 dark:border-[#404040] text-center align-middle hover:border-[#cc6600] dark:hover:border-[#ff8800]"
            >
              <div className="pl-2">
                <TagText text={tag} />
              </div>
              <div className="border-l border-gray-300 dark:border-[#404040] bg-gray-100 dark:bg-[#2d2d2d] px-2 font-semibold text-[#cc6600] dark:text-[#ff8800]">
                {tags[tag]}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
