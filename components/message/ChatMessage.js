import { Avatar, Box, Typography } from "@mui/material";

const ChatMessage = ({ message, isRight }) => {
    const { author, text, avatar, timestamp } = message;
    // 将日期对象转换为你想要的格式，这里只是一个例子
    const formattedTime = new Date(timestamp).toLocaleTimeString();
  
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isRight ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        mb: 2
      }}>
        <Avatar src={avatar} alt={author} sx={{ order: isRight ? 1 : 0 }}/>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '70%',
          borderRadius: 2, 
          p: 1, 
          bgcolor: isRight ? 'grey.300' : 'primary.light',
          ml: isRight ? 0 : 2,
          mr: isRight ? 2 : 0
        }}>
          <Typography variant="body2">{author}</Typography>
          <Typography variant="body1">{text}</Typography>
          <Typography variant="caption" color="text.secondary">{formattedTime}</Typography>
        </Box>
        <Box sx={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: isRight ? '0 10px 10px 0' : '10px 10px 0 0',
          borderColor: isRight ? 'transparent grey.300 transparent transparent' : 'transparent transparent transparent primary.light'
        }} />
      </Box>
    );
  }
  
export default ChatMessage;