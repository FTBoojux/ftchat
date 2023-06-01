import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl, InputLabel, OutlinedInput,
} from "@mui/material";
import { tauri } from '@tauri-apps/api'
const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const user_login = ()=>{
        fetch('/api/account/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password:password
            }),
        })
        .then(response => response.json())
        .then(async data => {
            console.log('Success:', data);
            if(data.code === 200){
                tauri.app.invoke('plugin:storage|write', { key: 'access_token', value: 'your_token_value' }) // Store token
                window.location.href = "/home"
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Box>
                <FormControl>
                    <InputLabel>邮箱</InputLabel>
                    <OutlinedInput
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />    
                </FormControl>
            </Box>
            <Box>
                <FormControl>
                    <InputLabel>密码</InputLabel>
                    <OutlinedInput
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </FormControl>
            </Box>
            <Box className={"align"}>
              <FormControl sx={{ m: 1 }}>
                <Button onClick={() => user_login()} variant="outlined">
                  登录
                </Button>
              </FormControl>
            </Box>
          </Box>
    );
}

export default Login;