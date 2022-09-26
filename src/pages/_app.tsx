import 'src/styles/globals.css'

import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { Footer } from 'src/components/footer'
import { Header } from 'src/components/header/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </Fragment>
  )
}

export default MyApp
