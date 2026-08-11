import { renderOgImage } from "@/lib/og-image";
import { siteConfig } from "@/data/site";

// Literals: Next.js statically analyses these metadata exports.
// Mirrors OG_IMAGE_SIZE in data/constants.ts.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = siteConfig.title;

export default function Image() {
  return renderOgImage({ title: siteConfig.description });
}
