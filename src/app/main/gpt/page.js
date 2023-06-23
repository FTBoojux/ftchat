import React, {useState} from 'react';
import { Box, Select, MenuItem, Typography ,Button, List, ListItem, ListItemText, Divider, Snackbar, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MyFetch from '../../api/MyFetch';
import OmsViewMarkdown from '../../../../components/markdown/MarkdownViewer';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Gpt = () => {
    const [model, setModel] = useState('gpt-3.5-turbo');
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [conversation, setConversation] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState("-1");
    const [open, setOpen] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState('会话不存在！');
    const [openDialog, setOpenDialog] = useState(false);
    const [newConversationTitle, setNewConversationTitle] = useState('');
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const [removeConversationId, setRemoveConversationId] = useState('');
    const [nextPagingState, setNextPagingState] = useState(0);

    React.useEffect(() => {
        fetchConversation();
    }, []);

    const handleModelChange = (event) => {
        setModel(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const fetchConversation = ()=>{
        MyFetch('api/gpt/conversation/', {
            method: 'GET',
        }).then(response=>response.json())
        .then((data) => {
            console.log(data);
            setConversation(data.data);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const fetchMoreMessages = (conversation_id, paging_state) => {
        let url = `api/gpt/chat/?conversation_id=${conversation_id}`;
        if (paging_state) {
            url += `&paging_state=${encodeURIComponent(paging_state)}`;
        }
        MyFetch(url, {
            method: 'GET',
        }).then(response=>response.json())
        .then((data) => {
            if (data.result === "success") {
                setChatLog(chatLog => [...data.data,...chatLog]);
                setNextPagingState(data.next_paging_state);
            }
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const handleSendMessage = async () => {
        if(selectedConversation === "-1") {
            alert("请选择会话");
            return;
        }
        try {
            const response = await MyFetch('http://localhost:8000/gpt/chat/', {
                method: 'POST',
                body: JSON.stringify({
                    model: model,
                    message: message,
                    conversation_id: selectedConversation,
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
    const handleCreateConversation = async () => {
        try {
            const response = await MyFetch('api/gpt/conversation/', {
                method: 'POST',
                body: JSON.stringify({
                    title: newConversationTitle,
                }),
            });

            const data = await response.json();

            if (data.result === "success") {
                setSnackMessage("创建成功！");
                setOpen(true);
                setConversation([...conversation, { conversation_id: data.data, title: newConversationTitle }]);
                fetchConversation();
            }

            setNewConversationTitle('');
            setOpenDialog(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveConversation = () => {
        MyFetch('api/gpt/conversation/', {
            method: 'DELETE',
            body: JSON.stringify({
                conversation_id: removeConversationId,
            }),
        }).then(response=>response.json())
        .then((data) => {
            if (data.result === "success") {
                setSnackMessage("删除成功！");
                setOpen(true);
                fetchConversation();
            }
            setOpenRemoveDialog(false);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    const handleConversationRemoveClick = (event,index) => {
        // 组织事件冒泡
        event.stopPropagation();
        setRemoveConversationId(conversation[index].conversation_id);
        setOpenRemoveDialog(true);
    }

    const handleConversationChange = (conversation_id) => {
        setNextPagingState(null)
        setSelectedConversation(conversation_id);
        setChatLog([]);
        fetchMoreMessages(conversation_id, null);
    }

    const handleScroll = (event) => {
        const target = event.target;
        if (target.scrollTop === 0 && nextPagingState != null) {
            fetchMoreMessages(selectedConversation, nextPagingState);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    position: 'fixed', // 添加此属性以固定左侧面板
                    top: 0, // 与屏幕顶部对齐
                    width: '25%',
                    minWidth: '160px',
                    height: '100%', // 设置高度以撑满整个屏幕高度
                    overflowY: 'auto', // 当会话列表过长时添加滚动条
                    zIndex: 10, // 确保左侧面板始终显示在其他元素上方
                }}
            >
                <Box>
                    { conversation != null && conversation.length === 0 ? 
                        <Typography variant="body1">暂无会话</Typography> 
                        : 
                        <List>
                            <ListItem onClick={()=>setOpenDialog(true)} >
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="创建会话" />
                            </ListItem>
                            {
                                conversation.map((item, index) => (
                                    <Box key={index}>
                                        <ListItem 
                                            
                                            selected={selectedConversation === item.conversation_id}
                                            onClick={() => {
                                                handleConversationChange(item.conversation_id);
                                            }}
                                        >
                                            <ListItemText primary={item.title} />
                                            <ListItemIcon onClick={(e)=>{handleConversationRemoveClick(e,index)}} >
                                                <DeleteIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                ))
                            }
                        </List>    
                    }

                </Box>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100vh',
                    paddingLeft: 'calc(25% + 8px)', // 让内容从左侧面板的分隔线开始
                    paddingRight: '8px',
                    flexGrow: 1,
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
                <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }} onScroll={handleScroll}>
                    <List >
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
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px'}}>
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
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)} message={snackMessage} />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>创建会话</DialogTitle>
                <DialogContent>
                    <DialogContentText>请输入新会话的名称</DialogContentText>
                    <TextField autoFocus margin="dense" label="名称" fullWidth value={newConversationTitle} onChange={(event) => setNewConversationTitle(event.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>取消</Button>
                    <Button onClick={() => handleCreateConversation()}>创建</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openRemoveDialog} onClose={() => setOpenRemoveDialog(false)}>
                <DialogTitle>移除会话</DialogTitle>
                <DialogContent>
                    <DialogContentText>确定要移除此会话吗？</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenRemoveDialog(false)}>取消</Button>
                    <Button onClick={() => handleRemoveConversation()}>确认</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Gpt;
