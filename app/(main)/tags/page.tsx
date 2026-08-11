import { PAGE_HEADING } from "@/lib/styles";
import { ROUTES } from "@/data/constants";
import { buildPageMetadata } from "@/lib/metadata";
import { Tag } from "@/components/Tag";
import { getAllTags } from "@/lib/tags";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: "Tags",
  description: "Browse blog posts and snippets by tags - Things I blog about",
  path: ROUTES.tags,
});

export default function Tags() {
  const tags = getAllTags("blog", "snippets");
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a]);

  return (
    <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-terminal-bg-lighter md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
      <div className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className={`${PAGE_HEADING} md:border-r-2 md:px-6`}>
          Tags
        </h1>
      </div>
      <div className="flex max-w-lg flex-wrap">
        {Object.keys(tags).length === 0 && "No tags found."}
        {sortedTags.map((tag) => {
          return (
            // One anchor per tag. This was previously two adjacent links to the
            // same URL, the second labelled only "(11)" — which reads as a
            // separate destination to screen readers and splits the link signal.
            <div key={tag} className="mb-2 mr-5 mt-2">
              <Tag text={tag} count={tags[tag]} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
