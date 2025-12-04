"use client"

import { useEffect } from "react"
import { ButtonDown } from "./ButtonDown"

interface SubscribeOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SubscribeOverlay({ isOpen, onClose }: SubscribeOverlayProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-start bg-stone-200 opacity-95 transition-transform duration-300 dark:bg-stone-800 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-[50%] w-full bg-stone-600"></div>
      <div className="relative my-2 w-full">
        <button
          type="button"
          aria-label="Close modal"
          className="absolute right-0 top-0 mx-2 h-8 w-8 cursor-auto focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-8 w-8 text-gray-900 dark:text-gray-100 hover:scale-[1.5] hover:text-amber-700"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="my-12 flex flex-row items-center justify-center rounded-2xl lg:scale-150">
          <ButtonDown />
        </div>
      </div>
      <div className="h-[50%] w-full bg-stone-600"></div>
    </div>
  )
}

