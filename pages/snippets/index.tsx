import { PageSeo } from '~/components/SEO'
import { siteMetadata } from '~/data/siteMetadata'
import { SnippetListLayout } from '~/layouts/SnippetListLayout'
import { getAllFilesFrontMatter } from '~/libs/mdx'
import type { SnippetFrontMatter } from '~/types'

export async function getStaticProps() {
  let snippets = getAllFilesFrontMatter('snippets')
  return { props: { snippets } }
}

export default function Snippet({ snippets }: { snippets: SnippetFrontMatter[] }) {
  let description = 'Little code snippets / system config stuff I have found useful'
  return (
    <>
      <PageSeo
        title={`Snippets - ${siteMetadata.author} - ${siteMetadata.title}`}
        description={description}
      />
      <SnippetListLayout snippets={snippets} description={description} />
    </>
  )
}
