import '../styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Quote Calculator by Brandon Mosco</title>
        <meta name="description" content="An interactive quote estimator that helps users calculate project costs directly in Webflow based on selected services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-webflow-gray to-white">
        <Component {...pageProps} />
      </div>
    </>
  )
} 