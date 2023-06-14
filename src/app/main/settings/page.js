import MyFetch from '@/app/api/MyFetch';
import { Button } from '@mui/material';
import React from 'react';

const Settings = () => {

  const handleLogout = () => {
    MyFetch(`/api/account/logout/`, {
      method: 'POST',
    }).then(response=>response.json())
    .then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error(error);
    })
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div>
      
      <Button variant="contained" onClick={handleLogout}>退出</Button>
    </div>
  );
};

export default Settings;