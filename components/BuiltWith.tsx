import { siteConfig } from "@/data/site"
import { Link } from "./Link"

export function BuiltWith() {
  return (
    <div className="flex items-center space-x-1 text-sm">
      <span className="mr-1 text-gray-500 dark:text-gray-400">
        Overengineered with
      </span>
      <div className="flex space-x-1.5">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          <span className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            Next.js
          </span>
        </a>
        <span className="text-gray-400 dark:text-gray-500">•</span>
        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            Tailwind
          </span>
        </a>
        <span className="text-gray-400 dark:text-gray-500">•</span>
        <a
          href="https://www.typescriptlang.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            TypeScript
          </span>
        </a>
      </div>
      <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
      <Link
        href="https://github.com/kavehtehrani/kaveh.page"
        className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
      >
        View source
      </Link>
      <span className="px-1 text-gray-400 dark:text-gray-500">-</span>
      <Link
        href="/feed.xml"
        className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
      >
        RSS
      </Link>
    </div>
  )
}

