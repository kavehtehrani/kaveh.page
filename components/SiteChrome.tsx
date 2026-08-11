"use client";

import { useState } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";
import { SubscribeOverlay } from "./SubscribeOverlay";

/**
 * Client island holding the nav and subscribe overlay state.
 *
 * This exists so app/(main)/layout.tsx can stay a Server Component. Previously
 * the layout itself was "use client" for these two booleans, which pushed the
 * whole site chrome into the client bundle on every route.
 */
export function SiteChrome() {
  const [navShow, setNavShow] = useState(false);
  const [subShow, setSubShow] = useState(false);

  return (
    <>
      <MobileNav isOpen={navShow} onClose={() => setNavShow(false)} />
      <SubscribeOverlay isOpen={subShow} onClose={() => setSubShow(false)} />
      <Header
        navOpen={navShow}
        subOpen={subShow}
        onToggleNav={() => setNavShow((v) => !v)}
        onToggleSub={() => setSubShow((v) => !v)}
      />
    </>
  );
}
