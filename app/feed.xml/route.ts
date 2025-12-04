import { getAllFilesFrontMatter } from "@/lib/mdx";
import { generateRss } from "@/lib/generate-rss";

export async function GET() {
  const posts = getAllFilesFrontMatter("blog");

  const rss = generateRss(posts);

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

