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
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className="relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close modal"
          className="absolute right-3 top-3 rounded p-1 text-gray-400 transition-colors hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <h3 className="mb-4 text-center text-lg font-medium text-gray-900 dark:text-gray-100">
          Subscribe to updates
        </h3>

        <ButtonDown />
      </div>
    </div>
  )
}
