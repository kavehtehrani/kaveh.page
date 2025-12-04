"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "./Link";
import type { Donate } from "@/data/donate";

export function DonateCard({ donate }: { donate: Donate }) {
  const { title, description, imgSrc, url } = donate;
  const [clicked, setClicked] = useState(false);

  const handleCopy = async () => {
    setClicked(true);
    try {
      await navigator.clipboard.writeText(description);
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
      <div
        className="flex h-full flex-col overflow-hidden rounded-md border border-b-4 border-amber-900 border-opacity-60 shadow-md shadow-gray-600 hover:border-gray-500 dark:border-amber-900 dark:hover:border-gray-400"
      >
        <Image
          alt={title}
          src={imgSrc}
          className="border-b-4 border-amber-700"
          width={1088}
          height={612}
        />
        <div className="mt-4 flex grow flex-col justify-between space-y-6 p-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold leading-8 tracking-tight">
              {url ? (
                <Link
                  href={url}
                  aria-label={`Link to ${title}`}
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
            <div className="max-w-none space-y-2 break-all whitespace-pre-line text-justify text-gray-500 dark:text-gray-400">
              <p id="description" className="inline">
                {description}
              </p>
              {description ? (
                <button
                  className={`ml-2 inline cursor-pointer transition duration-100 ${
                    clicked ? "animate-ping" : ""
                  }`}
                  onClick={handleCopy}
                >
                  📋
                </button>
              ) : null}
            </div>
            <div className="max-w-none space-y-2 whitespace-pre-line text-justify text-gray-500 dark:text-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

