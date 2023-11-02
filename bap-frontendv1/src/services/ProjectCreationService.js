import axios from 'axios'

const PROJECTCREATION_API_URL = 'http://127.0.0.1:5000/projectCreation/'

function attemptProjectCreation(attemptProjectName, attemptDefaultCheckOut){
    console.log(attemptProjectName + " " + attemptDefaultCheckOut)
    return axios.post(PROJECTCREATION_API_URL, null, {params: {user: attemptProjectName, pw: attemptDefaultCheckOut}})
}


export default attemptProjectCreation