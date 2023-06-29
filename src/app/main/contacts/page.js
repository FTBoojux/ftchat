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


const Contracts = (props) => {
    const [searchText, setSearchText] = React.useState('');
    const [friends, setFriends] = React.useState([]);
    const [strangers, setStrangers] = React.useState([]);
    const [contactRequests, setContactRequests] = React.useState([]); 
    const {setContactNum} = props;
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    React.useEffect(() => {
      fetchContactRequests() 
      searchFriends()
      setContactNum(0)
    }, []);
    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
      console.log('clicked!');
        // 在这里添加你的搜索逻辑
        searchStrangers()
    };

    const searchFriends =  () => {
      MyFetch(`/api/account/contacts/?keyword=${searchText}`, {
        method: 'GET',
      })
      .then(response=>response.json())
      .then((data) => {
        console.log('data',data);
        setFriends(data.data)
      }).catch((error) => {
        console.error(error);
      })
    }

    const searchStrangers = () => {
      MyFetch(`/api/account/strangers/?keyword=${searchText}`, {
        method: 'GET',
      })
      .then(response=>response.json())
      .then((data) => {
        console.log(data);
        setStrangers(data.data);
      }).catch((error) => {
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
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                好友
              </Typography>
              {
                (friends != null && friends.length === 0) && <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>暂无搜索结果</Typography>
              }
              {
                (friends != null && friends.length !== 0) && <UserList users={friends} handleType={1} />
              }
            </Box>
            <Box>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                陌生人
              </Typography>
              {
                strangers.length === 0 && <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>暂无搜索结果</Typography>
              }
              {
                strangers.length !== 0 && <UserList users={strangers} handleType={2} />
              }
            </Box>
          </Container>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />

        </Box>
    );
};

export default Contracts;
