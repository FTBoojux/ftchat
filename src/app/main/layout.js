"use client";
import { useEffect, useState } from "react"
import { WebSocketContext, WebSocketProvider } from "./WebSocketContext";
export default function MainLayout({
    children, // will be a page or nested layout
  }) {

    const [ws, setWs] = useState(null)

    useEffect(() => {
        if(localStorage.getItem('access_token') === null) {
            window.location.href = '/'
        }else{
          const webSocket = new WebSocket('ws://localhost:8080/websocket')
          webSocket.onopen = () => {
            console.log('connected')
            webSocket.send(JSON.stringify({
              type: 1,
              token: localStorage.getItem('access_token')
            }))
          }
          webSocket.onclose = () => {
            console.log('disconnected')
          }
          webSocket.onmessage = (message) => {
            console.log(message)
          }
          setWs(webSocket)
        }
        return () => {
          if(ws !== null) {
            ws.close()
          }
        }
    }, [])

    return (
      <WebSocketContext.Provider value={ws} >   
        {children}
      </WebSocketContext.Provider>
    )
  }