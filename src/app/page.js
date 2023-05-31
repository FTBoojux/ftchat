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
import Login from "../../components/login/login";
const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const LoginBox = ()=>{
        if(isLogin){
            return <Login></Login>
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
