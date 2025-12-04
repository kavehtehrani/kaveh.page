import { MetadataRoute } from "next";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import { getAllSnippetsFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { siteConfig } from "@/data/site";
import { kebabCase } from "@/lib/client-utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.url;
  const currentDate = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/snippets`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/tags`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/donate`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Blog posts
  const blogPosts = getAllFilesFrontMatter("blog").map((post) => ({
    url: `${siteUrl}/${post.folderName || "blog"}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Snippets
  const snippets = getAllSnippetsFrontMatter().map((snippet) => ({
    url: `${siteUrl}/snippets/${snippet.slug}`,
    lastModified: new Date(snippet.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Tag pages
  const tags = getAllTags("blog", "snippets");
  const tagPages = Object.keys(tags).map((tag) => ({
    url: `${siteUrl}/tags/${kebabCase(tag)}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts, ...snippets, ...tagPages];
}

