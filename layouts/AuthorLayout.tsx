import React from 'react'
import { ProfileCard } from '~/components/ProfileCard'
import { PageSeo } from '~/components/SEO'
import { siteMetadata } from '~/data/siteMetadata'
import type { AuthorLayoutProps } from '~/types'
import { BlogLinks } from '~/components/homepage/BlogLinks'
import { Link } from '~/components/Link'

export function AuthorLayout({ children }: AuthorLayoutProps) {
  let title = 'About'
  let description = 'More about me and this blog'

  return (
    <>
      <PageSeo
        title={`${title} - ${siteMetadata.author} - ${siteMetadata.title}`}
        description={`${title} - ${siteMetadata.title} - ${description}`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="mt-8 dark:text-gray-100 divide-y divide-gray-200 dark:divide-gray-700 md:mt-16 md:pb-0 mb:mb-0">
          <div className="flex flex-row space-y-2 md:my-4 md:space-y-5 md:pb-8 md:pt-6 xl:grid xl:grid-cols-3">
            <div className="md:pr-8 xl:col-span-2">
              <div
                className={
                  'text-orange-600 dark:text-amber-600 mb-8 bg-clip-text text-4xl ' +
                  'font-extrabold leading-[60px] tracking-tight md:text-5xl md:leading-[86px]'
                }
              >
                Hi, I'm Kaveh! &#128075;
              </div>
              <div className="text-lg leading-8 space-y-3 text-gray-700 dark:text-stone-200">
                <p>
                  I work as a quantitative portfolio manager focused mostly on digital assets while
                  living full time as a<Link href={'/blog/digital-nomadness/'}> digital nomad</Link>
                  .
                </p>
                <p>
                  {' '}
                  I am a recovering tradfi banker. I worked in traditional finance for +10 years as
                  an investment banker, derivatives trader, and quantitative portfolio manager
                  before leaving for entrepreneurial pursuits.{' '}
                </p>
                <p>
                  I grew up with computers and fell in love with programming in my teenage years.
                </p>
                <p> I am currently living in Latin America. Habla español conmigo! </p>
              </div>
              <div className="text-lg leading-8 mt-4">
                <BlogLinks />
              </div>
            </div>
            <div className="hidden pl-8 pt-24 md:block">
              <ProfileCard />
            </div>
            {/* TODO: Make a map*/}
            {/*Countries visited:\*/}
            {/*🇨🇦 🇺🇸 🇮🇷 🇧🇸 🇵🇪 🇨🇴 🇬🇹 🇲🇽 🇧🇷 🇨🇷 🇸🇬 🇦🇿 🇦🇹 🇫🇷 🇵🇹 🇪🇸 🇧🇪 🇵🇱 🇩🇪 🇮🇹 🇭🇺 🇨🇿 🇨🇾 🇬🇷 🇭🇷 🇹🇷 🇶🇦 🇦🇪 🇲🇦 🇹🇯*/}
          </div>
        </div>
      </div>
      <div className="items-start pt-8 ">
        {/*<ProfileCard />*/}
        <div className="prose prose-lg text-justify max-w-none pb-8 dark:prose-dark ">
          {children}
        </div>
      </div>
    </>
  )
}

export default AuthorLayout
