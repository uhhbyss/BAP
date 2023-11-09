import axios from 'axios'

const PROJECTCREATION_API_URL = 'http://127.0.0.1:5000/projectcreation/'

function attemptProjectCreation(attemptProjectName, attemptid, attemptProjectDescription){
    console.log(attemptProjectName + " " + attemptid + " " + attemptProjectDescription)
    return axios.post(PROJECTCREATION_API_URL, null, {params: {name: attemptProjectName, id: attemptid, description: attemptProjectDescription}})
}


export default attemptProjectCreation