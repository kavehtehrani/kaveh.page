import type { BlogMetaProps } from '~/types'
import { formatDate } from '~/utils/date'

export function BlogMeta({ date, readingTime }: BlogMetaProps) {
  return (
    <dd className="flex flex-wrap text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 md:text-base">
      <time dateTime={date} className="flex items-center justify-center">
        &#128197;
        <span className="ml-1.5 md:ml-2">{formatDate(date)}</span>
      </time>
      <span className="mx-2">{` • `}</span>
      <div className="flex items-center">
        {String.fromCodePoint(0x2615).repeat(Math.ceil(readingTime['minutes'] / 5))}
        <span className="ml-1.5 md:ml-2">{readingTime.text.replace('min', 'mins')}</span>
      </div>
    </dd>
  )
}
