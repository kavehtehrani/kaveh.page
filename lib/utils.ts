import fs from "fs";
import path from "path";
import { formatSlug } from "./client-utils";

// Server-only utility functions (uses Node.js fs module)

export function getAllFilesRecursively(folder: string): string[] {
  const files: string[] = [];

  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else {
        files.push(fullPath);
      }
    }
  }

  walkDir(folder);
  return files;
}

export function getFiles(type: string): string[] {
  const root = process.cwd();
  const prefixPaths = path.join(root, "data", type);
  const allFiles = getAllFilesRecursively(prefixPaths);

  return allFiles
    .map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, "/"))
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

// Re-export client-safe utilities for convenience
export { formatDate, dateSortDesc, formatSlug, kebabCase } from "./client-utils";

