// Import React and React-DOM libraries
import React from 'react';
import Project from '../components/Project'
import {
  Box,
  List,
  Paper,
  Stack,
  Button,
  TextField
} from '@mui/material'
import attemptProjects from '../services/ProjectsService';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { joinRequest } from '../services/ProjectsService';

// Define a Projects component that displays a list of projects
function Projects() {
  const { user, updateState } = useContext(UserContext)
  const username = JSON.parse(localStorage.getItem('user')).username
  const navigate = useNavigate();
  const [projects, setProjects] = useState([])
  const [currProjectIDInput, setCurrProjectIDInput] = useState('')

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // updateState(foundUser);
      // console.log(foundUser)

      attemptProjects(foundUser).then((response) => {
        if(response.data['code'] === 'true'){
          setProjects(response.data['projects'])
        }
      })
    } 
    else{
      navigate('/')
    }
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      // updateState(foundUser);
      // console.log(foundUser)

      attemptProjects(foundUser).then((response) => {
        if(response.data['code'] === 'true'){
          setProjects(response.data['projects'])
        }
      })
    } 
    else{
      navigate('/')
    }
  }, [joinRequest]);


  function handleJoin(){
    joinRequest(username, currProjectIDInput)
    .then((response) => {
      alert(response.data['status'])
      navigate('/projects')
    })
  }

  function handleCreateProject(){
    navigate('/projectcreation')
  }


  function logout(){
    localStorage.clear()
    navigate('/login')
  }



  //if username exists in the user object, then set it to that string, else return Error 
  //messy, will fix after we verify that the api works consistently
  // console.log(user)
  const user_name = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')).username:'Error'
  // const user_projects = user?.projects ?? []




  //NOTE: MIGHT NOW BE OBSOLETE BECAUSE THE GLOBAL USER STATE SHOULD ALWAYS HAVE UP-TO-DATE INFO ABOUT USER-SPECIFIC PROJECTS
  // TODO:
  // modularize this function and find a way to setcurrprojects with the future global state named 'user'
  // could also get rid of useeffect(maybe) and just call the attemptprojects function at the top of this component
  // useEffect(
  //   () => {
  //     const fetch = async () => {
  //       // e.preventDefault();
  //       setCurrProjects({...currProjects, username : user_name})
  //       attemptProjects(currProjects.username)
  //       .then((response) => {
  //         console.log(response.data)
  //         if(response.data['code'] === 'true'){
  //           alert(response.data['status'])
  //           setCurrProjects({...currProjects, projects : response.data['projects']})
  //         }
  //         else{
  //           alert(response.data['status'])
  //         }
  //       })
  //     };
  //     fetch();
  //   }, []);


  // Return the JSX element for the projects component
  return (
    <div>
      <div className="projects">
        <Paper style = {{maxHeight: '60vh', overflow: 'auto'}}>
          <List>
          {
            projects?.map(project => (
              // Use the Project component to render each project
              <Project name={project.name} users={project.users} hwsets={project.hwsets} description={project.description} id={project.id}/>
            ))}
          </List>
        </Paper>
      </div>
      <Stack direction={'column'} sx={{display:'flex', justifyContent:'center'}}>
        <Stack direction='row' sx ={{display: 'flex', justifyContent: 'center'}}>
          <Box sx={{display:'flex', justifyContent:'space-between', width: '35em'}}>
            <Button onClick={logout} variant="contained" color='error' sx={{m:1}}>
                    LOGOUT
            </Button>

            <Box sx={{m:1}}>
              <TextField
                type="email"
                label=""
                placeholder='Joining a project? Paste the ID here!'
                value={currProjectIDInput}
                onChange={(e) => setCurrProjectIDInput(e.target.value)}
                sx={{width: '20rem'}}
              />
              <Button onClick={handleJoin} variant="contained" sx={{m:1}}>
                JOIN
              </Button>
            </Box>
          </Box>
        </Stack>
        <Button variant='outlined' color='info' onClick={handleCreateProject} sx={{p:2}}>
            Create Project
          </Button>
      </Stack>
      
    </div>
    
    
  );
}

export default Projects;
