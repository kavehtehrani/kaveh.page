import Image from "next/image"
import { siteConfig } from "@/data/site"

export function ProfileCard() {
  const logoClassName =
    "h-1/2 w-1/2 mx-auto fill-current text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 hover:scale-[1.1]"

  return (
    <div className="z-10 scale-100 rounded-lg border-2 bg-stone-100 shadow-lg shadow-stone-900/50 transition-all duration-200 ease-out hover:z-50 hover:scale-[1.05] dark:bg-neutral-800 dark:shadow-amber-300/50">
      <div className="justiy-end align-bottom mb-8 ml-10 mr-10 mt-10 rounded-full border-2 bg-stone-200 shadow-lg shadow-stone-500/50 dark:bg-amber-100 dark:shadow-amber-200/50">
        <Image
          src="/static/images/logo.png"
          alt="avatar"
          width={350}
          height={350}
          className="backdrop-blur-sm"
          style={{
            objectPosition: "20% 0%",
            objectFit: "contain",
            borderRadius: "50%",
            border: "0px solid #fff",
          }}
        />
      </div>
      <div className="block text-center">
        <h3 className="mx-4 text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">
          {siteConfig.author}
        </h3>
        <h5 className="mx-4 py-2 text-l text-gray-700 dark:text-gray-400 lg:text-xl">
          Quantitative Finance
        </h5>
        <div className="flex flex-row pt-4">
          <div className="mx-auto grid items-center rounded-bl-md border-2">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg className={logoClassName} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          <div className="mx-auto grid aspect-square items-center border-2">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <svg className={logoClassName} viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
          <div className="mx-auto grid aspect-square items-center rounded-br-md border-2">
            <a
              href={siteConfig.social.farcaster}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Farcaster"
            >
              <svg className={logoClassName} viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 4v6h-6v8h-6v-8H7V4h16zm-1 1H8v4h5v9h4V9h5V5z" />
              </svg>
            </a>
          </div>
        </div>
        <span className="h-1.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
      </div>
    </div>
  )
}

