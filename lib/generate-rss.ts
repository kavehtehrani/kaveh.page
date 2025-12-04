import RSS from "rss";
import { siteConfig } from "@/data/site";
import type { BlogFrontMatter } from "@/lib/mdx";

export function generateRss(posts: BlogFrontMatter[]): string {
  if (posts.length === 0) {
    return "";
  }

  const feed = new RSS({
    title: siteConfig.title,
    description: siteConfig.description,
    site_url: `${siteConfig.url}/blog`,
    feed_url: `${siteConfig.url}/feed.xml`,
    language: siteConfig.language,
    managingEditor: siteConfig.email
      ? `${siteConfig.email} (${siteConfig.author})`
      : undefined,
    webMaster: siteConfig.email
      ? `${siteConfig.email} (${siteConfig.author})`
      : undefined,
    pubDate: new Date(posts[0].date),
  });

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: `${siteConfig.url}/${post.folderName || "blog"}/${post.slug}`,
      guid: `${siteConfig.url}/${post.folderName || "blog"}/${post.slug}`,
      date: new Date(post.date),
      categories: post.tags || [],
    });
  });

  return feed.xml({ indent: true });
}
