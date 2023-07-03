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