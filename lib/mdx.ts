import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import readingTime from "reading-time";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
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

export interface SnippetFrontMatter {
  slug: string;
  date: string;
  title: string;
  heading: string;
  summary: string;
  tags: string[];
  type?: string;
  readingTime: {
    text: string;
    minutes: number;
  };
  fileName: string;
  draft?: boolean;
  layout?: string;
  folderName?: string;
}

export interface BlogPost {
  mdxSource: string;
  frontMatter: BlogFrontMatter;
}

export interface SnippetPost {
  mdxSource: string;
  frontMatter: SnippetFrontMatter;
}

export type Post = BlogPost | SnippetPost;

export async function getAuthorData(): Promise<AuthorData> {
  const filePath = path.join(process.cwd(), "data", "authors", "default.mdx");
  const source = fs.readFileSync(filePath, "utf8");

  const { code } = await bundleMDX({
    source,
    cwd: path.join(process.cwd(), "components"),
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(Array.isArray(options.remarkPlugins) ? options.remarkPlugins : []),
        remarkMath,
      ];
      options.rehypePlugins = [
        ...(Array.isArray(options.rehypePlugins) ? options.rehypePlugins : []),
        rehypeKatex,
        rehypeHighlight,
      ];
      return options;
    },
  });

  const { data } = matter(source);

  return {
    content: code,
    frontMatter: {
      layout: data.layout,
      name: data.name,
      avatar: data.avatar,
    },
  };
}

export async function getFileBySlug(type: string, slug: string): Promise<Post> {
  const root = process.cwd();
  const mdxPath = path.join(root, "data", type, `${slug}.mdx`);
  const mdPath = path.join(root, "data", type, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { data } = matter(source);

  const { code } = await bundleMDX({
    source,
    cwd: path.join(process.cwd(), "data", type),
    esbuildOptions(options) {
      options.loader = {
        ...options.loader,
        ".js": "jsx",
      };
      return options;
    },
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(Array.isArray(options.remarkPlugins) ? options.remarkPlugins : []),
        remarkMath,
      ];
      options.rehypePlugins = [
        ...(Array.isArray(options.rehypePlugins) ? options.rehypePlugins : []),
        rehypeKatex,
        rehypeHighlight,
      ];
      return options;
    },
  });

  const readingTimeData = readingTime(source);

  const baseFrontMatter = {
    ...data,
    slug: slug || "",
    fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
    readingTime: {
      text: readingTimeData.text,
      minutes: readingTimeData.minutes,
    },
    folderName: type,
  };

  if (type === "snippets") {
    return {
      mdxSource: code,
      frontMatter: {
        ...baseFrontMatter,
        title: data.title || data.heading,
        heading: data.heading || data.title,
      } as SnippetFrontMatter,
    };
  }

  return {
    mdxSource: code,
    frontMatter: baseFrontMatter as BlogFrontMatter,
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

        // Validate required fields
        if (
          !data.date ||
          !data.title ||
          !data.summary ||
          !data.tags ||
          !Array.isArray(data.tags)
        ) {
          console.warn(
            `Warning: Skipping file ${fileName} - missing required fields. ` +
              `Required: date, title, summary, tags (array). ` +
              `Found: date=${!!data.date}, title=${!!data.title}, summary=${!!data.summary}, tags=${
                !!data.tags && Array.isArray(data.tags)
              }`
          );
          return;
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

export function getAllSnippetsFrontMatter(): SnippetFrontMatter[] {
  const root = process.cwd();
  const allFrontMatter: SnippetFrontMatter[] = [];
  const prefixPaths = path.join(root, "data", "snippets");
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
        return;
      }

      // Snippets require: date, title or heading, summary, tags
      const hasTitle = data.title || data.heading;
      if (
        !data.date ||
        !hasTitle ||
        !data.summary ||
        !data.tags ||
        !Array.isArray(data.tags)
      ) {
        console.warn(
          `Warning: Skipping snippet ${fileName} - missing required fields. ` +
            `Required: date, title/heading, summary, tags (array). ` +
            `Found: date=${!!data.date}, title/heading=${!!hasTitle}, summary=${!!data.summary}, tags=${
              !!data.tags && Array.isArray(data.tags)
            }`
        );
        return;
      }

      allFrontMatter.push({
        ...data,
        slug: formattedSlug,
        title: data.title || data.heading, // Use title if available, otherwise heading
        heading: data.heading || data.title, // Use heading if available, otherwise title
        readingTime: {
          text: readingTimeData.text,
          minutes: readingTimeData.minutes,
        },
        folderName: "snippets",
        fileName: fileName,
      } as SnippetFrontMatter);
    }
  });

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}
