import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton} from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const UserList = (props) => {
  
    console.log(props);
    const ControlIcon = ()=>{
      if(props.type === 1){
        return <DeleteIcon />
      }else{
        return<AddIcon />
      }
    }
    return (
    <Box>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
            props.users.map((user,index) => {
                return <>
                  {
                    index != 0 && <Divider variant="inset" component="li" />
                  }
                  <ListItem key={index} 
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <ControlIcon />
                      </IconButton>
                    }
                  >
                      <ListItemAvatar>
                          <Avatar alt={user.username} src={user.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={user.username} secondary={user.bio} />
                  </ListItem>                
                </>
                
            })
        }
      </List>
    </Box>
  );
};

export default UserList;