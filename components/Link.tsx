/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link'
import type { AnchorHTMLAttributes } from 'react'

export function Link({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  let isInternalLink = href && href.startsWith('/')
  let isAnchorLink = href && href.startsWith('#')
  let className = 'text-primary-600 no-underline hover:underline dark:text-primary-400'

  if (isInternalLink && href) {
    return <NextLink className={className} href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a href={href} className={className} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} className={className} {...rest} />
}
