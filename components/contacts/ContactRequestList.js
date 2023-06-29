import { IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar} from '@mui/material';
import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import MyFetch from '@/app/api/MyFetch';

const ContactRequestList = (props) => {
    const {contactRequests,handleAccept,handleDecline} = props;
    const timestampConvert = (timestamp) => {
        let date = new Date(timestamp);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;  // getMonth() 返回的月份是从0开始的，所以我们需要+1
        let day = date.getDate();

        // 拼接成你想要的格式
        let formattedDate = year + '年' + month + '月' + day + '日';

        return formattedDate
    }



  return (
    <>
        <List>
            {contactRequests.map((contactRequest,index) => {
                return (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <>
                                <IconButton onClick={()=>{handleAccept(contactRequest.requester)}} >
                                    <DoneIcon />
                                </IconButton>
                                <IconButton onClick={()=>{handleDecline(contactRequest.requester)}} >
                                    <ClearIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar alt={contactRequest.username} src={contactRequest.avatar} />
                        </ListItemAvatar>
                        <ListItemText 
                            primary={contactRequest.username} 
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {contactRequest.message}
                                    </Typography>
                                    <Typography>
                                        {timestampConvert(contactRequest.timestamp)}
                                    </Typography>
                                </React.Fragment>
                            } />

                    </ListItem>
                )
            })}
        </List>  
    </>
  );
};

export default ContactRequestList;