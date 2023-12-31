import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import type { MdxLayoutRendererProps } from '~/types'
import { Image } from './Image'
import { Link } from './Link'
import { Pre } from './Pre'
import CorrChart from '~/components/charts/CorrelationChart'

let MDXComponents = {
  Image,
  a: Link,
  pre: Pre,
  CorrChart: CorrChart,
  wrapper: ({ components, layout, ...rest }) => {
    let Layout = require(`../layouts/${layout}`).default
    return <Layout {...rest} />
  },
}

export function MDXLayoutRenderer({ layout, mdxSource, ...rest }: MdxLayoutRendererProps) {
  let MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
