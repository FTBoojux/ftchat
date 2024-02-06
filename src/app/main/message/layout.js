"use client";
import { useState, useEffect, useContext} from "react";
import MyFetch from '@/app/api/MyFetch';
import {useRouter} from "next/navigation";
import {Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Drawer, Divider} from '@mui/material';
import { WebSocketContext, useWebContext } from '@/app/WebSocketContext';
import { fetchConversationList } from "@/app/api/ConversationApi";
export default function MessageLayout({
    children, // will be a page or nested layout
  }) {

    const ctx = useWebContext();
    

    const router = useRouter();

    useEffect(() => {
        fetchConversationList()
        .then(data=>{
            ctx.saveConversations(data);
        })
    }, [])
    
    const conversationClick = (conversation) => {
        ctx.setCurrentConversation(conversation.conversation_id);
        router.push(`/main/message/${conversation.conversation_id}`)
    }

  return(
    <Box>
        <Box sx={{ 
            display: 'flex' ,
            // height: '100%',
            
            }}>
            <Box
                component="nav"
                sx={{
                    width: '30%'
                }}
            >
                <List>
                    {
                    ctx.conversations && ctx.conversations.map((conversation,index) => {
                        return (
                        <ListItem 
                            key={index}
                            onClick={() => conversationClick(conversation)}
                            >
                            <ListItemAvatar>
                            <Avatar alt={conversation.conversation_name} src={conversation.conversation_avatar} />
                            </ListItemAvatar>
                            <ListItemText 
                                primary={conversation.conversation_name} 
                                secondary={conversation.last_message} 
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            />
                        </ListItem>
                        )
                    })
                }
                </List>
            </Box>
            <Divider orientation="vertical" flexItem  />
            <Box 
                component="main" 
                sx={{ 
                    flex: 1, 
                    p: 3,
                }}
            >
                {children}
            </Box>
        </Box>

    </Box>
  )
}