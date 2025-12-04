import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getAllFilesRecursively } from "./utils";
import { kebabCase } from "./client-utils";

export type TagsCount = Record<string, number>;

export function getAllTags(...types: string[]): TagsCount {
  const root = process.cwd();
  const tagsCount: TagsCount = {};

  for (const type of types) {
    const prefixPaths = path.join(root, "data", type);
    const files = getAllFilesRecursively(prefixPaths);

    files.forEach((file) => {
      const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
      if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) {
        return;
      }

      const source = fs.readFileSync(file, "utf8");
      const { data } = matter(source);

      if (data.tags && data.draft !== true && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => {
          const formattedTag = kebabCase(tag);
          if (formattedTag in tagsCount) {
            tagsCount[formattedTag] += 1;
          } else {
            tagsCount[formattedTag] = 1;
          }
        });
      }
    });
  }

  return tagsCount;
}

