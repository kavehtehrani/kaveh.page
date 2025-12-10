import { getAuthorData } from "@/lib/mdx";
import { ProfileCard } from "@/components/ProfileCard";
import { BlogLinks } from "@/components/BlogLinks";
import { Link } from "@/components/Link";
import { AuthorContent } from "@/components/AuthorContent";
import { siteConfig } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About - ${siteConfig.author}`,
  description: `About ${siteConfig.author} - ${siteConfig.description}`,
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    url: `${siteConfig.url}/about`,
    title: `About - ${siteConfig.author}`,
    description: `About ${siteConfig.author} - ${siteConfig.description}`,
    type: "profile",
  },
};

export default async function About() {
  const authorData = await getAuthorData();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="mt-8 divide-y divide-gray-200 dark:divide-gray-700 dark:text-gray-100 md:mt-16 md:pb-0">
        <div className="flex flex-row space-y-2 md:my-4 md:space-y-5 md:pb-8 md:pt-6 xl:grid xl:grid-cols-3">
          <div className="md:pr-8 xl:col-span-2">
            <div className="mb-8 bg-clip-text text-4xl font-extrabold leading-[60px] tracking-tight text-primary-600 dark:text-primary-400 md:text-5xl md:leading-[86px]">
              Hi, I&apos;m Kaveh! &#128075;
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
                quantitative portfolio manager before leaving for
                entrepreneurial pursuits.
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
          <div className="hidden pl-8 pt-24 md:block xl:flex xl:justify-start">
            <div className="w-full max-w-sm">
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
      <div className="items-start pt-8">
        <AuthorContent content={authorData.content} />
      </div>
    </div>
  );
}
