import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Router from 'next/router'

import { GTMPageView } from '../utils/gtm'

import '../styles/global.less'

export default function MyApp({ Component, pageProps }: AppProps) {
  // Initiate GTM
  useEffect(() => {
    const handleRouteChange = (url: string) => GTMPageView(url)
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}
