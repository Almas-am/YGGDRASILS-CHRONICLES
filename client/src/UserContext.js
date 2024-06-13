import { useState } from "react";

const { createContext } = require("react");

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState({});
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}