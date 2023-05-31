import React, { useState } from "react";
import {
    Box,
    Button,
    FormControl, InputLabel, OutlinedInput,
} from "@mui/material";
const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const login = ()=>{
        console.log("email",email)
        console.log("password",password)
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
                <Button onClick={() => login()} variant="outlined">
                  登录
                </Button>
              </FormControl>
            </Box>
          </Box>
    );
}

export default Login;