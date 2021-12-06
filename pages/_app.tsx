import '../styles/globals.css'
import '../styles/custom.scss'
import '../styles/andtstyles.less'
// import "antd/dist/antd.css"
import type { AppProps } from 'next/app'
import * as Lockr from 'lockr'
import {useRouter} from "next/router";
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {


  return <>
    <Head>
      {/*<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />*/}
      <meta content="width=1024" name="viewport" />
    </Head>
    <Component {...pageProps} />
    </>
}

export default MyApp
