import fs from 'fs'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import path from 'path'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGFM from 'remark-gfm'
import type { BlogFrontMatter, MdxFrontMatter, TOC } from '~/types'
import { dateSortDesc } from '~/utils/date'
import { formatSlug, getAllFilesRecursively } from './files'
import type { MdxPageLayout } from '~/types'
import { type ReadingTime } from '~/types'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import type { Pluggable } from 'unified'

type PluggableList = Array<Pluggable>

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<{
  mdxSource: string
  toc: TOC[]
  frontMatter: {
    date: string
    summary: string
    fileName: string
    images?: string[] | string
    title: string
    tags: string[]
    layout?: MdxPageLayout
    readingTime: ReadingTime
    draft?: boolean
    blogIndexInclude?: boolean // not draft but also not include in blog index
    name?: string
    slug: string
    lastmod?: string
    authors?: string[]
  }
}> {
  let root = process.cwd()
  let mdxPath = path.join(root, 'data', type, `${slug}.mdx`)
  let mdPath = path.join(root, 'data', type, `${slug}.md`)
  let source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  /**
   * Point esbuild directly at the correct executable for the current platform
   * Ref: https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
   */
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  let toc: TOC[] = []
  let { frontmatter, code } = await bundleMDX<MdxFrontMatter>({
    source,
    cwd: path.join(process.cwd(), 'components'),
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
    mdxOptions(options) {
      /**
       * This is the recommended way to add custom remark/rehype plugins.
       * The syntax might look weird, but it protects you in case we add/remove plugins in the future.
       * Ref: https://github.com/kentcdodds/mdx-bundler#mdxoptions
       */
      const remarkPlugins: PluggableList = [remarkMath]

      const rehypePlugins: PluggableList = [
        rehypeSlug,
        rehypeKatex,
        [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ]

      // Safely merge plugins without type assertions
      options.remarkPlugins = [
        ...(Array.isArray(options.remarkPlugins) ? options.remarkPlugins : []),
        ...remarkPlugins,
      ] as any // Use 'any' to bypass the type checking

      options.rehypePlugins = [
        ...(Array.isArray(options.rehypePlugins) ? options.rehypePlugins : []),
        ...rehypePlugins,
      ] as any // Use 'any' to bypass the type checking

      return options
    },
  })

  toc = frontmatter.toc || []

  return {
    toc,
    mdxSource: code,
    frontMatter: {
      readingTime: readingTime(source),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
    },
  }
}

export function getAllFilesFrontMatter(...folderNames: string[]) {
  let root = process.cwd()
  let allFrontMatter: BlogFrontMatter[] = []

  for (const folder of folderNames) {
    let prefixPaths = path.join(root, 'data', folder)
    let files = getAllFilesRecursively(prefixPaths)

    files.forEach((file) => {
      // Replace is needed to work on Windows
      let fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
      // Remove Unexpected File
      if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
        return
      }
      let source = fs.readFileSync(file, 'utf8')
      let grayMatterData = matter(source)
      let data = grayMatterData.data as BlogFrontMatter
      data.readingTime = readingTime(source)
      data.folderName = folder
      if (data.draft !== true) {
        allFrontMatter.push({ ...data, slug: formatSlug(fileName) })
      }
    })
  }

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}

export async function getMDXComponent(source: string) {
  const { code } = await bundleMDX({
    source,
    mdxOptions(options) {
      const remarkPlugins: PluggableList = [remarkMath]

      const rehypePlugins: PluggableList = [
        rehypeSlug,
        rehypeKatex,
        [rehypeAutolinkHeadings, { properties: { className: ['anchor'] } }],
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ]

      options.remarkPlugins = [
        ...(Array.isArray(options.remarkPlugins) ? options.remarkPlugins : []),
        ...remarkPlugins,
      ] as any // Use 'any' to bypass the type checking

      options.rehypePlugins = [
        ...(Array.isArray(options.rehypePlugins) ? options.rehypePlugins : []),
        ...rehypePlugins,
      ] as any // Use 'any' to bypass the type checking

      return options
    },
  })

  return code
}
