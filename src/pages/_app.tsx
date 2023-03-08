import { AppProps } from "next/app"
import { Provider as NextAuthProvider } from "next-auth/client";
import { Roboto } from 'next/font/google'
import Head from "next/head"
import { Header } from "../components/Header"

import '../styles/global.scss'

const roboto = Roboto({
  weight: ['400', '700', '900'],
  style: ["normal"],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <main className={roboto.className}>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </main>
    </NextAuthProvider>
  )
}
