import { createContext, useState } from "react";

const UserContext = createContext()

export const UserContextprovider = ({children}) =>{

    const [userInfo, setUserInfo] = useState(null)
    const [userEmail, setuserEmail] = useState(null)


    return(
        <UserContext.Provider value={{userInfo, setUserInfo, userEmail, setuserEmail}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;