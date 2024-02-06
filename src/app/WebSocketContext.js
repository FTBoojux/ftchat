'use client'
 
import { createContext, useContext, useEffect, useState } from 'react'
 
export const WebSocketContext = createContext()
 
export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null)
  const [conversations, setConversations] = useState([])
  useEffect(() => {
    console.log('conversations 修改', conversations);
  },[conversations])
  const saveWs = (ws) => {
    setWs(ws)
  }
  const saveConversations = (conversations) => {
    setConversations(conversations)
  }
  const updateConversation = (conversation,conversations = []) => {
    const newConversations = conversations.map((item) => {
      if(conversation.conversation_id === item.conversation_id){
        return { ...item, last_message: conversation.content };
      }
      return item;
    });
    setConversations(newConversations)
  }
  return <WebSocketContext.Provider value={{ws, saveWs, conversations, saveConversations, updateConversation}}>{children}</WebSocketContext.Provider>
}

export const useWebContext = ()=>useContext(WebSocketContext)