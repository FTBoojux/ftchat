import React from "react";

import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Button, Snackbar } from "@mui/material";
import { WebSocketContext } from "@/app/main/WebSocketContext";
import MyFetch from "@/app/api/MyFetch";

export default function GroupJoinRequestsList(props) {

    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const webSocket = React.useContext(WebSocketContext);
    const handleRequest = (groupJoinRequest,handle) => {
        console.log(groupJoinRequest);

        MyFetch(`/api/groups/${groupJoinRequest.group.group_id}/join_requests/`, {
            method: 'put',
            body: JSON.stringify({
                requester: groupJoinRequest.requester.user_id,
                operation: handle ? "accept" : "reject"
            }),
        })
        .then(response=>response.json())
        .then((data) => {
            setSnackbarOpen(true);
            setSnackbarMessage(data.message);
            if(data.result === 'success' && handle){
                webSocket.send(JSON.stringify({
                    type: 2,
                    token: localStorage.getItem('access_token'),
                    data: {
                        groupId: groupJoinRequest.group.group_id,
                        requester: groupJoinRequest.requester.user_id,
                        agree: handle
                    }
                }))
            }
        }).catch((error) => {
            console.error(error);
        }
        )
    }

    return (
        <>
            <List>
                {
                    props.groupJoinRequests.map((groupJoinRequest) => (
                        <ListItem
                            secondaryAction={
                                <>
                                    <Button onClick={()=>{handleRequest(groupJoinRequest,true)}} >同意</Button>
                                    <Button onClick={()=>{handleRequest(groupJoinRequest,false)}}>拒绝</Button>
                                </>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar alt="head" src={groupJoinRequest.requester.avatar}></Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={groupJoinRequest.requester.username}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={'display: inline'}
                                            component={'span'}
                                            variant={'body2'}
                                            color={'text.primary'}
                                        >
                                            备注信息
                                        </Typography>
                                        {"-"+groupJoinRequest.message}
                                    </React.Fragment>
                                }
                            ></ListItemText>
                        </ListItem>    
                    ))
                }
            </List>
            <Snackbar open={snackbarOpen} message={snackbarMessage} autoHideDuration={6000} onClose={()=>setSnackbarOpen(false)}></Snackbar>
        </>
    )
}