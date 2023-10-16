import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { TextField, Button, Box, Typography, Stack} from "@mui/material";
import attemptLogin from './../services/LoginService'

function Login() {
  const [currLogin, setCurrLogin] = useState({
    'email': '',
    'password': ''
  })
  const [loginState, setLoginState] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    attemptLogin(currLogin.email, currLogin.password)
    .then((response) => {
        console.log(response.data)
        if(response.data['status'] === 'Successfully Logged in (valid user and pass)'){
            setLoginState(true);
            navigate('/projects')
        }
        else{
            setLoginState(false)
        }
    })
  }


  return (
    <Box display={'flex'} sx = {{alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <Box className="login">
            <Box className="login__logo" >
                <Link to="/">
                <img src="images/logo.png" alt="BAP logo" />
                </Link>
            </Box>
            <Box className="login__form">
                <Typography variant="h1">Log in</Typography>
                <form onSubmit={handleSubmit}>
                <Stack direction={'column'}>
                    <TextField
                        type="email"
                        label="Email address"
                        value={currLogin.email}
                        onChange={(e) => setCurrLogin({...currLogin, email: e.target.value})}
                        required
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={currLogin.password}
                        onChange={(e) => setCurrLogin({...currLogin, password: e.target.value})}
                        required
                    />
                </Stack>
                <Button type="submit" variant="contained">Log in</Button>
                </form>
                <Typography variant="body1">or</Typography>
                <Typography variant="body1">
                Don't have an account?{" "}
                <Link to="/signup" className="signup-link">
                    Sign up
                </Link>
                </Typography>
            </Box>
        </Box>
    </Box>
  );
}

export default Login;
