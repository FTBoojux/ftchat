import { Button } from '@mui/material';
import React from 'react';

const Settings = () => {

  const handleLogout = () => {
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