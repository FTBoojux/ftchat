import React from 'react';
import { Box, TextField, Button, Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
const Contracts = () => {
    const [searchText, setSearchText] = React.useState('');

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearch = () => {
        console.log(`Searching for: ${searchText}`);
        // 在这里添加你的搜索逻辑
    };

    return (
        <div>
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
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Container>
        </div>
    );
};

export default Contracts;
