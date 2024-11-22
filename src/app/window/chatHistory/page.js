"use client";
import React from "react";
import { TextField, Select, MenuItem, Box, List, ListItem, ListItemText } from '@mui/material';
import MyFetch from "@/app/api/MyFetch";

export default function History(props) {
  const [conversation_id, setConversation_id] = React.useState(null);
  const [history, setHistory] = React.useState([]);
  const [keyword, setKeyword] = React.useState('');
  const [type, setType] = React.useState('all'); // 'all', 'file', 'image'
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const listRef = React.useRef(null);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const conversation_id = props.conversation_id || urlParams.get('conversation_id');
    setConversation_id(conversation_id);
  }, []);

  React.useEffect(() => {
    fetchHistory(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, type]);

  const fetchHistory = (isNewSearch = false) => {
    if (isNewSearch) {
      setPage(1);
      setHasMore(true);
      setHistory([]); // 重置历史记录
    }
    if (!hasMore) return;
  
    const queryParams = new URLSearchParams();
    queryParams.append('conversation_id', conversation_id);
    queryParams.append('keyword', keyword);
    queryParams.append('type', type);
    queryParams.append('page_num', page);
    queryParams.append('page_size', 20);
  
    MyFetch(`/api/conversation/${conversation_id}/message_es/?${queryParams.toString()}`)
      .then(res => res.json())
      .then(data => {
        const messages = data.data[0]; // 提取消息数组
        const totalCount = data.data[1]; // 总记录数
  
        if (messages.length < 20) {
          setHasMore(false);
        }
  
        // 解析消息数据
        const newMessages = messages.map(item => {
          const messageData = item._source.data;
          return {
            id: messageData.message_id,
            content: messageData.content,
            timestamp: messageData.timestamp,
            sender_id: messageData.sender_id,
            highlight: item.highlight ? item.highlight['data.content'][0] : '',
          };
        });
  
        setHistory(prev => isNewSearch ? newMessages : [...prev, ...newMessages]);
        setPage(prev => prev + 1);
      })
      .catch(error => {
        console.error('Failed to fetch history:', error);
      });
  };

  const handleScroll = () => {
    const bottom = listRef.current.scrollHeight - listRef.current.scrollTop === listRef.current.clientHeight;
    if (bottom) {
      fetchHistory();
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="关键词搜索"
          variant="outlined"
          value={keyword}
          onChange={(e) => {
            console.log(e.target.value);
            
            setKeyword(e.target.value)
            }
          }
        />
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="all">全部</MenuItem>
          <MenuItem value="file">文件</MenuItem>
          <MenuItem value="image">图片</MenuItem>
        </Select>
      </Box>
      <Box
        ref={listRef}
        onScroll={handleScroll}
        sx={{ height: '60vh', overflowY: 'auto' }}
      >
        <List>
          {history.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.content} secondary={item.timestamp} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}