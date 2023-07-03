import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

export default function MessageBubble({ message, side }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
        my: 1,
      }}
    >
      <Box
        sx={{
        //   maxWidth: '60%',
          display: 'flex',
          flexDirection: side === 'right' ? 'row-reverse' : 'row',
        //   alignItems: 'center',
        }}
      >
        <Box
            sx={{
                display: 'flex',
                flexDirection: side === 'right' ? 'row-reverse' : 'row',
                // alignItems: 'center',
                marginTop: '20px',
            }}
        >
            <Avatar
            sx={{
                bgcolor: side === 'right' ? 'primary.main' : 'grey.500',
                ml: side === 'right' ? 1 : 0,
                mr: side === 'right' ? 0 : 1,
            }}
            >
            {message.author[0]}
            </Avatar>
            <Box>
                {
                    side === 'right' ?         
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
                    flexDirection: side === 'right' ? 'row-reverse' : 'row',
                }}
            >
                <Typography 
                    variant="body2"
                    >{message.author}</Typography>                
            </Box>
            <Box
                sx={{
                    p: 1,
                    pl: 2,
                    pr: 2,
                    bgcolor: side === 'right' ? 'primary.main' : 'grey.300',
                    color: side === 'right' ? 'primary.contrastText' : 'text.primary',
                    borderRadius: 1,
                }}
            >{message.text}</Box>
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
