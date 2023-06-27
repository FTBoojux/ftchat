"use client";
import React, { useState, useEffect } from 'react';
import MyFetch from '@/app/api/MyFetch';
import { Button, Switch, FormControlLabel, Box, FormGroup, FormControl, Input , InputLabel, Avatar, Snackbar} from '@mui/material';
import styles from '@/styles/home.module.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ username: '', avatar: '', bio: '', sentiment_analysis_enabled: 0 });
  const [msg, setMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  useEffect(() => {
    MyFetch(`/api/account/user_info/`, {
      method: 'GET',
    }).then(response => response.json())
      .then((response) => {
        if (response.result === 'success') {
          setUserInfo(response.data);
          window.localStorage.setItem('avatar', response.data.avatar);
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  const handleInputChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSwitchChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.checked ? 1 : 0,
    });
  };

  const handleSubmit = () => {
    MyFetch(`/api/account/user_info/`, {
      method: 'POST',
      body: JSON.stringify(userInfo),
    }).then(response => response.json())
      .then((response) => {
        if (response.result === 'success') {
          setMsg('已更新用户信息！');
        } else {
          setMsg(response.message);
        }
        setShowMsg(true);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  const handleUploadAvatar = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);

    const response = await fetch('/api/account/upload_avatar/', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    console.log(result);
    setUserInfo({...userInfo,
      'avatar':result.data})
};


  return (
    <Box className={styles.container} >
      <Box className={styles.box} >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar alt='头像' src={userInfo.avatar} />
        </Box>
        <FormGroup>
          <FormControl>
            <Input
              type="file"
              onChange={(e) => handleUploadAvatar(e)}
            />
          </FormControl>
          <FormControl>
            <InputLabel>用户名</InputLabel>
            <Input
              name="username"
              label="Username"
              variant="outlined"
              value={userInfo.username}
              onChange={handleInputChange}
            />
          </FormControl>
          
          <FormControl>
            <InputLabel>个人简介</InputLabel>
            <Input
              name="bio"
              label="bio"
              variant="outlined"
              value={userInfo.bio}
              onChange={handleInputChange}
            />
          </FormControl>    
          <FormControlLabel
            control={
              <Switch
                checked={!!userInfo.sentiment_analysis_enabled}
                onChange={handleSwitchChange}
                name="sentiment_analysis_enabled"
              />
            }
            label="Sentiment Analysis Enabled"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            更新
          </Button>
        </FormGroup>
      </Box>
      <Snackbar
        open={showMsg}
        autoHideDuration={6000}
        onClose={() => { setShowMsg(false) }}
        message={msg}
      ></Snackbar>
    </Box>
  );
};

export default Profile;
