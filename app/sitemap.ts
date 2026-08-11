import { MetadataRoute } from "next";
import { getAllFilesFrontMatter, getAllSnippetsFrontMatter } from "@/lib/mdx";
import { getAllTags } from "@/lib/tags";
import { kebabCase } from "@/lib/client-utils";
import { absoluteUrl } from "@/lib/metadata";
import { CONTENT_TYPES, ROUTES, SITEMAP } from "@/data/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllFilesFrontMatter(CONTENT_TYPES.blog).filter(
    (post) => !post.draft
  );
  const snippets = getAllSnippetsFrontMatter().filter(
    (snippet) => !snippet.draft
  );

  /**
   * Newest content date, used as lastModified for the listing pages. Previously
   * every static page reported `new Date()` at build time, so all of them
   * claimed to have changed on every deploy — a signal crawlers learn to ignore.
   */
  const latest = (dates: (string | undefined)[]) => {
    const times = dates
      .filter((d): d is string => Boolean(d))
      .map((d) => new Date(d).getTime())
      .filter((t) => !Number.isNaN(t));
    return times.length ? new Date(Math.max(...times)) : new Date();
  };

  const postDates = posts.map((p) => p.lastmod || p.date);
  const snippetDates = snippets.map((s) => s.lastmod || s.date);
  const newestPost = latest(postDates);
  const newestSnippet = latest(snippetDates);
  const newestAny = latest([...postDates, ...snippetDates]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl(ROUTES.home), lastModified: newestAny, ...SITEMAP.home },
    { url: absoluteUrl(ROUTES.blog), lastModified: newestPost, ...SITEMAP.blog },
    {
      url: absoluteUrl(ROUTES.snippets),
      lastModified: newestSnippet,
      ...SITEMAP.snippets,
    },
    { url: absoluteUrl(ROUTES.tags), lastModified: newestAny, ...SITEMAP.tags },
    {
      url: absoluteUrl(ROUTES.projects),
      lastModified: newestAny,
      ...SITEMAP.projects,
    },
    { url: absoluteUrl(ROUTES.about), lastModified: newestAny, ...SITEMAP.about },
    {
      url: absoluteUrl(ROUTES.donate),
      lastModified: newestAny,
      ...SITEMAP.donate,
    },
    {
      url: absoluteUrl(ROUTES.privacy),
      lastModified: newestAny,
      ...SITEMAP.privacy,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/${post.folderName || CONTENT_TYPES.blog}/${post.slug}`),
    lastModified: new Date(post.lastmod || post.date),
    ...SITEMAP.blogPost,
  }));

  const snippetPages: MetadataRoute.Sitemap = snippets.map((snippet) => ({
    url: absoluteUrl(`${ROUTES.snippets}/${snippet.slug}`),
    lastModified: new Date(snippet.lastmod || snippet.date),
    ...SITEMAP.snippetPost,
  }));

  const tags = getAllTags(CONTENT_TYPES.blog, CONTENT_TYPES.snippets);
  const tagPages: MetadataRoute.Sitemap = Object.keys(tags).map((tag) => ({
    url: absoluteUrl(`${ROUTES.tags}/${kebabCase(tag)}`),
    lastModified: newestAny,
    ...SITEMAP.tagPage,
  }));

  return [...staticPages, ...blogPosts, ...snippetPages, ...tagPages];
}
