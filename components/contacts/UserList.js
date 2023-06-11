import React, { useState } from 'react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MyFetch from '@/app/api/MyFetch';

const UserList = (props) => {

  const [open, setOpen] = useState(false);
  const [dialogUser, setDialogUser] = useState(null);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClick = (user) => {
    if (props.handleType === 2) {
      setOpen(true);
      setDialogUser(user);
    } else {
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };

  const handleConfirm = () => {
    console.log(dialogUser);
    MyFetch(`/api/account/contact/`, {
      method: 'POST',
      body: JSON.stringify({
        target: dialogUser.user_id,
        message: message,
      }),
    })
    .then(response=>response.json())
    .then((data) => {
      setSnackbarOpen(true);
      setSnackbarMessage(data.data);
      handleClose();
    }).catch((error) => {
      console.error(error);
    })
  };

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
        <DialogTitle>添加联系人</DialogTitle>
        <DialogContent>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt={dialogUser?.username} src={dialogUser?.avatar} />
            </ListItemAvatar>
            <ListItemText primary={dialogUser?.username} secondary={dialogUser?.bio} />
          </ListItem>
          <TextField
            autoFocus
            margin="dense"
            label="备注消息"
            type="text"
            fullWidth
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
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
