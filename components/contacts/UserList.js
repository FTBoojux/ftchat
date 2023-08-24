import React, { useState } from 'react';
import { Avatar, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemAvatar, ListItemText, Divider, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar, Alert, Collapse } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MyFetch from '@/app/api/MyFetch';
import { WebSocketContext } from '@/app/main/WebSocketContext';

const UserList = (props) => {

  const [open, setOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  // const [listOpen, setListOpen] = useState(false);
  const webSocket = React.useContext(WebSocketContext);
  const {listOpen,setListOpen} = props;
  const {router,handleType} = props;
  const handleClick = (e,user) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
    setDialogUser(user);
    if (handleType === 2) {
      setDialogTitle('添加联系人');
    } else if(handleType === 1) {
      setDialogTitle('删除联系人');
    }else if(handleType === 3){
      setDialogTitle('退出群聊');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };

  const handleConfirm = () => {
    if (handleType === 2) {
      MyFetch(`/api/account/contact_add/`, {
        method: 'POST',
        body: JSON.stringify({
          target: dialogUser.user_id,
          message: message,
        }),
      })
      .then(response=>response.json())
      .then((data) => {
        setSnackbarOpen(true);
        setSnackbarMessage(data.data.msg);
        handleClose();
        if(data.data.res){
          webSocket.send(JSON.stringify({
            type: 1,
            token: localStorage.getItem('access_token'),
            data: {
              targetId: dialogUser.user_id,
              message: message
            }
          }))    
        }
      }).catch((error) => {
        console.error(error);
      })
    } else if(handleType === 1) {
      MyFetch(`/api/account/contacts/${dialogUser.user_id}/`, {
        method: 'DELETE',
      })
      .then(response=>response.json())
      .then((data) => {
        setSnackbarOpen(true);
        setSnackbarMessage(data.message);
        handleClose();
      }).catch((error) => {
        console.error(error);
      })
    }else if(handleType === 3){
      console.log(dialogUser);
      MyFetch(`/api/groups/${dialogUser.group_id}/members/`, {
        method: 'DELETE',
      })
      .then(response=>response.json())
      .then((data) => {
        setSnackbarOpen(true);
        if(data.code == 200){
          setSnackbarMessage("已退出群聊");
        }else{
          setSnackbarMessage(data.message);
        }
        handleClose();

      }).catch((error) => {
        console.error(error);
      })
    }else if(handleType === 4){
      MyFetch(`/api/groups/${dialogUser.group_id}/join_requests/`, {
        method: 'POST',
        body: JSON.stringify({
          message: message,
        }),
      })
      .then(response=>response.json())
      .then((data) => {
        setSnackbarOpen(true);
        setSnackbarMessage(data.message)
        handleClose();
      }).catch((error) => {
        console.error(error);
      })
    }
  };

  const openMessagePage = (e,user_id) => {
    if (handleType === 2) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    router.push(`/main/message/${user_id}`);
  }

  const ActionIcon = ({type})=>{
    if(type == 1){
      return <DeleteIcon />
    }else if(type == 2){
      return <AddIcon />
    }else if(type == 3){
      return <ExitToAppSharpIcon />
    }else{
      return <AddIcon />
    }
  }

  return (
    <Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItemButton onClick={()=>{setListOpen(!listOpen)}}>
          <ListItemText>{props.title}</ListItemText>
          {listOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={listOpen} timeout={"auto"} unmountOnExit listOpen={listOpen}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {
              (!props.users || props.users.length === 0) && 
              <ListItem>
                <ListItemText>暂无搜索结果</ListItemText>
              </ListItem>
            }
            {props.users && props.users.map((user, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <Divider variant="inset" component="li" />}
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={(e) => handleClick(e,user)}>
                      {/* {props.handleType === 2 ? <AddIcon /> : <DeleteIcon />} */}
                      <ActionIcon type={handleType} />
                    </IconButton>
                  }
                  sx={{ cursor: 'pointer' }}
                  onClick={(e)=>openMessagePage(e, user.user_id)}
                >
                  <ListItemAvatar>
                    <Avatar alt={user.username} src={user.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={user.username} secondary={user.bio} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>  
        </Collapse> 

      </List>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent >
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={dialogUser?.username} src={dialogUser?.avatar} />
            </ListItemAvatar>
            <ListItemText primary={dialogUser?.username} secondary={dialogUser?.bio} />
          </ListItem>
          {
            (handleType === 2 || handleType === 4) &&
              <TextField
              autoFocus
              margin="dense"
              label="备注消息"
              type="text"
              fullWidth
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleConfirm}>确认</Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert elevation={6} variant='filled' onClose={() => setSnackbarOpen(false)} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserList;
