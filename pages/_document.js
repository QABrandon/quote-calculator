import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        
        {/* BBM Logo Favicon and Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Quote Calculator by Brandon Mosco" />
        <meta name="apple-mobile-web-app-title" content="Quote Calculator" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#4B3F72" />
        <meta name="msapplication-TileColor" content="#4B3F72" />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 