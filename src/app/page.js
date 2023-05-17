"use client";
import React, { useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardActions,
    CardHeader,
    FormControl, Input, InputLabel, OutlinedInput,
    TextField
} from "@mui/material";
import styles from '../styles/home.module.css'
import Register from "../../components/register/register";
const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const login = ()=>{
        console.log("email",email)
        console.log("password",password)
    }
    const LoginBox = ()=>{
        if(isLogin){
            return <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Box>
                        <FormControl
                            variant={"standard"}
                            sx={{ m: 1}}
                        >
                            <InputLabel
                                htmlFor={"standard-adornment-password"}
                            >
                                邮箱
                            </InputLabel>
                            <OutlinedInput
                                id="standard-adornment-email"
                                onChange={(event)=>setEmail(event.target.value)}
                            >

                            </OutlinedInput>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl
                            variant={"standard"}
                            sx={{ m: 1}}
                        >
                            <InputLabel
                                htmlFor={"standard-adornment-password"}
                            >
                                密码
                            </InputLabel>
                            <OutlinedInput
                                id="standard-adornment-password"
                                type="password"
                                onChange={(event)=>setPassword(event.target.value)}
                            >

                            </OutlinedInput>
                        </FormControl>
                    </Box>
                    <Box className={"align"}>
                        <FormControl
                            sx={{ m: 1}}
                        >
                            <Button
                                onClick={()=>login()}
                                variant="outlined"
                            >登录</Button>
                        </FormControl>
                    </Box>
                </Box>
        }else{
            return <Register></Register>
        }
    }
    return (
        <Box className={styles.container} >
            <Box className={styles.box}>
                <LoginBox></LoginBox>
                <Box className={"align"}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button onClick={()=>setIsLogin(true) } >登录</Button>
                        <Button onClick={()=>setIsLogin(false) }>注册</Button>
                    </ButtonGroup>
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;
