import React, {useEffect, useState} from 'react'
import io from 'socket.io-client'
const useSocket = (url: string) => {
    const [socket, setSocket] = useState<any>(null)

    useEffect(() => {
        // const socketIo = io(url, {path: '/api'})
        const path = url === 'https://rnb-crm.app' ? {path: '/api/ws'} : {path: '/api/ws'}
        const socketIo = io(url, path)

        setSocket(socketIo)

        function cleanup() {
            socketIo.disconnect()
        }
        return cleanup

        // should only run once and not on every re-render,
        // so pass an empty array
    }, [])

    return socket
}

export default useSocket;


/*
*
*
*  const socket = useSocket('http://127.0.0.1:9080')

  useEffect(() => {
    function handleEvent(payload) {
      console.log(payload)
      // HelloWorld
    }
    if (socket) {
      socket.on('SOME_EVENT', handleEvent)
    }
  }, [socket])
  *
  *
  * */