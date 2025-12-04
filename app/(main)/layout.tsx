"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { SubscribeOverlay } from "@/components/SubscribeOverlay";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navShow, setNavShow] = useState(false);
  const [subShow, setSubShow] = useState(false);

  const onToggleNav = () => setNavShow((status) => !status);
  const onToggleSub = () => setSubShow((status) => !status);

  return (
    <div className="min-h-screen bg-white dark:bg-[#292524] px-4 transition-colors duration-300">
      <MobileNav isOpen={navShow} onClose={onToggleNav} />
      <SubscribeOverlay isOpen={subShow} onClose={onToggleSub} />
      <Header onToggleNav={onToggleNav} onToggleSub={onToggleSub} />
      <div className="mx-auto max-w-3xl px-3 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="flex flex-col justify-between">
          <main
            style={{ minHeight: "calc(100vh - 69px - 188px)" }}
            className="transition-colors duration-300"
          >
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
