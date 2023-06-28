"use client";
import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { HashRouter as Router, Route, Link, Routes, NavLink, useLocation} from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
// Here are your pages
import Message from './message/page';
import Contacts from './contacts/page';
import Settings from './settings/page';
import Gpt from './gpt/page';
import MyFetch from '@/app/api/MyFetch';
import { WebSocketContext } from '@/app/main/WebSocketContext';
import { Badge } from '@mui/material';
const drawerWidth = 40;

const Main = () => {
  const websocket = React.useContext(WebSocketContext);
  const [messageNum, setMessageNum] = React.useState(0);
  const [contactNum, setContactNum] = React.useState(0);
  const [msgHandleFuncMap, setMsgHandleFuncMap] = React.useState({});

  React.useEffect(() => {
    MyFetch('/api/account/avatar/',{
      method: 'GET'
    })
    .then(response => response.json())
    .then(async data => {
        console.log('Success:', data);
        window.localStorage.setItem('avatar', data.data);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    console.log('websocket', websocket);
  }, []);

  React.useEffect(() => {
    if (websocket) {
      websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('websocket data', data);
        if(data.type === 1){
          setContactNum(contactNum+1)
        }
      }
    }
  }, [websocket]);
  const ColoredIcon = ({ to, children }) => {
    const location = useLocation();

    // 根据当前路径是否匹配，来选择图标颜色
    const color = location.pathname === to ? 'blue' : 'inherit';

    // 使用 color 作为图标的颜色
    const iconWithColor = React.cloneElement(children, { style: { color } });

    return iconWithColor;
  };

  const addContactNum = (num) => {
    setContactNum(contactNum+num)
  }

  const addMessageNum = (num) => {
    setMessageNum(messageNum+num)
  }

  return (
    <Router>
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
            <ListItem button component={NavLink} to="/main/gpt">
              <ColoredIcon to="/main/gpt">
                <SmartToyIcon />
              </ColoredIcon>
            </ListItem>
            <ListItem button component={NavLink} to="/main/message">
              <ColoredIcon to="/main/message">
                <Badge badgeContent={messageNum} color="error" invisible={messageNum===0} >
                 <ChatIcon />
                </Badge>
              </ColoredIcon>
            </ListItem>
            <ListItem button component={NavLink} to="/main/contacts">
              <ColoredIcon to="/main/contacts">
                <Badge badgeContent={contactNum} color="error" invisible={contactNum===0} >
                  <PersonIcon />
                </Badge>
              </ColoredIcon>
            </ListItem>
            <ListItem button component={NavLink} to="/main/settings">
              <ColoredIcon to="/main/settings">
                <SettingsIcon />
              </ColoredIcon>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" 
          sx={{ flexGrow: 1, p: 3 }}
          >
          <Routes>
            <Route path="/main/message" element={<Message setMessageNum={addMessageNum} />} />
            <Route path="/main/contacts" element={<Contacts setContactNum={setContactNum} />} />
            <Route path="/main/settings" element={<Settings />} />
            <Route path="/main/gpt" element={<Gpt />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default Main;
