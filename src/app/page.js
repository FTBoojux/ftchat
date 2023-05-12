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
    FormControl, Input, InputLabel, OutlinedInput,
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
                    <Card>
                        {
                            isLogin ?
                                <CardActionArea>
                                    <Box
                                        component="form"
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div>
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
                                        </div>
                                        <div>
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
                                        </div>
                                        <div className={"align"}>
                                            <FormControl
                                                sx={{ m: 1}}
                                            >
                                                <Button
                                                    onClick={()=>login()}
                                                    variant="outlined"
                                                >确认</Button>
                                            </FormControl>
                                        </div>
                                    </Box>
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
