import type { DonateCardProps } from '~/types'
import { useState } from 'react'
import { Image } from './Image'
import { Link } from './Link'

export function DonateCard({ donate }: DonateCardProps) {
  let { title, description, imgSrc, url } = donate
  const [clicked, setClicked] = useState(false)

  const handleCopy = async () => {
    setClicked(true)
    try {
      await navigator.clipboard.writeText(description)
    } catch (err) {
      console.error('Could not copy text: ', err)
    }
    setTimeout(() => setClicked(false), 500) // Remove the animation after 500ms
  }

  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div
        className="flex h-full flex-col overflow-hidden rounded-md border
        border-opacity-60 border-b-4 border-amber-900 hover:border-gray-500
        dark:border-amber-900 dark:hover:border-gray-400 shadow-md shadow-gray-600 "
      >
        <Image
          alt={title}
          src={imgSrc}
          className="border-b-4 border-amber-700"
          width={1088}
          height={612}
        />
        <div className="flex mt-4 grow flex-col justify-between space-y-6 p-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              {url ? (
                <Link href={url} aria-label={`Link to ${title}`}>
                  <span data-umami-event="donate-title-link">{title}</span>
                </Link>
              ) : (
                title
              )}
            </h2>
            <div className="max-w-none space-y-2 text-justify whitespace-pre-line break-all text-gray-500 dark:text-gray-400">
              <p id="description" className="inline">
                {description}
              </p>
              {description ? (
                <button
                  className={`ml-2 inline cursor-pointer transition duration-100 ${clicked ? 'animate-ping' : ''}`}
                  onClick={handleCopy}
                >
                  <span data-umami-event={`${title}-clipboard-click`}></span> 📋
                </button>
              ) : null}
            </div>
            <div className="max-w-none space-y-2 text-justify whitespace-pre-line text-gray-500 dark:text-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
