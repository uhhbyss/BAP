import HomeworkSet from './HomeworkSet.js'
import React, { useState } from 'react';
import {
  Stack, 
  Box, 
  Button,
  Typography
} from '@mui/material';
import {Text, StyleSheet} from 'react-native';

// Define a Project component that displays a project's details
function Project(props) {
    // Use props to access the project's name, users, and hwsets
    const { name, users, hwsets, description } = props;

    // const { user, updateState } = useContext(UserContext)


    // NEED TO UPDATE THIS WITH THE HOMEWORK ANSWERS!!!!
    // Define a function to handle joining a project
    function handleJoin() {
      // TODO: Implement the logic to join a project
      alert(`You joined ERROR`);
    }

    const styles = StyleSheet.create({
      bold: {fontWeight: 'bold'},
      italic: {fontStyle: 'italic'},
      underline: {textDecorationLine: 'underline'}
    })

    // Return the JSX element for the project component
    return (
      <div className="project">
        <Stack direction='row' 
        sx={{
          m: '2rem',
          p: '1rem',
          border: '5',
          borderColor: 'black',
          display:'flex', 
          justifyContent: 'center',
          alignItems:'center',
          backgroundColor: '#e3e3e3',
          borderRadius: 10
          }}>
          <Box sx={{p: '1rem'}}>
            <div className="project-name">
              <Typography fontWeight={'bold'}>{name}</Typography>
            </div>
          </Box>
          
          <Box sx={{p: '1rem'}}>
            <div className="project-users">
              {users.map(user => <Text style = {styles.italic}>{user} </Text>)}
            </div>
          </Box>

          <Box sx={{p: '1rem'}}>
            <div className="project-hwsets">
              {hwsets.map(hwset => (
                <HomeworkSet name={hwset.name} capacity={hwset.capacity} availability={hwset.availability} checkedOut={hwset.checkedOut}/>
              ))}
            </div>
          </Box>

          <Box sx={{p: '1rem'}}>
            <Button className="join-button" variant="contained" color='success' onClick={handleJoin} sx={{}}>
              Join
            </Button>
          </Box>
        </Stack>
      </div>
    );
  }

export default Project;
