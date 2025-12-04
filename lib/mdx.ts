import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";
import { formatSlug, getAllFilesRecursively, dateSortDesc } from "./utils";

export interface AuthorData {
  content: string;
  frontMatter: {
    layout?: string;
    name?: string;
    avatar?: string;
  };
}

export interface BlogFrontMatter {
  slug: string;
  date: string;
  title: string;
  summary: string;
  tags: string[];
  readingTime: {
    text: string;
    minutes: number;
  };
  fileName: string;
  draft?: boolean;
  layout?: string;
  authors?: string[];
  images?: string[] | string;
  folderName?: string;
}

export interface BlogPost {
  mdxSource: string;
  frontMatter: BlogFrontMatter;
}

export async function getAuthorData(): Promise<AuthorData> {
  const filePath = path.join(process.cwd(), "data", "authors", "default.mdx");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    content: contentHtml,
    frontMatter: {
      layout: data.layout,
      name: data.name,
      avatar: data.avatar,
    },
  };
}

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<BlogPost> {
  const root = process.cwd();
  const mdxPath = path.join(root, "data", type, `${slug}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const readingTimeData = readingTime(source);

  return {
    mdxSource: contentHtml,
    frontMatter: {
      ...data,
      slug: slug || "",
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      readingTime: {
        text: readingTimeData.text,
        minutes: readingTimeData.minutes,
      },
    } as BlogFrontMatter,
  };
}

export function getAllFilesFrontMatter(
  ...folderNames: string[]
): BlogFrontMatter[] {
  const root = process.cwd();
  const allFrontMatter: BlogFrontMatter[] = [];

  for (const folder of folderNames) {
    const prefixPaths = path.join(root, "data", folder);
    const files = getAllFilesRecursively(prefixPaths);

    files.forEach((file) => {
      const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
      if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) {
        return;
      }

      const source = fs.readFileSync(file, "utf8");
      const { data } = matter(source);
      const readingTimeData = readingTime(source);

      if (data.draft !== true) {
        const formattedSlug = formatSlug(fileName);
        if (!formattedSlug) {
          console.warn(`Warning: Empty slug for file: ${fileName}`);
          return; // Skip files with empty slugs
        }

        allFrontMatter.push({
          ...data,
          slug: formattedSlug, // Ensure slug is set after spreading data
          readingTime: {
            text: readingTimeData.text,
            minutes: readingTimeData.minutes,
          },
          folderName: folder,
          fileName: fileName,
        } as BlogFrontMatter);
      }
    });
  }

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}
