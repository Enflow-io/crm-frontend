import '../styles/globals.css'
import '../styles/custom.scss'
import '../styles/andtstyles.less'
// import "antd/dist/antd.css"
import type { AppProps } from 'next/app'
import * as Lockr from 'lockr'
import {useRouter} from "next/router";


function MyApp({ Component, pageProps }: AppProps) {


  return <Component {...pageProps} />
}

export default MyApp
