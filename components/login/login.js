import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl, InputLabel, OutlinedInput,
    Snackbar
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412'); //十六位十六进制数作为密钥偏移量

const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleClose = () => {
        setOpen(false);
    };
    const user_login = ()=>{
        fetch('/api/account/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password:encrypt(password)
            }),
        })
        .then(response => response.json())
        .then(async data => {
            console.log('Success:', data);
            if(data.code === 200){
                window.localStorage.setItem('access_token', data.data.access_token);        
                window.location.href = "/main"
            }else {
                setErrorMessage(data.message);
                setOpen(true);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const encrypt = (word) => {
        let srcs = CryptoJS.enc.Utf8.parse(word);
        const encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);  
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
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                {errorMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
}

export default Login;