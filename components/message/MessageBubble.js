import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

export default function MessageBubble({ message }) {
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
            <Box>
                {
                    message.side === 'right' ?         
                    <Box sx={{
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderLeft: '20px solid',
                        borderBottom: '10px solid transparent',
                        color: 'primary.main',
                        marginTop: '50%',
                    }} />
                    :
                    <Box sx={{
                        width: 0,
                        height: 0,
                        borderTop: '10px solid transparent',
                        borderRight: '20px solid',
                        borderBottom: '10px solid transparent',
                        color: 'grey.300',
                        marginTop: '50%',
                    }} />
                }
                
            </Box>

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
            <Box
                sx={{
                    p: 1,
                    pl: 2,
                    pr: 2,
                    bgcolor: message.side === 'right' ? 'primary.main' : 'grey.300',
                    color: message.side === 'right' ? 'primary.contrastText' : 'text.primary',
                    borderRadius: 1,
                }}
            >{message.content}</Box>
            <Box>
                <Typography>
                    {new Date(message.timestamp).toLocaleTimeString()}
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
