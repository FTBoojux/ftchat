import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormGroup,
    Input,
    InputLabel,
} from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [avatarUrl,setAvatarUrl] = useState('');

    const handleRequestVerificationCode = async () => {
        const response = await fetch('/api/account/request_verification_code/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        const result = await response.json();
        console.log(result);
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
        console.log(result);
    };

    return (
        <Box>
                    <Box>
                        <Avatar className={'align'} alt={"头像"} src={avatarUrl}></Avatar>
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
                <FormControl>
                    <InputLabel>验证码</InputLabel>
                    <Input
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                </FormControl>
            </FormGroup>
            <Box className={'align'} >
                <Button onClick={handleRequestVerificationCode}>
                    发送验证码
                </Button>
                <Button onClick={handleRegister}>注册</Button>
            </Box>
        </Box>
    );
};

export default Register;
