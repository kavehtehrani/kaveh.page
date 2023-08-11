import 'css/tailwind.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { Analytics } from '~/components/analytics'
import { LayoutWrapper } from '~/components/LayoutWrapper'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    // @ts-ignore
    <ThemeProvider attribute="class">
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Script
        async
        src="https://analytics.umami.is/script.js"
        data-website-id="f0842203-1bc2-4484-bb5c-1722a8e47ff5"
      />
      {/*<Analytics />*/}
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
