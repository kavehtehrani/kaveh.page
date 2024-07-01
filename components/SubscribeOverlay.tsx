import ButtonDown from '~/components/ButtonDown'
import clsx from 'clsx'
import Close from '~/icons/close.svg'

import { useEffect } from 'react'

export function SubscribeOverlay({ subShow, onToggleSub }) {
  let className = clsx(
    `fixed h-full w-full inset-0 bg-stone-200 dark:bg-stone-800
    opacity-95 z-50 transition-transform transform ease-in-out duration-300 flex flex-col justify-start items-center`,
    subShow ? 'translate-x-0' : 'translate-x-full'
  )

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && subShow) {
        onToggleSub()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onToggleSub, subShow])

  return (
    <div className={className}>
      <div className="w-full h-[50%] bg-stone-600"></div>
      <div className="w-full my-2 relative">
        <button
          type="button"
          aria-label="toggle modal"
          className="absolute top-0 right-0 mx-2 h-8 w-8 cursor-auto focus:outline-none"
          onClick={onToggleSub}
        >
          <Close className="fill-current hover:scale-[1.5] hover:text-amber-700" />
        </button>
        <div
          className="flex flex-row my-12 justify-center items-center
        rounded-2xl transform scale-150"
        >
          <ButtonDown />
        </div>
      </div>
      <div className="w-full h-[50%] bg-stone-600"></div>
    </div>
  )
}
