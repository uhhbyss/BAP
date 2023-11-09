// Import React and React-DOM libraries
import React, { useEffect, useState } from 'react';
import Project from '../components/Project'
import {
  Box,
} from '@mui/material'
import { useLocation } from 'react-router-dom';
import attemptProjects from '../services/ProjectsService';



// Define a Projects component that displays a list of projects
function Projects(props) {
  // Use props to access the projects array
  // const {projects} = props;
  const [currProjects, setCurrProjects] = useState({
    username : '',
    // projects : projects
    projects: []
  })

  const {user_name} = useLocation();
  // console.log(user_name)

  useEffect(
    () => {
      const fetch = async () => {
        // e.preventDefault();
        setCurrProjects({...currProjects, username : user_name})
        attemptProjects(currProjects.username)
        .then((response) => {
          console.log(response.data)
          if(response.data['code'] == 'true'){
            alert(response.data['status'])
            setCurrProjects({...currProjects, projects : response.data['projects']})
          }
          else{
            alert(response.data['status'])
          }
        })
      };
      fetch();
    }, []);

  // Return the JSX element for the projects component
  return (
    <div className="projects" style = {{overflowY:"scroll"}}>
      {currProjects.projects?.map(project => (
        // Use the Project component to render each project
        // <Project name={project.name} users={project.users} hwsets={project.hwsets} />
        <Project name={project.name} users={[""]} hwsets={project.HwSets} />
      ))}
    </div>
  );
}

export default Projects;
