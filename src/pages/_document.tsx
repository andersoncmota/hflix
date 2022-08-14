/* eslint-disable @next/next/next-script-for-ga */
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt">
        <Head>
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="HFlix" />
          <title>Os seus Animes favoritos você encontra aqui | HFlix</title>
          <meta name="robots" content="index,follow" />
          <meta name="googlebot" content="index,follow" />
          <meta
            name="description"
            content="HFlix: informações sobre os animes que você mais gosta."
          />
          <meta
            property="og:title"
            content="Os seus Animes favoritos você encontra aqui"
          />
          <meta
            property="og:description"
            content="HFlix: informações sobre os animes que você mais gosta."
          />
          <meta property="og:url" content="http://localhost:3000/home" />
          <meta property="og:type" content="website" />
          <link rel="canonical" href="http://localhost:3000/home" />
          <meta name="next-head-count" content="23" />

          {/* Google Tag Manager */}
          <script
            id="google-tag-manager"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_GTM_ID}');`,
            }}
          />
          {/* End Google Tag Manager */}
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          {/* End Google Tag Manager (noscript) */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
