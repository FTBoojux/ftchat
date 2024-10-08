import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import TextMessageBox from './TextMessageBox';
import FileInformationBox from './FileInformationBox';

export default function MessageBubble({ message }) {

  const timeConvert = (timestamp) => {
    // 日期不同时补充显示日期，年份不同时补充显示年份
    const date = new Date(timestamp);
    const now = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);
    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDay = now.getDate();
    if (year === nowYear && month === nowMonth && day === nowDay) {
      return `${hour}:${minute}`;
    } else if (year === nowYear) {
      return `${month}-${day} ${hour}:${minute}`;
    } else {
      return `${year}-${month}-${day} ${hour}:${minute}`;
    }
  }

  const MessageShower = ({message}) => {
    if(message.message_type == 1){
      return <TextMessageBox message={message}></TextMessageBox>
    }else if(message.message_type == 2){
      return <FileInformationBox message={message}></FileInformationBox>
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.side === 'right' ? 'flex-end' : 'flex-start',
        my: 1,
      }}
    >
      <Box
        sx={{
        //   maxWidth: '60%',
          display: 'flex',
          flexDirection: message.side === 'right' ? 'row-reverse' : 'row',
        //   alignItems: 'center',
        }}
      >
        <Box
            sx={{
                display: 'flex',
                flexDirection: message.side === 'right' ? 'row-reverse' : 'row',
                // alignItems: 'center',
                marginTop: '20px',
            }}
        >
            <Avatar
              sx={{
                  bgcolor: message.side === 'right' ? 'primary.main' : 'grey.500',
                  ml: message.side === 'right' ? 1 : 0,
                  mr: message.side === 'right' ? 0 : 1,
              }}
              src={message.sender.avatar}
            >
              {message.sender.username}
            </Avatar>
        </Box>

        <Box
          sx={{
            // p: 1,
            // pl: 2,
            // pr: 2,
            // bgcolor: side === 'right' ? 'primary.main' : 'grey.300',
            // color: side === 'right' ? 'primary.contrastText' : 'text.primary',
            borderRadius: 1,
            // maxWidth: '80%',
            wordBreak: 'break-word',
          }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: message.side === 'right' ? 'row-reverse' : 'row',
                }}
            >
                <Typography 
                    variant="body2"
                    >{message.sender.username}</Typography>                
            </Box>
            <MessageShower message={message} ></MessageShower>
            {/* <Box
                sx={{
                    p: 1,
                    pl: 2,
                    pr: 2,
                    bgcolor: message.side === 'right' ? 'primary.main' : 'grey.300',
                    color: message.side === 'right' ? 'primary.contrastText' : 'text.primary',
                    borderRadius: 1,
                }}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.content) }}
            >
            </Box> */}
            <Box>
                <Typography>
                    {/* {new Date(message.timestamp).toLocaleTimeString()} */}
                    {timeConvert(message.timestamp)}
                </Typography>
            </Box>
        </Box>
        {/* <Box sx={{
            width: 0,
            height: 0,
            borderTop: '10px solid transparent',
            borderLeft: '20px solid blue',
            borderBottom: '10px solid transparent',
        }} /> */}
      </Box>
    </Box>
  );
}
