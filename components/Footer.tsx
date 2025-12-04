import { siteConfig } from "@/data/site"
import { BuiltWith } from "./BuiltWith"
import { SocialAccounts } from "./SocialAccounts"
import { ButtonDown } from "./ButtonDown"
import { Link } from "./Link"

export function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center justify-center gap-y-2 pb-2">
        <div className="mb-4">
          <SocialAccounts />
        </div>
        <ButtonDown />
        <div className="mt-2">
          <BuiltWith />
        </div>
        <div className="flex items-center justify-center gap-x-2 text-center text-sm text-neutral-400 dark:text-neutral-500 sm:flex">
          <div className="mb-1 sm:mb-0">{`${siteConfig.author} © ${new Date().getFullYear()}`}</div>
          <span className="hidden sm:flex">{` • `}</span>
          <span>{siteConfig.title}</span>
          <span className="sm:flex">{` • `}</span>
          <Link
            href="/privacy"
            className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}

