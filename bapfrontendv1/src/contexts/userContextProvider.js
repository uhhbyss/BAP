import { useState } from "react"
import { UserContext } from "./userContext"

export const UserContextProvider = ({children}) => {


    const [currUser, setCurrUser] = useState({});


    const updateState = (newState) => {
        setCurrUser({ ...currUser, ...newState });
      };


    return (
        <UserContext.Provider value={{ ...currUser, updateState }}>
            {children}
        </UserContext.Provider>
    )

}