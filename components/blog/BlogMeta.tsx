import type { BlogMetaProps } from '~/types'
import { formatDate } from '~/utils/date'
import { ViewCounter } from '../ViewCounter'

export function BlogMeta({ date, slug, readingTime }: BlogMetaProps) {
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
      {/*<span className="mx-2">{` • `}</span>*/}
      {/*<div className="flex items-center">*/}
      {/*&#128065;&#65039;*/}
      {/*<ViewCounter className="ml-1.5 md:ml-2" slug={slug} />*/}
      {/*</div>*/}
    </dd>
  )
}
