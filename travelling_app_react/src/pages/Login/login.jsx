import { useState } from 'react';
import 'C:/Users/PallaviGaikwad/Desktop/Travelling_APP/Travelling_APP_Frontend/travelling_app_react/src/assets/style/login.css';
import loginFrontImage from '../../assets/images/login_front.png';
import { Button, Typography, TextField, Divider, Chip, Box, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import axios from "axios";
import { Link } from 'react-router-dom';

function Login() {
    const [error, setError] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [alertView, setAlertView] = useState(false);
    axios.defaults.withCredentials = true;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = () => {
        axios.post("http://localhost:3000/user/login", userInfo)
            .then((response) => console.log("Response:", response))
            .catch((err) => {
                if (err.status == 403) {
                    if (err.response.data[0]) {
                        setError({ path: err.response.data[0]?.path, msg: err.response.data[0]?.msg })
                    } else {
                        setAlertView(true);
                        setError({ path: "account-lock", msg: err.response.data?.msg })
                    }
                    console.log(err.response.data);
                }
            })
    }

    return (
        <>
            {
                error && error.path == "account-lock" && alertView &&
                <Alert id='alert' severity="warning" onClose={() => { setAlertView(false) }}>
                    {error.msg.split(".")[0]} <br />
                    {error.msg.split(".")[1]}
                </Alert>
            }
            <div id="login-component">
                <div id="image-component">
                    <h1 className='image-title'>Travelista Tours <br />
                        <p className='image-sub-title'> Travel is the only purchase that enriches you in ways <br />
                            beyond material wealth</p></h1>
                </div>
                <img src={loginFrontImage} alt="login front image" id='login-front' />
                <div id="login-input">
                    <Typography variant='h3' color='primary' sx={{
                        fontFamily: "PT Sans Narrow, serif",
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                    }}>Welcome</Typography>
                    <Typography color='grey' variant='p' sx={{
                        fontFamily: "PT Sans Narrow, serif",
                    }}>Login with Email</Typography>
                    <TextField label="Email or Phone number" name='username' variant="outlined" fullWidth margin="normal" onChange={(e) => handleChange(e)} />
                    <p className='error-msg'>{error && error?.path == 'username' ? error.msg : ''}</p>
                    <TextField label="Password" name='password' variant="outlined" fullWidth margin="normal" onChange={(e) => handleChange(e)} />
                    <p className='error-msg'>{error && error?.path == 'password' ? error.msg : ''}</p>
                    <Typography color='grey' variant='p' sx={{
                        fontFamily: "PT Sans Narrow, serif",
                    }}>forgot yout password?</Typography>
                    <Button variant="contained" color="primary" sx={{ margin: '1rem' }} onClick={handleLogin}> Login</Button>
                    <Typography color='black' variant='p' sx={{
                        fontFamily: "PT Sans Narrow, serif",
                    }}>Don't have account, <Link to={"/register"}><u> Register here</u></Link></Typography>
                    <Divider sx={{ width: '60%', height: '1px', backgroundColor: 'grey', alignItems: 'center', marginTop: '1rem' }}>
                        <Typography backgroundColor="white" padding={"6px"}> OR</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip
                            label="Login with OTP" size="medium" sx={{ marginTop: '1rem', color: '#019ee3', marginRight: '1rem' }}
                        />
                        <Google sx={{ marginTop: '.5rem', color: '#019ee3' }} />
                    </Box>
                </div>
            </div>
        </>
    );
}

export default Login;
