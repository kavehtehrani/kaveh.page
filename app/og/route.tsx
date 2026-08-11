import { renderOgImage } from "@/lib/og-image";
import { siteConfig } from "@/data/site";
import { OG_TITLE_MAX_CHARS } from "@/data/constants";

/**
 * Open Graph card renderer.
 *
 * A route handler rather than an `opengraph-image.tsx` convention file because
 * Next.js does not allow those inside a catch-all segment, and both the blog and
 * snippet routes are catch-alls.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = (searchParams.get("title") || siteConfig.description).slice(
    0,
    OG_TITLE_MAX_CHARS
  );
  const eyebrow = searchParams.get("eyebrow")?.slice(0, 40) || undefined;

  return renderOgImage({ title, eyebrow });
}
