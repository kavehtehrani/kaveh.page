import Image from "next/image";
import { Link } from "./Link";
import { DevIcon } from "./DevIcon";
import type { Project } from "@/data/projects";
import { siteConfig } from "@/data/site";

export function ProjectCard({ project }: { project: Project }) {
  const { title, description, imgSrc, url, repo, builtWith } = project;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-gray-400 border-opacity-60 hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400 shadow-lg shadow-neutral-600 transition-all bg-white dark:bg-stone-800">
      <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
        <Image
          alt={title}
          src={imgSrc}
          fill
          className="object-contain object-center p-2"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex-1">
          <h2 className="text-2xl font-bold leading-7 tracking-tight">
            {url ? (
              <Link
                href={url}
                aria-label={`Link to ${title}`}
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          {description && (
            <p className="mt-2 text-base leading-6 text-gray-500 dark:text-gray-400 line-clamp-3">
              {description}
            </p>
          )}
          {builtWith && builtWith.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Built with:
              </span>
              {builtWith.map((tool, index) => (
                <span
                  key={index}
                  className="font-semibold text-gray-600 dark:text-gray-300"
                >
                  {tool}
                  {index !== builtWith.length - 1 && ","}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          {url && !repo && (
            <Link
              href={url}
              className="text-base text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Visit →
            </Link>
          )}
          {repo && (
            <Link
              href={`https://github.com/kavehtehrani/${repo}`}
              className="ml-auto flex items-center transition-transform duration-200 hover:scale-110"
              aria-label="View on GitHub"
            >
              <DevIcon type="GitHub" className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
