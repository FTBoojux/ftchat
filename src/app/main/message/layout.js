"use client";
import { useState, useEffect} from "react";
import MyFetch from '@/app/api/MyFetch';
import {useRouter} from "next/navigation";
import {Box, List, ListItem, ListItemAvatar, ListItemText, Avatar, Drawer, Divider} from '@mui/material';
export default function MessageLayout({
    children, // will be a page or nested layout
  }) {

    const [conversationList, setConversationList] = useState([])

    const router = useRouter();

    useEffect(() => {
        fetchConversationList()
    }, [])

    const fetchConversationList = () => {
        MyFetch(`/api/conversations/`, {
          method: 'GET',
        })
        .then(response=>response.json())
        .then((data) => {
          setConversationList(data.data);
        }).catch((error) => {
          console.error(error);
        })
    }
    
    const conversationClick = (conversation) => {
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
            >
                <List>
                    {
                    conversationList && conversationList.map((conversation,index) => {
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