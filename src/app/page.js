"use client";
import React, { useState, useEffect} from 'react';
import {
    Box,
    Button,
    ButtonGroup
} from "@mui/material";
import styles from '../styles/home.module.css'
import Register from "../../components/register/register";
import Login from "../../components/login/login";
import MyFetch from "@/app/api/MyFetch";
const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);
    useEffect(()=>{
        const access_token = window.localStorage.getItem('access_token')
        if(access_token){
            // window.location.href = "/main"
            MyFetch('/api/account/avatar/',{
                method: 'GET'
              })
              .then(response => response.json())
              .then(async data => {
                  console.log('Success:', data);
                  if(data.code !== 200){
                    setMessage('登录已过期！')
                    setOpen(true)
                    window.localStorage.removeItem('access_token')
                    // window.location.href = '/'  
                  }else{
                    window.localStorage.setItem('avatar', data.data);
                    window.location.href = '/main'
                  }
                //   window.localStorage.setItem('avatar', data.data);
              })
              .catch((error) => {
                  console.error('Error:', error);
              })
        }
    },[])
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
