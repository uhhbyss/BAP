import React, { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { TextField, Button, Box, Typography, Stack} from "@mui/material";
import attemptLogin from './../services/LoginService'
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

function Login() {
  const [currLogin, setCurrLogin] = useState({
    'email': '',
    'password': ''
  })
//   const [loginState, setLoginState] = useState(false)
  const { user, updateState } = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      navigate('/projects')
    } 
  }, []);




  const handleSubmit = (e) => {
    e.preventDefault();
    attemptLogin(currLogin.email, currLogin.password)
    .then((response) => {
        if(response.data['code'] === 'true'){
            // setLoginState(true);
            updateState({ user: {username: currLogin.email}})
            localStorage.setItem('user', JSON.stringify({ username: currLogin.email}))
            navigate('/projects')
        }
        else{
            // setLoginState(false)
            alert('error')
        }
    })
  }


  return (
    <Box display={'flex'} sx = {{alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <Box className="login">
            <Box className="login__logo" >
                <Link to="/">
                {/* <img src="images/logo.png" alt="BAP logo" /> */}
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
