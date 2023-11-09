import axios from 'axios'

const PROJECTS_API_URL = 'http://127.0.0.1:5000/projects/'

function attemptProjects(attemptUsername){
    // console.log(attemptProjectName + " " + attemptid + " " + attemptProjectDescription)
    return axios.post(PROJECTS_API_URL, null, {params: {username : attemptUsername}})
}


export default attemptProjects