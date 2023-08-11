import { siteMetadata } from '~/data/siteMetadata'
import { BuiltWith } from './BuiltWith'
import SocialAccounts from '~/components/SocialAccounts'

export function Footer() {
  return (
    <footer>
      <div className="flex flex-col gap-y-4 pb-2 items-center justify-center">
        <div className="mb-4 flex flex-col">
          <SocialAccounts />
        </div>
        <BuiltWith />
        <div
          className="text-neutral-400 dark:text-neutral-500 gap-x-2 text-sm
          text-center items-center justify-center sm:flex"
        >
          <div className="mb-1 sm:mb-0">{`Kaveh Tehrani © ${new Date().getFullYear()}`}</div>
          <span className="hidden sm:flex">{` • `}</span>
          <span>{siteMetadata.footerTitle}</span>
        </div>
      </div>
    </footer>
  )
}
