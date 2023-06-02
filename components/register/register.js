import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormGroup,
    Input, InputBase,
    InputLabel, Paper, Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [avatarUrl,setAvatarUrl] = useState('');
    const [sendBtnText,setSendBtnText] = useState('发送');
    const [cooldown, setCooldown] = useState(0);
    const [showRegisterRes,setShowRegisterRes] = useState(false);
    const [msg, setMsg] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setTimeout(() => {
                setCooldown(cooldown - 1);
            }, 1000);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [cooldown]);
    
    const handleClose = () => {
        setSuccessOpen(false);
        setErrorOpen(false);
      };
    
    const handleRequestVerificationCode = async () => {
        if (cooldown === 0) {
            try {
                const response = await fetch('/api/account/request_verification_code/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                });
                const data = await response.json();
                console.log('Success:', data);
                if (data.code === 200) {
                    setCooldown(60);
                    setSuccessOpen(true);
                } else {
                    setErrorMessage(data.message);
                    setErrorOpen(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
    }
  };

    const handleUploadAvatar = async (e) => {
        const formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        const response = await fetch('/api/account/upload_avatar/', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log(result);
        setAvatarUrl(result.data)
    };

    const handleRegister = async () => {
        const response = await fetch('/api/account/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                verify_code: verificationCode,
                avatar: avatarUrl,
                username: username,
            }),
        });
        const result = await response.json();
        setMsg(result.message)
        setShowRegisterRes(true)
    };

    return (
        <Box>
            <Snackbar
                open={showRegisterRes}
                autoHideDuration={6000}
                onClose={()=>{setShowRegisterRes(false)}}
                message={msg}
                // action={action}
            ></Snackbar>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar alt={"头像"} src={avatarUrl}></Avatar>
            </Box>
            <FormGroup>
                <FormControl>
                    <Input
                        type="file"
                        onChange={(e) => handleUploadAvatar(e)}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel>用户名</InputLabel>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel>邮箱</InputLabel>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel>密码</InputLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel>确认密码</InputLabel>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormControl>
                    {/*<InputLabel>验证码</InputLabel>*/}
                    {/*<Input*/}
                    {/*    value={verificationCode}*/}
                    {/*    onChange={(e) => setVerificationCode(e.target.value)}*/}
                    {/*/>*/}
            </FormGroup>
            <Box>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}
                >
                    <InputBase
                        placeholder={"邮箱验证码"}
                        onChange={(e)=>setVerificationCode(e.target.value)}
                    ></InputBase>
                    <Button
                        variant="contained"
                        onClick={()=>handleRequestVerificationCode()}
                    >{cooldown === 0 ? sendBtnText : `${cooldown}秒后可重发`}</Button>
                </Paper>
            </Box>
            <Box className={'align'} >
                {/*<Button onClick={handleRequestVerificationCode}>*/}
                {/*    发送验证码*/}
                {/*</Button>*/}
                <Button onClick={handleRegister}>注册</Button>
            </Box>
            <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
                验证码已发送到您的邮箱，请注意查收。
                </MuiAlert>
            </Snackbar>
            <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
                {errorMessage}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default Register;
