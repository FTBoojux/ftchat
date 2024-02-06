"use client";
import { useEffect, useState, cloneElement, useRef } from "react"
import { useWebContext } from "@/app/WebSocketContext";
import MyFetch from "@/app/api/MyFetch";
import { useRouter } from "next/navigation";
import { Box, List, ListItem, Badge, Drawer, Snackbar} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
const drawerWidth = 40;

const MainLayout = ({
    children, // will be a page or nested layout
  })=>{
    const {ws, saveWs, conversations, saveConversations, updateConversation} = useWebContext();
    const ctx = useWebContext();
    const ctxRef = useRef(ctx);
    ctxRef.current = ctx;

    const [messageNum, setMessageNum] = useState(0);
    const [contactNum, setContactNum] = useState(0);
    const [path, setPath] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
      getNewMessageNums();
    }, []);
    const getNewMessageNums = () => {
      MyFetch('/api/message/new_message_num', {
        method: 'GET'
      })
      .then(response => response.json())
      .then(async data => {
          console.log('Success:', data);
          setMessageNum(data.data.messages);
          setContactNum(data.data.contacts);
      })
      .catch((error) => {
          console.error('Error:', error);
      })
    }

    const ColoredIcon = ({ to, children }) => {
      // const location = useLocation();
  
      // 根据当前路径是否匹配，来选择图标颜色
      const color = path === to ? 'blue' : 'inherit';
  
      // 使用 color 作为图标的颜色
      const iconWithColor = cloneElement(children, { style: { color } });
  
      return iconWithColor;
    };

    const addContactNum = (num) => {
      setContactNum(contactNum+num)
    }
  
    const addMessageNum = (num) => {
      setMessageNum(messageNum+num)
    }

    useEffect(() => {
        if(localStorage.getItem('access_token') === null) {
            window.location.href = '/'
        }else{
          const webSocket = new WebSocket('ws://localhost:8080/websocket')
          webSocket.onopen = () => {
            console.log('connected')
            webSocket.send(JSON.stringify({
              type: 0,
              token: localStorage.getItem('access_token')
            }))
          }
          webSocket.onclose = () => {
            console.log('disconnected')
          }
          webSocket.onmessage = (message) => {
            console.log(message)
            const data = JSON.parse(message.data)
            if(data.type === 1 || data.type === 2){
              setContactNum(contactNum+1)
            }
            if(data.type === 3){
              addMessageNum(1)
              ctxRef.current.updateConversation(data.data,ctxRef.current.conversations)
            }
          }
          saveWs(webSocket)
        }
        return () => {
          if(ws !== null) {
            ws.close()
          }
        }
    }, [])

    const toPage = (path) => {
      router.push(path)
      setPath(path)
    }

    return (
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0
            // '& .MuiDrawer-paper': {
            //   width: drawerWidth,
            //   boxSizing: 'border-box',
            // },
          }}
        >
          <List>
            <ListItem button onClick={()=>{toPage("/main/gpt")}}>
              <ColoredIcon to="/main/gpt">
                <SmartToyIcon />
              </ColoredIcon>
            </ListItem>
            <ListItem button onClick={()=>{toPage("/main/message");setMessageNum(0)}}>
              <ColoredIcon to="/main/message">
                <Badge badgeContent={messageNum} color="error" invisible={messageNum===0} >
                 <ChatIcon />
                </Badge>
              </ColoredIcon>
            </ListItem>
            <ListItem button onClick={()=>{toPage("/main/contacts");setContactNum(0)}}>
              <ColoredIcon to="/main/contacts">
                <Badge badgeContent={contactNum} color="error" invisible={contactNum===0} >
                  <PersonIcon />
                </Badge>
              </ColoredIcon>
            </ListItem>
            <ListItem button onClick={()=>{toPage("/main/settings")}}>
              <ColoredIcon to="/main/settings">
                <SettingsIcon />
              </ColoredIcon>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" 
          sx={{ flexGrow: 1 }}
          >
          {children}
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={()=>{setOpen(false)}} message={message}></Snackbar>
      </Box>
    )
  }

export default MainLayout;