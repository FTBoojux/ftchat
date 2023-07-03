"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
// import MessageBubble from '@components/message/MessageBubble';
import MessageBubble from '../../../../../components/message/MessageBubble';

const avatar_url = "http://47.98.97.181:9100/ftchat-avatar/a7388de6-c190-4edd-ae1d-4962cd2b1043.png"

const Page = ({params}) => {

    const router = useRouter();

    const messages = [
        {
          "author": "Alice",
          "text": "Hello, how are you?"
        },
        {
          "author": "Bob",
          "text": "I'm fine, thank you. And you?"
        },
        {
          "author": "Alice",
          "text": "I'm good. Thanks for asking.hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"
        }
      ]
      

    return (
        <div>
            <p>slug: {params.slug}</p>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto',
                    padding: 2,
                    boxSizing: 'border-box',
                }}
            >
            {messages.map((message, i) => (
                <MessageBubble
                key={i}
                message={message}
                side={i % 2 === 0 ? 'right' : 'left'}
                />
            ))}
    </Box>
        </div>
    );
};

export default Page;