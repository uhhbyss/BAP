import axios from 'axios'

const LOGIN_API_URL = 'http://127.0.0.1:5000/projects'

function getAvailability(name, user){
    return axios.get(LOGIN_API_URL, {params: {typeReq: 'getAvailability', hwset: name, username: user}})
}


export default getAvailability