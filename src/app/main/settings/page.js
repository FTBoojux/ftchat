import MyFetch from '@/app/api/MyFetch';
import { Button, List, ListItemButton, ListItemIcon } from '@mui/material';
import React from 'react';
import {WebviewWindow} from '@tauri-apps/api/window'

const Settings = () => {

  const handleLogout = () => {
    MyFetch(`/api/account/logout/`, {
      method: 'POST',
    }).then(response=>response.json())
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error(error);
    })
    localStorage.clear();
    window.location.reload();
  }

  const openEditProfileWindow = async () => {
    const webview = new WebviewWindow('修改个人信息',{
      url: 'main/settings/profile',
    })

    webview.once('tauri://created', () => {
      console.log('webview created')
    })
    webview.once('tauri://error', (e) => {
      console.log('webview error')
      console.log(e);
    })
  }

  return (
    <div>
      <List>
        <ListItemButton>
          <Button variant="contained" onClick={openEditProfileWindow}>修改个人信息</Button>
        </ListItemButton>
        <ListItemButton>
          <Button variant="contained" onClick={handleLogout}>退出</Button>
        </ListItemButton>
      </List>
    </div>
  );
};

export default Settings;