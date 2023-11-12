import axios from 'axios'

const PROJECTS_API_URL = 'http://127.0.0.1:5000/projects/'

// OBSOLETE RIGHT NOW
export default function attemptProjects(tryUsername){
    // console.log(attemptProjectName + " " + attemptid + " " + attemptProjectDescription)
    return axios.get(PROJECTS_API_URL + "?username=" + tryUsername.username + "&typeReq=getProjs", null)
}

export function sendCheckIn(input, hardwareSetName, user, projId){
    return axios.post(PROJECTS_API_URL, null, {params: {typeReq: "checkIn", amount: input, hwset: hardwareSetName, username: user, project: projId}})
}

export function sendCheckOut(input, hardwareSetName, user, projId){
    return axios.post(PROJECTS_API_URL, null, {params: {typeReq: "checkOut", amount: input, hwset: hardwareSetName, username: user, project: projId}})
}

export function joinRequest(user, projId){
    return axios.post(PROJECTS_API_URL, null, {params: {typeReq: "joinProj", username: user, ID: projId}})
}

export function leaveRequest(user, projId){
    return axios.post(PROJECTS_API_URL, null, {params: {typeReq: "leaveProj", username: user, ID: projId}})
}