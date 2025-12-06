"use client";

import { UmamiScript } from "./Umami";
import { siteConfig } from "@/data/site";

export function Analytics() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) return null;

  return <>{siteConfig.analytics.umamiWebsiteId && <UmamiScript />}</>;
}
