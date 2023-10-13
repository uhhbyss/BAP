import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Stack} from "@mui/material";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: implement login logic
  };

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Stack>
                <Button type="submit" variant="contained">Log in</Button>
                </form>
                <Typography variant="body1">or</Typography>
                {/* <Box className="login__socials">
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
