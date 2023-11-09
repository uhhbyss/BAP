import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { TextField, Button, Box, Typography, Stack} from "@mui/material";
import attemptProjectCreation from '../services/ProjectCreationService'
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

function ProjectCreation() {
    const { user, updateState } = useContext(UserContext)
    const [currProjectCreate, setCurrProjectCreate] = useState({
      'project_name': '',
      'id': '',
      'description': ''
    })
    const [ProjectCreateState, setProjectCreateState] = useState()
  
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();

        attemptProjectCreation(currProjectCreate.project_name, currProjectCreate.id, currProjectCreate.description, user.username)
        .then((response) => {
            console.log(response.data)
            if(response.data['code'] === 'true'){
              alert(response.data['status'])
              setProjectCreateState(true);
              navigate('/projects')
            }
            else if(response.data['code'] === 'false1'){
              alert(response.data['status'])
              setProjectCreateState(false)
            }
            else{
              alert(response.data['status'])
              setProjectCreateState(false)
            }
        })
    
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
                type="id"
                label="Enter the id for the project (This will be used by other users to search and join this project)"
                value={currProjectCreate.id}
                onChange={(e) => setCurrProjectCreate({...currProjectCreate, id: e.target.value})}
                required
              />
              <TextField
                type="description"
                label="Enter the description for this project"
                value={currProjectCreate.description}
                onChange={(e) => setCurrProjectCreate({...currProjectCreate, description: e.target.value})}
                required
              />
              <Box display={'flex'}>
                <Button type="submit" variant="contained" sx={{justifyContent: 'center'}}>Create a new Project</Button>
              </Box>
            </Stack>
          </form>
          <Typography variant="body1">or</Typography>
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