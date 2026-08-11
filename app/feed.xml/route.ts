import { getAllFilesFrontMatter } from "@/lib/mdx";
import { generateRss } from "@/lib/generate-rss";
import { CONTENT_TYPES, FEED_REVALIDATE_SECONDS } from "@/data/constants";

// Rebuilding the feed re-runs the full remark/KaTeX/highlight pipeline over
// every post, so it is cached rather than regenerated per request.
// NOTE: Next.js requires segment config exports to be statically analysable
// literals, so this cannot reference FEED_REVALIDATE_SECONDS directly.
// Keep the two in sync (both are 1 hour).
export const revalidate = 3600;

export async function GET() {
  const posts = getAllFilesFrontMatter(CONTENT_TYPES.blog).filter(
    (post) => !post.draft
  );

  const rss = await generateRss(posts);

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": `public, s-maxage=${FEED_REVALIDATE_SECONDS}, stale-while-revalidate`,
    },
  });
}
