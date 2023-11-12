import axios from 'axios'

const SIGNUP_API_URL = 'https://bap-665c083d5c24.herokuapp.com/signup/'

function attemptSignup(attemptUser, attemptPass){
    console.log(attemptUser + " " + attemptPass)
    return axios.post(SIGNUP_API_URL, null, {params: {user: attemptUser, pw: attemptPass}})
}


export default attemptSignup