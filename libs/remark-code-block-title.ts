import { visit } from 'unist-util-visit'
import type { Node } from 'unist'

type CodeNode = Node & {
  type: 'code'
  lang?: string
  meta?: string
  value: string
}

export function remarkCodeBlockTitle() {
  return (tree: Node) => {
    return visit(tree, 'code', (node: CodeNode) => {
      let nodeLang = node.lang || ''
      let language = ''
      let title = ''

      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.indexOf(':'))
        title = nodeLang.slice(nodeLang.indexOf(':') + 1)
        node.lang = language
        node.meta = title
      }
    })
  }
}
