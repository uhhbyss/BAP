import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { TextField, Button, Box, Typography, Stack} from "@mui/material";
import attemptProjectCreation from '../services/ProjectCreationService'

function ProjectCreation() {
    const [currProjectCreate, setCurrProjectCreate] = useState({
      'project_name': '',
      'default_checkout_HW1': '',
      'default_checkout_HW2': ''
    })
    const [ProjectCreateState, setProjectCreateState] = useState()
  
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();

      // Just copied from the Signup.js since I'm not sure how to 
      //  set it up for this case

    //   if(currSignup.password != currSignup.confirmedPassword){
    //     alert("Passwords don't match");
    //   }
    //   else{
    //     attemptSignup(currSignup.email, currSignup.password)
    //     .then((response) => {
    //         console.log(response.data)
    //         if(response.data['code'] === 'true'){
    //           setSignUpState(true);
    //           navigate('/projects')
    //         }
    //         else if(response.data['code'] === 'false2'){
    //           alert('Account already exists!')
    //           setSignUpState(false)
    //         }
    //         else{
    //           setSignUpState(false)
    //         }
    //     })
    //   }
    };
  
    return (
      <Box className="create" display={'flex'} sx = {{alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <Box className="create__form">
          <form onSubmit={handleSubmit}>
            <Stack direction={'column'}>
              <Box className="create__logo">
                <Link to="/">
                  <img src="images/logo.png" alt="BAP logo" />
                </Link>
              </Box>
  
              <Typography variant="h1">Create a new Project</Typography>
  
              <TextField
                type="project_name"
                label="Enter the project name"
                value={currProjectCreate.project_name}
                onChange={(e) => setCurrProjectCreate({...currProjectCreate, project_name: e.target.value})}
                required
              />
              <TextField
                type="default_checkout_HW1"
                label="Enter the amount you wish to immediately check out from HW Set 1"
                value={currProjectCreate.default_checkout_HW1}
                onChange={(e) => setCurrProjectCreate({...currProjectCreate, default_checkout_HW1: e.target.value})}
                required
              />
              <TextField
                type="default_checkout_HW2"
                label="Enter the amount you wish to immediately check out from HW Set 1"
                value={currProjectCreate.default_checkout_HW2}
                onChange={(e) => setCurrProjectCreate({...currProjectCreate, default_checkout_HW2: e.target.value})}
                required
              />
              <Box display={'flex'}>
                <Button type="submit" variant="contained" sx={{justifyContent: 'center'}}>Create a new Project</Button>
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
            Return to the home page?{" "}
            <Link to="/projects" className="home_page-link">
              Home Page
            </Link>
          </Typography>
        </Box>
      </Box>
    );
  }
  
  export default ProjectCreation;