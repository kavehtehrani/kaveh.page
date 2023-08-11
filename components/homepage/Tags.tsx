import { Link } from '~/components/Link'
import { Tag } from '~/components/Tag'
import type { TagsCount } from '~/types'
import { kebabCase } from '~/utils/kebab-case'

export default function Tags({ tags }: { tags: TagsCount }) {
  let sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

  return (
    <>
      <div
        className="flex flex-col items-start justify-start divide-y divide-gray-200
        dark:divide-gray-700 md:mt-4 md:flex-row md:items-center md:justify-start
        md:space-x-6 md:divide-y-0"
      >
        <div className="flex flex-wrap gap-y-2 gap-x-3 mt-4">
          {Object.keys(tags).length === 0 && 'No tags found.'}
          {sortedTags.map((tag) => {
            return (
              <div key={tag} className="pl-2 flex border-2 rounded-lg text-center align-middle">
                <div className="">
                  <Tag text={tag} />
                </div>
                <Link
                  href={`/tags/${kebabCase(tag)}`}
                  className="font-semibold bg-stone-100 px-2 border-l rounded-r-lg text-gray-600
                  dark:bg-stone-700 dark:text-gray-300"
                >
                  {tags[tag]}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
