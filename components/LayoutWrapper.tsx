import { useState } from 'react'
import { MAIN_CONTENT_MIN_HEIGHT } from '~/constant'
import { Footer } from './Footer'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { SubscribeOverlay } from '~/components/SubscribeOverlay'

export function LayoutWrapper({ children }) {
  let [navShow, setNavShow] = useState(false)
  let onToggleNav = () => setNavShow((status) => !status)

  let [subShow, setSubShow] = useState(false)
  let onToggleSub = () => setSubShow((status) => !status)

  return (
    <div className="px-4">
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
      <SubscribeOverlay subShow={subShow} onToggleSub={onToggleSub} />
      <Header onToggleNav={onToggleNav} onToggleSub={onToggleSub} />
      <div className="mx-auto max-w-3xl px-3 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex flex-col justify-between">
          <main style={{ minHeight: MAIN_CONTENT_MIN_HEIGHT }}>{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
