import type { ProjectCardProps } from '~/types'
import { Image } from './Image'
import { Link } from './Link'
import GithubLogo from '~/icons/github.svg'
import { siteMetadata } from '~/data/siteMetadata'

export function ProjectCard({ project }: ProjectCardProps) {
  let { title, description, imgSrc, url, repo, builtWith } = project

  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div
        className="flex h-full flex-col overflow-hidden rounded-md border
        border-gray-400 border-opacity-60 hover:border-gray-500
        dark:border-gray-600 dark:hover:border-gray-400 shadow-lg shadow-neutral-600"
      >
        <Image
          alt={title}
          src={imgSrc}
          className="object-cover object-center mx-6 mt-4"
          width={1088}
          height={612}
        />
        <div className="flex mt-4 grow flex-col justify-between space-y-6 p-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              {url ? (
                <Link href={url} aria-label={`Link to ${title}`}>
                  <span data-umami-event="project-title-link">{title}</span>
                </Link>
              ) : (
                title
              )}
            </h2>
            <div className="max-w-none space-y-2 text-justify whitespace-pre-line text-gray-500 dark:text-gray-400">
              <p>{description}</p>
              {builtWith && (
                <div className="flex pt-4 flex-wrap space-x-1.5">
                  <span className="shrink-0 text-gray-500 dark:text-neutral-100">Built with:</span>
                  {builtWith?.map((tool, index) => {
                    return (
                      <span key={index} className="font-semibold text-gray-500 dark:text-gray-400">
                        {tool}
                        {index !== builtWith.length - 1 && ','}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <Link
              href={url}
              className="text-base font-medium leading-6 text-primary-500
              hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              <span data-umami-event="project-learn-more">Learn more &rarr;</span>
            </Link>
            {repo && (
              <a
                href={`${siteMetadata.github}/${repo}`}
                target="_blank"
                data-umami-event="contact-github"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Github</span>
                <GithubLogo
                  className="h-6 w-6 fill-current text-gray-700 hover:text-blue-500 hover:scale-[1.2]
              dark:text-gray-200 dark:hover:text-blue-400 ease-out duration-100"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
