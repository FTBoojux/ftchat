"use client";
import React from 'react';
import { Box, Snackbar, Container, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MyFetch from '@/app/api/MyFetch';
import UserList from '../../../../components/contacts/UserList';
import ContactRequestList from '../../../../components/contacts/ContactRequestList';
import {useRouter} from 'next/navigation'


const Contracts = (props) => {
    const [searchText, setSearchText] = React.useState('');
    const [friends, setFriends] = React.useState([]);
    const [strangers, setStrangers] = React.useState([]);
    const [groupUnjoined, setGroupUnjoined] = React.useState([]); 
    const [groupJoined, setGroupJoined] = React.useState([]);
    const [contactRequests, setContactRequests] = React.useState([]); 
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [groupJoinedOpen, setGroupJoinedOpen] = React.useState(false);
    const [groupUnjoinedOpen, setGroupUnjoinedOpen] = React.useState(false);
    const [friendsOpen, setFriendsOpen] = React.useState(false);
    const [strangersOpen, setStrangersOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
      fetchContactRequests() 
      // searchFriends()
      search()
    }, []);
    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
      search();
      setListAllOpen();  
    };

    const search = () => {
      MyFetch(`/api/search/?keyword=${searchText}`, {
        method: 'GET',
      })
      .then(response=>response.json())
      .then((data) => {
        console.log(data);
        if(data.result === 'success'){
          setFriends(data.data.contacts);
          setStrangers(data.data.strangers);
          setGroupUnjoined(data.data.groups_unjoined);
          setGroupJoined(data.data.groups_joined);
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }

    const fetchContactRequests = () => {
      MyFetch(`/api/account/contact_add/`, {
        method: 'GET',
      })
      .then(response=>response.json())
      .then((data) => {
        console.log(data);
        setContactRequests(data.data);
      }
      ).catch((error) => {
        console.error(error);
      }
      )
    }

    const handleAccept = (requester) => {
      MyFetch(`/api/account/contacts/`, {
          method: 'POST',
          body: JSON.stringify({
              target: requester
          }),
      })
      .then(response=>response.json())
      .then((data) => {
          console.log(data);
          setSnackbarOpen(true);
          setSnackbarMessage(data.message);

      }).catch((error) => {
          console.error(error);
      })
      removeContactRequest(requester);
  }

  const handleDecline = (requester) => {
      MyFetch(`/api/account/contact_add/`, {
          method: 'DELETE',
          body: JSON.stringify({
              target: requester
          }),
      })
      .then(response=>response.json())
      .then((data) => {
          console.log(data);
          setSnackbarOpen(true);
          setSnackbarMessage(data.message);
      }).catch((error) => {
          console.error(error);
      })
      removeContactRequest(requester);
  }

  
  const removeContactRequest = (requester) => {
    // 移除指定的好友请求
    const newContactRequests = contactRequests.filter((item) => item.requester !== requester);
    setContactRequests(newContactRequests);      
  }

  const setListAllOpen = ()=>{
    setGroupJoinedOpen(true);
    setGroupUnjoinedOpen(true);
    setFriendsOpen(true);
    setStrangersOpen(true);
  }

    return (
        <Box>
          <Container
            fixed
          >
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
              <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="搜索联系人"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={searchText}
                onChange={(event)=>handleChange(event)}
              />
              <IconButton 
                type="button" 
                sx={{ p: '10px' }} 
                aria-label="search"
                onClick={()=>handleSearch()}
                >
                <SearchIcon/>
              </IconButton>
            </Paper>
          </Container>
          <Container>
            <Box>
              {
                contactRequests.length !== 0 
                && 
                <>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}您有新的好友请求></Typography>
                  <ContactRequestList 
                    contactRequests={contactRequests} 
                    handleAccept={handleAccept} 
                    handleDecline={handleDecline}
                    />
                </>
              }
            </Box>
            <Box>
              <UserList 
                router={router} 
                users={groupJoined} 
                handleType={3} 
                title="已加入群聊"
                listOpen={groupJoinedOpen}
                setListOpen={setGroupJoinedOpen}
                />
            </Box>
            <Box>
              <UserList 
                router={router} 
                users={groupUnjoined} 
                handleType={4} 
                title="未加入群聊"
                listOpen={groupUnjoinedOpen}
                setListOpen={setGroupUnjoinedOpen}
                />
            </Box>
            <Box>
              <UserList 
                router={router} 
                users={friends} 
                handleType={1} 
                title="好友"
                listOpen={friendsOpen}
                setListOpen={setFriendsOpen}
              />
            </Box>
            <Box>
              <UserList 
                router={router} 
                users={strangers} 
                handleType={2} 
                title="陌生人"
                listOpen={strangersOpen}
                setListOpen={setStrangersOpen}
                />
            </Box>
          </Container>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />

        </Box>
    );
};

export default Contracts;
