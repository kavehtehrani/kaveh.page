import fs from "fs"
import path from "path"

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)$/, "")
}

export function getAllFilesRecursively(folder: string): string[] {
  const files: string[] = []
  
  function walkDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walkDir(fullPath)
      } else {
        files.push(fullPath)
      }
    }
  }
  
  walkDir(folder)
  return files
}

export function getFiles(type: string): string[] {
  const root = process.cwd()
  const prefixPaths = path.join(root, "data", type)
  const allFiles = getAllFilesRecursively(prefixPaths)
  
  return allFiles
    .map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, "/"))
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
}

export function kebabCase(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()
}

