"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField } from '@mui/material';
import MessageBubble from '../../../../../components/message/MessageBubble';
import MyFetch from '@/app/api/MyFetch';
import localForage from 'localforage';
import { WebSocketContext } from '@/app/main/WebSocketContext';

const avatar_url = "http://47.98.97.181:9100/ftchat-avatar/a7388de6-c190-4edd-ae1d-4962cd2b1043.png"

const Page = ({params}) => {

    const router = useRouter();

    const conversation_id = params.slug;
    const [pagingState, setPagingState] = React.useState("");
    // const [pageSize,setPageSize] = React.useState(20);
    const [messageList, setMessageList] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const webSocket = React.useContext(WebSocketContext);

    React.useEffect(() => {
      fetchMessageList();
      // 当组件加载时，从 localForage 获取保存的消息输入
      localForage.getItem(conversation_id).then(savedMessage => {
        if (savedMessage) {
          setMessage(savedMessage);
        }
      });
    }, [])
      
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
    const handleChange = async (event) => {
      const newMessage = event.target.value;
      setMessage(newMessage);
      // 将新输入的消息保存到 localForage
      await localForage.setItem(conversation_id, newMessage);
    };
    const handleSend = () => {
      // 发送消息
      MyFetch(`/api/conversation/${conversation_id}/message/`, {
        method: 'POST',
        body: JSON.stringify({
          message: message,
        }),
      })
      .then(response=>response.json())
      .then((data) => {
        console.log(data);
        setMessageList(messageList.concat(data.data));
        // 清空输入框
        setMessage('');
        // 清空 localForage 中保存的消息
        localForage.removeItem(conversation_id);
        if(data.result === 'success'){
          webSocket.send(JSON.stringify({
            type: 3,
            token: localStorage.getItem('access_token'),
            data: data.data
          }))
        }

      }).catch((error) => {
        console.error(error);
      })
    }
    return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: '1fr auto', // 1fr 表示剩余空间，auto 表示内容高度
            height: '90vh',
          }}
        >
            <Box
                sx={{
                  // width: '100%',
                  // height: '100%',
                  overflowY: 'auto',
                  padding: 2,
                  boxSizing: 'border-box',
                  flexGrow: 1
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
                  value={message}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Button variant="contained" 
                  style={{float: 'right'}}
                  onClick={handleSend}
                >发送</Button>
              </Box>
            </Box>
        </Box>
    );
};

export default Page;