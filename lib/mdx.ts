import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export interface AuthorData {
  content: string
  frontMatter: {
    layout?: string
    name?: string
    avatar?: string
  }
}

export async function getAuthorData(): Promise<AuthorData> {
  const filePath = path.join(process.cwd(), "data", "authors", "default.mdx")
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    content: contentHtml,
    frontMatter: {
      layout: data.layout,
      name: data.name,
      avatar: data.avatar,
    },
  }
}

