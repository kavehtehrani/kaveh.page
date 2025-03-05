import type readingTime from 'reading-time'
import type { DevIconsMap } from '~/components/DevIcon'
import type { PluggableList } from 'unified'

export type MdxPageLayout = 'AuthorLayout' | 'ListLayout' | 'PostSimple' | 'SnippetLayout'
export type ReadingTime = ReturnType<typeof readingTime>

export interface MdxFrontMatter {
  layout?: MdxPageLayout
  title: string
  name?: string
  date: string
  lastmod?: string
  tags: string[]
  draft?: boolean
  blogIndexInclude?: boolean
  summary: string
  images?: string[] | string
  authors?: string[]
  slug: string
  readingTime: ReadingTime
}

export interface BlogFrontMatter extends MdxFrontMatter {
  fileName: string
  folderName: string
}

export interface SnippetFrontMatter extends BlogFrontMatter {
  heading: string
  type: keyof typeof DevIconsMap
}

export interface AuthorFrontMatter extends MdxFrontMatter {
  avatar: string
  github?: string
}

export interface MdxFileData {
  mdxSource: string
  frontMatter: BlogFrontMatter
  toc: unknown[]
}

export interface MdxLayoutRendererProps {
  layout: MdxPageLayout
  mdxSource: string
  frontMatter: MdxFrontMatter

  [key: string]: any
}

// Create a more flexible type definition that can accommodate both versions
export type CompatiblePluggableList = any[] | PluggableList
