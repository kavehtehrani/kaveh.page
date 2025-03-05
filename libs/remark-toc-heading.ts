import { visit } from 'unist-util-visit'
import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'
import type { TOC } from '~/types'

export function remarkTocHeading() {
  return (tree: any, file: any) => {
    const toc: TOC[] = []

    visit(tree, 'heading', (node: any) => {
      let textContent = toString(node)

      toc.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      })
    })

    // Store the TOC data in the file.data object
    file.data.toc = toc
  }
}
