import axios from 'axios'

const SIGNUP_API_URL = 'http://127.0.0.1:5000/signup/'

function attemptSignup(attemptUser, attemptPass){
    console.log(attemptUser + " " + attemptPass)
    return axios.post(SIGNUP_API_URL, null, {params: {user: attemptUser, pw: attemptPass}})
}


export default attemptSignup