import '../styles/globals.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/600.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GoogleAnalytics, usePagesViews } from 'nextjs-google-analytics'
import { ChakraProvider } from '@chakra-ui/react'
import { ModalProvider } from '@1productaweek/react-modal-hooks'
import Script from 'next/script'
import theme from '../components/theme'

function MyApp ({ Component, pageProps }: AppProps) {
  usePagesViews()

  const canonicalTitle = 'Mild/Insanity/Takes/Time'
  const canonicalDescription = 'A personal blog by Calum Moore (@calummoore).'
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="content-language" content="en-us" />

        <title>{canonicalTitle}</title>
        <meta name="title" content={canonicalTitle} key="title"/>
        <meta name="description" content={canonicalDescription} key="description"/>

        <meta property="og:type" content="website" key="og:type"/>
        <meta property="og:title" content={canonicalTitle} key="og:title"/>
        <meta property="og:description" content={canonicalDescription} key="og:description" />
        <meta property="og:image" content="https://mildinsanitytakestime.com/img/bear.png" key="og:image"/>

        <meta property="twitter:card" content="summary_large_image" key="twitter:card"/>
        <meta property="twitter:title" content={canonicalTitle} key="twitter:title"/>
        <meta property="twitter:description" content={canonicalDescription} key="twitter:description"/>
        <meta property="twitter:image" content="https://mildinsanitytakestime.com/img/bear.png" key="twitter:image"/>
      </Head>
      <GoogleAnalytics />
      <ChakraProvider theme={theme}>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ChakraProvider>
    </>
  )
}

export default MyApp
