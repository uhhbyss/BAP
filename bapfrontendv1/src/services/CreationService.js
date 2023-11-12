import axios from "axios";


const PROJECTCREATION_API_URL = 'https://bap-665c083d5c24.herokuapp.com/projectcreation/'

export default function tryCreation(attemptProjectName, attemptid, attemptProjectDescription, currentUser){
    return axios.post(PROJECTCREATION_API_URL+"?name="+attemptProjectName+"&id="+attemptid+"&description="+attemptProjectDescription+"&currUser="+currentUser, null)
}