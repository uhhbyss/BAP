import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { TextField, Button, Box, Typography, Stack} from "@mui/material";
import attemptSignup from "../services/SignupService";
import { useEffect } from "react";

function Signup() {
  const [currSignup, setCurrSignUp] = useState({
    'email': '',
    'password': '',
    'confirmedPassword' : ''
  })
  const [signUpState, setSignUpState] = useState()

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

    if(currSignup.password != currSignup.confirmedPassword){
      alert("Passwords don't match");
    }
    else{
      attemptSignup(currSignup.email, currSignup.password)
      .then((response) => {
          console.log(response.data)
          if(response.data['code'] === 'true'){
            setSignUpState(true);
            localStorage.setItem('user', JSON.stringify({ username: currSignup.email}))
            navigate('/projects')
          }
          else if(response.data['code'] === 'false2'){
            alert('Account already exists!')
            setSignUpState(false)
          }
          else{
            setSignUpState(false)
          }
      })
    }
  };

  return (
    <Box className="signup" display={'flex'} sx = {{alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <Box className="signup__form">
        <form onSubmit={handleSubmit}>
          <Stack direction={'column'}>
            <Box className="signup__logo">
              <Link to="/">
                {/* <img src="images/logo.png" alt="BAP logo" /> */}
              </Link>
            </Box>

            <Typography variant="h1">Sign up</Typography>

            <TextField
              type="email"
              label="Email address"
              value={currSignup.email}
              onChange={(e) => setCurrSignUp({...currSignup, email: e.target.value})}
              required
            />
            <TextField
              type="password"
              label="Password"
              value={currSignup.password}
              onChange={(e) => setCurrSignUp({...currSignup, password: e.target.value})}
              required
            />
            <TextField
              type="password"
              label="Confirm password"
              value={currSignup.confirmedPassword}
              onChange={(e) => setCurrSignUp({...currSignup, confirmedPassword: e.target.value})}
              required
            />
            <Box display={'flex'}>
              <Button type="submit" variant="contained" sx={{justifyContent: 'center'}}>Sign up</Button>
            </Box>
          </Stack>
        </form>
        <Typography variant="body1">or</Typography>
        {/* <Box className="signup__socials">
          <Button className="facebook" startIcon={<FaFacebookF />}>
            Continue with Facebook
          </Button>
          <Button className="google" startIcon={<FaGoogle />}>
            Continue with Google
          </Button>
          <Button className="apple" startIcon={<FaApple />}>
            Continue with Apple
          </Button>
        </Box> */}
        <Typography variant="body1">
          Already have an account?{" "}
          <Link to="/" className="login-link">
            Log in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Signup;
