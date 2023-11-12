import axios from "axios";


const PROJECTCREATION_API_URL = 'http://127.0.0.1:5000/projectcreation/'

export default function tryCreation(attemptProjectName, attemptid, attemptProjectDescription, currentUser){
    return axios.post(PROJECTCREATION_API_URL+"?name="+attemptProjectName+"&id="+attemptid+"&description="+attemptProjectDescription+"&currUser="+currentUser, null)
}