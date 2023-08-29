import '../styles/globals.css'
import '../styles/custom.scss'
// import '../styles/andtstyles.less'
// import "antd/dist/antd.css"
import "antd/dist/antd.css"
import type { AppProps } from 'next/app'
import * as Lockr from 'lockr'
import {useRouter} from "next/router";
import Head from 'next/head'
import useSocket from "../hooks/useSocket";
import {useEffect} from "react";
import {notification} from "antd";

function MyApp({ Component, pageProps }: AppProps) {

  // const socket = useSocket('http://localhost:3010')
  // const socket = useSocket(process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3010')
  // const socket = useSocket('https://rnb-crm.app')
  const router = useRouter();

  useEffect(() => {
    function handleEvent(payload: any) {
      console.log(payload)
      // HelloWorld

      notification.success({
        message: `Новая заявка #${payload.id} с сайта `,
        placement: 'bottomRight',
        onClick: async ()=>{
          await router.push(`/form-request/${payload.id}`)

        }
      });
    }
    // if (socket) {
      // socket.on('NEW_FORM_REQUEST', handleEvent)
    // }
  }, [])

  return <>
    <Head>
      {/*<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />*/}
      <meta content="width=1024" name="viewport" />
    </Head>
    <Component {...pageProps} />
    </>
}

export default MyApp
