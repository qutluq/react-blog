import 'src/styles/globals.css'

import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { Header } from 'src/components/Header/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
