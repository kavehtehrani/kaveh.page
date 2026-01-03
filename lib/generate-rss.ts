import RSS from "rss";
import { siteConfig } from "@/data/site";
import { type BlogFrontMatter } from "@/lib/mdx";
import { remark } from "remark";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

async function convertMdxToHtml(slug: string, folderName: string): Promise<string> {
  try {
    const root = process.cwd();
    const mdxPath = path.join(root, "data", folderName, `${slug}.mdx`);
    const mdPath = path.join(root, "data", folderName, `${slug}.md`);
    const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
    
    if (!fs.existsSync(filePath)) {
      return "";
    }
    
    const source = fs.readFileSync(filePath, "utf8");
    const { content } = matter(source);
    
    // Process the markdown content to HTML
    const result = await remark()
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeKatex)
      .use(rehypeHighlight)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);
    
    return String(result);
  } catch (error) {
    console.error(`Error converting ${slug} to HTML:`, error);
    return "";
  }
}

export async function generateRss(posts: BlogFrontMatter[]): Promise<string> {
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

  // Process posts in parallel for better performance
  await Promise.all(
    posts.map(async (post) => {
      const htmlContent = await convertMdxToHtml(
        post.slug,
        post.folderName || "blog"
      );
      
      const itemOptions: any = {
        title: post.title,
        description: post.summary,
        url: `${siteConfig.url}/${post.folderName || "blog"}/${post.slug}`,
        guid: `${siteConfig.url}/${post.folderName || "blog"}/${post.slug}`,
        date: new Date(post.date),
        categories: post.tags || [],
      };
      
      // Add full content if available
      if (htmlContent) {
        itemOptions.custom_elements = [
          {
            "content:encoded": {
              _cdata: htmlContent,
            },
          },
        ];
      }
      
      feed.item(itemOptions);
    })
  );

  return feed.xml({ indent: true });
}
