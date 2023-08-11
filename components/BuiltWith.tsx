import { siteMetadata } from '~/data/siteMetadata'
import { DevIcon } from './DevIcon'
import { Link } from './Link'

export function BuiltWith() {
  return (
    <div className="flex text-sm items-center space-x-1">
      <span className="mr-1 text-gray-500 dark:text-gray-400">Overengineered with</span>
      <div className="flex space-x-1.5">
        <a href={`https://nextjs.org?ref=${siteMetadata.shortUrl}`}>
          <DevIcon type="NextJS" className="h-4 w-4" />
        </a>
        <a href={`https://tailwindcss.com?ref=${siteMetadata.shortUrl}`}>
          <DevIcon type="TailwindCSS" className="h-4 w-4" />
        </a>
        <a href={`https://www.typescriptlang.org?ref=${siteMetadata.shortUrl}`}>
          <DevIcon type="Typescript" className="h-4 w-4" />
        </a>
        <a href={`https://umami.is?ref=${siteMetadata.shortUrl}`} className="pl-px">
          <DevIcon type="Umami" className="h-4 w-4" />
        </a>
      </div>
      <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
      <Link
        href={siteMetadata.siteRepo}
        className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
      >
        <span data-umami-event="view-source">View source</span>
      </Link>
      <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
      <a href={`/feed.xml`} className="pl-px">
        <DevIcon type="RSS" className="h-4 w-4" />
      </a>
    </div>
  )
}
