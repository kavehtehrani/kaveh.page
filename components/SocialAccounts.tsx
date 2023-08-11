import { siteMetadata } from '~/data/siteMetadata'
import GithubLogo from '~/icons/github.svg'
import TwitterLogo from '~/icons/twitter.svg'
import LinkedinLogo from '~/icons/linkedin.svg'
import InstagramLogo from '~/icons/instagram.svg'
import MediumLogo from '~/icons/medium.svg'
import NomadlistLogo from '~/icons/nomadlist.svg'
import MastodonLogo from '~/icons/mastodon.svg'

export default function SocialAccounts() {
  let logoClassName =
    'h-6 w-6 fill-current text-gray-700 hover:text-blue-500 hover:scale-[1.2] ' +
    'dark:text-gray-200 dark:hover:text-blue-400 ease-out duration-100'

  return (
    <div>
      <div className="flex space-x-4">
        <a
          href={siteMetadata.github}
          target="_blank"
          data-umami-event="contact-github"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Github</span>
          <GithubLogo className={logoClassName} />
        </a>
        <a
          href={siteMetadata.mastodon}
          target="_blank"
          data-umami-event="contact-mastodon"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Mastodon</span>
          <MastodonLogo className={logoClassName} />
        </a>

        <a
          href={siteMetadata.twitter}
          target="_blank"
          data-umami-event="contact-twitter"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Twitter</span>
          <TwitterLogo className={logoClassName} />
        </a>
        <a
          href={siteMetadata.linkedin}
          target="_blank"
          data-umami-event="contact-linkedin"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Linkedin</span>
          <LinkedinLogo className={logoClassName} />
        </a>
        <a
          href={siteMetadata.instagram}
          target="_blank"
          data-umami-event="contact-instagram"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Instagram</span>
          <InstagramLogo className={logoClassName} />
        </a>
        <a
          href={siteMetadata.medium}
          target="_blank"
          data-umami-event="contact-medium"
          rel="noopener noreferrer"
        >
          <span className="sr-only">Medium</span>
          <MediumLogo className={logoClassName} />
        </a>
        <a
          href={siteMetadata.nomadlist}
          target="_blank"
          data-umami-event="contact-nomadlist"
          rel="noopener noreferrer"
        >
          <span className="sr-only">NomadList</span>
          <NomadlistLogo className={logoClassName} />
        </a>
      </div>
    </div>
  )
}
