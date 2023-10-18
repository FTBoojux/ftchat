"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField } from '@mui/material';
import MessageBubble from '../../../../../components/message/MessageBubble';
import MyFetch from '@/app/api/MyFetch';

const avatar_url = "http://47.98.97.181:9100/ftchat-avatar/a7388de6-c190-4edd-ae1d-4962cd2b1043.png"

const Page = ({params}) => {

    const router = useRouter();

    const conversation_id = params.slug;
    const [pagingState, setPagingState] = React.useState("");
    // const [pageSize,setPageSize] = React.useState(20);
    const [messageList, setMessageList] = React.useState([]);

    React.useEffect(() => {
      fetchMessageList();
    }, [])

    const messages = [
        {
          author: 'Alice',
          text: 'Hello, how are you?',
          avatar: 'https://example.com/avatar1.jpg',
          timestamp: '2023-07-03T14:15:22Z'
        },
        {
          author: 'Me',
          text: 'I am fine, thank you.',
          avatar: 'https://example.com/avatar2.jpg',
          timestamp: '2023-07-03T14:16:00Z'
        },
        {
          author: 'Alice',
          text: 'That is great!Hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          avatar: 'https://example.com/avatar1.jpg',
          timestamp: '2023-07-03T14:16:30Z'
        }
      ];
      
    const fetchMessageList = () => {
      let url = `/api/conversation/${conversation_id}/message/`;
      if(pagingState) {
        url = url + `?paging_state=${pagingState}`
      }
      MyFetch(url, {
        method: 'GET',
      })
      .then(response=>response.json())
      .then((data) => {
        console.log(data.data.message_list)
        // setConversationList(data.data);
        if(data.paging_state != pagingState){
          setMessageList(messageList.concat(data.data.message_list));
          setPagingState(data.paging_state);
        }
        // console.log(messageList);
      }).catch((error) => {
        console.error(error);
      })
    }

    return (
        <Box>
            <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  overflowY: 'auto',
                  padding: 2,
                  boxSizing: 'border-box',
                }}
            >
              {messageList.map((message, i) => (
                  <MessageBubble
                  key={i}
                  message={message}
                  // side={i % 2 === 0 ? 'right' : 'left'}
                  />
              ))}
            </Box>
            <Box>
              <Box>
                <TextField
                  id="outlined-multiline-static"
                  label="发送消息"
                  multiline
                  rows={3}
                  fullWidth
                />
              </Box>
              <Box>
                <Button variant="contained" 
                  style={{float: 'right'}}
                >发送</Button>
              </Box>
            </Box>
        </Box>
    );
};

export default Page;