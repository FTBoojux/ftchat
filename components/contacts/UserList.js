import React, { useState } from 'react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MyFetch from '@/app/api/MyFetch';
import { WebSocketContext } from '@/app/main/WebSocketContext';

const UserList = (props) => {

  const [open, setOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('');
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const webSocket = React.useContext(WebSocketContext);
  const {router} = props;
  const handleClick = (user) => {
    setOpen(true);
    setDialogUser(user);
    if (props.handleType === 2) {
      setDialogTitle('添加联系人');
    } else if(props.handleType === 1) {
      setDialogTitle('删除联系人');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };

  const handleConfirm = () => {
    console.log(dialogUser);
    if (props.handleType === 2) {
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
    } else if(props.handleType === 1) {
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
    }
  };

  const openMessagePage = (e,user_id) => {
    if (props.handleType === 2) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    router.push(`/main/message/${user_id}`);
  }

  return (
    <Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {props.users.map((user, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <Divider variant="inset" component="li" />}
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleClick(user)}>
                  {props.handleType === 2 ? <AddIcon /> : <DeleteIcon />}
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={dialogUser?.username} src={dialogUser?.avatar} />
            </ListItemAvatar>
            <ListItemText primary={dialogUser?.username} secondary={dialogUser?.bio} />
          </ListItem>
          {
            props.handleType === 2 &&
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
        <Alert elevation={6} variant='filled' onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserList;
