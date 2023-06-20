'use client'
 
import { createContext } from 'react'
 
export const WebSocketContext = createContext({})
 
export default function WebSocketProvider({ children }) {
  return <WebSocketContext.Provider value="dark">{children}</WebSocketContext.Provider>
}