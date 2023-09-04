import { siteMetadata } from '~/data/siteMetadata'
import { BuiltWith } from './BuiltWith'
import SocialAccounts from '~/components/SocialAccounts'
import ButtonDown from '~/components/ButtonDown'
import { Link } from '~/components/Link'
export function Footer() {
  return (
    <footer>
      <div className="flex flex-col gap-y-2 pb-2 items-center justify-center">
        <div className="mb-4">
          <SocialAccounts />
        </div>
        <ButtonDown />
        <div className="mt-2">
          <BuiltWith />
        </div>
        <div
          className="text-neutral-400 dark:text-neutral-500 gap-x-2 text-sm
          text-center items-center justify-center sm:flex"
        >
          <div className="mb-1 sm:mb-0">{`Kaveh Tehrani © ${new Date().getFullYear()}`}</div>
          <span className="hidden sm:flex">{` • `}</span>
          <span>{siteMetadata.footerTitle}</span>
          <span className="sm:flex">{` • `}</span>
          <Link
            href="/privacy"
            className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
          >
            <span data-umami-event="view-privacy">Privacy</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
