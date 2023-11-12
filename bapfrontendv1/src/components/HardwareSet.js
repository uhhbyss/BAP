import React, { useState } from 'react';

import { 
    TextField,
    Stack,
    Typography,
    Button,
    Box
} from '@mui/material';
import getAvailability from './../services/HardwareSetService'

import { sendCheckIn, sendCheckOut } from './../services/ProjectsService'
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';
import { useEffect } from 'react';

// Define a Project component that displays a project's details
const username = JSON.parse(localStorage.getItem('user'))?.username

function HardwareSet( { name, capacity, availability, checkedOut, projName, projId} ) {
    // const { user } = useContext(UserContext)
    const [currentQuantity, setCurrentQuantity] = useState(checkedOut);
    const [inputNumber, setInputNumber] = useState(0); //string -> need to parseInt

    useEffect(() => {
        getAvailability(name, username)
        .then((response) => {
            if(response.data['code'] === 'true'){
                availability = response.data['availability']
            }
        })
      }, [currentQuantity]);
    

    function checkOut(){
        const trialCheckout = parseInt(inputNumber);
        if(trialCheckout > 0){
            if(trialCheckout <= availability){
                alert("Checked out " + inputNumber + " units for " + name);
                sendCheckOut(trialCheckout, name, username, projId);
                setCurrentQuantity(currentQuantity + trialCheckout);  
                // might need to address the fact that we're not updating the global user state with this new info
                // updateState(...user, projects: ...user.projects['hwsets']) ?????????
            }
        
            //assuming that 100 is the hardset upper limit
            else{
                alert("Only checked out " + (availability) + " units for " + name);
                sendCheckOut(availability, name, username, projId);
                setCurrentQuantity(availability + currentQuantity);
            }
        }
        else{
            alert("Invalid Input! Try again");
        }
        
    }

    function checkIn(){
        const input = parseInt(inputNumber)
        const newQuantity = currentQuantity - input;

        if(input > 0){
            if(newQuantity >= 0){
                alert("Checked in " + input + " units for " + name);
                sendCheckIn(input, name, username, projId);
                setCurrentQuantity(newQuantity);  
            }
            //assuming that 100 is the hardset upper limit
            else{
                alert("Only checked in " + (currentQuantity) + " units for " + name);
                // alert("Only checked out " + (parseInt(input) + newQuantity) + " units for " + name);
                sendCheckIn(currentQuantity, name, username, projId);
                setCurrentQuantity(0);
            }
        }
        else{
            alert("Invalid Input! Try again");
        }
    }

    return(
        <div className="hwset">
            <Box sx={{p: '0.5rem'}}>
                <Typography> {name}: {currentQuantity}/{capacity} </Typography>
                <TextField 
                    value={inputNumber==0?'':inputNumber} 
                    placeholder='Enter QTY'
                    onChange={(e) => setInputNumber(e.target.value)}
                    />
                <Box>
                    <Button onClick={checkIn} variant='outlined'>Check In</Button>
                    <Button onClick={checkOut} variant='outlined'>Check Out</Button>
                </Box>
            </Box>
        </div>
    )
};


export default HardwareSet;




