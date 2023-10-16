import axios from 'axios'

const LOGIN_API_URL = 'http://127.0.0.1:5000/login'

function attemptLogin(attemptUser, attemptPass, setLoginState){
    axios.get(LOGIN_API_URL, {params: {user: attemptUser, pw: attemptPass}})
    .then((response) => {
        console.log(response.data)
        if(response.data['status'] === 'Successfully Logged in (valid user and pass)'){
            setLoginState(true)
        }
        else{
            setLoginState(false)
        }
    })

}


export default attemptLogin