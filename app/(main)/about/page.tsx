import { getAuthorData } from "@/lib/mdx"
import { ProfileCard } from "@/components/ProfileCard"
import { BlogLinks } from "@/components/BlogLinks"
import { Link } from "@/components/Link"
import { siteConfig } from "@/data/site"

export const metadata = {
  title: `About - ${siteConfig.author} - ${siteConfig.title}`,
  description: `About - ${siteConfig.title} - More about me and this blog`,
}

export default async function About() {
  const authorData = await getAuthorData()

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="mt-8 divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-100 md:mt-16 md:pb-0">
        <div className="flex flex-row space-y-2 md:my-4 md:space-y-5 md:pb-8 md:pt-6 xl:grid xl:grid-cols-3">
          <div className="md:pr-8 xl:col-span-2">
            <div className="mb-8 bg-clip-text text-4xl font-extrabold leading-[60px] tracking-tight text-orange-600 dark:text-amber-600 md:text-5xl md:leading-[86px]">
              Hi, I'm Kaveh! &#128075;
            </div>
            <div className="prose prose-xl space-y-3 leading-8 text-gray-700 dark:text-stone-200">
              <p>
                I work as a quantitative portfolio manager focused mostly on
                digital assets while living sometimes as a{" "}
                <Link href="/blog/digital-nomadness/">digital nomad</Link>.
              </p>
              <p>
                I am a recovering tradfi banker. I worked in traditional finance
                for +10 years as an investment banker, derivatives trader, and
                quantitative portfolio manager before leaving for entrepreneurial
                pursuits.
              </p>
              <p>
                I grew up with computers and fell in love with programming in my
                teenage years.
              </p>
              <p>I am currently learning Spanish. Habla español conmigo!</p>
            </div>
            <div className="prose prose-xl mt-4 leading-8">
              <BlogLinks />
            </div>
          </div>
          <div className="hidden pl-8 pt-24 md:block">
            <ProfileCard />
          </div>
        </div>
      </div>
      <div className="items-start pt-8">
        <div
          className="prose prose-xl max-w-none pb-8 text-justify dark:prose-dark"
          dangerouslySetInnerHTML={{ __html: authorData.content }}
        />
      </div>
    </div>
  )
}

