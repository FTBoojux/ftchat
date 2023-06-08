import React, {useState} from 'react';
import { Box, Select, MenuItem, Typography ,Button, List, ListItem, ListItemText } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MyFetch from '../api/MyFetch';
import Showdown from 'showdown';
import OmsViewMarkdown from '../../../components/markdown/MarkdownViewer';


const Gpt = () => {
    const [model, setModel] = useState('gpt-3.5-turbo');
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);


    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        try {
            const response = await MyFetch('http://localhost:8000/gpt/chat/', {
                method: 'POST',
                body: JSON.stringify({
                    model: model,
                    message: message,
                }),
                // 超时时间设置为三分钟
                timeout: 180000,
            });

            const data = await response.json();
            // message = 
            if (data.result === "success") {

                // message = converter.makeHtml(message);
                // setMessage(converter.makeHtml(message));
                // data.message = converter.makeHtml(data.message);

                setChatLog([...chatLog, {role: 'user', content: message}, {role: 'bot', content: data.message}]);
            }

            setMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100vh',
                padding: '20px',
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Select
                    labelId="model-select-label"
                    id="model-select"
                    value={model}
                    label="Select Model"
                    onChange={handleModelChange}
                >
                    <MenuItem value={'gpt-3.5-turbo'}>GPT-3.5 Turbo</MenuItem>
                    <MenuItem value={'gpt-4'}>GPT-4</MenuItem>
                </Select>
            </Box>
            <Box>
            <List>
                {chatLog.map((chat, index) => (
                    <ListItem key={index}>
                        <Box>
                            <Typography variant="body1">
                                {chat.role === 'user' ? `You: ${chat.content}` : `Bot: `}
                            </Typography>
                            {chat.role === 'bot' && <OmsViewMarkdown textContent={chat.content} darkMode /> }
                        </Box>
                    </ListItem>
                ))}
            </List>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '50px'}}>
                <Box sx={{ width: '80%', marginRight: '20px'}}>
                    <TextareaAutosize
                        id="message-input"
                        label="输入您的消息"
                        value={message}
                        onChange={handleMessageChange}
                        style={{ width: '100%', height: '50px' }}
                    />
                </Box>
                <Button variant="contained" onClick={handleSendMessage} sx={{
                    height: '50px',
                }}>
                    发送
                </Button>
            </Box>
        </Box>
    );
};

export default Gpt;
