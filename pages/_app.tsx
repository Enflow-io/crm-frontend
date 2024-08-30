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
import useUser from "../hooks/useUser";
import {ArgsProps} from "antd/lib/notification";

function MyApp({ Component, pageProps }: AppProps) {

  // const socket = useSocket('http://localhost:3010')
  const socketPath = process.env.NEXT_PUBLIC_API_HOST_PROD ? process.env.NEXT_PUBLIC_API_HOST_PROD : 'http://localhost:3010'
  console.log('socketPath', socketPath)
  const socket = useSocket(socketPath)
  // const socket = useSocket('https://rnb-crm.app')
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    function handleEvent(payload: any) {
      // HelloWorld

      notification.success({
        message: `Новая заявка #${payload.id} с сайта `,
        placement: 'bottomRight',
        onClick: async ()=>{
          await router.push(`/form-request/${payload.id}`)

        }
      });
    }

    function showCalendarNotification(payload: any) {
      // @ts-ignore
      const userMessages = payload.filter((item: any) => item.userId === user?.id)
      // @ts-ignore
      if (userMessages.length > 0) {
        for (const message of userMessages) {
          const config: ArgsProps = {
            description: `${message.description} в ${new Date(message.date).toTimeString().slice(0, 5)}`,
            message: `Напоминание из календаря!`,
            duration: 0,
            placement: 'topRight',
            key: message.id,
            type: message.type,
          }
          notification.open({ ...config })
        }
      }
    }
    if (socket) {
      //socket.on('NEW_FORM_REQUEST', handleEvent)
      socket.on('NEW_CALENDAR_EVENT', showCalendarNotification)
    }
  }, [socket])

  return <>
    <Head>
      {/*<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />*/}
      <meta content="width=1024" name="viewport" />
    </Head>
    {/*// @ts-ignore*/}
    <Component {...pageProps} />
    </>
}

export default MyApp
