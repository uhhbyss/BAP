import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Stack} from "@mui/material";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: implement signup logic
  };

  return (
    <Box className="signup" display={'flex'} sx = {{alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <Box className="signup__form">
        <form onSubmit={handleSubmit}>
          <Stack direction={'column'}>
            <Box className="signup__logo">
              <Link to="/">
                <img src="images/logo.png" alt="BAP logo" />
              </Link>
            </Box>

            <Typography variant="h1">Sign up</Typography>

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
            <TextField
              type="password"
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
