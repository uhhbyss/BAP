import React, { useState } from 'react';

import { 
    TextField,
    Stack,
    Typography,
    Button,
    Box
} from '@mui/material';

import { sendCheckIn, sendCheckOut } from './../services/ProjectsService'
import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

// Define a Project component that displays a project's details


function HomeworkSet( { name, capacity, availability, checkedOut } ) {
    const { user } = useContext(UserContext)
    const [currentQuantity, setCurrentQuantity] = useState(checkedOut);
    const [inputNumber, setInputNumber] = useState(0); //string -> need to parseInt
    

    function checkOut(){
        const trialCheckout = parseInt(inputNumber);
        if(trialCheckout > 0){
            if(trialCheckout <= availability){
                alert("Checked out " + inputNumber + " units for " + name);
                sendCheckOut(trialCheckout, name, user.username);
                setCurrentQuantity(currentQuantity + trialCheckout);  
                // might need to address the fact that we're not updating the global user state with this new info
                // updateState(...user, projects: ...user.projects['hwsets']) ?????????
            }
        
            //assuming that 100 is the hardset upper limit
            else{
                alert("Only checked out " + (availability) + " units for " + name);
                sendCheckOut(availability, name, user.username);
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
                sendCheckIn(input, name, user.username);
                setCurrentQuantity(newQuantity);  
            }
            //assuming that 100 is the hardset upper limit
            else{
                alert("Only checked in " + (currentQuantity) + " units for " + name);
                // alert("Only checked out " + (parseInt(input) + newQuantity) + " units for " + name);
                sendCheckIn(currentQuantity, name, user.username);
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


export default HomeworkSet;




