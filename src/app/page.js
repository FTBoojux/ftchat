"use client";
import React, { useState } from 'react';
import styles from '../styles/home.module.css';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardActions,
    CardHeader,
    FormControl, Input, InputLabel,
    TextField
} from "@mui/material";

const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const login = ()=>{
        console.log("email",email)
        console.log("password",password)
    }
    return (
        <div className={styles.container} >
            <div className={styles.box}>
                <Box>
                    <Card variant="outlined">
                        {
                            isLogin ?
                                <CardActionArea>
                                    <div>
                                        <FormControl
                                            variant={"standard"}
                                        >
                                            <InputLabel
                                                htmlFor={"standard-adornment-password"}
                                            >
                                                邮箱
                                            </InputLabel>
                                            <Input
                                                id="standard-adornment-email"
                                                onChange={(event)=>setEmail(event.target.value)}
                                            >

                                            </Input>
                                        </FormControl>
                                    </div>
                                    <div>

                                        <FormControl
                                            variant={"standard"}
                                        >
                                            <InputLabel
                                                htmlFor={"standard-adornment-password"}
                                            >
                                                密码
                                            </InputLabel>
                                            <Input
                                                id="standard-adornment-password"
                                                type="password"
                                                onChange={(event)=>setPassword(event.target.value)}
                                            >

                                            </Input>
                                        </FormControl>
                                    </div>
                                    <div className={"align"}>
                                        <FormControl>
                                            <Button onClick={()=>login()}>确认</Button>
                                        </FormControl>
                                    </div>
                                </CardActionArea>
                                :
                                <CardActionArea>
                                    注册
                                </CardActionArea>
                        }
                        <div className={"align"}>
                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={()=>setIsLogin(true) } >登录</Button>
                                <Button onClick={()=>setIsLogin(false) }>注册</Button>
                            </ButtonGroup>
                        </div>
                    </Card>
                </Box>
            </div>
        </div>
    );
};

export default HomePage;
