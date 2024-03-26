import Image from 'next/image'
import { siteMetadata } from '~/data/siteMetadata'
import GithubLogo from '~/icons/github.svg'
import LinkedinLogo from '~/icons/linkedin.svg'
import FarcasterLogo from '~/icons/farcaster.svg'

export function ProfileCard() {
  let logoClassName =
    'h-1/2 w-1/2 mx-auto fill-current text-gray-500 hover:text-blue-500 ' +
    'dark:text-gray-300 dark:hover:text-blue-400 hover:scale-[1.1]'

  return (
    <div
      className="z-10 scale-100 transition-all duration-200 ease-out bg-stone-100 shadow-stone-900/50
                rounded-lg shadow-lg border-2 hover:z-50 hover:scale-[1.05]
                dark:bg-neutral-800 dark:shadow-amber-300/50"
    >
      <div
        className="top-0 mt-10 ml-10 mr-10 mb-8 border-2 rounded-full justiy-end align-bottom bg-stone-200
                        shadow-lg shadow-stone-500/50 dark:bg-amber-100 dark:shadow-amber-200/50"
      >
        <Image
          src={'/static/images/logo.png'}
          alt="avatar"
          width={350}
          height={350}
          className="backdrop-blur-sm"
          style={{
            objectPosition: '20% 0%',
            objectFit: 'contain',
            borderRadius: '50%',
            border: '0px solid #fff',
          }}
        />
      </div>
      <div className="block text-center">
        <h3 className="mx-4 text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">
          Kaveh Tehrani
        </h3>
        <h5 className="mx-4 py-2 text-l text-gray-700 dark:text-gray-400 lg:text-xl">
          Quantitative Finance
        </h5>
        <div className="flex flex-row pt-4">
          <div className="grid items-center mx-auto border-2 rounded-bl-md">
            <a
              href={siteMetadata.github}
              target="_blank"
              data-umami-event="contact-github"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Github</span>
              <GithubLogo className={logoClassName} />
            </a>
          </div>
          <div className="grid aspect-square items-center mx-auto border-2 ">
            <a
              href={siteMetadata.linkedin}
              target="_blank"
              data-umami-event="contact-linkedin"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Linkedin</span>
              <LinkedinLogo className={logoClassName} />
            </a>
          </div>
          <div className="grid aspect-square items-center mx-auto border-2 rounded-br-md">
            <a
              href={siteMetadata.farcaster}
              target="_blank"
              data-umami-event="contact-mastodon"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Mastodon</span>
              <FarcasterLogo className={logoClassName} />
            </a>
          </div>
        </div>
        <span className="h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      </div>
    </div>
  )
}
