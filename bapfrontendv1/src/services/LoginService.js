import axios from 'axios'

const LOGIN_API_URL = 'https://bap-665c083d5c24.herokuapp.com/login'

function attemptLogin(attemptUser, attemptPass){
    return axios.get(LOGIN_API_URL, {params: {user: attemptUser, pw: attemptPass}})
}


export default attemptLogin