import axios from 'axios'

const LOGIN_API_URL = 'https://bap-665c083d5c24.herokuapp.com/projects'

function getAvailability(name, user){
    return axios.get(LOGIN_API_URL, {params: {typeReq: 'getAvailability', hwset: name, username: user}})
}


export default getAvailability