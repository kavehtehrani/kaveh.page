import fs from 'fs'
import { globby } from 'globby'
import prettier from 'prettier'

const SITE_URL = 'https://kaveh.page'

async function generateSitemap() {
  console.log('Generating sitemap...')
  try {
    const prettierConfig = await prettier.resolveConfig('./.prettier.js')
    const pages = await globby([
      'pages/*.tsx',
      'data/blog/**/*.mdx',
      'data/blog/**/*.md',
      'public/tags/**/*.xml',
      '!pages/_*.tsx',
      '!pages/api',
    ])

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${pages
      .map((page) => {
        let path = page
          .replace('pages/', '/')
          .replace('data/blog', '/blog')
          .replace('public/', '/')
          .replace('.tsx', '')
          .replace('.ts', '')
          .replace('.mdx', '')
          .replace('.md', '')
          .replace('/feed.xml', '')
        let route = path === '/index' ? '' : path
        if (page === `pages/404.tsx` || page === `pages/blog/[...slug].tsx`) {
          return ''
        }
        return `<url><loc>${SITE_URL}${route}</loc></url>\n`
      })
      .filter(Boolean)
      .join('')}\n</urlset>`

    const formatted = await prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html',
    })

    fs.writeFileSync('public/sitemap.xml', formatted)
    console.log('Sitemap generated successfully in `public/sitemap.xml`.')
  } catch (error) {
    console.error('Error generating sitemap:', error)
    process.exit(1)
  }
}

generateSitemap()
