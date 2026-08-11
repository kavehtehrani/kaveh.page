import { cache } from "react";
import { CONTENT_TYPES } from "@/data/constants";
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

/** Fields shared by every content type under data/. */
export interface BaseFrontMatter {
  slug: string;
  date: string;
  lastmod?: string;
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

export type BlogFrontMatter = BaseFrontMatter;

export interface SnippetFrontMatter extends BaseFrontMatter {
  /** Snippets show a short heading in listings, distinct from the title. */
  heading: string;
  type?: string;
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

/**
 * Walks one content folder and returns the front matter of every publishable
 * document in it.
 *
 * getAllFilesFrontMatter and getAllSnippetsFrontMatter were ~55 lines of
 * copy-paste that differed only in which fields they required and how they
 * derived the title. That difference is now the `normalise` callback.
 */
function collectFrontMatter<T extends BaseFrontMatter>(
  folder: string,
  normalise: (
    data: Record<string, unknown>,
    fileName: string
  ) => Partial<T> | null
): T[] {
  const prefixPath = path.join(process.cwd(), "data", folder);
  if (!fs.existsSync(prefixPath)) return [];

  const collected: T[] = [];

  for (const file of getAllFilesRecursively(prefixPath)) {
    const fileName = file.slice(prefixPath.length + 1).replace(/\\/g, "/");
    if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) continue;

    const source = fs.readFileSync(file, "utf8");
    const { data } = matter(source);
    if (data.draft === true) continue;

    const slug = formatSlug(fileName);
    if (!slug) {
      console.warn(`Warning: empty slug for file: ${fileName}`);
      continue;
    }

    if (!data.date || !data.summary || !Array.isArray(data.tags)) {
      console.warn(
        `Warning: skipping ${folder}/${fileName} - required front matter missing. ` +
          `Needs date, summary and tags[]. ` +
          `Found date=${!!data.date}, summary=${!!data.summary}, tags=${Array.isArray(data.tags)}`
      );
      continue;
    }

    const extra = normalise(data, fileName);
    if (!extra) continue;

    const readingTimeData = readingTime(source);
    collected.push({
      ...data,
      ...extra,
      slug,
      readingTime: {
        text: readingTimeData.text,
        minutes: readingTimeData.minutes,
      },
      folderName: folder,
      fileName,
    } as unknown as T);
  }

  return collected.sort((a, b) => dateSortDesc(a.date, b.date));
}

export function getAllFilesFrontMatter(
  ...folderNames: string[]
): BlogFrontMatter[] {
  const all = folderNames.flatMap((folder) =>
    collectFrontMatter<BlogFrontMatter>(folder, (data, fileName) => {
      if (!data.title) {
        console.warn(`Warning: skipping ${folder}/${fileName} - no title`);
        return null;
      }
      return {};
    })
  );
  return all.sort((a, b) => dateSortDesc(a.date, b.date));
}

export function getAllSnippetsFrontMatter(): SnippetFrontMatter[] {
  return collectFrontMatter<SnippetFrontMatter>(
    CONTENT_TYPES.snippets,
    (data, fileName) => {
      const title = (data.title || data.heading) as string | undefined;
      const heading = (data.heading || data.title) as string | undefined;
      if (!title || !heading) {
        console.warn(
          `Warning: skipping snippets/${fileName} - needs a title or heading`
        );
        return null;
      }
      return { title, heading };
    }
  );
}

/**
 * Request-scoped memoisation. generateMetadata() and the page component both
 * need the same document; without this, esbuild bundles every post twice per
 * render.
 */
export const getCachedFileBySlug = cache(getFileBySlug);
export const getCachedAuthorData = cache(getAuthorData);
