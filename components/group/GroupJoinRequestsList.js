import React from "react";

import { List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Button } from "@mui/material";

export default function GroupJoinRequestsList(props) {
    return (
        <>
            <List>
                {
                    props.groupJoinRequests.map((groupJoinRequest) => (
                        <ListItem
                            secondaryAction={
                                <>
                                    <Button>同意</Button>
                                    <Button>拒绝</Button>
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
        </>
    )
}