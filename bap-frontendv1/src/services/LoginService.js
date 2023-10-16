import axios from 'axios'
import {useNavigate} from "react-router-dom";

const LOGIN_API_URL = 'http://127.0.0.1:5000/login'

function attemptLogin(attemptUser, attemptPass){
    return axios.get(LOGIN_API_URL, {params: {user: attemptUser, pw: attemptPass}})
}


export default attemptLogin