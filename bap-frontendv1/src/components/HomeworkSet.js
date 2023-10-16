import React, { useState } from 'react';

import { 
    TextField,
    Stack,
    Typography,
    Button,
    Box
} from '@mui/material';

// Define a Project component that displays a project's details




function HomeworkSet(props) {
    const {name, quantity} = props;
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const [inputNumber, setInputNumber] = useState(0); //string -> need to parseInt
    

    function checkIn(){
        const newQuantity = currentQuantity + parseInt(inputNumber);
        if(inputNumber > 0){
            if(newQuantity <= 100){
                alert("Checked in " + inputNumber + " units for " + name);
                setCurrentQuantity(newQuantity);  
            }
            //assuming that 100 is the hardset upper limit
            else{
                alert("Only checked in " + (100 - currentQuantity) + " units for " + name);
                setCurrentQuantity(100);
            }
        }
        else{
            alert("Invalid Input! Try again");
        }
        
    }

    function checkOut(){
        const newQuantity = currentQuantity - parseInt(inputNumber);

        if(inputNumber > 0){
            if(newQuantity >= 0){
                alert("Checked out " + inputNumber + " units for " + name);
                setCurrentQuantity(newQuantity);  
            }
            //assuming that 100 is the hardset upper limit
            else{
                alert("Only checked out " + (parseInt(inputNumber) + newQuantity) + " units for " + name);
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
                <Typography> {name}: {currentQuantity}/100 </Typography>
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




