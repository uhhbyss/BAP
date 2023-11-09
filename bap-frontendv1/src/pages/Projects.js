// Import React and React-DOM libraries
import React from 'react';
import Project from '../components/Project'
import {
  Box,
} from '@mui/material'
import attemptProjects from '../services/ProjectsService';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';


// Define a Projects component that displays a list of projects
function Projects(props) {

  const { user, updateState } = useContext(UserContext)
  //if username exists in the user object, then set it to that string, else return Error 
  //messy, will fix after we verify that the api works consistently
  console.log(user)
  const user_name = user?.username ?? 'Error'
  const user_projects = user?.projects ?? []



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
    <div className="projects">
      {/* before code: */}
      {/* {projects.map(project => ( */}
      {
      user_projects?.map(project => (
        // Use the Project component to render each project
        <Project name={project.name} users={project.users} hwsets={project.hwsets} description={project.description}/>
      ))}
    </div>
  );
}

export default Projects;
