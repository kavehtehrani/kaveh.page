"use client";

import Script from "next/script";
import { siteConfig } from "@/data/site";

export function UmamiScript() {
  if (!siteConfig.analytics.umamiWebsiteId) return null;

  return (
    <Script
      async
      src="https://analytics.umami.is/script.js"
      data-website-id={siteConfig.analytics.umamiWebsiteId}
    />
  );
}
