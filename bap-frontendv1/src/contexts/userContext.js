// export const defaultUser = {
//     username: "",
//     projects: []
// }

import { createContext } from "react"



/*
user = {
    username: string
    projects: []
}
*/

/*
projects = {
    name,
    id,
    description,
    checkedout: [hwset1Number, hwset2Number]
}
*/

const defaultState = {
    username: '',
    updateState: (newState) => {}
}

export const UserContext = createContext(defaultState)