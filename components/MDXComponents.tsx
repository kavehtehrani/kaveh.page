import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import type { MdxLayoutRendererProps } from '~/types'
import { Pre } from './Pre'
import CorrChart from '~/components/charts/CorrelationChart'
import AuthorLayout from '~/layouts/AuthorLayout'
import PostSimple from '~/layouts/PostSimple'
import { Link } from './Link'
import { Image } from './Image'

const Wrapper = ({ layout, ...rest }: MdxLayoutRendererProps) => {
  const Layout =
    {
      AuthorLayout,
      PostSimple,
    }[layout] || PostSimple

  return <Layout {...rest} />
}

export const MDXComponents = {
  Image,
  a: Link,
  pre: Pre,
  wrapper: Wrapper,
  CorrChart: CorrChart,
}

export function MDXLayoutRenderer({ layout, mdxSource, ...rest }: MdxLayoutRendererProps) {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
