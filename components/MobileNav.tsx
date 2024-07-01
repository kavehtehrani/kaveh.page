import { headerNavLinks } from '~/data/headerNavLinks'
import { Link } from './Link'
import clsx from 'clsx'
import Close from '~/icons/close.svg'
import { useEffect } from 'react'

export function MobileNav({ navShow, onToggleNav }) {
  let className = clsx(
    `lg:hidden fixed h-full w-full inset-0 bg-stone-200 dark:bg-stone-700 
    opacity-95 z-50 transition-transform transform ease-in-out duration-300`,
    navShow ? 'translate-x-0' : 'translate-x-full'
  )

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && navShow) {
        onToggleNav()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onToggleNav, navShow])

  return (
    <div className={className}>
      <button
        type="button"
        aria-label="toggle modal"
        className="fixed right-4 top-4 h-8 w-8 cursor-auto focus:outline-none"
        onClick={onToggleNav}
      >
        <Close className="fill-current hover:scale-[1.5] hover:text-amber-700" />
      </button>
      <nav className="fixed mt-8">
        {headerNavLinks.map((link) => (
          <div key={link.title} className="px-8 py-4">
            <Link
              href={link.href}
              className="text-2xl font-semibold tracking-wide text-gray-900 dark:text-gray-100"
              onClick={onToggleNav}
            >
              {link.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}
