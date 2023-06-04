"use client";
import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

// Here are your pages
const Messages = () => <div>Messages</div>;
const Contacts = () => <div>Contacts</div>;
const Settings = () => <div>Settings</div>;

const drawerWidth = 240;

const Main = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <List>
            <ListItem button component={Link} to="/messages">
              <ListItemText primary="消息" />
            </ListItem>
            <ListItem button component={Link} to="/contacts">
              <ListItemText primary="联系人" />
            </ListItem>
            <ListItem button component={Link} to="/settings">
              <ListItemText primary="设置" />
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/messages" element={<Messages />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default Main;
