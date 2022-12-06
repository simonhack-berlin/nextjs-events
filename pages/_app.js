import Head from 'next/head'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="find a lot of great events" />
        <meta name="viewport" content="width=device-width, initial-scale=0.1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
