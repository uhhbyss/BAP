// Import React and React-DOM libraries
import React from 'react';
import Project from '../components/Project'
import {
  Box,
} from '@mui/material'



// Define a Projects component that displays a list of projects
function Projects(props) {
  // Use props to access the projects array
  const {projects} = props;

  // Return the JSX element for the projects component
  return (
    <div className="projects">
      {projects.map(project => (
        // Use the Project component to render each project
        <Project name={project.name} users={project.users} hwsets={project.hwsets} />
      ))}
    </div>
  );
}

export default Projects;
